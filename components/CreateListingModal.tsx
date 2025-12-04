
import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, AlertCircle, Link as LinkIcon, Plus, ChevronRight, Image as ImageIcon, Save, ShieldCheck } from 'lucide-react';
import { generateListingDescription } from '../services/gemini';
import { POPULAR_GAMES } from '../services/mockData';
import { GAME_CONFIGS } from '../services/gameConfigs';
import { FilterConfig, GameConfig, Listing } from '../types';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  listingToEdit?: Listing | null;
  initialGameId?: string;
  initialType?: string;
}

export const CreateListingModal: React.FC<CreateListingModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  listingToEdit,
  initialGameId,
  initialType
}) => {
  const [selectedGameId, setSelectedGameId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  
  // Dynamic Data Store: stores values for dynamic fields (key: value)
  const [dynamicValues, setDynamicValues] = useState<Record<string, any>>({});
  
  // Screenshots state (URLs)
  const [screenshots, setScreenshots] = useState<string[]>(['', '', '']);

  // Common Data Store
  const [commonData, setCommonData] = useState({
    title: '',
    type: 'currency', // Default type (used as category key)
    description: '',
    price: '',
    currency: 'RUB',
    stock: '',
    deliveryTime: '15 мин',
    warranty: '3 дня' // Default warranty
  });

  // Reset or Populate state when opening
  useEffect(() => {
    if (isOpen) {
      if (listingToEdit) {
        // --- EDIT MODE ---
        setSelectedGameId(listingToEdit.gameId);
        
        // Reverse map type if CS2
        let displayType = listingToEdit.type;
        if (listingToEdit.gameId === 'g2') {
           if (listingToEdit.type === 'item' && listingToEdit.details?.type === 'Case') displayType = 'case';
           else if (listingToEdit.type === 'item') displayType = 'skin';
           else if (listingToEdit.type === 'account' && listingToEdit.details?.primeStatus) displayType = 'prime';
        }

        setCommonData({
          title: listingToEdit.title,
          type: displayType,
          description: listingToEdit.description || '',
          price: listingToEdit.price.toString(),
          currency: listingToEdit.currency,
          stock: listingToEdit.stock.toString(),
          deliveryTime: listingToEdit.deliveryTime,
          warranty: listingToEdit.warranty || '3 дня'
        });
        
        if (listingToEdit.details) {
          setDynamicValues(listingToEdit.details);
        }

        if (listingToEdit.screenshots && listingToEdit.screenshots.length > 0) {
          // Pad array to at least 3
          const padded = [...listingToEdit.screenshots];
          while (padded.length < 3) padded.push('');
          setScreenshots(padded);
        } else {
          setScreenshots(['', '', '']);
        }

      } else {
        // --- CREATE MODE ---
        // Use initial props if provided
        const gameId = initialGameId || '';
        setSelectedGameId(gameId);
        
        // Determine initial type
        let defaultType = 'currency';
        
        // Map common IDs to type
        if (gameId === 'g2') defaultType = 'skin'; // CS2 default
        else if (gameId === 'g3' || gameId === 'g5' || gameId === 'g7') defaultType = 'account';
        else if (gameId === 'g11') defaultType = 'donation'; // Mobile Legends default
        else if (gameId === 'g12') defaultType = 'account'; // PUBG default
        else if (gameId === 'g13') defaultType = 'account'; // Apex default
        else if (gameId === 'g14') defaultType = 'currency'; // ARC Raiders default
        else if (gameId === 'g15') defaultType = 'currency'; // Ashes of Creation default
        else if (gameId === 'g4') defaultType = 'currency';
        else if (gameId === 'g8') defaultType = 'currency'; // EFT default
        else if (gameId === 'g10') defaultType = 'currency'; // Albion default

        // Override if initialType is provided and valid (not 'all')
        if (initialType && initialType !== 'all') {
          defaultType = initialType;
        }

        setDynamicValues({});
        setScreenshots(['', '', '']);
        setCommonData({
          title: '',
          type: defaultType,
          description: '',
          price: '',
          currency: 'RUB',
          stock: '',
          deliveryTime: '15 мин',
          warranty: '3 дня'
        });
      }
    }
  }, [isOpen, listingToEdit, initialGameId, initialType]);

  // Whenever game changes, reset type to default for that game (only if user manually changes game in modal or init)
  // We need to be careful not to overwrite the type if we just set it from initialType in the effect above.
  // The effect below runs on selectedGameId change. 
  useEffect(() => {
     if (selectedGameId && !listingToEdit && isOpen) {
         // Only reset type if it doesn't match the initialType passed (meaning user switched game manually)
         
         // Re-applying defaults if game changes
         if (selectedGameId === 'g2' && commonData.type === 'currency') {
             setCommonData(prev => ({ ...prev, type: 'skin' }));
         } else if ((selectedGameId === 'g3' || selectedGameId === 'g5' || selectedGameId === 'g7') && commonData.type === 'currency') {
             setCommonData(prev => ({ ...prev, type: 'account' }));
         } else if (selectedGameId === 'g11') {
             setCommonData(prev => ({ ...prev, type: 'donation' }));
         } else if (selectedGameId === 'g12') {
             setCommonData(prev => ({ ...prev, type: 'account' }));
         } else if (selectedGameId === 'g13') {
             setCommonData(prev => ({ ...prev, type: 'account' }));
         } else if (selectedGameId === 'g14') {
             setCommonData(prev => ({ ...prev, type: 'currency' }));
         } else if (selectedGameId === 'g15') {
             setCommonData(prev => ({ ...prev, type: 'currency' }));
         }
     }
  }, [selectedGameId]);

  if (!isOpen) return null;

  // Helpers
  const getConfig = (): GameConfig => {
    return GAME_CONFIGS[selectedGameId] || GAME_CONFIGS['default'];
  };

  const handleDynamicChange = (key: string, value: any) => {
    setDynamicValues(prev => ({ ...prev, [key]: value }));
  };

  const handleScreenshotChange = (index: number, value: string) => {
    const newScreenshots = [...screenshots];
    newScreenshots[index] = value;
    setScreenshots(newScreenshots);
  };

  const addScreenshotField = () => {
    if (screenshots.length < 5) {
      setScreenshots([...screenshots, '']);
    }
  };

  const handleGenerateAI = async () => {
    if (!selectedGameId) return;
    setLoading(true);
    
    const gameName = POPULAR_GAMES.find(g => g.id === selectedGameId)?.name || 'Game';
    
    // Convert dynamic values to readable strings for AI
    const features = Object.entries(dynamicValues).map(([key, val]) => {
      // Find label if possible
      const conf = getConfig().filters.find(f => f.key === key);
      const label = conf ? conf.label : key;
      
      if (typeof val === 'object' && val !== null) {
        // Explicitly cast to prevent TS error
        const v = val as { min?: string | number; max?: string | number };
        return `${label}: ${v.min || ''}-${v.max || ''}`;
      }
      return `${label}: ${val}`;
    });

    features.push(`Доставка: ${commonData.deliveryTime}`);
    if (commonData.type === 'account' || commonData.type === 'prime') {
       features.push(`Гарантия: ${commonData.warranty}`);
    }

    const desc = await generateListingDescription(
      gameName,
      commonData.title || (commonData.type === 'currency' ? 'Валюта' : 'Товар'),
      commonData.type,
      features
    );
    
    setCommonData(prev => ({ ...prev, description: desc }));
    setLoading(false);
  };

  const handleSubmit = () => {
    // Determine title to validate/submit
    let finalTitle = commonData.title;
    
    // For Currency, auto-generate title if hidden
    if (commonData.type === 'currency') {
        const gameName = POPULAR_GAMES.find(g => g.id === selectedGameId)?.name || 'Game';
        const server = dynamicValues['server'] ? ` ${dynamicValues['server']}` : '';
        const region = dynamicValues['region'] ? ` [${dynamicValues['region']}]` : '';
        finalTitle = `${gameName}${server}${region} Валюта`;
    }

    // Validate required fields
    if (!selectedGameId || !finalTitle || !commonData.price) {
      alert("Пожалуйста, заполните обязательные поля (Игра, Цена)");
      return;
    }

    // Filter out empty screenshot URLs
    const validScreenshots = screenshots.filter(s => s.trim() !== '');

    // Normalize Types
    let finalType: Listing['type'] = commonData.type as Listing['type'];
    const finalDetails = { ...dynamicValues };

    if (selectedGameId === 'g2') {
        if (commonData.type === 'skin') {
            finalType = 'item';
        } else if (commonData.type === 'case') {
            finalType = 'item';
            finalDetails['type'] = 'Case'; // Force the detail for filtering
        } else if (commonData.type === 'prime') {
            finalType = 'account';
            finalDetails['primeStatus'] = true;
        } else if (commonData.type === 'account') {
            finalType = 'account';
            if (finalDetails['primeStatus'] === undefined) {
               finalDetails['primeStatus'] = false;
            }
        }
    }

    const payload = {
      id: listingToEdit?.id, // Pass ID if editing
      gameId: selectedGameId,
      details: finalDetails, // Pack dynamic fields into 'details'
      ...commonData,
      type: finalType, // Use normalized type
      title: finalTitle, // Use generated title
      // Only include warranty if type is account
      warranty: (finalType === 'account') ? commonData.warranty : undefined,
      stock: parseInt(commonData.stock) || 1, // Default to 1 if empty/NaN
      screenshots: validScreenshots
    };
    
    onSubmit(payload);
    onClose();
  };

  // Helper to get category options based on game
  const getCategoryOptions = () => {
     if (selectedGameId === 'g2') { // CS2
        return [
           { value: 'skin', label: 'Скины' },
           { value: 'account', label: 'Аккаунты' },
           { value: 'case', label: 'Кейсы' },
           { value: 'prime', label: 'Prime' }
        ];
     }
     if (selectedGameId === 'g1') { // WoW
        return [
           { value: 'currency', label: 'Валюта' },
           { value: 'account', label: 'Аккаунт' },
           { value: 'item', label: 'Предмет' }
        ];
     }
     if (selectedGameId === 'g3') { // Dota 2
        return [
           { value: 'account', label: 'Аккаунт' },
           { value: 'item', label: 'Предмет' }
        ];
     }
     if (selectedGameId === 'g4') { // Diablo 4
        return [
           { value: 'currency', label: 'Валюта' },
           { value: 'account', label: 'Аккаунт' },
           { value: 'item', label: 'Предмет' }
        ];
     }
     if (selectedGameId === 'g5') { // Genshin Impact
        return [
           { value: 'account', label: 'Аккаунт' },
           { value: 'donation', label: 'Донат' },
           { value: 'item', label: 'Предмет' }
        ];
     }
     if (selectedGameId === 'g6' || selectedGameId === 'g9') { // Path of Exile & PoE 2
        return [
           { value: 'currency', label: 'Валюта' },
           { value: 'account', label: 'Аккаунт' },
           { value: 'item', label: 'Предмет' }
        ];
     }
     if (selectedGameId === 'g7') { // Valorant
        return [
           { value: 'account', label: 'Аккаунт' },
           { value: 'points', label: 'Points' }
        ];
     }
     if (selectedGameId === 'g8') { // Escape from Tarkov (g8) - exclude boosting
        return [
           { value: 'currency', label: 'Валюта' },
           { value: 'account', label: 'Аккаунт' },
           { value: 'item', label: 'Предмет' }
        ];
     }
     if (selectedGameId === 'g10') { // Albion Online (g10)
        return [
           { value: 'currency', label: 'Валюта' },
           { value: 'account', label: 'Аккаунт' },
           { value: 'item', label: 'Предмет' },
           { value: 'donation', label: 'Донат' }
        ];
     }
     if (selectedGameId === 'g11') { // Mobile Legends
        return [
           { value: 'donation', label: 'Донат' },
           { value: 'account', label: 'Аккаунт' }
        ];
     }
     if (selectedGameId === 'g12') { // PUBG
        return [
           { value: 'account', label: 'Аккаунты' },
           { value: 'donation', label: 'Донат' },
           { value: 'item', label: 'Предметы' }
        ];
     }
     if (selectedGameId === 'g13') { // Apex Legends
        return [
           { value: 'account', label: 'Аккаунты' },
           { value: 'donation', label: 'Донат' }
        ];
     }
     if (selectedGameId === 'g14') { // ARC Raiders
        return [
           { value: 'currency', label: 'Валюта' },
           { value: 'account', label: 'Аккаунты' },
           { value: 'donation', label: 'Донат' },
           { value: 'item', label: 'Предметы' }
        ];
     }
     if (selectedGameId === 'g15') { // Ashes of Creation
        return [
           { value: 'currency', label: 'Валюта' },
           { value: 'account', label: 'Аккаунты' },
           { value: 'donation', label: 'Донат' },
           { value: 'item', label: 'Предметы' }
        ];
     }
     return [
        { value: 'currency', label: 'Валюта' },
        { value: 'account', label: 'Аккаунт' },
        { value: 'item', label: 'Предмет' },
        { value: 'boosting', label: 'Бустинг' }
     ];
  };

  // State Helpers
  const isAccount = commonData.type === 'account' || commonData.type === 'prime';
  const isCurrency = commonData.type === 'currency';
  const isBoosting = commonData.type === 'boosting';
  const isDonation = commonData.type === 'donation';
  const isPoints = commonData.type === 'points';
  
  // --- UI RENDERERS FOR DYNAMIC FIELDS ---

  const renderField = (field: FilterConfig) => {
    // Check if this filter is valid for the selected listing type
    if (field.validTypes && !field.validTypes.includes(commonData.type)) {
       return null;
    }

    const value = dynamicValues[field.key];

    switch (field.type) {
      case 'select':
        return (
          <div key={field.key} className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">{field.label}</label>
            <div className="relative">
              <select
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white appearance-none focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all hover:border-slate-600"
                value={value || ''}
                onChange={(e) => handleDynamicChange(field.key, e.target.value)}
              >
                <option value="" disabled>Выберите...</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronRight className="w-4 h-4 text-slate-500 rotate-90" />
              </div>
            </div>
          </div>
        );

      case 'range':
        const currentRange = value || { min: '', max: '' };
        return (
          <div key={field.key} className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">{field.label}</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder={`От ${field.min ?? ''}`}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                value={currentRange.min}
                onChange={(e) => handleDynamicChange(field.key, { ...currentRange, min: e.target.value })}
              />
              <span className="text-slate-500">–</span>
              <input
                type="number"
                placeholder={`До ${field.max ?? ''}`}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                value={currentRange.max}
                onChange={(e) => handleDynamicChange(field.key, { ...currentRange, max: e.target.value })}
              />
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.key} className="flex items-center space-x-3 pt-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={!!value}
                onChange={(e) => handleDynamicChange(field.key, e.target.checked)}
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600"></div>
              <span className="ml-3 text-sm font-medium text-slate-300">{field.label}</span>
            </label>
          </div>
        );

      case 'number':
        return (
           <div key={field.key} className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">{field.label}</label>
            <input
              type="number"
              placeholder={field.placeholder || '0'}
              min={field.min}
              max={field.max}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              value={value || ''}
              onChange={(e) => handleDynamicChange(field.key, e.target.value)}
            />
          </div>
        );

      default: // text
        return (
          <div key={field.key} className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">{field.label}</label>
            <input
              type="text"
              placeholder={field.placeholder}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
              value={value || ''}
              onChange={(e) => handleDynamicChange(field.key, e.target.value)}
            />
          </div>
        );
    }
  };

  // Fees calculation (5%)
  const numericPrice = parseFloat(commonData.price) || 0;
  const fee = numericPrice * 0.05; 
  const earnings = numericPrice - fee;
  
  const currencySymbol = commonData.currency === 'RUB' ? '₽' : commonData.currency === 'USD' ? '$' : '₸';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[95vh] border border-slate-700/50">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-800">
          <h2 className="text-2xl font-black text-white tracking-tight">
             {listingToEdit ? 'Редактирование лота' : 'Создание лота'}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar flex-1 px-8 py-6 space-y-8">
          
          {/* 1. Game & Type Selection */}
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Шаг 1: Основное</label>
                <div className="h-px bg-slate-800 flex-1"></div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Игра</label>
                  <div className="relative">
                      <select
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white font-medium appearance-none focus:ring-2 focus:ring-brand-500 focus:outline-none shadow-lg cursor-pointer hover:border-brand-500/50 transition-colors"
                        value={selectedGameId}
                        onChange={(e) => setSelectedGameId(e.target.value)}
                        disabled={!!listingToEdit}
                      >
                        <option value="" disabled>-- Выберите игру --</option>
                        {POPULAR_GAMES.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronRight className="w-4 h-4 text-slate-500 rotate-90" />
                      </div>
                  </div>
               </div>

               <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-300">Категория</label>
                  <div className="relative">
                      <select
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white font-medium appearance-none focus:ring-2 focus:ring-brand-500 focus:outline-none shadow-lg cursor-pointer hover:border-brand-500/50 transition-colors"
                        value={commonData.type}
                        onChange={(e) => setCommonData({...commonData, type: e.target.value})}
                      >
                         {getCategoryOptions().map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                         ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronRight className="w-4 h-4 text-slate-500 rotate-90" />
                      </div>
                  </div>
               </div>
             </div>
          </div>

          {/* Render Dynamic Content only if Game is Selected */}
          {selectedGameId && (
            <div className="animate-fade-in space-y-8">
               
               {/* 2. Dynamic Filters */}
               {getConfig().filters.length > 0 && (
                 <div className="space-y-4">
                    <div className="flex items-center gap-2">
                       <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Шаг 2: Параметры</label>
                       <div className="h-px bg-slate-800 flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                      {getConfig().filters.map(field => renderField(field))}
                    </div>
                 </div>
               )}

               {/* 3. Common Fields */}
               <div className="space-y-6">
                  <div className="flex items-center gap-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Шаг 3: Детали предложения</label>
                      <div className="h-px bg-slate-800 flex-1"></div>
                  </div>

                  {/* Title (Hidden for Currency) */}
                  {commonData.type !== 'currency' && (
                     <div className="space-y-1.5 animate-fade-in">
                        <label className="text-sm font-medium text-slate-300">Название лота <span className="text-red-500">*</span></label>
                        <input 
                           type="text"
                           placeholder="Краткое и емкое название"
                           className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none font-medium"
                           value={commonData.title}
                           onChange={(e) => setCommonData({...commonData, title: e.target.value})}
                        />
                     </div>
                  )}

                  {/* Description & AI */}
                  <div className="space-y-1.5">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-medium text-slate-300">Описание</label>
                        <button 
                          onClick={handleGenerateAI}
                          disabled={loading}
                          className="text-xs flex items-center gap-1.5 text-brand-400 hover:text-white bg-brand-500/10 hover:bg-brand-500/20 px-3 py-1.5 rounded-lg border border-brand-500/20 transition-all"
                        >
                          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                          AI-помощник
                        </button>
                     </div>
                     <textarea 
                        rows={6}
                        placeholder="Общее описание продаваемого продукта/услуги. Укажите важные детали сделки..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm leading-relaxed"
                        value={commonData.description}
                        onChange={(e) => setCommonData({...commonData, description: e.target.value})}
                     />
                  </div>

                  {/* Price, Currency, Stock, Delivery, Warranty Grid */}
                  <div className="flex flex-col md:flex-row gap-6">
                      
                      {/* Price (Flexible Width) */}
                      <div className="space-y-1.5 flex-grow-[2]">
                         <label className="text-sm font-medium text-slate-300">Цена <span className="text-red-500">*</span></label>
                         <div className="flex">
                            <input 
                              type="number" 
                              placeholder="0"
                              className="w-full bg-slate-950 border border-r-0 border-slate-700 rounded-l-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none font-bold min-w-[80px]"
                              value={commonData.price}
                              onChange={(e) => setCommonData({...commonData, price: e.target.value})}
                            />
                            <select 
                               className="bg-slate-800 border border-l-0 border-slate-700 rounded-r-xl px-3 text-white text-sm font-bold focus:outline-none hover:bg-slate-700 cursor-pointer"
                               value={commonData.currency}
                               onChange={(e) => setCommonData({...commonData, currency: e.target.value})}
                            >
                               <option value="RUB">RUB</option>
                               <option value="USD">USD</option>
                               <option value="KZT">KZT</option>
                            </select>
                         </div>
                      </div>
                      
                      {/* Stock (Small Width) */}
                      <div className="space-y-1.5 w-full md:w-24 flex-shrink-0">
                         <label className="text-sm font-medium text-slate-300">Кол-во</label>
                         <input 
                            type="number" 
                            placeholder="1"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-3 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-center"
                            value={commonData.stock}
                            onChange={(e) => setCommonData({...commonData, stock: e.target.value})}
                         />
                      </div>

                      {/* Delivery (Flexible) */}
                      <div className="space-y-1.5 flex-1">
                         <label className="text-sm font-medium text-slate-300">Доставка</label>
                         <select 
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none appearance-none"
                            value={commonData.deliveryTime}
                            onChange={(e) => setCommonData({...commonData, deliveryTime: e.target.value})}
                         >
                            <option>Моментально</option>
                            <option>15 мин</option>
                            <option>1 - 3 часа</option>
                            <option>24 часа</option>
                         </select>
                      </div>

                      {/* Warranty (Conditional, last in row) */}
                      {isAccount && (
                        <div className="space-y-1.5 flex-1 animate-fade-in">
                           <label className="text-sm font-medium text-slate-300 flex items-center">
                              <ShieldCheck className="w-3 h-3 mr-1 text-green-400" /> Гарантия
                           </label>
                           <select 
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none appearance-none"
                              value={commonData.warranty}
                              onChange={(e) => setCommonData({...commonData, warranty: e.target.value})}
                           >
                              <option value="3 дня">3 дня</option>
                              <option value="5 дней">5 дней</option>
                              <option value="7 дней">7 дней</option>
                              <option value="14 дней">14 дней</option>
                           </select>
                        </div>
                      )}
                  </div>

                  {/* Screenshots (URL Inputs) - Hide for currency & boosting & donation & points */}
                  {(!isCurrency && !isBoosting && !isDonation && !isPoints) && (
                    <div className="space-y-3">
                       <div className="flex justify-between items-end">
                         <label className="text-sm font-medium text-slate-300 flex items-center">
                            <ImageIcon className="w-4 h-4 mr-2 text-brand-400" />
                            Скриншоты (URL)
                         </label>
                         {screenshots.length < 5 && (
                           <button 
                             onClick={addScreenshotField}
                             className="text-xs text-brand-400 hover:text-brand-300 flex items-center font-medium"
                           >
                             <Plus className="w-3 h-3 mr-1" /> Добавить ссылку
                           </button>
                         )}
                       </div>
                       
                       <div className="space-y-3">
                          {screenshots.map((url, index) => (
                            <div key={index} className="relative">
                               <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                                  <LinkIcon className="w-4 h-4" />
                                </div>
                               <input 
                                  type="text"
                                  placeholder="https://"
                                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none text-sm"
                                  value={url}
                                  onChange={(e) => handleScreenshotChange(index, e.target.value)}
                               />
                            </div>
                          ))}
                       </div>
                    </div>
                  )}

                  {/* Fee Info */}
                  <div className="bg-slate-800/50 rounded-xl p-4 flex justify-between items-center text-sm border border-slate-800">
                     <div className="flex items-center text-slate-400">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Комиссия сервиса 5%
                     </div>
                     <div className="text-right">
                        <span className="text-slate-500 mr-2">Вы получите:</span>
                        <span className="text-green-400 font-bold text-lg">
                           {earnings > 0 ? earnings.toFixed(2) : '0'} {currencySymbol}
                        </span>
                     </div>
                  </div>

               </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-900 flex justify-end gap-4 rounded-b-3xl">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-medium"
          >
            Отмена
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!selectedGameId}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white hover:from-brand-500 hover:to-brand-400 transition-all transform hover:scale-105 font-bold shadow-lg shadow-brand-900/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center"
          >
            {listingToEdit ? <Save className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
            {listingToEdit ? 'Сохранить' : 'Создать лот'}
          </button>
        </div>
      </div>
    </div>
  );
};
