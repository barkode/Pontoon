// Object with all links to elements

const refs = {
  rootDiv: document.querySelector('main'),
  btnsSection: document.getElementById('buttons'),
  startBtn: document.getElementById('start'),
  hitBtn: document.getElementById('hit'),
  standBtn: document.getElementById('stand'),
  playerScore: document.getElementById('player-score'),
  dealerScore: document.getElementById('dealer-score'),
  dealerWins: document.getElementById('dealer-wins'),
  playerWins: document.getElementById('player-wins'),
  form: document.getElementById('form'),
  playerName: document.getElementById('player-name'),
  playerField: document.getElementById('player-field'),
  dealerField: document.getElementById('dealer-field'),
};

function btnDisabled({ start, hit, stand }) {
  refs.startBtn.disabled = start;
  refs.hitBtn.disabled = hit;
  refs.standBtn.disabled = stand;
}

function bodyStyle() {
  console.log(document.body);
}

function drawCard(item) {
  const { card, type, value, imgFront, imgBack } = item;
  return `<div class="draw-card-item">
  <img src=${imgFront} alt=${card}-${type}-${value}/>
  </div>`;
}

function drawAllCards(cardArray) {
  return cardArray.reduce((acc, card) => (acc += drawCard(card)), '');
}

export { bodyStyle, btnDisabled, drawAllCards, drawCard, refs };
