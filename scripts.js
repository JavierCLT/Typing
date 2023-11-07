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
  const successSound = new Audio('sounds/success/fanfare.mp3');
  successSound.play();
}

// Function to check the typed word
function checkWord(typedWord, correctWord) {
  if (typedWord.toLowerCase() === correctWord.toLowerCase()) {
    playSuccessSound();
    alert('Good job! That\'s correct!'); // Replace with a more child-friendly success message if needed.
    setNewWord(); // Function to set a new word.
  }
}

// Function to set a new word
function setNewWord() {
  const randomIndex = Math.floor(Math.random() * wordsToPractice.length);
  const newWord = wordsToPractice[randomIndex];
  playWordSound(newWord);
  
  // Update the display with the new word
  // Assuming you have a function to update the displayed word
  updateDisplayedWord(newWord);
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

// Attach event listener to the input field
document.getElementById('wordInput').addEventListener('input', handleKeyPress);

// Start the game by setting the first word
setNewWord();

