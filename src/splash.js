const usersList = 'http://localhost:3000/users' // User's path on backend
const userAccountsArea = document.querySelector('#user-accounts')
const osTitle = document.querySelector('#main-title')
// Grabbable Main Window MacOS
const windowTopBar = document.createElement('div')
windowTopBar.style.width = "100%"
windowTopBar.style.height = "32px"
windowTopBar.style.backgroundColor = "#2B303C"
windowTopBar.style.position = "absolute"
windowTopBar.style.top = windowTopBar.style.left = 0
windowTopBar.style.webkitAppRegion = "drag"
document.body.appendChild(windowTopBar)

document.addEventListener('DOMContentLoaded', getUsers())
// User Accounts fetch
function getUsers() {
fetch(usersList)
.then(r => r.json())
.then(users => 
    users.forEach(user => 
        renderUser(user)))
    }
// Append "create" user
function renderUser(user) {
    const div = document.createElement('div')
    div.className = 'user-icon'
    div.id = `user-${user.id}`
    div.dataset.name = user.name
    div.onclick = loadOs
    div.style.backgroundImage = `url('img/${user.photo}')`
    div.style.backgroundSize = '100%'
    
    userAccountsArea.insertBefore(div, userAccountsArea.childNodes[0])

}
// Display Username on main OS splash on Hover
userAccountsArea.addEventListener('mouseover', function(e) {
    if (e.target.className === 'create-user-icon user-icon') {
        osTitle.innerText = 'Create New Account'
    }
    if(e.target.className === 'user-icon') {
        osTitle.innerText = e.target.dataset.name
    }
})
userAccountsArea.addEventListener('mouseout', function(e) {
    if(e.target.className === 'user-icon') {
        osTitle.innerText = 'Orbs//OS'
    }
    if(e.target.className === 'create-user-icon user-icon') {
        osTitle.innerText = 'Orbs//OS'
    }
})

//Launch OS
function loadOs() {
    document.location.href = 'index.html';
}

function createAccount() {
    document.location.href = 'create.html';
}