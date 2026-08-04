const buttons = document.querySelectorAll(".time-btn");

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        buttons.forEach((btn) => {
            btn.classList.remove("active-time");
        });

        button.classList.add("active-time");

        const selectedTime = button.dataset.time;

        localStorage.setItem("testTime", selectedTime);

    });

});