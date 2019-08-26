
let userId = localStorage.getItem("user")
const userDataUrl = `http://localhost:3000/users/${userId}`
// NOT FINISHED ^^^^^^
let currentUser;
//document loaded?
document.addEventListener('DOMContentLoaded', function() {
    getUser()
})
// get user instance
function getUser() {
    fetch(userDataUrl)
    .then(r => r.json())
    .then(user => {
        currentUser = user
        getWeather(currentUser)
        populateSettings()
    })
}

//Settings for User (populate and edit)
function populateSettings() {
    const userSettings = document.querySelector('.settings-options');
    userSettings.innerHTML = `
    <img class="settings-picture" src="${currentUser.photo}">
    <p>Name: <span>${currentUser.name}</span> <button data-row="name" class="edit-name">Change</button></p>
    <p> Zip Code: <span>${currentUser.location}</span> <button data-row="name" class="edit-zip-code">Change</button></p>
    `
}
document.getElementById('getval').addEventListener('change', readURL, true);
// console.log(localStorage.getItem("user"))
// Time Widget
const timeDiv = document.querySelector('#time')
function updateTime() {
    let currentTime = new Date()
    let hours = currentTime.getHours()
    let minutes = currentTime.getMinutes()
    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (hours > 12) {
        hours -= 12
    }
    let t_str = hours + ":" + minutes + " ";
    if (hours > 11) {
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    timeDiv.innerHTML = t_str;
}
setInterval(updateTime, 1000);
document.addEventListener("DOMContentLoaded", updateTime())

//Close Window Event Listener
document.addEventListener('click', function(e) {
    if(e.target.className === 'close') {
        e.target.parentNode.parentNode.style.display = 'none';
    }
    // if(e.target.className === 'icon') {
    //     e.target.style.backgroundColor = '#000';
    // }
})

// Z-index toggle
document.addEventListener('click', function(e) {
    if(e.target.className === 'window') {
        document.querySelectorAll('.window').style.zIndex = '0'
        e.target.style.zIndex = '1'
    }
})


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
const textArea = document.querySelector('#text-area')

// Text Area Code/Text Switch
function textCodeSwitch() {
    const textArea = document.querySelector('#text-area')
    const textOptions = document.querySelector('.text-options')
    const codeArea = document.querySelector('#code-area')
    const codeOptions = document.querySelector('.code-options')
    textArea.style.display = 'none';
    codeArea.style.display = 'block';
    textOptions.style.display = 'none';
    codeOptions.style.display = 'block';
}

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
    if(e.target.id === 'timer-icon') {
        document.querySelector('#timer-app').style.display = 'block';
    }
    if(e.target.id === 'settings-icon') {
        document.querySelector('#settings-app').style.display = 'block';
    }
    if(e.target.id === 'browser-icon') {
        document.querySelector('#browser-app').style.display = 'block';
    }
})

// Text/Code Switcher


// Calculator

