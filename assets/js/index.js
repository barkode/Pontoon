// Adds strict mode to JS.
'use strict';

import defaultSettings from './settings.js';

// Game counts

const gameCounts = {
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
function buildDeck(settings) {
  const { cards, cardType, deckName, imgFormat } = settings;
  const fullDeck = [];
  for (let type of cardType) {
    for (let card of cards) {
      fullDeck.push({
        card,
        type,
        imgFront: `./assets/images/${deckName}/${deckName}-${card}-${type[0]}.${imgFormat}`,
        imgBack: `./assets/images/${deckName}/cardBack.${imgFormat}`,
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

function addCardsToArray(card, array) {
  array.push(card);
}

function startGame() {}

const fullCardDeck = buildDeck(defaultSettings);

for (let i = 0; i < 10; i += 1) {
  const card = cardDistribution(fullCardDeck);
  addCardsToArray(card, gameCounts.playerCards);
}

for (let i = 0; i < 10; i += 1) {
  const card = cardDistribution(fullCardDeck);
  addCardsToArray(card, gameCounts.dealerCards);
}

console.log(gameCounts.dealerCards);
console.log(gameCounts.playerCards);

console.log(cardDistribution(fullCardDeck));

const newArray = [...fullCardDeck];
console.log(newArray);
