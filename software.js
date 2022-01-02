const paragraph = document.querySelector(".typing-text p");
const inputField = document.querySelector(".wrapper .input-field");
const button = document.querySelector(".content button");
const bold = document.querySelector(".time span b");
const mistakeSpan = document.querySelector(".mistake span");
const wpmSpan = document.querySelector(".wpm span");
const cpmSpan = document.querySelector(".cpm span");
let timer;
let maximumTime = 60;
let timeLeft = maximumTime;
let characterIndex = mistakes = isTyping = 0;
function loadParagraph(){
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    paragraph.innerHTML = "";
    paragraphs[randomIndex].split("").forEach(character => {
        let span = `<span>${character}</span>`
        paragraph.innerHTML += span;
    });
    paragraph.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown",() => inputField.focus());
    paragraph.addEventListener("click",() => inputField.focus());
}
loadParagraph();
function initTyping(){
    let characters = paragraph.querySelectorAll("span");
    let typedCharacter = inputField.value.split("")[characterIndex];
    if(characterIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping){
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedCharacter == null){
            if(characterIndex > 0){
                characterIndex--;
                if(characters[characterIndex].classList.contains("incorrect")){
                    mistakes--;
                }
                characters[characterIndex].classList.remove("correct","incorrect");
            }
        } else {
            if(characters[characterIndex].innerText == typedCharacter){
                characters[characterIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[characterIndex].classList.add("incorrect");
            }
            characterIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[characterIndex].classList.add("active");

        let wpm = Math.round(((characterIndex - mistakes)  / 5) / (maximumTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmSpan.innerText = wpm;
        mistakeSpan.innerText = mistakes;
        cpmSpan.innerText = characterIndex - mistakes;
    }else{
        clearInterval(timer);
        inputField.value = "";
    }   
}
function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        bold.innerText = timeLeft;
        let wpm = Math.round(((characterIndex - mistakes)  / 5) / (maximumTime - timeLeft) * 60);
        wpmSpan.innerText = wpm;
    }else{
        clearInterval(timer);
    }
}
function resetGame(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maximumTime;
    characterIndex = mistakes = isTyping = 0;
    inputField.value = "";
    bold.innerText = timeLeft;
    wpmSpan.innerText = 0;
    mistakeSpan.innerText = 0;
    cpmSpan.innerText = 0;
}
inputField.addEventListener("input",initTyping);
button.addEventListener("click",resetGame);