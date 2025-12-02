import React, { useState } from 'react';
import { RECENT_LISTINGS } from '../services/mockData';
import { ListingCard } from '../components/ListingCard';
import { Filter, ChevronDown, Search } from 'lucide-react';

interface MarketplaceViewProps {
  onAddToCart: (id: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onAddToCart }) => {
  const [selectedType, setSelectedType] = useState<string>('all');

  // Duplicate listings to make the grid look full for the demo
  const displayListings = [...RECENT_LISTINGS, ...RECENT_LISTINGS, ...RECENT_LISTINGS];

  const typeLabels: Record<string, string> = {
    'All': 'Все',
    'Currency': 'Валюта',
    'Accounts': 'Аккаунты',
    'Items': 'Предметы',
    'Boosting': 'Бустинг'
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Торговая площадка</h1>
            <p className="text-slate-400 mt-1">Найдено 1,240 предложений для <span className="text-brand-400">World of Warcraft</span></p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative">
                <select className="appearance-none bg-slate-900 border border-slate-700 text-white py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:border-brand-500 cursor-pointer">
                  <option>Рекомендуемые</option>
                  <option>Цена: По возрастанию</option>
                  <option>Цена: По убыванию</option>
                  <option>Сначала новые</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
             </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-6">
            
            {/* Filter Group: Type */}
            <div className="glass-panel p-4 rounded-xl">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" /> Тип лота
              </h3>
              <div className="space-y-2">
                {['All', 'Currency', 'Accounts', 'Items', 'Boosting'].map(type => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer group">
                     <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedType === type.toLowerCase() ? 'bg-brand-500 border-brand-500' : 'border-slate-600 bg-slate-800'}`}>
                        {selectedType === type.toLowerCase() && <div className="w-2 h-2 bg-white rounded-full"></div>}
                     </div>
                     <input 
                      type="radio" 
                      name="type" 
                      className="hidden" 
                      checked={selectedType === type.toLowerCase()}
                      onChange={() => setSelectedType(type.toLowerCase())}
                     />
                     <span className="text-slate-300 group-hover:text-white text-sm">{typeLabels[type]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter Group: Price Range */}
            <div className="glass-panel p-4 rounded-xl">
               <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">Цена (₽)</h3>
               <div className="flex items-center space-x-2">
                 <input type="number" placeholder="От" className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-white focus:border-brand-500 focus:outline-none" />
                 <span className="text-slate-500">-</span>
                 <input type="number" placeholder="До" className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-white focus:border-brand-500 focus:outline-none" />
               </div>
            </div>

             {/* Filter Group: Status */}
             <div className="glass-panel p-4 rounded-xl">
               <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">Статус продавца</h3>
               <label className="flex items-center space-x-3 cursor-pointer mb-2">
                 <input type="checkbox" className="form-checkbox h-4 w-4 text-brand-600 rounded border-slate-700 bg-slate-800 focus:ring-0" />
                 <span className="text-slate-300 text-sm">Только Онлайн</span>
               </label>
               <label className="flex items-center space-x-3 cursor-pointer">
                 <input type="checkbox" className="form-checkbox h-4 w-4 text-brand-600 rounded border-slate-700 bg-slate-800 focus:ring-0" />
                 <span className="text-slate-300 text-sm">Проверенные</span>
               </label>
            </div>

          </div>

          {/* Grid */}
          <div className="flex-1">
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayListings.map((item, idx) => (
                  <ListingCard key={`${item.id}-${idx}`} listing={item} onAddToCart={onAddToCart} />
                ))}
             </div>
             
             {/* Pagination Mock */}
             <div className="mt-12 flex justify-center space-x-2">
                <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">Пред.</button>
                <button className="px-4 py-2 rounded-lg bg-brand-600 text-white font-bold">1</button>
                <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">2</button>
                <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">3</button>
                <button className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">След.</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};