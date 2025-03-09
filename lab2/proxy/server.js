require('dotenv').config();
const express = require('express');
const axios = require('axios');
const config = require('./config');

const app = express();
const port = config.get('proxyPort');
const apiUrl = config.get('apiUrl');

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(apiUrl);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from API');
    }
});

app.listen(port, () => {
    console.log(`Proxy server is listening on port ${port}`);
});
