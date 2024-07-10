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
  clockString: document.querySelector('.clock'),
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
  <img src=${imgFront} alt=${card}-${type}-${value} width="120"/>
  </div>`;
}

function drawAllCards(cardArray) {
  return cardArray.reduce((acc, card) => (acc += drawCard(card)), '');
}

/**
 *  The feature takes out time to the field in the header
 */

// Used code from https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function startTime() {
  const today = new Date();
  let h = pad(today.getHours());
  let m = pad(today.getMinutes());
  let s = pad(today.getSeconds());

  refs.clockString.innerHTML = h + ':' + m + ':' + s;

  setTimeout(startTime, 1000);
}

/**
 *  The function accepts the number.Converts the number to a term.
 *  Adds to the beginning of 0 if the number is less than 2 characters.
 */

function pad(value) {
  return String(value).padStart(2, '0');
}

export { bodyStyle, btnDisabled, drawAllCards, drawCard, refs, startTime };
