const botNumDisplay = document.querySelector("#bottomNumberDisplay");
const topNumDisplay = document.querySelector("#topNumberDisplay");
const numbersBtns = document.querySelectorAll(".btn-numbers");
const operationBtns = document.querySelectorAll(".btn-symbol");

// adds a event listener to the operation buttons
operationBtns.forEach((button) => {
    button.addEventListener("mousedown", (e) => {
        switch (e.target.id) {
            // Todo make the buttons do the operations
            case "+":
                calculate("+", botNumDisplay.textContent, 10)
                break;
            case "-":
                calculate("-", botNumDisplay.textContent, 10)
                break;
            case "x": 
                calculate("x", botNumDisplay.textContent, 10)
                break;
            case "÷":
                calculate("÷", botNumDisplay.textContent, 10)
                break;
            case "c":
                clearDisplay();
                break;
            case "del":
                deleteLastNumber();
                break;
        };
    });
});

// selects the numbers buttons and add a click event listener to them
numbersBtns.forEach((button) => {
    button.addEventListener("mousedown", (e) => {
        // fire a function to display the numbers clicked
        addDisplayNumbers(e.target.id);
    });
});

// Adds the clicked number to the display
function addDisplayNumbers(num) {
    // can only type one initial zero
    if (num == "0" && botNumDisplay.textContent === "0") {
        return botNumDisplay.textContent = "0";
    } else if (botNumDisplay.textContent.length > 12) {
        return;
    } else if (botNumDisplay.textContent === "0") {
        // it will change the 0 to the clicked number if the display has only a 0 
        botNumDisplay.textContent = num;
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
        case "x":
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


function clearDisplay() {
    botNumDisplay.textContent = "";
    topNumDisplay.textContent = "";
};

function deleteLastNumber() {
    botNumDisplay.textContent = botNumDisplay.textContent.slice(0, -1);
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