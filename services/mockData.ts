import { Game, Listing, User, Badge } from '../types';

export const MOCK_BADGES: Badge[] = [
  { id: '1', name: 'Спидраннер', icon: 'Zap', color: 'text-yellow-400', description: 'Доставка менее чем за 15 мин' },
  { id: '2', name: 'Кит', icon: 'Crown', color: 'text-purple-400', description: 'Топ 1% по продажам' },
  { id: '3', name: 'Проверен', icon: 'ShieldCheck', color: 'text-green-400', description: 'Паспорт подтвержден' },
];

export const CURRENT_USER: User = {
  id: 'u1',
  username: 'KratosTrader_99',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  level: 42,
  xp: 8400,
  nextLevelXp: 10000,
  role: 'seller',
  badges: MOCK_BADGES,
  stats: {
    totalSales: 15420,
    rating: 4.9,
    responseTime: '< 5 мин',
    completedOrders: 342,
  }
};

export const MOCK_BUYER_STATS = {
  totalSpent: 45000,
  ordersCount: 12,
  activeDisputes: 0,
  loyaltyLevel: 'Gold'
};

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
  {
    id: 'l1',
    title: '1M Золота - Dragonflight [EU] - Kazzak',
    gameId: 'g1',
    price: 850.00,
    currency: 'RUB',
    seller: CURRENT_USER,
    type: 'currency',
    stock: 500,
    deliveryTime: '5 мин',
    tags: ['Ручной фарм', 'Без бана'],
    description: 'Чистое золото, передача через аукцион или трейд. Гарантия безопасности.'
  },
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
    description: 'Моментальная передача через Steam Trade URL. Флоат 0.01.'
  },
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
    tags: ['Смена почты', 'Родная почта'],
    description: 'Полный доступ, смена данных на ваши. Много донатных скинов.'
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
    description: 'Помогу пройти бездну или настроить отряд.'
  }
];