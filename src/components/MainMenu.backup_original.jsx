import { useState, useEffect } from 'react'
import { useAudio, useContextualMusic } from '../hooks/useAudio'
import { useGameSave } from '../hooks/useGameSave'
import SettingsMenu from './SettingsMenu'
import PremiumContentMenu from './PremiumContentMenu'
import ResumeGameMenu from './ResumeGameMenu'

export default function MainMenu({ onNewGame, onResumeGame }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [spiralComplete, setSpiralComplete] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showPremium, setShowPremium] = useState(false)
  const [showResume, setShowResume] = useState(false)
  
  const { playClick, initializeAudio } = useAudio()
  const { hasSavedGame } = useGameSave()
  useContextualMusic('menu')

  useEffect(() => {
    // Déclencher l'animation au montage
    const timer = setTimeout(() => setIsLoaded(true), 100)
    
    // Marquer la spirale comme terminée après l'animation
    const spiralTimer = setTimeout(() => setSpiralComplete(true), 4000)
    
    return () => {
      clearTimeout(timer)
      clearTimeout(spiralTimer)
    }
  }, [])

  // Configuration des avatars avec angles spirale
  const avatars = [
    { 
      src: "/assets/memoXX/female_01.png", 
      finalAngle: 0, 
      startAngle: -720,
      midAngle: -360,
      delay: '0.1s' 
    },
    { 
      src: "/assets/memoXY/male_01.png", 
      finalAngle: 45, 
      startAngle: -675,  
      midAngle: -315,
      delay: '0.2s' 
    },
    { 
      src: "/assets/memoXX/female_15.png", 
      finalAngle: 90, 
      startAngle: -630,  
      midAngle: -270,
      delay: '0.3s' 
    },
    { 
      src: "/assets/memoXY/male_02.png", 
      finalAngle: 135, 
      startAngle: -585,  
      midAngle: -225,
      delay: '0.4s' 
    },
    { 
      src: "/assets/memoXX/female_14.png", 
      finalAngle: 180, 
      startAngle: -540,  
      midAngle: -180,
      delay: '0.5s' 
    },
    { 
      src: "/assets/memoXY/male_03.png", 
      finalAngle: 225, 
      startAngle: -495,  
      midAngle: -135,
      delay: '0.6s' 
    },
    { 
      src: "/assets/memoXX/female_04.png", 
      finalAngle: 270, 
      startAngle: -450,  
      midAngle: -90,
      delay: '0.7s' 
    },
    { 
      src: "/assets/memoXY/male_13.png", 
      finalAngle: 315, 
      startAngle: -405,  
      midAngle: -45,
      delay: '0.8s' 
    }
  ]

  const handleNewGame = () => {
    playClick()
    initializeAudio()
    onNewGame()
  }

  const handleResumeGame = () => {
    playClick()
    setShowResume(true)
  }

  const handleSettings = () => {
    playClick()
    setShowSettings(true)
  }

  const handlePremium = () => {
    playClick()
    setShowPremium(true)
  }

  const handleQuit = () => {
    playClick()
    if (confirm('Quitter Truth or Dare HOT ?')) {
      window.close()
    }
  }

  const closeMenus = () => {
    setShowSettings(false)
    setShowPremium(false)
    setShowResume(false)
  }

  const handleResumeFromMenu = (gameState) => {
    closeMenus()
    onResumeGame(gameState)
  }

  // Si les menus sont ouverts, les afficher
  if (showSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7a60ff] via-[#ff6ac0] to-[#ff9575] flex items-center justify-center p-4">
        <SettingsMenu onClose={closeMenus} onBack={closeMenus} />
      </div>
    )
  }

  if (showPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7a60ff] via-[#ff6ac0] to-[#ff9575] flex items-center justify-center p-4">
        <PremiumContentMenu onClose={closeMenus} onBack={closeMenus} />
      </div>
    )
  }

  if (showResume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7a60ff] via-[#ff6ac0] to-[#ff9575] flex items-center justify-center p-4">
        <ResumeGameMenu 
          onResume={handleResumeFromMenu}
          onNewGame={handleNewGame}
          onCancel={closeMenus}
        />
      </div>
    )
  }

  return (
    <div className={`glass-premium w-[520px] max-w-full overflow-hidden p-8 flex flex-col items-center gap-6 text-center transition-all duration-1000 ${
      isLoaded ? 'animate-fade-scale-in' : 'opacity-0 scale-95'
    }`}>
      
      {/* Titre avec icône flamme */}
      <div className="animate-bounce-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        <h1 className="text-[2.75rem] font-bold flex items-center gap-2">
          <span>Truth or Dare</span>
          <span className="flex items-center gap-1">
            HOT
            <img 
              src="/assets/emojis/1f525.png" 
              alt="flamme iOS" 
              className="w-12 h-12 align-text-bottom hover:scale-110 transition-transform" 
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </span>
        </h1>
      </div>

      {/* Cercle d'avatars avec animation spirale */}
      <div 
        className="relative w-full h-[300px] mt-2" 
        style={{ 
          animationDelay: '0.4s',
          maxWidth: '400px',
          margin: '0 auto'
        }}
      >
        {avatars.map((avatar, index) => (
          <img 
            key={index}
            src={avatar.src} 
            alt={`memoji ${index + 1}`} 
            className={`absolute top-1/2 left-1/2 w-[90px] h-[90px] cursor-pointer spiral-avatar-fixed ${
              spiralComplete ? 'spiral-avatar-completed' : ''
            }`}
            style={{
              '--start-angle': `${avatar.startAngle}deg`,
              '--mid-angle': `${avatar.midAngle}deg`,
              '--final-angle': `${avatar.finalAngle}deg`,
              animationDelay: avatar.delay,
              animationFillMode: 'both',
              opacity: 1
            }}
            onError={(e) => e.target.style.display = 'none'}
            onMouseEnter={(e) => {
              if (spiralComplete) {
                e.target.style.filter = 'brightness(1.2) drop-shadow(0 0 20px rgba(255,255,255,0.8))'
              }
            }}
            onMouseLeave={(e) => {
              e.target.style.filter = 'none'
            }}
          />
        ))}
        
        {/* Particule centrale */}
        {spiralComplete && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-60 animate-ping"></div>
          </div>
        )}
      </div>

      {/* Boutons du menu */}
      <div className="w-full flex flex-col gap-4 mt-4 animate-fade-scale-in" style={{ animationDelay: '3s', animationFillMode: 'both' }}>
        
        {/* Bouton Reprendre / Nouvelle Partie */}
        {hasSavedGame ? (
          <button
            onClick={handleResumeGame}
            className="w-full rounded-full py-4 font-semibold text-white bg-gradient-to-b from-[#5CD96E] to-[#34C759] shadow-lg hover-lift button-particles relative overflow-hidden group"
          >
            <span className="relative z-10">🔄 Reprendre la partie</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        ) : (
          <button
            onClick={handleNewGame}
            className="w-full rounded-full py-4 font-semibold text-white bg-gradient-to-b from-[#5C6BFF] to-[#7A00FF] shadow-lg hover-lift button-particles relative overflow-hidden group"
          >
            <span className="relative z-10">🎮 Nouvelle Partie</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        )}
        
        {/* Bouton Nouvelle Partie (si sauvegarde existe) */}
        {hasSavedGame && (
          <button
            onClick={handleNewGame}
            className="w-full rounded-full py-3 font-semibold text-white bg-gradient-to-b from-[#5C6BFF] to-[#7A00FF] shadow-lg hover-lift relative overflow-hidden group opacity-90"
          >
            <span className="relative z-10">🎮 Nouvelle Partie</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        )}
        
        {/* Bouton Paramètres */}
        <button 
          onClick={handleSettings}
          className="w-full rounded-full py-4 font-semibold text-white bg-gradient-to-b from-[#5CD96E] to-[#34C759] shadow-lg hover-lift button-particles relative overflow-hidden group"
        >
          <span className="relative z-10">⚙️ Paramètres</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>
        
        {/* Bouton Premium Content */}
        <button 
          onClick={handlePremium}
          className="w-full rounded-full py-4 font-semibold text-white bg-gradient-to-b from-[#FF6AC0] to-[#FF3B72] shadow-lg hover-lift button-particles relative overflow-hidden group"
        >
          <span className="relative z-10">💎 Premium Content</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>
        
        {/* Bouton Quitter */}
        <button 
          onClick={handleQuit}
          className="w-full rounded-full py-4 font-semibold text-white bg-gradient-to-b from-[#FF9575] to-[#FF3B30] shadow-lg hover-lift button-particles relative overflow-hidden group"
        >
          <span className="relative z-10">🚪 Quitter</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        </button>
      </div>

      {/* Version indicator avec indicateur de sauvegarde */}
      <div className={`text-white/60 text-sm mt-2 transition-all duration-1000 ${
        spiralComplete ? 'animate-pulse' : ''
      }`} style={{ animationDelay: '4s', animationFillMode: 'both' }}>
        Phase 5 - Production Ready 🎊
        {hasSavedGame && (
          <div className="text-green-400 text-xs mt-1">💾 Partie sauvegardée disponible</div>
        )}
      </div>
    </div>
  )
}
