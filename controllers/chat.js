const Message = require('../models/message.js');

exports.getRootPage = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Welcome'
  });
}

exports.postEnterChatroom = (req, res, next) => {
  const username = req.body.username;
  
  res.render('chatroom', {
    pageTitle: 'Chatroom',
    username: username
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
      created: Date.now(),
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