import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Package, ShoppingBag } from 'lucide-react';
import { CreateListingModal } from '../components/CreateListingModal';
import { RECENT_LISTINGS } from '../services/mockData';
import { Listing } from '../types';

export const SellerDashboardView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'listings' | 'orders'>('listings');
  const [listings, setListings] = useState<Listing[]>(RECENT_LISTINGS.slice(0, 3)); // Mock own listings

  const handleCreateListing = (data: any) => {
    // Mock creating a listing
    const newListing: Listing = {
      id: `new-${Date.now()}`,
      title: data.title || `${data.category} - ${data.game}`,
      gameId: 'g1', // mock
      price: parseFloat(data.price),
      currency: 'RUB',
      seller: RECENT_LISTINGS[0].seller, // Mock self
      type: data.category,
      stock: parseInt(data.stock),
      deliveryTime: data.deliveryTime,
      tags: ['NEW'],
      description: data.description,
      active: true
    };
    setListings([newListing, ...listings]);
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-20">
      
      {/* Top Bar */}
      <div className="bg-slate-900 border-b border-white/5 py-8">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-end">
            <div>
               <h1 className="text-3xl font-bold text-white mb-2">Кабинет продавца</h1>
               <div className="flex space-x-6 text-sm">
                  <button 
                     onClick={() => setActiveTab('listings')}
                     className={`pb-2 border-b-2 transition-colors ${activeTab === 'listings' ? 'border-brand-500 text-white font-medium' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
                  >
                     Мои лоты ({listings.length})
                  </button>
                  <button 
                     onClick={() => setActiveTab('orders')}
                     className={`pb-2 border-b-2 transition-colors ${activeTab === 'orders' ? 'border-brand-500 text-white font-medium' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
                  >
                     Продажи (0)
                  </button>
               </div>
            </div>
            
            <button 
               onClick={() => setIsModalOpen(true)}
               className="flex items-center px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/20 transition-all transform hover:scale-[1.02]"
            >
               <Plus className="w-5 h-5 mr-2" /> Добавить лот
            </button>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         
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
         {activeTab === 'listings' && (
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
                           <tr key={item.id} className="hover:bg-slate-800/30 transition-colors group">
                              <td className="px-6 py-4">
                                 <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center mr-4 text-slate-500">
                                       <Package className="w-5 h-5" />
                                    </div>
                                    <div>
                                       <div className="text-white font-medium line-clamp-1">{item.title}</div>
                                       <div className="text-xs text-slate-500 mt-0.5">{item.type} • {item.deliveryTime}</div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-6 py-4">
                                 <span className="text-white font-bold">{item.price} ₽</span>
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
                                    <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                       <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors">
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

      </div>

      <CreateListingModal 
         isOpen={isModalOpen} 
         onClose={() => setIsModalOpen(false)} 
         onSubmit={handleCreateListing}
      />

    </div>
  );
};