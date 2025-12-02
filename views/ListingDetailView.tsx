

import React from 'react';
import { Listing, Game } from '../types';
import { POPULAR_GAMES } from '../services/mockData';
import { ChevronLeft, ShieldCheck, Zap, Star, MessageSquare, ShoppingCart, Clock, CheckCircle } from 'lucide-react';

interface ListingDetailViewProps {
  listing: Listing;
  onBack: () => void;
  onAddToCart: (id: string) => void;
  onNavigate?: (view: string, data?: any) => void;
}

export const ListingDetailView: React.FC<ListingDetailViewProps> = ({ listing, onBack, onAddToCart, onNavigate }) => {
  const game = POPULAR_GAMES.find(g => g.id === listing.gameId);
  const screenshots = listing.screenshots?.filter(s => s) || [];
  
  // Use game image if no specific screenshots
  const displayImages = screenshots.length > 0 ? screenshots : [game?.image || ''];

  const handleContactSeller = () => {
    if (onNavigate) {
      // Pass the seller information to open the specific chat
      onNavigate('chat', { partnerId: listing.seller.id });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <button 
           onClick={onBack}
           className="flex items-center text-slate-400 hover:text-white transition-colors mb-6 group"
        >
           <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> 
           Назад к каталогу
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* Left: Images & Description */}
           <div className="lg:col-span-2 space-y-6">
              
              {/* Main Image */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative aspect-video">
                 {displayImages[0] ? (
                    <img src={displayImages[0]} alt={listing.title} className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700 bg-slate-800">
                       Нет изображения
                    </div>
                 )}
                 <div className="absolute top-4 left-4">
                    <span className="bg-slate-900/80 backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-bold border border-slate-700">
                       {game?.name}
                    </span>
                 </div>
              </div>
              
              {/* Gallery */}
              {displayImages.length > 1 && (
                 <div className="grid grid-cols-4 gap-4">
                    {displayImages.map((img, idx) => (
                       <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-slate-800 cursor-pointer hover:border-brand-500 transition-colors">
                          <img src={img} alt="" className="w-full h-full object-cover" />
                       </div>
                    ))}
                 </div>
              )}

              {/* Description */}
              <div className="glass-panel p-8 rounded-2xl border border-slate-800">
                 <h2 className="text-xl font-bold text-white mb-4">Описание товара</h2>
                 <div className="prose prose-invert prose-slate max-w-none text-slate-300">
                    <div className="whitespace-pre-wrap leading-relaxed">
                       {listing.description || 'Описание отсутствует.'}
                    </div>
                 </div>
              </div>

           </div>

           {/* Right: Info & Actions */}
           <div className="space-y-6">
              
              {/* Main Info Card */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-xl sticky top-24">
                 <h1 className="text-2xl font-bold text-white mb-4 leading-tight">{listing.title}</h1>
                 
                 {/* Listing Parameters Box */}
                 <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 mb-6">
                    <div className="flex flex-col gap-2">
                       {/* Dynamic Details */}
                       {listing.details && Object.entries(listing.details).map(([key, val]) => {
                          if (!val || typeof val === 'object') return null;
                          return (
                            <div key={key} className="flex justify-between items-center text-sm">
                               <span className="text-slate-400 capitalize">{key}:</span>
                               <span className="text-white font-medium">{String(val)}</span>
                            </div>
                          );
                       })}
                       
                       {/* Separator if details exist */}
                       {listing.details && <div className="h-px bg-slate-800 my-1"></div>}

                       {/* Standard Info */}
                       <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">Доставка:</span>
                          <span className="text-white font-medium flex items-center">
                             <Clock className="w-3 h-3 mr-1 text-brand-400" /> {listing.deliveryTime}
                          </span>
                       </div>

                       {/* Warranty Info (Conditional) */}
                       {listing.warranty && (
                         <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400">Гарантия:</span>
                            <span className="text-green-400 font-bold flex items-center">
                               <ShieldCheck className="w-3 h-3 mr-1" /> {listing.warranty}
                            </span>
                         </div>
                       )}
                    </div>
                 </div>

                 <div className="flex items-end justify-between mb-6 pb-6 border-b border-slate-700/50">
                    <div>
                       <span className="text-sm text-slate-400 block mb-1">Цена за {listing.stock > 1 ? '1 шт.' : 'лот'}</span>
                       <span className="text-3xl font-black text-white">{listing.price} {listing.currency}</span>
                    </div>
                    {listing.stock > 1 && (
                      <div className="text-right">
                         <span className="text-sm text-slate-400 block mb-1">В наличии</span>
                         <span className="text-lg font-bold text-green-400">{listing.stock}</span>
                      </div>
                    )}
                 </div>

                 <div className="space-y-3">
                    <button 
                       onClick={() => onAddToCart(listing.id)}
                       className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center"
                    >
                       <ShoppingCart className="w-5 h-5 mr-2" /> Купить сейчас
                    </button>
                    <button 
                      onClick={handleContactSeller}
                      className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-slate-700 transition-colors flex items-center justify-center"
                    >
                       <MessageSquare className="w-5 h-5 mr-2" /> Написать продавцу
                    </button>
                 </div>

                 {/* Seller Info */}
                 <div className="mt-8 pt-6 border-t border-slate-700/50">
                    <div className="flex items-center justify-between mb-4">
                       <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Продавец</span>
                       <div className="flex items-center text-yellow-500 text-sm font-bold">
                          <Star className="w-4 h-4 fill-current mr-1" /> {listing.seller.stats.rating}
                       </div>
                    </div>
                    <div className="flex items-center">
                       <div className="relative">
                          <img src={listing.seller.avatar} alt="" className="w-12 h-12 rounded-full border border-slate-600" />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                       </div>
                       <div className="ml-3">
                          <div className="text-white font-bold">{listing.seller.username}</div>
                          <div className="text-xs text-slate-400">{listing.seller.stats.totalSales} сделок</div>
                       </div>
                       <div className="ml-auto">
                          <ShieldCheck className="w-6 h-6 text-green-400" title="Подтвержден" />
                       </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4">
                       <div className="bg-slate-900/50 rounded-lg p-2 text-center border border-slate-800">
                          <div className="text-[10px] text-slate-500 uppercase">В сети</div>
                          <div className="text-xs font-bold text-green-400">Online</div>
                       </div>
                       <div className="bg-slate-900/50 rounded-lg p-2 text-center border border-slate-800">
                          <div className="text-[10px] text-slate-500 uppercase">Ответ</div>
                          <div className="text-xs font-bold text-white">{listing.seller.stats.responseTime}</div>
                       </div>
                    </div>
                 </div>

                 {/* Guarantee */}
                 <div className="mt-6 flex items-start gap-3 p-3 rounded-xl bg-brand-500/10 border border-brand-500/20">
                    <ShieldCheck className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                    <div>
                       <h4 className="text-sm font-bold text-brand-300">Гарантия безопасности</h4>
                       <p className="text-xs text-brand-200/70 mt-1">Деньги резервируются системой и переводятся продавцу только после выполнения заказа.</p>
                    </div>
                 </div>

              </div>
           </div>

        </div>
      </div>
    </div>
  );
};