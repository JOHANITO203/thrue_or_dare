📑 Cahier des Charges – Truth or Dare HOT
1. 🎨 Identité Visuelle & UX / UI
Style global

Glassmorphism premium : transparence, flou, reflets, ombres douces.

Palette couleurs : dégradé violet → rose → orange, contraste avec blanc translucide.

Typographie : Inter (Google Fonts).

Animations globales : zoom fluide des menus, particules lumineuses, sons cristallins, vibrations haptiques (mobile).

Éléments UI

Cartes : effet flip 3D recto/verso, arrondis doux.

Timer circulaire : autour de la carte, progressif avec dégradé, alerte rouge sous 5s.

Boutons : forme capsule, dégradés colorés (vert, rouge, violet), pulse au clic, particules.

Menus :

Principal → Nouvelle Partie, Paramètres, Premium Content, Quitter.

Paramètres → Musique 🎵, Son FX 🔊, Silence 🔇, Langue 🌐, Quitter 🚪.

Option visible → Reprendre Partie si sauvegarde existe.

2. 🕹️ Gameplay (Logique & Règles)
Déroulement

Écran de lancement → menu principal.

Nouvelle Partie → formulaire joueurs (nom + sexe + avatar assigné automatiquement depuis Memojis).

Jusqu’à 4 joueurs.

Lancer de dés 3D :

Chaque joueur lance un dé interactif (3D réaliste, gravité, rebonds).

Avatars affichés avec pulse sur le joueur actif.

Score affiché sous chaque joueur.

En cas d’égalité → relance automatique pour les concernés.

À la fin → bouton Commencer la partie.

Tours de jeu

Tours 1 à 3 : choix manuel Action (🔥) ou Vérité (🌈).

À partir du 4ᵉ tour : cartes tirées aléatoirement du deck choisi.

Cartes déjà jouées → exclues automatiquement.

Points & victoire

+1 point → gage accepté.

-1,5 points → gage refusé.

Conditions victoire :

Partie à 2 → 55 pts.

Partie à 3 → 35 pts.

Partie à 4 → 27 pts.

Écran de fin : affiche vainqueur (ton fun & fraternel, pas humiliant).

3. 📚 Contenus (Decks de cartes)

3 decks principaux :

Soft → romantique, tendre, amusant.

Hot → sexy, osé, délirant.

Extreme → sulfureux, hardcore.

Chaque deck contient 50 vérités + 50 actions.

Format JSON standardisé :

{ type: 'action'|'verite', text: '...', duration?: number, modes: ['soft'|'hot'|'extreme'], level: 1|2|3 }


Fichiers :

softDeck.js

hotDeck.js

extremeDeck.js

à regroupés dans decks.js.

4. 🎭 Avatars & Assets
Avatars

25 Memojis masculins → assets/memoXY/male_01.png → male_25.png.

25 Memojis féminins → assets/memoXX/female_01.png → female_25.png.

Assignation aléatoire au moment de la création joueur.

Pulse animé sur avatar du joueur actif.

Emojis (style iOS 18+)

Stockés dans assets/emojis/ (PNG 100x100, fond transparent) :

🔥 1f525.png (Action)

🌈 1f308.png (Truth)

⚙️ 2699-fe0f.png (Options)

🎵 1f3b5.png (Musique)

🔊 1f50a.png (Son FX)

🔇 1f507.png (Silence)

🌐 1f310.png (Langue)

🚪 1f6aa.png (Quitter)

5. ⚙️ Technique & Architecture

Framework : React 18 + Vite.

Style : TailwindCSS (glassmorphism + custom).

Animations : Framer Motion + CSS keyframes.

3D (dés) : react-three/fiber + @react-three/cannon (physique réaliste).

PWA Ready : service worker.

Sauvegarde état de partie : localStorage (option cloud future).

Fichiers à créer :

index.html → structure globale.

App.jsx + composants React :

PlayerForm.jsx (formulaire joueurs)

DiceScene.jsx (lancer de dés 3D)

GameBoard.jsx (interface partie en cours)

Card.jsx (carte flip 3D)

Timer.jsx (timer circulaire)

OptionsMenu.jsx (menu paramètres)

EndGame.jsx (écran fin de partie)

decks.js → regroupement des decks.

vite.config.js → build et config.

6. 🚀 Options futures

Leaderboard online (scores mondiaux).

Premium Content (packs de cartes exclusives).

Mode spectateur (amis qui voient la partie)