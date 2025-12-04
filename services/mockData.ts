
import { Game, Listing, User, Badge, ChatSession, Notification, BoostingRequest, Bid, Order } from '../types';

export const MOCK_BADGES: Badge[] = [
  { id: '1', name: 'Спидраннер', icon: 'Zap', color: 'text-yellow-400', description: 'Доставка менее чем за 15 мин' },
  { id: '2', name: 'Кит', icon: 'Crown', color: 'text-purple-400', description: 'Топ 1% по продажам' },
  { id: '3', name: 'Проверен', icon: 'ShieldCheck', color: 'text-green-400', description: 'Паспорт подтвержден' },
];

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'KratosTrader_99',
  email: 'kratos@demo.com',
  balance: 15400,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
  level: 42,
  xp: 8400,
  nextLevelXp: 10000,
  joinedAt: '2023-09-15T10:00:00Z',
  role: 'seller',
  status: 'active',
  badges: MOCK_BADGES,
  stats: {
    totalSales: 15420,
    rating: 4.9,
    responseTime: '< 5 мин',
    completedOrders: 342,
  },
  boostingSettings: {
    'g1': ['leveling', 'raid'], // Enabled WoW notifications for leveling and raid
    'g3': ['ilvl']
  }
};

export const MOCK_USERS: User[] = [
    CURRENT_USER,
    {
        id: 'u2',
        username: 'SkinTraderPro',
        email: 'skins@valve.com',
        avatar: 'https://ui-avatars.com/api/?name=SkinTraderPro&background=0D8ABC&color=fff',
        level: 85,
        xp: 15000,
        nextLevelXp: 20000,
        role: 'seller',
        status: 'active',
        badges: [MOCK_BADGES[1], MOCK_BADGES[2]],
        stats: { totalSales: 50000, rating: 5.0, responseTime: '1 час', completedOrders: 890 }
    },
    {
        id: 'u3',
        username: 'GachaGod',
        email: 'paimon@teyvat.com',
        avatar: 'https://ui-avatars.com/api/?name=GachaGod&background=8b5cf6&color=fff',
        level: 12,
        xp: 1200,
        nextLevelXp: 5000,
        role: 'buyer',
        status: 'active',
        badges: [],
        stats: { totalSales: 0, rating: 0, responseTime: '-', completedOrders: 0 }
    },
    {
        id: 'u4',
        username: 'Scammer1337',
        email: 'bad@actor.com',
        avatar: 'https://ui-avatars.com/api/?name=S&background=red&color=fff',
        level: 1,
        xp: 0,
        nextLevelXp: 1000,
        role: 'seller',
        status: 'banned',
        badges: [],
        stats: { totalSales: 100, rating: 1.2, responseTime: '2 дня', completedOrders: 1 }
    }
];

export const MOCK_BUYER_STATS = {
  totalSpent: 45000,
  ordersCount: 12,
  activeDisputes: 0,
  loyaltyLevel: 'Gold'
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'system',
    title: 'Добро пожаловать в LootBuy!',
    message: 'Спасибо за регистрацию. Подтвердите ваш email для доступа ко всем функциям.',
    date: new Date().toISOString(),
    read: false
  },
  {
    id: 'n2',
    type: 'promo',
    title: 'Скидки на золото WoW',
    message: '-10% на все лоты в категории World of Warcraft только сегодня.',
    date: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: true
  },
  {
    id: 'n3',
    type: 'success',
    title: 'Заказ выполнен',
    message: 'Ваш заказ #12345 успешно завершен. Пожалуйста, оставьте отзыв продавцу.',
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    read: true
  }
];

