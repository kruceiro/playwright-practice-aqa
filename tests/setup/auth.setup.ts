import { test as setup, expect } from '@playwright/test';
import SignInForm from '../../pom/forms/SignInForm';
import HomePage from '../../pom/pages/HomePage';

const authFile = 'playwright/.auth/user.json';

setup('login user', async ({ page }) => {
    const homePage = new HomePage(page);
    const signInForm = new SignInForm(page);

    await homePage.openPage();
    await homePage.openSignInForm();

    await signInForm.signIn(
        process.env.USER_EMAIL!,
        process.env.USER_PASSWORD!
    );

    await expect(page).toHaveURL(/garage/);

    await page.context().storageState({
        path: authFile,
    });
});