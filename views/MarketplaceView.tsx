

import React, { useState, useEffect } from 'react';
import { RECENT_LISTINGS, POPULAR_GAMES, MOCK_BOOSTING_REQUESTS } from '../services/mockData';
import { GAME_CONFIGS } from '../services/gameConfigs';
import { getBoostingCategories } from '../services/boostingConfigs';
import { ListingCard } from '../components/ListingCard';
import { GameCard } from '../components/GameCard';
import { ChevronDown, Search, ShieldCheck, Zap, ChevronLeft, Gamepad2, Layers, Filter, LayoutGrid, List as ListIcon, ChevronRight as ChevronRightIcon, ClipboardList, Send, CheckCircle2, Server, Timer, Star, ShoppingCart, User as UserIcon, RefreshCw, Clock, MousePointerClick, BoxSelect, Plus, Minus, AlignLeft } from 'lucide-react';
import { Game, Listing, BoostingRequest, User } from '../types';

interface MarketplaceViewProps {
  onBuy: (listing: Listing) => void;
  onNavigate?: (view: string, data?: any) => void;
  currentUser?: User; // Optional, as it might be used in guest mode
}

const ITEMS_PER_PAGE = 12;

// Helper to parse delivery time strings into minutes for sorting/averaging
const parseDeliveryMinutes = (str: string): number => {
    const s = str.toLowerCase();
    if (s.includes('instant') || s.includes('моментально') || s.includes('fast')) return 0;
    const num = parseInt(s.replace(/\D/g, '')) || 0;
    if (s.includes('час')) return num * 60;
    if (s.includes('день') || s.includes('дней')) return num * 1440;
    return num; // assume minutes
};

