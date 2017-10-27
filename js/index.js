const form = document.forms[0];
const numTries = document.getElementById('tries');
const resultDiv = document.getElementById('result');
const partialDiv = document.getElementById('partial');
const restartBtn = document.getElementById('restart');
const submitBtn = document.getElementById('submit');
const prevTriesSpan = document.getElementById('prev-tries');
var answerWord = '';
var partialAnswer = '';
var api = 'http://api.wordnik.com:80/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';

partialDiv.textContent = partialAnswer;

// Game Data
let triesCounter, prevTries, timeoutId;
// Game Logic
function startGame() {
  triesCounter = 0;
  numTries.textContent = triesCounter;
  prevTries = [];
  resultDiv.textContent = '';
  prevTriesSpan.textContent = '';

  fetch(api).then(resp => resp.json()).then(function(data) {
    answerWord = data.word;
    console.log(answerWord);
    for (let i = 0; i < answerWord.length; i++) {
      partialAnswer += '_';
    }
    console.log(partialAnswer);
  });
}

function clearResultDiv() {
  timeoutId = setTimeout(function() {
    resultDiv.textContent = '';
  }, 3000);
}

function renderPrevTries() {
  prevTriesSpan.textContent = prevTries.sort((a, b) => a - b).join(', ');
}


form.addEventListener('submit', function(event) {
  event.preventDefault();

  const rawGuess = form.guess.value;
  let guess = rawGuess.toLowerCase();

  if (! prevTries.includes(guess) && guess != '') {
    prevTries.push(guess);
    clearTimeout(timeoutId);
    triesCounter++;
    numTries.textContent = triesCounter;
  }
  renderPrevTries();

  if (answerWord.includes(guess) && guess !== '') {
    resultDiv.textContent = 'Right Letter!';

    let partialArray = partialAnswer.split('');

    for (let i = 0; i < answerWord.length; i++) {
      if (guess === answerWord.charAt(i)) {
        partialArray[i] = guess;
      }
    }
    partialAnswer = partialArray.join('');

    partialDiv.textContent = partialAnswer;

    if (partialAnswer == answerWord) {
      resultDiv.textContent = 'You win!';
      restartBtn.classList.remove('hidden');
      partialDiv.textContent = '';
      partialAnswer = '';
      clearResultDiv();
    }
  } else {
    if (guess !== '') {
      resultDiv.textContent = 'Wrong Letter!';
    }
    clearResultDiv();
  }

  form.guess.value = '';
});

restartBtn.addEventListener('click', function() {
  startGame();
  restartBtn.classList.add("hidden");
})
window.addEventListener('load', function() {
  startGame();
})
// Add Comment Collapse
