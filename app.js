const botNumDisplay = document.querySelector("#bottomNumberDisplay");
const numbersBtns = document.querySelectorAll(".btn-numbers");

// selects the numbers buttons and add a click event listener to them
numbersBtns.forEach((button) => {
    button.addEventListener("click", (e) => {
        // fire a function to display the numbers clicked
        addDisplayNumbers(e.target.id);
    });
});

// Adds the clicked number to the display
function addDisplayNumbers(num) {
    if (num == "0" && botNumDisplay.textContent === "0") {
        return botNumDisplay.textContent = "0";
    } else {
        return botNumDisplay.textContent += num;
    };
};

// Takes a math operator and two numbers 
// and then it does the selected math calculation on those numbers
function calculate(operator, num1, num2) {
    num1 = parseFloat(num1); // To make sure the input is always numbers.
    num2 = parseFloat(num2);
    switch (operator) {
        case "+":
            return addNumbers(num1, num2);
        case "-":
            return subtractNumbers(num1, num2);
        case "*":
            return multiplyNumbers(num1, num2);
        case "÷":
            return divideNumbers(num1, num2);
        case "%":
            return getPorcentage(num1, num2);
    };
};

function addNumbers(num1, num2) {
    return num1 + num2;
};

function subtractNumbers(num1, num2) {
    return num1 - num2;
};

function multiplyNumbers(num1, num2) {
    return num1 * num2;
};

function divideNumbers(num1, num2) {
    return num1 / num2;
};

function getPorcentage(num1, num2) {
    return ((num1 / 100) * num2);
};

// Show time function
const userHourDisplay = document.querySelector(".hourDisplay");

// Gets the user hour and display it on the phone screen
function getUserTime() {
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;
    userHourDisplay.textContent = currentTime;
};
setInterval(getUserTime, 5000); // Checks the user hour every 5 seconds

getUserTime();