require('dotenv').config();
const express = require('express');
const app = express();

const responseText = process.env.RESPONSE_TEXT || 'Hello World';

app.get('/', (req, res) => {
    res.send(responseText);
});

module.exports = app;
