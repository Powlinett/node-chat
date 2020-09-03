const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  user: {
    name: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Message', messageSchema);