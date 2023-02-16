const textarea = document.querySelector('#textarea');
const button = document.querySelector('#button');
const score = document.querySelector('#score');
const showSentence = document.querySelector('#showSentence');
let startTime;
let endTime;
let totalTimeTaken;
const sentence = ['the quick brown fox jumps over the lazy dog 1','the quick brown fox jumps over the lazy dog 2','the quick brown fox jumps over the lazy dog 3'];
const startTyping = () => {
     let randomNumber = Math.floor(Math.random() * sentence.length);
     showSentence.innerHTML = sentence[randomNumber];
     const date = new Date();
     startTime = date.getTime();
     button.innerText = 'Done';
};
const calculateTypingSpeed = (timeTaken) => {
     const totalWords = textarea.value.trim();
     const actualWords = totalWords === "" ? 0 : totalWords.split(" ").length;
     if(actualWords !== 0){
          let typingSpeed = (actualWords / timeTaken) * 60;
          typingSpeed = Math.round(typingSpeed);
          score.innerHTML = `Your Typing Speed is ${typingSpeed} Words Per Minutes & You Wrote ${actualWords} Words & Time Taken ${timeTaken} Seconds`;
     }else{
          score.innerHTML = `Your Typing Speed is 0 Words Per Minutes & Time Taken ${timeTaken} Seconds`;
     }
};
const endTypingTest = () => {
     button.innerText = 'Start';
     const date = new Date();
     endTime = date.getTime();
     totalTimeTaken = (endTime -startTime) / 1000;
     calculateTypingSpeed(totalTimeTaken);
     showSentence.innerHTML = "";
     textarea.value = "";
};
button.addEventListener('click',() => {
     switch(button.innerText.toLowerCase()){
          case 'start':
               textarea.removeAttribute('disabled');
               startTyping();
               break;
          case 'done':
               textarea.setAttribute('disabled','true');
               endTypingTest();
               break;
     }
});