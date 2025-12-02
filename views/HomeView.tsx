import React from 'react';
import { POPULAR_GAMES, RECENT_LISTINGS } from '../services/mockData';
import { GameCard } from '../components/GameCard';
import { ListingCard } from '../components/ListingCard';
import { ChevronRight, Shield, Zap, RefreshCw, UserPlus, Package } from 'lucide-react';
import { AuthState } from '../types';

interface HomeViewProps {
  onNavigate: (view: string) => void;
  onAddToCart: (id: string) => void;
  authState: AuthState;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onAddToCart, authState }) => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 border-b border-white/5">
        
        {/* Background Typography (Replaces Image) */}
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none select-none">
          <div className="flex font-black text-[25vw] leading-none translate-y-4 mr-[-2vw]">
            {/* L - Brighter */}
            <span className="text-white/[0.15]">L</span>
            
            {/* O - Left Eye */}
            <span className="relative text-white/5 ml-[-1.5vw]">
              O
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-[20%] h-[20%] bg-white/20 rounded-full translate-y-[10%] shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
              </div>
            </span>

            {/* O - Right Eye */}
            <span className="relative text-white/5 ml-[-1.5vw]">
              O
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-[20%] h-[20%] bg-white/20 rounded-full translate-y-[10%] shadow-[0_0_20px_rgba(255,255,255,0.2)]"></div>
              </div>
            </span>

            {/* T - Normal */}
            <span className="text-white/5 ml-[-1.5vw]">T</span>
          </div>
        </div>

        {/* Gradient Overlay (Preserved) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
              Твой Мир - <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-purple">
                Твои Правила
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 font-light leading-relaxed">
              LootBuy — ведущая биржа игровых ценностей. Покупай золото, аккаунты и услуги у проверенных профессионалов. Быстро, безопасно и 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('marketplace')}
                className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-xl shadow-brand-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center"
              >
                В каталог <ChevronRight className="ml-2 w-5 h-5" />
              </button>
              
              {/* Dynamic Action Button */}
              {authState === 'seller' ? (
                <button 
                  onClick={() => onNavigate('seller-dashboard')}
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center"
                >
                  <Package className="mr-2 w-5 h-5 text-brand-400" />
                  Мои лоты
                </button>
              ) : authState === 'guest' ? (
                <button 
                  onClick={() => onNavigate('auth')}
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center"
                >
                  <UserPlus className="mr-2 w-5 h-5 text-brand-400" />
                  Регистрация
                </button>
              ) : (
                // Buyer view - maybe show nothing or "My Orders"
                 <button 
                  onClick={() => onNavigate('profile')}
                  className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors flex items-center justify-center"
                >
                  Мой профиль
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="absolute bottom-0 w-full border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
           <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center text-slate-400 gap-2">
                 <Shield className="w-5 h-5 text-green-500" />
                 <span className="text-sm font-medium">Безопасные сделки</span>
              </div>
              <div className="flex items-center justify-center text-slate-400 gap-2">
                 <Zap className="w-5 h-5 text-yellow-500" />
                 <span className="text-sm font-medium">Доставка ~12 мин</span>
              </div>
               <div className="flex items-center justify-center text-slate-400 gap-2">
                 <RefreshCw className="w-5 h-5 text-brand-500" />
                 <span className="text-sm font-medium">Гарантия возврата</span>
              </div>
           </div>
        </div>
      </div>

      {/* Featured Games */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-white">Популярные игры</h2>
          <button onClick={() => onNavigate('marketplace')} className="text-brand-400 hover:text-brand-300 text-sm font-medium flex items-center">
            Все игры <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_GAMES.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>

      {/* Recent Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-white mb-8">Свежие предложения</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECENT_LISTINGS.map(listing => (
            <ListingCard key={listing.id} listing={listing} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};