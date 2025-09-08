import { useState, useEffect } from 'react'
import { useAudio } from '../hooks/useAudio'
import { premiumService, premiumConfig } from '../data/premiumSystem'

export default function PremiumContentMenu({ onClose, onBack }) {
  const [activeTab, setActiveTab] = useState('subscription')
  const [premiumState, setPremiumState] = useState(premiumService.getState())
  const { playClick, playSelect, playUnlock } = useAudio()

  const tabs = [
    { id: 'subscription', name: 'Abonnement', icon: '💎' },
    { id: 'themes', name: 'Thèmes', icon: '🎨' },
    { id: 'decks', name: 'Decks VIP', icon: '🃏' },
    { id: 'features', name: 'Fonctionnalités', icon: '⭐' }
  ]

  const handleTabChange = (tabId) => {
    playSelect()
    setActiveTab(tabId)
  }

  const handleSubscribe = () => {
    playUnlock()
    // Simulation d'activation premium
    premiumService.activatePremium()
    setPremiumState(premiumService.getState())
  }

  const handleCancel = () => {
    playClick()
    if (confirm('Annuler l\'abonnement Premium ?')) {
      premiumService.deactivatePremium()
      setPremiumState(premiumService.getState())
    }
  }

  const handleThemeSelect = (themeId) => {
    if (premiumState.isSubscribed) {
      playSelect()
      premiumService.setTheme(themeId)
      setPremiumState(premiumService.getState())
    } else {
      playClick()
      alert('Abonnement Premium requis pour les thèmes exclusifs')
    }
  }

  return (
    <div className="glass-premium w-[700px] max-w-full max-h-[85vh] overflow-hidden animate-fade-scale-in">
      
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { playClick(); onBack(); }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              ←
            </button>
            <h2 className="text-2xl font-bold">💎 Premium Content</h2>
            {premiumState.isSubscribed && (
              <span className="px-3 py-1 bg-yellow-500 text-black text-sm font-bold rounded-full">
                PREMIUM
              </span>
            )}
          </div>
          <button 
            onClick={() => { playClick(); onClose(); }}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Navigation onglets */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-shrink-0 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'bg-white/20 text-white border-b-2 border-white' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.icon} {tab.name}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="p-6 max-h-96 overflow-y-auto">
        
        {/* Onglet Abonnement */}
        {activeTab === 'subscription' && (
          <div className="space-y-4">
            
            {premiumState.isSubscribed ? (
              /* État Premium Actif */
              <div className="text-center">
                <div className="glass-card p-6 mb-4">
                  <div className="text-6xl mb-4">👑</div>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-2">Premium Actif</h3>
                  <p className="text-white/80 mb-4">
                    Vous avez accès à tous les contenus exclusifs
                  </p>
                  <div className="text-sm text-white/60">
                    Abonnement depuis le {new Date().toLocaleDateString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl mb-2">🃏</div>
                    <div className="font-semibold">Deck EXTREME</div>
                    <div className="text-sm text-green-400">Débloqué</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl mb-2">🎨</div>
                    <div className="font-semibold">4 Thèmes Premium</div>
                    <div className="text-sm text-green-400">Disponibles</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-semibold">Stats Avancées</div>
                    <div className="text-sm text-green-400">Activées</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl mb-2">🏆</div>
                    <div className="font-semibold">Achievements</div>
                    <div className="text-sm text-green-400">Débloqués</div>
                  </div>
                </div>

                <button 
                  onClick={handleCancel}
                  className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Annuler l'abonnement (TEST)
                </button>
              </div>
            ) : (
              /* État Premium Inactif */
              <div className="text-center">
                <div className="glass-card p-6 mb-4">
                  <div className="text-6xl mb-4">💎</div>
                  <h3 className="text-2xl font-bold mb-2">Débloquez Premium</h3>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">4,99€/mois</div>
                  <p className="text-white/80 mb-4">
                    Accès illimité à tous les contenus exclusifs
                  </p>
                </div>

                {/* Avantages Premium */}
                <div className="glass-card p-4 mb-4">
                  <h4 className="font-semibold mb-3">Avantages Premium :</h4>
                  <div className="space-y-2 text-sm text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Deck EXTREME débloqué (100 cartes hardcore)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>4 thèmes visuels exclusifs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Statistiques de jeu avancées</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Système d'achievements et badges</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Mode Tournoi et défis spéciaux</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span>Support prioritaire</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleSubscribe}
                  className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-lg rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105"
                >
                  💎 S'abonner maintenant (TEST)
                </button>

                <p className="text-xs text-white/60 mt-3">
                  Résiliation possible à tout moment • Version de test
                </p>
              </div>
            )}
          </div>
        )}

        {/* Onglet Thèmes */}
        {activeTab === 'themes' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {premiumConfig.premiumThemes.map((theme) => (
                <div 
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`glass-card p-4 cursor-pointer transition-all hover-lift ${
                    premiumState.currentTheme === theme.id ? 'ring-2 ring-yellow-400' : ''
                  } ${!premiumState.isSubscribed ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${theme.gradient} flex items-center justify-center text-2xl`}>
                      {theme.preview}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{theme.name}</h4>
                      <p className="text-sm text-white/70">{theme.description}</p>
                      {premiumState.currentTheme === theme.id && (
                        <span className="text-xs text-green-400 font-semibold">ACTUEL</span>
                      )}
                    </div>
                    {!premiumState.isSubscribed && (
                      <div className="text-yellow-400">🔒</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {!premiumState.isSubscribed && (
              <div className="text-center text-white/60 text-sm">
                Abonnement Premium requis pour utiliser les thèmes exclusifs
              </div>
            )}
          </div>
        )}

        {/* Onglet Decks VIP */}
        {activeTab === 'decks' && (
          <div className="space-y-4">
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">🃏 Deck EXTREME</h3>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-black rounded-lg flex items-center justify-center text-2xl">
                  💀
                </div>
                <div className="flex-1">
                  <h4 className="font-bold">100 cartes hardcore</h4>
                  <p className="text-sm text-white/70">Contenu très osé pour couples expérimentés</p>
                </div>
                {premiumState.isSubscribed ? (
                  <span className="text-green-400 font-semibold">DÉBLOQUÉ</span>
                ) : (
                  <span className="text-red-400 font-semibold">VERROUILLÉ</span>
                )}
              </div>
              <div className="text-xs text-white/60">
                ⚠️ Contenu adulte explicite - 18+ uniquement
              </div>
            </div>

            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">🎯 Decks à venir</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-8 h-8 bg-purple-500 rounded"></div>
                  <div className="flex-1">
                    <div className="font-medium">Deck Couple Pro</div>
                    <div className="text-xs text-white/70">Relations longue durée</div>
                  </div>
                  <span className="text-xs text-yellow-400">BIENTÔT</span>
                </div>
                <div className="flex items-center gap-3 opacity-60">
                  <div className="w-8 h-8 bg-green-500 rounded"></div>
                  <div className="flex-1">
                    <div className="font-medium">Deck Fêtes</div>
                    <div className="text-xs text-white/70">Spécial soirées</div>
                  </div>
                  <span className="text-xs text-yellow-400">BIENTÔT</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Fonctionnalités */}
        {activeTab === 'features' && (
          <div className="space-y-4">
            
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">📊 Statistiques Avancées</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Parties jouées</span>
                  <span className="font-bold">247</span>
                </div>
                <div className="flex justify-between">
                  <span>Défis acceptés</span>
                  <span className="font-bold">78%</span>
                </div>
                <div className="flex justify-between">
                  <span>Deck préféré</span>
                  <span className="font-bold">HOT 🔥</span>
                </div>
                <div className="flex justify-between">
                  <span>Temps de jeu total</span>
                  <span className="font-bold">42h 15m</span>
                </div>
              </div>
              {!premiumState.isSubscribed && (
                <div className="mt-3 text-center text-yellow-400 text-sm">
                  🔒 Statistiques détaillées disponibles avec Premium
                </div>
              )}
            </div>

            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">🏆 Achievements</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: '🎯', name: 'Premier défi', unlocked: true },
                  { icon: '🔥', name: '100 parties', unlocked: true },
                  { icon: '💀', name: 'Extreme master', unlocked: premiumState.isSubscribed },
                  { icon: '👑', name: 'Premium user', unlocked: premiumState.isSubscribed },
                  { icon: '⚡', name: 'Speed runner', unlocked: false },
                  { icon: '💎', name: 'Collector', unlocked: false }
                ].map((achievement, index) => (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg text-center transition-all ${
                      achievement.unlocked 
                        ? 'bg-yellow-500/20 text-yellow-300' 
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <div className="text-xs font-medium">{achievement.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">🎮 Modes de jeu exclusifs</h3>
              <div className="space-y-3">
                <div className={`p-3 rounded-lg ${premiumState.isSubscribed ? 'bg-green-500/20' : 'bg-white/10 opacity-60'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🏁</span>
                    <div className="flex-1">
                      <div className="font-medium">Mode Tournoi</div>
                      <div className="text-xs text-white/70">Élimination progressive</div>
                    </div>
                    {premiumState.isSubscribed ? (
                      <span className="text-green-400 text-sm">DISPONIBLE</span>
                    ) : (
                      <span className="text-yellow-400 text-sm">PREMIUM</span>
                    )}
                  </div>
                </div>
                
                <div className={`p-3 rounded-lg ${premiumState.isSubscribed ? 'bg-green-500/20' : 'bg-white/10 opacity-60'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">⏱️</span>
                    <div className="flex-1">
                      <div className="font-medium">Défis Chrono</div>
                      <div className="text-xs text-white/70">Contre la montre</div>
                    </div>
                    {premiumState.isSubscribed ? (
                      <span className="text-green-400 text-sm">DISPONIBLE</span>
                    ) : (
                      <span className="text-yellow-400 text-sm">PREMIUM</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/20 flex justify-end">
        <button 
          onClick={() => { playClick(); onClose(); }}
          className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
        >
          Fermer
        </button>
      </div>
    </div>
  )
}
