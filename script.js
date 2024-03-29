const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highScoreDisplay = document.querySelector('#high-score');
const words = ['hat','river','lucky','statue','generate','stubborn','cocktail','runaway','joke','developer','establishment','hero','javascript','nutrition','revolver','echo','siblings','investigate','horrendous','symptom','laughter','magic','master','space','definition'];
const levels = {ease: 7,medium: 5,hard: 3};
const currentLevel = levels.medium;
let time = currentLevel;
let score = 0;
let isPlaying;
function showWord(words){
     const randomIndex = Math.floor(Math.random() * words.length);
     currentWord.innerHTML = words[randomIndex];
}
function matchWords(){
     if(wordInput.value === currentWord.innerHTML){
          message.innerHTML = 'Correct!!!!!';
          return true;
     }else{
          message.innerHTML = '';
          return false;
     }
}
function countdown(){
     if(time>0){
          time--;
     }else if(time === 0){
          isPlaying = false;
     }
     timeDisplay.innerHTML = time;
}
function checkStatus(){
     if(!isPlaying && time === 0){
          message.innerHTML = 'Game Over!!!!!';
          score = -1;
     }
}
function startMatch(){
     if(matchWords()){
          isPlaying = true;
          time = currentLevel + 1;
          showWord(words);
          wordInput.value = '';
          score++;
     }
     if(typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']){
          sessionStorage['highscore'] = score;
     }else{
          sessionStorage['highscore'] = sessionStorage['highscore'];
     }
     if(sessionStorage['highscore'] >= 0){
          highScoreDisplay.innerHTML = sessionStorage['highscore'];
     }
     if(score === -1){
          scoreDisplay.innerHTML = 0;
     }else{
          scoreDisplay.innerHTML = score;
     }
}
function init(){
     seconds.innerHTML = currentLevel;
     showWord(words);
     wordInput.addEventListener('input',startMatch);
     setInterval(countdown,1000);
     setInterval(checkStatus,50);
}
window.addEventListener('load',init);