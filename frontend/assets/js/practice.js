const paragraph = document.getElementById("paragraph");
const input = document.getElementById("input");

const wpmText = document.getElementById("wpm");
const accuracyText = document.getElementById("accuracy");
const timerText = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");

const text =
"The quick brown fox jumps over the lazy dog. Practice every day to improve your typing speed.";

let timer = 60;
let timerStarted = false;
let interval;

function loadParagraph() {

    paragraph.innerHTML = "";

    text.split("").forEach((char) => {

        const span = document.createElement("span");

        span.innerText = char;

        paragraph.appendChild(span);

    });

    paragraph.children[0].classList.add("active");

}

loadParagraph();

function startTimer(){

    interval = setInterval(()=>{

        timer--;

        timerText.innerText = timer;

        if(timer <= 0){

            clearInterval(interval);

            input.disabled = true;

        }

    },1000);

}

input.addEventListener("input",()=>{

    if(!timerStarted){

        startTimer();

        timerStarted = true;

    }

    const typed = input.value.split("");

    const characters = paragraph.querySelectorAll("span");

    let correct = 0;

    characters.forEach((char)=>{

        char.classList.remove("correct","wrong","active");

    });

    typed.forEach((letter,index)=>{

        if(letter===text[index]){

            characters[index].classList.add("correct");

            correct++;

        }

        else{

            characters[index].classList.add("wrong");

        }

    });

    if(typed.length < characters.length){

        characters[typed.length].classList.add("active");

    }

    let accuracy = Math.round((correct / typed.length) * 100);

    if(isNaN(accuracy)) accuracy = 100;

    accuracyText.innerText = accuracy + "%";

    let words = typed.length / 5;

    let minutes = (60 - timer) / 60;

    let wpm = Math.round(words / minutes);

    if(!isFinite(wpm)) wpm = 0;

    wpmText.innerText = wpm;

});

restartBtn.addEventListener("click",()=>{

    clearInterval(interval);

    timer = 60;

    timerStarted = false;

    timerText.innerText = 60;

    input.disabled = false;

    input.value = "";

    wpmText.innerText = 0;

    accuracyText.innerText = "100%";

    loadParagraph();

    input.focus();

});