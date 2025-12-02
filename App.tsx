

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
import { CURRENT_USER } from './services/mockData';
import { ViewState, AuthState, User, Listing } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [authState, setAuthState] = useState<AuthState>('guest');
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<User>(CURRENT_USER);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [chatPartnerId, setChatPartnerId] = useState<string | undefined>(undefined);

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
  };

  const handleAddToCart = (id: string) => {
    setCartCount(prev => prev + 1);
    // In a real app, toast notification here
    console.log(`Added ${id} to cart`);
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
    if (view === 'chat') {
       // If extra data is passed (like partnerId), store it
       if (data && data.partnerId) {
         setChatPartnerId(data.partnerId);
       } else {
         setChatPartnerId(undefined);
       }
    }
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} onAddToCart={handleAddToCart} authState={authState} />;
      case 'marketplace':
        return <MarketplaceView onAddToCart={handleAddToCart} onNavigate={handleNavigate} />;
      case 'profile':
        if (authState === 'guest') return <AuthView onLogin={handleLogin} />;
        return <ProfileView user={getActiveUser()} onNavigate={handleNavigate} />;
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
        if (!selectedListing) return <MarketplaceView onAddToCart={handleAddToCart} />;
        return (
          <ListingDetailView 
            listing={selectedListing} 
            onBack={() => {
              // If came from dashboard, go back there, else marketplace
              if (authState === 'seller' && selectedListing.seller.id === user.id) {
                setCurrentView('seller-dashboard');
              } else {
                setCurrentView('marketplace');
              }
            }}
            onAddToCart={handleAddToCart}
            onNavigate={handleNavigate}
          />
        );
      case 'chat':
        if (authState === 'guest') return <AuthView onLogin={handleLogin} />;
        return <ChatView currentUser={getActiveUser()} onNavigate={handleNavigate} initialPartnerId={chatPartnerId} />;
      default:
        return <HomeView onNavigate={handleNavigate} onAddToCart={handleAddToCart} authState={authState} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-brand-500/30 selection:text-brand-200">
      {/* 
        This is a Frontend Demo simulating the Next.js/Nest.js stack requested.
        In a real Next.js app, routing would be handled by the 'app' directory.
      */}
      {currentView !== 'auth' && currentView !== 'seller-onboarding' && (
        <Navbar 
          user={getActiveUser()} 
          onNavigate={handleNavigate} 
          cartCount={cartCount}
          authState={authState}
          onLoginClick={() => setCurrentView('auth')}
        />
      )}
      
      <main className="animate-fade-in">
        {renderView()}
      </main>

      {/* Footer (Simplified) - Hide on chat view for full height feel */}
      {currentView !== 'auth' && currentView !== 'seller-onboarding' && currentView !== 'chat' && (
        <footer className="border-t border-slate-800 bg-slate-950 py-12">
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
    </div>
  );
};

export default App;