

import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Package, ShoppingBag, Eye, Zap, Bell, CheckSquare, Layers } from 'lucide-react';
import { CreateListingModal } from '../components/CreateListingModal';
import { RECENT_LISTINGS, MOCK_BOOSTING_REQUESTS, POPULAR_GAMES, CURRENT_USER } from '../services/mockData';
import { BOOSTING_CATEGORIES } from '../services/boostingConfigs';
import { Listing, Game } from '../types';

interface SellerDashboardProps {
  onNavigate?: (view: string, data?: any) => void;
}

export const SellerDashboardView: React.FC<SellerDashboardProps> = ({ onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'listings' | 'orders' | 'boosting'>('listings');
  const [listings, setListings] = useState<Listing[]>(RECENT_LISTINGS.slice(0, 3)); // Mock own listings
  const [editingListing, setEditingListing] = useState<Listing | null>(null);

  // Boosting Settings State
  const [boostingSettings, setBoostingSettings] = useState<Record<string, string[]>>(CURRENT_USER.boostingSettings || {});
  const [selectedGameForSettings, setSelectedGameForSettings] = useState<string>(POPULAR_GAMES[0].id);

  const handleOpenCreate = () => {
    setEditingListing(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (e: React.MouseEvent, listing: Listing) => {
    e.stopPropagation();
    setEditingListing(listing);
    setIsModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Вы уверены, что хотите удалить этот лот?')) {
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleSaveListing = (data: any) => {
    if (data.id) {
       setListings(prev => prev.map(l => {
         if (l.id === data.id) {
           return { ...l, ...data, type: 'currency' /* simplified */ };
         }
         return l;
       }));
    } else {
      const newListing: Listing = {
        id: `new-${Date.now()}`,
        title: data.title || `Новый лот`,
        gameId: data.gameId, 
        price: parseFloat(data.price),
        currency: data.currency,
        seller: CURRENT_USER,
        type: 'currency',
        stock: data.stock,
        deliveryTime: data.deliveryTime,
        tags: ['NEW'],
        description: data.description,
        active: true,
        details: data.details,
        screenshots: data.screenshots
      };
      setListings([newListing, ...listings]);
    }
  };

  const toggleBoostingNotification = (gameId: string, categoryId: string) => {
    setBoostingSettings(prev => {
      const gameSettings = prev[gameId] || [];
      const newSettings = gameSettings.includes(categoryId)
        ? gameSettings.filter(c => c !== categoryId)
        : [...gameSettings, categoryId];
      
      // Clean up empty arrays
      if (newSettings.length === 0) {
        const { [gameId]: _, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [gameId]: newSettings };
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      
      {/* Top Bar */}
      <div className="bg-slate-900 border-b border-white/5 py-8">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
               <h1 className="text-3xl font-bold text-white mb-2">Кабинет продавца</h1>
               <div className="flex space-x-6 text-sm overflow-x-auto no-scrollbar">
                  <button 
                     onClick={() => setActiveTab('listings')}
                     className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'listings' ? 'border-brand-500 text-white font-medium' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
                  >
                     Мои лоты ({listings.length})
                  </button>
                  <button 
                     onClick={() => setActiveTab('orders')}
                     className={`pb-2 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'border-brand-500 text-white font-medium' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
                  >
                     Продажи (0)
                  </button>
                  <button 
                     onClick={() => setActiveTab('boosting')}
                     className={`pb-2 border-b-2 transition-colors whitespace-nowrap flex items-center ${activeTab === 'boosting' ? 'border-brand-500 text-white font-medium' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
                  >
                     <Zap className="w-3 h-3 mr-1" /> Запросы на бустинг
                  </button>
               </div>
            </div>
            
            {activeTab === 'listings' && (
              <button 
                 onClick={handleOpenCreate}
                 className="flex items-center px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/20 transition-all transform hover:scale-[1.02]"
              >
                 <Plus className="w-5 h-5 mr-2" /> Добавить лот
              </button>
            )}
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         
         {activeTab === 'listings' && (
            <>
              {/* Filters / Search Bar */}
              <div className="flex items-center space-x-4 mb-6">
                 <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input 
                       type="text" 
                       placeholder="Поиск по вашим лотам..." 
                       className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-brand-500"
                    />
                 </div>
                 <button className="flex items-center px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 text-sm hover:text-white hover:border-slate-600 transition-colors">
                    <Filter className="w-4 h-4 mr-2" /> Фильтры
                 </button>
              </div>

              {/* Listings Table */}
              <div className="glass-panel rounded-xl overflow-hidden border border-slate-700/50">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead className="bg-slate-900 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                          <tr>
                             <th className="px-6 py-4">Лот</th>
                             <th className="px-6 py-4">Цена</th>
                             <th className="px-6 py-4">Наличие</th>
                             <th className="px-6 py-4">Статус</th>
                             <th className="px-6 py-4 text-right">Действия</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-800">
                          {listings.map((item) => (
                             <tr 
                                key={item.id} 
                                onClick={() => onNavigate && onNavigate('listing-detail', item)}
                                className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                             >
                                <td className="px-6 py-4">
                                   <div className="flex items-center">
                                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4 text-slate-500 flex-shrink-0 overflow-hidden">
                                         {item.screenshots && item.screenshots[0] ? (
                                           <img src={item.screenshots[0]} alt="" className="w-full h-full object-cover" />
                                         ) : (
                                           <Package className="w-5 h-5" />
                                         )}
                                      </div>
                                      <div>
                                         <div className="text-white font-medium line-clamp-1 group-hover:text-brand-400 transition-colors">{item.title}</div>
                                         <div className="text-xs text-slate-500 mt-0.5">{item.type} • {item.deliveryTime}</div>
                                      </div>
                                   </div>
                                </td>
                                <td className="px-6 py-4">
                                   <span className="text-white font-bold">{item.price} {item.currency === 'RUB' ? '₽' : item.currency}</span>
                                </td>
                                <td className="px-6 py-4">
                                   <span className="text-slate-300">{item.stock} шт.</span>
                                </td>
                                <td className="px-6 py-4">
                                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                      Активен
                                   </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                   <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <button 
                                        onClick={(e) => handleOpenEdit(e, item)}
                                        className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                                        title="Редактировать"
                                      >
                                         <Edit className="w-4 h-4" />
                                      </button>
                                      <button 
                                        onClick={(e) => handleDelete(e, item.id)}
                                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
                                        title="Удалить"
                                      >
                                         <Trash2 className="w-4 h-4" />
                                      </button>
                                   </div>
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
                 {listings.length === 0 && (
                    <div className="p-12 text-center text-slate-500">
                       У вас пока нет активных лотов.
                    </div>
                 )}
              </div>
            </>
         )}

         {activeTab === 'orders' && (
            <div className="glass-panel rounded-xl p-16 text-center border border-slate-700/50">
               <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800">
                  <ShoppingBag className="w-10 h-10 text-slate-600" />
               </div>
               <h3 className="text-lg font-bold text-white mb-2">История продаж пуста</h3>
               <p className="text-slate-400 max-w-md mx-auto">
                  Здесь будут отображаться заказы от покупателей. Как только кто-то купит ваш лот, вы получите уведомление.
               </p>
            </div>
         )}
         
         {activeTab === 'boosting' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               
               <div className="flex flex-col gap-6">
                 {/* Notification Settings */}
                 <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 h-fit">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                       <Bell className="w-5 h-5 mr-2 text-brand-400" /> Настройки уведомлений
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                       Выберите категории игр, по которым вы хотите получать запросы от покупателей.
                    </p>
                    
                    <div className="mb-4">
                       <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Игра</label>
                       <select 
                         className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-brand-500"
                         value={selectedGameForSettings}
                         onChange={(e) => setSelectedGameForSettings(e.target.value)}
                       >
                          {POPULAR_GAMES.map(g => (
                             <option key={g.id} value={g.id}>{g.name}</option>
                          ))}
                       </select>
                    </div>

                    <div className="space-y-2">
                       {BOOSTING_CATEGORIES.map(cat => {
                          const isEnabled = (boostingSettings[selectedGameForSettings] || []).includes(cat.id);
                          return (
                             <label key={cat.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800 cursor-pointer hover:border-slate-700 transition-colors">
                                <span className="text-sm text-slate-300 font-medium">{cat.label}</span>
                                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isEnabled ? 'bg-brand-600' : 'bg-slate-700'}`}>
                                   <input 
                                     type="checkbox" 
                                     className="sr-only"
                                     checked={isEnabled}
                                     onChange={() => toggleBoostingNotification(selectedGameForSettings, cat.id)}
                                   />
                                   <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${isEnabled ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                </div>
                             </label>
                          );
                       })}
                    </div>
                 </div>

                 {/* Active Subscriptions Summary */}
                 <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 h-fit">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                       <Layers className="w-5 h-5 mr-2 text-green-400" /> Активные подписки
                    </h3>
                    <div className="space-y-4">
                       {Object.entries(boostingSettings).map(([gameId, categories]: [string, string[]]) => {
                          const gameName = POPULAR_GAMES.find(g => g.id === gameId)?.name || 'Unknown Game';
                          if (categories.length === 0) return null;

                          return (
                            <div key={gameId} className="bg-slate-900/50 rounded-xl p-3 border border-slate-800">
                               <h4 className="text-sm font-bold text-white mb-2">{gameName}</h4>
                               <div className="flex flex-wrap gap-1.5">
                                  {categories.map(catId => {
                                     const catLabel = BOOSTING_CATEGORIES.find(c => c.id === catId)?.label || catId;
                                     return (
                                        <span key={catId} className="text-[10px] uppercase tracking-wider bg-brand-500/10 text-brand-300 border border-brand-500/20 px-1.5 py-0.5 rounded">
                                           {catLabel}
                                        </span>
                                     );
                                  })}
                               </div>
                            </div>
                          );
                       })}
                       {Object.keys(boostingSettings).length === 0 && (
                          <div className="text-sm text-slate-500 text-center py-4">
                             У вас пока нет активных уведомлений.
                          </div>
                       )}
                    </div>
                 </div>
               </div>

               {/* Job Board (Requests Feed) */}
               <div className="lg:col-span-2 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center">
                     <Zap className="w-5 h-5 mr-2 text-yellow-500" /> 
                     Доступные запросы
                  </h3>
                  
                  {MOCK_BOOSTING_REQUESTS.map(req => (
                     <div 
                        key={req.id}
                        onClick={() => onNavigate && onNavigate('boosting-request-detail', req)}
                        className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-brand-500/50 cursor-pointer transition-all group relative overflow-hidden"
                     >
                        <div className="flex justify-between items-start mb-3">
                           <div className="flex items-center gap-2">
                              {POPULAR_GAMES.find(g => g.id === req.gameId)?.logo && (
                                 <img src={POPULAR_GAMES.find(g => g.id === req.gameId)?.logo} className="w-6 h-6 rounded bg-slate-800" alt="" />
                              )}
                              <span className="text-xs font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                                 {POPULAR_GAMES.find(g => g.id === req.gameId)?.name}
                              </span>
                              <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded border border-brand-500/20">
                                 {BOOSTING_CATEGORIES.find(c => c.id === req.category)?.label}
                              </span>
                           </div>
                           <span className="text-xs text-slate-500">
                              {new Date(req.createdAt).toLocaleTimeString()}
                           </span>
                        </div>

                        <div className="flex gap-4 mb-4">
                           <div className="flex-1">
                              <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm text-slate-400 mb-2">
                                 {req.details.server && <div>Сервер: <span className="text-white">{req.details.server}</span></div>}
                                 {req.details.faction && <div>Фракция: <span className="text-white">{req.details.faction}</span></div>}
                                 {req.details.class && <div>Класс: <span className="text-white">{req.details.class}</span></div>}
                                 {req.details.targetLevel && <div>Цель: <span className="text-white">Lvl {req.details.targetLevel}</span></div>}
                              </div>
                              <p className="text-sm text-slate-300 line-clamp-2 italic border-l-2 border-slate-700 pl-3">
                                 "{req.details.comment || 'Без комментария'}"
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
                           <div className="flex items-center gap-2 text-xs text-slate-500">
                              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                              Открыт для предложений
                           </div>
                           <button className="text-sm font-bold text-brand-400 group-hover:text-white flex items-center transition-colors">
                              Предложить услугу <Zap className="w-4 h-4 ml-1" />
                           </button>
                        </div>
                     </div>
                  ))}

                  {MOCK_BOOSTING_REQUESTS.length === 0 && (
                     <div className="text-center py-12 text-slate-500 bg-slate-900/30 rounded-2xl border border-slate-800 border-dashed">
                        Нет активных запросов, соответствующих вашим фильтрам.
                     </div>
                  )}
               </div>
            </div>
         )}

      </div>

      <CreateListingModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         onSubmit={handleSaveListing}
         listingToEdit={editingListing}
      />

    </div>
  );
};