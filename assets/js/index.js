// Adds strict mode to JS.
'use strict';

// CONSTANTS

const CARDS = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

const CARD_TYPE = ['club', 'heart', 'diamond', 'spade'];
const DEFAULT_DECK = 'deck1';

/**
 *
 * Create new deck.
 * Return array of object. Each object is a cart with type, value, name and image;
 */
function buildDeck(cards, types, deckImg = 'deck1') {
  const deck = [];
  const oneCard = {};
  for (let type of types) {
    for (let card of cards) {
      if (!isNaN(card)) {
      }

      deck.push({ card, type, deckImg });
    }
  }
  return deck;
}

console.log(buildDeck(CARDS, CARD_TYPE));
