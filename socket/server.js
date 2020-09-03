const User = require('../models/user');
const Message = require('../models/message');

exports.connect = (io) => {
  io.on('connection', (socket) => {
    socket.on('connected', async (username) => {
      try {
        await User.create({ name: username, socketId: socket.id });
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
            name: username,
            socketId: socket.id
          }
        });
        await message.save();
        io.emit('message', message);
      } catch (err) {
        console.log(err);
      }
    });

    socket.on('disconnect', async () => {
      try {
        const user = await User.findOne({socketId: socket.id});
        if (user) {
          io.emit('disconnect', `${user.name} left the chat.`);
        }
      } catch (err) {
        console.log(err);
      }
    });
  });
}