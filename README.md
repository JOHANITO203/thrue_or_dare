# Truth or Dare HOT

Jeu "Action ou Vérité" moderne développé avec [React](https://react.dev/) et [Vite](https://vitejs.dev/). Le projet adopte un design *glassmorphism* et met l'accent sur des animations 3D réalistes pour le lancer de dés.

## Installation

1. Assurez-vous d'avoir [Node.js](https://nodejs.org/) ≥ 18.
2. Installez les dépendances :

```bash
npm install
```

## Scripts disponibles

| Script | Description |
| --- | --- |
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Génère la version de production |
| `npm run preview` | Prévisualise la build de production |
| `npm run lint` | Exécute ESLint |
| `npm test` | Lance les tests unitaires |

## Structure du projet

```
public/                  Fichiers statiques (index.html, icônes)
src/
├── assets/              Images et médias
│   ├── emojis/
│   ├── memoXX/
│   └── memoXY/
├── components/          Composants React
│   ├── UI/
│   ├── PlayerForm.jsx
│   ├── DiceScene.jsx
│   ├── GameBoard.jsx
│   ├── Card.jsx
│   ├── OptionsMenu.jsx
│   └── EndGame.jsx
├── data/                Contenus des cartes (soft/hot/extreme)
├── hooks/               Hooks personnalisés
├── styles/              Styles globaux (TailwindCSS)
├── App.jsx
├── main.jsx
└── vite-env.d.ts
.eslintrc.cjs            Configuration ESLint
.prettierrc              Formatage automatique
package.json             Dépendances et scripts
tailwind.config.js       Configuration TailwindCSS
vite.config.js           Configuration Vite
```

## Licence

Ce projet est distribué sous licence [MIT](LICENSE).
