// Adds strict mode to JS.
'use strict';

// Game counts

const gameCounts = {
  win: 0,
  lose: 0,
  playerCards: [],
  dealerCards: [],
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

function startGame(settings) {
  let { win, lose, playerCards, dealerCards, playerName } = settings;
  let i = 1;
  playerCards = [];
  dealerCards = [];
  // Player and dealer cards
  do {
    const oneCardNumber = Math.floor(Math.random() * 52);
    console.log('GENERATED CARD : ', oneCardNumber);
    const isElExist = !isElementInArray(
      oneCardNumber,
      playerCards,
      dealerCards
    );
    if (isElExist && i % 2 !== 0) {
      playerCards.push(oneCardNumber);
      console.log('PLAYER CARDS ARRAY : ', playerCards);
    } else if (isElExist && i % 2 === 0) {
      dealerCards.push(oneCardNumber);
      console.log('DEALER CARDS ARRAY : ', dealerCards);
    } else {
      console.log('i in ELSE', i);
      continue;
    }
    i += 1;
    console.log("i AFTER ALL IF's", i);
  } while (i < 5);
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