// Using ui-avatars to simulate game logos/icons
export const POPULAR_GAMES: Game[] = [
  { 
    id: 'g1', 
    name: 'World of Warcraft', 
    category: 'MMORPG', 
    image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=W&background=f59e0b&color=000&size=128&bold=true&length=1'
  },
  { 
    id: 'g2', 
    name: 'Counter-Strike 2', 
    category: 'Shooter', 
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=CS&background=eab308&color=000&size=128&bold=true'
  },
  { 
    id: 'g3', 
    name: 'Dota 2', 
    category: 'MOBA', 
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=D2&background=ef4444&color=fff&size=128&bold=true'
  },
  { 
    id: 'g4', 
    name: 'Diablo IV', 
    category: 'ARPG', 
    image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=D4&background=b91c1c&color=fff&size=128&bold=true'
  },
  { 
    id: 'g5', 
    name: 'Genshin Impact', 
    category: 'Gacha / RPG', 
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=GI&background=a855f7&color=fff&size=128&bold=true'
  },
  { 
    id: 'g6', 
    name: 'Path of Exile', 
    category: 'ARPG', 
    image: 'https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=PoE&background=1e293b&color=fff&size=128&bold=true'
  },
  { 
    id: 'g9', 
    name: 'Path of Exile 2', 
    category: 'ARPG', 
    image: 'https://images.unsplash.com/photo-1614853316476-de00d14cb1fc?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=PoE2&background=000&color=fff&size=128&bold=true'
  },
  { 
    id: 'g7', 
    name: 'Valorant', 
    category: 'Shooter', 
    image: 'https://images.unsplash.com/photo-1624138784181-dc7f5b751b63?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=Val&background=ef4444&color=fff&size=128&bold=true'
  },
  { 
    id: 'g8', 
    name: 'Escape from Tarkov', 
    category: 'Shooter / RPG', 
    image: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=EFT&background=3f3f46&color=fff&size=128&bold=true'
  },
  { 
    id: 'g10', 
    name: 'Albion Online', 
    category: 'MMORPG', 
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', // Fallback/Placeholder
    logo: 'https://ui-avatars.com/api/?name=Albion&background=1e293b&color=fff&size=128&bold=true'
  },
  { 
    id: 'g11', 
    name: 'Mobile Legends', 
    category: 'MOBA', 
    image: 'https://images.unsplash.com/photo-1616428746056-b042971253a9?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=MLBB&background=2563eb&color=fff&size=128&bold=true'
  },
  { 
    id: 'g12', 
    name: 'PUBG', 
    category: 'Shooter / Battle Royale', 
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=PUBG&background=f59e0b&color=000&size=128&bold=true'
  },
  { 
    id: 'g13', 
    name: 'Apex Legends', 
    category: 'Shooter / Battle Royale', 
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=AL&background=ef4444&color=fff&size=128&bold=true'
  },
  { 
    id: 'g14', 
    name: 'ARC Raiders', 
    category: 'Extraction Shooter', 
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=600&q=80',
    logo: 'https://ui-avatars.com/api/?name=ARC&background=000&color=fff&size=128&bold=true'
  },
  {
    id: 'g15',
    name: 'Ashes of Creation',
    category: 'MMORPG',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', // Placeholder
    logo: 'https://ui-avatars.com/api/?name=AoC&background=000&color=fff&size=128&bold=true'
  }
];

// Helper to generate listings (Reduced for brevity, using FALLBACK_LISTINGS)
const generateMockListings = (): Listing[] => {
  return [
    {
      id: 'l1',
      title: '100k Gold - Gordunni [Horde]',
      gameId: 'g1',
      price: 1500,
      currency: 'RUB',
      seller: MOCK_USERS[1],
      type: 'currency',
      stock: 500000,
      deliveryTime: 'Instant',
      tags: ['Gold', 'Safe'],
      details: { server: 'Gordunni', faction: 'Horde', minOrder: 1000 }
    },
    {
      id: 'l2',
      title: 'AWP | Dragon Lore (Factory New)',
      gameId: 'g2',
      price: 850000,
      currency: 'RUB',
      seller: MOCK_USERS[0],
      type: 'item',
      stock: 1,
      deliveryTime: '15 мин',
      tags: ['Rare', 'Skin'],
      screenshots: ['https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=800&q=80'],
      details: { type: 'Rifle', quality: 'Factory New', float: '0.0123' }
    },
    {
       id: 'l3',
       title: 'Mythic+ 20 Key Boost',
       gameId: 'g1',
       price: 2500,
       currency: 'RUB',
       seller: MOCK_USERS[0],
       type: 'boosting',
       stock: 10,
       deliveryTime: '~40 мин',
       tags: ['Dungeon', 'Carry'],
       details: { dungeon: 'Any', keyLevel: 20 }
    },
    {
       id: 'l4',
       title: 'Divine Orb x100 - Settlers SC',
       gameId: 'g6',
       price: 800,
       currency: 'RUB',
       seller: MOCK_USERS[1],
       type: 'currency',
       stock: 5000,
       deliveryTime: '5 мин',
       tags: ['Currency', 'Fast'],
       details: { league: 'Settlers', minOrder: 10 }
    },
    {
       id: 'l5',
       title: 'Immortal Rank Account (Full Access)',
       gameId: 'g7',
       price: 4500,
       currency: 'RUB',
       seller: MOCK_USERS[0],
       type: 'account',
       stock: 1,
       deliveryTime: 'Instant',
       tags: ['High Rank', 'Skins'],
       details: { rank: 'Immortal 2', skins_count: 45, agents_count: 22 }
    }
  ];
};

