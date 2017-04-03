const EventEmitter = require('events');

class ChatApp extends EventEmitter {
  /**
   * @param {String} title
   */
  constructor(title) {
    super();

    this.title = title;

    // Посылать каждую секунду сообщение
    setInterval(() => {
      this.emit('message', `${this.title}: ping-pong`);
    }, 1000);
  }

  close() {
      this.emit('close');
  }
}

let webinarChat =  new ChatApp('webinar');
let facebookChat = new ChatApp('=========facebook');
let vkChat =       new ChatApp('---------vk');
vkChat.setMaxListeners(2);

let chatOnMessage = (message) => {
  console.log(message);
};

let prepareToAnswer = () => {
    console.log(`Готовлюсь к ответу`);
}


webinarChat.on('message', prepareToAnswer);
webinarChat.on('message', chatOnMessage);

facebookChat.on('message', chatOnMessage);

vkChat.on('message', prepareToAnswer);
vkChat.on('message', chatOnMessage);
vkChat.on('close', () => {
    console.log('Чат вконтакте закрылся :(');
});

// Закрыть вконтакте
setTimeout( ()=> {
  console.log('Закрываю вконтакте...');
  vkChat.close();
  vkChat.removeListener('message', chatOnMessage);
  vkChat.removeListener('message', prepareToAnswer);
}, 10000 );


// Закрыть фейсбук
setTimeout( ()=> {
  console.log('Закрываю фейсбук, все внимание — вебинару!');
facebookChat.removeListener('message', chatOnMessage);
}, 15000 );

setTimeout(() => {
  console.log('Закрываю вебинар...');
  webinarChat.removeListener('message', chatOnMessage);
  webinarChat.removeListener('message', prepareToAnswer);
}, 20000)