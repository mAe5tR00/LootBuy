import React from 'react';
import { Game } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
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