document.addEventListener('DOMContentLoaded', function () {

    const calculator = {
        displayValue: '',
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
        calculator.displayValue = '';
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

// Timer App

document.addEventListener('DOMContentLoaded', function () {
    const timer = document.querySelector('#timer')
    timer.innerText = "0:00"

    const startButton = document.querySelector('#startbutton')
    startButton.innerText = "Start"

    const stopButton = document.querySelector('#stopbutton')
    stopButton.innerText = "Stop"

    const resetButton = document.querySelector('#resetbutton')
    resetButton.innerText = "Reset"

    startButton.addEventListener('click', function (e) {
        let twoTimer = timer.innerText.split(':')
        let minutes = twoTimer[0]
        let seconds = twoTimer[1]
        const clock = setInterval(() => {
            if (seconds < 9) {
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":0" + seconds
            } else if (seconds >= 9 && seconds < 59) { //50 dif
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":" + seconds
            } else if (seconds >= 59 && seconds < 69) { //10 dif
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":0" + (seconds - (60 * Math.floor(seconds / 60)))
            } else if (seconds >= 69 && seconds < 119) { //50 dif
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":" + (seconds - (60 * Math.floor(seconds / 60)))
            } else if (seconds >= 119 && seconds < 129) { //10 dif
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":0" + (seconds - (60 * Math.floor(seconds / 60)))
            } else if (seconds >= 129 && seconds < 179) {
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":" + (seconds - (60 * Math.floor(seconds / 60)))
            } else if (seconds >= 179 && seconds < 189) {
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":0" + (seconds - (60 * Math.floor(seconds / 60)))
            } else if (seconds >= 189 && seconds < 239) {
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":" + (seconds - (60 * Math.floor(seconds / 60)))
            } else if (seconds >= 239 && seconds < 249) {
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":0" + (seconds - (60 * Math.floor(seconds / 60)))
            } else if (seconds >= 249 && seconds < 299) {
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":" + (seconds - (60 * Math.floor(seconds / 60)))
            } else if (seconds >= 299 && seconds < 309) {
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":0" + (seconds - (60 * Math.floor(seconds / 60)))
            } else if (seconds >= 309 && seconds < 359) {
                seconds++
                timer.innerHTML = Math.floor(seconds / 60) + ":" + (seconds - (60 * Math.floor(seconds / 60)))
            }
        }, 1000)

        stopButton.addEventListener('click', function (e) {
            clearTimeout(clock)
        })

        resetButton.addEventListener('click', function (e) {
            timer.innerText = "0:00"
            clearTimeout(clock)
        })
    })

})

// Task Tracker App
getEverything()
function getEverything() {
    fetch('http://localhost:3000/tasks')
        .then(res => res.json())
        .then(tasks => {
            const list = document.querySelector('#ToDoList')
            addEventListenerToShow(list)

            for (const task of tasks) {
                const coolTask = document.createElement('li')
                coolTask.className = 'show-task'
                coolTask.dataset.id = task.id
                coolTask.innerText = task.activity

                const deleteButton = document.createElement('button')
                deleteButton.innerText = 'Delete'
                deleteButton.className = 'task-delete'
                addEventListenerToDelete(deleteButton)
                coolTask.appendChild(deleteButton)

                list.appendChild(coolTask)
            }

            const newTaskDiv = document.querySelector('#New-Task')
            const newTaskButton = document.createElement('button')
            newTaskButton.innerText = 'New Task'
            newTaskButton.className = 'new-task-button'
            createNewTask(newTaskButton)
            newTaskDiv.appendChild(newTaskButton)
        })
}

function addEventListenerToShow(list) {
    list.addEventListener('click', function (e) {
        if (e.target.className === 'show-task') {
            fetch('http://localhost:3000/tasks' + '/' + e.target.dataset.id)
                .then(res => res.json())
                .then(task => appendDetails(task))
        }
    })
}

function addEventListenerToDelete(deleteButton) {
    deleteButton.addEventListener('click', function (e) {
        fetch('http://localhost:3000/tasks' + '/' + e.target.parentElement.dataset.id, {
                method: 'DELETE'
            })
            .then(e.target.parentElement.remove())
    })
}

function appendDetails(task) {
    const thisActivity = document.createElement('h1')
    thisActivity.innerText = task.activity
    thisActivity.className = 'task-headline'

    const thisDescription = document.createElement('textarea')
    thisDescription.innerText = task.description
    thisDescription.className = 'description-area'

    const saveButton = document.createElement('button')
    saveButton.innerText = 'Save'
    saveButton.dataset.id = task.id
    saveButton.className = 'task-edit-save'
    addEventListenerToUpdate(saveButton)

    const fullDetails = document.querySelector('#TaskDetails')
    fullDetails.innerHTML = ''
    fullDetails.appendChild(thisActivity)
    fullDetails.appendChild(thisDescription)
    fullDetails.appendChild(saveButton)
}

function addEventListenerToUpdate(saveButton) {
    saveButton.addEventListener('click', function (e) {
        fetch('http://localhost:3000/tasks' + '/' + e.target.dataset.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                description: e.target.previousSibling.value
            })
        })
    })
}

