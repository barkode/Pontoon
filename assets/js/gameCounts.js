// Game counts object
export const gameCounts = {
  counts: [],
  playerCards: [],
  dealerCards: [],
  playerName: '',

  getWinCount() {
    return this.counts[0];
  },

  setWinCount(newCount) {
    this.counts[0] = newCount;
  },

  getLoseCount() {
    return this.counts[1];
  },

  setLoseCount(newCount) {
    this.counts[1] = newCount;
  },

  resetCounts() {
    this.counts = [];
  },

  getPlayerSum() {
    return this.playerCards.reduce((acc, el) => acc + el.value, 0);
  },

  getDealerSum() {
    return this.dealerCards.reduce((acc, el) => acc + el.value, 0);
  },

  getPlayerCards() {
    return this.playerCards;
  },

  setPlayerCard(newCard) {
    this.playerCards.push(newCard);
  },

  resetPlayerCards() {
    this.playerCards = [];
  },

  getDealerCards() {
    return this.dealerCards;
  },

  setDealerCard(newCard) {
    this.dealerCards.push(newCard);
  },

  resetDealerCards() {
    this.dealerCards = [];
  },

  getPlayerName() {
    return this.playerName;
  },

  setPlayerName(newName) {
    this.playerName = newName;
  },

  resetPlayerName() {
    this.playerName = '';
  },
};
