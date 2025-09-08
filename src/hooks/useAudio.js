// useAudio.js - Hook React pour la gestion audio
import { useEffect, useState } from 'react'

// Mock audio manager simple pour éviter les erreurs
const mockAudioManager = {
  getState: () => ({
    masterVolume: 0.8,
    musicVolume: 0.7,
    effectsVolume: 0.85,
    isMuted: false,
    isInitialized: false
  }),
  setMasterVolume: () => {},
  setMusicVolume: () => {},
  setEffectsVolume: () => {},
  setMuted: () => {},
  initialize: async () => {}
}

export const useAudio = () => {
  const [audioState, setAudioState] = useState(mockAudioManager.getState())
  const [isReady, setIsReady] = useState(false)

  const initializeAudio = async () => {
    await mockAudioManager.initialize()
    setIsReady(true)
  }

  const updateAudioSettings = (settings) => {
    if (settings.masterVolume !== undefined) {
      mockAudioManager.setMasterVolume(settings.masterVolume / 100)
    }
    if (settings.musicVolume !== undefined) {
      mockAudioManager.setMusicVolume(settings.musicVolume / 100)
    }
    if (settings.effectsVolume !== undefined) {
      mockAudioManager.setEffectsVolume(settings.effectsVolume / 100)
    }
    if (settings.isMuted !== undefined) {
      mockAudioManager.setMuted(settings.isMuted)
    }
    
    setAudioState(mockAudioManager.getState())
  }

  // Mock functions pour éviter les erreurs
  const playClick = () => console.log('🎵 Click sound')
  const playSelect = () => console.log('🎵 Select sound')
  const playTransition = () => console.log('🎵 Transition sound')
  const playCardFlip = () => console.log('🎵 Card flip sound')
  const playDiceRoll = () => console.log('🎲 Dice roll sound')
  const playAccept = () => console.log('✅ Accept sound')
  const playDecline = () => console.log('❌ Decline sound')
  const playTimerTick = () => console.log('⏰ Timer tick')
  const playTimerWarning = () => console.log('⚠️ Timer warning')
  const playUnlock = () => console.log('🔓 Unlock sound')
  const playNotification = () => console.log('🔔 Notification')
  const playMenuMusic = () => console.log('🎵 Menu music')
  const playDeckMusic = (deck) => console.log(`🎵 ${deck} deck music`)
  const playVictoryMusic = () => console.log('🎵 Victory music')
  const stopMusic = () => console.log('⏹️ Stop music')

  return {
    audioState,
    isReady,
    initializeAudio,
    updateAudioSettings,
    playClick,
    playSelect,
    playTransition,
    playCardFlip,
    playDiceRoll,
    playAccept,
    playDecline,
    playTimerTick,
    playTimerWarning,
    playUnlock,
    playNotification,
    playMenuMusic,
    playDeckMusic,
    playVictoryMusic,
    stopMusic
  }
}

export const useContextualMusic = (context) => {
  const { playMenuMusic, playDeckMusic, stopMusic } = useAudio()

  useEffect(() => {
    switch (context) {
      case 'menu':
        playMenuMusic()
        break
      case 'soft':
      case 'hot':
      case 'extreme':
        playDeckMusic(context)
        break
      case 'silent':
        stopMusic()
        break
      default:
        break
    }
  }, [context])
}
