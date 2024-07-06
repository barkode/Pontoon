// Game settings

export const defaultSettings = {
  cards: ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k'],
  cardType: ['clubs', 'hearts', 'diamonds', 'spades'],
  deckName: 'deck1',
  imgFormat: 'jpg',
};

// Game counts
export const gameCounts = {
  winCount: 0,
  loseCount: 0,
  playerSum: 0,
  dealerSum: 0,
  playerCards: [],
  dealerCards: [],
  playerName: '',

  getWinCount() {
    return this.winCount;
  },

  setWinCount(newCount) {
    this.winCount = newCount;
  },

  resetWinCount() {
    this.winCount = 0;
  },

  getLoseCount() {
    return this.loseCount;
  },

  setLoseCount(newCount) {
    this.loseCount = newCount;
  },

  resetLoseCount() {
    this.loseCount = 0;
  },

  getPlayerSum() {
    // return playerCards.reduce((acc, el) => acc + el.value, 0);
    return this.playerSum;
  },

  setPlayerSum(newCount) {
    this.playerSum = newCount;
  },

  resetPlayerSum() {
    this.playerSum = 0;
  },

  getDealerSum() {
    // return dealerCards.reduce((acc, el) => acc + el.value, 0);
    return this.dealerSum;
  },

  setDealerSum(newCount) {
    this.dealerSum = newCount;
  },
  resetDealerSum() {
    this.dealerSum = 0;
  },

  getPlayerCards() {
    return this.playerCards;
  },

  setPlayerCards(newCard) {
    if (Array.isArray(newCard)) {
      this.playerCards.push(...newCard);
    } else if (typeof newCard === 'string') {
      this.playerCards.push(newCard);
    } else {
      return;
    }
  },

  resetPlayerCards() {
    this.playerCards = [];
  },

  getDealerCards() {
    return this.dealerCards;
  },

  setDealerCards(newCard) {
    if (Array.isArray(newCard)) {
      this.dealerCards.push(...newCard);
    } else if (typeof newCard === 'string') {
      this.dealerCards.push(newCard);
    } else {
      return;
    }
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
