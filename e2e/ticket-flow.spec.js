const { test, expect } = require('@playwright/test');

test('customer creates a ticket and staff resolves it', async ({ page }) => {
    const uniqueIssue = `E2E Test ${Date.now()}`;

    // Customer creates a ticket
    await page.goto('/tickets/new');

    await page.locator('input[name="customerName"]').fill('E2E Test User');
    await page.locator('input[name="issue"]').fill(uniqueIssue);
    await page.locator('textarea[name="description"]').fill(
        'Automated end-to-end acceptance test'
    );

    await page.getByRole('button', { name: 'Submit Ticket' }).click();

    // Check ticket was created
    await expect(page).toHaveURL(/\/tickets$/);
    await expect(page.getByText(uniqueIssue)).toBeVisible();

    await expect(
        page.locator('p').filter({ hasText: 'Status:' }).first()
    ).toContainText('Open');

    // Staff updates the newest ticket
    await page.goto('/staff');

    await expect(page.getByText(uniqueIssue)).toBeVisible();

    await page
        .locator('select[name="status"]')
        .first()
        .selectOption('Resolved');

    await page
        .getByRole('button', { name: 'Update' })
        .first()
        .click();

    // Check staff page shows Resolved
    await expect(
        page.locator('p').filter({ hasText: 'Status:' }).first()
    ).toContainText('Resolved');

    // Customer sees the updated status
    await page.goto('/tickets');

    await expect(page.getByText(uniqueIssue)).toBeVisible();

    await expect(
        page.locator('p').filter({ hasText: 'Status:' }).first()
    ).toContainText('Resolved');
});