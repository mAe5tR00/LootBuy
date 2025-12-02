import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { MarketplaceView } from './views/MarketplaceView';
import { ProfileView } from './views/ProfileView';
import { AuthView } from './views/AuthView';
import { SellerOnboardingView } from './views/SellerOnboardingView';
import { SellerDashboardView } from './views/SellerDashboardView';
import { CURRENT_USER } from './services/mockData';
import { ViewState, AuthState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [authState, setAuthState] = useState<AuthState>('guest');
  const [cartCount, setCartCount] = useState(0);

  // Update mock user based on role for demo purposes
  const getActiveUser = () => {
    return {
      ...CURRENT_USER,
      role: authState === 'guest' ? 'buyer' : authState // Simplified handling
    };
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

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={setCurrentView} onAddToCart={handleAddToCart} authState={authState} />;
      case 'marketplace':
        return <MarketplaceView onAddToCart={handleAddToCart} />;
      case 'profile':
        if (authState === 'guest') return <AuthView onLogin={handleLogin} />;
        return <ProfileView user={getActiveUser()} />;
      case 'seller-dashboard':
        if (authState !== 'seller') return <AuthView onLogin={handleLogin} />;
        return <SellerDashboardView />;
      case 'auth':
        return <AuthView onLogin={handleLogin} />;
      case 'seller-onboarding':
        return <SellerOnboardingView onConfirm={handleBecomeSeller} onCancel={() => setCurrentView('home')} />;
      default:
        return <HomeView onNavigate={setCurrentView} onAddToCart={handleAddToCart} authState={authState} />;
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
          onNavigate={setCurrentView} 
          cartCount={cartCount}
          authState={authState}
          onLoginClick={() => setCurrentView('auth')}
        />
      )}
      
      <main className="animate-fade-in">
        {renderView()}
      </main>

      {/* Footer (Simplified) */}
      {currentView !== 'auth' && currentView !== 'seller-onboarding' && (
        <footer className="border-t border-slate-800 bg-slate-950 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 mb-4">
              &copy; 2025 LootBuy. Создано на стеке (Next.js, Tailwind, NestJS, Postgres).
            </p>
            <div className="flex justify-center space-x-6 text-sm text-slate-600">
              <a href="#" className="hover:text-white">Правила</a>
              <a href="#" className="hover:text-white">Конфиденциальность</a>
              <a href="#" className="hover:text-white">Поддержка</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;