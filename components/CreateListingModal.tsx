import React, { useState } from 'react';
import { X, Sparkles, ChevronRight, ChevronLeft, Loader2, Gamepad2, Coins, Tag, Clock, AlertCircle } from 'lucide-react';
import { generateListingDescription } from '../services/gemini';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CreateListingModal: React.FC<CreateListingModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [game, setGame] = useState('World of Warcraft');
  const [category, setCategory] = useState('currency');
  const [server, setServer] = useState('');
  const [faction, setFaction] = useState('');
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('15 мин');

  if (!isOpen) return null;

  const handleGenerateAI = async () => {
    if (!game || !category) return;
    setLoading(true);
    // Construct a rich context for the AI
    const contextItem = title || `${category} на сервере ${server}`;
    const desc = await generateListingDescription(
      game,
      contextItem,
      category,
      ['Безопасно', 'Ручная работа', `Доставка ${deliveryTime}`, server ? `Сервер ${server}` : '']
    );
    setDescription(desc);
    setLoading(false);
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = () => {
    onSubmit({
       game, category, server, faction, title, description, price, stock, deliveryTime
    });
    onClose();
    // Reset steps for next time
    setTimeout(() => setStep(1), 500);
  };

  // Fee calculation (Mock 10%)
  const numericPrice = parseFloat(price) || 0;
  const fee = numericPrice * 0.1;
  const earnings = numericPrice - fee;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div>
             <h2 className="text-xl font-bold text-white">Новый лот</h2>
             <p className="text-sm text-slate-400">Шаг {step} из 3</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-slate-800">
          <div 
             className="h-full bg-brand-500 transition-all duration-300 ease-out"
             style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          
          {/* STEP 1: CATEGORY & PARAMS */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
               <div className="space-y-4">
                  <label className="block">
                     <span className="text-sm font-medium text-slate-300 mb-1.5 block">Выберите игру</span>
                     <div className="relative">
                        <Gamepad2 className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                        <select 
                           value={game} 
                           onChange={(e) => setGame(e.target.value)}
                           className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none appearance-none"
                        >
                           <option>World of Warcraft</option>
                           <option>Lost Ark</option>
                           <option>Diablo IV</option>
                           <option>Path of Exile</option>
                        </select>
                     </div>
                  </label>

                  <label className="block">
                     <span className="text-sm font-medium text-slate-300 mb-1.5 block">Тип товара</span>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {['currency', 'account', 'item', 'boosting'].map(t => (
                           <div 
                              key={t}
                              onClick={() => setCategory(t)}
                              className={`cursor-pointer rounded-lg border p-3 text-center transition-all ${category === t ? 'bg-brand-500/20 border-brand-500 text-brand-300' : 'bg-slate-950 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                           >
                              <span className="text-sm font-medium capitalize">{t === 'currency' ? 'Валюта' : t === 'account' ? 'Аккаунт' : t === 'item' ? 'Предмет' : 'Услуга'}</span>
                           </div>
                        ))}
                     </div>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                     <label className="block">
                        <span className="text-sm font-medium text-slate-300 mb-1.5 block">Сервер / Реалм</span>
                        <input 
                           type="text" 
                           placeholder="Напр. Гордунни"
                           value={server}
                           onChange={(e) => setServer(e.target.value)}
                           className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                        />
                     </label>
                     <label className="block">
                        <span className="text-sm font-medium text-slate-300 mb-1.5 block">Фракция (если есть)</span>
                        <select 
                           value={faction}
                           onChange={(e) => setFaction(e.target.value)}
                           className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                        >
                           <option value="">Любая / Не важно</option>
                           <option value="alliance">Альянс</option>
                           <option value="horde">Орда</option>
                        </select>
                     </label>
                  </div>
               </div>
            </div>
          )}

          {/* STEP 2: DESCRIPTION & AI */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
               <label className="block">
                  <span className="text-sm font-medium text-slate-300 mb-1.5 block">Краткий заголовок</span>
                  <input 
                     type="text" 
                     placeholder="Напр. 100k Золота - Быстрая доставка"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                  <p className="text-xs text-slate-500 mt-1">Именно это увидят покупатели в поиске.</p>
               </label>

               <div className="relative">
                  <div className="flex justify-between items-center mb-1.5">
                     <span className="text-sm font-medium text-slate-300">Подробное описание</span>
                     <button 
                        onClick={handleGenerateAI}
                        disabled={loading}
                        className="text-xs flex items-center text-brand-400 hover:text-brand-300 transition-colors bg-brand-400/10 px-2 py-1 rounded-md border border-brand-400/20"
                     >
                        {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                        Заполнить с помощью Gemini
                     </button>
                  </div>
                  <textarea 
                     rows={6}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     placeholder="Укажите время работы, способ передачи и гарантии..."
                     className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none leading-relaxed text-sm"
                  />
               </div>

               <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-200">
                     Не указывайте контакты (Discord, TG) в описании. Общение должно проходить только через чат LootBuy для защиты сделки.
                  </p>
               </div>
            </div>
          )}

          {/* STEP 3: PRICE & DELIVERY */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
               <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                     <span className="text-sm font-medium text-slate-300 mb-1.5 block">Цена (RUB)</span>
                     <div className="relative">
                        <span className="absolute left-3 top-3 text-slate-500">₽</span>
                        <input 
                           type="number" 
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                           className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-8 pr-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none font-bold"
                           placeholder="0"
                        />
                     </div>
                  </label>
                  <label className="block">
                     <span className="text-sm font-medium text-slate-300 mb-1.5 block">Количество</span>
                     <input 
                        type="number" 
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                        placeholder="1"
                     />
                  </label>
               </div>

               <label className="block">
                  <span className="text-sm font-medium text-slate-300 mb-1.5 block">Время доставки</span>
                  <div className="relative">
                     <Clock className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
                     <select 
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none appearance-none"
                     >
                        <option>Моментально (Автовыдача)</option>
                        <option>15 мин</option>
                        <option>1 час</option>
                        <option>12 часов</option>
                        <option>24 часа</option>
                     </select>
                  </div>
               </label>

               {/* Calculation Card */}
               <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                  <h4 className="text-sm font-bold text-white mb-3">Расчет прибыли</h4>
                  <div className="flex justify-between text-sm mb-2">
                     <span className="text-slate-400">Цена для покупателя:</span>
                     <span className="text-white">{numericPrice.toFixed(2)} ₽</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2 border-b border-slate-700 pb-2">
                     <span className="text-slate-400">Комиссия сервиса (10%):</span>
                     <span className="text-red-400">-{fee.toFixed(2)} ₽</span>
                  </div>
                  <div className="flex justify-between text-base font-bold pt-1">
                     <span className="text-slate-200">Вы получите:</span>
                     <span className="text-green-400">{earnings > 0 ? earnings.toFixed(2) : '0.00'} ₽</span>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-between rounded-b-2xl">
           {step > 1 ? (
             <button 
               onClick={handleBack}
               className="px-6 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors font-medium flex items-center"
             >
               <ChevronLeft className="w-4 h-4 mr-1" /> Назад
             </button>
           ) : (
             <button 
               onClick={onClose}
               className="px-6 py-2 rounded-lg bg-transparent text-slate-400 hover:text-white transition-colors font-medium"
             >
               Отмена
             </button>
           )}

           {step < 3 ? (
             <button 
               onClick={handleNext}
               className="px-6 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-500 transition-colors font-bold flex items-center shadow-lg shadow-brand-900/20"
             >
               Далее <ChevronRight className="w-4 h-4 ml-1" />
             </button>
           ) : (
             <button 
               onClick={handleSubmit}
               className="px-8 py-2 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 transition-all transform hover:scale-105 font-bold shadow-lg shadow-green-900/20"
             >
               Опубликовать лот
             </button>
           )}
        </div>

      </div>
    </div>
  );
};