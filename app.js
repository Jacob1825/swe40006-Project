const express = require('express');
const { getPool, sql } = require('./db');
const { isValidStatus } = require('./ticket-utils');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/tickets/new', (req, res) => {
    res.render('new-ticket');
});

app.get('/tickets', async (req, res) => {
    try {
        const pool = await getPool();

        const result = await pool.request().query(`
            SELECT id, customerName, issue, description, status
            FROM dbo.Tickets
            ORDER BY id DESC
        `);

        res.render('tickets', { tickets: result.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).send('Unable to load tickets');
    }
});

app.post('/tickets', async (req, res) => {
    try {
        const pool = await getPool();

        await pool.request()
            .input('customerName', sql.NVarChar(100), req.body.customerName)
            .input('issue', sql.NVarChar(200), req.body.issue)
            .input('description', sql.NVarChar(sql.MAX), req.body.description)
            .query(`
                INSERT INTO dbo.Tickets
                (customerName, issue, description, status)
                VALUES
                (@customerName, @issue, @description, 'Open')
            `);

        res.redirect('/tickets');
    } catch (error) {
        console.error(error);
        res.status(500).send('Unable to create ticket');
    }
});

app.get('/staff', async (req, res) => {
    try {
        const pool = await getPool();

        const result = await pool.request().query(`
            SELECT id, customerName, issue, description, status
            FROM dbo.Tickets
            ORDER BY id DESC
        `);

        res.render('staff', { tickets: result.recordset });
    } catch (error) {
        console.error(error);
        res.status(500).send('Unable to load staff tickets');
    }
});

app.post('/staff/tickets/:id', async (req, res) => {
    try {
        if (!isValidStatus(req.body.status)) {
            return res.status(400).send('Invalid ticket status');
        }

        const pool = await getPool();

        await pool.request()
            .input('id', sql.Int, Number(req.params.id))
            .input('status', sql.NVarChar(50), req.body.status)
            .query(`
                UPDATE dbo.Tickets
                SET status = @status
                WHERE id = @id
            `);

        res.redirect('/staff');
    } catch (error) {
        console.error(error);
        res.status(500).send('Unable to update ticket');
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

module.exports = app;