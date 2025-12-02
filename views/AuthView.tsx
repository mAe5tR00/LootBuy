import React, { useState } from 'react';
import { User, Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';

interface AuthViewProps {
  onLogin: (role: 'buyer' | 'seller') => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [wantToSell, setWantToSell] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const role = isRegister && wantToSell ? 'seller' : 'buyer';
      // In a real app, this would return the user object with the correct role
      onLogin(role);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl"></div>
      </div>

      <div className="glass-panel w-full max-w-md p-8 rounded-2xl border border-slate-700 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-accent-purple tracking-tighter mb-2">
            LOOTBUY
          </h1>
          <p className="text-slate-400">
            {isRegister ? 'Создайте аккаунт и начните торговать' : 'С возвращением, герой'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-900/50 p-1 rounded-lg mb-6">
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isRegister ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            onClick={() => setIsRegister(false)}
          >
            Вход
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isRegister ? 'bg-slate-700 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            onClick={() => setIsRegister(true)}
          >
            Регистрация
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="relative">
              <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Имя пользователя" 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                required
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
            <input 
              type="email" 
              placeholder="Email адрес" 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              defaultValue="demo@lootbuy.com"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
            <input 
              type="password" 
              placeholder="Пароль" 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
              defaultValue="password"
              required
            />
          </div>

          {isRegister && (
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
              <input 
                type="password" 
                placeholder="Подтвердите пароль" 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                required
              />
            </div>
          )}

          {isRegister && (
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 mt-2">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="mt-1 form-checkbox h-5 w-5 text-brand-600 rounded border-slate-600 bg-slate-800 focus:ring-0 transition duration-150 ease-in-out"
                  checked={wantToSell}
                  onChange={(e) => setWantToSell(e.target.checked)}
                />
                <div>
                   <span className="text-white font-medium block">Я хочу продавать</span>
                   <span className="text-xs text-slate-400 block mt-1">
                     Активирует кабинет продавца. Вы сможете создавать лоты и зарабатывать на играх.
                   </span>
                </div>
              </label>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-500/20 transition-all transform hover:scale-[1.02] flex items-center justify-center mt-6"
          >
            {loading ? (
              <span className="animate-pulse">Обработка...</span>
            ) : (
              <>
                {isRegister ? 'Создать аккаунт' : 'Войти в аккаунт'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
            <p className="text-xs text-slate-500">
              Нажимая кнопку, вы принимаете <a href="#" className="text-brand-400 hover:underline">Условия использования</a> и <a href="#" className="text-brand-400 hover:underline">Политику конфиденциальности</a>.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-slate-600 text-xs">
               <ShieldCheck className="w-4 h-4" /> 100% защита сделок
            </div>
        </div>
      </div>
    </div>
  );
};