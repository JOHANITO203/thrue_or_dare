import { useState } from 'react'

export default function PlayerForm({ onNext, onCancel }) {
  const [playerName, setPlayerName] = useState('')
  const [playerGender, setPlayerGender] = useState('male')
  const [players, setPlayers] = useState([])
  const [error, setError] = useState('')

  const getRandomAvatar = (gender) => {
    const folderName = gender === 'male' ? 'memoXY' : 'memoXX'
    const prefix = gender === 'male' ? 'male' : 'female'
    const avatarNumber = Math.floor(Math.random() * 25) + 1
    return `/assets/${folderName}/${prefix}_${String(avatarNumber).padStart(2, '0')}.png`
  }

  const addPlayer = () => {
    const trimmedName = playerName.trim()
    if (!trimmedName || players.length >= 4) return
    
    const newPlayer = {
      id: crypto.randomUUID(),
      name: trimmedName,
      gender: playerGender,
      avatar: getRandomAvatar(playerGender),
      score: 0
    }

    setPlayers([...players, newPlayer])
    setPlayerName('')
  }

  return (
    <div className="glass w-[420px] max-w-full p-6 flex flex-col gap-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-center">Nouvelle Partie</h1>
      
      <div className="glass p-4 flex flex-col gap-3">
        <input 
          type="text" 
          placeholder="Nom du joueur" 
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="p-2 rounded bg-white/20 placeholder-white/60 text-white"
        />
        <select 
          value={playerGender}
          onChange={(e) => setPlayerGender(e.target.value)}
          className="p-2 rounded bg-white/20 text-white"
        >
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>
        
        <button 
          onClick={addPlayer}
          className="rounded-full py-3 font-semibold text-white bg-gradient-to-b from-[#5C6BFF] to-[#7A00FF]"
        >
          + Ajouter un joueur
        </button>
      </div>

      {players.length > 0 && (
        <div className="glass p-4">
          <h3 className="text-lg font-semibold mb-3">Joueurs ({players.length}/4)</h3>
          {players.map((player) => (
            <div key={player.id} className="flex items-center gap-3 p-2 bg-white/10 rounded mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                {player.name.charAt(0).toUpperCase()}
              </div>
              <span>{player.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <button 
          onClick={() => onNext(players)}
          disabled={players.length < 2}
          className="rounded-full py-3 font-semibold text-white bg-gradient-to-b from-[#5CD96E] to-[#34C759] disabled:opacity-50"
        >
          Commencer ({players.length >= 2 ? 'Prêt' : `${2 - players.length} joueur manquant`})
        </button>
        
        <button onClick={onCancel} className="text-white/70 hover:text-white">
          ← Retour au menu
        </button>
      </div>
    </div>
  )
}
