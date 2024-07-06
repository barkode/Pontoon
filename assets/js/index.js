import { gameCounts } from './gameCounts.js';

import { defaultSettings } from './settings.js';

// const {
//   getDealerCards,
//   getDealerSum,
//   getLoseCount,
//   getPlayerCards,
//   getPlayerName,
//   getPlayerSum,
//   getWinCount,
//   resetCounts,
//   resetDealerCards,
//   resetPlayerCards,
//   resetPlayerName,
//   setDealerCard,
//   setLoseCount,
//   setPlayerCard,
//   setPlayerName,
//   setWinCount,
// } = gameCounts;

// Buttons

const refs = {
  startButton: document.getElementById('start'),
  hitButton: document.getElementById('hit'),
  standButton: document.getElementById('stand'),
  form: document.getElementById('form'),
};

refs.startButton.addEventListener('click', e => {
  console.log('START BUTTON:');
  startGame(gameCounts);
});
refs.hitButton.addEventListener('click', e => {
  console.log('HIT BUTTON: ');
  playerHit(gameCounts);
});
refs.standButton.addEventListener('click', e => {
  console.log('STAND BUTTON: ');
  playerStand(gameCounts);
});

const fullCardDeck = buildDeck(defaultSettings);
console.log('FULL DECK OF CARDS : ', fullCardDeck);
const handoutArray = [];

function startGame(prefs) {
  // Reset all elements at the beginning of the game.
  handoutArray.length = 0;
  prefs.resetCounts();
  prefs.resetPlayerCards();
  prefs.resetDealerCards();

  dealCards(handoutArray, fullCardDeck);

  console.log('PLAYER SUM : ', prefs.getPlayerSum());
  console.log('DEALER SUM : ', prefs.getDealerSum());
}

/**
 *The feature accepts an array with settings
 * Adds the card to playing
 * Checks the amount of cards from the player in his hands.If the sum is more than 21 then completes the work.
 */

function playerHit(prefs) {
  // Initialization of a variable to add another card to an array of player
  const i = prefs.getPlayerCards().length;

  // Check if there is a values in array. If not - then return
  if (i === 0) {
    return;
  }
  // Adding another card to an array of user
  do {
    const oneCard = dealRandomCardNumber();

    // Check is the random number in our array.
    const isElExist = handoutArray.includes(oneCard);

    // Check if the number unique for array than add that number

    if (isElExist) {
      continue;
    }

    handoutArray.push(oneCard);

    prefs.setPlayerCard(showCard(oneCard, fullCardDeck));
    console.log('ADD CARD TO PLAYER : ', prefs.getPlayerCards());
    console.log('TOTAL SUM : ', prefs.getPlayerSum());

    // If the sum of the cards exceeds 21, then the player lost.

    if (prefs.getPlayerSum() > 21) {
      alert(`SORRY. BUT ${prefs.getPlayerSum()} IS TO MUCH ;(((`);
      break;
    }
    // finish loop when the length of the array will be +1 element
  } while (i === prefs.getPlayerCards().length);
}

function playerStand(prefs) {
  // / Initialization of a variable to add another card to an array of dealer
  const i = prefs.getDealerCards().length;
  // const sum = prefs.getDealerSum();

  // Check if there is a values in array. If not - then return
  if (i === 0) {
    return;
  }

  do {
    if (prefs.getDealerSum() >= 17) {
      break;
    }

    // Adding another card to an array of user
    const oneCard = dealRandomCardNumber();

    // Check is the random number in our array.
    const isElExist = handoutArray.includes(oneCard);

    // Check if the number unique for array than add that number
    if (isElExist) {
      continue;
    }

    prefs.setDealerCard(showCard(oneCard, fullCardDeck));

    console.log(showCard(oneCard, fullCardDeck));
    console.log('DEALER SUM : ', prefs.getDealerCards());

    // If the sum of the cards exceeds 21, then the player lost.

    if (prefs.getDealerSum() > 21) {
      alert(`SORRY. BUT ${prefs.getDealerSum()} IS TO MUCH ;(((`);
      break;
    }
    // finish loop when the length of the array will be +1 element
  } while (prefs.getDealerSum() < 21);

  console.log(
    `STOP : ${
      prefs.getDealerSum() > prefs.getPlayerSum() ? 'DEALER WIN' : 'PLAYER WIN'
    }`
  );
}

function dealCards(handOutArr, deck) {
  // Init counter. Counter used for init quantity of elements in array
  let i = 1;
  // Player and dealer cards
  do {
    const oneCard = dealRandomCardNumber();

    // Check is the random number in our array.
    const isElExist = handOutArr.includes(oneCard);

    // Check if the number unique for array than add that number

    if (isElExist) {
      continue;
    }

    handOutArr.push(oneCard);

    // Condition i < 5 because we need to init array with 4 elements.
    i += 1;
  } while (i < 5);

  console.log('ARRAY RANDOM CARDS', handOutArr);
  // If the number is odd than push it to the player cards array otherwise push to dealer cards array
  // If the number is even than push it to the dealer cards array

  handOutArr.forEach((item, index) =>
    gameCounts[index % 2 === 0 ? 'setPlayerCard' : 'setDealerCard'](
      showCard(item, deck)
    )
  );

  console.log('PLAYER CARDS : ', gameCounts.getPlayerCards());
  console.log('DEALER CARDS : ', gameCounts.getDealerCards());
  console.log('OBJECT : '.gameCounts);
}

/**
 * The function returns random number from 0 to 52.
 */

function dealRandomCardNumber() {
  return Math.floor(Math.random() * 52);
}

/**
 *  The function accepts the first value number by the second value of an array of objects
 * Returns the object that is replacing the map from the deck.
 */

function showCard(number, deck) {
  return deck[number];
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
