






import React, { useState } from 'react';
import { BoostingRequest, User, Bid } from '../types';
import { POPULAR_GAMES } from '../services/mockData';
import { getBoostingCategories } from '../services/boostingConfigs';
import { ChevronLeft, Zap, ShieldCheck, Clock, MessageSquare, Star, CheckCircle, Trophy, User as UserIcon, ChevronDown } from 'lucide-react';

interface BoostingRequestDetailViewProps {
  request: BoostingRequest;
  currentUser: User;
  onNavigate: (view: string, data?: any) => void;
  onBack: () => void;
}

// Translation map
const LABEL_MAP: Record<string, string> = {
  region: 'Регион',
  server: 'Сервер',
  faction: 'Фракция',
  class: 'Класс',
  mode: 'Режим',
  currentLevel: 'Текущий уровень',
  targetLevel: 'Требуемый уровень',
  raidName: 'Рейд',
  difficulty: 'Сложность',
  currentIlvl: 'Текущий iLvl',
  targetIlvl: 'Требуемый iLvl',
  type: 'Тип',
  currentRating: 'Текущий рейтинг',
  targetRating: 'Требуемый рейтинг',
  comment: 'Комментарий',
  // Genshin
  ar: 'Ранг приключений (AR)',
  percentage: 'Процент',
  oculi: 'Окулы',
  questType: 'Тип квеста',
  questName: 'Название квеста',
  floor: 'Этаж',
  stars: 'Звезды',
  resource: 'Ресурс',
  amount: 'Количество',
  resin: 'Трата смолы',
  days: 'Количество дней',
  activities: 'Активности',
  // Diablo 4 & PoE
  bossName: 'Босс',
  runs: 'Заходов',
  tier: 'Тир/Уровень',
  mats: 'Материалы',
  glyph: 'Глифы',
  league: 'Лига',
  loot: 'Лут',
  challenges_count: 'Кол-во испытаний',
  // Valorant
  currentRank: 'Текущий ранг',
  targetRank: 'Желаемый ранг',
  previousRank: 'Прошлый ранг',
  games: 'Количество игр',
};

