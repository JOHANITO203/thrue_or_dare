// Thèmes premium avec toutes les variables CSS
export const premiumThemes = {
  // Thème par défaut (gratuit)
  default: {
    id: 'default',
    name: 'Classic Gradient',
    description: 'Dégradé coloré classique',
    gradient: 'from-[#7a60ff] via-[#ff6ac0] to-[#ff9575]',
    preview: '🌈',
    isPremium: false,
    cssVariables: {
      '--bg-primary': 'linear-gradient(135deg, #7a60ff 0%, #ff6ac0 50%, #ff9575 100%)',
      '--glass-bg': 'rgba(255, 255, 255, 0.1)',
      '--glass-border': 'rgba(255, 255, 255, 0.2)',
      '--accent-color': '#ff6ac0',
      '--text-primary': '#ffffff',
      '--text-secondary': 'rgba(255, 255, 255, 0.8)'
    }
  },

  // Thèmes premium
  neonCyber: {
    id: 'neonCyber',
    name: 'Neon Cyber',
    description: 'Ambiance cyberpunk futuriste',
    gradient: 'from-cyan-400 via-purple-500 to-pink-500',
    preview: '🔮',
    isPremium: true,
    cssVariables: {
      '--bg-primary': 'linear-gradient(135deg, #00ffff 0%, #8b5cf6 50%, #ec4899 100%)',
      '--glass-bg': 'rgba(0, 255, 255, 0.1)',
      '--glass-border': 'rgba(0, 255, 255, 0.3)',
      '--accent-color': '#00ffff',
      '--text-primary': '#ffffff',
      '--text-secondary': 'rgba(0, 255, 255, 0.8)',
      '--neon-glow': '0 0 20px rgba(0, 255, 255, 0.5)'
    }
  },

  darkElegant: {
    id: 'darkElegant',
    name: 'Dark Elegant',
    description: 'Élégance sombre et dorée',
    gradient: 'from-gray-900 via-gray-700 to-amber-600',
    preview: '🖤',
    isPremium: true,
    cssVariables: {
      '--bg-primary': 'linear-gradient(135deg, #111827 0%, #374151 50%, #d97706 100%)',
      '--glass-bg': 'rgba(0, 0, 0, 0.4)',
      '--glass-border': 'rgba(217, 119, 6, 0.3)',
      '--accent-color': '#d97706',
      '--text-primary': '#ffffff',
      '--text-secondary': 'rgba(217, 119, 6, 0.9)'
    }
  },

  roseTropical: {
    id: 'roseTropical',
    name: 'Rose Tropical',
    description: 'Coucher de soleil tropical',
    gradient: 'from-pink-400 via-rose-500 to-orange-400',
    preview: '🌺',
    isPremium: true,
    cssVariables: {
      '--bg-primary': 'linear-gradient(135deg, #f472b6 0%, #f43f5e 50%, #fb923c 100%)',
      '--glass-bg': 'rgba(244, 114, 182, 0.15)',
      '--glass-border': 'rgba(244, 63, 94, 0.3)',
      '--accent-color': '#f43f5e',
      '--text-primary': '#ffffff',
      '--text-secondary': 'rgba(255, 255, 255, 0.9)'
    }
  },

  mysticPurple: {
    id: 'mysticPurple',
    name: 'Mystic Purple',
    description: 'Mystère violet profond',
    gradient: 'from-indigo-600 via-purple-600 to-purple-800',
    preview: '🔯',
    isPremium: true,
    cssVariables: {
      '--bg-primary': 'linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #6b21a8 100%)',
      '--glass-bg': 'rgba(147, 51, 234, 0.15)',
      '--glass-border': 'rgba(107, 33, 168, 0.4)',
      '--accent-color': '#9333ea',
      '--text-primary': '#ffffff',
      '--text-secondary': 'rgba(196, 181, 253, 0.9)'
    }
  }
}

// Hook pour appliquer les thèmes
export const useTheme = () => {
  const applyTheme = (themeId) => {
    const theme = premiumThemes[themeId]
    if (!theme) return false

    const root = document.documentElement
    
    // Appliquer les variables CSS
    Object.entries(theme.cssVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })

    // Ajouter une classe pour les styles spécifiques
    document.body.className = document.body.className.replace(/theme-\w+/g, '')
    document.body.classList.add(`theme-${themeId}`)

    console.log(`🎨 Thème ${theme.name} appliqué`)
    return true
  }

  const resetTheme = () => {
    applyTheme('default')
  }

  return { applyTheme, resetTheme }
}
