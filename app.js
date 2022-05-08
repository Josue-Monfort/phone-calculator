const botNumDisplay = document.querySelector("#bottomNumberDisplay");
const topNumDisplay = document.querySelector("#topNumberDisplay");
const numbersBtns = document.querySelectorAll(".btn-numbers");
const operationBtns = document.querySelectorAll(".btn-symbol");
const clearButton = document.querySelector(".btn-clear");

let currentOperation = "";
let operationList = ["+", "-", "*", "÷", "%"];
let equalList = ["="];

// adds a event listener to the operation buttons
operationBtns.forEach((button) => {
    button.addEventListener("mousedown", (e) => {
        switch (e.target.id) {
            case "+":
                calculateOperations("+");
                break;
            case "-":
                calculateOperations("-");
                break;
            case "*": 
                calculateOperations("*");
                break;
            case "÷":
                calculateDivideOperation();
                break;
            case "%":
                calculateOperations("%")
                break;
            case "del":
                deleteLastNumber();
                break;
            case "=":
                getsumResult();
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

clearButton.addEventListener("mousedown", () => clearDisplay());

// Adds the clicked number to the display
function addDisplayNumbers(num) {
    let equalSignCheck = equalList.some(el => topNumberDisplay.innerHTML.includes(el))
    // can only type one initial zero
    if (num == "0" && botNumDisplay.textContent === "0") {
        return botNumDisplay.textContent = "0";
    } 
    if (num === ".") {
        return checkDot()
    } else if (botNumDisplay.textContent.length > 12) {
        return;
    } else if (botNumDisplay.textContent === "0") {
        // it will change the 0 to the clicked number if the display has only a 0 
        botNumDisplay.textContent = num;
    } else if (equalSignCheck === true) {
        topNumDisplay.textContent = "";
        botNumDisplay.textContent = "";
        botNumDisplay.textContent += num;
    } else {
        return botNumDisplay.textContent += num;
    };
};

// calculates the subtraction, addition, multiplication and porcent operations
function calculateOperations(operator) {
    currentOperation = `${operator}`;
    let lastOperator = operationList.some(el => topNumberDisplay.textContent.includes(el));
    let equalSignCheck = equalList.some(el => topNumDisplay.textContent.includes(el));
    if (equalSignCheck === true) {
        return;
    };
    if (topNumDisplay.textContent === "" && botNumDisplay.textContent === "") {
        return;
    };
    if (topNumberDisplay.textContent === "") {
        return setFisrtNumber(currentOperation)
    };
    if (botNumDisplay.textContent === "") {
        return selectOperation(currentOperation);
    }
    else if (lastOperator === true) { 
        return calculateLastOperation(currentOperation)
    };
};

// calculates the divide operation
function calculateDivideOperation() {
    setOperation = "÷";
    let lastOperator = operationList.some(el => topNumberDisplay.textContent.includes(el));
    let equalSignCheck = equalList.some(el => topNumberDisplay.textContent.includes(el))
    if (equalSignCheck === true) {
        return;
    }
    if (botNumDisplay.textContent === "0") {
        numbersBtns.forEach(button => {
            button.disabled = true
        });
        operationBtns.forEach(button => {
            button.disabled = true;
        });
        return bottomNumberDisplay.textContent = "Can't divide by 0! Clear please";
    }
    if (botNumDisplay.textContent === "") {
        return selectOperation(setOperation)
    } 
    if (topNumDisplay.textContent === "") {
        return setFisrtNumber(setOperation)
    }
    else if (lastOperator === true) { 
        return calculateLastOperation(setOperation)
    } 
};

// prevents the user to input more than one dot
function checkDot() {
    let equalSignCheck = equalList.some(el => topNumDisplay.textContent.includes(el))
    if (botNumDisplay.textContent === "" || botNumDisplay.textContent === "0") {
        botNumDisplay.textContent = "0.";
    } 
    if (!botNumDisplay.textContent.includes(".")) {
        botNumDisplay.textContent += "."
    }
    if (equalSignCheck === true) {
        topNumDisplay.textContent = ""
        botNumDisplay.textContent = "0."
    }
}

// gets the bottom number and add it to the top number if it's empty
function setFisrtNumber(operation) {
    topNumDisplay.textContent = `${botNumDisplay.textContent}  ${operation}`;
    botNumDisplay.textContent = "";
};

// calculate the bottom and top numbers
function calculateLastOperation (operation) {
    let lastOperator = topNumDisplay.textContent.slice(-1);
    let sum = calculate(`${lastOperator}`, topNumDisplay.textContent, botNumDisplay.textContent);
    sum = roundSum(sum);
    topNumDisplay.textContent = `${sum} ${operation}`;
    botNumDisplay.textContent = "";
};

// it will grab the last operation displaying on the screen and add it to the top number
function selectOperation(operation) {
    switch (operation) {
        case "+":
            if (topNumDisplay.textContent === "") {
                return;
            } else {
                topNumDisplay.textContent = topNumDisplay.textContent.slice(0, -2);
                return topNumDisplay.textContent = `${topNumDisplay.textContent} +`;
            };
        case "-":
            if (topNumDisplay.textContent === "") {
                return;
            } else {
                topNumDisplay.textContent = topNumDisplay.textContent.slice(0, -2);
                return topNumDisplay.textContent = `${topNumDisplay.textContent} -`;
            };
        case "*":
            if (topNumDisplay.textContent === "") {
                return;
            } else {
                topNumDisplay.textContent = topNumDisplay.textContent.slice(0, -2);
                return topNumDisplay.textContent = `${topNumDisplay.textContent} *`;     
            };
        case "÷":
            if (topNumDisplay.textContent === "") {
                return;
            } else {
                topNumDisplay.textContent = topNumDisplay.textContent.slice(0, -2);
                return topNumDisplay.textContent = `${topNumDisplay.textContent} ÷`;
            };
        case "%":
            if (topNumDisplay.textContent === "") {
                return;
            } else {
                topNumDisplay.textContent = topNumDisplay.textContent.slice(0, -2);
                return topNumDisplay.textContent = `${topNumDisplay.textContent} %`;
            };
    };
};

function getsumResult() {
    let equalSignCheck = equalList.some(el => topNumDisplay.textContent.includes(el))
    if (botNumDisplay.textContent === "" || topNumDisplay.textContent === "") {
        return;
    }
    if (equalSignCheck === true) {
        return;
    }
    let lastOperator = topNumDisplay.textContent.slice(-1); 
    let sum = calculate(`${lastOperator}`, topNumDisplay.textContent, botNumDisplay.textContent);
    num1 = parseFloat(topNumDisplay.textContent);
    num2 = parseFloat(botNumDisplay.textContent);
    sum = roundSum(sum);
    topNumDisplay.textContent = `${num1} ${lastOperator} ${num2} =`;
    botNumDisplay.textContent = sum;
}

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

function roundSum(num) {
    return Math.round(num * 1000) / 1000;
};

function clearDisplay() {
    botNumDisplay.textContent = "";
    topNumDisplay.textContent = "";
    numbersBtns.forEach(button => {
        button.disabled = false;
    });
    operationBtns.forEach(button => {
        button.disabled = false;
    });
};

function deleteLastNumber() {
    let equalSignCheck = equalList.some(el => topNumDisplay.textContent.includes(el))
    if (equalSignCheck === true) {
        topNumDisplay.textContent = "";
        botNumDisplay.textContent = "";
    } else {
        botNumDisplay.textContent = botNumDisplay.textContent.slice(0, -1);
    };
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