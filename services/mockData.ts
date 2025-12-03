

import { Game, Listing, User, Badge, ChatSession, Notification, BoostingRequest, Bid } from '../types';

export const MOCK_BADGES: Badge[] = [
  { id: '1', name: 'Спидраннер', icon: 'Zap', color: 'text-yellow-400', description: 'Доставка менее чем за 15 мин' },
  { id: '2', name: 'Кит', icon: 'Crown', color: 'text-purple-400', description: 'Топ 1% по продажам' },
  { id: '3', name: 'Проверен', icon: 'ShieldCheck', color: 'text-green-400', description: 'Паспорт подтвержден' },
];

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'KratosTrader_99',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  banner: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
  level: 42,
  xp: 8400,
  nextLevelXp: 10000,
  joinedAt: '2023-09-15T10:00:00Z',
  role: 'seller',
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
    logo: 'https://ui-avatars.com/api/?name=EfT&background=78716c&color=fff&size=128&bold=true'
  },
];

export const MOCK_ORDERS = [
  {
    id: 'ord-123',
    title: '100,000 Золота - WoW Circle',
    price: 1200,
    date: '2023-10-25',
    status: 'completed',
    sellerName: 'ElfMerchant',
    image: POPULAR_GAMES[0].image
  },
  {
    id: 'ord-124',
    title: 'Буст Рейтинга CS2 (Premier)',
    price: 3500,
    date: '2023-10-24',
    status: 'processing',
    sellerName: 'GlobalBooster',
    image: POPULAR_GAMES[1].image
  },
  {
    id: 'ord-125',
    title: 'Аккаунт Genshin (5* Райдэн)',
    price: 1500,
    date: '2023-10-20',
    status: 'completed',
    sellerName: 'GachaGod',
    image: POPULAR_GAMES[4].image
  }
];

