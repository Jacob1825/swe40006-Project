const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('SWE40006 Customer Service Ticket Portal');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = app;