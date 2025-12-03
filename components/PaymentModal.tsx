
import React, { useState } from 'react';
import { Listing } from '../types';
import { X, CreditCard, Wallet, Bitcoin, CheckCircle2, Loader2, ShieldCheck, User } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (listing: Listing, method: string, nickname?: string) => void;
  listing: Listing | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onConfirm, listing }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [nickname, setNickname] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !listing) return null;

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm(listing, selectedMethod, nickname);
    }, 1500);
  };

  const methods = [
    { id: 'card', name: 'Банковская карта', icon: CreditCard, desc: 'Visa, MasterCard, MIR' },
    { id: 'sbp', name: 'СБП', icon: Wallet, desc: 'Быстрый платеж по QR' },
    { id: 'crypto', name: 'Криптовалюта', icon: Bitcoin, desc: 'USDT, BTC, ETH' },
  ];

  // Fee calculation (mock)
  const fee = 0; 
  const total = listing.price + fee;
  
  const isCurrency = listing.type === 'currency';
  const isPayDisabled = isProcessing || (isCurrency && !nickname.trim());

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-700 overflow-hidden animate-fade-in">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-lg font-bold text-white">Оформление заказа</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Item Summary */}
          <div className="flex gap-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
             <div className="w-16 h-16 rounded-lg bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-700">
                {listing.screenshots && listing.screenshots[0] ? (
                   <img src={listing.screenshots[0]} alt="" className="w-full h-full object-cover" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-500">IMG</div>
                )}
             </div>
             <div>
                <h4 className="text-sm font-bold text-white line-clamp-1">{listing.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{listing.type} • {listing.deliveryTime}</p>
                <p className="text-brand-400 font-bold mt-1">{listing.price} {listing.currency}</p>
             </div>
          </div>

          {/* Nickname Input (Only for Currency) */}
          {isCurrency && (
            <div className="animate-fade-in">
               <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">
                  Ник персонажа <span className="text-red-500">*</span>
               </label>
               <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                     type="text"
                     className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-slate-600"
                     placeholder="Введите ник в игре"
                     value={nickname}
                     onChange={(e) => setNickname(e.target.value)}
                  />
               </div>
               <p className="text-[10px] text-slate-500 mt-2 ml-1">
                  Убедитесь, что ник указан верно. На него будет доставлена валюта.
               </p>
            </div>
          )}

          {/* Payment Methods */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Выберите способ оплаты</label>
            <div className="space-y-2">
              {methods.map(method => (
                <div 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center p-3 rounded-xl border cursor-pointer transition-all ${selectedMethod === method.id ? 'bg-brand-500/10 border-brand-500 ring-1 ring-brand-500/50' : 'bg-slate-900 border-slate-700 hover:bg-slate-800'}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${selectedMethod === method.id ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-bold text-sm ${selectedMethod === method.id ? 'text-white' : 'text-slate-300'}`}>{method.name}</div>
                    <div className="text-xs text-slate-500">{method.desc}</div>
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle2 className="w-5 h-5 text-brand-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Total & Action */}
          <div className="pt-2">
             <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-slate-400">Итого к оплате:</span>
                <span className="text-2xl font-black text-white">{total.toLocaleString()} {listing.currency}</span>
             </div>
             
             <button 
               onClick={handlePay}
               disabled={isPayDisabled}
               className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:scale-[1.02] flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
             >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Обработка...
                  </>
                ) : (
                  <>
                    Оплатить заказ
                  </>
                )}
             </button>
             
             <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                <span>Деньги резервируются и переводятся продавцу только после выполнения заказа</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
