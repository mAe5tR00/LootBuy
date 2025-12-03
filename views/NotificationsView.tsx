import React from 'react';
import { Notification } from '../types';
import { Bell, Info, CheckCircle, Tag, MessageSquare } from 'lucide-react';

interface NotificationsViewProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({ notifications, onMarkRead }) => {
  
  const getIcon = (type: string) => {
    switch(type) {
      case 'promo': return <Tag className="w-5 h-5 text-purple-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-blue-400" />;
      default: return <Info className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-8 pb-20">
      <div className="max-w-3xl mx-auto px-4">
         <h1 className="text-2xl font-bold text-white mb-8 flex items-center">
            <Bell className="w-6 h-6 mr-3 text-brand-400" />
            Уведомления
         </h1>

         <div className="space-y-4">
            {notifications.length === 0 ? (
               <div className="text-center py-12 text-slate-500 bg-slate-900/30 rounded-2xl border border-slate-800">
                  <p>У вас пока нет новых уведомлений.</p>
               </div>
            ) : (
               notifications.map(n => (
                  <div 
                    key={n.id} 
                    className={`relative p-5 rounded-2xl border transition-all ${n.read ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-900 border-slate-700 shadow-lg'}`}
                    onClick={() => onMarkRead(n.id)}
                  >
                     <div className="flex gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${n.read ? 'bg-slate-800' : 'bg-slate-800 border border-slate-600'}`}>
                           {getIcon(n.type)}
                        </div>
                        <div className="flex-1">
                           <div className="flex justify-between items-start">
                              <h4 className={`text-sm font-bold mb-1 ${n.read ? 'text-slate-300' : 'text-white'}`}>{n.title}</h4>
                              <span className="text-xs text-slate-500">{new Date(n.date).toLocaleDateString()}</span>
                           </div>
                           <p className="text-sm text-slate-400 leading-relaxed">{n.message}</p>
                        </div>
                     </div>
                     {!n.read && (
                        <div className="absolute top-5 right-5 w-2 h-2 rounded-full bg-brand-500"></div>
                     )}
                  </div>
               ))
            )}
         </div>
      </div>
    </div>
  );
};