truth-or-dare-hot/
│── public/                  # Fichiers statiques accessibles tels quels
│   ├── index.html           # Point d’entrée HTML
│   └── icons/               # Favicons, splash screens PWA
│
│── src/
│   ├── assets/              # Images et médias
│   │   ├── emojis/          # Emojis iOS 18+ custom
│   │   ├── memoXX/          # Memojis féminins (25 PNG)
│   │   └── memoXY/          # Memojis masculins (25 PNG)
│   │
│   ├── components/          # Composants React
│   │   ├── UI/              # Boutons, GlassCard, TimerCircle…
│   │   ├── PlayerForm.jsx   # Formulaire ajout joueurs
│   │   ├── DiceScene.jsx    # Lancer de dés (3D)
│   │   ├── GameBoard.jsx    # Plateau de jeu principal
│   │   ├── Card.jsx         # Carte flip 3D Action/Vérité
│   │   ├── OptionsMenu.jsx  # Menu paramètres
│   │   └── EndGame.jsx      # Écran fin de partie
│   │
│   ├── data/                # Contenus statiques
│   │   ├── softDeck.js
│   │   ├── hotDeck.js
│   │   ├── extremeDeck.js
│   │   └── decks.js         # Regroupe tous les decks
│   │
│   ├── hooks/               # Hooks personnalisés
│   │   ├── useGameState.js  # Gestion état partie (localStorage)
│   │   └── useTimer.js      # Hook gestion du timer
│   │
│   ├── styles/
│   │   └── globals.css      # Styles globaux + Tailwind base
│   │
│   ├── App.jsx              # Composant racine React
│   ├── main.jsx             # Point d’entrée JS
│   └── vite-env.d.ts        # Typage (si TypeScript)
│
│── .eslintrc.cjs            # Linter configuration
│── .prettierrc              # Formatage automatique
│── package.json             # Dépendances et scripts
│── tailwind.config.js       # Config TailwindCSS
│── vite.config.js           # Config Vite (build & dev server)
