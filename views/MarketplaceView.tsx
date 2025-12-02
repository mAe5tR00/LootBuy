import React, { useState } from 'react';
import { RECENT_LISTINGS, POPULAR_GAMES } from '../services/mockData';
import { GAME_CONFIGS } from '../services/gameConfigs';
import { ListingCard } from '../components/ListingCard';
import { GameCard } from '../components/GameCard';
import { ChevronDown, Search, ShieldCheck, Zap, ChevronLeft, Gamepad2, Layers, Filter, LayoutGrid, List as ListIcon } from 'lucide-react';
import { Game, Listing } from '../types';

interface MarketplaceViewProps {
  onAddToCart: (id: string) => void;
  onNavigate?: (view: string, data?: any) => void;
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onAddToCart, onNavigate }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  
  // State for dynamic filters
  const [dynamicFilters, setDynamicFilters] = useState<Record<string, any>>({});
  const [showFilters, setShowFilters] = useState(false);

  // View & Sort State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState<string>('rating'); // 'rating', 'price_asc', 'price_desc'

  // Filter listings based on selected game and type
  const getFilteredListings = () => {
    if (!selectedGame) return [];
    
    let filtered = RECENT_LISTINGS.filter(l => l.gameId === selectedGame.id);
    
    // For demo purposes, if the game has no listings in mock data, show all listings 
    // but pretend they are for this game to fill the UI
    let displayListings = filtered.length > 0 
      ? filtered 
      : RECENT_LISTINGS.map(l => ({...l, gameId: selectedGame.id})); 

    if (selectedType !== 'all') {
      displayListings = displayListings.filter(item => item.type === selectedType);
    }
    
    // Apply Sorting
    return displayListings.sort((a, b) => {
      if (sortOption === 'price_asc') return a.price - b.price;
      if (sortOption === 'price_desc') return b.price - a.price;
      // Default: Rating High to Low
      return b.seller.stats.rating - a.seller.stats.rating;
    });
  };

  const displayListings = getFilteredListings();

  const typeLabels: Record<string, string> = {
    'all': 'Все',
    'currency': 'Валюта',
    'account': 'Аккаунты',
    'item': 'Предметы',
    'boosting': 'Бустинг'
  };

  const handleCardClick = (listing: Listing) => {
    if (onNavigate) {
      onNavigate('listing-detail', listing);
    }
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
  
  const gameConfig = GAME_CONFIGS[selectedGame.id] || GAME_CONFIGS['default'];
  
  // Filter context logic: Only show filters relevant to selectedType
  const relevantFilters = gameConfig.filters.filter(f => 
    !f.validTypes || (selectedType !== 'all' && f.validTypes.includes(selectedType))
  );
  
  const hasDynamicFilters = relevantFilters.length > 0;

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
          
          <div className="relative z-20 flex gap-2 items-center">
             
             {/* View Mode Toggle */}
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

             <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-4 py-2.5 rounded-xl border transition-colors md:hidden ${showFilters ? 'bg-brand-600 border-brand-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'}`}
             >
                <Filter className="w-4 h-4 mr-2" /> Фильтры
             </button>
             
             {/* Sort Select */}
             <div className="relative group">
                <select 
                   className="appearance-none bg-slate-900 border border-slate-700 text-white py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:border-brand-500 cursor-pointer hover:border-slate-600 transition-colors shadow-sm min-w-[200px]"
                   value={sortOption}
                   onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="rating">Высокий рейтинг продавца</option>
                  <option value="price_asc">Сначала дешевые</option>
                  <option value="price_desc">Сначала дорогие</option>
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
                {['all', 'currency', 'account', 'item', 'boosting'].map(type => (
                  <button
                    key={type}
                    onClick={() => {
                       setSelectedType(type);
                       // Optional: Clear dynamic filters when type changes to avoid invalid state
                       // setDynamicFilters({});
                    }} 
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap flex items-center ${
                       selectedType === type
                       ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/20' 
                       : 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {type === 'currency' && <div className="w-2 h-2 rounded-full bg-yellow-400 mr-2" />}
                    {type === 'account' && <div className="w-2 h-2 rounded-full bg-purple-400 mr-2" />}
                    {type === 'boosting' && <div className="w-2 h-2 rounded-full bg-red-400 mr-2" />}
                    {type === 'item' && <div className="w-2 h-2 rounded-full bg-blue-400 mr-2" />}
                    {typeLabels[type]}
                  </button>
                ))}
              </div>

              {/* Divider (Desktop) */}
              <div className="hidden xl:block w-px bg-slate-800 my-3"></div>
              {/* Divider (Mobile) */}
              <div className="xl:hidden h-px bg-slate-800 mx-3"></div>

              {/* Standard Secondary Filters */}
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
           
           {/* DYNAMIC FILTERS BAR (Expandable) */}
           {hasDynamicFilters && (
             <div className={`border-t border-slate-800 px-3 overflow-hidden transition-all duration-300 ${showFilters || hasDynamicFilters ? 'py-4 max-h-[500px] opacity-100' : 'md:py-4 md:max-h-[500px] md:opacity-100 py-0 max-h-0 opacity-0'}`}>
                <div className="flex flex-wrap gap-4 items-end">
                  {relevantFilters.map(filter => (
                    <div key={filter.key} className="flex-shrink-0 min-w-[140px]">
                       <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{filter.label}</label>
                       
                       {filter.type === 'select' && (
                         <select 
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
                            onChange={(e) => setDynamicFilters({...dynamicFilters, [filter.key]: e.target.value})}
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
                  
                  {/* Clear button */}
                  <button 
                    onClick={() => setDynamicFilters({})}
                    className="mb-1 text-xs text-brand-400 hover:text-white underline decoration-brand-400/50 hover:decoration-white"
                  >
                    Сбросить
                  </button>
                </div>
             </div>
           )}
        </div>

        {/* Listings Grid/List */}
        <div>
           {displayListings.length > 0 ? (
             <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-3'} animate-fade-in`}>
                {displayListings.map((item, idx) => (
                  <ListingCard 
                    key={`${item.id}-${idx}`} 
                    listing={item} 
                    onAddToCart={onAddToCart} 
                    onClick={handleCardClick}
                    variant={viewMode}
                  />
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