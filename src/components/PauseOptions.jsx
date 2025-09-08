import { useState, useEffect } from 'react'
import { premiumService } from '../data/premiumSystem'

export default function PauseOptions({ 
  isVisible, 
  onClose, 
  onQuitGame, 
  onRestartGame,
  currentTimer,
  onTimerChange,
  onThemeChange,
  isPaused,
  onPauseToggle
}) {
  const [activeTab, setActiveTab] = useState('game')
  const [premiumState, setPremiumState] = useState(premiumService.getState())
  const [audioSettings, setAudioSettings] = useState({
    masterVolume: 80,
    musicVolume: 70,
    effectsVolume: 85,
    isMuted: false
  })

  // Onglets disponibles
  const tabs = [
    { id: 'game', name: 'Partie', icon: '🎮' },
    { id: 'audio', name: 'Audio', icon: '🔊' },
    { id: 'display', name: 'Affichage', icon: '🎨' },
    { id: 'premium', name: 'Premium', icon: '💎' }
  ]

  const timerOptions = [15, 30, 45, 60]

  const handleQuit = () => {
    if (window.confirm('Quitter la partie ? Votre progression sera perdue.')) {
      onQuitGame()
    }
  }

  const handleRestart = () => {
    if (window.confirm('Redémarrer la partie ? Tout sera remis à zéro.')) {
      onRestartGame()
    }
  }

  const togglePremium = () => {
    if (premiumState.isSubscribed) {
      premiumService.deactivatePremium()
    } else {
      premiumService.activatePremium()
    }
    setPremiumState(premiumService.getState())
  }

  const handleThemeChange = (themeId) => {
    if (premiumService.setTheme(themeId)) {
      onThemeChange(themeId)
      setPremiumState(premiumService.getState())
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-premium w-[600px] max-w-full max-h-[80vh] overflow-hidden animate-fade-scale-in">
        
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">⏸️ Options de Partie</h2>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Navigation onglets */}
        <div className="flex border-b border-white/10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-white/20 text-white border-b-2 border-white' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>

        {/* Contenu onglets */}
        <div className="p-6 max-h-96 overflow-y-auto">
          
          {/* Onglet Partie */}
          {activeTab === 'game' && (
            <div className="space-y-4">
              {/* Contrôles pause */}
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-3">Contrôles de Partie</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={onPauseToggle}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors ${
                      isPaused 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    }`}
                  >
                    {isPaused ? '▶️ Reprendre' : '⏸️ Pause'}
                  </button>
                  
                  <button 
                    onClick={handleRestart}
                    className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                  >
                    🔄 Redémarrer
                  </button>
                </div>
              </div>

              {/* Timer settings */}
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-3">Durée du Timer</h3>
                <div className="grid grid-cols-4 gap-2">
                  {timerOptions.map((seconds) => (
                    <button
                      key={seconds}
                      onClick={() => onTimerChange(seconds)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        currentTimer === seconds
                          ? 'bg-white text-purple-600'
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                    >
                      {seconds}s
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions rapides */}
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-3">Actions</h3>
                <div className="space-y-2">
                  <button 
                    onClick={handleQuit}
                    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
                  >
                    🚪 Quitter la Partie
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Onglet Audio */}
          {activeTab === 'audio' && (
            <div className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-3">Contrôles Audio</h3>
                
                {/* Master Volume */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Volume Principal</label>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">0</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={audioSettings.masterVolume}
                      onChange={(e) => setAudioSettings(prev => ({...prev, masterVolume: e.target.value}))}
                      className="flex-1"
                    />
                    <span className="text-sm">100</span>
                    <span className="text-sm font-medium w-8">{audioSettings.masterVolume}</span>
                  </div>
                </div>

                {/* Music Volume */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Musique</label>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">0</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={audioSettings.musicVolume}
                      onChange={(e) => setAudioSettings(prev => ({...prev, musicVolume: e.target.value}))}
                      className="flex-1"
                    />
                    <span className="text-sm">100</span>
                    <span className="text-sm font-medium w-8">{audioSettings.musicVolume}</span>
                  </div>
                </div>

                {/* Effects Volume */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Effets Sonores</label>
                  <div className="flex items-center gap-3">
                    <span className="text-sm">0</span>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={audioSettings.effectsVolume}
                      onChange={(e) => setAudioSettings(prev => ({...prev, effectsVolume: e.target.value}))}
                      className="flex-1"
                    />
                    <span className="text-sm">100</span>
                    <span className="text-sm font-medium w-8">{audioSettings.effectsVolume}</span>
                  </div>
                </div>

                {/* Mute toggle */}
                <button
                  onClick={() => setAudioSettings(prev => ({...prev, isMuted: !prev.isMuted}))}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    audioSettings.isMuted 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {audioSettings.isMuted ? '🔇 Réactiver le son' : '🔊 Couper le son'}
                </button>
              </div>
            </div>
          )}

          {/* Onglet Affichage */}
          {activeTab === 'display' && (
            <div className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-3">Thèmes Visuels</h3>
                
                {/* Thème par défaut */}
                <div 
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all mb-2 ${
                    premiumState.currentTheme === 'default' 
                      ? 'border-white bg-white/20' 
                      : 'border-white/30 hover:border-white/50'
                  }`}
                  onClick={() => handleThemeChange('default')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-r from-purple-400 to-pink-400"></div>
                    <div>
                      <div className="font-medium">Thème Par Défaut</div>
                      <div className="text-sm text-white/70">Gratuit</div>
                    </div>
                  </div>
                </div>

                {/* Thèmes premium */}
                {premiumService.getState().availableThemes.includes('gold') && (
                  <>
                    <div 
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all mb-2 ${
                        premiumState.currentTheme === 'gold' 
                          ? 'border-white bg-white/20' 
                          : 'border-white/30 hover:border-white/50'
                      }`}
                      onClick={() => handleThemeChange('gold')}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                        <div>
                          <div className="font-medium">✨ Gold Premium</div>
                          <div className="text-sm text-yellow-300">Premium</div>
                        </div>
                      </div>
                    </div>

                    <div 
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all mb-2 ${
                        premiumState.currentTheme === 'dark_diamond' 
                          ? 'border-white bg-white/20' 
                          : 'border-white/30 hover:border-white/50'
                      }`}
                      onClick={() => handleThemeChange('dark_diamond')}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gradient-to-r from-gray-800 to-purple-900"></div>
                        <div>
                          <div className="font-medium">💎 Dark Diamond</div>
                          <div className="text-sm text-purple-300">Premium</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Lock pour non-premium */}
                {!premiumState.isSubscribed && (
                  <div className="p-3 rounded-lg border-2 border-white/20 bg-white/10 opacity-60">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gradient-to-r from-yellow-400 to-yellow-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center text-sm">🔒</div>
                      </div>
                      <div>
                        <div className="font-medium">Thèmes Premium</div>
                        <div className="text-sm text-white/70">Abonnement requis</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Onglet Premium */}
          {activeTab === 'premium' && (
            <div className="space-y-4">
              <div className="glass-card p-4">
                <h3 className="font-semibold mb-3">💎 Abonnement Premium</h3>
                
                {premiumState.isSubscribed ? (
                  <div className="text-center">
                    <div className="text-green-400 font-semibold mb-2">✅ Abonnement Actif</div>
                    <div className="text-sm text-white/70 mb-4">
                      Accès complet à tous les contenus premium
                    </div>
                    <button 
                      onClick={togglePremium}
                      className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                    >
                      Annuler l'abonnement (TEST)
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-yellow-400">4,99€/mois</div>
                      <div className="text-sm text-white/70">Accès complet premium</div>
                    </div>
                    
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Deck EXTREME débloqué</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>4 thèmes premium exclusifs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Statistiques avancées</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        <span>Modes de jeu exclusifs</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={togglePremium}
                      className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all"
                    >
                      💎 S'abonner (TEST)
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/20 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}
