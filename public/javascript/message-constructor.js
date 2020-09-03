const createMessageHeaderElement = (message) => {
  const usernameElement = `<p>_${message.user}</p>`;
  const createdAtElement = `<p>${message.createdAt}</p>`;
  return `<div class="message-headers">${usernameElement}${createdAtElement}</div>`;
}

const createMessageElement = (message) => {
  return `<p class="message-content">${message.content}</p>`;
}

const createFullMessageElement = (message) => {
  const messageHeaderElement = createMessageHeaderElement(message);
  const messageElement = createMessageElement(message);

  return `<div class="message">${messageHeaderElement}${messageElement}`;
}

export { createFullMessageElement };