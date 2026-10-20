const request = require('supertest');
const app = require('../app');

describe('Ticket page integration tests', () => {

    test('GET / loads the customer portal homepage', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Customer Service Ticket Portal');
    });

    test('GET /tickets/new loads the create ticket form', async () => {
        const response = await request(app).get('/tickets/new');

        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Create Support Ticket');
        expect(response.text).toContain('Submit Ticket');
    });

});