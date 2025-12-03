
import { GameConfig } from '../types';

// Keys correspond to Game IDs from mockData.ts
export const GAME_CONFIGS: Record<string, GameConfig> = {
  // World of Warcraft
  'g1': {
    filters: [
      { 
        key: 'region', 
        label: 'Регион', 
        type: 'select', 
        options: ['Европа (EU)', 'Америка (US)', 'Россия (RU)'] 
      },
      { 
        key: 'server', 
        label: 'Сервер / Реалм', 
        type: 'select', 
        options: ['Gordunni', 'Kazzak', 'Draenor', 'Silvermoon', 'Soulflayer', 'Howling Fjord'] 
      },
      { 
        key: 'faction', 
        label: 'Фракция', 
        type: 'select', 
        options: ['Альянс', 'Орда', 'Любая'] 
      },
      {
        key: 'delivery_method',
        label: 'Метод доставки',
        type: 'select',
        options: ['Аукцион', 'Почта', 'Личный трейд'],
        validTypes: ['currency']
      },
      { 
        key: 'class', 
        label: 'Класс', 
        type: 'select', 
        options: ['Воин', 'Паладин', 'Охотник', 'Разбойник', 'Жрец', 'Шаман', 'Маг', 'Чернокнижник', 'Монах', 'Друид', 'Охотник на демонов', 'Драктир'],
        validTypes: ['account', 'boosting'] // Only show for accounts and boosts
      },
      { 
        key: 'level', 
        label: 'Уровень', 
        type: 'number', 
        min: 1, 
        max: 80,
        validTypes: ['account', 'boosting']
      },
      {
        key: 'item_lvl',
        label: 'Item Level',
        type: 'number',
        min: 0,
        max: 600,
        validTypes: ['account', 'item']
      }
    ]
  },
  
  // Counter-Strike 2
  'g2': {
    filters: [
      {
        key: 'type',
        label: 'Тип предмета',
        type: 'select',
        options: ['Нож', 'Перчатки', 'Винтовка', 'Пистолет', 'Агент', 'Кейс/Ключ'],
        validTypes: ['item', 'skin'] // Added 'skin' to show in Skins tab
      },
      {
        key: 'quality',
        label: 'Качество (Exterior)',
        type: 'select',
        options: ['Прямо с завода (FN)', 'Немного поношенное (MW)', 'После полевых (FT)', 'Поношенное (WW)', 'Закаленное в боях (BS)'],
        validTypes: ['item', 'skin'] // Added 'skin'
      },
      {
        key: 'stat_trak',
        label: 'StatTrak™',
        type: 'checkbox',
        validTypes: ['item', 'skin'] // Added 'skin'
      },
      {
        key: 'float',
        label: 'Float Value',
        type: 'text',
        placeholder: '0.00xxx',
        validTypes: ['item', 'skin'] // Added 'skin'
      },
      {
        key: 'rank',
        label: 'Звание',
        type: 'select',
        options: ['Silver', 'Gold Nova', 'Master Guardian', 'LEM', 'Global Elite', 'Unranked'],
        validTypes: ['account']
      },
      {
        key: 'primeStatus',
        label: 'Prime статус',
        type: 'checkbox',
        validTypes: ['account', 'prime']
      },
      {
        key: 'hours',
        label: 'Часов в игре',
        type: 'number',
        min: 0,
        validTypes: ['account', 'prime']
      },
      {
        key: 'medal_count',
        label: 'Кол-во медалей',
        type: 'number',
        min: 0,
        validTypes: ['account', 'prime']
      }
    ]
  },

  // Dota 2
  'g3': {
    filters: [
      // --- ACCOUNT FILTERS ---
      {
        key: 'mmr',
        label: 'MMR',
        type: 'range',
        min: 0,
        max: 15000,
        validTypes: ['account']
      },
      {
        key: 'behavior_score',
        label: 'Порядочность',
        type: 'range',
        min: 1,
        max: 12000,
        validTypes: ['account']
      },
      
      // --- ITEM FILTERS ---
      {
        key: 'item_type',
        label: 'Тип предмета',
        type: 'select',
        options: [
          'Arcana', 'Immortal', 'Legendary', 'Set', 'Weapon', 'Armor', 
          'Taunt', 'Courier', 'Ward', 'Announcer', 'Music Pack', 'Treasure', 'Persona', 'Terrain'
        ],
        validTypes: ['item']
      },
      {
        key: 'hero',
        label: 'Герой',
        type: 'select',
        options: [
           'Abaddon', 'Alchemist', 'Ancient Apparition', 'Anti-Mage', 'Arc Warden', 'Axe',
           'Bane', 'Batrider', 'Beastmaster', 'Bloodseeker', 'Bounty Hunter', 'Brewmaster', 'Bristleback', 'Broodmother',
           'Centaur Warrunner', 'Chaos Knight', 'Chen', 'Clinkz', 'Clockwerk', 'Crystal Maiden',
           'Dark Seer', 'Dark Willow', 'Dawnbreaker', 'Dazzle', 'Death Prophet', 'Disruptor', 'Doom', 'Dragon Knight', 'Drow Ranger',
           'Earth Spirit', 'Earthshaker', 'Elder Titan', 'Ember Spirit', 'Enchantress', 'Enigma',
           'Faceless Void', 'Grimstroke', 'Gyrocopter', 'Hoodwink', 'Huskar', 'Invoker', 'Io',
           'Jakiro', 'Juggernaut', 'Keeper of the Light', 'Kunkka', 'Legion Commander', 'Leshrac', 'Lich', 'Lifestealer', 'Lina', 'Lion', 'Lone Druid', 'Luna', 'Lycan',
           'Magnus', 'Marci', 'Mars', 'Medusa', 'Meepo', 'Mirana', 'Monkey King', 'Morphling', 'Muerta',
           'Naga Siren', 'Nature\'s Prophet', 'Necrophos', 'Night Stalker', 'Nyx Assassin',
           'Ogre Magi', 'Omniknight', 'Oracle', 'Outworld Destroyer',
           'Pangolier', 'Phantom Assassin', 'Phantom Lancer', 'Phoenix', 'Primal Beast', 'Puck', 'Pudge', 'Pugna',
           'Queen of Pain',
           'Razor', 'Riki', 'Rubick',
           'Sand King', 'Shadow Demon', 'Shadow Fiend', 'Shadow Shaman', 'Silencer', 'Skywrath Mage', 'Slardar', 'Slark', 'Snapfire', 'Sniper', 'Spectre', 'Spirit Breaker', 'Storm Spirit', 'Sven',
           'Techies', 'Templar Assassin', 'Terrorblade', 'Tidehunter', 'Timbersaw', 'Tinker', 'Tiny', 'Treant Protector', 'Troll Warlord', 'Tusk',
           'Underlord', 'Undying', 'Ursa',
           'Vengeful Spirit', 'Venomancer', 'Viper', 'Visage', 'Void Spirit',
           'Warlock', 'Weaver', 'Windranger', 'Winter Wyvern', 'Witch Doctor', 'Wraith King',
           'Zeus'
        ],
        validTypes: ['item'] // Removed 'account'
      },
      {
        key: 'rarity',
        label: 'Раритетность',
        type: 'select',
        options: ['Common', 'Uncommon', 'Rare', 'Mythical', 'Legendary', 'Immortal', 'Arcana', 'Ancient'],
        validTypes: ['item']
      },
      {
        key: 'quality',
        label: 'Качество',
        type: 'select',
        options: ['Standard', 'Inscribed', 'Exalted', 'Corrupted', 'Autographed', 'Heroic', 'Cursed', 'Frozen', 'Genuine'],
        validTypes: ['item']
      },
      {
        key: 'delivery_method',
        label: 'Способ получения',
        type: 'select',
        options: ['Мгновенно (Trade)', 'Подарком (30 дней)'],
        validTypes: ['item']
      }
    ]
  },

  // Default Fallback
  'default': {
    filters: [
       { key: 'server', label: 'Сервер', type: 'text', placeholder: 'Название сервера' }
    ]
  }
};
