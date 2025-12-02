import React from 'react';
import { Game } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
  variant?: 'default' | 'compact';
}

export const GameCard: React.FC<GameCardProps> = ({ game, onClick, variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <div 
        onClick={onClick}
        className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-slate-900 border border-slate-800 hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/20 transition-all duration-300"
      >
        {/* Background - Blurred and Darkened */}
        <div className="absolute inset-0">
          <img 
            src={game.image} 
            alt="" 
            className="w-full h-full object-cover blur-sm opacity-30 group-hover:opacity-40 transition-opacity duration-300 transform scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-900/20" />
        </div>
        
        {/* Content - Logo & Name */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center z-10">
          <div className="w-14 h-14 mb-3 rounded-xl shadow-2xl bg-slate-800 ring-2 ring-slate-700/50 group-hover:ring-brand-500/50 group-hover:scale-110 transition-all duration-300 overflow-hidden">
             {game.logo ? (
                <img src={game.logo} alt="logo" className="w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-400 bg-slate-800">
                  IMG
                </div>
             )}
          </div>
          <h3 className="text-sm font-bold text-slate-200 group-hover:text-white leading-tight">
            {game.name}
          </h3>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider group-hover:text-brand-400 transition-colors">
            {game.category}
          </p>
        </div>
      </div>
    );
  }

  // Default Large Card (Home Page style)
  return (
    <div 
      onClick={onClick}
      className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer bg-slate-800 border border-slate-700 hover:border-brand-500/50 transition-all duration-300"
    >
      <img 
        src={game.image} 
        alt={game.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
      
      <div className="absolute bottom-0 left-0 p-5 w-full">
        <p className="text-xs font-medium text-brand-300 mb-1">{game.category}</p>
        <div className="flex justify-between items-end">
          <h3 className="text-xl font-bold text-white group-hover:text-brand-200 transition-colors">
            {game.name}
          </h3>
          <div className="h-8 w-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};