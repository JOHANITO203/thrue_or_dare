// audioManager.js - Gestionnaire audio complet
class AudioManager {
  constructor() {
    this.audioContext = null
    this.masterVolume = 0.8
    this.musicVolume = 0.7
    this.effectsVolume = 0.85
    this.isMuted = false
    this.currentMusic = null
    this.sounds = {}
    this.musicTracks = {}
    this.isInitialized = false
    
    // URLs des pistes audio (CDN ou assets locaux)
    this.audioSources = {
      music: {
        menu: '/assets/audio/music/menu_ambient.mp3',
        soft: '/assets/audio/music/soft_romantic.mp3', 
        hot: '/assets/audio/music/hot_sensual.mp3',
        extreme: '/assets/audio/music/extreme_intense.mp3',
        victory: '/assets/audio/music/victory_celebration.mp3'
      },
      effects: {
        click: '/assets/audio/effects/click.mp3',
        select: '/assets/audio/effects/select.mp3',
        flip_card: '/assets/audio/effects/card_flip.mp3',
        dice_roll: '/assets/audio/effects/dice_roll.mp3',
        timer_tick: '/assets/audio/effects/timer_tick.mp3',
        timer_warning: '/assets/audio/effects/timer_warning.mp3',
        accept: '/assets/audio/effects/accept_positive.mp3',
        decline: '/assets/audio/effects/decline_negative.mp3',
        transition: '/assets/audio/effects/transition_whoosh.mp3',
        unlock: '/assets/audio/effects/premium_unlock.mp3',
        notification: '/assets/audio/effects/notification.mp3'
      }
    }
  }

  // Initialiser le contexte audio (nécessaire après interaction utilisateur)
  async initialize() {
    if (this.isInitialized) return

    try {
      // Créer le contexte audio
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      
      // Précharger les effets sonores essentiels
      await this.preloadEssentialSounds()
      
      this.isInitialized = true
      console.log('AudioManager initialized successfully')
    } catch (error) {
      console.warn('Audio initialization failed:', error)
      // Mode silencieux si audio non supporté
      this.isInitialized = false
    }
  }

  // Précharger les sons essentiels
  async preloadEssentialSounds() {
    const essentialSounds = ['click', 'select', 'flip_card', 'accept', 'decline']
    
    for (const soundKey of essentialSounds) {
      try {
        await this.loadSound(soundKey, this.audioSources.effects[soundKey])
      } catch (error) {
        console.warn(`Failed to load sound ${soundKey}:`, error)
      }
    }
  }

  // Charger un son
  async loadSound(key, url) {
    try {
      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
      this.sounds[key] = audioBuffer
      return audioBuffer
    } catch (error) {
      // Fallback : créer un son synthétique si le fichier n'existe pas
      console.warn(`Sound file not found: ${url}, creating synthetic sound`)
      this.sounds[key] = this.createSyntheticSound(key)
      return this.sounds[key]
    }
  }

  // Créer des sons synthétiques comme fallback
  createSyntheticSound(type) {
    const sampleRate = this.audioContext.sampleRate
    let duration, frequency, waveType

    switch (type) {
      case 'click':
        duration = 0.1
        frequency = 800
        waveType = 'square'
        break
      case 'select':
        duration = 0.2
        frequency = 600
        waveType = 'sine'
        break
      case 'flip_card':
        duration = 0.3
        frequency = 400
        waveType = 'triangle'
        break
      case 'accept':
        duration = 0.4
        frequency = 523 // Do majeur
        waveType = 'sine'
        break
      case 'decline':
        duration = 0.4
        frequency = 311 // Mi bémol
        waveType = 'square'
        break
      default:
        duration = 0.2
        frequency = 440
        waveType = 'sine'
    }

    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate)
    const data = buffer.getChannelData(0)