export const RECENT_LISTINGS: Listing[] = [
  // --- WoW Gordunni Currency Listings ---
  {
    id: 'l1',
    title: 'Золото Gordunni [RU]',
    gameId: 'g1',
    price: 0.85, // Price per unit
    currency: 'RUB',
    seller: { ...CURRENT_USER, stats: { ...CURRENT_USER.stats, rating: 5.0, totalSales: 1500 } },
    type: 'currency',
    stock: 5000000,
    deliveryTime: '5 мин',
    tags: ['Ручной фарм'],
    description: 'Чистое золото, передача через аукцион или трейд. Гарантия безопасности.',
    details: {
      region: 'Россия (RU)',
      server: 'Gordunni',
      faction: 'Альянс',
      delivery_method: 'Личный трейд',
      minOrder: 1000
    }
  },
  {
    id: 'l1-2',
    title: 'Gold Gordunni Fast',
    gameId: 'g1',
    price: 0.90,
    currency: 'RUB',
    seller: { ...CURRENT_USER, id: 'u10', username: 'FastGold_RU', stats: { ...CURRENT_USER.stats, rating: 4.8 } },
    type: 'currency',
    stock: 1200000,
    deliveryTime: '10 мин',
    tags: [],
    details: {
      region: 'Россия (RU)',
      server: 'Gordunni',
      faction: 'Альянс',
      delivery_method: 'Аукцион',
      minOrder: 500
    }
  },
  {
    id: 'l1-3',
    title: 'Gordunni Bulk Sale',
    gameId: 'g1',
    price: 0.82,
    currency: 'RUB',
    seller: { ...CURRENT_USER, id: 'u11', username: 'WhaleTrader', stats: { ...CURRENT_USER.stats, rating: 4.5 } },
    type: 'currency',
    stock: 10000000,
    deliveryTime: '1 час',
    tags: [],
    details: {
      region: 'Россия (RU)',
      server: 'Gordunni',
      faction: 'Альянс',
      delivery_method: 'Почта',
      minOrder: 50000
    }
  },

  // --- WoW Kazzak Currency Listings ---
  {
    id: 'l1-4',
    title: 'Kazzak EU Gold',
    gameId: 'g1',
    price: 0.45,
    currency: 'RUB',
    seller: { ...CURRENT_USER, id: 'u12', username: 'EuFarmer', stats: { ...CURRENT_USER.stats, rating: 4.9 } },
    type: 'currency',
    stock: 3000000,
    deliveryTime: 'Instant',
    tags: [],
    details: {
      region: 'Европа (EU)',
      server: 'Kazzak',
      faction: 'Орда',
      delivery_method: 'Личный трейд',
      minOrder: 10000
    }
  },

  // --- CS2 Listings (Items/Skins) ---
  {
    id: 'l2',
    title: 'Нож-бабочка | Градиент (Прямо с завода)',
    gameId: 'g2',
    price: 125000.00,
    currency: 'RUB',
    seller: { ...CURRENT_USER, username: 'SkinTraderPro', level: 85, badges: [MOCK_BADGES[1], MOCK_BADGES[2]] },
    type: 'item',
    stock: 1,
    deliveryTime: 'Моментально',
    tags: ['Редкое', 'Трейд'],
    description: 'Моментальная передача через Steam Trade URL. Флоат 0.01.',
    details: {
      type: 'Нож',
      quality: 'Прямо с завода (FN)',
      float: '0.0123'
    }
  },
  // --- CS2 Listing (Case) ---
  {
    id: 'l2-case',
    title: 'Кейс «Разлом» (Fracture Case)',
    gameId: 'g2',
    price: 65.00,
    currency: 'RUB',
    seller: { ...CURRENT_USER, username: 'CaseOpener', level: 10 },
    type: 'item',
    stock: 100,
    deliveryTime: '5 мин',
    tags: ['Кейс'],
    description: 'Передача трейдом.',
    details: {
      type: 'Case', // Special details type to identify Cases
    }
  },
  // --- CS2 Listing (Prime Account) ---
  {
    id: 'l2-prime',
    title: 'Аккаунт CS2 Prime + Медали',
    gameId: 'g2',
    price: 1500.00,
    currency: 'RUB',
    seller: { ...CURRENT_USER, username: 'SmurfSeller', level: 30 },
    type: 'account',
    stock: 1,
    deliveryTime: 'Моментально',
    warranty: '14 дней',
    tags: ['Prime', 'Родная почта'],
    description: 'Прайм статус, 500 часов, медаль за службу 2023. Родная почта в комплекте.',
    details: {
      primeStatus: true,
      rank: 'Gold Nova 3',
      hours: 500
    }
  },

  // --- Other Listings ---
  {
    id: 'l3',
    title: 'Divine Orb x100 - Path of Exile [Standard]',
    gameId: 'g6',
    price: 1500.00,
    currency: 'RUB',
    seller: { ...CURRENT_USER, username: 'ExileFarmer', level: 20 },
    type: 'currency',
    stock: 50,
    deliveryTime: '15 мин',
    tags: ['Личная встреча', 'Бонус'],
    description: 'Встреча в убежище. Положите любой редкий предмет в трейд для безопасности.'
  },
  {
    id: 'l4',
    title: 'Аккаунт Valorant - Ascendant 2 - Скины Vandal',
    gameId: 'g7',
    price: 4500.00,
    currency: 'RUB',
    seller: { ...CURRENT_USER, username: 'ValoSmurf', level: 12 },
    type: 'account',
    stock: 1,
    deliveryTime: 'Моментально',
    warranty: '7 дней', // Mock warranty
    tags: ['Смена почты', 'Родная почта'],
    description: 'Полный доступ, смена данных на ваши. Много донатных скинов.',
    details: {
      platform: 'PC',
      rank: 'Ascendant 2'
    }
  },
  {
    id: 'l5',
    title: 'Фарм Серебра 100М - Black Desert',
    gameId: 'g4', // Using Diablo image as placeholder logic for generic ARPG if needed
    price: 300.00,
    currency: 'RUB',
    seller: CURRENT_USER,
    type: 'boosting',
    stock: 100,
    deliveryTime: '2 часа',
    tags: ['Пилот', 'Стрим'],
    description: 'Драйвер сядет на ваш аккаунт и нафармит серебро. Стрим через Discord.'
  },
  {
    id: 'l6',
    title: 'Проходка в Бездну 12 этаж - Genshin Impact',
    gameId: 'g5',
    price: 400.00,
    currency: 'RUB',
    seller: { ...CURRENT_USER, username: 'PaimonShop', level: 55 },
    type: 'boosting',
    stock: 10,
    deliveryTime: '1 день',
    tags: ['Без передачи', 'Советы'],
    description: 'Помогу пройти бездну или настроить отряд.',
    details: {
      server: 'Europe',
      ar_level: 55
    }
  }
];

