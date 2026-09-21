import { test, expect, } from '../fixtures/userGaragePage.fixture';

test('User can open Add car modal', async ({ userGaragePage }) => {
    await userGaragePage.clickAddCar();
    await expect(userGaragePage.addCarModal).toBeVisible();
});