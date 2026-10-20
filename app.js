const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let tickets = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/tickets/new', (req, res) => {
    res.render('new-ticket');
});

app.get('/tickets', (req, res) => {
    res.render('tickets', { tickets });
});

app.post('/tickets', (req, res) => {
    const newTicket = {
        id: nextId++,
        customerName: req.body.customerName,
        issue: req.body.issue,
        description: req.body.description,
        status: 'Open'
    };

    tickets.push(newTicket);

    res.redirect('/tickets');
});

app.get('/staff', (req, res) => {
    res.render('staff', { tickets });
});

app.post('/staff/tickets/:id', (req, res) => {
    const ticketId = Number(req.params.id);

    const ticket = tickets.find(ticket => ticket.id === ticketId);

    if (ticket) {
        ticket.status = req.body.status;
    }

    res.redirect('/staff');
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = app;