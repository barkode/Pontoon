// There are messages for the information window

const dealerWin = ``;

const playerWin = ``;

const rules = `
  <h1 class="rules-header">Rules:</h1>
  <ul class="rules-list">
    <li class="rules-list-item">
      Objective: Reach a hand value closer to 21 than the dealer without
      exceeding 21.
    </li>
    <li class="rules-list-item">
      Card Values: Number cards are worth their face value, face cards (Jack,
      Queen, King) are worth 10, and Aces can be 1 or 11.
    </li>
    <li class="rules-list-item">
      Blackjack: An Ace and a 10-value card on the initial deal is a Blackjack,
      the highest hand.
    </li>
    <li class="rules-list-item">
      Initial Deal: Each player and the dealer receive two cards, with the
      dealer having one card face up.
    </li>
    <li class="rules-list-item">
      Player Choices: Players can "Hit" to take another card or "Stand" to keep
      their current hand.
    </li>
    <li class="rules-list-item">
      Dealer Rules: The dealer must hit until their hand value is 17 or higher.
    </li>
    <li class="rules-list-item">
      Winning: Players win if their hand is closer to 21 than the dealer's
      without busting.
    </li>
    <li class="rules-list-item">
      Bust: If a player's hand exceeds 21, they bust and lose the round.
    </li>
  </ul>
`;

export { dealerWin, playerWin, rules };
