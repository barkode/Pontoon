// Object with all links to elements

const refs = {
  rootDiv: document.getElementById('root'),
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
};

function btnDisabled({ start, hit, stand }) {
  refs.startBtn.disabled = start;
  refs.hitBtn.disabled = hit;
  refs.standBtn.disabled = stand;
}

function bodyStyle() {
  console.log(document.body);
}

function drawCard() {}

export { bodyStyle, btnDisabled, drawCard, refs };
