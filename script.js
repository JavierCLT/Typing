// The list of words for the child to practice
const originalWordsToPractice = ["apple", "banana", "bathroom", "car", "carrot", "cat", "chair", "computer", "dad", "day", "dog", "ear", "fall", "feet", "guitar", "foot", "harmonica", "football", "fridge", "garlic", "hand", "happiness", "head", "heart", "house", "ice", "knees", "lemon", "milk", "mom", "motorcycle", "night", "onion", "orange", "pepper", "potato", "room", "salt", "school", "spring", "summer", "table", "tomato", "wall", "water", "winter"];

// Clone the original array to manipulate
let wordsToPractice = [...originalWordsToPractice];

// Initialize the counter
let wordsTypedCount = 0;

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
  const successSound = new Audio('sounds/success/fanfare.mp3');
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

// Function to update counter
function updateWordsTypedCountDisplay() {
  const countDisplay = document.getElementById('counter');
  countDisplay.textContent = `${wordsTypedCount}`;
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
    letterElement.className = typedWord[index] === currentWord[index] ? 'correct-letter' : 'incorrect-letter';
  } else {
    letterElement.className = ''; // Remove classes if the letter has not been typed yet
  }
});

  // Play the sound of the last letter typed
  if (typedWord) {
    playLetterSound(typedWord[typedWord.length - 1]);
  }

// If the word is fully and correctly typed
if (typedWord === currentWord) {
  // Delay after the last letter sound before playing the word sound again
  setTimeout(() => {
    playWordSound(currentWord, () => {
      // Determine the delay for the success sound based on the word's length
      let successSoundDelay;
      if (currentWord.length <= 4) {
        successSoundDelay = 400;
      } else if (currentWord.length >= 5 && currentWord.length <= 9) {
        successSoundDelay = 480;
      } else { // for 10 letters or more
        successSoundDelay = 600;
      }

      // Delay the success sound based on the length of the word
      setTimeout(() => {
        playSuccessSound();
      }, successSoundDelay);

      // Show the success message shortly after the success sound starts
      setTimeout(() => {
        showMessage('Good job! That\'s correct!');
        confetti(); // Play the success animation here
        wordsTypedCount++; // Increment the words typed count
        updateWordsTypedCountDisplay(); // Update the display
      }, successSoundDelay - 300); // Adjust as needed

      // Clear the input and set a new word a bit after the message is displayed
      setTimeout(() => {
        wordInput.value = ''; // Clear the input field
        setNewWord(); // Set a new word
      }, successSoundDelay + 2000); // This waits a bit after the message to reset
    });
  }, 500); // Delay before replaying the word sound after the last letter sound
}}

function setNewWord() {
  // Check if there are no more words to practice
  if (wordsToPractice.length === 0) {
    // Reset the wordsToPractice array to start over
    wordsToPractice = [...originalWordsToPractice];
    // Optionally, you can display a message indicating that all words have been practiced
    // showMessage('All words completed! Starting again...');
  }

  const randomIndex = Math.floor(Math.random() * wordsToPractice.length);
  const newWord = wordsToPractice[randomIndex];
  updateDisplayedWord(newWord);

  // Set the image source based on the new word
  const wordImage = document.getElementById('wordImage');
  wordImage.src = `images/${newWord}.png`; // Assuming the images are named exactly like the words
  wordImage.style.display = 'block'; // Show the image

  // Remove the used word from the array
  wordsToPractice.splice(randomIndex, 1);

  const wordInput = document.getElementById('wordInput');
  wordInput.dataset.currentWord = newWord; // Store the current word in the dataset
  showMessage(''); // Clear any previous messages
  playWordSound(newWord); // Play the word sound
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  container.classList.add('fade-in');

  const wordInput = document.getElementById('wordInput');
  wordInput.addEventListener('input', handleKeyPress);
  setNewWord(); // Set the initial word
  wordInput.focus(); // Automatically focus the input field

  // Attempt to play the word sound immediately
  playWordSound(wordInput.dataset.currentWord);
});
