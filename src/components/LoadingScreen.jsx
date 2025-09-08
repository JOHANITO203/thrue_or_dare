import { useState, useEffect } from 'react'
import { useAudio } from '../hooks/useAudio'

export default function LoadingScreen({ 
  type = 'game', 
  onComplete, 
  duration = 3000,
  title = 'Chargement...',
  subtitle = 'Préparation en cours' 
}) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('')
  const { initializeAudio } = useAudio()

  const steps = {
    game: [
      'Initialisation du jeu...',
      'Chargement des ressources...',
      'Préparation de l\'interface...',
      'Configuration audio...',
      'Finalisation...'
    ],
    party: [
      'Préparation de la partie...',
      'Mélange des cartes...',
      'Configuration des joueurs...',
      'Lancement...'
    ],
    exit: [
      'Sauvegarde des données...',
      'Nettoyage de la session...',
      'Retour au menu...'
    ]
  }

  useEffect(() => {
    const stepsList = steps[type] || steps.game
    const stepDuration = duration / stepsList.length
    let currentStepIndex = 0

    const interval = setInterval(() => {
      const newProgress = ((currentStepIndex + 1) / stepsList.length) * 100
      setProgress(newProgress)
      setCurrentStep(stepsList[currentStepIndex])

      if (currentStepIndex === 0 && type === 'game') {
        // Initialiser l'audio au premier step
        initializeAudio()
      }

      currentStepIndex++

      if (currentStepIndex >= stepsList.length) {
        clearInterval(interval)
        setTimeout(() => {
          if (onComplete) onComplete()
        }, 300)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [type, duration, onComplete, initializeAudio])

  const getLoadingIcon = () => {
    switch (type) {
      case 'party': return '🎲'
      case 'exit': return '🚪'
      case 'game':
      default: return '🎮'
    }
  }

  const getBackgroundGradient = () => {
    switch (type) {
      case 'party': return 'from-green-600 via-blue-600 to-purple-600'
      case 'exit': return 'from-orange-600 via-red-600 to-pink-600'
      case 'game':
      default: return 'from-[#7a60ff] via-[#ff6ac0] to-[#ff9575]'
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} flex items-center justify-center p-4`}>
      <div className="glass-premium w-[500px] max-w-full p-8 text-center">
        
        {/* Icône animée */}
        <div className="text-8xl mb-6 animate-bounce">
          {getLoadingIcon()}
        </div>

        {/* Titre */}
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-white/80 mb-8">{subtitle}</p>

        {/* Barre de progression */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-white to-white/80 h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Pourcentage et étape */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-white/60">{Math.round(progress)}%</span>
          <span className="text-sm text-white/60">Truth or Dare HOT</span>
        </div>

        {/* Étape actuelle */}
        <div className="text-center">
          <p className="text-sm text-white/80 animate-pulse">
            {currentStep}
          </p>
        </div>

        {/* Animation de points */}
        <div className="flex justify-center mt-6 space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  )
}
