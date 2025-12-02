import React, { useState } from 'react';
import { RECENT_LISTINGS, POPULAR_GAMES } from '../services/mockData';
import { ListingCard } from '../components/ListingCard';
import { GameCard } from '../components/GameCard';
import { ChevronDown, Search, ShieldCheck, Zap, ChevronLeft, Gamepad2, Layers } from 'lucide-react';
import { Game } from '../types';

interface MarketplaceViewProps {
  onAddToCart: (id: string) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onAddToCart }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');

  // Filter listings based on selected game and type
  const getFilteredListings = () => {
    if (!selectedGame) return [];
    
    let filtered = RECENT_LISTINGS.filter(l => l.gameId === selectedGame.id);
    
    // For demo purposes, if the game has no listings in mock data, show all listings 
    // but pretend they are for this game to fill the UI
    const displayListings = filtered.length > 0 
      ? filtered 
      : RECENT_LISTINGS.map(l => ({...l, gameId: selectedGame.id})); 

    if (selectedType !== 'all') {
      return displayListings.filter(item => item.type === selectedType);
    }
    
    // Duplicate to fill grid for demo
    return [...displayListings, ...displayListings]; 
  };

  const displayListings = getFilteredListings();

  const typeLabels: Record<string, string> = {
    'All': 'Все',
    'Currency': 'Валюта',
    'Account': 'Аккаунты',
    'Item': 'Предметы',
    'Boosting': 'Бустинг'
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
                  window.scrollTo(0,0);
                }} 
              />
            ))}
          </div>

          {/* Categories / Genres */}
          <div className="mt-16 border-t border-slate-800 pt-10">
             <h2 className="text-xl font-bold text-white mb-6 flex items-center">
               <Layers className="w-5 h-5 mr-2 text-brand-400" /> Категории
             </h2>
             <div className="flex flex-wrap gap-3">
                {['MMORPG', 'Shooters', 'MOBA', 'Strategy', 'Survival', 'Battle Royale', 'Mobile'].map(genre => (
                   <button key={genre} className="px-5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-sm text-slate-400 hover:text-white hover:border-brand-500 hover:bg-slate-800 transition-all">
                      {genre}
                   </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    );
  }

  // --- SPECIFIC GAME MARKETPLACE VIEW ---
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
                   Найдено {displayListings.length} предложений
                 </p>
               </div>
            </div>
          </div>
          
          <div className="relative z-20">
             <div className="relative group">
                <select className="appearance-none bg-slate-900 border border-slate-700 text-white py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:border-brand-500 cursor-pointer hover:border-slate-600 transition-colors shadow-sm min-w-[200px]">
                  <option>Сначала дешевые</option>
                  <option>Сначала дорогие</option>
                  <option>Высокий рейтинг продавца</option>
                  <option>Только онлайн</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 w-4 h-4 text-slate-500 pointer-events-none group-hover:text-slate-300" />
             </div>
          </div>
        </div>

        {/* Top Filter Toolbar */}
        <div className="glass-panel p-1 rounded-2xl mb-8 border border-slate-800/60 shadow-xl bg-slate-900/40 backdrop-blur-md sticky top-20 z-40">
           <div className="flex flex-col xl:flex-row">
              
              {/* Type Tabs */}
              <div className="p-3 flex flex-wrap gap-2 xl:flex-nowrap overflow-x-auto no-scrollbar">
                {['All', 'Currency', 'Account', 'Item', 'Boosting'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type === 'All' ? 'all' : type)} 
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center ${
                       (selectedType === type || (selectedType === 'all' && type === 'All'))
                       ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                       : 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {type === 'Currency' && <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2" />}
                    {type === 'Account' && <div className="w-2 h-2 rounded-full bg-purple-400 mr-2" />}
                    {type === 'Boosting' && <div className="w-2 h-2 rounded-full bg-red-400 mr-2" />}
                    {type === 'Item' && <div className="w-2 h-2 rounded-full bg-blue-400 mr-2" />}
                    {typeLabels[type]}
                  </button>
                ))}
              </div>

              {/* Divider (Desktop) */}
              <div className="hidden xl:block w-px bg-slate-800 my-3"></div>
              {/* Divider (Mobile) */}
              <div className="xl:hidden h-px bg-slate-800 mx-3"></div>

              {/* Secondary Filters */}
              <div className="p-3 flex flex-col md:flex-row gap-4 md:items-center flex-1">
                 
                 {/* Price Range */}
                 <div className="flex items-center gap-3 bg-slate-900/50 p-2 rounded-xl border border-slate-800/50">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-2">Цена</span>
                    <input 
                      type="number" 
                      placeholder="От" 
                      className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-600" 
                    />
                    <span className="text-slate-600 font-medium">-</span>
                    <input 
                      type="number" 
                      placeholder="До" 
                      className="w-20 bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-white focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-600" 
                    />
                 </div>

                 <div className="flex-1"></div>

                 {/* Status Checkboxes */}
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
           </div>
        </div>

        {/* Listings Grid */}
        <div>
           {displayListings.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
                {displayListings.map((item, idx) => (
                  <ListingCard key={`${item.id}-${idx}`} listing={item} onAddToCart={onAddToCart} />
                ))}
             </div>
           ) : (
             <div className="text-center py-20 text-slate-500 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
               <Gamepad2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
               <p className="text-lg">Нет предложений в этой категории</p>
               <button onClick={() => setSelectedType('all')} className="mt-4 text-brand-400 hover:underline">Сбросить фильтры</button>
             </div>
           )}
           
           {/* Pagination */}
           {displayListings.length > 0 && (
             <div className="mt-12 flex justify-center space-x-2">
                <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">Пред.</button>
                <button className="w-10 h-10 rounded-xl bg-brand-600 text-white font-bold shadow-lg shadow-brand-900/20">1</button>
                <button className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">2</button>
                <button className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">След.</button>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};