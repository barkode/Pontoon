// Game counts object
const gameCounts = {
  counts: [0, 0],
  playerCards: [],
  dealerCards: [],
  playerName: '',

  getPlayerWinCount() {
    return this.counts[0];
  },

  setPlayerWinCount() {
    this.counts[0] += 1;
  },

  getDealerWinCount() {
    return this.counts[1];
  },

  setDealerWinCount() {
    this.counts[1] += 1;
  },

  resetCounts() {
    this.counts = [0, 0];
  },
  // Sum player points
  getPlayerScore() {
    const { playerCards } = this;
    const isAce = playerCards.map(({ card }) => card).includes('a');
    if (!isAce) {
      return playerCards.reduce((acc, el) => acc + el.value, 0);
    }
    return playerCards.reduce(
      (acc, { value }) => (value == 11 ? acc + 1 : acc + value),
      0
    );
  },
  // Sum dealer points
  getDealerScore() {
    const { dealerCards } = this;
    const isAce = dealerCards.map(({ card }) => card).includes('a');
    if (!isAce) {
      return dealerCards.reduce((acc, el) => acc + el.value, 0);
    }
    return dealerCards.reduce(
      (acc, { value }) => (value == 11 ? acc + 1 : acc + value),
      0
    );
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

export { gameCounts };
