import { gameCounts } from './gameCounts.js';

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
    el.description = ``;
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
 *  The function accepts the first value number by the second value of an array of objects
 * Returns the object that is replacing the map from the deck.
 */

function showCard(number, deck) {
  return deck[number];
}

/**
 * The function returns random number from 0 to 52.
 */

function dealRandomCardNumber() {
  return Math.floor(Math.random() * 52);
}

function clearLocalStorage() {
  localStorage.clear();
}

export {
  buildDeck,
  clearLocalStorage,
  dealCards,
  dealRandomCardNumber,
  showCard,
};
