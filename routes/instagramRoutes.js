const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/instagramController');

router.get('/fetch', instagramController.fetchLatestPost);

module.exports = router;
