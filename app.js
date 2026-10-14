const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('SWE40006 Customer Service Ticket Portal');
});

module.exports = app;