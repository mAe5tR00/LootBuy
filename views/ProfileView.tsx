
import React from 'react';
import { User } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Shield, Zap, Crown, Award, Clock, ThumbsUp, TrendingUp, Settings, ShoppingBag, Package, Heart, MessageSquare, CreditCard, ChevronRight, CheckCircle2, Clock3, Calendar } from 'lucide-react';
import { MOCK_BUYER_STATS, MOCK_ORDERS } from '../services/mockData';

interface ProfileViewProps {
  user: User;
  onNavigate: (view: string) => void;
  isOwnProfile: boolean;
}

const SALES_DATA = [
  { name: 'Пн', sales: 400 },
  { name: 'Вт', sales: 300 },
  { name: 'Ср', sales: 600 },
  { name: 'Чт', sales: 800 },
  { name: 'Пт', sales: 500 },
  { name: 'Сб', sales: 900 },
  { name: 'Вс', sales: 750 },
];

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onNavigate, isOwnProfile }) => {
  const xpPercentage = (user.xp / user.nextLevelXp) * 100;
  const isSeller = user.role === 'seller';
  
  // Use banner from user object or fallback
  const bannerStyle = user.banner 
    ? { backgroundImage: `url(${user.banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : undefined;

  // --- BUYER PROFILE CONTENT ---
  const renderBuyerContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Buyer Stats & Info */}
      <div className="space-y-6">
        <div className="glass-panel p-6 rounded-2xl">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center">
             <CreditCard className="w-5 h-5 mr-2 text-brand-400" /> Активность
           </h3>
           <div className="space-y-4">
             {/* Hide Total Spent for other users */}
             {isOwnProfile && (
               <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <span className="text-slate-400 text-sm">Всего потрачено</span>
                  <span className="text-white font-bold text-lg">{MOCK_BUYER_STATS.totalSpent.toLocaleString('ru-RU')} ₽</span>
               </div>
             )}
             <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 text-sm">Куплено товаров</span>
                <span className="text-white font-bold text-lg">{MOCK_BUYER_STATS.ordersCount}</span>
             </div>
             <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                <span className="text-slate-400 text-sm">Уровень лояльности</span>
                <span className="text-yellow-400 font-bold text-lg">{MOCK_BUYER_STATS.loyaltyLevel}</span>
             </div>
           </div>
        </div>

        {/* Private Favorites (Only Own) */}
        {isOwnProfile && (
          <div className="glass-panel p-6 rounded-2xl">
             <h3 className="text-lg font-bold text-white mb-4 flex items-center">
               <Heart className="w-5 h-5 mr-2 text-red-500" /> Избранное
             </h3>
             <div className="text-center py-8 text-slate-500 text-sm">
               <p>Вы пока ничего не добавили в избранное.</p>
               <button onClick={() => onNavigate('marketplace')} className="mt-2 text-brand-400 hover:text-brand-300">Перейти в каталог</button>
             </div>
          </div>
        )}
      </div>

      {/* Buyer Orders History (Private) */}
      <div className="lg:col-span-2 space-y-6">
         {isOwnProfile ? (
           <div className="glass-panel p-6 rounded-2xl">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2 text-brand-400" /> Мои заказы
                </h3>
                <button className="text-sm text-slate-400 hover:text-white transition-colors">Архив заказов</button>
             </div>
             
             <div className="space-y-4">
               {MOCK_ORDERS.map((order) => (
                 <div key={order.id} className="bg-slate-800/40 border border-slate-700/50 hover:border-slate-600 rounded-xl p-4 transition-all group">
                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Icon/Image */}
                      <div className="w-12 h-12 rounded-lg bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-700">
                        <img src={order.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-start">
                            <h4 className="text-white font-bold truncate pr-4">{order.title}</h4>
                            <span className="text-white font-bold whitespace-nowrap">{order.price} ₽</span>
                         </div>
                         <div className="flex items-center text-xs text-slate-400 mt-1">
                            <span className="mr-3">Продавец: <span className="text-brand-400">{order.sellerName}</span></span>
                            <span>{order.date}</span>
                         </div>
                      </div>

                      {/* Status & Action */}
                      <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0 justify-between sm:justify-end">
                         {order.status === 'completed' ? (
                           <div className="flex items-center px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-medium text-green-400">
                              <CheckCircle2 className="w-3 h-3 mr-1" /> Выполнен
                           </div>
                         ) : (
                           <div className="flex items-center px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-xs font-medium text-yellow-400">
                              <Clock3 className="w-3 h-3 mr-1" /> В процессе
                           </div>
                         )}
                         
                         <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                         </button>
                      </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         ) : (
           <div className="glass-panel p-12 rounded-2xl text-center border border-slate-800">
              <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white">История заказов скрыта</h3>
              <p className="text-slate-500">Пользователь ограничил доступ к этой информации.</p>
           </div>
         )}
      </div>
    </div>
  );

  // --- SELLER PROFILE CONTENT ---
  const renderSellerContent = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Seller Stats */}
      <div className="space-y-6">
         <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-brand-400" /> Эффективность
            </h3>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-400 text-xs uppercase tracking-wide">Продажи</p>
                  <p className="text-2xl font-bold text-white">{user.stats.totalSales}</p>
               </div>
               <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-400 text-xs uppercase tracking-wide">Рейтинг</p>
                  <div className="flex items-center">
                    <p className="text-2xl font-bold text-yellow-400">{user.stats.rating}</p>
                    <span className="text-xs text-slate-500 ml-1">/ 5.0</span>
                  </div>
               </div>
               <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-400 text-xs uppercase tracking-wide">Заказы</p>
                  <p className="text-2xl font-bold text-white">{user.stats.completedOrders}</p>
               </div>
               <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <p className="text-slate-400 text-xs uppercase tracking-wide">Ответ</p>
                  <p className="text-2xl font-bold text-green-400">{user.stats.responseTime}</p>
               </div>
            </div>
         </div>

         <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center">
               <Award className="w-5 h-5 mr-2 text-yellow-500" /> Достижения
            </h3>
            <div className="flex flex-wrap gap-3">
               {user.badges.map(badge => (
                 <div key={badge.id} className="group relative">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-slate-700 hover:border-brand-500 transition-all cursor-help">
                       {badge.icon === 'Zap' && <Zap className={`w-6 h-6 ${badge.color}`} />}
                       {badge.icon === 'Crown' && <Crown className={`w-6 h-6 ${badge.color}`} />}
                       {badge.icon === 'ShieldCheck' && <Shield className={`w-6 h-6 ${badge.color}`} />}
                    </div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 bg-slate-900 text-xs text-center text-white p-2 rounded shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                       {badge.description}
                    </div>
                 </div>
               ))}
               <div className="w-12 h-12 rounded-xl bg-slate-900/50 border border-slate-800 border-dashed flex items-center justify-center opacity-50">
                  <span className="text-xs text-slate-600">?</span>
               </div>
            </div>
         </div>
      </div>

      {/* Seller Main Content */}
      <div className="lg:col-span-2 space-y-6">
         
         {/* Income Chart (Only Own) */}
         {isOwnProfile && (
           <div className="glass-panel p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Доходы (7 дней)</h3>
                <select className="bg-slate-900 border border-slate-700 text-xs text-slate-300 rounded px-2 py-1">
                  <option>Последняя неделя</option>
                  <option>Последний месяц</option>
                </select>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SALES_DATA}>
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} prefix="₽" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                      itemStyle={{ color: '#38bdf8' }}
                      cursor={{ fill: 'rgba(56, 189, 248, 0.1)' }}
                    />
                    <Bar dataKey="sales" radius={[4, 4, 0, 0]}>
                      {SALES_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 6 ? '#0ea5e9' : '#334155'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>
         )}

         <div className="glass-panel p-6 rounded-2xl">
           <h3 className="text-lg font-bold text-white mb-4">Отзывы покупателей</h3>
           <div className="space-y-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex space-x-4 border-b border-slate-800/50 pb-4 last:border-0 last:pb-0">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                    U{i}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                       <span className="font-semibold text-white text-sm">Покупатель_{900+i}</span>
                       <span className="text-xs text-slate-500">2 часа назад</span>
                    </div>
                    <div className="flex text-yellow-500 my-1">
                       {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                    </div>
                    <p className="text-sm text-slate-400">Быстрая доставка, продавец надежный! Буду брать еще.</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center text-xs text-green-400 bg-green-900/20 px-2 py-1 rounded">
                       <ThumbsUp className="w-3 h-3 mr-1" /> Verified
                    </div>
                  </div>
               </div>
             ))}
           </div>
         </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Universal Header (Shared but styled) */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl mb-8">
          <div 
            className={`h-48 relative ${!user.banner ? (isSeller ? 'bg-gradient-to-r from-brand-900 to-indigo-900' : 'bg-gradient-to-r from-emerald-900 to-teal-900') : ''}`}
            style={bannerStyle}
          >
             {!user.banner && (
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
          </div>
          
          <div className="px-8 pb-8 flex flex-col md:flex-row items-end -mt-16 relative z-10">
             <div className="relative">
                <div className={`w-32 h-32 rounded-full p-1 shadow-xl bg-gradient-to-b ${isSeller ? 'from-brand-400 to-accent-purple' : 'from-emerald-400 to-teal-500'}`}>
                   <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full border-4 border-slate-900 object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full border border-slate-700 shadow-lg flex items-center">
                   <Crown className="w-3 h-3 text-yellow-500 mr-1" />
                   Lvl {user.level}
                </div>
             </div>

             <div className="md:ml-6 mt-4 md:mt-0 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-black text-white tracking-tight flex items-center">
                      {user.username}
                      {isSeller && <Shield className="ml-2 w-6 h-6 text-green-400" />}
                    </h1>
                    <p className="text-slate-400 font-medium">{isSeller ? 'Профессиональный трейдер' : 'Уважаемый покупатель'}</p>
                  </div>
                  
                  {/* Settings Button (Only Own) */}
                  {isOwnProfile && (
                    <button 
                      onClick={() => onNavigate('profile-settings')}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition-colors border border-slate-700 group relative"
                      title="Настройки профиля"
                    >
                      <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                    </button>
                  )}
                </div>

                <div className="mt-4 flex flex-col md:flex-row gap-4 justify-between items-end">
                  <div className="w-full max-w-lg">
                    <div className="flex justify-between text-xs font-semibold text-slate-400 mb-1">
                      <span>XP Прогресс</span>
                      <span>{user.xp} / {user.nextLevelXp} XP</span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                      <div 
                        className={`h-full shadow-[0_0_10px_rgba(16,185,129,0.5)] ${isSeller ? 'bg-gradient-to-r from-brand-500 to-accent-purple' : 'bg-gradient-to-r from-emerald-500 to-teal-400'}`} 
                        style={{ width: `${xpPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {user.joinedAt && (
                    <div className="flex items-center text-xs font-medium text-slate-300 bg-slate-900/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-700/50 shadow-sm shrink-0">
                       <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                       <span>Регистрация: {new Date(user.joinedAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                  )}
                </div>
             </div>
          </div>
        </div>

        {/* Content based on Role */}
        {isSeller ? renderSellerContent() : renderBuyerContent()}
        
      </div>
    </div>
  );
};

// Simple Star Icon component for the reviews
const Star: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
