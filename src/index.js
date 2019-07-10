// Time Widget
const timeWidget = document.querySelector('#desktop-widget')
function updateTime() {
    let currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    // if (hours > 12) {
    //     hours -= 12
    // }
    let t_str = hours + ":" + minutes + " ";
    if (hours > 11) {
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    timeWidget.innerHTML = t_str;
}
setInterval(updateTime, 1000);
document.addEventListener("DOMContentLoaded", updateTime())

//Weather Widget


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
    if(e.target.id === 'piano-icon') {
        document.querySelector('#piano-app').style.display = 'block';
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

// Piano App

const c = document.querySelector('#c')
const c_audio = document.createElement('audio')
c_audio.src = "audio/middle_c.mp3"

const cSharp = document.querySelector('#c_sharp')
const c_sharp_audio = document.createElement('audio')
c_sharp_audio.src = "audio/mid_c_sharp.mp3"

const d = document.querySelector('#d')
const d_audio = document.createElement('audio')
d_audio.src = "audio/middle_d.mp3"

const dSharp = document.querySelector('#d_sharp')
const d_sharp_audio = document.createElement('audio')
d_sharp_audio.src = "audio/mid_d_sharp.mp3"

const e = document.querySelector('#e')
const e_audio = document.createElement('audio')
e_audio.src = "audio/middle_e.mp3"

const f = document.querySelector('#f')
const f_audio = document.createElement('audio')
f_audio.src = "audio/middle_f.mp3"

const fSharp = document.querySelector('#f_sharp')
const f_sharp_audio = document.createElement('audio')
f_sharp_audio.src = "audio/mid_f_sharp.mp3"

const g = document.querySelector('#g')
const g_audio = document.createElement('audio')
g_audio.src = "audio/middle_g.mp3"

const gSharp = document.querySelector('#g_sharp')
const g_sharp_audio = document.createElement('audio')
g_sharp_audio.src = "audio/mid_g_sharp.mp3"

const a = document.querySelector('#a')
const a_audio = document.createElement('audio')
a_audio.src = "audio/middle_a.mp3"

const aSharp = document.querySelector('#a_sharp')
const a_sharp_audio = document.createElement('audio')
a_sharp_audio.src = "audio/mid_a_sharp.mp3"

const b = document.querySelector('#b')
const b_audio = document.createElement('audio')
b_audio.src = "audio/middle_b.mp3"

const highC = document.querySelector('#highC')
const high_c_audio = document.createElement('audio')
high_c_audio.src = "audio/high_c.mp3"

const highCSharp = document.querySelector('#highCSharp')
const high_c_sharp_audio = document.createElement('audio')
high_c_sharp_audio.src = "audio/high_c_sharp.mp3"

const highD = document.querySelector('#highD')
const high_d_audio = document.createElement('audio')
high_d_audio.src = "audio/high_d.mp3"

const highDSharp = document.querySelector('#highDSharp')
const high_d_sharp_audio = document.createElement('audio')
high_d_sharp_audio.src = "audio/high_d_sharp.mp3"

const highE = document.querySelector('#highE')
const high_e_audio = document.createElement('audio')
high_e_audio.src = "audio/high_e.mp3"

const highF = document.querySelector('#highF')
const high_f_audio = document.createElement('audio')
high_f_audio.src = "audio/high_f.mp3"

const highFSharp = document.querySelector('#highFSharp')
const high_f_sharp_audio = document.createElement('audio')
high_f_sharp_audio.src = "audio/high_f_sharp.mp3"

const highG = document.querySelector('#highG')
const high_g_audio = document.createElement('audio')
high_g_audio.src = "audio/high_g.mp3"

const highGSharp = document.querySelector('#highGSharp')
const high_g_sharp_audio = document.createElement('audio')
high_g_sharp_audio.src = "audio/high_g_sharp.mp3"

const highA = document.querySelector('#highA')
const high_a_audio = document.createElement('audio')
high_a_audio.src = "audio/high_a.mp3"

const highASharp = document.querySelector('#highASharp')
const high_a_sharp_audio = document.createElement('audio')
high_a_sharp_audio.src = "audio/high_a_sharp.mp3"

const highB = document.querySelector('#highB')
const high_b_audio = document.createElement('audio')
high_b_audio.src = "audio/high_b.mp3"

c.addEventListener('click', function (e) {
    c_audio.play()
})

cSharp.addEventListener('click', function (e) {
    c_sharp_audio.play()
})

d.addEventListener('click', function (e) {
    d_audio.play()
})

dSharp.addEventListener('click', function (e) {
    d_sharp_audio.play()
})

e.addEventListener('click', function (e) {
    e_audio.play()
})

f.addEventListener('click', function (e) {
    f_audio.play()
})

fSharp.addEventListener('click', function (e) {
    f_sharp_audio.play()
})

g.addEventListener('click', function (e) {
    g_audio.play()
})

gSharp.addEventListener('click', function (e) {
    g_sharp_audio.play()
})

a.addEventListener('click', function (e) {
    a_audio.play()
})

aSharp.addEventListener('click', function (e) {
    a_sharp_audio.play()
})

b.addEventListener('click', function (e) {
    b_audio.play()
})

highC.addEventListener('click', function (e) {
    high_c_audio.play()
})

highCSharp.addEventListener('click', function (e) {
    high_c_sharp_audio.play()
})

highD.addEventListener('click', function (e) {
    high_d_audio.play()
})

highDSharp.addEventListener('click', function (e) {
    high_d_sharp_audio.play()
})

highE.addEventListener('click', function (e) {
    high_e_audio.play()
})

highF.addEventListener('click', function (e) {
    high_f_audio.play()
})

highFSharp.addEventListener('click', function (e) {
    high_f_sharp_audio.play()
})

highG.addEventListener('click', function (e) {
    high_g_audio.play()
})

highGSharp.addEventListener('click', function (e) {
    high_g_sharp_audio.play()
})

highA.addEventListener('click', function (e) {
    high_a_audio.play()
})

highASharp.addEventListener('click', function (e) {
    high_a_sharp_audio.play()
})

highB.addEventListener('click', function (e) {
    high_b_audio.play()
})
