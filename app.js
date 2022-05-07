
// Takes a math operator and two numbers 
// and then it does the math calculation on those numbers
function calculate(operator, num1, num2) {
    num1 = parseFloat(num1); // To make sure the input is always numbers.
    num2 = parseFloat(num2);
    switch (operator) {
        case "+":
            return addNumber(num1, num2);
        case "-":
            return subtractNumber(num1, num2);
        case "*":
            return multiplyNumber(num1, num2);
        case "÷":
            return divideNumber(num1, num2);
        case "%":
            return getPorcentage(num1, num2);
    };
};

function addNumber(num1, num2) {
    return num1 + num2;
};

function subtractNumber(num1, num2) {
    return num1 - num2;
};

function multiplyNumber(num1, num2) {
    return num1 * num2;
};

function divideNumber(num1, num2) {
    return num1 / num2;
};

function getPorcentage(num1, num2) {
    return ((num1 / 100) * num2);
};

// Show app function
const userHourDisplay = document.querySelector(".hourDisplay");

// Gets the user hour and display it on the phone screen
function getUserTime() {
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes()}`;
    userHourDisplay.textContent = currentTime;
};
setInterval(getUserTime, 5000); // Checks the user hour every 5 seconds

getUserTime();