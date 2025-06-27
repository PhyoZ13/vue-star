export const API_CONFIG = {
  BASE_URL: 'http://stage.whgstage.com/front-end-test',
  TIMEOUT: 10000,
  ENDPOINTS: {
    GAMES: '/games.php',
    JACKPOTS: '/jackpots.php'
  }
} as const

export const CATEGORY_CONFIG = {
  OTHER_CATEGORIES: ['ball', 'virtual', 'fun'] as const,
  OTHER_CATEGORY_NAME: 'other' as const,
  DISPLAY_ORDER: [
    'top',
    'new', 
    'slots',
    'jackpots',
    'live',
    'blackjack',
    'roulette',
    'table',
    'poker',
    'other'
  ] as const
} as const

export const UI_CONFIG = {
  COLORS: {
    PRIMARY: '#8DC63F',
    PRIMARY_HOVER: '#7AB32E',
    SECONDARY: '#373737',
    WHITE: '#FFFFFF',
    BACKGROUND: '#FCFCFC',
    TEXT_SECONDARY: '#6c757d'
  },
  BREAKPOINTS: {
    MOBILE: 500,
    TABLET: 800,
    DESKTOP: 1100,
    LARGE_DESKTOP: 1400
  },
  ANIMATIONS: {
    TRANSITION_DURATION: '0.3s',
    HOVER_SCALE: 1.01,
    HOVER_TRANSLATE: '-2px'
  }
} as const

export const REAL_TIME_CONFIG = {
  JACKPOT_UPDATE_INTERVAL: 5000,
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000
} as const

export const JACKPOT_CONFIG = {
  MILLION_THRESHOLD: 1000000,
  THOUSAND_THRESHOLD: 1000,
  DECIMAL_PLACES: 1
} as const 