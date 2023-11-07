// The list of words for the child to practice
const wordsToPractice = ["apple", "banana", "bathroom", "brother", "car", "carrot", "cat", "chair", "computer", "dad", "day", "dog", "ear", "fall", "feet", "fingers", "foot", "football", "fridge", "garlic", "hand", "happiness", "happy", "head", "heart", "house", "ice", "knees", "lemon", "milk", "mom", "motorcycle", "night", "onion", "orange", "pepper", "potato", "room", "salt", "school", "sister", "spring", "summer", "table", "tomato", "wall", "water", "winter"];

// Function to update the displayed word
function updateDisplayedWord(newWord) {
  const wordDisplay = document.getElementById('wordDisplay');
  // Clear the previous content
  wordDisplay.innerHTML = '';
  // Create a span for each letter in the new word
  newWord.toLowerCase().split('').forEach(letter => {
    const letterSpan = document.createElement('span');
    letterSpan.textContent = letter;
    wordDisplay.appendChild(letterSpan);
  });
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

  // Check each letter and color it accordingly
  for (let i = 0; i < letterElements.length; i++) {
    if (i < typedWord.length) {
      letterElements[i].className = typedWord[i] === currentWord[i] ? 'correct-letter' : 'incorrect-letter';
    } else {
      letterElements[i].className = ''; // Reset class for letters not yet typed
    }
  }

  // Play the letter sound for the last typed letter, excluding backspaces and other non-letter keys
  if (typedWord && typedWord.length > 0 && !event.inputType.includes("deleteContentBackward")) {
    const lastLetter = typedWord[typedWord.length - 1];
    playLetterSound(lastLetter);
  }

  // Check if the word is correct and the user has not cleared the input
  if (typedWord === currentWord && typedWord.length === currentWord.length) {
    playSuccessSound();
    showMessage('Good job! That\'s correct!');
    // Clear the input after a short delay
    setTimeout(() => {
      document.getElementById('wordInput').value = '';
      setNewWord();
    }, 2000); // Wait for 2 seconds before setting a new word
  }
}

// Function to set a new word
function setNewWord() {
  const randomIndex = Math.floor(Math.random() * wordsToPractice.length);
  const newWord = wordsToPractice[randomIndex];
  updateDisplayedWord(newWord);
  showMessage(''); // Clear any previous messages
}

// Function to play the word sound
function playWordSound(word) {
  // Placeholder for the word sound function
  console.log(`Play word sound for ${word}`);
}

// Function to play the letter sound
function playLetterSound(letter) {
  // Placeholder for the letter sound function
  console.log(`Play letter sound for ${letter}`);
}

// Function to play the success sound
function playSuccessSound() {
  // Placeholder for the success sound function
  console.log('Play success sound');
}

// Attach event listener to the input field
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('wordInput').addEventListener('input', handleKeyPress);
  setNewWord();
});

