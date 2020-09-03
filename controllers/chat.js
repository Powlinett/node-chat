const Message = require('../models/message.js');

exports.getRootPage = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Welcome'
  });
}

exports.postEnterChatroom = async (req, res, next) => {
  const username = req.body.username;
  const lastMessages = await Message
    .find()
    .sort({ _id: -1 })
    .limit(50)
  ;
  
  res.render('chatroom', {
    pageTitle: 'Chatroom',
    username: username,
    lastMessages: lastMessages
  });
}

exports.getEnterChatroom = (req, res, next) => {
  res.redirect('/');
}

exports.postMessage = async (req, res, next) => {
  const username = req.body.username;
  const messageContent = req.body.message;
  console.log(req.body);
  try {
    const message = new Message({
      content: messageContent,
      createdAt: Date.now(),
      user: {
        name: username
      }
    })
    await message.save();
    res.status('201').json({
      "response": "message created"
    })
  } catch (err) {
    console.log(err);
  }
}