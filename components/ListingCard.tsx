import React from 'react';
import { Listing } from '../types';
import { ShieldCheck, Zap, Clock, Star } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onAddToCart: (id: string) => void;
}

const TYPE_MAP: Record<string, string> = {
  currency: 'ВАЛЮТА',
  account: 'АККАУНТ',
  boosting: 'БУСТИНГ',
  item: 'ПРЕДМЕТ',
};

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onAddToCart }) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300 group flex flex-col h-full">
      {/* Header/Image Placeholder */}
      <div className="h-32 bg-slate-900 relative p-4 flex flex-col justify-between">
         <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50"></div>
         
         <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
              {TYPE_MAP[listing.type] || listing.type.toUpperCase()}
            </span>
            {(listing.deliveryTime.includes('Instant') || listing.deliveryTime.includes('Моментально') || listing.deliveryTime.includes('5 мин')) && (
               <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                 <Zap className="w-3 h-3 mr-1" /> Моментально
               </span>
            )}
         </div>
         <h3 className="relative z-10 text-lg font-bold text-white line-clamp-2 leading-tight group-hover:text-brand-300 transition-colors">
            {listing.title}
         </h3>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Seller Info */}
        <div className="flex items-center mb-4">
           <img src={listing.seller.avatar} className="w-6 h-6 rounded-full border border-slate-600 mr-2" alt="" />
           <span className="text-sm text-slate-300 truncate font-medium hover:text-white cursor-pointer hover:underline decoration-slate-500 underline-offset-2">
             {listing.seller.username}
           </span>
           <div className="ml-auto flex items-center text-xs text-yellow-500 font-semibold">
              <Star className="w-3 h-3 mr-0.5 fill-current" />
              {listing.seller.stats.rating}
           </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {listing.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center justify-between">
          <div>
             <span className="text-xs text-slate-500 block">Цена</span>
             <span className="text-xl font-bold text-white">
               {listing.price.toLocaleString('ru-RU')} ₽
             </span>
          </div>
          <button 
            onClick={() => onAddToCart(listing.id)}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-brand-900/20"
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};