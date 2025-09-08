import { useState, useEffect } from 'react'
import { useAudio } from '../hooks/useAudio'
import { premiumService } from '../data/premiumSystem'

export default function SettingsMenu({ onClose, onBack }) {
  const [activeTab, setActiveTab] = useState('general')
  const { 
    audioState, 
    updateAudioSettings, 
    playClick, 
    playSelect 
  } = useAudio()
  
  const [settings, setSettings] = useState({
    // Paramètres généraux
    language: 'fr',
    theme: 'default',
    animations: true,
    notifications: true,
    
    // Paramètres de jeu
    defaultTimer: 30,
    autoNextPlayer: true,
    showHints: true,
    vibrations: true,
    
    // Paramètres audio
    masterVolume: Math.round(audioState.masterVolume * 100),
    musicVolume: Math.round(audioState.musicVolume * 100),
    effectsVolume: Math.round(audioState.effectsVolume * 100),
    isMuted: audioState.isMuted,
    
    // Paramètres accessibilité
    fontSize: 'normal',
    highContrast: false,
    reduceMotion: false,
    screenReader: false
  })

  const tabs = [
    { id: 'general', name: 'Général', icon: '⚙️' },
    { id: 'game', name: 'Jeu', icon: '🎮' },
    { id: 'audio', name: 'Audio', icon: '🔊' },
    { id: 'accessibility', name: 'Accessibilité', icon: '♿' }
  ]

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ]

  const themes = [
    { id: 'default', name: 'Par défaut', preview: 'from-purple-400 to-pink-400' },
    { id: 'dark', name: 'Sombre', preview: 'from-gray-800 to-gray-900' },
    { id: 'light', name: 'Clair', preview: 'from-blue-200 to-purple-200' }
  ]

  const handleSettingChange = (key, value) => {
    playClick()
    setSettings(prev => ({ ...prev, [key]: value }))
    
    // Appliquer immédiatement certains paramètres
    if (key.includes('Volume') || key === 'isMuted') {
      updateAudioSettings({ [key]: value })
    }
  }

  const handleTabChange = (tabId) => {
    playSelect()
    setActiveTab(tabId)
  }

  const handleSave = () => {
    playSelect()
    // Ici on sauvegarderait les paramètres
    localStorage.setItem('game-settings', JSON.stringify(settings))
    onClose()
  }

  const handleReset = () => {
    playClick()
    if (confirm('Réinitialiser tous les paramètres ?')) {
      // Reset aux valeurs par défaut
      const defaultSettings = {
        language: 'fr',
        theme: 'default',
        animations: true,
        notifications: true,
        defaultTimer: 30,
        autoNextPlayer: true,
        showHints: true,
        vibrations: true,
        masterVolume: 80,
        musicVolume: 70,
        effectsVolume: 85,
        isMuted: false,
        fontSize: 'normal',
        highContrast: false,
        reduceMotion: false,
        screenReader: false
      }
      setSettings(defaultSettings)
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
            <h2 className="text-2xl font-bold">⚙️ Paramètres</h2>
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
        
        {/* Onglet Général */}
        {activeTab === 'general' && (
          <div className="space-y-4">
            
            {/* Langue */}
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">Langue</h3>
              <div className="grid grid-cols-1 gap-2">
                {languages.map((lang) => (
                  <label key={lang.code} className="flex items-center gap-3 p-2 rounded hover:bg-white/10 cursor-pointer">
                    <input 
                      type="radio" 
                      name="language" 
                      value={lang.code}
                      checked={settings.language === lang.code}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      settings.language === lang.code ? 'bg-white border-white' : 'border-white/50'
                    }`}></div>
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Thème */}
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">Thème</h3>
              <div className="grid grid-cols-1 gap-2">
                {themes.map((theme) => (
                  <label key={theme.id} className="flex items-center gap-3 p-2 rounded hover:bg-white/10 cursor-pointer">
                    <input 
                      type="radio" 
                      name="theme" 
                      value={theme.id}
                      checked={settings.theme === theme.id}
                      onChange={(e) => handleSettingChange('theme', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      settings.theme === theme.id ? 'bg-white border-white' : 'border-white/50'
                    }`}></div>
                    <div className={`w-6 h-6 rounded bg-gradient-to-r ${theme.preview}`}></div>
                    <span>{theme.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Options générales */}
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span>Animations</span>
                  <input 
                    type="checkbox" 
                    checked={settings.animations}
                    onChange={(e) => handleSettingChange('animations', e.target.checked)}
                    className="toggle"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span>Notifications</span>
                  <input 
                    type="checkbox" 
                    checked={settings.notifications}
                    onChange={(e) => handleSettingChange('notifications', e.target.checked)}
                    className="toggle"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Jeu */}
        {activeTab === 'game' && (
          <div className="space-y-4">
            
            {/* Timer par défaut */}
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">Timer par défaut</h3>
              <div className="grid grid-cols-4 gap-2">
                {[15, 30, 45, 60].map((seconds) => (
                  <button
                    key={seconds}
                    onClick={() => handleSettingChange('defaultTimer', seconds)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      settings.defaultTimer === seconds
                        ? 'bg-white text-purple-600'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    {seconds}s
                  </button>
                ))}
              </div>
            </div>

            {/* Options de jeu */}
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">Gameplay</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span>Passage automatique au joueur suivant</span>
                  <input 
                    type="checkbox" 
                    checked={settings.autoNextPlayer}
                    onChange={(e) => handleSettingChange('autoNextPlayer', e.target.checked)}
                    className="toggle"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span>Afficher les indices</span>
                  <input 
                    type="checkbox" 
                    checked={settings.showHints}
                    onChange={(e) => handleSettingChange('showHints', e.target.checked)}
                    className="toggle"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span>Vibrations (mobile)</span>
                  <input 
                    type="checkbox" 
                    checked={settings.vibrations}
                    onChange={(e) => handleSettingChange('vibrations', e.target.checked)}
                    className="toggle"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Onglet Audio */}
        {activeTab === 'audio' && (
          <div className="space-y-4">
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">Volumes</h3>
              
              {/* Master Volume */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Volume Principal ({settings.masterVolume}%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={settings.masterVolume}
                  onChange={(e) => handleSettingChange('masterVolume', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Music Volume */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Musique ({settings.musicVolume}%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={settings.musicVolume}
                  onChange={(e) => handleSettingChange('musicVolume', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Effects Volume */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Effets ({settings.effectsVolume}%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={settings.effectsVolume}
                  onChange={(e) => handleSettingChange('effectsVolume', parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Mute */}
              <label className="flex items-center justify-between">
                <span>Mode silencieux</span>
                <input 
                  type="checkbox" 
                  checked={settings.isMuted}
                  onChange={(e) => handleSettingChange('isMuted', e.target.checked)}
                  className="toggle"
                />
              </label>
            </div>
          </div>
        )}

        {/* Onglet Accessibilité */}
        {activeTab === 'accessibility' && (
          <div className="space-y-4">
            
            {/* Taille de police */}
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">Taille de police</h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'small', name: 'Petite' },
                  { id: 'normal', name: 'Normale' },
                  { id: 'large', name: 'Grande' }
                ].map((size) => (
                  <button
                    key={size.id}
                    onClick={() => handleSettingChange('fontSize', size.id)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      settings.fontSize === size.id
                        ? 'bg-white text-purple-600'
                        : 'bg-white/20 hover:bg-white/30 text-white'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Options accessibilité */}
            <div className="glass-card p-4">
              <h3 className="font-semibold mb-3">Options</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span>Contraste élevé</span>
                  <input 
                    type="checkbox" 
                    checked={settings.highContrast}
                    onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
                    className="toggle"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span>Réduire les animations</span>
                  <input 
                    type="checkbox" 
                    checked={settings.reduceMotion}
                    onChange={(e) => handleSettingChange('reduceMotion', e.target.checked)}
                    className="toggle"
                  />
                </label>
                <label className="flex items-center justify-between">
                  <span>Support lecteur d'écran</span>
                  <input 
                    type="checkbox" 
                    checked={settings.screenReader}
                    onChange={(e) => handleSettingChange('screenReader', e.target.checked)}
                    className="toggle"
                  />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/20 flex justify-between">
        <button 
          onClick={handleReset}
          className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          Réinitialiser
        </button>
        <div className="flex gap-3">
          <button 
            onClick={() => { playClick(); onClose(); }}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
          >
            Annuler
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  )
}
