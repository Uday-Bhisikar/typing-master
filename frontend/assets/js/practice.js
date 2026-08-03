const paragraph = document.getElementById("paragraph");
const input = document.getElementById("input");

const text =
  "The quick brown fox jumps over the lazy dog. Practice every day to improve your typing speed.";

let currentIndex = 0;

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

input.addEventListener("input", () => {

    const typed = input.value.split("");

    const characters = paragraph.querySelectorAll("span");

    characters.forEach((char) => {

        char.classList.remove("correct");
        char.classList.remove("wrong");
        char.classList.remove("active");

    });

    typed.forEach((letter, index) => {

        if (letter === text[index]) {

            characters[index].classList.add("correct");

        } else {

            characters[index].classList.add("wrong");

        }

    });

    currentIndex = typed.length;

    if (currentIndex < characters.length) {

        characters[currentIndex].classList.add("active");

    }

});