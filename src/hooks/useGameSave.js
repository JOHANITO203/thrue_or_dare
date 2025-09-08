import { useState, useEffect, useCallback } from 'react'

const SAVE_KEY = 'truthOrDareHot_gameSave'

export const useGameSave = () => {
  const [hasSavedGame, setHasSavedGame] = useState(false)
  const [lastSaveDate, setLastSaveDate] = useState(null)

  useEffect(() => {
    checkForSavedGame()
  }, [])

  const checkForSavedGame = () => {
    try {
      const saved = localStorage.getItem(SAVE_KEY)
      if (saved) {
        const saveData = JSON.parse(saved)
        setHasSavedGame(true)
        setLastSaveDate(new Date(saveData.timestamp))
        return true
      }
    } catch (error) {
      console.warn('Erreur vérification sauvegarde:', error)
    }
    setHasSavedGame(false)
    setLastSaveDate(null)
    return false
  }

  const saveGame = useCallback((gameState) => {
    try {
      const saveData = {
        timestamp: new Date().toISOString(),
        gameState: {
          // Adapter à votre structure
          currentStep: gameState.currentStep,
          players: gameState.players,
          selectedDeck: gameState.selectedDeck,
          diceResults: gameState.diceResults,
          currentPlayerIndex: gameState.currentPlayerIndex,
          usedCards: gameState.usedCards || [],
          gameProgress: gameState.gameProgress || 0
        }
      }

      localStorage.setItem(SAVE_KEY, JSON.stringify(saveData))
      setHasSavedGame(true)
      setLastSaveDate(new Date())
      console.log('✅ Partie sauvegardée')
      return true
      
    } catch (error) {
      console.error('❌ Erreur sauvegarde:', error)
      return false
    }
  }, [])

  const loadGame = useCallback(() => {
    try {
      const saved = localStorage.getItem(SAVE_KEY)
      if (!saved) return null

      const saveData = JSON.parse(saved)
      console.log('✅ Partie chargée')
      return saveData.gameState
      
    } catch (error) {
      console.error('❌ Erreur chargement:', error)
      return null
    }
  }, [])

  const deleteSave = useCallback(() => {
    try {
      localStorage.removeItem(SAVE_KEY)
      setHasSavedGame(false)
      setLastSaveDate(null)
      console.log('✅ Sauvegarde supprimée')
      return true
    } catch (error) {
      console.error('❌ Erreur suppression:', error)
      return false
    }
  }, [])

  const getSaveInfo = useCallback(() => {
    if (!hasSavedGame) return null

    try {
      const saved = localStorage.getItem(SAVE_KEY)
      if (!saved) return null

      const saveData = JSON.parse(saved)
      const gameState = saveData.gameState

      return {
        timestamp: new Date(saveData.timestamp),
        playersCount: gameState.players?.length || 0,
        playersNames: gameState.players?.map(p => p.name) || [],
        selectedDeck: gameState.selectedDeck,
        currentStep: gameState.currentStep,
        hasProgress: gameState.gameProgress > 0
      }
    } catch (error) {
      console.warn('Erreur info sauvegarde:', error)
      return null
    }
  }, [hasSavedGame])

  return {
    hasSavedGame,
    lastSaveDate,
    saveGame,
    loadGame,
    deleteSave,
    getSaveInfo,
    checkForSavedGame
  }
}
