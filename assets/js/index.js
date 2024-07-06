import { gameCounts } from './gameCounts.js';
import { defaultSettings } from './settings.js';
import {
  buildDeck,
  dealCards,
  dealRandomCardNumber,
  showCard,
} from './utils.js';

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
 * Checks the amount of cards from the player in his hands.
 * If the sum is more than 21 then completes the work.
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
