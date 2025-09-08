import { useState } from 'react'

export default function DiceScene({ players, diceResults, onDiceResult, allPlayersRolled, onStart, onCancel, selectedDeck }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [isRolling, setIsRolling] = useState(false)
  const [diceAnimation, setDiceAnimation] = useState('')

  const currentPlayer = players[currentPlayerIndex]

  const deckInfo = {
    soft: { name: "SOFT", emoji: "💕", color: "text-green-300" },
    hot: { name: "HOT", emoji: "🔥", color: "text-pink-300" },
    extreme: { name: "EXTREME", emoji: "💀", color: "text-red-300" }
  }

  const getDiceFace = (number) => {
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
    return faces[number - 1] || '⚀'
  }

  const rollDice = () => {
    if (isRolling) return
    setIsRolling(true)
    setDiceAnimation('animate-spin')
    
    // Animation de roulement pendant 1.5s
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1
      onDiceResult(currentPlayer.id, result)
      setIsRolling(false)
      setDiceAnimation('animate-bounce-in')
      
      // Passer au joueur suivant après une pause
      setTimeout(() => {
        if (currentPlayerIndex < players.length - 1) {
          setCurrentPlayerIndex(currentPlayerIndex + 1)
          setDiceAnimation('')
        }
      }, 1000)
    }, 1500)
  }

  return (
    <div className="glass-premium w-[500px] max-w-full p-8 flex flex-col items-center gap-6 animate-fade-scale-in">
      
      <div className="text-center animate-bounce-in">
        <h1 className="text-3xl font-bold mb-2">🎲 Lancer de Dés</h1>
        {selectedDeck && (
          <div className="glass-card px-4 py-2 text-center mb-2">
            <span className={`text-lg font-semibold ${deckInfo[selectedDeck]?.color}`}>
              {deckInfo[selectedDeck]?.emoji} Deck {deckInfo[selectedDeck]?.name}
            </span>
          </div>
        )}
        <p className="text-white/80">Le plus haut score commence !</p>
      </div>
      
      {/* Dé 3D avec CSS */}
      <div className="relative perspective-1000">
        <div 
          className={`w-24 h-24 bg-gradient-to-br from-white to-gray-200 rounded-lg flex items-center justify-center text-4xl font-bold text-gray-800 cursor-pointer shadow-2xl transform-gpu transition-all duration-300 hover:scale-110 ${diceAnimation} ${
            isRolling ? 'animate-spin' : 'hover:rotate-12'
          }`}
          onClick={rollDice}
          style={{
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
            background: isRolling 
              ? 'linear-gradient(45deg, #ff6ac0, #5c6bff, #5cd96e)' 
              : 'linear-gradient(135deg, #ffffff, #f0f0f0)'
          }}
        >
          {isRolling ? '🌀' : getDiceFace(diceResults[currentPlayer?.id] || 1)}
        </div>
        
        {/* Ombre du dé */}
        <div className="absolute top-24 left-2 w-20 h-8 bg-black/20 rounded-full blur-sm transform scale-x-75"></div>
      </div>

      {/* Joueur actuel */}
      {currentPlayer && (
        <div className="text-center glass-card p-4 animate-slide-in-right">
          <div className="flex items-center gap-3 justify-center mb-2">
            <img 
              src={currentPlayer.avatar} 
              alt={currentPlayer.name}
              className="w-12 h-12 rounded-full"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.parentElement.innerHTML += `<div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">${currentPlayer.name.charAt(0).toUpperCase()}</div>`
              }}
            />
            <div>
              <div className="font-semibold">Au tour de: {currentPlayer.name}</div>
              {diceResults[currentPlayer.id] && (
                <div className="text-yellow-300 font-bold">
                  Résultat: {diceResults[currentPlayer.id]} {getDiceFace(diceResults[currentPlayer.id])}
                </div>
              )}
            </div>
          </div>
          
          {!diceResults[currentPlayer.id] && !isRolling && (
            <div className="text-sm text-white/70 animate-pulse">
              👆 Cliquez sur le dé pour lancer !
            </div>
          )}
        </div>
      )}

      {/* Grille des résultats */}
      <div className="grid grid-cols-2 gap-3 w-full animate-slide-in-left">
        {players.map((player, index) => (
          <div 
            key={player.id} 
            className={`glass-card p-3 text-center transition-all duration-500 ${
              index === currentPlayerIndex ? 'ring-2 ring-yellow-400 scale-105' : ''
            } ${
              diceResults[player.id] ? 'bg-green-500/20' : 'bg-white/10'
            }`}
          >
            <div className="flex items-center gap-2 justify-center">
              <img 
                src={player.avatar} 
                alt={player.name}
                className="w-8 h-8 rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML += `<div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">${player.name.charAt(0).toUpperCase()}</div>`
                }}
              />
              <div className="font-semibold">{player.name}</div>
            </div>
            <div className="text-lg font-bold mt-1">
              {diceResults[player.id] ? (
                <span className="text-yellow-300">
                  {diceResults[player.id]} {getDiceFace(diceResults[player.id])}
                </span>
              ) : (
                <span className="text-white/50">—</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-3">
        {allPlayersRolled() && (
          <button 
            onClick={onStart} 
            className="w-full rounded-full py-4 font-semibold text-white bg-gradient-to-b from-[#5CD96E] to-[#34C759] hover-lift button-particles animate-bounce-in"
          >
            🚀 Commencer la partie !
          </button>
        )}
        
        <button 
          onClick={onCancel} 
          className="text-white/70 hover:text-white transition-colors"
        >
          ← Retour au sélecteur de deck
        </button>
      </div>
    </div>
  )
}
