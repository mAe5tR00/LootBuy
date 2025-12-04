



import React from 'react';
import { Listing } from '../types';
import { ShieldCheck, Zap, Star, Package } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  onBuy?: (listing: Listing) => void;
  onClick?: (listing: Listing) => void;
  variant?: 'grid' | 'list';
}

const TYPE_MAP: Record<string, string> = {
  currency: 'ВАЛЮТА',
  account: 'АККАУНТ',
  boosting: 'БУСТИНГ',
  item: 'ПРЕДМЕТ',
  donation: 'ДОНАТ',
  points: 'POINTS',
};

export const ListingCard: React.FC<ListingCardProps> = ({ listing, onBuy, onClick, variant = 'grid' }) => {
  
  const handleCardClick = () => {
    if (onClick) onClick(listing);
  };

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuy) onBuy(listing);
  };

  // --- LIST VIEW ---
  if (variant === 'list') {
    return (
      <div 
        onClick={handleCardClick}
        className="group bg-slate-800/40 border border-slate-700/50 rounded-xl hover:bg-slate-800/80 hover:border-brand-500/30 transition-all duration-200 cursor-pointer p-4 flex flex-col md:flex-row md:items-center gap-4"
      >
        {/* Image / Type */}
        <div className="flex items-center gap-4 min-w-[200px]">
           <div className="w-12 h-12 rounded-lg bg-slate-900 flex-shrink-0 border border-slate-700 overflow-hidden flex items-center justify-center">
              {listing.screenshots && listing.screenshots[0] ? (
                 <img src={listing.screenshots[0]} alt="" className="w-full h-full object-cover" />
              ) : (
                 <span className="text-xs font-bold text-slate-600">{listing.type.slice(0,2).toUpperCase()}</span>
              )}
           </div>
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                    {TYPE_MAP[listing.type] || listing.type}
                 </span>
                 {(listing.deliveryTime.includes('Instant') || listing.deliveryTime.includes('Моментально')) && (
                    <Zap className="w-3 h-3 text-green-400 fill-current" />
                 )}
              </div>
              <h3 className="text-white font-bold text-sm leading-tight group-hover:text-brand-400 transition-colors line-clamp-1">
                 {listing.title}
              </h3>
           </div>
        </div>

        {/* Dynamic Details (Compact) */}
        <div className="flex-1 hidden md:flex flex-wrap gap-2">
           {listing.details && Object.entries(listing.details).slice(0, 3).map(([key, val]) => {
              if(!val || typeof val === 'object') return null;
              return (
                 <span key={key} className="px-2 py-0.5 rounded text-xs text-slate-400 bg-slate-900 border border-slate-800">
                    {String(val)}
                 </span>
              )
           })}
        </div>

        {/* Seller */}
        <div className="md:w-40 flex items-center gap-2">
           <img src={listing.seller.avatar} alt="" className="w-6 h-6 rounded-full" />
           <div className="flex flex-col">
              <span className="text-xs text-slate-300 font-medium truncate w-24">{listing.seller.username}</span>
              <div className="flex items-center text-[10px] text-yellow-500">
                 <Star className="w-3 h-3 mr-0.5 fill-current" /> {listing.seller.stats.rating}
              </div>
           </div>
        </div>

        {/* Price & Action */}
        <div className="md:w-40 flex flex-col items-end gap-2">
           <span className="text-lg font-bold text-white">
             {listing.price.toLocaleString('ru-RU')} {listing.currency === 'RUB' ? '₽' : listing.currency}
           </span>
           <div className="text-xs text-slate-500">
             {listing.stock} шт.
           </div>
        </div>
      </div>
    );
  }

  // --- GRID VIEW ---
  return (
    <div 
      onClick={handleCardClick}
      className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-brand-500/50 hover:shadow-lg hover:shadow-brand-500/10 transition-all duration-300 group flex flex-col h-full cursor-pointer"
    >
      {/* Header/Image Placeholder */}
      <div className="h-32 bg-slate-900 relative p-4 flex flex-col justify-between">
         <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
            {listing.screenshots && listing.screenshots[0] ? (
               <img src={listing.screenshots[0]} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
            ) : null}
         </div>
         
         <div className="relative z-10 flex justify-between items-start">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-900/80 backdrop-blur text-slate-300 border border-slate-600">
              {TYPE_MAP[listing.type] || listing.type.toUpperCase()}
            </span>
            {(listing.deliveryTime.includes('Instant') || listing.deliveryTime.includes('Моментально') || listing.deliveryTime.includes('5 мин')) && (
               <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-green-900/80 backdrop-blur text-green-400 border border-green-500/30">
                 <Zap className="w-3 h-3 mr-1" /> Моментально
               </span>
            )}
         </div>
         <h3 className="relative z-10 text-lg font-bold text-white line-clamp-2 leading-tight group-hover:text-brand-300 transition-colors text-shadow">
            {listing.title}
         </h3>
      </div>

      {/* Body */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Seller Info */}
        <div className="flex items-center mb-4">
           <img src={listing.seller.avatar} className="w-6 h-6 rounded-full border border-slate-600 mr-2" alt="" />
           <span className="text-sm text-slate-300 truncate font-medium hover:text-white decoration-slate-500 underline-offset-2">
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
             <span className="text-xs text-slate-500 block">Цена за шт.</span>
             <span className="text-xl font-bold text-white">
               {listing.price.toLocaleString('ru-RU')} {listing.currency === 'RUB' ? '₽' : listing.currency}
             </span>
          </div>
          <button 
            onClick={handleBuyClick}
            className="px-4 py-2 bg-slate-700 hover:bg-brand-600 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Купить
          </button>
        </div>
      </div>
    </div>
  );
};