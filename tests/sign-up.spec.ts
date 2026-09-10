import { test, expect } from '@playwright/test';

test.describe('Registration form', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign up' }).click();
    });
    test('TC001: Successful user registration', async ({ page }) => {
        const email = `autotest.user.${Date.now()}@example.com`;
        const registerButton = page.getByRole('button', { name: 'Register' });

        await expect(page.getByRole('heading', { name: 'Registration' })).toBeVisible();
        await page.locator('#signupName').fill('Test');
        await page.locator('#signupLastName').fill('User');
        await page.locator('#signupEmail').fill(email);
        await page.locator('#signupPassword').fill('Password1');
        await page.locator('#signupRepeatPassword').fill('Password1');
        await expect(registerButton).toBeEnabled();
        await registerButton.click();
        await expect(page).toHaveURL(/garage/);
    });

    // Fails
    test('TC002: Name is required', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.focus();
        await nameInput.blur();
        await expect(page.getByText('Name is required')).toBeVisible();
    });

    test('TC003: Name is invalid', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.fill('12345');
        await nameInput.blur();
        await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    test('TC004: Name is less than 2 characters', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.fill('T');
        await nameInput.blur();
        await expect(
            page.getByText('Name has to be from 2 to 20 characters long')
        ).toBeVisible();
    });

    test('TC005: Name is more than 20 characters', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.fill('TestTestTestTestTestTest');
        await nameInput.blur();
        await expect(
            page.getByText('Name has to be from 2 to 20 characters long')
        ).toBeVisible();
    });

    test('TC006: Error border color is red', async ({ page }) => {
        const nameInput = page.locator('#signupName');
        await nameInput.focus();
        await nameInput.blur();
        await expect(nameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Fails
    test('TC007: Name should trim leading and trailing spaces', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.fill('  Test  ');
        await nameInput.blur();
        await expect(nameInput).toHaveValue('Test');
    });

    test('TC008: Name with spaces only is invalid', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.fill('     ');
        await nameInput.blur();
        await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    test('TC009: Name with 2 characters is valid', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.fill('Te');
        await nameInput.blur();
        await expect(
            page.getByText('Name has to be from 2 to 20 characters long')
        ).not.toBeVisible();
    });

    test('TC010: Name with 20 characters is valid', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.fill('TestTestTestTestTest'); // 20
        await nameInput.blur();
        await expect(
            page.getByText('Name has to be from 2 to 20 characters long')
        ).not.toBeVisible();
    });

    test('TC011: Name with non-English characters is invalid', async ({ page }) => {
        const nameInput = page.locator('#signupName');

        await nameInput.fill('Тест');
        await nameInput.blur();
        await expect(page.getByText('Name is invalid')).toBeVisible();
    });

    // Fails
    test('TC012: Last name is required', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.focus();
        await lastNameInput.blur();
        await expect(page.getByText('Last name is required')).toBeVisible();
    });

    test('TC013: Last name is invalid', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('12345');
        await lastNameInput.blur();
        await expect(page.getByText('Last name is invalid')).toBeVisible();
    });

    test('TC014: Last name is less than 2 characters', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('U');
        await lastNameInput.blur();
        await expect(
            page.getByText('Last name has to be from 2 to 20 characters long')
        ).toBeVisible();
    });

    test('TC015: Last name is more than 20 characters', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('UserUserUserUserUserUser');
        await lastNameInput.blur();
        await expect(
            page.getByText('Last name has to be from 2 to 20 characters long')
        ).toBeVisible();
    });

    test('TC016: Last name with spaces only is invalid', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('     ');
        await lastNameInput.blur();
        await expect(page.getByText('Last name is invalid')).toBeVisible();
    });

    test('TC017: Last name with 2 characters is valid', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('Us');
        await lastNameInput.blur();
        await expect(
            page.getByText('Last name has to be from 2 to 20 characters long')
        ).not.toBeVisible();
    });

    test('TC018: Last name with 20 characters is valid', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('UserUserUserUserUser'); // 20
        await lastNameInput.blur();
        await expect(
            page.getByText('Last name has to be from 2 to 20 characters long')
        ).not.toBeVisible();
    });

    test('TC019: Last name with non-English characters is invalid', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('Користувач');
        await lastNameInput.blur();
        await expect(page.getByText('Last name is invalid')).toBeVisible();
    });

    test('TC020: Error border color is red for last name', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');
        await lastNameInput.focus();
        await lastNameInput.blur();
        await expect(lastNameInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Fails
    test('TC021: Last name should trim leading and trailing spaces', async ({ page }) => {
        const lastNameInput = page.locator('#signupLastName');

        await lastNameInput.fill('  User  ');
        await lastNameInput.blur();
        await expect(lastNameInput).toHaveValue('User');
    });

    test('TC022: Email is required', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.focus();
        await emailInput.blur();
        await expect(page.getByText('Email required')).toBeVisible();
    });

    test('TC023: Email is invalid', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('invalid-email');
        await emailInput.blur();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
    });

    test('TC024: Border color is red for invalid email', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('invalid-email');
        await emailInput.blur();
        await expect(emailInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TC025: Valid email format', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('test.user@example.com');
        await emailInput.blur();
        await expect(page.getByText('Email is incorrect')).not.toBeVisible();
    });

    test('TC026: Email without domain is invalid', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('test.user@');
        await emailInput.blur();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
    });

    test('TC027: Email without @ is invalid', async ({ page }) => {
        const emailInput = page.locator('#signupEmail');

        await emailInput.fill('test.userexample.com');
        await emailInput.blur();
        await expect(page.getByText('Email is incorrect')).toBeVisible();
    });

    test('TC028: Password is required', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.focus();
        await passwordInput.blur();
        await expect(page.getByText('Password required')).toBeVisible();
    });

    test('TC029: Password is less than 8 characters', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('Pass1');
        await passwordInput.blur();
        await expect(
            page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        ).toBeVisible();
    });

    test('TC030: Password is more than 15 characters', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('Password123456789012345');
        await passwordInput.blur();
        await expect(
            page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        ).toBeVisible();
    });

    test('TC031: Password without capital letter is invalid', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('password1');
        await passwordInput.blur();
        await expect(
            page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        ).toBeVisible();
    });

    test('TC032: Password without small letter is invalid', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('PASSWORD1');
        await passwordInput.blur();
        await expect(
            page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        ).toBeVisible();
    });

    test('TC033: Password without number is invalid', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('Password');
        await passwordInput.blur();
        await expect(
            page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        ).toBeVisible();
    });

    test('TC034: Password with valid format', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('Password1');
        await passwordInput.blur();
        await expect(
            page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
        ).not.toBeVisible();
    });

    test('TC035: Border color is red for invalid password', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');

        await passwordInput.fill('pass');
        await passwordInput.blur();
        await expect(passwordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TC036: Repeat password is required', async ({ page }) => {
        const repeatPasswordInput = page.locator('#signupRepeatPassword');

        await repeatPasswordInput.focus();
        await repeatPasswordInput.blur();
        await expect(page.getByText('Re-enter password required')).toBeVisible();
    });

    test('TC037: Repeat password does not match', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');
        const repeatPasswordInput = page.locator('#signupRepeatPassword');

        await passwordInput.fill('Password1');
        await repeatPasswordInput.fill('Password2');
        await repeatPasswordInput.blur();
        await expect(page.getByText('Passwords do not match')).toBeVisible();
    });

    test('TC038: Repeat password matches', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');
        const repeatPasswordInput = page.locator('#signupRepeatPassword');

        await passwordInput.fill('Password1');
        await repeatPasswordInput.fill('Password1');
        await repeatPasswordInput.blur();
        await expect(page.getByText('Passwords do not match')).not.toBeVisible();
    });

    test('TC039: Border color is red for non-matching repeat password', async ({ page }) => {
        const passwordInput = page.locator('#signupPassword');
        const repeatPasswordInput = page.locator('#signupRepeatPassword');

        await passwordInput.fill('Password1');
        await repeatPasswordInput.fill('Password2');
        await repeatPasswordInput.blur();
        await expect(repeatPasswordInput).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TC040: Register button is disabled when registration form is invalid', async ({ page }) => {
        const registerButton = page.getByRole('button', { name: 'Register' });

        await page.locator('#signupName').fill('T');
        await expect(registerButton).toBeDisabled();
    });
});