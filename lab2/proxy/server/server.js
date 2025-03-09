require('dotenv').config();
const express = require('express');
const config = require('./config');
const router = require('./routes');

const app = express();
const port = config.get('proxyPort');

app.use('/', router);

app.listen(port, () => {
    console.log(`Proxy server is listening on port ${port}`);
});
