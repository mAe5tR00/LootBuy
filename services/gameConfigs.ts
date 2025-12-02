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
        validTypes: ['item']
      },
      {
        key: 'quality',
        label: 'Качество (Exterior)',
        type: 'select',
        options: ['Прямо с завода (FN)', 'Немного поношенное (MW)', 'После полевых (FT)', 'Поношенное (WW)', 'Закаленное в боях (BS)'],
        validTypes: ['item']
      },
      {
        key: 'stat_trak',
        label: 'StatTrak™',
        type: 'checkbox',
        validTypes: ['item']
      },
      {
        key: 'float',
        label: 'Float Value',
        type: 'text',
        placeholder: '0.00xxx',
        validTypes: ['item']
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