const characterCount = document.getElementById("characterCount");
const totalCharacters = document.getElementById("totalCharacters");



const mistakesText = document.getElementById("mistakes");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const difficulty = document.getElementById("difficulty");

const paragraph = document.getElementById("paragraph");
const input = document.getElementById("input");

const wpmText = document.getElementById("wpm");
const accuracyText = document.getElementById("accuracy");
const timerText = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");

const easyParagraphs = [
    "The sun rises in the east.",
    "I love learning every day.",
    "Coding is fun and creative."
];

const mediumParagraphs = [
    "Typing practice improves your speed and accuracy over time.",
    "JavaScript makes websites interactive and user friendly.",
    "Docker helps developers package applications efficiently."
];

const hardParagraphs = [
    "Cloud computing enables businesses to deploy scalable applications across multiple regions with high availability and fault tolerance.",
    "Consistent typing practice combined with accuracy and proper finger placement significantly improves overall productivity and reduces mistakes."
];



let text = "";

let timer = Number(localStorage.getItem("testTime")) || 60;
let timerStarted = false;
let interval;

function loadParagraph() {

    let list = [];

    if (difficulty.value === "easy") {

        list = easyParagraphs;

    } else if (difficulty.value === "medium") {

        list = mediumParagraphs;

    } else {

        list = hardParagraphs;

    }

    text = list[Math.floor(Math.random() * list.length)];

    paragraph.innerHTML = "";

    text.split("").forEach((char) => {

        const span = document.createElement("span");

        span.innerText = char;

        paragraph.appendChild(span);

    });

    paragraph.children[0].classList.add("active");
    totalCharacters.innerText = text.length;
    characterCount.innerText = 0; 

}

loadParagraph();
input.focus();

function startTimer(){

    interval = setInterval(()=>{

        timer--;

        timerText.innerText = timer;

        if(timer<=0){

clearInterval(interval);

input.disabled=true;

localStorage.setItem("wpm",wpmText.innerText);

localStorage.setItem("accuracy",accuracyText.innerText);

localStorage.setItem("mistakes",mistakesText.innerText);

window.location.href="./result.html";

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
    let mistakes = 0;

    characters.forEach((char)=>{

        char.classList.remove("correct","wrong","active");

    });

    typed.forEach((letter,index)=>{

        if (letter === text[index]) {

    characters[index].classList.add("correct");
    correct++;

} else {

    characters[index].classList.add("wrong");
    mistakes++;

}

    });

    if(typed.length < characters.length){

        characters[typed.length].classList.add("active");

    }

    let accuracy = Math.round((correct / typed.length) * 100);

    if(isNaN(accuracy)) accuracy = 100;

    accuracyText.innerText = accuracy + "%";

    mistakesText.innerText = mistakes;

    let words = typed.length / 5;

    let minutes = (60 - timer) / 60;

    let wpm = Math.round(words / minutes);

    if(!isFinite(wpm)) wpm = 0;

    wpmText.innerText = wpm;

    let progress = Math.round((typed.length / text.length) * 100);

if(progress > 100){

    progress = 100;

}

progressBar.style.width = progress + "%";

progressText.innerText = progress + "%";

characterCount.innerText = typed.length;
});

restartBtn.addEventListener("click",()=>{

    clearInterval(interval);

    timer = Number(localStorage.getItem("testTime")) || 60;

    timerText.innerText = timer;

    timerStarted = false;

    timerText.innerText = 60;

    input.disabled = false;

    input.value = "";

    characterCount.innerText = 0;

    wpmText.innerText = 0;

    accuracyText.innerText = "100%";

    mistakesText.innerText = 0;

    loadParagraph();

    input.focus();

    progressBar.style.width = "0%";

progressText.innerText = "0%";

});

difficulty.addEventListener("change", () => {

    input.value = "";

    loadParagraph();

    input.focus();

});