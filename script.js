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

// Function to update the displayed word
function updateDisplayedWord(newWord) {
  const wordDisplay = document.getElementById('wordDisplay');
  wordDisplay.innerHTML = newWord.split('').map(letter => `<span class="letter">${letter}</span>`).join('');
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
  const currentWord = getCurrentWord().toLowerCase();
  const letterElements = document.getElementsByClassName('letter');

  // Check each letter and color it accordingly
  for (let i = 0; i < letterElements.length; i++) {
    if (i < typedWord.length) {
      letterElements[i].className = typedWord[i] === currentWord[i] ? 'correct-letter' : 'incorrect-letter';
    } else {
      letterElements[i].className = 'letter'; // No additional class
    }
  }

  // Play the letter sound for the last typed letter, excluding backspaces and other non-letter keys
  if (typedWord && !event.inputType.includes("delete")) {
    const lastLetter = typedWord[typedWord.length - 1];
    playLetterSound(lastLetter);
  }

  // Check if the word is correct
  if (typedWord === currentWord) {
    playSuccessSound();
    showMessage('Good job! That\'s correct!');
    setTimeout(setNewWord, 2000); // Wait for 2 seconds before setting a new word
  }
}

// Function to set a new word
function setNewWord() {
  const randomIndex = Math.floor(Math.random() * wordsToPractice.length);
  const newWord = wordsToPractice[randomIndex];
  playWordSound(newWord);
  updateDisplayedWord(newWord);
  
  // Clear the input field and message display
  document.getElementById('wordInput').value = '';
  showMessage('');
}

// Attach event listener to the input field
document.getElementById('wordInput').addEventListener('input', handleKeyPress);

// Initialize the game
setNewWord();
