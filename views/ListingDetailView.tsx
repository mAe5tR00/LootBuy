
import React from 'react';
import { Listing, Game, User } from '../types';
import { POPULAR_GAMES } from '../services/mockData';
import { ChevronLeft, ShieldCheck, Zap, Star, MessageSquare, ShoppingCart, Clock, CheckCircle, Trash2, ArrowUpCircle, Edit, Eye, Heart, AlertTriangle } from 'lucide-react';

interface ListingDetailViewProps {
  listing: Listing;
  currentUser: User;
  onBack: () => void;
  onBuy: (listing: Listing) => void;
  onNavigate?: (view: string, data?: any) => void;
  onActionAuthCheck: (callback: () => void) => void; // Function to check auth before action
}

// Translation map for dynamic fields
const LABEL_MAP: Record<string, string> = {
  region: 'Регион',
  server: 'Сервер',
  faction: 'Фракция',
  delivery_method: 'Метод доставки',
  class: 'Класс',
  mode: 'Режим',
  currentLevel: 'Текущий уровень',
  targetLevel: 'Требуемый уровень',
  raidName: 'Рейд',
  difficulty: 'Сложность',
  currentIlvl: 'Текущий iLvl',
  targetIlvl: 'Требуемый iLvl',
  type: 'Тип',
  quality: 'Качество',
  float: 'Float',
  rarity: 'Редкость',
  platform: 'Платформа',
  rank: 'Ранг',
  mmr: 'MMR',
  ar_level: 'Ранг приключений',
  five_stars: '5★ Персонажи',
  hero: 'Герой',
  currentRating: 'Текущий рейтинг',
  targetRating: 'Требуемый рейтинг',
  comment: 'Комментарий',
  behavior_score: 'Порядочность',
  item_type: 'Тип предмета',
  // Dota 2 Boosting Keys
  currentMmr: 'Текущий MMR',
  targetMmr: 'Желаемый MMR',
  role: 'Роль',
  previousRank: 'Прошлый ранг',
  games: 'Количество игр',
  currentScore: 'Текущая порядочность',
  targetScore: 'Целевая порядочность',
  hours: 'Часы'
};

