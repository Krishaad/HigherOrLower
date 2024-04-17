const suits = ["h", "d", "c", "s"];
const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

let deck = [];
let currentCard; // Define currentCard globally for accessibility
let counter = 0;
function updateCounterDisplay() {
  const counterElement = document.getElementById("counter");
  counterElement.textContent = `Correct Guesses: ${counter}`;
}
function createDeck() {
  const newDeck = [];
  for (const suit of suits) {
    for (const value of values) {
      newDeck.push({ value, suit });
    }
  }
  return newDeck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function startGame() {
  deck = createDeck();
  counter = 0;

  shuffleDeck(deck);
  displayNextCard(); // Call displayNextCard initially to show first card
  updateCounterDisplay();
}

function displayCard(card) {
  const cardImage = document.getElementById("card-image");
  cardImage.src = `cards/${card.value.toLowerCase()}_${card.suit.toLowerCase()}.png`;
  //const cardDisplay = document.getElementById("card-display");
  //cardDisplay.textContent = `Card: ${card.value} of ${card.suit}`;
}

function displayNextCard() {
  if (deck.length > 0) {
    currentCard = deck.pop(); // Update the current card
    displayCard(currentCard);
  } else {
    alert("No more cards in the deck.");
    startGame();
  }
}

function guess(playerGuess) {
  if (deck.length < 1) {
    alert("Not enough cards left to continue.");
    startGame();
    return;
  }

  const nextCard = deck[deck.length - 1]; // Peek at the next card without removing it

  if (
    playerGuess === "higher" &&
    values.indexOf(currentCard.value) <= values.indexOf(nextCard.value)
  ) {
    counter++;
    updateCounterDisplay();
    displayNextCard();
  } else if (
    playerGuess === "lower" &&
    values.indexOf(currentCard.value) >= values.indexOf(nextCard.value)
  ) {
    counter++;
    updateCounterDisplay();
    displayNextCard();
  } else {
    alert(
      `Incorrect! You guessed ${playerGuess}, but the next card was ${nextCard.value} of ${nextCard.suit}. The current card was ${currentCard.value} of ${currentCard.suit}.`
    );
    startGame();
  }
}

window.onload = startGame;
