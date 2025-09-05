# 🔥 Action ou Vérité — Immersif (100 cartes, flip 3D + anti-triche)

Bienvenue sur le projet **Action ou Vérité — Immersif** !  
Ce jeu web propose une expérience interactive et immersive pour jouer à "Action ou Vérité" à deux, avec 100 cartes uniques réparties sur 3 modes. Grâce à une interface moderne (flip 3D, anti-triche, timer, sons et musique), chaque partie est originale et adaptée à l'ambiance désirée.

---

## 🚀 Fonctionnalités principales

- **100 cartes uniques** : questions et défis répartis sur 3 niveaux (Soft 💕, Hot 🔥, Extreme 😈)
- **Flip 3D corrigé** : animation de carte double-face pour révéler chaque défi ou question
- **Style Yu-Gi-Oh** : cartes et interface inspirées du célèbre jeu de Konami
- **Mode anti-triche** : aucune double action possible par carte, alternance automatique des joueurs
- **Timer adaptatif** : compte à rebours circulaire selon la durée de l'action à réaliser
- **Lancer de dés** : pour décider qui commence la partie
- **Scoreboard** : suivi automatique des points pour chaque joueur
- **Sons & musique** : effets sonores et fond musical activables/désactivables
- **Responsive** : adapté aux mobiles et desktop
- **Sauvegarde automatique** : reprise de partie et scores via `localStorage`
- **Sélecteur de langue** : interface FR/EN (cartes en français)


---

## 📚 Guide d'utilisation

1. **Ouvrez le fichier HTML dans votre navigateur**  
   Aucun serveur requis, tout fonctionne en local.

2. **Préparez la partie**  
   - Entrez le nom, prénom et sexe des deux joueurs
   - Choisissez le mode du jeu :
     - `Soft 💕` : questions et actions romantiques, tendres
     - `Hot 🔥` : défis et vérités sexy, coquins
     - `Extreme 😈` : pour adultes consentants, défis très osés

3. **Lancez le jeu !**  
   - Décidez qui commence en lançant les dés virtuels
   - Tirez une carte à chaque tour et réalisez l'action ou répondez à la vérité
   - Validez l'action (✅) ou refusez (⛔). Les points s'ajustent automatiquement

4. **Musique, sons & ambiance**  
   - Activez/désactivez la musique de fond et les effets sonores selon vos préférences

---

## 🛠️ Structure technique

- **HTML + CSS + JavaScript** : fichiers séparés pour une meilleure modularité
- **Cartes** : stockées dans un tableau JS, filtrées selon le mode choisi
- **Animation Flip 3D** : gérée en CSS, avec alternance et effet
- **Timer & Score** : affichage SVG circulaire + gestion JS des points
- **Audio** : sons générés en JS (Oscillator API)
- **Tests** : script Node vérifiant l'intégrité du deck (`npm test`)

---

## ✨ Personnalisation

## 🏗️ Builds Windows & Android

### Exécutable Windows
1. `npm run dist` — génère un .exe dans le dossier `dist` (Windows ou Wine requis).

### APK Android
1. `npx cap add android` (première fois uniquement)
2. `npm run android` — produit un APK debug dans `android/app/build/outputs/apk/`.



- **Ajouter/éditer des cartes** : modifiez le tableau `CARDS_100` dans le code source
- **Adapter les styles** : modifiez les variables CSS dans le `<style>` pour changer couleurs ou ambiance
- **Multijoueur** : le code est optimisé pour 2 joueurs, mais peut être adapté pour plus

---

## 💡 Idées pour améliorer

- Ajout d'un mode "Party" (plus de joueurs)
- Sauvegarde des scores/localStorage
- Intégration d'une base de données pour personnaliser les cartes
- Version mobile optimisée (PWA)

---

## 📄 Licence

Projet open source, usage personnel ou entre amis fortement recommandé 😉  
Pour toute suggestion, ouvrez une issue sur [le dépôt GitHub](https://github.com/JOHANITO203/aenemapyrepo).

---

**Bon jeu et amusez-vous bien ! 🔥**
