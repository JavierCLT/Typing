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

// Function to check the typed word
function checkWord(typedWord, correctWord) {
  if (typedWord.toLowerCase() === correctWord.toLowerCase()) {
    playSuccessSound();
    showMessage('Good job! That\'s correct!'); // This replaces the alert with a more integrated message.
    setNewWord(); // Function to set a new word.
  }
}

// Function to update the displayed word
function updateDisplayedWord(newWord) {
  const wordDisplay = document.getElementById('wordDisplay');
  wordDisplay.textContent = newWord.toUpperCase().split('').join(' '); // Separate letters for readability
}

// Function to get the current word from the display
function getCurrentWord() {
  const wordDisplay = document.getElementById('wordDisplay');
  return wordDisplay.textContent.replace(/\s+/g, ''); // Remove spaces
}

// Function to show a message (for success, etc.)
function showMessage(text) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = text;
}

// Function to handle keypresses
function handleKeyPress(event) {
  const typedWord = event.target.value;
  const currentWord = getCurrentWord(); // Function to get the current word.

  // Play letter sound for the last typed letter, excluding backspaces and other non-letter keys
  if (typedWord && !event.inputType.includes("delete")) {
    const lastLetter = typedWord.charAt(typedWord.length - 1);
    playLetterSound(lastLetter);
  }

  // Check if the word is correct
  checkWord(typedWord, currentWord);
}

// Function to set a new word
function setNewWord() {
  const randomIndex = Math.floor(Math.random() * wordsToPractice.length);
  const newWord = wordsToPractice[randomIndex];
  playWordSound(newWord);
  
  // Update the display with the new word
  updateDisplayedWord(newWord);
  
  // Clear the input field and message display
  document.getElementById('wordInput').value = '';
  showMessage('');
}

// Attach event listener to the input field
document.getElementById('wordInput').addEventListener('input', handleKeyPress);

// Call setNewWord() when the script loads to start the game
setNewWord();


// Start the game by setting the first word
setNewWord();

