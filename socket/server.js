const Message = require('../models/message');

exports.connect = (io) => {
  io.on('connection', (socket) => {
    socket.on('connected', (username) => {
      try {
        io.emit('connected', `${username} is now connected.`);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('typing', (username) => {
      try {
        if (username) {
          io.emit('typing', `${username} is typing...`);
        } else {
          io.emit('typing', false);
        }
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('message', async (data) => {
      const username = data.username;
      const messageContent = data.message;
      try {
        const message = new Message({
          content: messageContent,
          createdAt: Date.now(),
          user: {
            name: username
          }
        })
        await message.save();
        io.emit('message', message)
      } catch (err) {
        console.log(err);
      }
    })
  });
}