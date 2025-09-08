import { useState, useEffect } from 'react'
import PauseOptions from './PauseOptions'

export default function GameBoard({ 
  players, 
  currentPlayerIndex, 
  getRandomCard, 
  markCardUsed, 
  updatePlayerScore, 
  nextPlayer, 
  onFinish, 
  selectedDeck,
  currentDeckCards 
}) {
  const [currentCard, setCurrentCard] = useState(null)
  const [timer, setTimer] = useState(30)
  const [defaultTimer, setDefaultTimer] = useState(30)
  const [isCardFlipped, setIsCardFlipped] = useState(false)
  const [animatingTimer, setAnimatingTimer] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showPauseOptions, setShowPauseOptions] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('default')
  
  const currentPlayer = players[currentPlayerIndex]
  const circumference = 2 * Math.PI * 50 // rayon de 50px

  useEffect(() => {
    setCurrentCard(getRandomCard())
    setIsCardFlipped(false)
    setTimer(defaultTimer)
    // Animation de flip de carte au début
    setTimeout(() => setIsCardFlipped(true), 500)
  }, [currentPlayerIndex])

  useEffect(() => {
    if (timer > 0 && !isPaused) {
      const timeout = setTimeout(() => {
        setTimer(timer - 1)
        if (timer === 10) setAnimatingTimer(true) // Animation d'urgence
      }, 1000)
      return () => clearTimeout(timeout)
    } else if (timer === 0) {
      // Temps écoulé = refus automatique
      handleDecline()
    }
  }, [timer, isPaused])

  const handleAccept = () => {
    updatePlayerScore(currentPlayer.id, 1)
    checkWin()
    nextTurn()
  }

  const handleDecline = () => {
    updatePlayerScore(currentPlayer.id, -1.5)
    checkWin()
    nextTurn()
  }

  const nextTurn = () => {
    nextPlayer()
    setTimer(defaultTimer)
    setAnimatingTimer(false)
    setIsCardFlipped(false)
  }

  const checkWin = () => {
    const winner = players.find(p => (p.score || 0) >= 20)
    if (winner) {
      setTimeout(() => onFinish({ winner, scores: players }), 1000)
    }
  }

  const handlePauseToggle = () => {
    setIsPaused(!isPaused)
  }

  const handleQuitGame = () => {
    setShowPauseOptions(false)
    // Ici on devrait retourner au menu principal
    if (window.confirm('Retourner au menu principal ?')) {
      window.location.reload() // Solution simple pour demo
    }
  }

  const handleRestartGame = () => {
    setShowPauseOptions(false)
    // Reset de la partie
    window.location.reload() // Solution simple pour demo
  }

  const handleTimerChange = (newTimer) => {
    setDefaultTimer(newTimer)
    setTimer(newTimer)
  }

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId)
    // Ici on appliquerait le thème à l'interface
  }

  const timerPercentage = (timer / defaultTimer) * 100
  const strokeDashoffset = circumference - (timerPercentage / 100) * circumference

  return (
    <div className="flex gap-8 items-start animate-slide-in-right">
      
      {/* Panel joueurs */}
      <div className="flex flex-col gap-4">
        {/* Bouton pause en haut */}
        <button 
          onClick={() => setShowPauseOptions(true)}
          className="glass-button px-4 py-2 text-white font-medium hover-lift flex items-center gap-2"
        >
          ⏸️ Options
        </button>

        <div className="grid grid-cols-2 gap-4">
          {players.map((player, index) => (
            <div 
              key={player.id} 
              className={`glass-card p-4 text-center transition-all duration-500 hover-glow ${
                index === currentPlayerIndex ? 'ring-2 ring-white scale-105' : ''
              }`}
            >
              <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden">
                <img 
                  src={player.avatar} 
                  alt={player.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback avec initiale
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `<div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">${player.name.charAt(0).toUpperCase()}</div>`
                  }}
                />
              </div>
              <div className="font-semibold">{player.name}</div>
              <div className="text-sm opacity-80">{player.score || 0} pts</div>
              {index === currentPlayerIndex && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-xs animate-pulse">
                  👑
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Boutons d'action avec effets avancés */}
        <div className="flex gap-4">
          <button 
            onClick={handleAccept} 
            disabled={isPaused}
            className={`flex-1 py-4 rounded-full bg-gradient-to-b from-[#5CD96E] to-[#34C759] text-white font-semibold hover-lift button-particles relative overflow-hidden group ${
              isPaused ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="relative z-10">✅ Accepter</span>
            {!isPaused && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            )}
          </button>
          
          <button 
            onClick={handleDecline} 
            disabled={isPaused}
            className={`flex-1 py-4 rounded-full bg-gradient-to-b from-[#FF5F58] to-[#FF3B30] text-white font-semibold hover-lift button-particles relative overflow-hidden group ${
              isPaused ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="relative z-10">❌ Refuser</span>
            {!isPaused && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            )}
          </button>
        </div>
      </div>

      {/* Carte avec timer circulaire et flip 3D */}
      <div className="flex flex-col items-center gap-6">
        
        {/* Timer circulaire premium avec état pause */}
        <div className="relative flex items-center justify-center">
          <svg className="timer-circle" width="120" height="120">
            <defs>
              <linearGradient id="timer-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5CD96E" />
                <stop offset="50%" stopColor="#FF6AC0" />
                <stop offset="100%" stopColor="#FF3B30" />
              </linearGradient>
            </defs>
            
            {/* Cercle de fond */}
            <circle
              cx="60"
              cy="60"
              r="50"
              className="timer-background"
            />
            
            {/* Cercle de progression */}
            <circle
              cx="60"
              cy="60"
              r="50"
              className="timer-progress"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: isPaused ? strokeDashoffset : strokeDashoffset,
                transition: animatingTimer && !isPaused ? 'stroke-dashoffset 0.1s linear' : 'stroke-dashoffset 1s linear'
              }}
            />
          </svg>
          
          {/* Texte du timer au centre avec état pause */}
          <div className={`absolute inset-0 flex items-center justify-center ${
            isPaused 
              ? 'text-yellow-300 text-xl font-bold' 
              : timer <= 10 
                ? 'text-red-300 animate-pulse text-3xl font-bold' 
                : 'text-white text-3xl font-bold'
          }`}>
            {isPaused ? '⏸️' : timer}
          </div>
        </div>

        {/* Carte avec flip 3D */}
        <div className={`card-flip-container ${isCardFlipped ? 'flipped' : ''}`}>
          <div className="card-flip-inner">
            
            {/* Face avant - dos de carte */}
            <div className="card-front">
              <div className="text-center">
                <div className="text-6xl mb-4">🎴</div>
                <div className="text-lg font-semibold">Truth or Dare</div>
                <div className="text-sm opacity-70">HOT</div>
              </div>
            </div>
            
            {/* Face arrière - contenu de la carte */}
            <div className="card-back">
              <div className="text-center h-full flex flex-col justify-center">
                <div className="text-xl font-bold mb-3 capitalize">
                  {currentCard?.type === 'action' ? '🎯 Action' : '💭 Truth'}
                </div>
                <div className="text-base leading-relaxed">
                  {currentCard?.text}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur du joueur actuel */}
        <div className="glass-card px-6 py-3 text-center animate-bounce-in">
          <div className="text-sm opacity-80">C'est le tour de</div>
          <div className="text-xl font-bold">{currentPlayer?.name}</div>
          {isPaused && (
            <div className="text-sm text-yellow-300 mt-1">⏸️ Partie en pause</div>
          )}
        </div>
      </div>

      {/* Composant PauseOptions */}
      <PauseOptions 
        isVisible={showPauseOptions}
        onClose={() => setShowPauseOptions(false)}
        onQuitGame={handleQuitGame}
        onRestartGame={handleRestartGame}
        currentTimer={defaultTimer}
        onTimerChange={handleTimerChange}
        onThemeChange={handleThemeChange}
        isPaused={isPaused}
        onPauseToggle={handlePauseToggle}
      />
    </div>
  )
}
