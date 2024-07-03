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
const IMAGE_FORMAT = 'jpg';

/**
 * Create new deck.
 * Return array of object. Each object is a cart with type, value, name and image;
 */
function buildDeck(
  cards,
  types,
  deckName = DEFAULT_DECK,
  IMAGE_FORMAT = 'jpg'
) {
  const fullDeck = [];
  for (let type of types) {
    for (let card of cards) {
      fullDeck.push({
        card,
        type,
        imgFront: `./assets/images/${deckName}/${deckName}-${card}-${type}.${IMAGE_FORMAT}`,
        imgBack: `./assets/images/${deckName}/backCard.${IMAGE_FORMAT}`,
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

/**
 * Create card from object
 */
function createCard(element) {}

// function createCardImage({ card, type, img }) {
//   const cardImg = document.createElement('img');
//   cardImg.src = img;
//   cardImg.alt = `${card}-${type}-${card}`;
// }

function showCards(array) {
  const divEl = document.getElementById('root');
  const list = document.createElement('ul');
  list.style.display = 'flex';
  list.style.flexWrap = 'wrap';
  list.style.gap = '20px';
  list.style.listStyleType = 'none';
  // list.style.flexBasis = '150';
  list.style.backgroundColor = 'green';
  for (let el of array) {
    const item = document.createElement('li');
    const image = document.createElement('img');
    item.style.width = '150px';
    image.src = el.img;
    image.alt = `${el.card}-${el.type}`;
    image.width = '150';
    item.appendChild(image);
    list.appendChild(item);
  }
  divEl.append(list);
}

console.log(buildDeck(CARDS, CARD_TYPE));

showCards(buildDeck(CARDS, CARD_TYPE));
