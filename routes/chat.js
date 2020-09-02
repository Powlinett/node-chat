const express = require('express');

const chatController = require('../controllers/chat');

const router = express.Router();

router.get('/', chatController.getRootPage);

router.post('/enter-chatroom', chatController.postEnterChatroom);

router.get('/enter-chatroom', chatController.getEnterChatroom);

router.post('/message', chatController.postMessage);

module.exports = router;