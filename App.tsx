import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { MarketplaceView } from './views/MarketplaceView';
import { ProfileView } from './views/ProfileView';
import { AuthView } from './views/AuthView';
import { SellerOnboardingView } from './views/SellerOnboardingView';
import { SellerDashboardView } from './views/SellerDashboardView';
import { ProfileSettingsView } from './views/ProfileSettingsView';
import { ListingDetailView } from './views/ListingDetailView';
import { ChatView } from './views/ChatView';
import { NotificationsView } from './views/NotificationsView';
import { BoostingRequestDetailView } from './views/BoostingRequestDetailView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { PaymentModal } from './components/PaymentModal';
import { CURRENT_USER, RECENT_LISTINGS, MOCK_NOTIFICATIONS, MOCK_CHATS, MOCK_USERS, MOCK_ORDERS } from './services/mockData';
import { ViewState, AuthState, User, Listing, Notification, ChatSession, Message, BoostingRequest, Game, Order } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [authState, setAuthState] = useState<AuthState>('guest');
  
  // State for notifications
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Global Chat State
  const [chats, setChats] = useState<ChatSession[]>(MOCK_CHATS);

  // Global Data State (Lifted for Admin Control)
  const [allUsers, setAllUsers] = useState<User[]>(MOCK_USERS);
  const [listings, setListings] = useState<Listing[]>(RECENT_LISTINGS);
  const [allOrders, setAllOrders] = useState<Order[]>(MOCK_ORDERS);

  // Current logged in user is derived from allUsers or mock
  const [user, setUser] = useState<User>(CURRENT_USER);
  
  const [selectedProfileUser, setSelectedProfileUser] = useState<User | null>(null); // Track which user profile to show
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedBoostingRequest, setSelectedBoostingRequest] = useState<BoostingRequest | null>(null);
  const [chatPartnerId, setChatPartnerId] = useState<string | undefined>(undefined);
  
  // Market State
  const [selectedMarketGame, setSelectedMarketGame] = useState<Game | null>(null);

  // Payment Modal State
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [listingToBuy, setListingToBuy] = useState<Listing | null>(null);

  // Update user object based on auth state and any profile changes
  const getActiveUser = () => {
    return {
      ...user,
      role: authState === 'guest' ? 'buyer' : authState
    };
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
    setCurrentView('profile');
    setSelectedProfileUser(null); // Go to own profile
  };

  const handleAuthProtectedAction = (callback: () => void) => {
     if (authState === 'guest') {
        setCurrentView('auth');
     } else {
        callback();
     }
  };

  // --- BUY FLOW ---

  const handleBuyClick = (listing: Listing) => {
     handleAuthProtectedAction(() => {
        setListingToBuy(listing);
        setIsPaymentModalOpen(true);
     });
  };

  const handlePaymentConfirm = (listing: Listing, method: string, deliveryInfo?: string) => {
     setIsPaymentModalOpen(false);
     
     const orderId = `ord-${Date.now()}-${Math.floor(Math.random()*1000)}`;
     const sellerId = listing.seller.id;
     const activeUser = getActiveUser();

     // Create new Order object for Admin Panel
     const newOrder: Order = {
        id: orderId,
        title: listing.title,
        price: listing.price,
        currency: listing.currency,
        date: new Date().toISOString().split('T')[0],
        status: 'paid',
        sellerName: listing.seller.username,
        sellerId: sellerId,
        buyerId: activeUser.id,
        buyerName: activeUser.username,
        image: listing.screenshots?.[0] || ''
     };
     setAllOrders(prev => [newOrder, ...prev]);

     // Find existing chat with seller or create new
     let targetChat = chats.find(c => c.partner.id === sellerId);
     let chatId = targetChat?.id;

     if (!targetChat) {
        chatId = `c-new-${Date.now()}-${sellerId}`;
        targetChat = {
           id: chatId,
           partner: listing.seller,
           lastMessage: 'Новый заказ',
           lastMessageTime: new Date().toISOString(),
           unreadCount: 0,
           messages: []
        };
        setChats(prev => [targetChat!, ...prev]);
     }

     // 1. ADMIN MESSAGE
     const adminMessage: Message = {
       id: `msg-admin-${Date.now()}`,
       senderId: 'admin',
       type: 'admin',
       text: `Заказ #${orderId.split('-')[1]} оплачен через ${method === 'card' ? 'Карту' : method}. Продавец, приступайте к выполнению. Покупатель, ожидайте передачи товара.`,
       timestamp: new Date().toISOString(),
       isRead: false
     };

     // Prepare meta details for the order message
     const orderMeta: Record<string, string> = {};
     if (listing.details?.server) orderMeta['Сервер'] = listing.details.server;
     if (listing.details?.region) orderMeta['Регион'] = listing.details.region;
     if (listing.details?.faction) orderMeta['Фракция'] = listing.details.faction;
     
     // Inject Nickname or Trade URL if provided
     if (deliveryInfo) {
        if (listing.gameId === 'g2' && listing.type === 'item') {
           orderMeta['Trade URL'] = deliveryInfo;
        } else {
           orderMeta['Никнейм'] = deliveryInfo;
        }
     }

     // 2. ORDER TICKET MESSAGE
     const orderMessage: Message = {
       id: `msg-ord-${Date.now()}`,
       senderId: activeUser.id,
       type: 'order',
       timestamp: new Date(Date.now() + 100).toISOString(), // slightly after
       isRead: false,
       orderDetails: {
         id: orderId,
         title: listing.title,
         price: listing.price,
         currency: listing.currency,
         image: listing.screenshots?.[0],
         status: 'paid',
         amount: listing.type === 'currency' ? listing.stock : undefined, // In buy flow, stock is overwritten with bought amount
         meta: orderMeta
       }
     };

     // Inject into chat
     setChats(prev => prev.map(c => {
       if (c.id === chatId) {
          return {
             ...c,
             messages: [...c.messages, adminMessage, orderMessage],
             lastMessage: `Заказ #${orderId.split('-')[1]}`,
             lastMessageTime: new Date().toISOString()
          }
       }
       return c;
     }));

     // Redirect to chat
     setChatPartnerId(sellerId);
     setCurrentView('chat');
  };

  // --- END BUY FLOW ---

  const handleSendMessage = (chatId: string, newMessage: Message) => {
    setChats(prev => prev.map(chat => {
       if (chat.id === chatId) {
          return {
             ...chat,
             messages: [...chat.messages, newMessage],
             lastMessage: newMessage.type === 'text' ? (newMessage.text || '') : (newMessage.type === 'order' ? 'Новый заказ' : 'Сообщение'),
             lastMessageTime: new Date().toISOString()
          }
       }
       return chat;
    }));
  };

  const handleMarkNotificationRead = (id: string) => {
     setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleLogin = (role: 'buyer' | 'seller') => {
    setAuthState(role);
    setCurrentView('home');
  };

  const handleBecomeSeller = () => {
    setAuthState('seller');
    setCurrentView('seller-dashboard');
  };
  
  const handleNavigate = (view: ViewState, data?: any) => {
    if (view === 'listing-detail' && data) {
      setSelectedListing(data);
    }
    if (view === 'boosting-request-detail' && data) {
       setSelectedBoostingRequest(data);
    }
    if (view === 'profile') {
       if (data) {
         setSelectedProfileUser(data);
       } else {
         setSelectedProfileUser(null); // My profile
       }
    }
    if (view === 'chat') {
       // Check Auth for chat
       if (authState === 'guest') {
          setCurrentView('auth');
          return;
       }
       // If extra data is passed (like partnerId), store it
       if (data && data.partnerId) {
         setChatPartnerId(data.partnerId);
       } else {
         setChatPartnerId(undefined);
       }
    }
    if (view === 'notifications') {
       if (authState === 'guest') {
          setCurrentView('auth');
          return;
       }
    }
    if (view === 'marketplace') {
       if (data) {
          setSelectedMarketGame(data);
       } else {
          setSelectedMarketGame(null);
       }
    }

    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} onBuy={handleBuyClick} authState={authState} />;
      case 'marketplace':
        return <MarketplaceView 
          onBuy={handleBuyClick} 
          onNavigate={handleNavigate} 
          currentUser={getActiveUser()}
          initialGame={selectedMarketGame}
          listings={listings} // Pass dynamic listings
          onCreateListing={(item) => setListings([item, ...listings])}
        />;
      case 'profile':
        const profileUser = selectedProfileUser || getActiveUser();
        // If viewing own profile but not logged in -> Auth
        if (authState === 'guest' && !selectedProfileUser) return <AuthView onLogin={handleLogin} />;
        
        const isOwn = profileUser.id === getActiveUser().id;
        return <ProfileView user={profileUser} onNavigate={handleNavigate} isOwnProfile={isOwn} />;
      case 'profile-settings':
        if (authState === 'guest') return <AuthView onLogin={handleLogin} />;
        return <ProfileSettingsView user={getActiveUser()} onSave={handleUpdateUser} onCancel={() => setCurrentView('profile')} />;
      case 'seller-dashboard':
        if (authState !== 'seller') return <AuthView onLogin={handleLogin} />;
        return <SellerDashboardView onNavigate={handleNavigate} />;
      case 'auth':
        return <AuthView onLogin={handleLogin} />;
      case 'seller-onboarding':
        return <SellerOnboardingView onConfirm={handleBecomeSeller} onCancel={() => setCurrentView('home')} />;
      case 'listing-detail':
        if (!selectedListing) return <MarketplaceView onBuy={handleBuyClick} currentUser={getActiveUser()} listings={listings} />;
        return (
          <ListingDetailView 
            listing={selectedListing} 
            currentUser={getActiveUser()}
            onBack={() => {
              // If came from dashboard, go back there, else marketplace
              if (authState === 'seller' && selectedListing.seller.id === user.id) {
                setCurrentView('seller-dashboard');
              } else {
                setCurrentView('marketplace');
              }
            }}
            onBuy={handleBuyClick}
            onNavigate={handleNavigate}
            onActionAuthCheck={handleAuthProtectedAction}
          />
        );
      case 'boosting-request-detail':
         if (!selectedBoostingRequest) return <MarketplaceView onBuy={handleBuyClick} currentUser={getActiveUser()} listings={listings} />;
         return (
            <BoostingRequestDetailView 
               request={selectedBoostingRequest}
               currentUser={getActiveUser()}
               onNavigate={handleNavigate}
               onBack={() => {
                  if (authState === 'seller') setCurrentView('seller-dashboard');
                  else setCurrentView('marketplace');
               }}
            />
         );
      case 'chat':
        if (authState === 'guest') return <AuthView onLogin={handleLogin} />;
        return (
          <ChatView 
             currentUser={getActiveUser()} 
             onNavigate={handleNavigate} 
             initialPartnerId={chatPartnerId} 
             chats={chats}
             onSendMessage={handleSendMessage}
             setChats={setChats} 
          />
        );
      case 'cart':
          // Cart is removed, redirect to marketplace or home
         return <MarketplaceView onBuy={handleBuyClick} onNavigate={handleNavigate} currentUser={getActiveUser()} listings={listings} />;
      case 'notifications':
        if (authState === 'guest') return <AuthView onLogin={handleLogin} />;
        return <NotificationsView notifications={notifications} onMarkRead={handleMarkNotificationRead} />;
      
      case 'admin-dashboard':
          return <AdminDashboardView 
            users={allUsers}
            setUsers={setAllUsers}
            listings={listings}
            setListings={setListings}
            orders={allOrders}
            setOrders={setAllOrders}
            onNavigate={handleNavigate}
          />;

      default:
        return <HomeView onNavigate={handleNavigate} onBuy={handleBuyClick} authState={authState} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-brand-500/30 selection:text-brand-200">
      {/* Hide Navbar only for Auth, Onboarding, and Admin Dashboard (Admin has own sidebar) */}
      {currentView !== 'auth' && currentView !== 'seller-onboarding' && currentView !== 'admin-dashboard' && (
        <Navbar 
          user={getActiveUser()} 
          onNavigate={handleNavigate} 
          authState={authState}
          onLoginClick={() => setCurrentView('auth')}
        />
      )}
      
      <main className="animate-fade-in">
        {renderView()}
      </main>

      {/* Footer (Hide on Admin/Auth/Chat) */}
      {currentView !== 'auth' && currentView !== 'seller-onboarding' && currentView !== 'chat' && currentView !== 'admin-dashboard' && (
        <footer className="border-t border-slate-800 bg-slate-900 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 mb-4">
              © 2024 LootBuy. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-slate-600">
              <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-400 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      )}

      {/* Payment Modal */}
      <PaymentModal 
         isOpen={isPaymentModalOpen}
         onClose={() => setIsPaymentModalOpen(false)}
         onConfirm={handlePaymentConfirm}
         listing={listingToBuy}
      />
    </div>
  );
};

export default App;