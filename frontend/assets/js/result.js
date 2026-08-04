document.getElementById("resultWpm").innerText =
localStorage.getItem("wpm");

document.getElementById("resultAccuracy").innerText =
localStorage.getItem("accuracy");

document.getElementById("resultMistakes").innerText =
localStorage.getItem("mistakes");

document.getElementById("resultTime").innerText =
localStorage.getItem("testTime") + " sec";

const wpm = Number(localStorage.getItem("wpm"));

let grade = "D";

if(wpm >= 70){

grade = "A";

}
else if(wpm >= 50){

grade = "B";

}
else if(wpm >= 30){

grade = "C";

}

document.getElementById("resultGrade").innerText = grade;