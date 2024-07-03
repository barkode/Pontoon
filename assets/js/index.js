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

const CARD_TYPE = ['clubs', 'hearts', 'diamonds', 'spades'];
const DEFAULT_DECK = 'deck1';
const IMAGE_FORMAT = 'jpg';

// Game counts

const counts = {
  win: 0,
  lose: 0,
  playerCards: [],
  dealerCards: [],
  playerName: null,
};

/**
 * Create new deck.
 * Return array of object. Each object is a cart with type, value, name and image;
 * Shuffles data and arrays.
 */
function buildDeck(
  cards,
  types,
  deckName = DEFAULT_DECK,
  IMAGE_FORMAT = 'jpg'
) {
  const fullDeck = [];
  for (let type of types) {
    for (let card of cards) {
      fullDeck.push({
        card,
        type,
        imgFront: `./assets/images/${deckName}/${deckName}-${card}-${type[0]}.${IMAGE_FORMAT}`,
        imgBack: `./assets/images/${deckName}/cardBack.${IMAGE_FORMAT}`,
      });
    }
  }
  // Add values to cards

  fullDeck.forEach(el => {
    if (!isNaN(el.card)) {
      el.value = Number(el.card);
    } else if (el.card === 'a') {
      el.value = 11;
    } else {
      el.value = 10;
    }
  });

  shuffleDeck(fullDeck);

  return fullDeck;
}

const fullCardDeck = buildDeck(CARDS, CARD_TYPE, DEFAULT_DECK, IMAGE_FORMAT);
console.log(fullCardDeck);

/**
 * Shuffle deck function.
 * Randomize array in-place using Durstenfeld shuffle algorithm
 */

function shuffleDeck(array) {
  // Randomize array in -place using Durstenfeld shuffle algorithm
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

/**
 * The function receives an array as input.
 *
 * It randomly generates the value for the playing card.
 */

function cardDistribution(array) {
  // Shuffle deck

  // Get random card
  const oneCard = Math.floor(Math.random() * 52);

  return array[oneCard];
}

console.log(cardDistribution(fullCardDeck));
