// The list of words for the child to practice
const wordsToPractice = ["apple", "banana", "bathroom", "brother", "car", "carrot", "cat", "chair", "computer", "dad", "day", "dog", "ear", "fall", "feet", "fingers", "foot", "football", "fridge", "garlic", "hand", "happiness", "happy", "head", "heart", "house", "ice", "knees", "lemon", "milk", "mom", "motorcycle", "night", "onion", "orange", "pepper", "potato", "room", "salt", "school", "sister", "spring", "summer", "table", "tomato", "wall", "water", "winter"];

// Function to play the word sound
function playWordSound(word) {
  const wordSound = new Audio(`sounds/word_sounds/english/${word}.mp3`);
  wordSound.play();
}

// Function to play the letter sound
function playLetterSound(letter) {
  const letterSound = new Audio(`sounds/letter_sounds/${letter.toUpperCase()}.wav`);
  letterSound.play();
}

// Function to play the success sound
function playSuccessSound() {
  const successSound = new Audio('sounds/success/congratulations.mp3');
  successSound.play();
}

function updateDisplayedWord(newWord) {
  const wordDisplay = document.getElementById('wordDisplay');
  wordDisplay.innerHTML = newWord.toLowerCase().split('').map(letter =>
    `<span class="letter">${letter}</span>`
  ).join('');
}

// Function to get the current word from the display
function getCurrentWord() {
  return Array.from(document.getElementsByClassName('letter')).map(span => span.textContent).join('');
}

// Function to show a message (for success, etc.)
function showMessage(text) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = text;
}

// Function to handle keypresses and color changes
function handleKeyPress(event) {
  const typedWord = event.target.value.toLowerCase();
  const currentWord = getCurrentWord();
  const letterElements = document.querySelectorAll('#wordDisplay span');

  // Correct the logic for applying red and green colors
  for (let i = 0; i < letterElements.length; i++) {
    if (i < typedWord.length) {
      letterElements[i].classList.remove('incorrect-letter', 'correct-letter');
      if (typedWord[i] === currentWord[i]) {
        letterElements[i].classList.add('correct-letter');
      } else {
        letterElements[i].classList.add('incorrect-letter');
      }
    } else {
      // Remove any color class if the letter has not been typed yet
      letterElements[i].classList.remove('incorrect-letter', 'correct-letter');
    }
  }

  // Play the letter sound for the last typed letter if it is correct
  if (typedWord.length > 0 && typedWord[typedWord.length - 1] === currentWord[typedWord.length - 1]) {
    playLetterSound(typedWord[typedWord.length - 1]);
  }

  // Only trigger success when the whole word is correct and complete
  if (typedWord === currentWord) {
    playSuccessSound();
    showMessage('Good job! That\'s correct!');
    setTimeout(() => {
      document.getElementById('wordInput').value = '';
      setNewWord();
    }, 2000);
  }
}

// Function to set a new word
function setNewWord() {
  const randomIndex = Math.floor(Math.random() * wordsToPractice.length);
  const newWord = wordsToPractice[randomIndex];
  updateDisplayedWord(newWord);
  showMessage(''); // Clear any previous messages
}

// Attach event listener to the input field
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('wordInput').addEventListener('input', handleKeyPress);
  setNewWord();
});
