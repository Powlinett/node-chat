const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const chatRoutes = require('./routes/chat');

const socketServer = require('./socket/server');

dotenv.config();

const MONGODB_URI = `mongodb+srv://powlinett:${process.env.MONGODB_PASSWORD}@node-chat-cluster.aqnmb.mongodb.net/node-chat?retryWrites=true&w=majority`

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(chatRoutes);

app.use('/', (req, res, next) => {
  try { 
    res.render('no-page', {pageTitle: 'No page yet'});
  } catch (err) {
    console.log(err);
  }
});

socketServer.connect(io);

const launchServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    http.listen(3000);
  } catch (err) {
    console.log(err);
  }
};

launchServer();