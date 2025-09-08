import { useState, useEffect } from 'react'

export default function GameBoard({ players, currentPlayerIndex, getRandomCard, markCardUsed, updatePlayerScore, nextPlayer, onFinish }) {
  const [currentCard, setCurrentCard] = useState(null)
  const [timer, setTimer] = useState(30)
  
  const currentPlayer = players[currentPlayerIndex]

  useEffect(() => {
    setCurrentCard(getRandomCard())
  }, [])

  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(timeout)
    }
  }, [timer])

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
    setCurrentCard(getRandomCard())
    setTimer(30)
  }

  const checkWin = () => {
    const winner = players.find(p => (p.score || 0) >= 20) // Seuil simplifié pour test
    if (winner) {
      setTimeout(() => onFinish({ winner, scores: players }), 1000)
    }
  }

  return (
    <div className="flex gap-8 items-start animate-fade-in">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          {players.map((player, index) => (
            <div key={player.id} className={`glass p-4 text-center ${index === currentPlayerIndex ? 'ring-2 ring-white' : ''}`}>
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold">
                {player.name.charAt(0)}
              </div>
              <div>{player.name}</div>
              <div>{player.score || 0} pts</div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-4">
          <button onClick={handleAccept} className="flex-1 py-3 rounded-full bg-gradient-to-b from-[#5CD96E] to-[#34C759] text-white font-semibold">
            Accepter
          </button>
          <button onClick={handleDecline} className="flex-1 py-3 rounded-full bg-gradient-to-b from-[#FF5F58] to-[#FF3B30] text-white font-semibold">
            Refuser
          </button>
        </div>
      </div>

      <div className="glass w-72 h-48 p-6">
        <div className="text-center">
          <div className="text-3xl font-bold mb-4">{timer}</div>
          <div className="font-semibold mb-2">{currentCard?.type === 'action' ? 'Action' : 'Truth'}</div>
          <div>{currentCard?.text}</div>
        </div>
      </div>
    </div>
  )
}
