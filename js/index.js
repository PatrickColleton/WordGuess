const form = document.forms[0];
const numTries = document.getElementById('tries');
const resultDiv = document.getElementById('result');
const restartBtn = document.getElementById('restart');
const prevTriesSpan = document.getElementById('prev-tries');
// Game Data
let triesCounter, answer, prevTries, timeoutId;
// Game Logic
function startGame(){
  triesCounter = 0;
  numTries.textContent = triesCounter;
  prevTries = [];
  resultDiv.textContent = '';
  prevTriesSpan.textContent = '';
  answer = Math.floor((Math.random()*100)+1);
}
function clearResultDiv(){
  timeoutId = setTimeout(function(){
    resultDiv.textContent = '';
  }, 3000);
}
function renderPrevTries(){
  prevTriesSpan.textContent = prevTries.sort((a,b)=> a-b).join(', ');
}
function isValidGuess(guess){
  return guess && guess >= 1 && guess <= 100 && !prevTries.includes(guess);
}
// Event Listeners
form.addEventListener('submit', function(event){
  event.preventDefault();

  const guess = parseInt(form.guess.value, 10);
  console.log(guess);

  clearTimeout(timeoutId);

  if(isValidGuess(guess)){
    triesCounter++;
    numTries.textContent = triesCounter;

    prevTries.push(guess);
    renderPrevTries();

     if(guess === answer){
       resultDiv.textContent = 'You win!';
       restartBtn.classList.remove('hidden');
     } else if (guess > answer){
       resultDiv.textContent = 'Guess lower.';
       clearResultDiv();
     } else {
       resultDiv.textContent = 'Guess higher.';
       clearResultDiv();
     }
   } else {
     resultDiv.textContent = 'Input must be an integer between 1 and 100 that you have not guessed.';
   }

  form.guess.value = '';
});
restartBtn.addEventListener('click', startGame);
window.addEventListener('load', function(){
  startGame();
})
// Add Comment Collapse
