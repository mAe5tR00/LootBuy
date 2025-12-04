import { GameConfig } from '../types';

export const GAME_CONFIGS: Record<string, GameConfig> = {
  'default': {
    filters: [
      { key: 'server', label: 'Сервер', type: 'text', placeholder: 'Название сервера' },
      { key: 'region', label: 'Регион', type: 'select', options: ['Europe', 'America', 'Asia', 'Russia'] }
    ]
  },
  // World of Warcraft
  'g1': {
    filters: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Gordunni', 'Howling Fjord', 'Soulflayer', 'Blackscar', 'Outland', 'Kazzak', 'Draenor', 'Silvermoon'] },
      { key: 'faction', label: 'Фракция', type: 'select', options: ['Alliance', 'Horde'] },
      { key: 'class', label: 'Класс', type: 'select', options: ['Warrior', 'Paladin', 'Hunter', 'Rogue', 'Priest', 'Shaman', 'Mage', 'Warlock', 'Monk', 'Druid', 'Demon Hunter', 'Death Knight', 'Evoker'], validTypes: ['account'] }
    ]
  },
  // CS2
  'g2': {
    filters: [
      { key: 'type', label: 'Тип', type: 'select', options: ['Knife', 'Rifle', 'Sniper Rifle', 'Pistol', 'SMG', 'Gloves', 'Agent', 'Case', 'Key'], validTypes: ['item'] },
      { key: 'quality', label: 'Качество', type: 'select', options: ['Factory New', 'Minimal Wear', 'Field-Tested', 'Well-Worn', 'Battle-Scarred'], validTypes: ['item'] },
      { key: 'rarity', label: 'Редкость', type: 'select', options: ['Consumer Grade', 'Industrial Grade', 'Mil-Spec', 'Restricted', 'Classified', 'Covert', 'Contraband'], validTypes: ['item'] },
      { key: 'float', label: 'Float Value', type: 'range', validTypes: ['item'] },
      { key: 'primeStatus', label: 'Prime Status', type: 'checkbox', validTypes: ['account'] },
      { key: 'rank', label: 'Ранг', type: 'select', options: ['Silver', 'Gold Nova', 'Master Guardian', 'Eagle', 'Global Elite'], validTypes: ['account'] }
    ]
  },
  // Dota 2
  'g3': {
    filters: [
      { key: 'mmr', label: 'MMR', type: 'range', validTypes: ['account'] },
      { key: 'behavior_score', label: 'Порядочность', type: 'range', validTypes: ['account'] },
      { key: 'rarity', label: 'Редкость', type: 'select', options: ['Common', 'Uncommon', 'Rare', 'Mythical', 'Legendary', 'Immortal', 'Arcana'], validTypes: ['item'] },
      { key: 'hero', label: 'Герой', type: 'text', placeholder: 'Pudge, Invoker...', validTypes: ['item'] }
    ]
  },
  // Diablo 4
  'g4': {
    filters: [
        { key: 'mode', label: 'Режим', type: 'select', options: ['Softcore', 'Hardcore'] },
        { key: 'class', label: 'Класс', type: 'select', options: ['Barbarian', 'Druid', 'Necromancer', 'Rogue', 'Sorcerer', 'Spiritborn'] },
        { key: 'level', label: 'Уровень', type: 'range', validTypes: ['account'] }
    ]
  },
  // Genshin Impact
  'g5': {
    filters: [
      { key: 'server', label: 'Сервер', type: 'select', options: ['Europe', 'America', 'Asia', 'TW, HK, MO'] },
      { key: 'ar_level', label: 'Ранг (AR)', type: 'range', validTypes: ['account'] },
      { key: 'five_stars', label: '5★ Персонажи', type: 'number', validTypes: ['account'] },
      { key: 'donation_type', label: 'Тип доната', type: 'select', options: ['Genesis Crystals', 'Blessing of the Welkin Moon', 'Battle Pass'], validTypes: ['donation'] }
    ]
  },
  // Path of Exile
  'g6': {
    filters: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Settlers', 'Settlers HC', 'Standard', 'Hardcore'] },
      { key: 'currency_type', label: 'Тип валюты', type: 'select', options: ['Divine Orb', 'Chaos Orb', 'Mirror of Kalandra', 'Exalted Orb'], validTypes: ['currency'] }
    ]
  },
  // Valorant
  'g7': {
    filters: [
        { key: 'region', label: 'Регион', type: 'select', options: ['EU', 'NA', 'LATAM', 'BR', 'AP', 'KR'] },
        { key: 'rank', label: 'Ранг', type: 'select', options: ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal', 'Radiant'], validTypes: ['account'] },
        { key: 'skins_count', label: 'Количество скинов', type: 'number', validTypes: ['account'] },
        { key: 'topup_method', label: 'Способ пополнения', type: 'select', options: ['Code', 'Direct Login'], validTypes: ['points'] }
    ]
  },
  // Escape from Tarkov
  'g8': {
      filters: [
          { key: 'region', label: 'Регион', type: 'select', options: ['EU', 'US', 'CIS', 'Other'] },
          { key: 'edition', label: 'Издание', type: 'select', options: ['Standard', 'Left Behind', 'Prepare for Escape', 'Edge of Darkness', 'Unheard'], validTypes: ['account'] },
          { key: 'level', label: 'Уровень', type: 'range', validTypes: ['account'] },
          { key: 'currency_type', label: 'Валюта', type: 'select', options: ['Roubles', 'Dollars', 'Euros'], validTypes: ['currency'] }
      ]
  },
  // Path of Exile 2
  'g9': {
    filters: [
      { key: 'league', label: 'Лига', type: 'select', options: ['Standard', 'Hardcore'] },
      { key: 'currency_type', label: 'Тип валюты', type: 'select', options: ['Gold', 'Exalted Orb'], validTypes: ['currency'] }
    ]
  },
  // Albion Online
  'g10': {
      filters: [
          { key: 'server', label: 'Сервер', type: 'select', options: ['Albion West', 'Albion East', 'Albion Europe'] },
          { key: 'silver_amount', label: 'Количество серебра', type: 'number', validTypes: ['currency'] },
          { key: 'fame', label: 'Total Fame', type: 'number', validTypes: ['account'] },
          { key: 'premium_status', label: 'Премиум', type: 'checkbox', validTypes: ['account'] }
      ]
  },
  // Mobile Legends
  'g11': {
      filters: [
          { key: 'server_id', label: 'Zone ID (Server)', type: 'text', placeholder: 'e.g. 1234', validTypes: ['donation'] },
          { key: 'amount_gems', label: 'Кол-во алмазов', type: 'number', validTypes: ['donation'] },
          { key: 'rank', label: 'Ранг', type: 'select', options: ['Warrior', 'Elite', 'Master', 'Grandmaster', 'Epic', 'Legend', 'Mythic'], validTypes: ['account'] },
          { key: 'heroes_count', label: 'Героев', type: 'number', validTypes: ['account'] }
      ]
  },
  // PUBG
  'g12': {
      filters: [
          { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'Console', 'Mobile'] },
          { key: 'gcoin_amount', label: 'G-Coin', type: 'number', validTypes: ['donation'] },
          { key: 'rank', label: 'Ранг', type: 'select', options: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master'], validTypes: ['account'] },
          { key: 'plus_status', label: 'Plus Status', type: 'checkbox', validTypes: ['account'] }
      ]
  },
  // Apex Legends
  'g13': {
      filters: [
          { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PlayStation', 'Xbox', 'Switch'] },
          { key: 'rank', label: 'Ранг', type: 'select', options: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Predator'], validTypes: ['account'] },
          { key: 'heirlooms', label: 'Реликвии', type: 'number', validTypes: ['account'] },
          { key: 'apex_coins', label: 'Apex Coins', type: 'number', validTypes: ['donation'] }
      ]
  },
  // ARC Raiders
  'g14': {
      filters: [
          { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PS5', 'Xbox'] },
          { key: 'level', label: 'Уровень', type: 'number', validTypes: ['account'] }
      ]
  },
  // Ashes of Creation
  'g15': {
      filters: [
          { key: 'server', label: 'Сервер', type: 'select', options: ['Alpha Two', 'EU', 'NA'] },
          { key: 'race', label: 'Раса', type: 'select', options: ['Aela', 'Dünir', 'Kaivek', 'Niküa', 'Pyrai', 'Ren\'Kai', 'Vaelune', 'Vek'], validTypes: ['account'] },
          { key: 'archetype', label: 'Архетип', type: 'select', options: ['Fighter', 'Tank', 'Rogue', 'Ranger', 'Mage', 'Summoner', 'Cleric', 'Bard'], validTypes: ['account'] }
      ]
  },
  // Battlefield
  'g16': {
      filters: [
          { key: 'platform', label: 'Платформа', type: 'select', options: ['PC', 'PlayStation', 'Xbox'] },
          { key: 'version', label: 'Версия', type: 'select', options: ['2042', 'V', '1', '4'], validTypes: ['account'] },
          { key: 'level', label: 'Уровень', type: 'number', validTypes: ['account'] }
      ]
  },
  // Brawl Stars
  'g17': {
      filters: [
          { key: 'trophies', label: 'Кубки', type: 'number', validTypes: ['account'] },
          { key: 'brawlers', label: 'Бойцы', type: 'number', validTypes: ['account'] },
          { key: 'legendary', label: 'Легендарные', type: 'number', validTypes: ['account'] },
          { key: 'gem_amount', label: 'Гемы', type: 'number', validTypes: ['donation'] }
      ]
  },
  // Clash Royale
  'g18': {
    filters: [
      {
        key: 'arena',
        label: 'Арена',
        type: 'select',
        options: ['Arena 1', 'Arena 10', 'Arena 15', 'Arena 20', 'League 1', 'League 10'],
        validTypes: ['account']
      },
      {
        key: 'trophies',
        label: 'Кубки',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'king_level',
        label: 'Уровень короля',
        type: 'number',
        min: 1,
        max: 15,
        validTypes: ['account']
      },
      {
        key: 'cards_found',
        label: 'Карты (кол-во)',
        type: 'number',
        min: 0,
        max: 115, 
        validTypes: ['account']
      },
      {
        key: 'legendary_cards',
        label: 'Легендарные карты',
        type: 'number',
        min: 0,
        validTypes: ['account']
      },
      {
        key: 'donation_type',
        label: 'Тип доната',
        type: 'select',
        options: ['Gems (Гемы)', 'Pass Royale (Gold)', 'Pass Royale (Diamond)', 'Special Offers'],
        validTypes: ['donation']
      },
      {
        key: 'amount',
        label: 'Количество гемов',
        type: 'number',
        min: 0,
        validTypes: ['donation']
      },
      {
        key: 'item_type',
        label: 'Тип предмета',
        type: 'select',
        options: ['Wild Cards', 'Books', 'Magic Coins'],
        validTypes: ['item']
      }
    ]
  }
};
