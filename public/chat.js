var socket = io();
var username = '';

(function getUserName(){
  while(!username){
    username = prompt('enter you name', '')
  }

  socket.emit('user.userconnected', {username});
})();

function updateCount(userCount) {
  const userCountElement = document.getElementsByClassName('statusbar__usercount-value')[0];
  userCountElement.innerHTML = userCount;
}
socket.on('server.userconnected', function(data){
  updateCount(data.userCount);
  addMessage(`user '${data.username}' joined`);
});

socket.on('server.userdisconnected', function(data){
  updateCount(data.userCount);
  addMessage(`user '${data.username}' left`);
});

socket.on('server.newmessage', function(data){
  addUserMessage(data);
});

function addMessage(msg) {
  const chatMessages = document.getElementsByClassName('chatwnd__messages')[0];
  
  var newMsgElement = document.createElement('span');
  newMsgElement.classList.add('chatwnd__message');
  newMsgElement.innerHTML = msg;

  chatMessages.appendChild(newMsgElement);
}

function addUserMessage(data) {
  addMessage(`${data.username}: ${data.message}`);
}

function handleSendBtn(){
  if(input.value) {
    let data = {'message': input.value, username};
    input.value = '';
    socket.emit('user.newmessage', data);
    addUserMessage(data);
  }
}

var sendBtn = document.getElementsByClassName('chatwnd__sendbtn')[0];
var input = document.getElementsByClassName('chatwnd__input')[0];

sendBtn.addEventListener('click', function() {
  handleSendBtn();
});

input.addEventListener('keydown', function(e) {
  if(e.keyCode == 13) {
    handleSendBtn();
  }
});