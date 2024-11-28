const express = require('express')
const ForexController = require('../controllers/forexController')
const router = express.Router();

router.post('/forex-data', ForexController.getForexData);

module.exports = router