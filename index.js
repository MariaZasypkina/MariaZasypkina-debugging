const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
let maxNumberOfAttempts = 5; // Maria - const/let

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10); 
  attempts = attempts + 1;

  hideAllMessages();

  if(guess < 1) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `Your guess must be at least 1`;
    return;
  }

  if(guess > 99) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `Your guess must be less than or equal to 99`;
    return;
  }

  if (guess === targetNumber) {
    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;

    correctMessage.style.display = '';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess !== targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = '';
    } else {
      tooHighMessage.style.display = ''; // Maria - was tooLowMessage for a second time
    }

    let remainingAttempts = maxNumberOfAttempts - attempts; // Maria - const/let

    let guessWord = remainingAttempts === 1 ? 'guess' : 'guesses';

    numberOfGuessesMessage.style.display = '';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} ${guessWord} remaining`;
  }

  if (attempts === maxNumberOfAttempts) { // Maria - extra '='
    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  guessInput.value = '';

  resetButton.style.display = '';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex < messages.length; elementIndex++) { // Maria - < instead of <=
    messages[elementIndex].style.display = 'none';
  }
}

function setup() { // Maria - typo 'funtion'
  // Get random number
  targetNumber = getRandomNumber(1, 100);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0; // Maria - not max number of attempts

  // Enable the input and submit button
  submitButton.disabled = false; //Maria - typo disabeld
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

submitButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', setup);

setup();
