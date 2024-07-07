const refs = {
  // btnsSection: document.getElementById('buttons'),
  startBtn: document.getElementById('start'),
  hitBtn: document.getElementById('hit'),
  standBtn: document.getElementById('stand'),
  playerScore: document.getElementById('player-score'),
  dealerScore: document.getElementById('dealer-score'),
  dealerWins: document.getElementById('dealer-wins'),
  playerWins: document.getElementById('player-wins'),
  form: document.getElementById('form'),
};

export function btnDisabled({ start, hit, stand }) {
  refs.startBtn.disabled = start;
  refs.hitBtn.disabled = hit;
  refs.standBtn.disabled = stand;
}
