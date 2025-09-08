import { useState } from 'react'

export default function DiceScene({ players, diceResults, onDiceResult, allPlayersRolled, onStart, onCancel }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [isRolling, setIsRolling] = useState(false)

  const currentPlayer = players[currentPlayerIndex]

  const rollDice = () => {
    if (isRolling) return
    setIsRolling(true)
    
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1
      onDiceResult(currentPlayer.id, result)
      setIsRolling(false)
      
      if (currentPlayerIndex < players.length - 1) {
        setCurrentPlayerIndex(currentPlayerIndex + 1)
      }
    }, 1000)
  }

  return (
    <div className="glass w-[500px] max-w-full p-8 flex flex-col items-center gap-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Lancer de Dés</h1>
      
      <div 
        className={`w-24 h-24 bg-white rounded-lg flex items-center justify-center text-4xl font-bold text-gray-800 cursor-pointer ${
          isRolling ? 'animate-spin-dice' : 'hover:scale-110'
        }`}
        onClick={rollDice}
      >
        {isRolling ? '?' : (diceResults[currentPlayer?.id] || '⚀')}
      </div>

      {currentPlayer && (
        <div className="text-center">
          <p>Au tour de: <strong>{currentPlayer.name}</strong></p>
          {diceResults[currentPlayer.id] && <p>Résultat: {diceResults[currentPlayer.id]}</p>}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 w-full">
        {players.map((player) => (
          <div key={player.id} className="bg-white/10 p-3 rounded">
            <div>{player.name}</div>
            <div>Dé: {diceResults[player.id] || '—'}</div>
          </div>
        ))}
      </div>

      {allPlayersRolled() && (
        <button onClick={onStart} className="w-full rounded-full py-3 font-semibold text-white bg-gradient-to-b from-[#5CD96E] to-[#34C759]">
          Commencer la partie !
        </button>
      )}
      
      <button onClick={onCancel} className="text-white/70">← Retour</button>
    </div>
  )
}
