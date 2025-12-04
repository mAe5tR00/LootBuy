

import React from 'react';
import { Search, Bell, Menu, User as UserIcon, PlusCircle, LogIn, Wallet, Package, MessageSquare, ShieldAlert } from 'lucide-react';
import { User, AuthState } from '../types';

interface NavbarProps {
  user: User;
  onNavigate: (view: string) => void;
  authState: AuthState;
  onLoginClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, authState, onLoginClick }) => {
  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-accent-purple tracking-tighter">
              LOOT
            </span>
            <span className="ml-1 text-sm font-bold text-slate-400 tracking-widest">BUY</span>
          </div>

          {/* Search */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-brand-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-xl leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:bg-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 sm:text-sm transition-all duration-200"
                placeholder="Поиск игр, золота, аккаунтов..."
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            
            {/* ADMIN SHORTCUT (Demo) */}
            <button 
               onClick={() => onNavigate('admin-dashboard')}
               className="hidden lg:flex items-center px-3 py-1.5 rounded-lg bg-indigo-900/30 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-900/50 hover:text-white transition-colors text-xs font-bold"
            >
               <ShieldAlert className="w-3.5 h-3.5 mr-1.5" />
               Админ панель
            </button>

            {/* GUEST MODE */}
            {authState === 'guest' && (
              <>
                <button 
                  onClick={onLoginClick}
                  className="hidden md:flex items-center px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium border border-slate-700 transition-all"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Войти
                </button>
                <button 
                   onClick={onLoginClick} // In real app, goes to register
                   className="flex items-center px-5 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold shadow-lg shadow-brand-500/20 transition-all"
                >
                  Регистрация
                </button>
              </>
            )}

            {/* LOGGED IN MODES */}
            {authState !== 'guest' && (
              <>
                 {/* Seller Specific Button */}
                 {authState === 'seller' && (
                    <button 
                      onClick={() => onNavigate('seller-dashboard')}
                      className="hidden md:flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white text-sm font-semibold border border-slate-600 transition-all transform hover:scale-105"
                    >
                      <Package className="w-4 h-4 mr-2 text-brand-400" />
                      Мои лоты
                    </button>
                 )}

                {/* Buyer Specific Button (Upsell) */}
                {authState === 'buyer' && (
                   <button 
                    onClick={() => onNavigate('seller-onboarding')}
                    className="hidden md:flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors border border-transparent hover:border-slate-700"
                   >
                     Стать продавцом
                   </button>
                )}

                <button 
                  onClick={() => onNavigate('notifications')}
                  className="p-2 text-slate-400 hover:text-white transition-colors relative"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-slate-900"></span>
                </button>

                {/* Chat Button */}
                <button 
                  onClick={() => onNavigate('chat')}
                  className="p-2 text-slate-400 hover:text-white transition-colors relative"
                >
                  <MessageSquare className="h-6 w-6" />
                  <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-brand-500 ring-2 ring-slate-900"></span>
                </button>
                
                {/* Balance (Mock) */}
                <div className="hidden lg:flex items-center px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-green-400 mr-2">
                   <Wallet className="w-3 h-3 mr-2" /> {user.balance?.toLocaleString()} ₽
                </div>

                {/* Profile Dropdown Trigger */}
                <div 
                  className="flex items-center space-x-2 ml-2 cursor-pointer p-1 rounded-full border border-transparent hover:border-slate-700 transition-all"
                  onClick={() => onNavigate('profile')}
                >
                  <div className="relative">
                    <img 
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-800" 
                      src={user.avatar} 
                      alt={user.username} 
                    />
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                  </div>
                </div>
              </>
            )}
            
            <div className="md:hidden">
                <Menu className="h-6 w-6 text-slate-300" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
