const word = document.getElementById('word');
const text = document.getElementById('text');
const score = document.getElementById('score');
const time = document.getElementById('time');
const endGameContainer = document.getElementById('end-game-container');
const settingsButton = document.getElementById('settings-button');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficulty = document.getElementById('difficulty');
const words = ['sigh','tense','airplane','ball','pies','juice','warlike','bad','north','dependent','steer','silver','highfalutin','superficial','quince','eight','feeble','admit','drag','loving'];
let scoreLevel = 0;
let timeLevel = 20;
let randomWord;
let difficultyLevel = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
difficulty.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
text.focus();
const timeInterval = setInterval(updateTime,1000);
function getRandomWord(){
     return words[Math.floor(Math.random() * words.length)];
}
function addWordToDOM(){
     randomWord = getRandomWord();
     word.innerHTML = randomWord;
}
addWordToDOM();
function updateScore(){
     scoreLevel++;
     score.innerHTML = scoreLevel;
}
function gameOver(){
     endGameContainer.innerHTML = `
          <h1>time ran out</h1>
          <p>your final score is ${scoreLevel}</p>
          <button onclick="location.reload()">reload</button>
     `;
     endGameContainer.style.display = 'flex';
}
function updateTime(){
     timeLevel--;
     time.innerHTML = timeLevel + 's';
     if(timeLevel === 0){
          clearInterval(timeInterval);
          gameOver();
     }
}
text.addEventListener('input',event => {
     const insertedText = event.target.value;
     if(insertedText === randomWord){
          addWordToDOM();
          updateScore();
          event.target.value = "";
          if(difficultyLevel === 'hard'){
               time += 2;
          }else if(difficultyLevel === 'medium'){
               time += 3;
          }else{
               time += 5;
          }
          updateTime();
     }
});
settingsButton.addEventListener('click',() => {
     settings.classList.toggle('hide');
});
settingsForm.addEventListener('change',event => {
     difficultyLevel = event.target.value;
     localStorage.setItem('difficulty',difficultyLevel);
});