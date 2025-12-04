
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

// Diablo IV Specific Categories
const D4_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'leveling',
    label: 'Прокачка',
    fields: [
        { key: 'mode', label: 'Режим', type: 'select', options: ['Season - Softcore', 'Season - Hardcore', 'Eternal - Softcore', 'Eternal - Hardcore'] },
        { key: 'currentLevel', label: 'Текущий уровень', type: 'number', placeholder: '1' },
        { key: 'targetLevel', label: 'Требуемый уровень', type: 'number', placeholder: '100' },
        { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
      id: 'uber_bosses',
      label: 'Убер Боссы',
      fields: [
          { key: 'bossName', label: 'Босс', type: 'select', options: ['Duriel', 'Andariel', 'Varshan', 'Grigoire', 'Beast in the Ice', 'Zir'] },
          { key: 'difficulty', label: 'Сложность', type: 'select', options: ['Normal', 'Tormented'] },
          { key: 'runs', label: 'Количество заходов', type: 'number', placeholder: '1' },
          { key: 'mats', label: 'Материалы', type: 'select', options: ['Мои материалы', 'Материалы драйвера'] },
          { key: 'comment', label: 'Комментарий', type: 'textarea' }
      ]
  },
  {
      id: 'pit',
      label: 'Яма (The Pit)',
      fields: [
          { key: 'tier', label: 'Уровень (Tier)', type: 'number', placeholder: '1' },
          { key: 'runs', label: 'Количество заходов', type: 'number', placeholder: '1' },
          { key: 'comment', label: 'Комментарий', type: 'textarea' }
      ]
  },
  {
      id: 'hordes',
      label: 'Адские орды',
      fields: [
          { key: 'tier', label: 'Тир компаса (1-8)', type: 'number', placeholder: '1' },
          { key: 'runs', label: 'Количество заходов', type: 'number', placeholder: '1' },
          { key: 'comment', label: 'Комментарий', type: 'textarea' }
      ]
  },
  {
      id: 'nmd',
      label: 'Кошмарные подземелья',
      fields: [
          { key: 'tier', label: 'Уровень печати', type: 'number', placeholder: '100' },
          { key: 'runs', label: 'Количество', type: 'number', placeholder: '1' },
          { key: 'glyph', label: 'Прокачка глифов', type: 'checkbox-group', options: ['Да'] },
          { key: 'comment', label: 'Комментарий', type: 'textarea' }
      ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Genshin Specific Categories
const GENSHIN_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'exploration',
    label: 'Исследование мира',
    fields: [
      { key: 'region', label: 'Регион', type: 'select', options: ['Mondstadt', 'Liyue', 'Inazuma', 'Sumeru', 'Fontaine', 'Natlan', 'Chenyu Vale'] },
      { key: 'percentage', label: 'Процент исследования', type: 'number', placeholder: '100' },
      { key: 'oculi', label: 'Сбор Окулов', type: 'checkbox-group', options: ['Да'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'farming',
    label: 'Фарм / Ресурсы',
    fields: [
       { key: 'resource', label: 'Ресурс', type: 'text', placeholder: 'Примогемы, Диковинки...' },
       { key: 'amount', label: 'Количество', type: 'number', placeholder: '1000' },
       { key: 'resin', label: 'Трата смолы', type: 'checkbox-group', options: ['Да', 'Нет (Без смолы)'] },
       { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'abyss',
    label: 'Витая Бездна',
    fields: [
       { key: 'floor', label: 'Этаж', type: 'select', options: ['9-12', '11-12', '12'] },
       { key: 'stars', label: 'Звезды', type: 'select', options: ['36 звезд (Full)', 'Любое кол-во', 'Прохождение'] },
       { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
     id: 'quests',
     label: 'Задания / Квесты',
     fields: [
        { key: 'questType', label: 'Тип задания', type: 'select', options: ['Архонты', 'Легенды', 'Мировые', 'Встречи'] },
        { key: 'questName', label: 'Название квеста', type: 'text' },
        { key: 'comment', label: 'Комментарий', type: 'textarea' }
     ]
  },
  {
     id: 'dailies',
     label: 'Ежедневная рутина',
     fields: [
        { key: 'days', label: 'Количество дней', type: 'number', placeholder: '7' },
        { key: 'activities', label: 'Активности', type: 'checkbox-group', options: ['Дейлики', 'Слив смолы', 'Боевой пропуск'] },
        { key: 'comment', label: 'Комментарий', type: 'textarea' }
     ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Path of Exile Specific Categories
const POE_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'leveling',
    label: 'Прокачка (Leveling)',
    fields: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Settlers', 'Settlers HC', 'Standard', 'Hardcore'] },
      { key: 'mode', label: 'Режим', type: 'select', options: ['Pilot (Передача)', 'Selfplay (В пати)'] },
      { key: 'currentLevel', label: 'Текущий уровень', type: 'number', placeholder: '1' },
      { key: 'targetLevel', label: 'Желаемый уровень', type: 'number', placeholder: '90' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'bosses',
    label: 'Боссы (Boss Carry)',
    fields: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Settlers', 'Settlers HC', 'Standard', 'Hardcore'] },
      { key: 'bossName', label: 'Босс', type: 'select', options: ['Maven', 'Sirus', 'Uber Elder', 'Eater of Worlds', 'Searing Exarch', 'Cortex', 'Shaper', 'All Uber Bosses'] },
      { key: 'runs', label: 'Количество заходов', type: 'number', placeholder: '1' },
      { key: 'loot', label: 'Лут', type: 'select', options: ['Мой (Клиента)', 'Твой (Драйвера)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'challenges',
    label: 'Испытания (Challenges)',
    fields: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Settlers', 'Settlers HC'] },
      { key: 'challenges_count', label: 'Количество (1-40)', type: 'number', placeholder: '12' },
      { key: 'comment', label: 'Какие испытания нужны', type: 'textarea' }
    ]
  },
  {
    id: 'lab',
    label: 'Лабиринт (Labyrinth)',
    fields: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Settlers', 'Settlers HC', 'Standard', 'Hardcore'] },
      { key: 'difficulty', label: 'Сложность', type: 'select', options: ['Eternal (Uber)', 'Gift to the Goddess', 'Merciless', 'Normal'] },
      { key: 'runs', label: 'Количество заходов', type: 'number', placeholder: '1' },
    ]
  },
  {
    id: 'divine',
    label: 'Фарм Валюты',
    fields: [
       { key: 'league', label: 'Лига', type: 'select', options: ['Settlers', 'Settlers HC', 'Standard'] },
       { key: 'amount', label: 'Количество часов', type: 'number', placeholder: '1' },
       { key: 'comment', label: 'Стратегия (если есть)', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Settlers', 'Settlers HC', 'Standard'] },
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Path of Exile 2 Specific Categories
const POE2_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'campaign',
    label: 'Сюжетная кампания (Acts 1-6)',
    fields: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Standard', 'Hardcore'] },
      { key: 'acts', label: 'Акты', type: 'select', options: ['Full Campaign (1-6)', 'Act 1', 'Act 2', 'Act 3', 'Act 4', 'Act 5', 'Act 6'] },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Pilot (Передача)', 'Selfplay (В пати)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'leveling',
    label: 'Прокачка (Leveling)',
    fields: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Standard', 'Hardcore'] },
      { key: 'currentLevel', label: 'Текущий уровень', type: 'number', placeholder: '1' },
      { key: 'targetLevel', label: 'Желаемый уровень', type: 'number', placeholder: '90' },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Pilot (Передача)', 'Selfplay (В пати)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'gold',
    label: 'Фарм Золота',
    fields: [
       { key: 'league', label: 'Лига', type: 'select', options: ['Standard', 'Hardcore'] },
       { key: 'amount', label: 'Количество золота', type: 'number', placeholder: '100000' },
       { key: 'mode', label: 'Режим', type: 'select', options: ['Pilot (Передача)'] },
       { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'bosses',
    label: 'Боссы',
    fields: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Standard', 'Hardcore'] },
      { key: 'bossName', label: 'Название босса', type: 'text', placeholder: 'Например: Citadel Boss' },
      { key: 'runs', label: 'Количество', type: 'number', placeholder: '1' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'atlas',
    label: 'Атлас / Карты',
    fields: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Standard', 'Hardcore'] },
      { key: 'progress', label: 'Прогресс', type: 'text', placeholder: 'Например: Открыть 50 карт' },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Pilot', 'Selfplay'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Valorant Specific Categories
const VALORANT_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'rank',
    label: 'Rank Boost',
    fields: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Europe', 'North America', 'LATAM', 'Brazil', 'Asia Pacific', 'Korea'] },
      { key: 'currentRank', label: 'Текущий ранг', type: 'select', options: ['Iron 1', 'Iron 2', 'Iron 3', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal'] },
      { key: 'targetRank', label: 'Желаемый ранг', type: 'select', options: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'placements',
    label: 'Калибровка',
    fields: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Europe', 'North America', 'LATAM', 'Brazil', 'Asia Pacific', 'Korea'] },
      { key: 'previousRank', label: 'Прошлый ранг', type: 'select', options: ['Unranked', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'] },
      { key: 'games', label: 'Количество игр', type: 'number', placeholder: '5' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'unrated',
    label: 'Unrated / Победы',
    fields: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Europe', 'North America', 'LATAM', 'Brazil', 'Asia Pacific', 'Korea'] },
      { key: 'games', label: 'Количество игр/побед', type: 'number', placeholder: '1' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'coaching',
    label: 'Тренировка',
    fields: [
      { key: 'hours', label: 'Количество часов', type: 'number', placeholder: '1' },
      { key: 'comment', label: 'Цель тренировки', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Escape from Tarkov Specific Categories
const EFT_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'raid',
    label: 'Рейды (Raids)',
    fields: [
      { 
        key: 'map', 
        label: 'Карта', 
        type: 'select', 
        options: ['Streets of Tarkov', 'The Lab', 'Lighthouse', 'Reserve', 'Interchange', 'Shoreline', 'Woods', 'Customs', 'Factory', 'Ground Zero'] 
      },
      { 
        key: 'mode', 
        label: 'Режим', 
        type: 'checkbox-group', 
        options: ['В группе (Selfplay)', 'Передача аккаунта (Pilot)'] 
      },
      { key: 'runs', label: 'Количество рейдов', type: 'number', placeholder: '1' },
      { key: 'comment', label: 'Комментарий', type: 'textarea', placeholder: 'Нужен ли конкретный лут или ключ?' }
    ]
  },
  {
    id: 'quests',
    label: 'Квесты',
    fields: [
      { 
        key: 'trader', 
        label: 'Торговец', 
        type: 'select', 
        options: ['Prapor', 'Therapist', 'Skier', 'Peacekeeper', 'Mechanic', 'Ragman', 'Jaeger', 'Fence', 'Kappa'] 
      },
      { key: 'questName', label: 'Название квеста', type: 'text', placeholder: 'Например: The Extortionist' },
      { 
        key: 'mode', 
        label: 'Режим', 
        type: 'select', 
        options: ['Передача аккаунта (Pilot)', 'В группе (Selfplay)'] 
      },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'leveling',
    label: 'Прокачка Персонажа',
    fields: [
      { key: 'currentLevel', label: 'Текущий уровень', type: 'number', placeholder: '1' },
      { key: 'targetLevel', label: 'Желаемый уровень', type: 'number', placeholder: '15' },
      { key: 'mode', label: 'Режим', type: 'select', options: ['Передача аккаунта (Pilot)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'arena',
    label: 'Tarkov Arena',
    fields: [
      { 
        key: 'service_type', 
        label: 'Тип услуги', 
        type: 'select', 
        options: ['Фарм ARP', 'Победы', 'Прокачка пресетов'] 
      },
      { key: 'amount', label: 'Количество (ARP/Побед)', type: 'number', placeholder: '100' },
       { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
   {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea', placeholder: 'Фарм навыков, получение кейса и т.д.' }
    ]
  }
];

// Albion Online Specific Categories
const ALBION_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'fame_farm',
    label: 'Fame Farm (Прокачка)',
    fields: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Albion West', 'Albion East', 'Albion Europe'] },
      { key: 'amount', label: 'Количество Fame (млн)', type: 'number', placeholder: '10' },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Pilot (Передача)', 'Selfplay (В пати)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'silver_farm',
    label: 'Фарм Серебра',
    fields: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Albion West', 'Albion East', 'Albion Europe'] },
      { key: 'amount', label: 'Количество часов', type: 'number', placeholder: '1' },
      { key: 'mode', label: 'Режим', type: 'select', options: ['Pilot (Передача)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'gathering',
    label: 'Сбор ресурсов',
    fields: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Albion West', 'Albion East', 'Albion Europe'] },
      { key: 'resource', label: 'Тип ресурса', type: 'select', options: ['Дерево', 'Камень', 'Руда', 'Шкура', 'Ткань'] },
      { key: 'tier', label: 'Тир', type: 'select', options: ['T4', 'T5', 'T6', 'T7', 'T8'] },
      { key: 'amount', label: 'Количество часов', type: 'number', placeholder: '1' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Albion West', 'Albion East', 'Albion Europe'] },
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Mobile Legends Specific Categories
const MOBILE_LEGENDS_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'rank_boost',
    label: 'Повышение ранга',
    fields: [
      { key: 'currentRank', label: 'Текущий ранг', type: 'select', options: ['Warrior', 'Elite', 'Master', 'Grandmaster', 'Epic', 'Legend', 'Mythic'] },
      { key: 'targetRank', label: 'Желаемый ранг', type: 'select', options: ['Elite', 'Master', 'Grandmaster', 'Epic', 'Legend', 'Mythic', 'Mythical Glory'] },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Pilot (Передача)', 'Selfplay (В пати)'] },
      { key: 'os', label: 'Платформа', type: 'select', options: ['Android', 'iOS'] },
       { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'classic_winrate',
    label: 'Фарм Винрейта / Классика',
    fields: [
      { key: 'games', label: 'Количество игр/побед', type: 'number', placeholder: '5' },
       { key: 'hero', label: 'Герой', type: 'text' },
       { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
   {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// PUBG Boosting Categories
const PUBG_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'rank_boost',
    label: 'Рейтинг (Rank)',
    fields: [
      { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'Console'] },
      { key: 'mode', label: 'Режим', type: 'select', options: ['TPP', 'FPP'] },
      { key: 'currentRank', label: 'Текущий ранг', type: 'select', options: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'] },
      { key: 'targetRank', label: 'Желаемый ранг', type: 'select', options: ['Silver', 'Gold', 'Platinum', 'Diamond', 'Master'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'survivor_pass',
    label: 'Survivor Pass',
    fields: [
      { key: 'currentLevel', label: 'Текущий уровень', type: 'number', placeholder: '1' },
      { key: 'targetLevel', label: 'Желаемый уровень', type: 'number', placeholder: '30' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'stats',
    label: 'Статистика (K/D, Wins)',
    fields: [
      { key: 'service_type', label: 'Тип услуги', type: 'select', options: ['Победы (Wins)', 'Убийства (Kills)', 'K/D Boost'] },
      { key: 'amount', label: 'Количество', type: 'number', placeholder: '1' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Apex Legends Boosting Categories
const APEX_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'rank_boost',
    label: 'Рейтинг (Rank)',
    fields: [
      { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PlayStation', 'Xbox'] },
      { key: 'currentRank', label: 'Текущий ранг', type: 'select', options: ['Rookie', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master'] },
      { key: 'targetRank', label: 'Желаемый ранг', type: 'select', options: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Predator'] },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Solo (Selfplay)', 'Duo (Selfplay)', 'Pilot (Account Share)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'badges',
    label: 'Значки (Badges)',
    fields: [
      { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PlayStation', 'Xbox'] },
      { key: 'legend', label: 'Легенда', type: 'text', placeholder: 'Wraith, Pathfinder...' },
      { key: 'badge', label: 'Значок', type: 'select', options: ['20 Kills', '4000 Damage', 'Teamwork 10/10/10', 'Master', 'Predator'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'kills',
    label: 'Убийства / Победы',
    fields: [
      { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PlayStation', 'Xbox'] },
      { key: 'service_type', label: 'Тип', type: 'select', options: ['Kills Farm', 'Wins Farm'] },
      { key: 'amount', label: 'Количество', type: 'number', placeholder: '100' },
      { key: 'legend', label: 'Легенда', type: 'text' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// ARC Raiders Boosting Categories
const ARC_RAIDERS_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'raid_help',
    label: 'Помощь в рейде (Raid)',
    fields: [
      { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PlayStation 5', 'Xbox Series X/S'] },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['В группе (Selfplay)', 'Передача аккаунта (Pilot)'] },
      { key: 'runs', label: 'Количество рейдов', type: 'number', placeholder: '1' },
      { key: 'comment', label: 'Комментарий', type: 'textarea', placeholder: 'Цель рейда, вынос лута...' }
    ]
  },
  {
    id: 'leveling',
    label: 'Прокачка (Leveling)',
    fields: [
      { key: 'currentLevel', label: 'Текущий уровень', type: 'number', placeholder: '1' },
      { key: 'targetLevel', label: 'Желаемый уровень', type: 'number', placeholder: '10' },
      { key: 'mode', label: 'Режим', type: 'select', options: ['Pilot (Передача)', 'Selfplay (В группе)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'farm',
    label: 'Фарм ресурсов',
    fields: [
      { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PS5', 'Xbox'] },
      { key: 'resource', label: 'Ресурс/Предмет', type: 'text', placeholder: 'Название' },
      { key: 'amount', label: 'Количество/Часы', type: 'number', placeholder: '1' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'quests',
    label: 'Квесты / Задания',
    fields: [
      { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PS5', 'Xbox'] },
      { key: 'questName', label: 'Название задания', type: 'text' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Ashes of Creation Boosting Categories
const AOC_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'leveling',
    label: 'Прокачка (Leveling)',
    fields: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Alpha Two', 'EU', 'NA'] },
      { key: 'currentLevel', label: 'Текущий уровень', type: 'number', placeholder: '1' },
      { key: 'targetLevel', label: 'Желаемый уровень', type: 'number', placeholder: '50' },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Pilot', 'Selfplay'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'gathering',
    label: 'Сбор ресурсов',
    fields: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Alpha Two', 'EU', 'NA'] },
      { key: 'profession', label: 'Профессия', type: 'select', options: ['Mining', 'Lumberjacking', 'Gathering', 'Fishing'] },
      { key: 'amount', label: 'Количество/Часы', type: 'number', placeholder: '1' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'dungeons',
    label: 'Подземелья',
    fields: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Alpha Two', 'EU', 'NA'] },
      { key: 'dungeon_name', label: 'Название', type: 'text' },
      { key: 'runs', label: 'Количество заходов', type: 'number', placeholder: '1' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Battlefield Boosting Categories
const BF_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'leveling',
    label: 'Прокачка ранга',
    fields: [
      { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PlayStation', 'Xbox'] },
      { key: 'version', label: 'Версия игры', type: 'select', options: ['BF 2042', 'BF V', 'BF 1', 'BF 4'] },
      { key: 'currentLevel', label: 'Текущий уровень', type: 'number', placeholder: '1' },
      { key: 'targetLevel', label: 'Желаемый уровень', type: 'number', placeholder: '100' },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Pilot (Передача)', 'Selfplay (В лобби)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'weapon_unlock',
    label: 'Прокачка оружия',
    fields: [
      { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PS', 'Xbox'] },
      { key: 'version', label: 'Версия игры', type: 'select', options: ['BF 2042', 'BF V', 'BF 1'] },
      { key: 'weapon', label: 'Оружие', type: 'text', placeholder: 'Название оружия' },
      { key: 'attachments', label: 'Модули/Камуфляжи', type: 'text', placeholder: 'Что нужно открыть' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'stats',
    label: 'Статистика (K/D)',
    fields: [
      { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PS', 'Xbox'] },
      { key: 'version', label: 'Версия игры', type: 'select', options: ['BF 2042', 'BF V', 'BF 1'] },
      { key: 'kills', label: 'Количество убийств', type: 'number', placeholder: '100' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Brawl Stars Boosting Categories
const BS_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'trophy_push',
    label: 'Поднятие кубков',
    fields: [
      { key: 'currentRating', label: 'Текущие кубки', type: 'number', placeholder: '0' },
      { key: 'targetRating', label: 'Желаемые кубки', type: 'number', placeholder: '1000' },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Pilot (Передача)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'ranked',
    label: 'Ранговый бой (Ranked)',
    fields: [
      { key: 'currentRank', label: 'Текущий ранг', type: 'select', options: ['Bronze', 'Silver', 'Gold', 'Diamond', 'Mythic', 'Legendary', 'Masters'] },
      { key: 'targetRank', label: 'Желаемый ранг', type: 'select', options: ['Bronze', 'Silver', 'Gold', 'Diamond', 'Mythic', 'Legendary', 'Masters'] },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Pilot (Передача)', 'Selfplay (В пати)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'mastery',
    label: 'Мастерство (Mastery)',
    fields: [
      { key: 'brawler', label: 'Боец', type: 'text', placeholder: 'Название бойца' },
      { key: 'targetLevel', label: 'Уровень мастерства', type: 'select', options: ['Bronze 1', 'Silver 1', 'Gold 1', 'Gold 3'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
    ]
  }
];

// Clash Royale Boosting Categories
const CR_BOOSTING_CATEGORIES: BoostingCategoryConfig[] = [
  {
    id: 'trophy_push',
    label: 'Поднятие кубков',
    fields: [
      { key: 'currentRating', label: 'Текущие кубки', type: 'number', placeholder: '0' },
      { key: 'targetRating', label: 'Желаемые кубки', type: 'number', placeholder: '5000' },
      { key: 'mode', label: 'Режим', type: 'checkbox-group', options: ['Pilot (Передача)'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'challenges',
    label: 'Испытания (Challenges)',
    fields: [
      { key: 'challenge_type', label: 'Тип испытания', type: 'select', options: ['Classic Challenge', 'Grand Challenge', 'Royal Tournament'] },
      { key: 'wins', label: 'Количество побед', type: 'number', placeholder: '12' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'path_of_legends',
    label: 'Путь легенд (Path of Legends)',
    fields: [
      { key: 'currentRank', label: 'Текущая лига', type: 'select', options: ['Challenger I', 'Challenger II', 'Challenger III', 'Master I', 'Master II', 'Master III', 'Champion', 'Grand Champion', 'Royal Champion', 'Ultimate Champion'] },
      { key: 'targetRank', label: 'Желаемая лига', type: 'select', options: ['Challenger I', 'Challenger II', 'Challenger III', 'Master I', 'Master II', 'Master III', 'Champion', 'Grand Champion', 'Royal Champion', 'Ultimate Champion'] },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'mastery',
    label: 'Мастерство (Mastery)',
    fields: [
      { key: 'card_name', label: 'Карта', type: 'text', placeholder: 'Название карты' },
      { key: 'task_type', label: 'Тип задания', type: 'text', placeholder: 'Например: Нанести урон' },
      { key: 'comment', label: 'Комментарий', type: 'textarea' }
    ]
  },
  {
    id: 'other',
    label: 'Прочее',
    fields: [
      { key: 'comment', label: 'Опишите задачу', type: 'textarea' }
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
  if (gameId === 'g4') { // Diablo 4
    return D4_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g5') { // Genshin Impact
    return GENSHIN_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g6') { // Path of Exile
    return POE_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g9') { // Path of Exile 2
    return POE2_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g7') { // Valorant
    return VALORANT_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g8') { // Escape from Tarkov
    return EFT_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g10') { // Albion Online
    return ALBION_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g11') { // Mobile Legends
    return MOBILE_LEGENDS_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g12') { // PUBG
    return PUBG_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g13') { // Apex Legends
    return APEX_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g14') { // ARC Raiders
    return ARC_RAIDERS_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g15') { // Ashes of Creation
    return AOC_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g16') { // Battlefield
    return BF_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g17') { // Brawl Stars
    return BS_BOOSTING_CATEGORIES;
  }
  if (gameId === 'g18') { // Clash Royale
    return CR_BOOSTING_CATEGORIES;
  }
  return DEFAULT_BOOSTING_CATEGORIES;
};

// Kept for backward compatibility if needed, but usage should migrate to function above
export const BOOSTING_CATEGORIES = DEFAULT_BOOSTING_CATEGORIES;
