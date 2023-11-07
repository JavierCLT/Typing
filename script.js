// The list of words for the child to practice
const wordsToPractice = ["apple", "banana", "bathroom", "brother", "car", "carrot", "cat", "chair", "computer", "dad", "day", "dog", "ear", "fall", "feet", "fingers", "foot", "football", "fridge", "garlic", "hand", "happiness", "happy", "head", "heart", "house", "ice", "knees", "lemon", "milk", "mom", "motorcycle", "night", "onion", "orange", "pepper", "potato", "room", "salt", "school", "sister", "spring", "summer", "table", "tomato", "wall", "water", "winter"];

// Function to play the word sound
function playWordSound(word, callback) {
  const wordSound = new Audio(`sounds/word_sounds/english/${word}.mp3`);
  wordSound.play();

  // When the sound has finished playing, call the callback if provided
  wordSound.onended = () => {
    if (callback) {
      callback();
    }
  };
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

function updateDisplayedWord(word) {
  const wordDisplay = document.getElementById('wordDisplay');
  // Clear the previous word display
  wordDisplay.innerHTML = '';

  // Create a span for each letter in the word
  word.split('').forEach((letter, index) => {
    const letterSpan = document.createElement('span');
    letterSpan.textContent = letter;
    letterSpan.id = `letter${index}`;
    wordDisplay.appendChild(letterSpan);
  });
}

// Function to show a message below the word input
function showMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
}

// Function to handle keypresses and color changes
function handleKeyPress(event) {
  const wordInput = document.getElementById('wordInput');
  const typedWord = wordInput.value.toLowerCase();
  const currentWord = wordInput.dataset.currentWord.toLowerCase();

  // Update the colors of the displayed letters
  currentWord.split('').forEach((letter, index) => {
    const letterElement = document.getElementById(`letter${index}`);
    if (index < typedWord.length) {
      letterElement.classList.add(
        typedWord[index] === currentWord[index] ? 'correct-letter' : 'incorrect-letter'
      );
    } else {
      letterElement.classList.remove('correct-letter', 'incorrect-letter');
    }
  });

  // Play the sound of the last letter typed
  if (typedWord) {
    playLetterSound(typedWord[typedWord.length - 1]);
  }

  // If the word is fully and correctly typed
  if (typedWord === currentWord) {
    // Play the word sound again
    playWordSound(currentWord, () => {
      // After the word is played, play the success sound
      setTimeout(() => {
        playSuccessSound();
      }, 2000);

      // Show the success message with a delay to allow the success sound to play
      setTimeout(() => {
        showMessage('Good job! That\'s correct!');
      }, 100); // Adjust this delay as needed

      // Clear the input and set a new word after the message is displayed
      setTimeout(() => {
        wordInput.value = ''; // Clear the input field
        setNewWord(); // Set a new word
      }, 3500); // This waits an additional 2 seconds after the message to reset
    });
  }
}

// Function to set a new word
function setNewWord() {
  const randomIndex = Math.floor(Math.random() * wordsToPractice.length);
  const newWord = wordsToPractice[randomIndex];
  updateDisplayedWord(newWord);

  const wordInput = document.getElementById('wordInput');
  wordInput.dataset.currentWord = newWord; // Store the current word in the dataset
  showMessage(''); // Clear any previous messages
  playWordSoundTwice(newWord); // Play the word sound twice when the level starts
}

// Attach event listener to the input field
document.addEventListener('DOMContentLoaded', () => {
  const wordInput = document.getElementById('wordInput');
  wordInput.addEventListener('input', handleKeyPress);
  setNewWord(); // Set the initial word
});
