const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './e2e',

    use: {
        baseURL: 'http://127.0.0.1:3000',
        headless: true
    },

    webServer: {
        command: 'npm start',
        url: 'http://127.0.0.1:3000/health',
        reuseExistingServer: true,
        timeout: 120000
    }
});