export const ListingDetailView: React.FC<ListingDetailViewProps> = ({ listing, currentUser, onBack, onBuy, onNavigate, onActionAuthCheck }) => {
  const game = POPULAR_GAMES.find(g => g.id === listing.gameId);
  const screenshots = listing.screenshots?.filter(s => s) || [];
  
  // Check if current viewer is the owner
  const isOwner = currentUser?.id === listing.seller.id;
  
  // Use game image if no specific screenshots
  const displayImages = screenshots.length > 1 ? screenshots : (screenshots.length === 1 ? screenshots : [game?.image || '']);

  const handleContactSeller = () => {
    onActionAuthCheck(() => {
       if (onNavigate) {
          // Pass the seller information to open the specific chat
          onNavigate('chat', { partnerId: listing.seller.id });
       }
    });
  };

  const handleBuy = () => {
     onActionAuthCheck(() => {
        onBuy(listing);
     });
  };

  const handleBump = () => {
     alert("Лот поднят в топ! (Списано 0 баллов в демо-режиме)");
  };

  const handleEdit = () => {
      // In a real app, this would open the edit modal directly. 
      // For this demo structure, we'll navigate to dashboard or show a message.
      alert("Редактирование доступно в 'Кабинете продавца' -> 'Мои лоты'.");
  };

  const handleDelete = () => {
     if(confirm("Вы уверены, что хотите удалить этот лот? Это действие необратимо.")) {
        // In real app, call API
        alert("Лот удален.");
        onBack();
     }
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white mb-6 group transition-colors">
           <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
           Назад к списку
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           {/* LEFT COLUMN: Images & Description */}
           <div className="lg:col-span-2 space-y-8">
              
              {/* Image Gallery */}
              <div className="glass-panel rounded-3xl overflow-hidden border border-slate-700/50 shadow-2xl">
                 <div className="relative aspect-video bg-slate-900">
                    <img src={displayImages[0]} alt={listing.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none"></div>
                    
                    {/* Floating Labels */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                       <span className="px-3 py-1 bg-slate-900/80 backdrop-blur rounded-lg text-xs font-bold text-white border border-slate-700">
                          {listing.type.toUpperCase()}
                       </span>
                       {(listing.deliveryTime.includes('Моментально') || listing.deliveryTime.includes('Instant')) && (
                          <span className="px-3 py-1 bg-green-900/80 backdrop-blur rounded-lg text-xs font-bold text-green-400 border border-green-500/30 flex items-center">
                             <Zap className="w-3 h-3 mr-1" /> INSTANT
                          </span>
                       )}
                    </div>
                 </div>
                 
                 {/* Thumbnails if multiple */}
                 {displayImages.length > 1 && (
                    <div className="p-4 flex gap-3 overflow-x-auto bg-slate-900">
                       {displayImages.map((img, idx) => (
                          <div key={idx} className="w-20 h-14 rounded-lg overflow-hidden border border-slate-700 cursor-pointer hover:border-brand-500 transition-all">
                             <img src={img} alt="" className="w-full h-full object-cover" />
                          </div>
                       ))}
                    </div>
                 )}
              </div>

              {/* Title & Stats */}
              <div>
                 <h1 className="text-3xl font-black text-white mb-2 leading-tight">{listing.title}</h1>
                 <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> Доставка: <span className="text-slate-300 font-medium ml-1">{listing.deliveryTime}</span></span>
                    {listing.warranty && (
                       <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1.5 text-green-500" /> Гарантия: <span className="text-slate-300 font-medium ml-1">{listing.warranty}</span></span>
                    )}
                 </div>
              </div>

              {/* Details Grid */}
              {listing.details && Object.keys(listing.details).length > 0 && (
                 <div className="glass-panel p-6 rounded-2xl border border-slate-800">
                    <h3 className="text-lg font-bold text-white mb-4">Характеристики</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                       {Object.entries(listing.details).map(([key, value]) => {
                          if (!value || typeof value === 'object') return null;
                          return (
                             <div key={key} className="flex justify-between items-center border-b border-slate-800/50 pb-2 last:border-0 last:pb-0">
                                <span className="text-slate-500 text-sm">{LABEL_MAP[key] || key}</span>
                                <span className="text-white font-medium text-sm text-right">{value}</span>
                             </div>
                          );
                       })}
                    </div>
                 </div>
              )}

              {/* Description */}
              <div className="glass-panel p-6 rounded-2xl border border-slate-800">
                 <h3 className="text-lg font-bold text-white mb-4">Описание</h3>
                 <div className="prose prose-invert prose-sm max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {listing.description || "Описание отсутствует."}
                 </div>
              </div>
           </div>

           {/* RIGHT COLUMN: Actions (Buyer or Owner) */}
           <div className="space-y-6">
              
              {/* === SELLER CONTROL PANEL (Visible only to Owner) === */}
              {isOwner ? (
                <div className="glass-panel p-6 rounded-3xl border border-brand-500/30 shadow-2xl shadow-brand-900/20 relative overflow-hidden animate-fade-in">
                   <div className="absolute top-0 right-0 p-3 opacity-20">
                      <ShieldCheck className="w-24 h-24 text-brand-500" />
                   </div>
                   
                   <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-1">Управление лотом</h3>
                      <p className="text-xs text-slate-400 mb-6">Вы владелец этого предложения</p>

                      <div className="flex items-baseline mb-6 border-b border-slate-700/50 pb-4">
                         <span className="text-3xl font-black text-white mr-2">{listing.price}</span>
                         <span className="text-xl font-bold text-brand-400">{listing.currency}</span>
                      </div>
                      
                      {/* Owner Stats (Mock) */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                         <div className="bg-slate-900/50 rounded-xl p-3 text-center border border-slate-800">
                            <Eye className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                            <div className="text-lg font-bold text-white">24</div>
                            <div className="text-[10px] text-slate-500 uppercase">Просмотры</div>
                         </div>
                         <div className="bg-slate-900/50 rounded-xl p-3 text-center border border-slate-800">
                            <Heart className="w-5 h-5 mx-auto text-red-500 mb-1" />
                            <div className="text-lg font-bold text-white">2</div>
                            <div className="text-[10px] text-slate-500 uppercase">В избранном</div>
                         </div>
                         <div className="bg-slate-900/50 rounded-xl p-3 text-center border border-slate-800">
                            <ShoppingCart className="w-5 h-5 mx-auto text-green-500 mb-1" />
                            <div className="text-lg font-bold text-white">0</div>
                            <div className="text-[10px] text-slate-500 uppercase">Продажи</div>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <button 
                           onClick={handleBump}
                           className="w-full py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center"
                         >
                            <ArrowUpCircle className="w-5 h-5 mr-2" /> Поднять в топ
                         </button>
                         
                         <div className="flex gap-3">
                            <button 
                               onClick={handleEdit}
                               className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all flex items-center justify-center"
                            >
                               <Edit className="w-4 h-4 mr-2" /> Изменить
                            </button>
                            <button 
                               onClick={handleDelete}
                               className="flex-1 py-3 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 font-bold rounded-xl border border-red-900/30 transition-all flex items-center justify-center"
                            >
                               <Trash2 className="w-4 h-4 mr-2" /> Удалить
                            </button>
                         </div>
                      </div>

                      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-start">
                         <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                         <p className="text-xs text-yellow-200/80">
                            Совет: Добавьте больше скриншотов, чтобы повысить привлекательность лота.
                         </p>
                      </div>
                   </div>
                </div>
              ) : (
                /* === BUYER PANEL (Standard) === */
                <div className="glass-panel p-6 rounded-3xl border border-slate-700 shadow-xl sticky top-24">
                   <div className="flex justify-between items-start mb-6 border-b border-slate-700/50 pb-6">
                      <div>
                         <span className="text-sm text-slate-400 block mb-1">Стоимость</span>
                         <div className="flex items-baseline">
                            <span className="text-4xl font-black text-white mr-2">{listing.price}</span>
                            <span className="text-2xl font-bold text-brand-400">{listing.currency}</span>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="text-sm text-slate-400 block mb-1">Наличие</span>
                         <span className={`text-lg font-bold ${listing.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {listing.stock > 0 ? `${listing.stock} шт.` : 'Нет в наличии'}
                         </span>
                      </div>
                   </div>

                   <div className="space-y-3 mb-6">
                      <button 
                        onClick={handleBuy}
                        disabled={listing.stock <= 0}
                        className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                         <ShoppingCart className="w-5 h-5 mr-2" />
                         {listing.stock > 0 ? 'Купить сейчас' : 'Нет в наличии'}
                      </button>
                      <button 
                        onClick={handleContactSeller}
                        className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-colors flex items-center justify-center"
                      >
                         <MessageSquare className="w-5 h-5 mr-2 text-slate-400" />
                         Написать продавцу
                      </button>
                   </div>

                   {/* Seller Info Card (Mini) */}
                   <div 
                      className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800 cursor-pointer hover:border-brand-500/50 transition-all group"
                      onClick={() => onNavigate && onNavigate('profile', listing.seller)}
                   >
                      <div className="flex items-center gap-3 mb-3">
                         <img src={listing.seller.avatar} alt="" className="w-12 h-12 rounded-full border border-slate-700 group-hover:border-brand-500 transition-colors" />
                         <div>
                            <div className="font-bold text-white text-sm group-hover:text-brand-400 transition-colors">{listing.seller.username}</div>
                            <div className="text-xs text-slate-400 flex items-center">
                               {listing.seller.role === 'seller' && <ShieldCheck className="w-3 h-3 mr-1 text-green-500" />}
                               Продавец
                            </div>
                         </div>
                         <div className="ml-auto text-right">
                            <div className="flex items-center text-yellow-500 font-bold text-sm">
                               <Star className="w-3 h-3 fill-current mr-1" /> {listing.seller.stats.rating}
                            </div>
                            <div className="text-[10px] text-slate-500">{listing.seller.stats.totalSales} продаж</div>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500">
                         <div className="bg-slate-900 rounded p-1.5 text-center">
                            В сети: <span className="text-green-400 font-bold">Online</span>
                         </div>
                         <div className="bg-slate-900 rounded p-1.5 text-center">
                            Ответ: <span className="text-slate-300 font-bold">{listing.seller.stats.responseTime}</span>
                         </div>
                      </div>
                   </div>

                   <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span>Гарантия безопасности сделки</span>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
