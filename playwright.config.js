const { defineConfig } = require('@playwright/test');

const baseURL =
    process.env.BASE_URL || 'http://127.0.0.1:3000';

module.exports = defineConfig({
    testDir: './e2e',
    timeout: 60000,

    use: {
        baseURL,
        headless: true
    },

    webServer: process.env.BASE_URL
        ? undefined
        : {
            command: 'npm start',
            url: 'http://127.0.0.1:3000/health',
            reuseExistingServer: true,
            timeout: 120000
        }
});