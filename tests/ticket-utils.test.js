const { isValidStatus } = require('../ticket-utils');

describe('Ticket status validation', () => {
    test('accepts a valid ticket status', () => {
        expect(isValidStatus('Open')).toBe(true);
    });

    test('rejects an invalid ticket status', () => {
        expect(isValidStatus('Closed Forever')).toBe(false);
    });
});