export const RECENT_LISTINGS = generateMockListings();

export const MOCK_CHATS: ChatSession[] = [
   {
      id: 'c1',
      partner: MOCK_USERS[1],
      lastMessage: 'Привет, готов передать золото?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      unreadCount: 1,
      messages: [
         {
            id: 'm1',
            senderId: 'u2',
            type: 'text',
            text: 'Привет! Спасибо за заказ.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
            isRead: true
         },
         {
            id: 'm2',
            senderId: 'u1', // me
            type: 'text',
            text: 'Привет, я в игре. Ник Kratos99.',
            timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
            isRead: true
         },
         {
            id: 'm3',
            senderId: 'u2',
            type: 'text',
            text: 'Привет, готов передать золото?',
            timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
            isRead: false
         }
      ]
   },
   {
      id: 'c2',
      partner: MOCK_USERS[2],
      lastMessage: 'Скидка будет?',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      unreadCount: 0,
      messages: [
         {
            id: 'm4',
            senderId: 'u3',
            type: 'text',
            text: 'Привет, интересует аккаунт Genshin.',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
            isRead: true
         },
         {
            id: 'm5',
            senderId: 'u3',
            type: 'text',
            text: 'Скидка будет?',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
            isRead: true
         }
      ]
   }
];

export const MOCK_BOOSTING_REQUESTS: BoostingRequest[] = [
   {
      id: 'br1',
      gameId: 'g1', // WoW
      buyer: MOCK_USERS[2],
      category: 'raid',
      status: 'open',
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      details: {
         raidName: 'Amirdrassil',
         difficulty: 'Heroic',
         server: 'Gordunni',
         faction: 'Horde',
         class: 'Mage',
         comment: 'Нужен фулл ран с лутом, готов заплатить 3000р'
      },
      bids: [
         {
            id: 'b1',
            requestId: 'br1',
            seller: MOCK_USERS[1],
            price: 2800,
            currency: 'RUB',
            timeEstimate: '2 часа',
            comment: 'Соберем пати за 15 мин',
            timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString()
         }
      ]
   },
   {
      id: 'br2',
      gameId: 'g2', // CS2
      buyer: MOCK_USERS[2], // same buyer
      category: 'premier',
      status: 'open',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      details: {
         currentRating: 4500,
         targetRating: 10000,
         comment: 'Без читов, только легит игра'
      },
      bids: []
   },
   {
      id: 'br3',
      gameId: 'g5', // Genshin
      buyer: MOCK_USERS[2],
      category: 'exploration',
      status: 'open',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      details: {
         region: 'Sumeru',
         percentage: 100,
         oculi: ['Да'],
         comment: 'Нужна полная зачистка пустыни'
      },
      bids: []
   }
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'ord-123',
        title: '100k Gold - Gordunni',
        price: 1500,
        currency: 'RUB',
        date: '2023-10-25',
        status: 'completed',
        sellerName: 'SkinTraderPro',
        sellerId: 'u2',
        buyerId: 'u1',
        buyerName: 'KratosTrader_99',
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 'ord-124',
        title: 'Diablo IV Powerlevel 1-50',
        price: 3000,
        currency: 'RUB',
        date: '2023-10-26',
        status: 'completed',
        sellerName: 'KratosTrader_99',
        sellerId: 'u1',
        buyerId: 'u3',
        buyerName: 'GachaGod',
        image: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=200&q=80'
    },
    {
        id: 'ord-125',
        title: 'CS2 Premier Boost 10k',
        price: 5000,
        currency: 'RUB',
        date: '2023-10-28',
        status: 'disputed',
        sellerName: 'KratosTrader_99',
        sellerId: 'u1',
        buyerId: 'u2', // buying from me
        buyerName: 'SkinTraderPro',
        image: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&w=200&q=80'
    }
];