// Define Tab Structure
interface TabConfig {
  id: string;
  label: string;
  icon?: string;
  color?: string;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onBuy, onNavigate, currentUser }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  
  // State for dynamic filters (used for Currency Region/Server/Faction as well)
  const [dynamicFilters, setDynamicFilters] = useState<Record<string, any>>({});
  const [showFilters, setShowFilters] = useState(false);

  // View & Sort State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState<string>('rating'); // 'rating', 'price_asc', 'price_desc'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  
  // --- BOOSTING FORM STATE ---
  const [boostingCategory, setBoostingCategory] = useState<string>('');
  const [boostingFormValues, setBoostingFormValues] = useState<Record<string, any>>({});
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  
  // Quick buy inputs for currency table
  const [currencyInputs, setCurrencyInputs] = useState<Record<string, string>>({});
  
  // Currency Selection State
  const [selectedListingId, setSelectedListingId] = useState<string | null>(null);

  const isSeller = currentUser?.role === 'seller';
  const boostingCategories = selectedGame ? getBoostingCategories(selectedGame.id) : [];

  // Scroll to top when page changes
  useEffect(() => {
    if (selectedGame) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  // Reset selected listing when filters change
  useEffect(() => {
    setSelectedListingId(null);
  }, [dynamicFilters, selectedGame]);

  // Determine Tabs based on selected Game
  const getGameTabs = (gameId: string): TabConfig[] => {
     if (gameId === 'g2') { // Counter-Strike 2
        return [
           { id: 'all', label: 'Все' },
           { id: 'skin', label: 'Скины', color: 'bg-blue-400' }, // Custom ID for Skins
           { id: 'account', label: 'Аккаунты', color: 'bg-purple-400' }, // New Accounts Category
           { id: 'case', label: 'Кейсы', color: 'bg-yellow-400' }, // Custom ID for Cases
           { id: 'prime', label: 'Prime', color: 'bg-green-400' }, // Custom ID for Prime Accounts
           { id: 'boosting', label: 'Бустинг', color: 'bg-red-400' }
        ];
     }
     // Default for WoW etc.
     return [
        { id: 'all', label: 'Все' },
        { id: 'currency', label: 'Валюта', color: 'bg-yellow-400' },
        { id: 'account', label: 'Аккаунты', color: 'bg-purple-400' },
        { id: 'item', label: 'Предметы', color: 'bg-blue-400' },
        { id: 'boosting', label: 'Бустинг', color: 'bg-red-400' }
     ];
  };

  // Filter listings based on selected game and type
  const getFilteredListings = () => {
    if (!selectedGame) return [];
    if (selectedType === 'boosting') return []; // Boosting handled separately
    
    // Base filter: Game
    let filtered = RECENT_LISTINGS.filter(l => l.gameId === selectedGame.id);
    
    // Fallback for demo: populate generic listings if empty (except currency which needs specific logic)
    if (selectedType !== 'currency' && filtered.length === 0) {
        filtered = RECENT_LISTINGS.map(l => ({...l, gameId: selectedGame.id})); 
    } else if (selectedType === 'currency') {
         filtered = RECENT_LISTINGS.filter(l => l.gameId === selectedGame.id && l.type === 'currency');
    }

    // Type Filtering
    if (selectedType !== 'all') {
      if (selectedGame.id === 'g2') {
         // CS2 Specific Filters
         if (selectedType === 'skin') {
            // Skins are items that are NOT cases
            filtered = filtered.filter(item => item.type === 'item' && item.details?.type !== 'Case');
         } else if (selectedType === 'case') {
            // Cases are items with detail type Case
            filtered = filtered.filter(item => item.type === 'item' && item.details?.type === 'Case');
         } else if (selectedType === 'prime') {
            // Prime are accounts with primeStatus
            filtered = filtered.filter(item => item.type === 'account' && item.details?.primeStatus === true);
         } else if (selectedType === 'account') {
            // All accounts (Prime and others)
            filtered = filtered.filter(item => item.type === 'account');
         }
      } else {
         // Standard Filters
         filtered = filtered.filter(item => item.type === selectedType);
      }
    }

    // Apply Dynamic Filters (Crucial for Currency Region/Server/Faction)
    if (Object.keys(dynamicFilters).length > 0) {
        filtered = filtered.filter(item => {
            return Object.entries(dynamicFilters).every(([key, value]) => {
                if (!value || value === 'all' || value === '') return true;
                // Check in item details
                return item.details && String(item.details[key]) === String(value);
            });
        });
    }
    
    // Apply Sorting (Only for general grid, Currency view handles its own sorting internally)
    if (selectedType !== 'currency') {
        return filtered.sort((a, b) => {
          if (sortOption === 'price_asc') return a.price - b.price;
          if (sortOption === 'price_desc') return b.price - a.price;
          // Default: Rating High to Low
          return b.seller.stats.rating - a.seller.stats.rating;
        });
    }

    return filtered;
  };

  const allFilteredListings = getFilteredListings();
  const currentTabs = selectedGame ? getGameTabs(selectedGame.id) : [];
  
  // Pagination Logic (Standard view)
  const totalPages = Math.ceil(allFilteredListings.length / ITEMS_PER_PAGE);
  const paginatedListings = allFilteredListings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCardClick = (listing: Listing) => {
    if (onNavigate) {
      onNavigate('listing-detail', listing);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleBoostingSubmit = () => {
    setRequestSubmitted(true);
    setTimeout(() => {
      setRequestSubmitted(false);
      setBoostingCategory('');
      setBoostingFormValues({});
    }, 3000);
  };
  
  const handleBoostingFieldChange = (key: string, value: any) => {
     setBoostingFormValues(prev => ({...prev, [key]: value}));
  };

  // --- CURRENCY LOGIC ---
  const handleCurrencyInputChange = (listingId: string, val: string) => {
      setCurrencyInputs(prev => ({...prev, [listingId]: val}));
  };

  const handleAdjustAmount = (listingId: string, delta: number, min: number, max: number) => {
      const currentStr = currencyInputs[listingId];
      // Default to min if empty or not set
      const currentVal = currentStr ? parseFloat(currentStr) : min;
      
      let newVal = currentVal + delta;
      
      // Enforce limits
      if (newVal < min) newVal = min;
      if (newVal > max) newVal = max;
      
      setCurrencyInputs(prev => ({...prev, [listingId]: String(newVal)}));
  };

  const handleCurrencyBuy = (listing: Listing) => {
      // Use state input or fallback to minOrder
      const inputValue = currencyInputs[listing.id];
      const amount = inputValue ? parseFloat(inputValue) : (listing.details?.minOrder || 1);

      if (!amount || isNaN(amount)) {
          alert('Пожалуйста, введите количество');
          return;
      }
      if (amount < (listing.details?.minOrder || 0)) {
          alert(`Минимальная сумма заказа: ${listing.details?.minOrder}`);
          return;
      }
      if (amount > listing.stock) {
          alert(`Максимальное доступное количество: ${listing.stock}`);
          return;
      }
      
      // Pass modified listing with calculated price for the cart/buy flow
      const orderListing = {
          ...listing,
          price: amount * listing.price, // Total price
          stock: amount // Buying amount
      };
      
      onBuy(orderListing);
  };

  // --- GAME CATALOG VIEW ---
  if (!selectedGame) {
    return (
      <div className="min-h-screen bg-slate-950 pt-8 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 text-center">
             <h1 className="text-4xl font-black text-white tracking-tight mb-4">
               Выберите игру
             </h1>
             <p className="text-slate-400 max-w-2xl mx-auto text-lg">
               Тысячи предложений по золоту, аккаунтам и услугам в ваших любимых играх.
             </p>
          </div>

          <div className="mb-10 relative max-w-xl mx-auto">
             <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
             <input 
               type="text" 
               placeholder="Найти игру..." 
               className="w-full bg-slate-900/80 border border-slate-700/80 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 shadow-xl"
             />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {POPULAR_GAMES.map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                variant="compact"
                onClick={() => {
                  setSelectedGame(game);
                  setSelectedType('all');
                  setDynamicFilters({});
                  setShowFilters(false);
                  setCurrentPage(1);
                  window.scrollTo(0,0);
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- SPECIFIC GAME MARKETPLACE VIEW ---
  
  const gameConfig = GAME_CONFIGS[selectedGame.id] || GAME_CONFIGS['default'];
  
  // Filter context logic: Only show filters relevant to selectedType
  const relevantFilters = gameConfig.filters.filter(f => 
    !f.validTypes || (selectedType !== 'all' && f.validTypes.includes(selectedType))
  );
  
  const hasDynamicFilters = relevantFilters.length > 0;

  // --- SPECIAL RENDER FOR CURRENCY TAB ---
  if (selectedType === 'currency') {
      const serverListings = allFilteredListings; // Already filtered by dynamicFilters in getFilteredListings
      
      // Sorting Logic: Price (asc) -> DeliveryTime (asc) -> Rating (desc)
      const sortedByQuality = [...serverListings].sort((a,b) => {
          // 1. Price
          if (a.price !== b.price) return a.price - b.price;
          // 2. Delivery Time
          const timeA = parseDeliveryMinutes(a.deliveryTime);
          const timeB = parseDeliveryMinutes(b.deliveryTime);
          if (timeA !== timeB) return timeA - timeB;
          // 3. Rating
          return b.seller.stats.rating - a.seller.stats.rating;
      });

      // Determined active offer
      const bestOffer = sortedByQuality[0];
      const activeOffer = selectedListingId 
        ? (serverListings.find(l => l.id === selectedListingId) || bestOffer) 
        : bestOffer;

      // Average Delivery Calculation
      const avgMinutes = serverListings.length > 0 
          ? Math.round(serverListings.reduce((acc, curr) => acc + parseDeliveryMinutes(curr.deliveryTime), 0) / serverListings.length)
          : 0;
      const avgTimeString = avgMinutes === 0 ? '< 1 мин' : (avgMinutes >= 60 ? `~${(avgMinutes/60).toFixed(1)} ч.` : `~${avgMinutes} мин.`);

      // Identify Currency Specific Filters (Server, Region, Faction) from GameConfig
      const currencyFiltersConfig = gameConfig.filters.filter(f => 
          ['server', 'region', 'faction'].includes(f.key)
      );

      const minOrderValue = activeOffer?.details?.minOrder || 1;
      const stockValue = activeOffer?.stock || 0;

      return (
         <div className="min-h-screen bg-slate-950 pt-6 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header & Navigation */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                       <button 
                          onClick={() => { setSelectedGame(null); setSelectedType('all'); }}
                          className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                           <ChevronLeft className="w-6 h-6" />
                        </button>
                        <div className="flex items-center gap-3">
                           {selectedGame.logo && <img src={selectedGame.logo} alt="" className="w-10 h-10 rounded-lg shadow-md" />}
                           <div>
                              <h1 className="text-2xl font-bold text-white flex items-center">
                                 {selectedGame.name} <span className="mx-2 text-slate-600">/</span> Валюта
                              </h1>
                              <div className="flex items-center gap-3 mt-1">
                                <p className="text-slate-400 text-sm">
                                   {serverListings.length} предложений онлайн
                                </p>
                                <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
                                <div className="flex items-center text-sm text-slate-400 bg-slate-900/50 px-2 py-0.5 rounded border border-slate-700/50">
                                   <Timer className="w-3 h-3 mr-1.5 text-brand-400" />
                                   Средняя доставка: <span className="text-white font-mono font-bold ml-1">{avgTimeString}</span>
                                </div>
                              </div>
                           </div>
                        </div>
                    </div>
                </div>

                {/* --- TOP TYPE TABS --- */}
                <div className="glass-panel p-1 rounded-2xl mb-6 border border-slate-800/60 shadow-xl bg-slate-900/40 backdrop-blur-md">
                   <div className="p-3 flex flex-wrap gap-2 overflow-x-auto no-scrollbar">
                       {currentTabs.map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => {
                               setSelectedType(tab.id);
                               setDynamicFilters({}); // Reset filters on tab switch
                               setBoostingCategory(''); 
                            }} 
                            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center ${
                               selectedType === tab.id
                               ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                               : 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            {tab.color && <div className={`w-2 h-2 rounded-full ${tab.color} mr-2`} />}
                            {tab.label}
                          </button>
                        ))}
                   </div>
                </div>

                {/* --- CURRENCY FILTERS BAR --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {currencyFiltersConfig.map(filter => (
                        <div key={filter.key} className="relative">
                           <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                               {filter.label}
                           </label>
                           <div className="relative">
                               <select
                                   className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white appearance-none focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all cursor-pointer hover:border-slate-600"
                                   value={dynamicFilters[filter.key] || ''}
                                   onChange={(e) => setDynamicFilters(prev => ({ ...prev, [filter.key]: e.target.value }))}
                               >
                                   <option value="">Все</option>
                                   {filter.options?.map(opt => (
                                       <option key={opt} value={opt}>{opt}</option>
                                   ))}
                               </select>
                               <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                           </div>
                        </div>
                    ))}
                    
                    {/* Clear Button if filters active */}
                    {Object.keys(dynamicFilters).length > 0 && (
                        <div className="flex items-end pb-1">
                           <button 
                             onClick={() => setDynamicFilters({})}
                             className="flex items-center text-sm text-brand-400 hover:text-white transition-colors h-[46px]"
                           >
                              <RefreshCw className="w-4 h-4 mr-2" /> Сбросить
                           </button>
                        </div>
                    )}
                </div>

                {/* --- ACTIVE OFFER WIDGET (Top or Selected) --- */}
                {activeOffer ? (
                   <div className={`mb-8 relative overflow-hidden rounded-2xl border bg-gradient-to-r shadow-2xl animate-fade-in ${
                       activeOffer.id === bestOffer?.id 
                         ? 'border-yellow-500/30 from-slate-900 to-slate-800 shadow-yellow-900/10' 
                         : 'border-brand-500/30 from-slate-900 to-brand-900/10 shadow-brand-900/10'
                   }`}>
                       <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                           <Zap className={`w-48 h-48 ${activeOffer.id === bestOffer?.id ? 'text-yellow-500' : 'text-brand-500'}`} />
                       </div>
                       
                       {/* Badge */}
                       <div className={`absolute top-0 left-0 text-black text-xs font-black px-3 py-1 rounded-br-xl uppercase tracking-wider shadow-lg flex items-center ${
                          activeOffer.id === bestOffer?.id ? 'bg-yellow-500' : 'bg-brand-500 text-white'
                       }`}>
                           {activeOffer.id === bestOffer?.id ? (
                               <>
                                <Star className="w-3 h-3 mr-1 fill-black" /> Топ предложение
                               </>
                           ) : (
                               <>
                                <MousePointerClick className="w-3 h-3 mr-1" /> Выбранное предложение
                               </>
                           )}
                       </div>

                       <div className="p-6 md:p-8 relative z-10 flex flex-col lg:flex-row gap-8 items-stretch">
                           
                           {/* LEFT COLUMN: INFO & STATS */}
                           <div className="flex-1 w-full flex flex-col">
                               {/* Header: Seller Info */}
                               <div className="flex items-center justify-between mb-6 mt-2">
                                   <div className="flex items-center gap-4">
                                       <div 
                                          className="relative cursor-pointer group"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             onNavigate && onNavigate('profile', activeOffer.seller);
                                          }}
                                       >
                                           <img src={activeOffer.seller.avatar} className="w-16 h-16 rounded-full border-4 border-slate-800 shadow-xl group-hover:border-brand-500 transition-colors" alt="" />
                                            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full border-4 border-slate-800">
                                               <CheckCircle2 className="w-3 h-3" />
                                            </div>
                                       </div>
                                       <div>
                                            <h3 
                                               className="text-xl font-bold text-white flex items-center gap-2 cursor-pointer hover:text-brand-400 transition-colors"
                                               onClick={(e) => {
                                                  e.stopPropagation();
                                                  onNavigate && onNavigate('profile', activeOffer.seller);
                                               }}
                                            >
                                                {activeOffer.seller.username}
                                                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/30 flex items-center">
                                                    <Star className="w-3 h-3 mr-1 fill-current" /> {activeOffer.seller.stats.rating}
                                                </span>
                                            </h3>
                                            <div className="text-sm text-slate-400 mt-1">
                                               Сервер: <span className="text-slate-200 font-bold">{activeOffer.details?.server || 'Любой'}</span>
                                               <span className="mx-2">•</span>
                                               {activeOffer.details?.faction} {activeOffer.details?.region && `• ${activeOffer.details.region}`}
                                            </div>
                                       </div>
                                   </div>
                               </div>

                               {/* Big Stats Grid (NO CARDS, DIRECT ON BACKGROUND) */}
                               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                   <div className="flex flex-col items-center justify-center text-center p-2">
                                       <div className="text-xs text-slate-500 uppercase font-bold mb-1">Цена за единицу</div>
                                       <div className="text-3xl font-black text-brand-400">{activeOffer.price} {activeOffer.currency}</div>
                                   </div>
                                   <div className="flex flex-col items-center justify-center text-center p-2">
                                       <div className="text-xs text-slate-500 uppercase font-bold mb-1">Мин. заказ</div>
                                       <div className="text-3xl font-black text-white">{activeOffer.details?.minOrder || 1}</div>
                                   </div>
                                   <div className="flex flex-col items-center justify-center text-center p-2">
                                       <div className="text-xs text-slate-500 uppercase font-bold mb-1">В наличии</div>
                                       <div className="text-3xl font-black text-white">{activeOffer.stock.toLocaleString()}</div>
                                   </div>
                                    <div className="flex flex-col items-center justify-center text-center p-2">
                                       <div className="text-xs text-slate-500 uppercase font-bold mb-1">Время и Метод</div>
                                       <div className="flex flex-col items-center">
                                          <div className="text-3xl font-black text-green-400 flex items-center justify-center">
                                              {activeOffer.deliveryTime} <Zap className="w-5 h-5 ml-2 fill-current" />
                                          </div>
                                          {activeOffer.details?.delivery_method && (
                                             <div className="text-sm font-medium text-slate-400 mt-1 flex items-center justify-center">
                                                <BoxSelect className="w-3 h-3 mr-1.5" />
                                                {activeOffer.details.delivery_method}
                                             </div>
                                          )}
                                       </div>
                                   </div>
                               </div>

                               {/* Description Block */}
                               {activeOffer.description && (
                                   <div className="mt-auto w-full bg-slate-900/40 border border-slate-800/50 rounded-xl p-4">
                                      <div className="flex items-center mb-1 text-slate-500 text-xs font-bold uppercase tracking-wider">
                                         <AlignLeft className="w-3 h-3 mr-1.5" /> Комментарий продавца
                                      </div>
                                      <p className="text-sm text-slate-300 italic leading-relaxed">
                                         "{activeOffer.description}"
                                      </p>
                                   </div>
                               )}
                           </div>

                           {/* RIGHT COLUMN: ACTIONS */}
                           <div className="w-full lg:w-80 flex flex-col gap-4 shrink-0 justify-center">
                                <div className="bg-slate-900/80 border border-slate-700 rounded-xl overflow-hidden focus-within:border-brand-500 transition-all p-1">
                                      <div className="pl-3 pt-2 pb-1 text-slate-500 text-xs font-bold uppercase tracking-wide">Я покупаю:</div>
                                      <div className="flex items-center">
                                          {/* Minus Button */}
                                          <button 
                                            onClick={() => handleAdjustAmount(activeOffer.id, -100, minOrderValue, stockValue)}
                                            className="p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                          >
                                             <Minus className="w-5 h-5" />
                                          </button>
                                          
                                          {/* Input */}
                                          <input 
                                               type="number" 
                                               placeholder={`${minOrderValue}`}
                                               className="bg-transparent border-none text-white py-2 px-2 w-full focus:ring-0 font-bold text-2xl text-center"
                                               value={currencyInputs[activeOffer.id] || minOrderValue} // Default to minOrder if empty
                                               onChange={(e) => handleCurrencyInputChange(activeOffer.id, e.target.value)}
                                          />

                                          {/* Plus Button */}
                                           <button 
                                            onClick={() => handleAdjustAmount(activeOffer.id, 100, minOrderValue, stockValue)}
                                            className="p-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                                          >
                                             <Plus className="w-5 h-5" />
                                          </button>
                                      </div>
                                </div>
                                <button 
                                     onClick={() => handleCurrencyBuy(activeOffer)}
                                     className="w-full px-8 py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all transform hover:scale-[1.02] whitespace-nowrap text-lg"
                                >
                                    Купить сейчас
                                </button>
                           </div>
                       </div>
                   </div>
                ) : (
                    <div className="mb-8 p-6 text-center text-slate-500 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
                        <Gamepad2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Нет предложений, соответствующих фильтрам.</p>
                    </div>
                )}

                {/* --- SELLERS TABLE --- */}
                {serverListings.length > 0 && (
                    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 animate-fade-in shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-900 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Продавец</th>
                                        <th className="px-6 py-4">Сервер / Детали</th>
                                        <th className="px-6 py-4">Лимиты</th>
                                        <th className="px-6 py-4">Доставка</th>
                                        <th className="px-6 py-4 text-right">Цена за ед.</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {sortedByQuality.map(offer => (
                                        <tr 
                                          key={offer.id} 
                                          onClick={() => setSelectedListingId(offer.id)}
                                          className={`hover:bg-slate-800/30 transition-colors group cursor-pointer ${
                                              activeOffer?.id === offer.id 
                                                ? 'bg-brand-900/10 border-l-2 border-brand-500' 
                                                : 'border-l-2 border-transparent'
                                          }`}
                                        >
                                            <td className="px-6 py-4">
                                                <div 
                                                   className="flex items-center gap-3 cursor-pointer"
                                                   onClick={(e) => {
                                                      e.stopPropagation();
                                                      onNavigate && onNavigate('profile', offer.seller);
                                                   }}
                                                >
                                                    <div className="relative">
                                                        <img src={offer.seller.avatar} className="w-10 h-10 rounded-full border border-slate-700" alt="" />
                                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                                                    </div>
                                                    <div>
                                                        <div className={`font-bold text-sm transition-colors hover:underline ${activeOffer?.id === offer.id ? 'text-brand-400' : 'text-white group-hover:text-brand-400'}`}>
                                                            {offer.seller.username}
                                                        </div>
                                                        <div className="flex items-center text-xs text-yellow-500">
                                                            <Star className="w-3 h-3 fill-current mr-1" /> {offer.seller.stats.rating}
                                                            <span className="text-slate-600 mx-1">•</span>
                                                            <span className="text-slate-500">{offer.seller.stats.totalSales}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-white">
                                                    {offer.details?.server || 'Любой'}
                                                </div>
                                                <div className="text-xs text-slate-500">
                                                    {offer.details?.faction} {offer.details?.region && `• ${offer.details.region}`}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-baseline">
                                                        <span className="text-xs text-slate-500 w-12 font-medium">Мин:</span>
                                                        <span className="text-lg font-bold text-white font-mono">{offer.details?.minOrder || 1}</span>
                                                    </div>
                                                    <div className="flex items-baseline">
                                                        <span className="text-xs text-slate-500 w-12 font-medium">Макс:</span>
                                                        <span className="text-lg font-bold text-white font-mono">{offer.stock.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <div className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-2 text-slate-500" />
                                                        <span className="text-lg font-bold text-white">{offer.deliveryTime}</span>
                                                        {(offer.deliveryTime.includes('Instant') || offer.deliveryTime.includes('Моментально')) && 
                                                            <Zap className="w-4 h-4 text-green-400 ml-2 fill-current" />
                                                        }
                                                    </div>
                                                    {offer.details?.delivery_method && (
                                                       <span className="text-xs text-slate-500 pl-6 mt-0.5">
                                                          {offer.details.delivery_method}
                                                       </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="text-lg font-bold text-white">{offer.price} {offer.currency}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
         </div>
      );
  }

  // --- STANDARD LISTING GRID/LIST (Fallback for non-currency tabs) ---
  return (
    <div className="min-h-screen bg-slate-950 pt-6 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSelectedGame(null)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-3">
               {selectedGame.logo && (
                  <img src={selectedGame.logo} alt="" className="w-10 h-10 rounded-lg shadow-md" />
               )}
               <div>
                 <div className="flex items-center gap-2">
                   <h1 className="text-3xl font-bold text-white">{selectedGame.name}</h1>
                   <span className="hidden sm:inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700">
                      {selectedGame.category}
                   </span>
                 </div>
                 <p className="text-slate-400 text-sm mt-0.5">
                   {selectedType === 'boosting' ? (isSeller ? 'Лента заказов' : 'Оформить заказ') : `Найдено ${allFilteredListings.length} предложений`}
                 </p>
               </div>
            </div>
          </div>
          
          <div className="relative z-20 flex gap-2 items-center">
             
             {/* View Mode Toggle (Hide on Boosting) */}
             {selectedType !== 'boosting' && (
               <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-700 mr-2">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-white'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-slate-700 text-white shadow' : 'text-slate-500 hover:text-white'}`}
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
               </div>
             )}

             {/* Filters Toggle (Hide on Boosting) */}
             {selectedType !== 'boosting' && (
               <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center px-4 py-2.5 rounded-xl border transition-colors md:hidden ${showFilters ? 'bg-brand-600 border-brand-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'}`}
               >
                  <Filter className="w-4 h-4 mr-2" /> Фильтры
               </button>
             )}
             
             {/* Sort Select (Hide on Boosting) */}
             {selectedType !== 'boosting' && (
               <div className="relative group">
                  <select 
                     className="appearance-none bg-slate-900 border border-slate-700 text-white py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:border-brand-500 cursor-pointer hover:border-slate-600 transition-colors shadow-sm min-w-[200px]"
                     value={sortOption}
                     onChange={(e) => {
                       setSortOption(e.target.value);
                       setCurrentPage(1);
                     }}
                  >
                    <option value="rating">Высокий рейтинг продавца</option>
                    <option value="price_asc">Сначала дешевые</option>
                    <option value="price_desc">Сначала дорогие</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-slate-300" />
               </div>
             )}
          </div>
        </div>

        {/* Top Filter Toolbar */}
        <div className="glass-panel p-1 rounded-2xl mb-8 border border-slate-800/60 shadow-xl bg-slate-900/40 backdrop-blur-md sticky top-20 z-40">
           <div className="flex flex-col xl:flex-row">
              
              {/* Type Tabs */}
              <div className="p-3 flex flex-wrap gap-2 xl:flex-nowrap overflow-x-auto no-scrollbar">
                {currentTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => {
                       setSelectedType(tab.id);
                       setCurrentPage(1);
                       setBoostingCategory(''); // Reset boosting state
                    }} 
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center ${
                       selectedType === tab.id
                       ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                       : 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {tab.color && <div className={`w-2 h-2 rounded-full ${tab.color} mr-2`} />}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Standard Secondary Filters (Hide if Boosting) */}
              {selectedType !== 'boosting' && (
                <>
                  <div className="hidden xl:block w-px bg-slate-800 my-3"></div>
                  <div className="xl:hidden h-px bg-slate-800 mx-3"></div>

                  <div className="p-3 flex flex-col md:flex-row gap-4 md:items-center flex-1">
                     {/* Price Range */}
                     <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-xl border border-slate-800/50">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Цена</span>
                        <input type="number" placeholder="От" className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-600" />
                        <span className="text-slate-600 font-medium">-</span>
                        <input type="number" placeholder="До" className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-600" />
                     </div>
                     <div className="flex-1"></div>
                     <div className="flex items-center gap-4">
                        <label className="flex items-center space-x-2.5 cursor-pointer group select-none">
                           <div className="relative flex items-center">
                              <input type="checkbox" className="peer sr-only" />
                              <div className="w-5 h-5 border-2 border-slate-600 rounded bg-slate-800 peer-checked:bg-green-500 peer-checked:border-green-500 transition-all"></div>
                              <Zap className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-1 top-1 pointer-events-none" />
                           </div>
                           <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Только Online</span>
                        </label>
                        <label className="flex items-center space-x-2.5 cursor-pointer group select-none">
                           <div className="relative flex items-center">
                              <input type="checkbox" className="peer sr-only" />
                              <div className="w-5 h-5 border-2 border-slate-600 rounded bg-slate-800 peer-checked:bg-brand-500 peer-checked:border-brand-500 transition-all"></div>
                              <ShieldCheck className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-1 top-1 pointer-events-none" />
                           </div>
                           <span className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">Проверенные</span>
                        </label>
                     </div>
                  </div>
                </>
              )}
           </div>
           
           {/* DYNAMIC FILTERS BAR (Only for non-boosting) */}
           {selectedType !== 'boosting' && hasDynamicFilters && (
             <div className={`border-t border-slate-800 px-3 overflow-hidden transition-all duration-300 ${showFilters || hasDynamicFilters ? 'py-4 max-h-[500px] opacity-100' : 'md:py-4 md:max-h-[500px] md:opacity-100 py-0 max-h-0 opacity-0'}`}>
                <div className="flex flex-wrap gap-4 items-end">
                  {relevantFilters.map(filter => (
                    <div key={filter.key} className="flex-shrink-0 min-w-[140px]">
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{filter.label}</label>
                       {filter.type === 'select' && (
                         <select 
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                            onChange={(e) => {
                               setDynamicFilters({...dynamicFilters, [filter.key]: e.target.value});
                               setCurrentPage(1);
                            }}
                            value={dynamicFilters[filter.key] || ''}
                         >
                            <option value="">Все</option>
                            {filter.options?.map(o => <option key={o}>{o}</option>)}
                         </select>
                       )}
                       {(filter.type === 'number' || filter.type === 'range') && (
                          <div className="flex gap-2">
                             <input type="number" placeholder="От" className="w-16 bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-sm text-white focus:outline-none focus:border-brand-500" />
                             <input type="number" placeholder="До" className="w-16 bg-slate-950 border border-slate-700 rounded-lg px-2 py-2 text-sm text-white focus:outline-none focus:border-brand-500" />
                          </div>
                       )}
                       {filter.type === 'checkbox' && (
                          <label className="flex items-center space-x-2 cursor-pointer h-[38px]">
                             <input type="checkbox" className="rounded border-slate-700 bg-slate-950 text-brand-500 focus:ring-brand-500" />
                             <span className="text-sm text-slate-300">{filter.label}</span>
                          </label>
                       )}
                       {filter.type === 'text' && (
                          <input 
                            type="text" 
                            placeholder={filter.placeholder}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500" 
                          />
                       )}
                    </div>
                  ))}
                  <button 
                    onClick={() => { setDynamicFilters({}); setCurrentPage(1); }}
                    className="mb-1 text-xs text-brand-400 hover:text-white underline decoration-brand-400/50 hover:decoration-white"
                  >
                    Сбросить
                  </button>
                </div>
             </div>
           )}
        </div>

        {/* --- BOOSTING VIEW LOGIC --- */}
        {selectedType === 'boosting' ? (
           <div className="animate-fade-in">
              {/* SELLER VIEW: Job Board (Full Width) */}
              {isSeller ? (
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-2xl border border-slate-800">
                      <div className="flex justify-between items-center mb-6">
                         <div>
                            <h3 className="text-lg font-bold text-white flex items-center">
                               <ClipboardList className="w-5 h-5 mr-2 text-brand-400" />
                               Лента заказов ({selectedGame.name})
                            </h3>
                            <p className="text-sm text-slate-400 mt-1">
                               Откликайтесь на запросы покупателей и зарабатывайте
                            </p>
                         </div>
                         <div className="flex gap-2">
                            <select className="bg-slate-900 border border-slate-700 text-sm rounded-lg px-3 py-2 text-white">
                               <option>Все категории</option>
                               {boostingCategories.map(c => <option key={c.id}>{c.label}</option>)}
                            </select>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {MOCK_BOOSTING_REQUESTS.filter(r => r.gameId === selectedGame.id).map(req => (
                           <div 
                              key={req.id} 
                              onClick={() => onNavigate && onNavigate('boosting-request-detail', req)}
                              className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-brand-500/30 p-5 rounded-xl cursor-pointer transition-all group"
                           >
                              <div className="flex justify-between items-start mb-3">
                                 <div className="flex items-center gap-2">
                                   <span className="text-xs font-bold text-brand-400 uppercase tracking-wider bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                                      {boostingCategories.find(c => c.id === req.category)?.label || req.category}
                                   </span>
                                   <span className="text-xs text-slate-500">•</span>
                                   <span className="text-xs font-bold text-white">{req.buyer.username}</span>
                                 </div>
                                 <span className="text-xs text-slate-500 bg-slate-950 px-2 py-1 rounded">
                                    {new Date(req.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                 </span>
                              </div>
                              
                              <div className="space-y-2 mb-4">
                                 <div className="flex gap-4 text-sm text-slate-300">
                                    {req.details.server && <div>SRV: <span className="text-white font-medium">{req.details.server}</span></div>}
                                    {req.details.faction && <div>FAC: <span className="text-white font-medium">{req.details.faction}</span></div>}
                                 </div>
                                 <p className="text-sm text-slate-400 italic line-clamp-1 border-l-2 border-slate-700 pl-2">
                                    {req.details.comment || 'Без комментария'}
                                 </p>
                              </div>

                              <div className="flex justify-between items-center text-xs border-t border-slate-800/50 pt-3">
                                 <span className="text-green-400 flex items-center">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                                    Активен
                                 </span>
                                 <span className="text-brand-400 group-hover:underline">Подробнее &rarr;</span>
                              </div>
                           </div>
                        ))}
                      </div>
                    </div>
                </div>
              ) : (
                /* BUYER VIEW: Create Request Form */
                <div className="max-w-3xl mx-auto">
                   {requestSubmitted ? (
                      <div className="glass-panel p-12 rounded-3xl text-center border border-green-500/30 bg-green-900/10">
                         <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-400" />
                         </div>
                         <h2 className="text-2xl font-bold text-white mb-2">Заявка создана!</h2>
                         <p className="text-slate-300 mb-6">Продавцы скоро начнут предлагать свои услуги. Вы получите уведомление.</p>
                         <button 
                           onClick={() => setRequestSubmitted(false)}
                           className="px-6 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors"
                         >
                            Создать еще одну
                         </button>
                      </div>
                   ) : (
                      <div className="glass-panel p-8 rounded-3xl border border-slate-700 shadow-2xl">
                         <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Заказать бустинг</h2>
                            <p className="text-slate-400">Опишите задачу, и профессиональные игроки предложат свою цену</p>
                         </div>

                         {/* Step 1: Category */}
                         <div className="mb-8">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Выберите тип услуги</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                               {boostingCategories.map(cat => (
                                  <button
                                    key={cat.id}
                                    onClick={() => setBoostingCategory(cat.id)}
                                    className={`p-4 rounded-xl border text-sm font-bold transition-all ${
                                       boostingCategory === cat.id 
                                       ? 'bg-brand-600 border-brand-500 text-white shadow-lg shadow-brand-500/20' 
                                       : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                                    }`}
                                  >
                                     {cat.label}
                                  </button>
                               ))}
                            </div>
                         </div>

                         {/* Step 2: Dynamic Form */}
                         {boostingCategory && (
                            <div className="space-y-6 animate-fade-in">
                               {boostingCategories.find(c => c.id === boostingCategory)?.fields.map(field => (
                                  <div key={field.key}>
                                     <label className="text-sm font-medium text-slate-300 mb-2 block">{field.label}</label>
                                     
                                     {field.type === 'select' && (
                                        <div className="relative">
                                           <select 
                                              className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white appearance-none focus:ring-2 focus:ring-brand-500 focus:outline-none"
                                              onChange={(e) => handleBoostingFieldChange(field.key, e.target.value)}
                                           >
                                              <option>Не выбрано</option>
                                              {field.options?.map(o => <option key={o}>{o}</option>)}
                                           </select>
                                           <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                        </div>
                                     )}

                                     {field.type === 'checkbox-group' && (
                                        <div className="flex flex-wrap gap-4">
                                           {field.options?.map(opt => (
                                              <label key={opt} className="flex items-center space-x-2 cursor-pointer bg-slate-900/50 px-3 py-2 rounded-lg border border-slate-800 hover:border-slate-600 transition-colors">
                                                 <input 
                                                   type="radio" 
                                                   name={field.key} 
                                                   className="text-brand-500 focus:ring-brand-500 bg-slate-950 border-slate-700"
                                                   onChange={() => handleBoostingFieldChange(field.key, opt)}
                                                 />
                                                 <span className="text-sm text-slate-300">{opt}</span>
                                              </label>
                                           ))}
                                        </div>
                                     )}

                                     {(field.type === 'text' || field.type === 'number') && (
                                        <input 
                                           type={field.type} 
                                           placeholder={field.placeholder}
                                           className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                                           onChange={(e) => handleBoostingFieldChange(field.key, e.target.value)}
                                        />
                                     )}

                                     {field.type === 'textarea' && (
                                        <textarea 
                                           placeholder={field.placeholder}
                                           rows={4}
                                           className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                                           onChange={(e) => handleBoostingFieldChange(field.key, e.target.value)}
                                        />
                                     )}
                                  </div>
                               ))}

                               <button 
                                 onClick={handleBoostingSubmit}
                                 className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center mt-8"
                               >
                                  <Send className="w-5 h-5 mr-2" /> Опубликовать заказ
                               </button>
                            </div>
                         )}
                      </div>
                   )}
                </div>
              )}
           </div>
        ) : (
          /* LISTINGS GRID (Standard View for Items/Accounts) */
          <>
             {allFilteredListings.length > 0 ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                  {paginatedListings.map(listing => (
                    <ListingCard 
                      key={listing.id} 
                      listing={listing} 
                      variant={viewMode}
                      onBuy={onBuy}
                      onClick={() => {
                        if (onNavigate) {
                           // If list mode, we need to pass a callback or handle seller click separately
                           // For now, listing card click goes to details
                           onNavigate('listing-detail', listing);
                        }
                      }}
                    />
                  ))}
                </div>
             ) : (
                <div className="text-center py-20">
                   <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-8 h-8 text-slate-600" />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-2">Ничего не найдено</h3>
                   <p className="text-slate-500">Попробуйте изменить фильтры или категорию</p>
                   <button 
                      onClick={() => { setDynamicFilters({}); setSortOption('rating'); }}
                      className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                   >
                      Сбросить фильтры
                   </button>
                </div>
             )}

             {/* Pagination */}
             {totalPages > 1 && (
               <div className="flex justify-center mt-12 gap-2">
                 <button 
                   onClick={() => handlePageChange(currentPage - 1)}
                   disabled={currentPage === 1}
                   className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-50"
                 >
                    <ChevronLeft className="w-5 h-5" />
                 </button>
                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                   <button
                     key={page}
                     onClick={() => handlePageChange(page)}
                     className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                       currentPage === page 
                       ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                       : 'bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white'
                     }`}
                   >
                     {page}
                   </button>
                 ))}
                 <button 
                   onClick={() => handlePageChange(currentPage + 1)}
                   disabled={currentPage === totalPages}
                   className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-50"
                 >
                    <ChevronRightIcon className="w-5 h-5" />
                 </button>
               </div>
             )}
          </>
        )}
      </div>
    </div>
  );
};