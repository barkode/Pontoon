// Adds strict mode to JS.
'use strict';

// CONSTANTS

const CARDS = [
  'a',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'j',
  'q',
  'k',
];

const CARD_TYPE = ['club', 'heart', 'diamond', 'spade'];
const DEFAULT_DECK = 'deck1';

/**
 *
 * Create new deck.
 * Return array of object. Each object is a cart with type, value, name and image;
 */
function buildDeck(cards, types, deckNumber = 'deck1') {
  const fullDeck = [];
  for (let type of types) {
    for (let card of cards) {
      fullDeck.push({
        card,
        type,
        img: `../images/${deckNumber}/${deckNumber}-${card}-${type}.jpg`,
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

  return fullDeck;
}

function showCards(array) {
  const divEl = document.getElementById('root');
  const cards = array.reduce(
    (acc, { card, type, img }) =>
      (acc += `<li><img src=${img} alt=${card}-${type}/><p></p></li>`),
    ''
  );
  const list = document.createElement('ul');
  divEl.append(list);
  list.innerHTML = cards;
}

console.log(buildDeck(CARDS, CARD_TYPE));

showCards(buildDeck(CARDS, CARD_TYPE));
