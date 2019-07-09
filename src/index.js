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
// const timeWidget = querySelector('#desktop-widget')
// function startTime() {
//     let today = new Date();
//     let h = today.getHours();
//     let m = today.getMinutes();
//     m = fixMin(m)
//     timeWidget.innerHTML = h + ":" + m
// }
//     function fixMin(m) {
//         if(m < 10) {
//             m = "0" + m
//         }
//         return m;
//     }

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