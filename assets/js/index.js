import { gameCounts } from './gameCounts.js';
import { defaultGameSettings } from './settings.js';
import {
  btnDisabled,
  drawAllCards,
  getScoreFromLocalStorage,
  refs,
  setScoreToLocalStorage,
  showInfoMessage,
  showInfoWinMsg,
  startTime,
  toggleModalInfo,
} from './ui.js';
import {
  buildDeck,
  clearLocalStorage,
  dealCards,
  dealRandomCardNumber,
  showCard,
} from './utils.js';

import { dealerWin, playerWin, rules } from './infoMessages.js';

document.addEventListener('DOMContentLoaded', checkLocalPlayer, {
  once: true,
});

function checkLocalPlayer() {
  const playerFromStorage = localStorage.getItem('player-name');
  console.log(playerFromStorage);

  if (!Boolean(playerFromStorage)) {
    refs.backdrop.classList.remove('is-hidden');
    document.addEventListener('input', checkPlayerName);
    return;
  }

  gameCounts.setPlayerName(playerFromStorage);
  refs.playerName.textContent = gameCounts.getPlayerName();
  return;
}

document.addEventListener('click', btnSelect);

const fullCardDeck = buildDeck(defaultGameSettings);

const handoutArray = [];
const localStat = getScoreFromLocalStorage();
// console.log(localStat);

// Check if are values in local storage.
if (Boolean(localStat.playerScore) || Boolean(localStat.dealerScore)) {
  refs.playerWins.textContent = localStat.playerScore;
  refs.dealerWins.textContent = localStat.dealerScore;
} else {
  gameCounts.resetCounts();
}

btnDisabled({ start: false, hit: true, stand: true, rules: false });
startTime();

// Make button active, when Player starts to write them name.
function checkPlayerName(evt) {
  const isWriting = evt.target.className;
  if (isWriting === 'form-input') {
    refs.form.elements.submit.disabled = false;
    document.removeEventListener('input', checkPlayerName);
  }
}

function btnSelect(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  const action = evt.target.dataset.action;
  // Select the Action button

  switch (action) {
    case 'start':
      console.log('START BUTTON:');
      startGame(gameCounts, refs);
      break;
    case 'hit':
      console.log('HIT BUTTON: ');
      playerHit(gameCounts, refs);
      break;
    case 'stand':
      console.log('STAND BUTTON: ');
      playerStand(gameCounts, refs);
      break;
    case 'submit':
      console.log('SUBMIT BUTTON: ');
      storePlayerName(evt, gameCounts, refs);
      break;
    case 'rules':
      console.log('RULES BUTTON: ');
      showInfoMessage(rules, refs);
      break;
    case 'closeModal':
      console.log('CLOSE MODAL BUTTON: ');
      toggleModalInfo(refs);
      break;
    case 'clearData':
      console.log('CLEAR DATA');
      clearLocalStorage();
      break;
    default:
      break;
  }
}

function storePlayerName(_, prefs, refs) {
  const isAgeConfirmed = refs.checkAge.checked;
  const playerNameFromForm = refs.form.elements.name.value.trim();
  refs.errorName.textContent = '';
  refs.errorAge.textContent = '';

  if (!Boolean(playerNameFromForm)) {
    refs.errorName.textContent = 'enter your name';
    return;
  }
  if (!isAgeConfirmed) {
    refs.errorAge.textContent = 'You must be 18+ years';
    return;
  }

  const inputCheck = document.querySelector('.confirm-input');
  console.log(inputCheck.checked);

  prefs.setPlayerName(playerNameFromForm);

  localStorage.setItem('player-name', playerNameFromForm);

  refs.backdrop.classList.add('is-hidden');
  refs.playerName.textContent = prefs.getPlayerName();

  console.log(prefs.getPlayerName());
}

function startGame(prefs, refs) {
  // Reset all elements at the beginning of the game.
  handoutArray.length = 0;
  const isModalInfoHidden = refs.modalInfo.classList.contains('is-hidden');

  if (!isModalInfoHidden) {
    refs.modalInfo.classList.add('is-hidden');
  }

  prefs.resetPlayerCards();
  prefs.resetDealerCards();
  refs.playerField.innerHTML = '';
  refs.dealerField.innerHTML = '';

  dealCards(handoutArray, fullCardDeck);

  console.log(prefs.getPlayerCards());
  console.log(prefs.getDealerCards());

  btnDisabled({ start: true, hit: false, stand: false, rules: false });

  console.log(drawAllCards(prefs.getPlayerCards()));

  // Show dealer cards
  refs.dealerField.innerHTML = drawAllCards(prefs.getDealerCards());

  // Show player cards
  refs.playerField.innerHTML = drawAllCards(prefs.getPlayerCards());

  console.log('PLAYER SUM : ', prefs.getPlayerScore());
  console.log('DEALER SUM : ', prefs.getDealerScore());
}

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

    // Add card to player array
    prefs.setPlayerCard(showCard(oneCard, fullCardDeck));

    // Show player cards
    refs.playerField.innerHTML = drawAllCards(prefs.getPlayerCards());

    // Show player score
    // refs.playerScore.textContent = prefs.getPlayerScore();

    console.log('ADD CARD TO PLAYER : ', prefs.getPlayerCards());
    console.log('TOTAL SUM : ', prefs.getPlayerScore());

    // If the sum of the cards exceeds 21, then the player lost.

    if (prefs.getPlayerScore() > 21) {
      prefs.setDealerWinCount();
      refs.dealerWins.textContent = prefs.getDealerWinCount();

      console.log(prefs.getDealerWinCount());

      setScoreToLocalStorage(gameCounts);

      btnDisabled({ start: false, hit: true, stand: true, rules: false });

      showInfoWinMsg(dealerWin, refs, gameCounts);
      break;
    }
    // finish loop when the length of the array will be +1 element
  } while (i === prefs.getPlayerCards().length);
}

function playerStand(prefs) {
  // / Initialization of a variable to add another card to an array of dealer

  btnDisabled({ start: true, hit: true, stand: true, rules: false });

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

    // Show dealer cards
    refs.dealerField.innerHTML = drawAllCards(prefs.getDealerCards());

    console.log(showCard(oneCard, fullCardDeck));
    console.log('DEALER SUM : ', prefs.getDealerScore());

    // If the sum of the cards exceeds 21, then the player lost.

    if (prefs.getDealerScore() > 21) {
      prefs.setPlayerWinCount();

      setScoreToLocalStorage(gameCounts);

      refs.playerWins.textContent = prefs.getPlayerWinCount();

      showInfoWinMsg(playerWin, refs, gameCounts);

      btnDisabled({ start: false, hit: true, stand: true, rules: true });

      return;
    }
    // finish loop when the length of the array will be +1 element
  } while (prefs.getDealerScore() < 21);

  btnDisabled({ start: false, hit: true, stand: true, rules: false });

  if (prefs.getDealerScore() > prefs.getPlayerScore()) {
    prefs.setDealerWinCount();
    localStorage.setItem('dealer-score', prefs.getDealerWinCount());
    refs.dealerWins.textContent = prefs.getDealerWinCount();

    showInfoWinMsg(dealerWin, refs, gameCounts);
  } else {
    prefs.setPlayerWinCount();

    setScoreToLocalStorage(gameCounts);

    refs.playerWins.textContent = prefs.getPlayerWinCount();

    showInfoWinMsg(playerWin, refs, gameCounts);
  }

  console.log(
    `STOP : ${
      prefs.getDealerScore() > prefs.getPlayerScore()
        ? 'DEALER WIN'
        : 'PLAYER WIN'
    }`
  );
}
