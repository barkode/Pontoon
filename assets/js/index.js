// Adds strict mode to JS.
'use strict';

import defaultSettings from './settings.js';

// Game counts

const gameCounts = {
  win: 0,
  lose: 0,
  playerCards: [],
  playerSum: 0,
  dealerCards: [],
  dealerSum: 0,
  playerName: '',
};

// FIND BUTTONS

const startButton = document.getElementById('start');
const hitButton = document.getElementById('hit');
const stopButton = document.getElementById('stop');
const form = document.getElementById('form');
const input = form.name;

startButton.addEventListener('click', e => {
  console.log('START BUTTON: ', e);
  startGame(gameCounts);
});

hitButton.addEventListener('click', e => console.log('HIT BUTTON: ', e));
stopButton.addEventListener('click', e => console.log('STOP BUTTON: ', e));

const fullCardDeck = buildDeck(defaultSettings);

function startGame(settings) {
  let { win, lose, playerCards, dealerCards, playerName } = settings;
  // Init counter. Counter used for init quantity of elements in array
  let i = 1;

  // Reset all elements at the beginning of the game.
  playerCards = [];
  dealerCards = [];
  playerSum = 0;
  dealerSum = 0;

  // Player and dealer cards
  do {
    const oneCardNumber = Math.floor(Math.random() * 52);

    // Check is the random number in our array.
    const isElExist = !isElementInArray(
      oneCardNumber,
      playerCards,
      dealerCards
    );

    // Check if the number unique for array than add that number

    // If the number is odd than push it to the player cards array
    if (isElExist && i % 2 !== 0) {
      playerCards.push(oneCardNumber);
      // If the number is even than push it to the dealer cards array
    } else if (isElExist && i % 2 === 0) {
      dealerCards.push(oneCardNumber);
    } else {
      continue;
    }
    i += 1;
  } while (i < 5);
  console.log(showCards(playerCards, fullCardDeck));
  console.log(showCards(dealerCards, fullCardDeck));
}

/**
 * The function takes user cards array with numbers and full deck array.
 * Function returns an array with a ratio of a random number and map maps
 */

function showCards(userCards, deck) {
  const gameCards = [];
  for (let card of userCards) {
    gameCards.push(deck[card]);
  }

  return gameCards;
}

// console.log(gameCounts.playerCards);

/**
 *  function check is element unique.
 *  accepts two data arrays and return true or false
 */

function isElementInArray(element, array1, array2) {
  const tempArray = [...array1, ...array2];
  return tempArray.includes(element);
}

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

// ! function commented.
/**
 * The function receives an array as input.
 * It randomly generates the value for the playing card.
 */

// function cardDistribution(array) {
//   // Get random card
//   const oneCard = Math.floor(Math.random() * 52);

//   return array[oneCard];
// }

// ! ===================================

function addCardsToArray(card, array) {
  array.push(card);
}

// const fullCardDeck = buildDeck(defaultSettings);

// for (let i = 0; i < 10; i += 1) {
//   const card = cardDistribution(fullCardDeck);
//   console.log(
//     isElementInArray(card, gameCounts.playerCards, gameCounts.dealerCards)
//   );
//   console.log([...gameCounts.playerCards, ...gameCounts.playerCards]);
//   addCardsToArray(card, gameCounts.playerCards);
// }
