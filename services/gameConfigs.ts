
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
        validTypes: ['item', 'skin']
      },
      {
        key: 'quality',
        label: 'Качество (Exterior)',
        type: 'select',
        options: ['Прямо с завода (FN)', 'Немного поношенное (MW)', 'После полевых (FT)', 'Поношенное (WW)', 'Закаленное в боях (BS)'],
        validTypes: ['item', 'skin']
      },
      {
        key: 'stat_trak',
        label: 'StatTrak™',
        type: 'checkbox',
        validTypes: ['item', 'skin']
      },
      {
        key: 'float',
        label: 'Float Value',
        type: 'text',
        placeholder: '0.00xxx',
        validTypes: ['item', 'skin']
      },
      {
        key: 'rank',
        label: 'Звание',
        type: 'select',
        options: ['Silver', 'Gold Nova', 'Master Guardian', 'LEM', 'Global Elite', 'Unranked'],
        validTypes: ['account', 'prime']
      },
      {
        key: 'primeStatus',
        label: 'Prime статус',
        type: 'checkbox',
        validTypes: ['account']
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
        validTypes: ['item'] 
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

  // Diablo IV
  'g4': {
    filters: [
      {
        key: 'server',
        label: 'Сервер',
        type: 'select',
        options: [
          'Eternal Realm - Hardcore',
          'Eternal Realm - Softcore',
          'Season - Hardcore',
          'Season - Softcore'
        ]
      },
      {
         key: 'class',
         label: 'Класс',
         type: 'select',
         options: ['Barbarian', 'Druid', 'Necromancer', 'Rogue', 'Sorcerer', 'Spiritborn'],
         validTypes: ['account', 'item']
      }
    ]
  },
  
  // Genshin Impact
  'g5': {
    filters: [
      {
        key: 'donation_type',
        label: 'Тип',
        type: 'select',
        options: [
          'Жемчужный Гимн',
          'Жемчужный Хор',
          'Благословение полой луны',
          'Апгрейд',
          'Скины',
          'Прочее'
        ],
        validTypes: ['donation']
      },
      {
        key: 'server',
        label: 'Сервер',
        type: 'select',
        options: ['Europe', 'America', 'Asia', 'TW, HK, MO']
      },
      {
        key: 'ar', 
        label: 'Ранг приключений (AR)',
        type: 'number',
        min: 1,
        max: 60,
        validTypes: ['account']
      },
      {
        key: 'event_count',
        label: 'Ивент леги (кол-во)',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'standard_count',
        label: 'Стандарт леги (кол-во)',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'primogems',
        label: 'Примогемы',
        type: 'number',
        min: 0,
        validTypes: ['account']
      }
    ]
  },

  // Path of Exile
  'g6': {
    filters: [
      {
        key: 'server',
        label: 'Сервер',
        type: 'select',
        options: ['Settlers', 'Settlers HC', 'Standard', 'Hardcore', 'Ruthless', 'Ruthless HC']
      },
      {
        key: 'item_type',
        label: 'Тип предмета',
        type: 'select',
        options: ['Оружие', 'Доспехи', 'Бижутерия', 'Камни', 'Карты', 'Масла', 'Прочее'],
        validTypes: ['item']
      },
      {
        key: 'class',
        label: 'Класс / Восхождение',
        type: 'select',
        options: [
          'Slayer', 'Gladiator', 'Champion', 
          'Juggernaut', 'Berserker', 'Chieftain', 
          'Deadeye', 'Warden', 'Pathfinder', 'Raider',
          'Assassin', 'Saboteur', 'Trickster', 
          'Necromancer', 'Occultist', 'Elementalist', 
          'Inquisitor', 'Hierophant', 'Guardian', 
          'Ascendant'
        ],
        validTypes: ['account']
      },
      {
        key: 'level',
        label: 'Уровень',
        type: 'number',
        min: 1,
        max: 100,
        validTypes: ['account']
      },
      {
        key: 'currency_type',
        label: 'Валюта',
        type: 'select',
        options: [
            'Божественная сфера (Divine Orb)',
            'Сфера хаоса (Chaos Orb)',
            'Сфера возвышения (Exalted Orb)',
            'Зеркало Каландры (Mirror of Kalandra)',
            'Древняя сфера (Ancient Orb)',
            'Сфера отмены (Annulment Orb)',
            'Сфера очищения (Orb of Scouring)',
            'Сфера алхимии (Orb of Alchemy)',
            'Сфера перемен (Orb of Alteration)',
            'Сфера соединения (Orb of Fusing)',
            'Призма камнереза (Gemcutter\'s Prism)',
            'Сфера ваал (Vaal Orb)'
        ],
        validTypes: ['currency']
      }
    ]
  },

  // Path of Exile 2 (Copy of g6)
  'g9': {
    filters: [
      {
        key: 'server',
        label: 'Сервер',
        type: 'select',
        options: ['Settlers', 'Settlers HC', 'Standard', 'Hardcore', 'Ruthless', 'Ruthless HC']
      },
      {
        key: 'item_type',
        label: 'Тип предмета',
        type: 'select',
        options: ['Оружие', 'Доспехи', 'Бижутерия', 'Камни', 'Карты', 'Масла', 'Прочее'],
        validTypes: ['item']
      },
      {
        key: 'class',
        label: 'Класс / Восхождение',
        type: 'select',
        options: [
          'Slayer', 'Gladiator', 'Champion', 
          'Juggernaut', 'Berserker', 'Chieftain', 
          'Deadeye', 'Warden', 'Pathfinder', 'Raider',
          'Assassin', 'Saboteur', 'Trickster', 
          'Necromancer', 'Occultist', 'Elementalist', 
          'Inquisitor', 'Hierophant', 'Guardian', 
          'Ascendant'
        ],
        validTypes: ['account']
      },
      {
        key: 'level',
        label: 'Уровень',
        type: 'number',
        min: 1,
        max: 100,
        validTypes: ['account']
      },
      {
        key: 'currency_type',
        label: 'Валюта',
        type: 'select',
        options: [
            'Божественная сфера (Divine Orb)',
            'Сфера хаоса (Chaos Orb)',
            'Сфера возвышения (Exalted Orb)',
            'Зеркало Каландры (Mirror of Kalandra)',
            'Древняя сфера (Ancient Orb)',
            'Сфера отмены (Annulment Orb)',
            'Сфера очищения (Orb of Scouring)',
            'Сфера алхимии (Orb of Alchemy)',
            'Сфера перемен (Orb of Alteration)',
            'Сфера соединения (Orb of Fusing)',
            'Призма камнереза (Gemcutter\'s Prism)',
            'Сфера ваал (Vaal Orb)'
        ],
        validTypes: ['currency']
      }
    ]
  },

  // Valorant
  'g7': {
    filters: [
      {
        key: 'server',
        label: 'Сервер',
        type: 'select',
        options: ['Europe', 'North America', 'LATAM', 'Brazil', 'Asia Pacific', 'Korea'],
        validTypes: ['account', 'points']
      },
      // Points Filters
      {
        key: 'topup_method',
        label: 'Способ пополнения',
        type: 'select',
        options: ['Цифровой код', 'Подарочная карта', 'Вход на аккаунт'],
        validTypes: ['points']
      },
      // Account Filters
      {
        key: 'rank',
        label: 'Ранг',
        type: 'select',
        options: ['Unranked', 'Iron 1', 'Iron 2', 'Iron 3', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal 1', 'Immortal 2', 'Immortal 3', 'Radiant'],
        validTypes: ['account']
      },
      {
        key: 'agents_count',
        label: 'Количество агентов',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'skins_count',
        label: 'Количество скинов',
        type: 'number',
        min: 0,
        validTypes: ['account']
      }
    ]
  },

  // Escape from Tarkov
  'g8': {
    filters: [
      // Account Filters
      {
        key: 'account_type',
        label: 'Тип аккаунта',
        type: 'select',
        options: ['PVP', 'PVE', 'Другое'],
        validTypes: ['account']
      },
      {
        key: 'level',
        label: 'Уровень',
        type: 'number', 
        min: 1,
        max: 80,
        validTypes: ['account']
      },
      // Item Filters
      {
        key: 'item_type',
        label: 'Тип предмета',
        type: 'select',
        options: [
            'Оружие',
            'Экипировка',
            'Модификации',
            'Боеприпасы',
            'Медикаменты',
            'Еда и напитки',
            'Ключи',
            'Кейсы',
            'Доллары',
            'Евро',
            'Прочее'
        ],
        validTypes: ['item']
      },
      {
        key: 'obtain_method',
        label: 'Способ получения',
        type: 'select',
        options: ['Барахолка', 'Рейд'],
        validTypes: ['item']
      }
    ]
  },
  
  // Albion Online
  'g10': {
    filters: [
      {
        key: 'server',
        label: 'Сервер',
        type: 'select',
        options: ['Albion West (Americas)', 'Albion East (Asia)', 'Albion Europe'],
        validTypes: ['currency', 'account', 'item', 'donation']
      },
      {
        key: 'currency_type',
        label: 'Тип валюты',
        type: 'select',
        options: ['Серебро', 'Золото'],
        validTypes: ['currency']
      },
      // Account Filters
      {
        key: 'fame',
        label: 'Total Fame (Опыт)',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'silver_amount',
        label: 'Баланс серебра',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'premium_status',
        label: 'Премиум статус',
        type: 'checkbox',
        validTypes: ['account']
      },
      // Item Filters
      {
        key: 'item_type',
        label: 'Тип предмета',
        type: 'select',
        options: ['Weapon', 'Armor', 'Mount', 'Consumable', 'Resource', 'Tome'],
        validTypes: ['item']
      },
      {
        key: 'tier',
        label: 'Тир (Tier)',
        type: 'select',
        options: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],
        validTypes: ['item']
      },
      {
        key: 'enchantment',
        label: 'Зачарование',
        type: 'select',
        options: ['0', '1', '2', '3', '4'],
        validTypes: ['item']
      },
      // Donation Filters
      {
        key: 'pack_type',
        label: 'Тип доната',
        type: 'select',
        options: ['Gold (Золото)', 'Premium (Премиум)', 'Skins (Скины)', 'Starter Pack'],
        validTypes: ['donation']
      }
    ]
  },

  // Mobile Legends
  'g11': {
    filters: [
      {
        key: 'donation_type',
        label: 'Тип доната',
        type: 'select',
        options: ['Diamonds (Алмазы)', 'Weekly Diamond Pass', 'Twilight Pass', 'Starlight Member'],
        validTypes: ['donation']
      },
      {
        key: 'amount_gems',
        label: 'Кол-во алмазов',
        type: 'number',
        min: 0,
        validTypes: ['donation']
      },
      {
        key: 'rank',
        label: 'Ранг',
        type: 'select',
        options: ['Warrior', 'Elite', 'Master', 'Grandmaster', 'Epic', 'Legend', 'Mythic', 'Mythical Glory', 'Mythical Immortal'],
        validTypes: ['account']
      },
      {
        key: 'heroes_count',
        label: 'Количество героев',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'skins_count',
        label: 'Количество скинов',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'winrate',
        label: 'Винрейт %',
        type: 'number',
        min: 0,
        max: 100,
        validTypes: ['account']
      },
      {
        key: 'emblem_level',
        label: 'Уровень эмблем (макс)',
        type: 'number',
        min: 0,
        max: 60,
        validTypes: ['account']
      }
    ]
  },

  // PUBG
  'g12': {
    filters: [
      {
        key: 'platform',
        label: 'Платформа',
        type: 'select',
        options: ['PC', 'PlayStation', 'Xbox', 'Mobile'],
        validTypes: ['account', 'boosting', 'donation', 'item']
      },
      // Donation
      {
        key: 'donation_type',
        label: 'Тип доната',
        type: 'select',
        options: ['G-Coin', 'Starter Pack', 'Survivor Pass', 'Plus Status'],
        validTypes: ['donation']
      },
      {
        key: 'gcoin_amount',
        label: 'Кол-во G-Coin',
        type: 'number',
        min: 0,
        validTypes: ['donation']
      },
      // Account
      {
        key: 'hours',
        label: 'Часов в игре',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'rank',
        label: 'Ранг',
        type: 'select',
        options: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master'],
        validTypes: ['account']
      },
      {
        key: 'plus_status',
        label: 'Plus Status',
        type: 'checkbox',
        validTypes: ['account']
      },
      // Item
      {
        key: 'item_type',
        label: 'Тип предмета',
        type: 'select',
        options: ['Set', 'Weapon Skin', 'Outfit', 'Equipment', 'Vehicle', 'Emote', 'Crate/Key'],
        validTypes: ['item']
      }
    ]
  },

  // Apex Legends
  'g13': {
    filters: [
      {
        key: 'platform',
        label: 'Платформа',
        type: 'select',
        options: ['PC', 'PlayStation', 'Xbox', 'Nintendo Switch'],
        validTypes: ['account', 'boosting', 'donation']
      },
      // Account
      {
        key: 'level',
        label: 'Уровень',
        type: 'number',
        min: 1,
        validTypes: ['account']
      },
      {
        key: 'rank',
        label: 'Ранг',
        type: 'select',
        options: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Apex Predator'],
        validTypes: ['account']
      },
      {
        key: 'heirlooms',
        label: 'Реликвии (кол-во)',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'legendary_skins',
        label: 'Легендарные скины',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      // Donation
      {
        key: 'donation_type',
        label: 'Тип доната',
        type: 'select',
        options: ['Apex Coins', 'Battle Pass', 'Edition Pack'],
        validTypes: ['donation']
      },
      {
        key: 'apex_coins',
        label: 'Кол-во монет',
        type: 'number',
        min: 0,
        validTypes: ['donation']
      }
    ]
  },

  // ARC Raiders
  'g14': {
    filters: [
      {
        key: 'platform',
        label: 'Платформа',
        type: 'select',
        options: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
        validTypes: ['currency', 'account', 'item', 'boosting', 'donation']
      },
      // Currency
      {
        key: 'delivery_method',
        label: 'Метод доставки',
        type: 'select',
        options: ['В рейде (Drop)', 'Аукцион', 'Передача аккаунта'],
        validTypes: ['currency', 'item']
      },
      // Account
      {
        key: 'level',
        label: 'Уровень',
        type: 'number',
        min: 1,
        validTypes: ['account']
      },
      {
        key: 'hours',
        label: 'Часов в игре',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      // Items
      {
        key: 'item_type',
        label: 'Тип предмета',
        type: 'select',
        options: ['Weapon', 'Gadget', 'Resource', 'Key'],
        validTypes: ['item']
      },
      // Donation
      {
        key: 'donation_type',
        label: 'Тип доната',
        type: 'select',
        options: ['Credits', 'Skins', 'Battle Pass'],
        validTypes: ['donation']
      }
    ]
  },

  // Ashes of Creation
  'g15': {
    filters: [
      {
        key: 'server',
        label: 'Сервер',
        type: 'select',
        options: ['Alpha Two', 'Beta One', 'Release Server 1', 'Release Server 2'],
        validTypes: ['currency', 'account', 'item', 'boosting']
      },
      {
        key: 'region',
        label: 'Регион',
        type: 'select',
        options: ['NA', 'EU', 'OCE'],
        validTypes: ['currency', 'account', 'boosting']
      },
      // Currency
      {
        key: 'delivery_method',
        label: 'Метод доставки',
        type: 'select',
        options: ['Trade', 'Mail', 'Face to Face'],
        validTypes: ['currency', 'item']
      },
      // Account
      {
        key: 'archetype',
        label: 'Архетип',
        type: 'select',
        options: ['Fighter', 'Tank', 'Rogue', 'Ranger', 'Mage', 'Summoner', 'Cleric', 'Bard'],
        validTypes: ['account', 'boosting']
      },
      {
        key: 'level',
        label: 'Уровень',
        type: 'number',
        min: 1,
        max: 50,
        validTypes: ['account', 'boosting']
      },
      // Item
      {
        key: 'item_type',
        label: 'Тип предмета',
        type: 'select',
        options: ['Weapon', 'Armor', 'Material', 'Consumable', 'Blueprint'],
        validTypes: ['item']
      },
      {
        key: 'rarity',
        label: 'Редкость',
        type: 'select',
        options: ['Common', 'Uncommon', 'Rare', 'Heroic', 'Epic', 'Legendary'],
        validTypes: ['item']
      },
      // Donation
      {
        key: 'pack_type',
        label: 'Тип доната',
        type: 'select',
        options: ['Pre-order Pack', 'Embers', 'Cosmetic'],
        validTypes: ['donation']
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
