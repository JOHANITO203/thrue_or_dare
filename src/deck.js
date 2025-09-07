/**
 * Draw a random card from the deck.
 * @param {Array} deck - array representing the deck of cards.
 * @returns {*} the drawn card.
 */
export function drawCard(deck) {
  const index = Math.floor(Math.random() * deck.length);
  return deck.splice(index, 1)[0];
}