function createNewTask(newTaskButton) {
    newTaskButton.addEventListener('click', function (e) {
        const newTaskActivity = document.createElement('textarea')
        newTaskActivity.className = 'new-task-activity'
        newTaskActivity.placeholder = 'Enter a Task'
        const newTaskDescription = document.createElement('textarea')
        newTaskDescription.className = 'new-task-description'
        newTaskActivity.placeholder = 'Describe your Task'
        const submitButton = document.createElement('button')
        submitButton.className = 'task-submit'
        submitButton.innerText = 'Submit'
        addEventListenerToPost(submitButton)

        document.querySelector('#New-Task').appendChild(newTaskActivity)
        document.querySelector('#New-Task').appendChild(newTaskDescription)
        document.querySelector('#New-Task').appendChild(submitButton)
    })
}

function addEventListenerToPost(submitButton) {
    submitButton.addEventListener('click', function (e) {
        fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    activity: e.target.previousSibling.previousSibling.value,
                    description: e.target.previousSibling.value
                })
            })
            .then(res => res.json())
            .then(newTask => {
                const newTaskLi = document.createElement('li')
                newTaskLi.innerText = newTask.activity
                newTaskLi.dataset.id = newTask.id

                const deleteButton = document.createElement('button')
                deleteButton.innerText = 'Delete'
                addEventListenerToDelete(deleteButton)
                newTaskLi.appendChild(deleteButton)

                document.querySelector('#ToDoList').appendChild(newTaskLi)
            })
    })
}

// Code Editor Logic
function run() {
    let el = document.getElementById('code-area');
    let scriptText = el.value;
    let oldScript = document.getElementById('scriptContainer');
    let newScript;

    if (oldScript) {
        oldScript.parentNode.removeChild(oldScript);
    }

    newScript = document.createElement('script');
    newScript.id = 'scriptContainer';
    newScript.text = el.value;
    document.body.appendChild(newScript);
}

//Get Weather
function getWeather(currentUser) {
   fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=tAPoDTVPV503OW9gp9TPy030hXDYTC3a&q=${currentUser.location}`)
    .then(res => res.json())
    .then(locationData => { 
        let key = locationData[0].Key
        fetch(`http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=tAPoDTVPV503OW9gp9TPy030hXDYTC3a`)
        .then(r => r.json())
        .then(conditions => {
            const temp = conditions[0].Temperature.Imperial.Value
            const condition = conditions[0].WeatherIcon
            createWeather(temp, condition)
        })
    })
}

// Create Weather & Add to Desktop
function createWeather(temp, condition) {
    const weatherDiv = document.querySelector('#weather')
    const h1 = document.createElement('h1')
    h1.innerText = `${temp}º`
    h1.className = 'weather-temp'
    const img = document.createElement('img')
    img.src = `./img/weather-icons/${condition}.svg`
    img.className = 'weather-icon'
    weatherDiv.appendChild(h1)
    weatherDiv.appendChild(img)
}
// Internet Browser App
const searchBar = document.querySelector('.search-bar')
const searchForm = document.querySelector('.search-form')
const goButton = searchBar.querySelector('.search-btn')
const browserArea = document.querySelector('.browser-content')
const iframe = document.querySelector('iframe')

searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    if(searchBar != "") {
        const url = searchForm.querySelector('#url-bar').value
        browserArea.innerHTML = `<iframe src="${url}" style="width: 100%; height: 600px; border: 0;"></iframe>`
    }
})

// Set Wallpaper

document.getElementById('getval').addEventListener('change', readURL, true);
function readURL() {
    var file = document.getElementById("getval").files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        document.querySelector('body').style.backgroundImage = "url(" + reader.result + ")";
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {}
}