export const BoostingRequestDetailView: React.FC<BoostingRequestDetailViewProps> = ({ request, currentUser, onNavigate, onBack }) => {
  const [bids, setBids] = useState<Bid[]>(request.bids || []);
  
  // Bid Form State
  const [yourBid, setYourBid] = useState({ price: '', comment: '' });
  const [timeValue, setTimeValue] = useState<string>('1');
  const [timeUnit, setTimeUnit] = useState<string>('Часов');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const game = POPULAR_GAMES.find(g => g.id === request.gameId);
  const isBuyer = request.buyer.id === currentUser.id;
  const existingBid = bids.find(b => b.seller.id === currentUser.id);

  // Sorting bids: Price Asc, then Time Asc (simplified)
  const sortedBids = [...bids].sort((a, b) => a.price - b.price);

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yourBid.price) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
       const finalTime = `${timeValue} ${timeUnit}`;

       const newBid: Bid = {
          id: `bid-${Date.now()}`,
          requestId: request.id,
          seller: currentUser,
          price: parseFloat(yourBid.price),
          currency: 'RUB',
          timeEstimate: finalTime,
          comment: yourBid.comment,
          timestamp: new Date().toISOString()
       };

       if (existingBid) {
         // Edit mode
         setBids(prev => prev.map(b => b.id === existingBid.id ? newBid : b));
       } else {
         // Create mode
         setBids([...bids, newBid]);
       }
       setIsSubmitting(false);
    }, 800);
  };

  const handleEditBidClick = () => {
    if (existingBid) {
      setYourBid({ 
        price: existingBid.price.toString(), 
        comment: existingBid.comment || '' 
      });
      
      // Parse existing time string (e.g. "2 Часов" or "5 Дней")
      const parts = existingBid.timeEstimate.split(' ');
      if (parts.length >= 2) {
         setTimeValue(parts[0]);
         setTimeUnit(parts[1]); // Assuming format is always "Value Unit"
      } else {
         setTimeValue('1');
         setTimeUnit('Часов');
      }
    }
  };

  const handleContact = (partnerId: string) => {
     onNavigate('chat', { partnerId });
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
         
         <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white mb-6 group transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
            Назад
         </button>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Request Details (Left) */}
            <div className="lg:col-span-2 space-y-6">
               <div className="glass-panel p-8 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Trophy className="w-40 h-40 text-brand-500" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6">
                     {game?.logo && <img src={game.logo} className="w-16 h-16 rounded-2xl shadow-lg" alt="" />}
                     <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Запрос на бустинг</h1>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                           <span className="text-white font-medium">{game?.name}</span>
                           <span>•</span>
                           <span className="text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20 uppercase text-xs font-bold">
                              {getBoostingCategories(request.gameId).find(c => c.id === request.category)?.label || request.category}
                           </span>
                           <span>•</span>
                           <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-6">
                     {Object.entries(request.details).map(([key, val]) => {
                        if (key === 'comment' || !val) return null;
                        return (
                           <div key={key}>
                              <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">
                                {LABEL_MAP[key] || key}
                              </span>
                              <span className="text-white font-medium text-sm">
                                 {Array.isArray(val) ? val.join(', ') : String(val)}
                              </span>
                           </div>
                        );
                     })}
                  </div>

                  <div>
                     <span className="text-xs text-slate-500 uppercase tracking-wider block mb-2">Комментарий покупателя</span>
                     <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 text-slate-300 italic">
                        "{request.details.comment || 'Комментарий отсутствует'}"
                     </div>
                  </div>
               </div>

               {/* Bids List (Visible to Buyer and Seller) */}
               <div className="glass-panel p-6 rounded-3xl border border-slate-800">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                     Предложения ({bids.length})
                     {isBuyer && <span className="ml-2 text-xs font-normal text-slate-500">(Вы видите лучшие предложения сверху)</span>}
                  </h3>

                  <div className="space-y-4">
                     {sortedBids.length === 0 ? (
                        <div className="text-center py-8 text-slate-500">
                           Пока нет предложений. Будьте первым!
                        </div>
                     ) : (
                        sortedBids.map((bid, idx) => (
                           <div key={bid.id} className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center ${idx === 0 ? 'bg-brand-900/10 border-brand-500/50 shadow-lg shadow-brand-500/10' : 'bg-slate-900 border-slate-800'}`}>
                              {idx === 0 && (
                                 <div className="md:hidden w-full bg-brand-500/20 text-brand-300 text-xs font-bold text-center py-1 rounded">
                                    Лучшая цена
                                 </div>
                              )}
                              
                              <div className="flex items-center gap-3 flex-1 w-full md:w-auto">
                                 <div className="relative">
                                    <img src={bid.seller.avatar} className="w-10 h-10 rounded-full border border-slate-700" alt="" />
                                    {idx === 0 && <div className="absolute -top-2 -right-1 bg-yellow-500 text-black text-[8px] font-bold px-1 rounded-full">TOP</div>}
                                 </div>
                                 <div>
                                    <div className="flex items-center gap-2">
                                       <span className="font-bold text-white text-sm">{bid.seller.username}</span>
                                       <div className="flex items-center text-xs text-yellow-500">
                                          <Star className="w-3 h-3 fill-current mr-0.5" /> {bid.seller.stats.rating}
                                       </div>
                                    </div>
                                    <div className="text-xs text-slate-500">{bid.seller.stats.totalSales} продаж</div>
                                 </div>
                              </div>

                              <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                 <div>
                                    <div className="text-xs text-slate-500 mb-0.5">Время</div>
                                    <div className="text-white font-medium text-sm flex items-center">
                                       <Clock className="w-3 h-3 mr-1 text-slate-400" /> {bid.timeEstimate}
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <div className="text-xs text-slate-500 mb-0.5">Цена</div>
                                    <div className="text-brand-400 font-bold text-lg">{bid.price} {bid.currency === 'RUB' ? '₽' : bid.currency}</div>
                                 </div>
                              </div>

                              <div className="flex gap-2 w-full md:w-auto">
                                 <button 
                                   onClick={() => handleContact(bid.seller.id)}
                                   className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
                                   title="Написать"
                                 >
                                    <MessageSquare className="w-5 h-5" />
                                 </button>
                                 {isBuyer && (
                                    <button className="flex-1 md:flex-none px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-green-900/20">
                                       Принять
                                    </button>
                                 )}
                              </div>
                           </div>
                        ))
                     )}
                  </div>
               </div>
            </div>

            {/* Sidebar Actions (Right) */}
            <div className="space-y-6">
               
               {/* Buyer Profile Card */}
               <div className="glass-panel p-6 rounded-3xl border border-slate-800 text-center">
                  <div className="w-20 h-20 mx-auto rounded-full p-1 bg-gradient-to-br from-slate-700 to-slate-800 mb-3">
                     <img src={request.buyer.avatar} className="w-full h-full rounded-full object-cover border-4 border-slate-900" alt="" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{request.buyer.username}</h3>
                  <p className="text-slate-400 text-sm mb-4">Покупатель</p>
                  
                  {!isBuyer && (
                     <button 
                       onClick={() => handleContact(request.buyer.id)}
                       className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors border border-slate-700 flex items-center justify-center gap-2"
                     >
                        <MessageSquare className="w-4 h-4" /> Написать
                     </button>
                  )}
               </div>

               {/* Seller Action: Place Bid */}
               {!isBuyer && (
                  <div className="glass-panel p-6 rounded-3xl border border-brand-500/30 shadow-lg shadow-brand-900/20 relative overflow-hidden">
                     {existingBid ? (
                        <div className="text-center">
                           <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                              <CheckCircle className="w-6 h-6 text-green-400" />
                           </div>
                           <h3 className="text-white font-bold mb-2">Вы сделали предложение</h3>
                           <p className="text-slate-400 text-sm mb-4">
                              {existingBid.price} RUB за {existingBid.timeEstimate}
                           </p>
                           <button 
                              onClick={handleEditBidClick}
                              className="text-brand-400 text-sm hover:underline"
                           >
                              Изменить предложение
                           </button>
                        </div>
                     ) : (
                        <form onSubmit={handlePlaceBid}>
                           <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                              <Zap className="w-5 h-5 mr-2 text-yellow-400" /> Сделать предложение
                           </h3>
                           
                           <div className="space-y-4">
                              <div>
                                 <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Стоимость (RUB)</label>
                                 <input 
                                    type="number" 
                                    required
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-brand-500 focus:outline-none"
                                    placeholder="2000"
                                    value={yourBid.price}
                                    onChange={(e) => setYourBid({...yourBid, price: e.target.value})}
                                 />
                              </div>
                              
                              {/* Time Selection Dropdowns */}
                              <div>
                                 <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Сроки выполнения</label>
                                 <div className="flex gap-2">
                                    <div className="relative w-1/3">
                                       <select 
                                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white appearance-none focus:border-brand-500 focus:outline-none cursor-pointer"
                                          value={timeValue}
                                          onChange={(e) => setTimeValue(e.target.value)}
                                       >
                                          {Array.from({ length: 24 }, (_, i) => i + 1).map(num => (
                                             <option key={num} value={num}>{num}</option>
                                          ))}
                                       </select>
                                       <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                                    </div>
                                    <div className="relative flex-1">
                                       <select 
                                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white appearance-none focus:border-brand-500 focus:outline-none cursor-pointer"
                                          value={timeUnit}
                                          onChange={(e) => setTimeUnit(e.target.value)}
                                       >
                                          <option value="Часов">Часов</option>
                                          <option value="Дней">Дней</option>
                                       </select>
                                       <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-slate-500 pointer-events-none" />
                                    </div>
                                 </div>
                              </div>

                              <div>
                                 <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Комментарий</label>
                                 <textarea 
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:border-brand-500 focus:outline-none h-20 resize-none text-sm"
                                    placeholder="Готов приступить прямо сейчас..."
                                    value={yourBid.comment}
                                    onChange={(e) => setYourBid({...yourBid, comment: e.target.value})}
                                 />
                              </div>
                              
                              <button 
                                 type="submit"
                                 disabled={isSubmitting}
                                 className="w-full py-3 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-bold rounded-xl shadow-lg hover:shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
                              >
                                 {isSubmitting ? 'Отправка...' : 'Отправить предложение'}
                              </button>
                           </div>
                        </form>
                     )}
                  </div>
               )}

            </div>

         </div>
      </div>
    </div>
  );
};