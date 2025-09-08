import { useState } from 'react'

// Import des composants
import MainMenu from './components/MainMenu'
import PlayerForm from './components/PlayerForm'
import DeckSelector from './components/DeckSelector'
import DiceScene from './components/DiceScene'
import GameBoard from './components/GameBoard'
import EndGame from './components/EndGame'

// Import des decks
import { softDeck } from './data/softDeck'
import { hotDeck } from './data/hotDeck'
import { extremeDeck } from './data/extremeDeck'

function App() {
  // États de navigation
  const [currentStep, setCurrentStep] = useState('menu') // menu, form, deck, dice, game, end
  const [players, setPlayers] = useState([])
  const [selectedDeck, setSelectedDeck] = useState(null)
  const [currentDeckCards, setCurrentDeckCards] = useState([])
  const [diceResults, setDiceResults] = useState({})
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [usedCards, setUsedCards] = useState([])
  const [gameResult, setGameResult] = useState(null)

  // Mapping des decks
  const deckMap = {
    'soft': softDeck,
    'hot': hotDeck,
    'extreme': extremeDeck
  }

  // Fonctions de navigation
  const goToForm = () => setCurrentStep('form')
  
  const goToDeckSelector = (playerList) => {
    setPlayers(playerList)
    setCurrentStep('deck')
  }

  const goToDice = (deckType) => {
    setSelectedDeck(deckType)
    setCurrentDeckCards(deckMap[deckType] || softDeck)
    setCurrentStep('dice')
  }
  
  const goToGame = () => {
    // Trier les joueurs par ordre de dés (plus haut commence)
    const sortedPlayers = [...players].sort((a, b) => (diceResults[b.id] || 0) - (diceResults[a.id] || 0))
    setPlayers(sortedPlayers)
    setCurrentStep('game')
  }
  
  const goToEnd = (result) => {
    setGameResult(result)
    setCurrentStep('end')
  }
  
  const backToMenu = () => {
    // Reset de tous les états
    setCurrentStep('menu')
    setPlayers([])
    setSelectedDeck(null)
    setCurrentDeckCards([])
    setDiceResults({})
    setCurrentPlayerIndex(0)
    setUsedCards([])
    setGameResult(null)
  }

  const backToForm = () => {
    setCurrentStep('form')
    setSelectedDeck(null)
    setCurrentDeckCards([])
  }

  const backToDeckSelector = () => {
    setCurrentStep('deck')
    setDiceResults({})
  }

  // Fonctions de jeu
  const setDiceResult = (playerId, result) => {
    setDiceResults(prev => ({ ...prev, [playerId]: result }))
  }

  const allPlayersRolled = () => {
    return players.every(player => diceResults[player.id] !== undefined)
  }

  const updatePlayerScore = (playerId, points) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, score: (player.score || 0) + points }
        : player
    ))
  }

  const nextPlayer = () => {
    setCurrentPlayerIndex(prev => (prev + 1) % players.length)
  }

  const getRandomCard = () => {
    const availableCards = currentDeckCards.filter(card => !usedCards.includes(card.text))
    if (availableCards.length === 0) {
      // Reset si toutes les cartes sont utilisées
      setUsedCards([])
      return currentDeckCards[Math.floor(Math.random() * currentDeckCards.length)]
    }
    return availableCards[Math.floor(Math.random() * availableCards.length)]
  }

  const markCardUsed = (cardText) => {
    setUsedCards(prev => [...prev, cardText])
  }

  // Background commun pour toutes les pages
  const pageBackground = "min-h-screen bg-gradient-to-br from-[#7a60ff] via-[#ff6ac0] to-[#ff9575] flex items-center justify-center p-4"

  return (
    <div className={pageBackground}>
      {currentStep === 'menu' && (
        <MainMenu onNewGame={goToForm} />
      )}

      {currentStep === 'form' && (
        <PlayerForm 
          onNext={goToDeckSelector} 
          onCancel={backToMenu} 
        />
      )}

      {currentStep === 'deck' && (
        <DeckSelector 
          onDeckSelected={goToDice}
          onCancel={backToForm}
        />
      )}

      {currentStep === 'dice' && (
        <DiceScene 
          players={players}
          diceResults={diceResults}
          onDiceResult={setDiceResult}
          allPlayersRolled={allPlayersRolled}
          onStart={goToGame}
          onCancel={backToDeckSelector}
          selectedDeck={selectedDeck}
        />
      )}

      {currentStep === 'game' && (
        <GameBoard 
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          getRandomCard={getRandomCard}
          markCardUsed={markCardUsed}
          updatePlayerScore={updatePlayerScore}
          nextPlayer={nextPlayer}
          onFinish={goToEnd}
          selectedDeck={selectedDeck}
          currentDeckCards={currentDeckCards}
        />
      )}

      {currentStep === 'end' && (
        <EndGame 
          result={gameResult}
          onRestart={backToMenu}
          selectedDeck={selectedDeck}
        />
      )}
    </div>
  )
}

export default App
