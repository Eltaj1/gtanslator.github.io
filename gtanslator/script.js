// Modify the initializeSpeechRecognition function in your script.js file

function initializeSpeechRecognition(language) {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = language || 'ru-RU'; // Set the initial language to Russian if not specified

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            document.getElementById('inputText').value = transcript;
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };

        return recognition; // Return the recognition object
    } else {
        console.error('Speech recognition not supported in this browser.');
        return null;
    }
}

// Function to switch the language dynamically
function switchLanguage() {
    const selectedLanguage = document.getElementById('sourceLanguage').value;

    // Reinitialize speech recognition with the new language
    speechRecognition.stop();
    speechRecognition.abort();
    speechRecognition.removeEventListener('end', speechRecognition.start);
    speechRecognition = initializeSpeechRecognition(selectedLanguage);
    speechRecognition.start();
}

// Initialize speech recognition with the default language
let speechRecognition = initializeSpeechRecognition('ru-RU');

// ... (rest of the code)



function translateText() {
    const inputText = document.getElementById('inputText').value;
    const sourceLanguage = document.getElementById('sourceLanguage').value;
    const targetLanguage = document.getElementById('targetLanguage').value;

    // Validate that source and target languages are distinct
    if (sourceLanguage === targetLanguage) {
        document.getElementById('output').innerText = 'Please select two distinct languages.';
        return;
    }

    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLanguage}|${targetLanguage}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const translatedText = data.responseData.translatedText;
            document.getElementById('output').innerText = `Translated: ${translatedText}`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('output').innerText = 'Translation failed';
        });
}

// Modify the speakText function in your script.js file

function speakText() {
    const translatedText = document.getElementById('output').innerText;

    // Specify the language for text-to-speech
    const language = document.getElementById('targetLanguage').value;

    // Create a SpeechSynthesisUtterance object
    const utterance = new SpeechSynthesisUtterance(translatedText);

    // Set the language for the utterance
    utterance.lang = language;

    // Use Text-to-Speech API or library of your choice to speak the translated text
    // For simplicity, you can use the browser's built-in speech synthesis
    speechSynthesis.speak(utterance);
}


// Add this function to trigger speech recognition for adding words
function startSpeechRecognition() {
    if (speechRecognition) {
        speechRecognition.start();
    }
}
// Your existing functions

function autoTranslate() {
    // Call the translation function when text is input
    translateText();
}

// Rest of your existing code

// Add your existing event listener for the textarea
document.getElementById('inputText').addEventListener('input', autoTranslate);

