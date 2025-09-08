// premiumSystem.js - Gestion abonnement et premium
export const premiumConfig = {
  // Modèle abonnement
  subscription: {
    monthlyPrice: 4.99,
    currency: 'EUR',
    features: [
      'deck_extreme_access',
      'premium_themes',
      'vip_decks',
      'advanced_stats',
      'achievement_system',
      'tournament_mode'
    ]
  },

  // Decks premium
  premiumDecks: ['extreme'],
  
  // Thèmes premium
  premiumThemes: [
    {
      id: 'gold',
      name: 'Gold Premium',
      description: 'Interface dorée luxueuse',
      gradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
      preview: '✨'
    },
    {
      id: 'dark_diamond',
      name: 'Dark Diamond', 
      description: 'Design noir premium',
      gradient: 'from-gray-900 via-purple-900 to-black',
      preview: '💎'
    },
    {
      id: 'pink_passion',
      name: 'Pink Passion',
      description: 'Thème rose sensuel',
      gradient: 'from-pink-400 via-pink-500 to-rose-600',
      preview: '🌹'
    },
    {
      id: 'neon_nights',
      name: 'Neon Nights',
      description: 'Style cyberpunk électrique',
      gradient: 'from-cyan-400 via-blue-500 to-purple-600',
      preview: '⚡'
    }
  ]
}

// Mock premium state (localStorage simulation)
let premiumState = {
  isSubscribed: false,
  subscriptionDate: null,
  availableDecks: ['soft', 'hot'], // extreme require premium
  currentTheme: 'default',
  availableThemes: ['default']
}

export const premiumService = {
  // Vérifier statut premium
  isPremiumUser: () => premiumState.isSubscribed,
  
  // Vérifier accès deck
  canAccessDeck: (deckId) => {
    if (deckId === 'extreme') {
      return premiumState.isSubscribed
    }
    return true
  },
  
  // Activer premium (mock)
  activatePremium: () => {
    premiumState.isSubscribed = true
    premiumState.subscriptionDate = new Date()
    premiumState.availableDecks = ['soft', 'hot', 'extreme']
    premiumState.availableThemes = ['default', ...premiumConfig.premiumThemes.map(t => t.id)]
    return premiumState
  },
  
  // Désactiver premium (mock)
  deactivatePremium: () => {
    premiumState.isSubscribed = false
    premiumState.subscriptionDate = null
    premiumState.availableDecks = ['soft', 'hot']
    premiumState.availableThemes = ['default']
    premiumState.currentTheme = 'default'
    return premiumState
  },
  
  // Obtenir état
  getState: () => ({ ...premiumState }),
  
  // Changer thème
  setTheme: (themeId) => {
    if (premiumState.availableThemes.includes(themeId)) {
      premiumState.currentTheme = themeId
      return true
    }
    return false
  }
}
