import React, { useState } from 'react';
import { User } from '../types';
import { ChevronLeft, Save, Upload, Image as ImageIcon, User as UserIcon, Lock } from 'lucide-react';

interface ProfileSettingsViewProps {
  user: User;
  onSave: (updates: Partial<User>) => void;
  onCancel: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    avatar: user.avatar,
    banner: user.banner || '',
    username: user.username
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      avatar: formData.avatar,
      banner: formData.banner,
      username: formData.username
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={onCancel}
            className="flex items-center text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Назад к профилю
          </button>
          <h1 className="text-2xl font-bold text-white">Настройки профиля</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Settings Form */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl border border-slate-700 shadow-xl space-y-8">
              
              {/* Avatar Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center">
                  <UserIcon className="w-4 h-4 mr-2 text-brand-400" /> Ссылка на аватар
                </label>
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex-shrink-0 overflow-hidden border border-slate-600">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <UserIcon className="w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <input 
                      type="text" 
                      value={formData.avatar}
                      onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none mb-2"
                      placeholder="https://..."
                    />
                    <p className="text-xs text-slate-500">Рекомендуемый размер 200x200px. URL изображения.</p>
                  </div>
                </div>
              </div>

              {/* Banner Input */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center">
                  <ImageIcon className="w-4 h-4 mr-2 text-brand-400" /> Ссылка на баннер
                </label>
                <input 
                  type="text" 
                  value={formData.banner}
                  onChange={(e) => setFormData({...formData, banner: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 px-4 text-white focus:ring-2 focus:ring-brand-500 focus:outline-none mb-2"
                  placeholder="https://..."
                />
                <p className="text-xs text-slate-500">Широкое изображение (1200x300px) для шапки профиля.</p>
              </div>

              {/* Username Input (Read Only) */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-3 flex items-center justify-between">
                  Имя пользователя
                  <span className="flex items-center text-xs text-slate-500 bg-slate-900/50 px-2 py-1 rounded border border-slate-800">
                    <Lock className="w-3 h-3 mr-1" /> Нельзя изменить
                  </span>
                </label>
                <input 
                  type="text" 
                  value={formData.username}
                  disabled
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-slate-500 cursor-not-allowed focus:outline-none"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-lg shadow-brand-500/20 transition-all transform hover:scale-[1.02] flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" /> Сохранить изменения
                </button>
                <button 
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>

          {/* Live Preview Sidebar */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Предпросмотр</h3>
            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-700 pointer-events-none select-none">
              <div 
                className="h-32 bg-slate-800 relative bg-cover bg-center"
                style={formData.banner ? { backgroundImage: `url(${formData.banner})` } : {}}
              >
                {!formData.banner && <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-600 text-xs">Нет баннера</div>}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent"></div>
              </div>
              <div className="px-6 pb-6 relative -mt-10">
                <div className="w-20 h-20 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800 shadow-xl mb-3">
                  {formData.avatar ? (
                    <img src={formData.avatar} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full bg-brand-500"></div>
                  )}
                </div>
                <h2 className="text-xl font-bold text-white leading-tight">{formData.username || 'Username'}</h2>
                <p className="text-xs text-slate-400">Профессиональный трейдер</p>
                
                <div className="mt-4 space-y-2 opacity-50">
                   <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
                   <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center">
               Так ваш профиль будут видеть другие пользователи
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};