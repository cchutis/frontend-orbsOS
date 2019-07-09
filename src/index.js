// const browser = document.querySelector('#browser');
// const bar = document.querySelector('#browser-bar');
// const close = document.querySelector('#close');
// let initX, initY, mousePressX, mousePressY;
// browser.style.transform = "translate(" + window.innerWidth + "px," + window.innerHeight + "px) scale(0,0)";

// setTimeout(function () {
//     browser.classList.add('-show')
//     browser.classList.add('-animating')
//     let w = window.innerWidth;
//     let h = window.innerHeight;
//     let x = Math.floor(Math.random() * w / 2)
//     let y = Math.floor(Math.random() * h / 2)
//     browser.dataset.x = x;
//     browser.dataset.y = y
//     browser.style.transform = "translate(" + x + "px," + y + "px) scale(1,1)";
//     setTimeout(function () { browser.classList.remove('-animating') }, 200)
// }, 500)

// bar.addEventListener('mousedown', function (e) {
//     initX = browser.dataset.x || browser.offsetLeft;
//     initY = browser.dataset.y || browser.offsetTop;
//     mousePressX = event.clientX;
//     mousePressY = event.clientY;
//     browser.style.zIndex = 100;
//     window.addEventListener('mousemove', repositionElement, false);
//     window.addEventListener('mouseup', function () {
//         window.removeEventListener('mousemove', repositionElement, false);
//     }, false);
// }, false)

// function repositionElement(event) {
//     var x = Number(initX) + event.clientX - mousePressX;
//     var y = Number(initY) + event.clientY - mousePressY;
//     browser.style.transform = "translate(" + x + "px," + y + "px)";
//     browser.dataset.x = x;
//     browser.dataset.y = y;
// }

// close.addEventListener('mousedown', function (e) {
//     browser.classList.add('-animating')
//     setTimeout(function () {
//         let x = browser.dataset.x || browser.offsetLeft;
//         let y = browser.dataset.y || browser.offsetTop;
//         browser.style.transform = "translate(" + x + "px," + y + "px) scale(0.001,0.001)"
//     }, 50)
//     // auto open when windo.open is called
//     setTimeout(function () {
//         window.open()
//     }, 3000)
// }, false)

// window.open = function (URL) {
//     let x = browser.dataset.x || browser.offsetLeft;
//     let y = browser.dataset.y || browser.offsetTop;
//     browser.style.transform = "translate(" + x + "px," + y + "px) scale(1,1)"
//     setTimeout(function () { browser.classList.remove('-animating') }, 200)
// }

// Time Widget
const timeWidget = document.querySelector('#desktop-widget')
function updateTime() {
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + " ";
    if (hours > 11) {
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    timeWidget.innerHTML = t_str;
}
setInterval(updateTime, 1000);
document.addEventListener("DOMContentLoaded", updateTime())

// get all draggie elements
let draggableElems = document.querySelectorAll('.draggable');
// array of Draggabillies
let draggies = []
// init Draggabillies
for (let i = 0, len = draggableElems.length; i < len; i++) {
    let draggableElem = draggableElems[i];
    let draggie = new Draggabilly(draggableElem, {
        handle: '.window-bar',
        containment: '.container'
    });
    draggies.push(draggie);
}


// increase text size text editor
const textArea = document.querySelector('#script-area')
// const increaseSizeButton = document.querySelector('.increase-font')
// increaseSizeButton.addEventListener('click', function() {
//     textArea.style.fontSize += 1 + 'px';
// })

function resizeText(multiplier) {
    if (textArea.style.fontSize == "") {
        textArea.style.fontSize = "1.0em";
    }
    textArea.style.fontSize = parseFloat(textArea.style.fontSize) + (multiplier * 0.2) + "em";
}

let changeFont = function(font) {
  textArea.style.fontFamily = font.value;
};

// Icon hover & interaction
const dock = document.querySelector('#dock')

dock.addEventListener('click', function(e) {
    if(e.target.id === 'text-editor-icon') {
        document.querySelector('#text-editor-app').style.display = 'block';
    }
    if(e.target.id === 'calculator-icon') {
        document.querySelector('#calculator-app').style.display = 'block';
    }
    if(e.target.id === 'task-tracker-icon') {
        document.querySelector('#task-tracker-app').style.display = 'block';
    }
})

// Text/Code Switcher



// Calculator

document.addEventListener('DOMContentLoaded', function () {

    const calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function updateDisplay() {
        const display = document.getElementsByClassName('calculator-screen')[0];
        display.value = calculator.displayValue;
    }
    updateDisplay();

    const keys = document.querySelector('.calculator-keys')
    keys.addEventListener('click', function (e) {
        if (!e.target.matches('button')) {
            return
        }

        if (e.target.classList.contains('operator')) {
            handleOperator(e.target.value)
            updateDisplay()
            return
        }

        if (e.target.classList.contains('decimal')) {
            inputDecimal(e.target.value)
            updateDisplay()
            return //prevent MORE decimals from coming up
        }

        if (e.target.classList.contains('all-clear')) {
            resetCalculator()
            updateDisplay()
            return
        }

        inputDigit(e.target.value)
        updateDisplay()
    })

    function inputDigit(digit) {
        if (calculator.waitingForSecondOperand === true) {
            calculator.displayValue = digit
            calculator.waitingForSecondOperand = false
        } else {
            if (calculator.displayValue === 0) {
                calculator.displayValue = digit
            } else {
                calculator.displayValue += digit
            }
        }
    }

    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand === true) {
            return
        }
        if (!calculator.displayValue.includes(dot)) {
            calculator.displayValue += dot;
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(calculator.displayValue)

        if (calculator.operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator
            return
        }

        if (calculator.firstOperand === null) {
            calculator.firstOperand = inputValue
        } else if (calculator.operator) {
            const currentValue = calculator.firstOperand || 0
            const result = performCalculation[calculator.operator](calculator.firstOperand, inputValue)

            calculator.displayValue = String(result)
            calculator.firstOperand = result
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator
    }

    const performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

        '%': (firstOperand, secondOperand) => firstOperand % secondOperand,

        '^': (firstOperand, secondOperand) => Math.pow(firstOperand, secondOperand),

        'Pyt': (firstOperand, secondOperand) => Math.pow((Math.pow(firstOperand, 2) + Math.pow(secondOperand, 2)), 0.5),

        '=': (firstOperand, secondOperand) => secondOperand

    }

    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

})