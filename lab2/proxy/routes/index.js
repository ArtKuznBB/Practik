const express = require('express');
const router = express.Router();
const service = require('../services');

router.get('/', service.handleRequest);

module.exports = router;
