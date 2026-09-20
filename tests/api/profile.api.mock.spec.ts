import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.resolve(__dirname, '../../../playwright/.auth/user.json');

test.use({ storageState: authFile, });

test('intercept and modify profile response', async ({ page }) => {
    const modifiedResponse = {
        status: 'ok',
        data: {
            userId: 387873,
            photoFilename: 'default-user.png',
            name: 'John',
            lastName: 'Doe'
        }
    };

    await page.route('**/api/users/profile', async (route) => {
        await route.fulfill({
            status: 200,
            json: modifiedResponse
        });
    });

    await page.goto('/panel/profile');

    await expect(page.getByText('John Doe')).toBeVisible();
});