    for (let i = 0; i < data.length; i++) {
      const t = i / sampleRate
      let sample

      switch (waveType) {
        case 'sine':
          sample = Math.sin(2 * Math.PI * frequency * t)
          break
        case 'square':
          sample = Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1
          break
        case 'triangle':
          sample = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * t))
          break
        default:
          sample = Math.sin(2 * Math.PI * frequency * t)
      }

      // Envelope pour éviter les clics
      const envelope = Math.min(t * 10, (duration - t) * 10, 1)
      data[i] = sample * envelope * 0.3
    }

    return buffer
  }

  // Jouer un effet sonore
  playSound(soundKey, volume = 1) {
    if (!this.isInitialized || this.isMuted || !this.sounds[soundKey]) return

    try {
      const source = this.audioContext.createBufferSource()
      const gainNode = this.audioContext.createGain()

      source.buffer = this.sounds[soundKey]
      source.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      const finalVolume = this.masterVolume * this.effectsVolume * volume
      gainNode.gain.setValueAtTime(finalVolume, this.audioContext.currentTime)

      source.start()
    } catch (error) {
      console.warn(`Failed to play sound ${soundKey}:`, error)
    }
  }

  // Jouer de la musique de fond
  async playMusic(trackKey, loop = true) {
    if (!this.isInitialized || this.isMuted) return

    // Arrêter la musique actuelle
    this.stopMusic()

    try {
      const trackUrl = this.audioSources.music[trackKey]
      if (!trackUrl) return

      // Créer un élément audio pour la musique (plus adapté que Web Audio API)
      const audio = new Audio(trackUrl)
      audio.volume = this.masterVolume * this.musicVolume
      audio.loop = loop
      
      // Fallback si fichier non trouvé : musique synthétique
      audio.onerror = () => {
        console.warn(`Music file not found: ${trackUrl}, using ambient synthesis`)
        this.playAmbientSynthesis(trackKey)
      }

      await audio.play()
      this.currentMusic = audio
    } catch (error) {
      console.warn(`Failed to play music ${trackKey}:`, error)
      // Fallback vers synthèse ambiante
      this.playAmbientSynthesis(trackKey)
    }
  }

  // Musique ambiante synthétique comme fallback
  playAmbientSynthesis(trackKey) {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    let frequency, waveType
    switch (trackKey) {
      case 'menu':
        frequency = 220 // La grave
        waveType = 'sine'
        break
      case 'soft':
        frequency = 261 // Do
        waveType = 'triangle'
        break
      case 'hot':
        frequency = 293 // Ré
        waveType = 'sawtooth'
        break
      case 'extreme':
        frequency = 311 // Mi bémol
        waveType = 'square'
        break
      default:
        frequency = 220
        waveType = 'sine'
    }

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
    oscillator.type = waveType
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.masterVolume * this.musicVolume * 0.1, this.audioContext.currentTime + 2)

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.start()
    this.currentMusic = { stop: () => oscillator.stop() }
  }

  // Arrêter la musique
  stopMusic() {
    if (this.currentMusic) {
      try {
        if (this.currentMusic.pause) {
          this.currentMusic.pause()
        } else if (this.currentMusic.stop) {
          this.currentMusic.stop()
        }
      } catch (error) {
        console.warn('Error stopping music:', error)
      }
      this.currentMusic = null
    }
  }

  // Mettre en sourdine
  setMuted(muted) {
    this.isMuted = muted
    if (muted) {
      this.stopMusic()
    }
  }

  // Définir les volumes
  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume))
    if (this.currentMusic && this.currentMusic.volume !== undefined) {
      this.currentMusic.volume = this.masterVolume * this.musicVolume
    }
  }

  setMusicVolume(volume) {
    this.musicVolume = Math.max(0, Math.min(1, volume))
    if (this.currentMusic && this.currentMusic.volume !== undefined) {
      this.currentMusic.volume = this.masterVolume * this.musicVolume
    }
  }

  setEffectsVolume(volume) {
    this.effectsVolume = Math.max(0, Math.min(1, volume))
  }

  // Obtenir l'état actuel
  getState() {
    return {
      masterVolume: this.masterVolume,
      musicVolume: this.musicVolume,
      effectsVolume: this.effectsVolume,
      isMuted: this.isMuted,
      isInitialized: this.isInitialized
    }
  }
}

// Instance globale
export const audioManager = new AudioManager()

// Helpers pour les composants
export const audioHelpers = {
  // Sons d'interface
  playClick: () => audioManager.playSound('click'),
  playSelect: () => audioManager.playSound('select'),
  playTransition: () => audioManager.playSound('transition'),
  
  // Sons de jeu
  playCardFlip: () => audioManager.playSound('flip_card'),
  playDiceRoll: () => audioManager.playSound('dice_roll'),
  playAccept: () => audioManager.playSound('accept'),
  playDecline: () => audioManager.playSound('decline'),
  
  // Sons de timer
  playTimerTick: () => audioManager.playSound('timer_tick', 0.5),
  playTimerWarning: () => audioManager.playSound('timer_warning'),
  
  // Sons premium
  playUnlock: () => audioManager.playSound('unlock'),
  playNotification: () => audioManager.playSound('notification'),
  
  // Musiques par contexte
  playMenuMusic: () => audioManager.playMusic('menu'),
  playDeckMusic: (deckType) => audioManager.playMusic(deckType),
  playVictoryMusic: () => audioManager.playMusic('victory', false),
  stopMusic: () => audioManager.stopMusic()
}
