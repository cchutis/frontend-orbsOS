const usersList = 'backend' // User's path on backend
const userAccountsArea = document.querySelector('#user-accounts')
// Grabbable Main Window MacOS
const windowTopBar = document.createElement('div')
windowTopBar.style.width = "100%"
windowTopBar.style.height = "32px"
windowTopBar.style.backgroundColor = "#2B303C"
windowTopBar.style.position = "absolute"
windowTopBar.style.top = windowTopBar.style.left = 0
windowTopBar.style.webkitAppRegion = "drag"
document.body.appendChild(windowTopBar)

// User Accounts fetch
// fetch(usersList)
// .then(r => r.json())
// .then(users => 
//     users.forEach(user => 
//         user.name))

// Append "create" user
// const div = document.createElement('div')
// div.id = 'create-user-icon'

//Launch OS
function loadOs() {
    document.location.href = 'index.html';
}

function createAccount() {
    document.location.href = 'create.html';
}

function splash() {
    document.location.href = 'splash.html';
}