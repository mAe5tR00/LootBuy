
export interface BoostingCategoryConfig {
  id: string;
  label: string;
  fields: BoostingFieldConfig[];
}

export interface BoostingFieldConfig {
  key: string;
  label: string;
  type: 'select' | 'text' | 'number' | 'checkbox-group' | 'textarea';
  options?: string[];
  placeholder?: string;
}

// Default categories (WoW, generic)
const DEFAULT_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'leveling',
    label: 'Повышение уровня',
    fields: [
      {
        key: 'mode',
        label: 'Режим',
        type: 'checkbox-group',
        options: ['С передачей аккаунта (Pilot)', 'Без передачи (Selfplay)']
      },
      { key: 'region', label: 'Регион', type: 'select', options: ['Европа (EU)', 'Америка (US)', 'Россия (RU)'] },
      { key: 'server', label: 'Сервер', type: 'select', options: ['Gordunni', 'Kazzak', 'Draenor', 'Silvermoon', 'Howling Fjord', 'Any'] },
      { key: 'faction', label: 'Фракция', type: 'select', options: ['Альянс', 'Орда'] },
      { key: 'class', label: 'Класс', type: 'select', options: ['Воин', 'Паладин', 'Охотник', 'Разбойник', 'Жрец', 'Шаман', 'Маг', 'Чернокнижник', 'Монах', 'Друид', 'Охотник на демонов', 'Драктир'] },
      { key: 'currentLevel', label: 'Текущий уровень', type: 'number', placeholder: '1' },
      { key: 'targetLevel', label: 'Требуемый уровень', type: 'number', placeholder: '80' },
      { key: 'comment', label: 'Комментарий к заказу', type: 'textarea', placeholder: 'Например: сроки, особые пожелания...' }
    ]
  },
  {
    id: 'raid',
    label: 'Рейды',
    fields: [
      {
        key: 'mode',
        label: 'Режим',
        type: 'checkbox-group',
        options: ['С передачей аккаунта (Pilot)', 'Без передачи (Selfplay)']
      },
      { key: 'region', label: 'Регион', type: 'select', options: ['Европа (EU)', 'Америка (US)', 'Россия (RU)'] },
      { key: 'server', label: 'Сервер', type: 'select', options: ['Gordunni', 'Kazzak', 'Draenor', 'Silvermoon', 'Howling Fjord', 'Any'] },
      { key: 'raidName', label: 'Название рейда', type: 'select', options: ['Amirdrassil', 'Aberrus', 'Vault of the Incarnates', 'Nerub-ar Palace'] },
      { key: 'difficulty', label: 'Сложность', type: 'select', options: ['Normal', 'Heroic', 'Mythic'] },
      { key: 'faction', label: 'Фракция', type: 'select', options: ['Альянс', 'Орда'] },
      { key: 'class', label: 'Класс', type: 'select', options: ['Воин', 'Паладин', 'Охотник', 'Разбойник', 'Жрец', 'Шаман', 'Маг', 'Чернокнижник', 'Монах', 'Друид', 'Охотник на демонов', 'Драктир'] },
      { key: 'comment', label: 'Комментарий к заказу', type: 'textarea', placeholder: 'Например: нужен фулл лут...' }
    ]
  },
  {
    id: 'ilvl',
    label: 'Уровень предметов (iLvl)',
    fields: [
      {
        key: 'mode',
        label: 'Режим',
        type: 'checkbox-group',
        options: ['С передачей аккаунта (Pilot)', 'Без передачи (Selfplay)']
      },
      { key: 'region', label: 'Регион', type: 'select', options: ['Европа (EU)', 'Америка (US)', 'Россия (RU)'] },
      { key: 'server', label: 'Сервер', type: 'select', options: ['Gordunni', 'Kazzak', 'Draenor', 'Silvermoon', 'Howling Fjord', 'Any'] },
      { key: 'faction', label: 'Фракция', type: 'select', options: ['Альянс', 'Орда'] },
      { key: 'class', label: 'Класс', type: 'select', options: ['Воин', 'Паладин', 'Охотник', 'Разбойник', 'Жрец', 'Шаман', 'Маг', 'Чернокнижник', 'Монах', 'Друид', 'Охотник на демонов', 'Драктир'] },
      { key: 'currentIlvl', label: 'Текущий iLvl', type: 'number', placeholder: '400' },
      { key: 'targetIlvl', label: 'Требуемый iLvl', type: 'number', placeholder: '500' },
      { key: 'comment', label: 'Комментарий к заказу', type: 'textarea', placeholder: 'Дополнительные пожелания...' }
    ]
  },
  {
    id: 'pvp',
    label: 'ПВП (PVP)',
    fields: [
      {
        key: 'mode',
        label: 'Режим',
        type: 'checkbox-group',
        options: ['С передачей аккаунта (Pilot)', 'Без передачи (Selfplay)']
      },
      { key: 'region', label: 'Регион', type: 'select', options: ['Европа (EU)', 'Америка (US)', 'Россия (RU)'] },
      { key: 'type', label: 'Тип', type: 'select', options: ['Арена 2v2', 'Арена 3v3', 'RBG', 'Honor Farm'] },
      { key: 'currentRating', label: 'Текущий рейтинг', type: 'number', placeholder: '0' },
      { key: 'targetRating', label: 'Требуемый рейтинг', type: 'number', placeholder: '1800' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Другой запрос',
    fields: [
      { key: 'region', label: 'Регион', type: 'select', options: ['Европа (EU)', 'Америка (US)', 'Россия (RU)'] },
      { key: 'server', label: 'Сервер', type: 'text', placeholder: 'Название сервера' },
      { key: 'comment', label: 'Опишите, что вам нужно', type: 'textarea', placeholder: 'Подробное описание задачи...' }
    ]
  }
];

// CS2 Specific Categories
const CS2_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'premier',
    label: 'Premier',
    fields: [
      {
        key: 'mode',
        label: 'Режим',
        type: 'checkbox-group',
        options: ['Лобби (Selfplay)', 'Передача (Pilot)']
      },
      { key: 'currentRating', label: 'Текущий ELO', type: 'number', placeholder: '4000' },
      { key: 'targetRating', label: 'Желаемый ELO', type: 'number', placeholder: '10000' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'armory',
    label: 'Armory Pass',
    fields: [
      { key: 'stars', label: 'Количество звезд', type: 'number', placeholder: '10' },
      {
         key: 'method',
         label: 'Метод',
         type: 'select',
         options: ['AFK Farm', 'XP Farm', 'Missions']
      },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'competitive',
    label: '𝗖𝗼𝗺𝗽𝗲𝘁𝗶𝘁𝗶𝘃𝗲',
    fields: [
      {
        key: 'mode',
        label: 'Режим',
        type: 'checkbox-group',
        options: ['Лобби (Selfplay)', 'Передача (Pilot)']
      },
      { 
         key: 'currentRank', 
         label: 'Текущее звание', 
         type: 'select',
         options: ['Silver', 'Gold Nova', 'Master Guardian', 'LEM', 'Global Elite']
      },
      { 
         key: 'targetRank', 
         label: 'Желаемое звание', 
         type: 'select',
         options: ['Silver', 'Gold Nova', 'Master Guardian', 'LEM', 'Global Elite']
      },
      { key: 'map', label: 'Карта (опционально)', type: 'select', options: ['Любая', 'Mirage', 'Inferno', 'Dust 2', 'Nuke'] }
    ]
  },
  {
    id: 'faceit',
    label: 'FACEIT',
    fields: [
      { key: 'currentLevel', label: 'Текущий Lvl', type: 'number', placeholder: '3' },
      { key: 'targetLevel', label: 'Желаемый Lvl', type: 'number', placeholder: '10' },
      { key: 'currentElo', label: 'Текущий ELO', type: 'number', placeholder: '1000' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'wingman',
    label: 'Напарники',
    fields: [
      { key: 'currentRank', label: 'Текущее звание', type: 'text', placeholder: 'Silver 1' },
      { key: 'targetRank', label: 'Желаемое звание', type: 'text', placeholder: 'Global Elite' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'calibration',
    label: 'Калибровка',
    fields: [
      { key: 'mode', label: 'Режим', type: 'select', options: ['Premier', 'Competitive', 'Wingman'] },
      { key: 'games', label: 'Количество игр', type: 'number', placeholder: '10' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea', placeholder: 'Часы, медали и другое...' }
    ]
  }
];

// Dota 2 Specific Categories
const DOTA2_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'mmr',
    label: 'MMR Буст',
    fields: [
      { key: 'currentMmr', label: 'Текущий MMR', type: 'number', placeholder: '2000' },
      { key: 'targetMmr', label: 'Желаемый MMR', type: 'number', placeholder: '4000' },
      { key: 'role', label: 'Роль', type: 'select', options: ['Любая', 'Carry (1)', 'Mid (2)', 'Offlane (3)', 'Support (4)', 'Hard Support (5)'] },
      { key: 'server', label: 'Сервер', type: 'select', options: ['Европа (West)', 'Европа (East)', 'Россия', 'США'] },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Solo', 'Party (Duo)'] }
    ]
  },
  {
    id: 'calibration',
    label: 'Калибровка',
    fields: [
       { key: 'games', label: 'Количество игр', type: 'number', placeholder: '10' },
       { key: 'previousRank', label: 'Прошлый ранг', type: 'select', options: ['Unranked', 'Herald', 'Guardian', 'Crusader', 'Archon', 'Legend', 'Ancient', 'Divine', 'Immortal'] },
       { key: 'role', label: 'Роль', type: 'select', options: ['Любая', 'Core', 'Support'] }
    ]
  },
  {
    id: 'low_priority',
    label: 'Low Priority (ЛП)',
    fields: [
       { key: 'games', label: 'Количество игр (побед)', type: 'number', placeholder: '1' },
       { key: 'server', label: 'Сервер', type: 'select', options: ['Европа', 'Россия', 'США'] }
    ]
  },
   {
    id: 'behavior',
    label: 'Порядочность',
    fields: [
       { key: 'currentScore', label: 'Текущая порядочность', type: 'number', placeholder: '5000' },
       { key: 'targetScore', label: 'Желаемая порядочность', type: 'number', placeholder: '10000' }
    ]
  },
  {
    id: 'coaching',
    label: 'Тренировка',
    fields: [
       { key: 'hours', label: 'Количество часов', type: 'number', placeholder: '1' },
       { key: 'role', label: 'Роль/Герой', type: 'text', placeholder: 'Invoker Mid' },
       { key: 'comment', label: 'Цель тренировки', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
       { key: 'comment', label: 'Описание задачи', type: 'textarea', placeholder: 'Battle Cup, квесты и т.д.' }
    ]
  }
];

// Helper to get categories by game
export const getBoostingCategories = (gameId: string): BoostingCategoryConfig[] => {
  if (gameId === 'g2') { // CS2
    return CS2_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g3') { // Dota 2
    return DOTA2_BOOSTING_CATEGORIES;
  }
  return DEFAULT_BOOSTING_CATEGORIES;
};

// Kept for backward compatibility if needed, but usage should migrate to function above
export const BOOSTING_CATEGORIES = DEFAULT_BOOSTING_CATEGORIES;
