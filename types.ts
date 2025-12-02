export interface User {
  id: string;
  username: string;
  avatar: string;
  banner?: string; // New field for profile banner
  level: number;
  xp: number;
  nextLevelXp: number;
  badges: Badge[];
  role: 'buyer' | 'seller' | 'admin';
  stats: {
    totalSales: number;
    rating: number; // 0-5
    responseTime: string;
    completedOrders: number;
  };
}

export interface Badge {
  id: string;
  name: string;
  icon: string; // Lucide icon name
  color: string;
  description: string;
}

export interface Game {
  id: string;
  name: string;
  image: string;
  logo?: string; // New field for game logo
  category: string;
}

export interface Listing {
  id: string;
  title: string;
  gameId: string;
  price: number;
  currency: string;
  seller: User;
  type: 'currency' | 'account' | 'boosting' | 'item';
  stock: number;
  deliveryTime: string; // e.g. "15 mins"
  tags: string[];
  description?: string;
  active?: boolean; // New field for seller dashboard
}

export type ViewState = 'home' | 'marketplace' | 'profile' | 'profile-settings' | 'create-listing' | 'auth' | 'seller-onboarding' | 'seller-dashboard';
export type AuthState = 'guest' | 'buyer' | 'seller';