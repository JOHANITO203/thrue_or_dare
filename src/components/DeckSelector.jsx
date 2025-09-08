import { useState, useEffect } from 'react'
import { premiumService } from '../data/premiumSystem'

export default function DeckSelector({ onDeckSelected, onCancel }) {
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [premiumState, setPremiumState] = useState(premiumService.getState())

  const decks = [
    {
      id: 'soft',
      name: 'SOFT',
      emoji: '💕',
      level: 1,
      color: 'from-[#5CD96E] to-[#34C759]',
      description: 'Romantique et mignon',
      details: '100 cartes douces pour tous publics',
      audience: 'Famille • Amis • Couples débutants',
      preview: ['Câlins tendres', 'Baisers doux', 'Compliments', 'Gestes romantiques'],
      free: true
    },
    {
      id: 'hot', 
      name: 'HOT',
      emoji: '🔥',
      level: 2,
      color: 'from-[#FF6AC0] to-[#FF3B72]',
      description: 'Sensuel et épicé',
      details: '100 cartes sensuelles pour adultes',
      audience: 'Couples • Soirées entre adultes',
      preview: ['Baisers passionnés', 'Caresses intimes', 'Jeux de séduction', 'Strip-tease soft'],
      free: true
    },
    {
      id: 'extreme',
      name: 'EXTREME', 
      emoji: '💀',
      level: 3,
      color: 'from-[#FF3B30] to-[#8B0000]',
      description: 'Très osé et explicite',
      details: '100 cartes extrêmes pour couples confirmés',
      audience: '🔞 Couples expérimentés uniquement',
      preview: ['Contenu très explicite', 'BDSM léger', 'Fantasmes avancés', 'Consentement requis'],
      warning: true,
      premium: true
    }
  ]

  const handleSelect = (deckId) => {
    const deck = decks.find(d => d.id === deckId)
    
    // Vérifier accès premium pour EXTREME
    if (deck.premium && !premiumService.canAccessDeck(deckId)) {
      alert('Deck EXTREME disponible uniquement avec l\'abonnement Premium !')
      return
    }
    
    setSelectedDeck(deckId)
  }

  const handleConfirm = () => {
    if (selectedDeck) {
      onDeckSelected(selectedDeck)
    }
  }

  const activatePremiumDemo = () => {
    premiumService.activatePremium()
    setPremiumState(premiumService.getState())
  }

  return (
    <div className="glass-premium w-[600px] max-w-full p-8 flex flex-col gap-6 animate-fade-scale-in">
      
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">🎴 Choisis ton Deck</h1>
        <p className="text-white/80">Sélectionne le niveau d'intensité pour ta partie</p>
        {!premiumState.isSubscribed && (
          <div className="mt-2">
            <button
              onClick={activatePremiumDemo}
              className="text-sm px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full hover:bg-yellow-500/30 transition-colors"
            >
              💎 Activer Premium (TEST)
            </button>
          </div>
        )}
      </div>

      {/* Grille des decks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {decks.map((deck) => {
          const isLocked = deck.premium && !premiumService.canAccessDeck(deck.id)
          
          return (
            <div
              key={deck.id}
              onClick={() => handleSelect(deck.id)}
              className={`glass-card p-6 relative transition-all duration-300 ${
                isLocked 
                  ? 'opacity-60 cursor-not-allowed' 
                  : 'cursor-pointer hover-lift'
              } ${
                selectedDeck === deck.id ? 'ring-2 ring-white scale-105' : ''
              } ${deck.warning ? 'border-red-400' : ''}`}
            >
              {/* Premium lock overlay */}
              {isLocked && (
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <div className="text-sm font-semibold">Premium</div>
                    <div className="text-xs">Requis</div>
                  </div>
                </div>
              )}

              {/* Premium badge */}
              {deck.premium && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-500 text-black text-xs font-bold rounded">
                  💎 PREMIUM
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{deck.emoji}</div>
                <h3 className="text-xl font-bold">{deck.name}</h3>
                <div className="flex justify-center gap-1 mt-1">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < deck.level ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="text-center mb-4">
                <p className="font-semibold mb-1">{deck.description}</p>
                <p className="text-sm text-white/70 mb-2">{deck.details}</p>
                <p className="text-xs text-white/60">{deck.audience}</p>
              </div>

              {/* Preview */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-white/80">Exemples:</p>
                {deck.preview.map((item, index) => (
                  <p key={index} className="text-xs text-white/60">• {item}</p>
                ))}
              </div>

              {/* Warning pour extreme */}
              {deck.warning && (
                <div className="mt-4 p-2 bg-red-500/20 rounded border border-red-400/30">
                  <p className="text-xs text-red-200 text-center">
                    ⚠️ Contenu adulte explicite
                  </p>
                </div>
              )}

              {/* Indicateur de sélection */}
              {selectedDeck === deck.id && !isLocked && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Message premium */}
      {!premiumState.isSubscribed && (
        <div className="glass-card p-4 text-center">
          <h4 className="font-semibold mb-2">💎 Débloque le contenu Premium</h4>
          <p className="text-sm text-white/70 mb-3">
            Accède au deck EXTREME et à tous les contenus exclusifs pour 4,99€/mois
          </p>
          <div className="flex gap-2 text-xs">
            <span className="flex items-center gap-1">
              <span className="text-green-400">✓</span>
              <span>Deck EXTREME</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-400">✓</span>
              <span>Thèmes premium</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="text-green-400">✓</span>
              <span>Stats avancées</span>
            </span>
          </div>
        </div>
      )}

      {/* Détails du deck sélectionné */}
      {selectedDeck && (
        <div className="glass-card p-4 animate-fade-scale-in">
          <div className="text-center">
            <h4 className="font-semibold mb-2">
              Deck {decks.find(d => d.id === selectedDeck)?.name} sélectionné
            </h4>
            <p className="text-sm text-white/70">
              Tu es prêt(e) pour une partie {decks.find(d => d.id === selectedDeck)?.description.toLowerCase()} !
            </p>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleConfirm}
          disabled={!selectedDeck}
          className={`w-full rounded-full py-4 font-semibold text-white transition-all duration-300 ${
            selectedDeck 
              ? `bg-gradient-to-b ${decks.find(d => d.id === selectedDeck)?.color} hover-lift button-particles`
              : 'bg-gray-500/50 cursor-not-allowed'
          }`}
        >
          {selectedDeck ? '🚀 Commencer avec ce deck' : '👆 Sélectionne un deck'}
        </button>
        
        <button 
          onClick={onCancel}
          className="text-white/70 hover:text-white transition-colors"
        >
          ← Retour au formulaire
        </button>
      </div>
    </div>
  )
}