export const MOCK_CHATS: ChatSession[] = [
  {
    id: 'c1',
    partner: { ...CURRENT_USER, username: 'SkinTraderPro', avatar: 'https://ui-avatars.com/api/?name=SkinTraderPro&background=0D8ABC&color=fff', id: 'u2' },
    lastMessage: 'Привет, нож еще в наличии?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unreadCount: 1,
    messages: [
       { id: 'm1', senderId: 'u1', type: 'text', text: 'Здравствуйте, интересует Нож-бабочка', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), isRead: true },
       { id: 'm2', senderId: 'u2', type: 'text', text: 'Привет, да, в наличии. Могу передать через 5 минут', timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(), isRead: true },
       { id: 'm3', senderId: 'u2', type: 'text', text: 'Привет, нож еще в наличии?', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), isRead: false },
    ]
  },
  {
    id: 'c2',
    partner: { ...CURRENT_USER, username: 'GachaGod', avatar: 'https://ui-avatars.com/api/?name=GachaGod&background=8b5cf6&color=fff', id: 'u3' },
    lastMessage: 'Спасибо за покупку!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    unreadCount: 0,
    messages: [
       { id: 'm1', senderId: 'u1', type: 'text', text: 'Все прошло отлично, спасибо', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), isRead: true },
       { id: 'm2', senderId: 'u3', type: 'text', text: 'Спасибо за покупку!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), isRead: true },
    ]
  }
];

// --- MOCK BOOSTING REQUESTS ---

export const MOCK_BOOSTING_REQUESTS: BoostingRequest[] = [
  {
    id: 'req-1',
    gameId: 'g1', // WoW
    buyer: { ...CURRENT_USER, id: 'u5', username: 'NoobPlayer', avatar: 'https://ui-avatars.com/api/?name=NoobPlayer&background=random' },
    category: 'leveling',
    status: 'open',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    details: {
      mode: ['Без передачи (Selfplay)'],
      region: 'Европа (EU)',
      server: 'Gordunni',
      currentLevel: 10,
      targetLevel: 70,
      faction: 'Альянс',
      class: 'Паладин',
      comment: 'Нужно максимально быстро, готов переплатить за скорость.'
    },
    bids: [
       {
         id: 'bid-1',
         requestId: 'req-1',
         seller: { ...CURRENT_USER, id: 'u6', username: 'FastBooster', stats: { ...CURRENT_USER.stats, rating: 5.0, totalSales: 500 } },
         price: 2500,
         currency: 'RUB',
         timeEstimate: '12 часов',
         timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString()
       },
       {
         id: 'bid-2',
         requestId: 'req-1',
         seller: { ...CURRENT_USER, id: 'u7', username: 'CasualGamer', stats: { ...CURRENT_USER.stats, rating: 4.5 } },
         price: 2000,
         currency: 'RUB',
         timeEstimate: '24 часа',
         timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString()
       }
    ]
  },
  {
    id: 'req-2',
    gameId: 'g1', // WoW
    buyer: CURRENT_USER, // Current User is the buyer
    category: 'raid',
    status: 'open',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    details: {
      mode: ['С передачей аккаунта (Pilot)'],
      region: 'Европа (EU)',
      server: 'Kazzak',
      raidName: 'Amirdrassil',
      difficulty: 'Heroic',
      faction: 'Орда',
      class: 'Чернокнижник',
      comment: 'Нужен маунт с ласта'
    },
    bids: []
  }
];
