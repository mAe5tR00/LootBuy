

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
      {
        key: 'hero',
        label: 'Герой',
        type: 'select',
        options: ['Pudge', 'Invoker', 'Anti-Mage', 'Juggernaut', 'Phantom Assassin', 'Any'],
        validTypes: ['item', 'account']
      },
      {
        key: 'rarity',
        label: 'Редкость',
        type: 'select',
        options: ['Common', 'Rare', 'Mythical', 'Legendary', 'Immortal', 'Arcana'],
        validTypes: ['item']
      },
      {
        key: 'mmr',
        label: 'MMR Аккаунта',
        type: 'number',
        min: 0,
        max: 15000,
        placeholder: 'Напр. 4500',
        validTypes: ['account', 'boosting']
      }
    ]
  },

  // Genshin Impact
  'g5': {
    filters: [
      {
        key: 'server',
        label: 'Сервер',
        type: 'select',
        options: ['Europe', 'Asia', 'America', 'TW/HK/MO']
      },
      {
        key: 'ar_level',
        label: 'Ранг Приключений (AR)',
        type: 'number',
        min: 1,
        max: 60,
        validTypes: ['account']
      },
      {
        key: 'platform',
        label: 'Привязка (Платформа)',
        type: 'select',
        options: ['Только Email', 'PSN', 'Google', 'Apple', 'Чистый'],
        validTypes: ['account']
      },
      {
        key: 'five_stars',
        label: 'Кол-во 5★ персонажей',
        type: 'number',
        min: 0,
        max: 100,
        validTypes: ['account']
      }
    ]
  },
  
  // Default Config for other games
  'default': {
    filters: [
      {
        key: 'category',
        label: 'Категория',
        type: 'select',
        options: ['Валюта', 'Аккаунт', 'Предмет', 'Услуга/Буст']
      },
      {
        key: 'platform',
        label: 'Платформа',
        type: 'select',
        options: ['PC', 'PlayStation', 'Xbox', 'Mobile', 'Switch']
      }
    ]
  }
};