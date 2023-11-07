// Array of words for practice
const wordsToPractice = [
    "apple", "banana", "bathroom", "brother", "car", "carrot", "cat", "chair",
    "computer", "dad", "day", "dog", "ear", "fall", "feet", "fingers", "foot",
    "football", "fridge", "garlic", "hand", "happiness", "happy", "head", "heart",
    "house", "ice", "knees", "lemon", "milk", "mom", "motorcycle", "night", "onion",
    "orange", "pepper", "potato", "room", "salt", "school", "sister", "spring",
    "summer", "table", "tomato", "wall", "water", "winter"
];
let correctWordCount = 0;
let currentWord = "";

// Function to play a sound
function playSound(soundUrl) {
    var audio = new Audio(soundUrl);
    audio.play();
}

// Function to set a new random word
function setNewWord() {
    currentWord = wordsToPractice[Math.floor(Math.random() * wordsToPractice.length)];
    const wordDisplay = document.getElementById('word-display');
    wordDisplay.textContent = currentWord; // Display the word
    document.getElementById('word-input').value = ''; // Clear the input field
}

// Function to check the word typed by the user
function checkWord() {
    const typedWord = document.getElementById('word-input').value.toLowerCase();
    if (typedWord === currentWord.toLowerCase()) {
        correctWordCount++;
        updateCounterDisplay();
        playSound('C:\Users\javit\Documents\Typing\Fanfare.mp3'); // Play success sound
        showSuccessMessage();
        setNewWord();
    }
}

// Function to update the counter display
function updateCounterDisplay() {
    const counterElement = document.getElementById('correct-count');
    counterElement.textContent = correctWordCount;
}

// Function to show a success message
function showSuccessMessage() {
    const successMessageElement = document.getElementById('success-message');
    successMessageElement.textContent = 'Good job! That\'s correct!';
    // Hide the message after a short delay
    setTimeout(() => {
        successMessageElement.textContent = '';
    }, 2000);
}

// Event listener for input
document.getElementById('word-input').addEventListener('input', checkWord);

// Initialize the game with a new word
setNewWord();
