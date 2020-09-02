const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const chatRoutes = require('./routes/chat');

dotenv.config();

const MONGODB_URI = `mongodb+srv://powlinett:${process.env.MONGODB_PASSWORD}@node-chat-cluster.aqnmb.mongodb.net/node-chat?retryWrites=true&w=majority`

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(chatRoutes);

app.use('/', (req, res, next) => {
  try { 
    res.render('no-page', {pageTitle: 'No page yet'});
  } catch (err) {
    console.log(err);
  }
});

async function launchServer () {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
};

launchServer();