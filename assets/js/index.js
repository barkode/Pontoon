import defaultSettings from './settings.js';

// Game counts

const gameCounts = {
  win: 0,
  lose: 0,
  playerCards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  dealerCards: [0, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  playerSum: 0,
  dealerSum: 0,
  playerName: '',
};

// FIND BUTTONS

const startButton = document.getElementById('start');
const hitButton = document.getElementById('hit');
const stopButton = document.getElementById('stand');
const form = document.getElementById('form');
const input = form.name;

startButton.addEventListener('click', e => {
  console.log('START BUTTON: ', e);
  startGame(gameCounts);
});

hitButton.addEventListener('click', e => {
  console.log('HIT BUTTON: ', e);
  playerHit(gameCounts);
});
stopButton.addEventListener('click', e => console.log('STAND BUTTON: ', e));

const fullCardDeck = buildDeck(defaultSettings);
console.log(gameCounts);

function startGame(settings) {
  console.log('Game Counts BEFORE : ', settings);
  // let {
  //   win,
  //   lose,
  //   playerCards,
  //   dealerCards,
  //   playerName,
  //   playerSum,
  //   dealerSum,
  // } = settings;

  // Init counter. Counter used for init quantity of elements in array
  let i = 1;

  // Reset all elements at the beginning of the game.
  console.log(settings.playerCards);
  settings.playerCards = [];
  settings.dealerCards = [];
  settings.playerSum = 0;
  settings.dealerSum = 0;

  // Player and dealer cards
  do {
    const oneCard = addNewCard();

    // Check is the random number in our array.
    const isElExist = isElementInArray(
      oneCard,
      settings.playerCards,
      settings.dealerCards
    );

    // Check if the number unique for array than add that number

    // If the number is odd than push it to the player cards array
    if (!isElExist && i % 2 !== 0) {
      settings.playerCards.push(oneCard);
      // If the number is even than push it to the dealer cards array
    } else if (!isElExist && i % 2 === 0) {
      settings.dealerCards.push(oneCard);
    } else {
      continue;
    }
    i += 1;
    // Condition i < 5 because we need a init array with 4 elements.
  } while (i < 5);
  settings.playerSum = calcSum(showCards(settings.playerCards, fullCardDeck));
  settings.dealerSum = calcSum(showCards(settings.dealerCards, fullCardDeck));
  console.log('PLAYER CARDS SHORT : ', settings.playerCards);
  console.log('DEALER CARDS SHORT: ', settings.dealerCards);
  console.log(
    'PLAYER CARDS FULL: ',
    showCards(settings.playerCards, fullCardDeck)
  );
  console.log(
    'DEALER CARDS FULL: ',
    showCards(settings.dealerCards, fullCardDeck)
  );
  console.log('PLAYER CARDS SUM : ', settings.playerSum);
  console.log('DEALER CARDS SUM : ', settings.dealerSum);
  console.log('Game Counts AFTER : ', settings);
}

function playerHit(settings) {
  // Initialization of a variable to add another card to an array of player
  const i = settings.playerCards.length;
  console.log(settings.playerCards);
  console.log(i);

  // Adding another card to an array of user
  do {
    const oneCard = addNewCard();
    console.log('GENERATED CARD', oneCard);
    // Check is the random number in our array.
    const isElExist = isElementInArray(
      oneCard,
      settings.playerCards,
      settings.dealerCards
    );
    // Check if the number unique for array than add that number
    if (!isElExist) {
      settings.playerCards.push(oneCard);
      console.log('i AFTER CARD ADD TO ARRAY', i);
      console.log('PLAYER CARDS ARRAY AFTER ADD CARD', settings.playerCards);
    } else {
      console.log('BEFORE CONTINUE');
      continue;
    }
    // If the sum of the cards exceeds 21, then the player lost.
    const sum = calcSum(showCards(settings.playerCards, fullCardDeck));
    console.log('PLAYER CARDS SUM : ', sum);
    if (sum > 21) {
      alert('TO MUCH !!!!');
      break;
    }
    // finish loop when the length of the array will be +1 element
  } while (i === settings.playerCards.length);
  console.log('PLAYER CARDS LENGTH AFTER ALL', settings.playerCards.length);
}

function playerStand() {}

function addNewCard() {
  return Math.floor(Math.random() * 52);
}

/**
 * The function takes user cards array with numbers and full deck array.
 * Function returns an array with a ratio of a random number and map maps
 */

function showCards(userCardsArray, deck) {
  const gameCards = [];
  for (let card of userCardsArray) {
    gameCards.push(deck[card]);
  }

  return gameCards;
}

/**
 *
 * The function accepts an array of objects with cards and returns the amount of values
 */

function calcSum(userCardsArray) {
  let allSum = userCardsArray.reduce(
    (acc, { value }) => acc + Number(value),
    0
  );
  let cardsArray = userCardsArray.map(({ card }) => card);
  if (cardsArray.includes('a') && allSum > 21) {
    return userCardsArray.reduce(
      (acc, { value }) => (value == 11 ? acc + 1 : acc + value),
      0
    );
  } else {
    return allSum;
  }
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
  // Create full deck with 52 cards.
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
