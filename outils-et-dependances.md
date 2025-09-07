🛠️ Outils & Dépendances
Core

React 18 → UI moderne et composable

Vite → bundler ultra rapide

Styles

TailwindCSS → base CSS utilitaire

Framer Motion → animations fluides

Glassmorphism → custom CSS (inspiré Apple)

3D & Effets

react-three/fiber → rendu 3D (dés interactifs)

@react-three/drei → helpers (OrbitControls, lighting)

@react-three/cannon → physique réaliste pour les dés

Outillage

ESLint → qualité du code

Prettier → formatage auto

Husky + lint-staged → vérifications pré-commit

Jest + React Testing Library → tests unitaires/UI

Vitest (optionnel) → tests intégrés à Vite

PWA

vite-plugin-pwa → support offline, ajout à l’écran d’accueil


✅ Bonnes pratiques

Utiliser composants réutilisables (UI/Button, UI/GlassCard).

Stocker l’état du jeu dans un hook global (useGameState) + persisté dans localStorage.

Prévoir des fallbacks responsive pour mobile.

Organiser les assets en sous-dossiers logiques (emojis, memojis, icons).

Ajouter des tests unitaires pour chaque fonctionnalité critique (timer, tirage de cartes, scores).