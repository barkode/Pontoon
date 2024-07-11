import { gameCounts } from './gameCounts.js';
import { defaultGameSettings } from './settings.js';
import {
  btnDisabled,
  dealerFirstHand,
  drawAllCards,
  getScoreFromLocalStorage,
  refs,
  setScoreToLocalStorage,
  showInfoWinMsg,
  showRulesMessage,
  startTime,
  toggleButtonSection,
  toggleModalInfo,
  toggleStatisticSection,
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

document.addEventListener('click', btnSelect);

const fullCardDeck = buildDeck(defaultGameSettings);

const handoutArray = [];
const localStat = getScoreFromLocalStorage();

// Check if are values in local storage.
if (Boolean(localStat.playerScore) || Boolean(localStat.dealerScore)) {
  refs.playerWins.textContent = localStat.playerScore;
  refs.dealerWins.textContent = localStat.dealerScore;
} else {
  gameCounts.resetCounts();
}

btnDisabled({ start: false, hit: true, stand: true, rules: false });
startTime();

/**
 * The feature chooses an action depending on the event on the buttont on the button
 */

function btnSelect(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  const action = evt.target.dataset.action;
  // Select the Action button

  switch (action) {
    case 'start':
      startGame(gameCounts, refs);
      break;
    case 'hit':
      playerHit(gameCounts, refs);
      break;
    case 'stand':
      playerStand(gameCounts, refs);
      break;
    case 'submit':
      storePlayerName(evt, gameCounts, refs);
      break;
    case 'rules':
      showRulesMessage(rules, refs);
      break;
    case 'closeModal':
      toggleModalInfo(refs);
      break;
    case 'clearData':
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

  // const inputCheck = document.querySelector('.confirm-input');

  prefs.setPlayerName(playerNameFromForm);

  localStorage.setItem('player-name', playerNameFromForm);

  toggleStatisticSection({ show: true }, refs);
  toggleButtonSection({ show: true }, refs);
  refs.backdrop.classList.add('is-hidden');
  refs.playerName.textContent = prefs.getPlayerName();
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

  btnDisabled({ start: true, hit: false, stand: false, rules: false });

  // Show dealer cards

  refs.dealerField.innerHTML = dealerFirstHand(prefs.getDealerCards());

  // Show player cards
  refs.playerField.innerHTML = drawAllCards(prefs.getPlayerCards());
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

    // If the sum of the cards exceeds 21, then the player lost.

    if (prefs.getPlayerScore() > 21) {
      prefs.setDealerWinCount();
      refs.dealerWins.textContent = prefs.getDealerWinCount();

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

    // If the sum of the cards exceeds 21, then the player lost.

    if (prefs.getDealerScore() > 21) {
      prefs.setPlayerWinCount();

      setScoreToLocalStorage(gameCounts);

      refs.playerWins.textContent = prefs.getPlayerWinCount();

      showInfoWinMsg(playerWin, refs, gameCounts);

      btnDisabled({ start: false, hit: true, stand: true, rules: false });

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

    btnDisabled({ start: false, hit: true, stand: true, rules: false });
    showInfoWinMsg(playerWin, refs, gameCounts);
  }
}

function checkLocalPlayer() {
  const playerFromStorage = localStorage.getItem('player-name');

  if (!Boolean(playerFromStorage)) {
    refs.backdrop.classList.remove('is-hidden');

    toggleButtonSection({ show: false }, refs);
    toggleStatisticSection({ show: false }, refs);

    document.addEventListener('input', checkPlayerName);
    return;
  }

  gameCounts.setPlayerName(playerFromStorage);
  refs.playerName.textContent = gameCounts.getPlayerName();

  return;
}

// Make button active, when Player starts to write them name.
function checkPlayerName(evt) {
  const isWriting = evt.target.className;
  if (isWriting === 'form-input') {
    refs.form.elements.submit.disabled = false;
    document.removeEventListener('input', checkPlayerName);
  }
}
