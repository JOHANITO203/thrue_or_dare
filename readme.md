# 🔥 Truth or Dare HOT - Édition Immersive

Un jeu Action ou Vérité moderne et interactif avec 100 cartes uniques, conçu pour les couples et les soirées entre adultes.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-ready-orange.svg)

## ✨ Caractéristiques

- 🎴 **100 cartes uniques** réparties en 3 modes (Soft, Hot, Extreme)
- ⏱️ **Timer adaptatif** pour les actions
- 📊 **Système de points** et leaderboard persistant
- 🎲 **Lancer de dés** interactif pour déterminer qui commence
- 🌐 **Multi-plateforme** : Web, Mobile (iOS/Android), Desktop (Windows/Mac/Linux)
- 🎨 **Design moderne** avec glassmorphism et animations fluides
- 🔊 **Effets sonores** et musique d'ambiance
- 📱 **Mode hors ligne** grâce au Service Worker
- 🌍 **Multi-langue** : Français et Anglais

## 🚀 Installation

### Prérequis

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Installation des dépendances

```bash
# Cloner le repository
git clone https://github.com/yourusername/truth-or-dare-hot.git
cd truth-or-dare-hot

# Installer les dépendances
npm install
```

## 💻 Développement

### Mode développement avec hot-reload

```bash
npm run dev
```

Ouvre automatiquement http://localhost:3000

### Build pour production

```bash
npm run build
```

Les fichiers compilés seront dans le dossier `www/`

## 📱 Déploiement Mobile

### Android

```bash
# Initialiser Capacitor
npm run cap:init
npm run cap:add:android

# Ouvrir dans Android Studio
npm run android

# Build APK
npm run android:build
```

### iOS (Mac uniquement)

```bash
# Initialiser Capacitor
npm run cap:init
npm run cap:add:ios

# Ouvrir dans Xcode
npm run ios

# Build IPA
npm run ios:build
```

## 🖥️ Déploiement Desktop

### Electron (Windows/Mac/Linux)

```bash
# Mode développement
npm run electron

# Créer les installateurs
npm run electron:build
```

## 🌐 Déploiement Web

### Hébergement statique

1. Build le projet : `npm run build`
2. Déployez le contenu du dossier `www/` sur votre serveur
3. Configurez HTTPS (requis pour PWA)

### Services recommandés

- **Vercel** : `npx vercel --prod`
- **Netlify** : Glissez le dossier `www/` sur netlify.com
- **GitHub Pages** : Utilisez GitHub Actions

## 🎮 Utilisation

1. **Configuration initiale**
   - Sélectionnez la langue (FR/EN)
   - Choisissez le mode (Soft/Hot/Extreme)
   - Choisissez le type de deck (Normal/Équilibré/Progressif)
   - Entrez les noms des deux joueurs

2. **Lancer de dés**
   - Cliquez sur les dés pour déterminer qui commence
   - Le joueur avec le plus grand score commence

3. **Jeu principal**
   - Cliquez sur "Nouvelle carte" pour tirer
   - Réalisez l'action ou répondez à la vérité
   - Cliquez sur "Réussi" (+1 point) ou "Refuser" (l'autre +2 points)

4. **Raccourcis clavier**
   - `Espace` : Pause/Reprendre
   - `Enter` : Nouvelle carte
   - `S` : Succès
   - `R` : Refus

## 📁 Structure du projet

```
truth-or-dare-hot/
├── src/                    # Code source
│   ├── index.html         # Page principale
│   ├── style.css          # Styles avec glassmorphism
│   ├── script.js          # Logique principale
│   └── gameLogic.js       # Gestion des cartes
├── assets/                 # Ressources
│   ├── icon.svg           # Icône vectorielle
│   ├── icon-*.png         # Icônes PNG (toutes tailles)
│   └── screenshots/       # Captures d'écran
├── www/                    # Build production (généré)
├── android/                # Projet Android (généré)
├── ios/                    # Projet iOS (généré)
├── manifest.json           # Configuration PWA
├── sw.js                   # Service Worker
├── package.json           # Dépendances npm
├── capacitor.config.json  # Configuration mobile
├── vite.config.js         # Configuration Vite
└── README.md              # Ce fichier

```

## 🛠️ Technologies utilisées

- **Frontend** : HTML5, CSS3 (Glassmorphism), JavaScript ES6+
- **Build** : Vite
- **Mobile** : Capacitor
- **Desktop** : Electron
- **PWA** : Service Worker, Web Manifest
- **Audio** : Web Audio API
- **Storage** : LocalStorage
- **Animations** : CSS Animations, Transitions

## 🎨 Personnalisation

### Modifier les cartes

Éditez le fichier `gameLogic.js` pour ajouter/modifier les cartes :

```javascript
export const CARDS_100 = [
  {
    type: 'action',
    text: 'Votre action personnalisée',
    duration: 30,
    modes: ['hot'],
    level: 2
  },
  // ...
];
```

### Modifier les couleurs

Éditez les variables CSS dans `style.css` :

```css
:root {
  --primary-rose: #ff6b9d;
  --primary-pink: #feca57;
  --primary-purple: #c471ed;
  /* ... */
}
```

## 📊 Performance

- **Lighthouse Score** : 100/100
- **First Contentful Paint** : < 1s
- **Time to Interactive** : < 2s
- **Bundle Size** : < 500KB

## ♿ Accessibilité

- WCAG 2.1 Level AA compliant
- Support complet du clavier
- Zones ARIA live pour lecteurs d'écran
- Contrastes élevés

## 🐛 Debug

Mode debug disponible dans la console :

```javascript
// Afficher l'état du jeu
window.debugInfo()

// Passer à la fin
window.skipToEnd()

// Ajouter des points
window.addPoints(1, 10) // Joueur 1, +10 points
```

## 📝 Licence

MIT License - Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! 

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📧 Contact

- Email : contact@yourdomain.com
- Twitter : [@yourhandle](https://twitter.com/yourhandle)
- GitHub : [yourusername](https://github.com/yourusername)

## 🙏 Remerciements

- Design inspiré par Apple Human Interface Guidelines
- Glassmorphism trend 2024
- La communauté open source

---

**Fait avec ❤️ et beaucoup de café ☕**
