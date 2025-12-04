
import React, { useState } from 'react';
import { User, Listing, Order } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ShieldAlert, Users, Package, AlertTriangle, TrendingUp, Search, Lock, Unlock, CheckCircle, XCircle, MoreVertical, DollarSign, Filter, ExternalLink, Gavel, ArrowRight } from 'lucide-react';
import { POPULAR_GAMES } from '../services/mockData';

interface AdminDashboardViewProps {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  listings: Listing[];
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onNavigate: (view: string, data?: any) => void;
}

const REVENUE_DATA = [
    { name: 'Пн', income: 15000 },
    { name: 'Вт', income: 23000 },
    { name: 'Ср', income: 18000 },
    { name: 'Чт', income: 27500 },
    { name: 'Пт', income: 32000 },
    { name: 'Сб', income: 45000 },
    { name: 'Вс', income: 38000 },
];

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ 
    users, setUsers, listings, setListings, orders, setOrders, onNavigate 
}) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'listings' | 'disputes'>('overview');
    const [searchTerm, setSearchTerm] = useState('');

    // --- ACTIONS ---

    const handleBanUser = (userId: string) => {
        const user = users.find(u => u.id === userId);
        const action = user?.status === 'banned' ? 'разблокировать' : 'заблокировать';
        if(confirm(`Вы уверены, что хотите ${action} пользователя?`)) {
            setUsers(prev => prev.map(u => {
                if(u.id === userId) {
                    return { ...u, status: u.status === 'banned' ? 'active' : 'banned' };
                }
                return u;
            }));
        }
    };

    const handleDeleteListing = (listingId: string) => {
        if(confirm('Удалить этот лот безвозвратно?')) {
            setListings(prev => prev.filter(l => l.id !== listingId));
        }
    };

    const handleResolveDispute = (orderId: string, resolution: 'refund_buyer' | 'release_seller') => {
        const action = resolution === 'refund_buyer' ? 'Вернуть деньги покупателю' : 'Перевести деньги продавцу';
        if(confirm(`${action}? Это действие закроет спор.`)) {
            setOrders(prev => prev.map(o => {
                if (o.id === orderId) {
                    return { 
                        ...o, 
                        status: resolution === 'refund_buyer' ? 'cancelled' : 'completed' 
                    };
                }
                return o;
            }));
            alert('Спор успешно разрешен.');
        }
    };

    // --- RENDERERS ---

    const renderOverview = () => {
        const totalRevenue = 198500; // Mock total
        const disputesCount = orders.filter(o => o.status === 'disputed').length;
        
        return (
            <div className="space-y-6 animate-fade-in">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Общая выручка</p>
                                <h3 className="text-2xl font-black text-white mt-1">{totalRevenue.toLocaleString()} ₽</h3>
                            </div>
                            <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                                <DollarSign className="w-6 h-6 text-indigo-400" />
                            </div>
                        </div>
                        <div className="flex items-center text-xs text-green-400">
                             <TrendingUp className="w-3 h-3 mr-1" /> +12.5% к прошлой неделе
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Пользователи</p>
                                <h3 className="text-2xl font-black text-white mt-1">{users.length}</h3>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <Users className="w-6 h-6 text-blue-400" />
                            </div>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-blue-500 h-full w-[70%]"></div>
                        </div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Активные лоты</p>
                                <h3 className="text-2xl font-black text-white mt-1">{listings.length}</h3>
                            </div>
                            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <Package className="w-6 h-6 text-emerald-400" />
                            </div>
                        </div>
                        <div className="text-xs text-slate-500">В {POPULAR_GAMES.length} категориях игр</div>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl border border-slate-700/50 bg-slate-900/50">
                         <div className="flex justify-between items-start mb-4">
                            <div>
                                <p className="text-slate-400 text-sm font-medium">Открытые споры</p>
                                <h3 className="text-2xl font-black text-white mt-1">{disputesCount}</h3>
                            </div>
                            <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>
                        </div>
                        {disputesCount > 0 ? (
                             <button onClick={() => setActiveTab('disputes')} className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center">
                                Перейти к решению <ArrowRight className="w-3 h-3 ml-1" />
                             </button>
                        ) : (
                             <div className="text-xs text-green-400 flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Все спокойно</div>
                        )}
                    </div>
                </div>

                {/* Main Chart */}
                <div className="glass-panel p-6 rounded-2xl border border-slate-700/50">
                     <h3 className="text-lg font-bold text-white mb-6">Динамика доходов (Комиссия)</h3>
                     <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={REVENUE_DATA}>
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                                />
                                <Bar dataKey="income" radius={[4, 4, 0, 0]}>
                                    {REVENUE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 5 ? '#6366f1' : '#334155'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </div>
            </div>
        );
    };

    const renderUsers = () => {
        const filteredUsers = users.filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()) || u.email?.toLowerCase().includes(searchTerm.toLowerCase()));

        return (
            <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                        <input 
                           type="text" 
                           placeholder="Поиск по нику или email..."
                           className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="flex items-center px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-sm hover:text-white">
                        <Filter className="w-4 h-4 mr-2" /> Фильтр
                    </button>
                </div>

                <div className="glass-panel rounded-xl overflow-hidden border border-slate-700">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900/80 text-xs uppercase text-slate-500 font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Пользователь</th>
                                <th className="px-6 py-4">Роль</th>
                                <th className="px-6 py-4">Статус</th>
                                <th className="px-6 py-4">Рейтинг</th>
                                <th className="px-6 py-4">Продажи</th>
                                <th className="px-6 py-4 text-right">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={user.avatar} className="w-8 h-8 rounded-full" alt="" />
                                            <div>
                                                <div className="text-white font-medium text-sm">{user.username}</div>
                                                <div className="text-xs text-slate-500">{user.email || 'no-email'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${user.role === 'seller' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-700/50 text-slate-400'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center text-xs font-medium ${user.status === 'banned' ? 'text-red-400' : 'text-green-400'}`}>
                                            {user.status === 'banned' ? <Lock className="w-3 h-3 mr-1" /> : <CheckCircle className="w-3 h-3 mr-1" />}
                                            {user.status === 'banned' ? 'Бан' : 'Активен'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-yellow-500 font-bold">{user.stats.rating}</td>
                                    <td className="px-6 py-4 text-sm text-white font-mono">{user.stats.totalSales}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => onNavigate('profile', user)}
                                                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700" 
                                                title="Профиль"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => handleBanUser(user.id)}
                                                className={`p-1.5 rounded transition-colors ${user.status === 'banned' ? 'text-green-400 hover:bg-green-900/20' : 'text-red-400 hover:bg-red-900/20'}`}
                                                title={user.status === 'banned' ? "Разбанить" : "Забанить"}
                                            >
                                                {user.status === 'banned' ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderListings = () => {
        const filteredListings = listings.filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()));

        return (
             <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                        <input 
                           type="text" 
                           placeholder="Поиск лотов..."
                           className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="glass-panel rounded-xl overflow-hidden border border-slate-700">
                    <table className="w-full text-left">
                        <thead className="bg-slate-900/80 text-xs uppercase text-slate-500 font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Название</th>
                                <th className="px-6 py-4">Игра</th>
                                <th className="px-6 py-4">Продавец</th>
                                <th className="px-6 py-4">Цена</th>
                                <th className="px-6 py-4 text-right">Действия</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredListings.map(item => (
                                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                           <div className="w-8 h-8 rounded bg-slate-800 overflow-hidden flex-shrink-0">
                                              {item.screenshots?.[0] ? <img src={item.screenshots[0]} className="w-full h-full object-cover"/> : <Package className="p-1.5 w-full h-full text-slate-500"/>}
                                           </div>
                                           <div className="text-white font-medium text-sm line-clamp-1">{item.title}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {POPULAR_GAMES.find(g => g.id === item.gameId)?.name || item.gameId}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-300">
                                        {item.seller.username}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-white font-bold">
                                        {item.price} {item.currency}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => handleDeleteListing(item.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-red-900/20 transition-colors"
                                            title="Удалить лот"
                                        >
                                            <XCircle className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderDisputes = () => {
        const disputes = orders.filter(o => o.status === 'disputed');

        if(disputes.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500 glass-panel rounded-2xl border border-slate-700">
                    <CheckCircle className="w-12 h-12 mb-4 text-green-500/50" />
                    <h3 className="text-lg font-bold text-white">Активных споров нет</h3>
                    <p>Все сделки проходят гладко.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4 animate-fade-in">
                {disputes.map(dispute => (
                    <div key={dispute.id} className="glass-panel p-6 rounded-2xl border border-red-500/30 shadow-lg shadow-red-900/10 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-red-900/20 rounded-xl flex items-center justify-center border border-red-500/20 text-red-500">
                                <Gavel className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                   <h3 className="text-lg font-bold text-white">Спор #{dispute.id.split('-')[1]}</h3>
                                   <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white uppercase">Dispute</span>
                                </div>
                                <p className="text-sm text-slate-400 mb-2">Заказ: <span className="text-white font-medium">{dispute.title}</span></p>
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span>Покупатель: <b className="text-slate-300">{dispute.buyerName || 'Unknown'}</b></span>
                                    <span>Продавец: <b className="text-slate-300">{dispute.sellerName}</b></span>
                                    <span>Сумма: <b className="text-white">{dispute.price} {dispute.currency}</b></span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 w-full lg:w-auto">
                            <button 
                                onClick={() => handleResolveDispute(dispute.id, 'refund_buyer')}
                                className="flex-1 lg:flex-none px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-lg transition-colors"
                            >
                                Вернуть покупателю
                            </button>
                            <button 
                                onClick={() => handleResolveDispute(dispute.id, 'release_seller')}
                                className="flex-1 lg:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-indigo-900/20 transition-colors"
                            >
                                Отдать продавцу
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-950 flex font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-black text-white flex items-center gap-2">
                        <ShieldAlert className="w-6 h-6 text-indigo-500" />
                        ADMIN
                    </h2>
                    <p className="text-xs text-slate-500 ml-8">Control Panel</p>
                </div>
                
                <nav className="flex-1 px-4 space-y-2">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <TrendingUp className="w-5 h-5 mr-3" /> Обзор
                    </button>
                    <button 
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <Users className="w-5 h-5 mr-3" /> Пользователи
                    </button>
                    <button 
                        onClick={() => setActiveTab('listings')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === 'listings' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <Package className="w-5 h-5 mr-3" /> Объявления
                    </button>
                    <button 
                        onClick={() => setActiveTab('disputes')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-colors font-medium text-sm ${activeTab === 'disputes' ? 'bg-red-600 text-white shadow-lg shadow-red-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <AlertTriangle className="w-5 h-5 mr-3" /> Споры
                        {orders.filter(o => o.status === 'disputed').length > 0 && (
                            <span className="ml-auto bg-white text-red-600 text-xs font-bold px-1.5 rounded-full">
                                {orders.filter(o => o.status === 'disputed').length}
                            </span>
                        )}
                    </button>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button onClick={() => onNavigate('home')} className="w-full py-2 border border-slate-700 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-sm transition-colors">
                        Выйти из панели
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-20">
                    <h1 className="text-xl font-bold text-white capitalize">{
                        activeTab === 'overview' ? 'Обзор системы' :
                        activeTab === 'users' ? 'Управление пользователями' :
                        activeTab === 'listings' ? 'Управление объявлениями' :
                        'Разрешение споров'
                    }</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center text-sm text-slate-400">
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> System Stable
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                    {activeTab === 'overview' && renderOverview()}
                    {activeTab === 'users' && renderUsers()}
                    {activeTab === 'listings' && renderListings()}
                    {activeTab === 'disputes' && renderDisputes()}
                </main>
            </div>
        </div>
    );
};
