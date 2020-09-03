const Message = require('../models/message.js');

exports.getRootPage = (req, res, next) => {
  res.render('index', {
    pageTitle: 'Welcome'
  });
}

exports.postEnterChatroom = async (req, res, next) => {
  const username = req.body.username;
  if (username) {
    const lastMessages = await Message.find().sort({ _id: -1 }).limit(50); 
    
    res.render('chatroom', {
      pageTitle: 'Chatroom',
      username: username,
      lastMessages: lastMessages
    });
  } else {
    res.redirect('/');
  }
}

exports.getEnterChatroom = (req, res, next) => {
  res.redirect('/');
}
