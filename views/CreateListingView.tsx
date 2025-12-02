import React, { useState } from 'react';
import { generateListingDescription } from '../services/gemini';
import { Sparkles, Loader2, Info } from 'lucide-react';

interface CreateListingViewProps {
  onCancel: () => void;
}

export const CreateListingView: React.FC<CreateListingViewProps> = ({ onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    game: 'World of Warcraft',
    item: '',
    type: 'Currency',
    price: '',
    description: ''
  });

  const handleGenerateAI = async () => {
    if (!formData.item) {
      alert("Пожалуйста, введите название товара.");
      return;
    }
    setLoading(true);
    const desc = await generateListingDescription(
      formData.game, 
      formData.item, 
      formData.type, 
      ['Быстрая доставка', 'Гарантия безопасности', 'Скидка']
    );
    setFormData(prev => ({ ...prev, description: desc }));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-2xl rounded-2xl p-8 border border-slate-700 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-2xl font-bold text-white">Новое предложение</h2>
           <button onClick={onCancel} className="text-slate-400 hover:text-white">Отмена</button>
        </div>

        <div className="space-y-6">
           {/* Game Select */}
           <div>
             <label className="block text-sm font-medium text-slate-300 mb-2">Выберите игру</label>
             <select 
               className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
               value={formData.game}
               onChange={(e) => setFormData({...formData, game: e.target.value})}
             >
               <option>World of Warcraft</option>
               <option>Lost Ark</option>
               <option>Diablo IV</option>
             </select>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Название товара / услуги</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  placeholder="напр. 100k Золота"
                  value={formData.item}
                  onChange={(e) => setFormData({...formData, item: e.target.value})}
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Тип</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="Currency">Валюта</option>
                  <option value="Account">Аккаунт</option>
                  <option value="Item">Предмет</option>
                  <option value="Boosting">Бустинг</option>
                </select>
             </div>
           </div>

           {/* AI Description Section */}
           <div>
              <div className="flex justify-between items-center mb-2">
                 <label className="block text-sm font-medium text-slate-300">Описание</label>
                 <button 
                  onClick={handleGenerateAI}
                  disabled={loading}
                  className="text-xs flex items-center text-brand-400 hover:text-brand-300 transition-colors disabled:opacity-50"
                 >
                   {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Sparkles className="w-3 h-3 mr-1" />}
                   Сгенерировать AI (Gemini)
                 </button>
              </div>
              <textarea 
                rows={5}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none font-sans text-sm leading-relaxed"
                placeholder="Опишите ваш товар подробно..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
              <p className="text-xs text-slate-500 mt-1 flex items-center">
                 <Info className="w-3 h-3 mr-1" />
                 Совет: AI-описания повышают продажи на 30%.
              </p>
           </div>

           <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Цена (RUB)</label>
              <div className="relative">
                 <span className="absolute left-3 top-3 text-slate-500">₽</span>
                 <input 
                    type="number" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 pl-7 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
              </div>
           </div>

           <button className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-500/20 transform transition hover:scale-[1.01]">
              Опубликовать
           </button>
        </div>
      </div>
    </div>
  );
};