import { useState, useEffect } from 'react'
import { useGameSave } from '../hooks/useGameSave'
import { useAudio } from '../hooks/useAudio'

export default function ResumeGameMenu({ onResume, onNewGame, onCancel }) {
  const { getSaveInfo, loadGame, deleteSave } = useGameSave()
  const { playClick, playSelect } = useAudio()
  const [saveInfo, setSaveInfo] = useState(null)

  useEffect(() => {
    const info = getSaveInfo()
    setSaveInfo(info)
  }, [getSaveInfo])

  const handleResume = () => {
    playSelect()
    const gameState = loadGame()
    if (gameState) {
      onResume(gameState)
    } else {
      alert('Erreur lors du chargement de la partie sauvegardée')
    }
  }

  const handleDelete = () => {
    playClick()
    if (confirm('Supprimer définitivement la partie sauvegardée ?')) {
      if (deleteSave()) {
        setSaveInfo(null)
      }
    }
  }

  if (!saveInfo) {
    return (
      <div className="glass-premium w-[500px] max-w-full p-8 text-center animate-fade-scale-in">
        <h2 className="text-2xl font-bold mb-4">⚠️ Aucune partie sauvegardée</h2>
        <p className="text-white/80 mb-6">Aucune partie en cours trouvée.</p>
        <div className="flex gap-3">
          <button 
            onClick={onNewGame}
            className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg font-semibold hover-lift"
          >
            🎮 Nouvelle Partie
          </button>
          <button 
            onClick={onCancel}
            className="px-6 py-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-premium w-[500px] max-w-full p-8 animate-fade-scale-in">
      
      {/* Titre */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">🔄 Reprendre la partie</h2>
        <p className="text-white/80">Une partie en cours a été trouvée</p>
      </div>

      {/* Info de la sauvegarde */}
      <div className="glass-card p-4 mb-6">
        <div className="text-center">
          <div className="text-sm text-white/60 mb-1">Sauvegardée le</div>
          <div className="font-semibold mb-3">
            {saveInfo.timestamp.toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
          
          <div className="text-sm text-white/60 mb-1">Joueurs ({saveInfo.playersCount})</div>
          <div className="font-semibold mb-3">
            {saveInfo.playersNames.slice(0, 3).join(', ')}
            {saveInfo.playersNames.length > 3 && ` +${saveInfo.playersNames.length - 3}`}
          </div>

          {saveInfo.selectedDeck && (
            <>
              <div className="text-sm text-white/60 mb-1">Deck</div>
              <div className="font-semibold">
                {saveInfo.selectedDeck.toUpperCase()}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        
        {/* Reprendre */}
        <button 
          onClick={handleResume}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover-lift button-particles"
        >
          🔄 Reprendre cette partie
        </button>

        {/* Nouvelle partie */}
        <button 
          onClick={onNewGame}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover-lift"
        >
          🎮 Commencer une nouvelle partie
        </button>

        {/* Actions secondaires */}
        <div className="flex gap-3">
          <button 
            onClick={handleDelete}
            className="flex-1 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
          >
            🗑️ Supprimer
          </button>
          <button 
            onClick={onCancel}
            className="flex-1 py-2 bg-white/20 text-white/70 rounded-lg hover:bg-white/30 transition-colors text-sm"
          >
            Retour
          </button>
        </div>
      </div>
    </div>
  )
}
