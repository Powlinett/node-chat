import { createFullMessageElement } from './message-constructor.js';

const socket = io();

const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#message');
const chatContainer = document.querySelector('.inbox');
const username = document.querySelector('#username').value;

const sendMessage = () => {
  const message = document.querySelector('#message');
  socket.emit('message', {
    username: username,
    message: message.value
  });
  message.value = '';
};

document.addEventListener('DOMContentLoaded', () => {
  socket.emit('connected', username);
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  sendMessage();
  socket.emit('typing', false);
});

messageInput.addEventListener('focus', (event) => { 
  event.currentTarget.addEventListener('keyup', (event) => {
    if (event.currentTarget.value) {
      socket.emit('typing', username);
    } else {
      socket.emit('typing', false);
    }
    if (event.keyCode === 13 && !event.shiftKey) {
      document.querySelector('#messageForm button').click();
    }
  });
});

socket.on('last messages', (messages) => {
  messages.forEach((message) => {
    const messageElement = createFullMessageElement(message);
    chatContainer.insertAdjacentHTML('afterbegin', messageElement);
  });
});

socket.on('connected', (data) => {
  chatContainer.insertAdjacentHTML('beforeend', `<p>${data}</p>`);
});

socket.on('typing', (data) => {
  const userIsTypingDiv = document.querySelector('.typing');
  userIsTypingDiv.innerHTML = '';
  if (data) {
    userIsTypingDiv.insertAdjacentHTML('afterbegin', `<p>${data}</p>`)
  }
});

socket.on('message', (message) => {
  const messageElement = createFullMessageElement(message);
  chatContainer.insertAdjacentHTML('beforeend', messageElement);
});

socket.on('disconnect', (data) => {
  chatContainer.insertAdjacentHTML('beforeend', `<p>${data}</p>`);
});
