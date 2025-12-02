import React, { useState } from 'react';
import { ShieldCheck, Coins, Globe, Rocket, CheckCircle2, ChevronRight } from 'lucide-react';

interface SellerOnboardingViewProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const SellerOnboardingView: React.FC<SellerOnboardingViewProps> = ({ onConfirm, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleActivate = () => {
    if (!agreed) return;
    setLoading(true);
    // Simulate API request to update role
    setTimeout(() => {
      onConfirm();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center pt-12 pb-20 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-radial from-brand-900/40 to-transparent opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            Зарабатывай на том,<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-purple">что любишь</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Присоединяйся к тысячам продавцов на LootBuy. Продавай золото, аккаунты, скины и услуги бустинга безопасно и выгодно.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-2xl hover:border-brand-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
              <Coins className="w-6 h-6 text-brand-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Минимальная комиссия</h3>
            <p className="text-slate-400 text-sm">Мы берем меньше, чем конкуренты. Выводи заработанное без скрытых платежей на карты и крипту.</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-2xl hover:border-brand-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Защита продавца</h3>
            <p className="text-slate-400 text-sm">Наша система арбитража защищает вас от мошенников. Деньги замораживаются до подтверждения сделки.</p>
          </div>

          <div className="bg-slate-900/50 backdrop-blur border border-slate-800 p-6 rounded-2xl hover:border-brand-500/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Глобальный рынок</h3>
            <p className="text-slate-400 text-sm">Ваши лоты увидят миллионы геймеров по всему миру. Автоматический перевод описаний.</p>
          </div>
        </div>

        {/* Activation Card */}
        <div className="glass-panel p-8 rounded-3xl border border-brand-500/20 shadow-2xl shadow-brand-900/20 max-w-2xl mx-auto">
           <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold text-white mb-6">Активация кабинета продавца</h2>
              
              <div className="w-full space-y-4 mb-8 text-left bg-slate-950/50 p-6 rounded-xl border border-slate-800/50">
                 <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 mr-3 flex-shrink-0" />
                    <span>Я обязуюсь выполнять заказы в указанные сроки</span>
                 </div>
                 <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 mr-3 flex-shrink-0" />
                    <span>Я подтверждаю, что мне есть 18 лет</span>
                 </div>
                 <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-brand-500 mr-3 flex-shrink-0" />
                    <span>Я ознакомился с <a href="#" className="text-brand-400 underline">правилами для продавцов</a></span>
                 </div>
              </div>

              <label className="flex items-center cursor-pointer mb-8 select-none">
                 <div className="relative">
                    <input type="checkbox" className="sr-only" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                    <div className={`w-6 h-6 border-2 rounded transition-colors flex items-center justify-center ${agreed ? 'bg-brand-500 border-brand-500' : 'border-slate-500 bg-transparent'}`}>
                       {agreed && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                 </div>
                 <span className="ml-3 text-slate-300 text-sm">Я принимаю условия оферты LootBuy</span>
              </label>

              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={handleActivate}
                  disabled={!agreed || loading}
                  className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all transform flex items-center justify-center
                    ${agreed && !loading 
                      ? 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 shadow-lg shadow-brand-500/25 hover:scale-[1.02]' 
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-70'}
                  `}
                >
                  {loading ? (
                    <span className="flex items-center"><Rocket className="w-5 h-5 mr-2 animate-bounce" /> Активация...</span>
                  ) : (
                    <span className="flex items-center">Активировать аккаунт <ChevronRight className="w-5 h-5 ml-2" /></span>
                  )}
                </button>
                <button onClick={onCancel} className="text-slate-500 text-sm hover:text-white py-2">
                   Вернуться назад
                </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};