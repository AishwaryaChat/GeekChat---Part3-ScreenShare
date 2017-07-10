const socket = io.connect()
const chat = document.getElementById('chat')
const userArea = document.getElementById('userArea')
const messageArea = document.getElementById('messageArea')
const login = document.getElementById('login')
const userName = document.getElementById('userName')
const usersList = document.getElementById('users')
const startShareButton = document.getElementById('start-share')
const remoteScreen = document.getElementById('remote-screen')
const videoArea = document.getElementById('video-area')
let selectedUser = ''

const contraints = {
  audio: false,
  video: true
}

login.onclick = e => {
  e.preventDefault()
  socket.emit('new user', userName.value, data => {
    if (data) {
      userArea.style.display = 'none'
      messageArea.style.display = 'block'
      const user = document.getElementById('user')
      user.innerHTML = userName.value
      userName.value = ''
    }
  })
}

startShareButton.onclick = () => {
  videoArea.style.display = 'block'
  // navigator.getUserMedia(contraints,
  //   stream => {
  //     console.log('streammmmmmmmmmm', stream)
  //     remoteScreen.src = window.URL.createObject(stream)
  //   },
  // error => console.log('errorrrrr', error))
  const screen = new Screen()
  screen.onaddstream = e => {
    console.log('eeeeeeeeeeeee', e.video)
  }
}

socket.on('get users', users => {
  usersList.innerHTML = ''
  users.map(user => {
    const userName = document.createElement('li')
    userName.innerHTML = `<span>${user.name}</span>`
    userName.id = user.name
    userName.classname = 'list-group-item'
    usersList.appendChild(userName)
    userName.onclick = e => {
      e.preventDefault()
      selectedUser = userName.id
      chat.style.display = 'block'
      socket.emit('user selected', selectedUser)
    }
  })
})
