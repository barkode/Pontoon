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
  console.log('START BUTTON: ', e);
  startGame(gameCounts);
});
refs.hitButton.addEventListener('click', e => {
  console.log('HIT BUTTON: ', e);
  playerHit(gameCounts);
});
refs.standButton.addEventListener('click', e => {
  console.log('STAND BUTTON: ', e);
  playerStand(gameCounts);
});

const fullCardDeck = buildDeck(defaultSettings);
const handoutArray = [];

function startGame(settings) {
  console.log('Game Counts BEFORE : ', settings);

  // Reset all elements at the beginning of the game.

  gameCounts.resetPlayerCards();
  gameCounts.resetDealerCards();
  gameCounts.resetCounts();

  dealCards(handoutArray, fullCardDeck);
}

/**
 *The feature accepts an array with settings
 * Adds the card to playing
 * Checks the amount of cards from the player in his hands.If the sum is more than 21 then completes the work.
 */

function playerHit(settings) {
  // Initialization of a variable to add another card to an array of player
  const i = settings.playerCards.length;

  // Check if there is a values in array. If not - then return
  if (i === 0) {
    return;
  }
  console.log(settings.playerCards);
  console.log(i);
  // Adding another card to an array of user
  do {
    const oneCard = dealANewCard();
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
    const sum = calcCardSum(showCards(settings.playerCards, fullCardDeck));
    console.log('PLAYER CARDS SUM : ', sum);
    if (sum > 21) {
      alert(`SORRY. BUT ${sum} IS TO MUCH ;(((`);
      break;
    }
    // finish loop when the length of the array will be +1 element
  } while (i === settings.playerCards.length);
  console.log('PLAYER CARDS LENGTH AFTER ALL', settings.playerCards.length);
}

function playerStand(settings) {
  const i = settings.dealerCards.length;

  // Check if there is a values in array. If not - then return
  if (i === 0) {
    return;
  }

  console.log(settings.dealerCards);
  console.log(i);
  // Adding another card to an array of user
  do {
    const sum = calcCardSum(showCards(settings.dealerCards, fullCardDeck));
    const oneCard = dealANewCard();

    if (sum > 17 && sum <= 21) {
      console.log(
        'STOP : ',
        calcCardSum(showCards(settings.dealerCards, fullCardDeck)) >
          calcCardSum(showCards(settings.playerCards, fullCardDeck))
          ? `Dealer WIN: ${sum} points`
          : `PLAYER WIN: ${calcCardSum(
              showCards(settings.playerCards, fullCardDeck)
            )} points`
      );
      break;
    }

    // Check is the random number in our array.
    const isElExist = isElementInArray(
      oneCard,
      settings.playerCards,
      settings.dealerCards
    );

    // Check if the number unique for array than add that number
    if (!isElExist) {
      settings.dealerCards.push(oneCard);
      console.log('i AFTER CARD ADD TO ARRAY', i);
      console.log('DEALER CARDS ARRAY AFTER ADD CARD', settings.dealerCards);
    } else {
      continue;
    }

    // If the sum of the cards exceeds 21, then the player lost.
    console.log(
      'DEALER CARDS SUM : ',
      calcCardSum(showCards(settings.dealerCards, fullCardDeck))
    );

    if (sum > 21) {
      alert(`SORRY. BUT ${sum} IS TO MUCH ;(((`);
      break;
    }
    // finish loop when the length of the array will be +1 element
  } while (calcCardSum(showCards(settings.dealerCards, fullCardDeck)) > 17);
  console.log('DEALER CARDS LENGTH AFTER ALL', settings.dealerCards.length);
}

function dealCards(handOutArr, deck) {
  // Init counter. Counter used for init quantity of elements in array
  let i = 1;
  // Player and dealer cards
  do {
    const oneCard = dealANewCard();

    // Check is the random number in our array.
    const isElExist = isElInArray(oneCard, handOutArr);

    // Check if the number unique for array than add that number

    if (isElExist) {
      continue;
    }

    handOutArr.push(oneCard);

    // // If the number is odd than push it to the player cards array
    // if (!isElExist && i % 2 !== 0) {
    //   handOutArr.push(oneCard);
    //   // If the number is even than push it to the dealer cards array
    // } else if (!isElExist && i % 2 === 0) {
    // } else {
    //   continue;
    // }

    // Condition i < 5 because we need to init array with 4 elements.
    i += 1;
  } while (i < 5);

  console.log(handOutArr);
  handOutArr.forEach((item, index) => {
    if (index % 2 === 0) {
      gameCounts.setPlayerCard(deck[item]);
    } else {
      gameCounts.setDealerCard(deck[item]);
    }
  });
  console.log(gameCounts.getPlayerCards());
  console.log(gameCounts.getDealerCards());
}

function dealANewCard() {
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

function calcCardSum(userCardsArray) {
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

function isElInArray(element, array) {
  return array.includes(element);
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
