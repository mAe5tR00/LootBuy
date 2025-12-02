

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
  warranty?: string; // New field for account warranty (e.g. "3 дня")
  tags: string[];
  description?: string;
  active?: boolean; // New field for seller dashboard
  
  // Dynamic fields storage
  details?: Record<string, any>; 
  screenshots?: string[];
}

// --- Chat Types ---

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string; // ISO string
  isRead: boolean;
}

export interface ChatSession {
  id: string;
  partner: User; // The user you are chatting with
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

// --- Dynamic Forms Configuration Types ---

export type FilterType = 'select' | 'text' | 'number' | 'range' | 'checkbox';

export interface FilterConfig {
  key: string;
  label: string;
  type: FilterType;
  options?: string[]; // For 'select'
  min?: number;       // For 'range' or 'number'
  max?: number;       // For 'range' or 'number'
  placeholder?: string;
  validTypes?: string[]; // Array of listing types (e.g. ['account', 'boosting']) where this filter is visible
}

export interface GameConfig {
  filters: FilterConfig[];
}

export type ViewState = 'home' | 'marketplace' | 'profile' | 'profile-settings' | 'create-listing' | 'auth' | 'seller-onboarding' | 'seller-dashboard' | 'listing-detail' | 'chat';
export type AuthState = 'guest' | 'buyer' | 'seller';