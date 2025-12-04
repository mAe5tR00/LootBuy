

export interface User {
  id: string;
  username: string;
  avatar: string;
  banner?: string; // New field for profile banner
  level: number;
  xp: number;
  nextLevelXp: number;
  joinedAt?: string; // Registration date
  badges: Badge[];
  role: 'buyer' | 'seller' | 'admin';
  status?: 'active' | 'banned'; // Added for admin control
  email?: string; // Added for admin view
  balance?: number; // Added for admin view
  stats: {
    totalSales: number;
    rating: number; // 0-5
    responseTime: string;
    completedOrders: number;
  };
  // Seller specific settings
  boostingSettings?: Record<string, string[]>; // GameID -> Array of Category IDs enabled for notifications
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
  type: 'currency' | 'account' | 'boosting' | 'item' | 'donation' | 'points';
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

// --- Boosting Job Board Types ---

export interface BoostingRequest {
  id: string;
  gameId: string;
  buyer: User;
  category: string; // 'leveling', 'raid', 'ilvl', 'pvp', 'other'
  status: 'open' | 'closed' | 'in_progress';
  createdAt: string;
  
  // Specific requirements
  details: {
    region?: string;
    server?: string;
    faction?: string;
    class?: string;
    mode?: string[]; // ['pilot', 'selfplay']
    
    // Leveling
    currentLevel?: number;
    targetLevel?: number;
    
    // Raid
    raidName?: string;
    difficulty?: string;
    
    // Item Level
    currentIlvl?: number;
    targetIlvl?: number;
    
    comment?: string;
    [key: string]: any;
  };
  
  bids: Bid[];
}

export interface Bid {
  id: string;
  requestId: string;
  seller: User;
  price: number;
  currency: string;
  timeEstimate: string; // e.g. "2 hours"
  comment?: string;
  timestamp: string;
}

export interface CartItem extends Listing {
  cartId: string; // Unique ID for cart entry
}

export type NotificationType = 'system' | 'order' | 'message' | 'promo' | 'success' | 'boosting_request';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string;
  read: boolean;
  data?: any; // For deep linking (e.g. requestId)
}

// --- Chat Types ---

export type MessageType = 'text' | 'order' | 'system' | 'warning' | 'image' | 'admin';

export type OrderStatus = 'paid' | 'delivery_confirmed' | 'completed' | 'disputed' | 'cancelled';

export interface Order {
    id: string;
    title: string;
    price: number;
    currency: string; // 'RUB' | 'USD'
    date: string;
    status: OrderStatus;
    sellerName: string; // For display
    buyerName?: string; // Added for Admin
    sellerId?: string; // Added for Admin
    buyerId?: string; // Added for Admin
    image: string;
}

export interface Message {
  id: string;
  senderId: string;
  type: MessageType;
  text?: string;
  image?: string; // URL for screenshot
  timestamp: string; // ISO string
  isRead: boolean;
  
  // For order injection
  orderDetails?: {
    id: string;
    title: string;
    price: number;
    currency: string;
    image?: string;
    status: OrderStatus;
    amount?: number; // Quantity purchased
    meta?: Record<string, string>; // Extra details like Server, Region, Faction
  };
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

export type ViewState = 'home' | 'marketplace' | 'profile' | 'profile-settings' | 'create-listing' | 'auth' | 'seller-onboarding' | 'seller-dashboard' | 'listing-detail' | 'chat' | 'cart' | 'notifications' | 'boosting-request-detail' | 'admin-dashboard';
export type AuthState = 'guest' | 'buyer' | 'seller' | 'admin';