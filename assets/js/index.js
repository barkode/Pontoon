import { gameCounts } from './gameCounts.js';
import { defaultSettings } from './settings.js';
import {
  buildDeck,
  dealCards,
  dealRandomCardNumber,
  showCard,
} from './utils.js';

import { btnDisabled } from './ui.js';

// Object with all links to elements

const refs = {
  btnsSection: document.getElementById('buttons'),
  // startBtn: document.getElementById('start'),
  // hitBtn: document.getElementById('hit'),
  // standBtn: document.getElementById('stand'),
  playerScore: document.getElementById('player-score'),
  dealerScore: document.getElementById('dealer-score'),
  dealerWins: document.getElementById('dealer-wins'),
  playerWins: document.getElementById('player-wins'),
  form: document.getElementById('form'),
};

refs.btnsSection.addEventListener('click', btnSelect);

const fullCardDeck = buildDeck(defaultSettings);
// console.log('FULL DECK OF CARDS : ', fullCardDeck);
const handoutArray = [];
gameCounts.resetCounts();

function btnSelect(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  const action = evt.target.dataset.action;
  switch (action) {
    case 'start':
      console.log('START BUTTON:');
      startGame(gameCounts);
      break;
    case 'hit':
      console.log('HIT BUTTON: ');
      playerHit(gameCounts);
      break;
    case 'stand':
      console.log('STAND BUTTON: ');
      playerStand(gameCounts);
      break;
    default:
      break;
  }
}

function startGame(prefs) {
  // Reset all elements at the beginning of the game.
  handoutArray.length = 0;
  prefs.resetPlayerCards();
  prefs.resetDealerCards();

  dealCards(handoutArray, fullCardDeck);

  btnDisabled({ start: true, hit: false, stand: false });
  // refs.hitBtn.disabled = false;
  // refs.standBtn.disabled = false;
  // refs.startBtn.disabled = true;

  refs.playerScore.textContent = prefs.getPlayerScore();
  refs.dealerScore.textContent = prefs.getDealerScore();

  console.log('PLAYER SUM : ', prefs.getPlayerScore());
  console.log('DEALER SUM : ', prefs.getDealerScore());
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
    refs.playerScore.textContent = prefs.getPlayerScore();

    console.log('ADD CARD TO PLAYER : ', prefs.getPlayerCards());
    console.log('TOTAL SUM : ', prefs.getPlayerScore());

    // If the sum of the cards exceeds 21, then the player lost.

    if (prefs.getPlayerScore() > 21) {
      alert(`SORRY. BUT ${prefs.getPlayerScore()} IS TO MUCH ;(((`);

      prefs.setDealerWinCount();
      refs.dealerWins.textContent = prefs.getDealerWinCount();

      console.log(prefs.getDealerWinCount());

      btnDisabled({ start: false, hit: true, stand: true });

      break;
    }
    // finish loop when the length of the array will be +1 element
  } while (i === prefs.getPlayerCards().length);
}

function playerStand(prefs) {
  // / Initialization of a variable to add another card to an array of dealer

  btnDisabled({ start: true, hit: true, stand: true });

  const i = prefs.getDealerCards().length;
  // Check if there is a values in array. If not - then return
  if (i === 0) {
    return;
  }

  do {
    if (prefs.getDealerScore() >= 17) {
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
    refs.dealerScore.textContent = prefs.getDealerScore();

    console.log(showCard(oneCard, fullCardDeck));
    console.log('DEALER SUM : ', prefs.getDealerScore());

    // If the sum of the cards exceeds 21, then the player lost.

    if (prefs.getDealerScore() > 21) {
      alert(`SORRY. BUT ${prefs.getDealerScore()} IS TO MUCH ;(((`);

      prefs.setPlayerWinCount();
      refs.playerWins.textContent = prefs.getPlayerWinCount();

      btnDisabled({ start: false, hit: true, stand: true });

      return;
    }
    // finish loop when the length of the array will be +1 element
  } while (prefs.getDealerScore() < 21);

  btnDisabled({ start: false, hit: true, stand: true });

  if (prefs.getDealerScore() > prefs.getPlayerScore()) {
    alert('Dealer WINS');
    prefs.setDealerWinCount();
    refs.dealerWins.textContent = prefs.getDealerWinCount();
  } else {
    alert('YOU WIN');
    prefs.setPlayerWinCount();
    refs.playerWins.textContent = prefs.getPlayerWinCount();
  }

  console.log(
    `STOP : ${
      prefs.getDealerScore() > prefs.getPlayerScore()
        ? 'DEALER WIN'
        : 'PLAYER WIN'
    }`
  );
}
