const newUserForm = document.querySelector('#create-user-form')
//Event Listener on Submit button
newUserForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const userImage = image
    const userName = newUserForm.querySelector('#name').value
    const userLocation = newUserForm.querySelector('#location').value
    if(userName === '' || userLocation === '') {
        alert('Must fill out all fields')
    } else {
        createAccount(userName, userLocation, userImage)
    }
})
//POST action on submit
function createAccount(name, location, image) {
    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: name,
            location: location,
            photo: image
        })
    })
    splash()

}
// Back button to splash
function splash() {
    document.location.href = 'splash.html';
}

// Webcam JS Electron
let enabled = false;
Webcam.set({
    width: 680,
    height: 500,
    dest_width: 640,
    dest_height: 480,
    image_format: 'jpeg',
    jpeg_quality: 90,
    force_flash: false
});
const startButton = document.querySelector('.start')
startButton.addEventListener('click', function () {
    if (!enabled) {
        enabled = true
        Webcam.attach('#my_camera')
        setTimeout(function () {
            document.querySelector('.snap-photo-btn').style.display = 'block'
        }, 800);
    } else {
        enabled = false
        Webcam.reset()
        document.querySelector('.snap-photo-btn').style.display = 'none'
    }
})
let image
function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.querySelector('.photo-upload').style.backgroundImage = `url('img/${data_uri}')`;
        enabled = false
        Webcam.reset()
        document.querySelector('.snap-photo-btn').style.display = 'none'
        image = data_uri
        
    });
}
