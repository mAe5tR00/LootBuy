import React from 'react';
import { CartItem } from '../types';
import { Trash2, ShoppingCart, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react';

interface CartViewProps {
  items: CartItem[];
  onRemove: (cartId: string) => void;
  onCheckout: () => void;
  onNavigate: (view: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({ items, onRemove, onCheckout, onNavigate }) => {
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
  
  // Group logic could be added here if multiple quantities of same item
  // For now simple list

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="w-10 h-10 text-slate-600" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Корзина пуста</h2>
        <p className="text-slate-400 mb-8">Похоже, вы еще ничего не добавили.</p>
        <button 
          onClick={() => onNavigate('marketplace')}
          className="px-8 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-colors"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8">Корзина</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.cartId} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex gap-4 items-center group hover:border-brand-500/30 transition-colors">
                 
                 {/* Image */}
                 <div className="w-20 h-20 rounded-xl bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-700">
                    {item.screenshots && item.screenshots[0] ? (
                       <img src={item.screenshots[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs font-bold">
                          {item.type.slice(0,3).toUpperCase()}
                       </div>
                    )}
                 </div>

                 {/* Info */}
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                       <h3 className="text-white font-bold truncate pr-4">{item.title}</h3>
                       <button 
                         onClick={() => onRemove(item.cartId)}
                         className="text-slate-500 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition-colors"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                    <p className="text-sm text-slate-400 mb-2">Продавец: <span className="text-brand-400">{item.seller.username}</span></p>
                    <div className="flex items-center gap-2">
                       <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">{item.type}</span>
                       <span className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">{item.deliveryTime}</span>
                    </div>
                 </div>
                 
                 {/* Price */}
                 <div className="text-right pl-4 border-l border-slate-800">
                    <span className="block text-xl font-bold text-white">{item.price} {item.currency}</span>
                    <span className="text-xs text-slate-500">1 шт.</span>
                 </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="lg:col-span-1">
             <div className="glass-panel p-6 rounded-2xl border border-slate-800 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6">Сумма заказа</h2>
                
                <div className="space-y-3 mb-6">
                   <div className="flex justify-between text-slate-400">
                      <span>Товары ({items.length})</span>
                      <span>{totalPrice.toLocaleString()} RUB</span>
                   </div>
                   <div className="flex justify-between text-slate-400">
                      <span>Комиссия сервиса</span>
                      <span className="text-brand-400">0 RUB</span>
                   </div>
                </div>

                <div className="border-t border-slate-800 pt-4 mb-6">
                   <div className="flex justify-between items-end">
                      <span className="text-white font-bold text-lg">Итого</span>
                      <span className="text-2xl font-black text-white">{totalPrice.toLocaleString()} RUB</span>
                   </div>
                </div>

                <button 
                  onClick={onCheckout}
                  className="w-full py-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold rounded-xl shadow-lg shadow-brand-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center mb-4"
                >
                   Перейти к оплате <ArrowRight className="ml-2 w-5 h-5" />
                </button>

                <div className="space-y-3">
                   <div className="flex items-center text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 mr-2 text-green-500" />
                      Безопасная сделка: продавец получит деньги только после выполнения заказа.
                   </div>
                   <div className="flex items-center text-xs text-slate-500">
                      <CreditCard className="w-4 h-4 mr-2 text-slate-400" />
                      Visa, MasterCard, MIR, Crypto
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};