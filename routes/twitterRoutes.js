const express = require('express');
const router = express.Router();
const twitterController = require('../controllers/twitterController');

router.post('/tweet', twitterController.postTweet);

module.exports = router;
