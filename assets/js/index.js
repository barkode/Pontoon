// Adds strict mode to JS.
'use strict';

// CONSTANTS

const CARDS = [
  'a',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'j',
  'q',
  'k',
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
  for (let type of types) {
    for (let card of cards) {
      deck.push({ card, type, deckImg });
    }
  }
  // Add values to cards

  deck.forEach(el => {
    if (!isNaN(el.card)) {
      el.value = Number(el.card);
    } else if (el.card === 'a') {
      el.value = 11;
    } else {
      el.value = 10;
    }
  });

  return deck;
}

console.log(buildDeck(CARDS, CARD_TYPE));
