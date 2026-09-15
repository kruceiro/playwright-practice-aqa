import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignUpForm from '../pom/forms/SignUpForm';

test.describe('Registration form', () => {
    let homePage: HomePage;
    let signUpForm: SignUpForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        await page.goto('/');
        await homePage.clickSignUpButton();
    });

    test('TC001: Successful user registration', async ({ page }) => {
        const email = `autotest.user.${Date.now()}@example.com`;

        await expect(signUpForm.registrationTitle).toBeVisible();
        await signUpForm.fillSignUpForm('Test', 'User', email, 'Password1', 'Password1');
        await expect(signUpForm.registerButton).toBeEnabled();
        await signUpForm.clickRegisterButton();
        await expect(page).toHaveURL(/garage/);
    });

    // Fails
    test('TC002: Name is required', async () => {
        await signUpForm.nameField.focus();
        await signUpForm.nameField.blur();
        await expect(signUpForm.nameRequiredError).toBeVisible();
    });

    test('TC003: Name is invalid', async () => {
        await signUpForm.enterName('12345');
        await signUpForm.nameField.blur();
        await expect(signUpForm.nameInvalidError).toBeVisible();
    });

    test('TC004: Name is less than 2 characters', async () => {
        await signUpForm.enterName('T');
        await signUpForm.nameField.blur();
        await expect(signUpForm.nameLengthError).toBeVisible();
    });

    test('TC005: Name is more than 20 characters', async () => {
        await signUpForm.enterName('TestTestTestTestTestTest');
        await signUpForm.nameField.blur();
        await expect(
            signUpForm.nameLengthError
        ).toBeVisible();
    });

    test('TC006: Error border color is red', async () => {
        await signUpForm.nameField.focus();
        await signUpForm.nameField.blur();
        await expect(signUpForm.nameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Fails
    test('TC007: Name should trim leading and trailing spaces', async () => {
        await signUpForm.enterName('  Test  ');
        await signUpForm.nameField.blur();
        await expect(signUpForm.nameField).toHaveValue('Test');
    });

    test('TC008: Name with spaces only is invalid', async () => {
        await signUpForm.enterName('     ');
        await signUpForm.nameField.blur();
        await expect(signUpForm.nameInvalidError).toBeVisible();
    });

    test('TC009: Name with 2 characters is valid', async () => {
        await signUpForm.enterName('Te');
        await signUpForm.nameField.blur();
        await expect(signUpForm.nameLengthError).not.toBeVisible();
    });

    test('TC010: Name with 20 characters is valid', async () => {
        await signUpForm.enterName('TestTestTestTestTest'); // 20
        await signUpForm.nameField.blur();
        await expect(signUpForm.nameLengthError).not.toBeVisible();
    });

    test('TC011: Name with non-English characters is invalid', async () => {
        await signUpForm.enterName('Тест');
        await signUpForm.nameField.blur();
        await expect(signUpForm.nameInvalidError).toBeVisible();
    });

    // Fails
    test('TC012: Last name is required', async () => {
        await signUpForm.lastNameField.focus();
        await signUpForm.lastNameField.blur();
        await expect(signUpForm.lastNameRequiredError).toBeVisible();
    });

    test('TC013: Last name is invalid', async () => {
        await signUpForm.enterLastName('12345');
        await signUpForm.lastNameField.blur();
        await expect(signUpForm.lastNameInvalidError).toBeVisible();
    });

    test('TC014: Last name is less than 2 characters', async () => {
        await signUpForm.enterLastName('U');
        await signUpForm.lastNameField.blur();
        await expect(signUpForm.lastNameLengthError).toBeVisible();
    });

    test('TC015: Last name is more than 20 characters', async () => {
        await signUpForm.enterLastName('UserUserUserUserUserUserUserUserUserUser');
        await signUpForm.lastNameField.blur();
        await expect(signUpForm.lastNameLengthError).toBeVisible();
    });

    test('TC016: Last name with spaces only is invalid', async () => {
        await signUpForm.enterLastName('     ');
        await signUpForm.lastNameField.blur();
        await expect(signUpForm.lastNameInvalidError).toBeVisible();
    });

    test('TC017: Last name with 2 characters is valid', async () => {
        await signUpForm.enterLastName('Us');
        await signUpForm.lastNameField.blur();
        await expect(signUpForm.lastNameLengthError).not.toBeVisible();
    });

    test('TC018: Last name with 20 characters is valid', async () => {
        await signUpForm.enterLastName('UserUserUserUserUser'); // 20
        await signUpForm.lastNameField.blur();
        await expect(signUpForm.lastNameLengthError).not.toBeVisible();
    });

    test('TC019: Last name with non-English characters is invalid', async () => {
        await signUpForm.enterLastName('Юзер');
        await signUpForm.lastNameField.blur();
        await expect(signUpForm.lastNameInvalidError).toBeVisible();
    });

    test('TC020: Error border color is red for last name', async () => {
        await signUpForm.lastNameField.focus();
        await signUpForm.lastNameField.blur();
        await expect(signUpForm.lastNameField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    // Fails
    test('TC021: Last name should trim leading and trailing spaces', async () => {
        await signUpForm.enterLastName('  User  ');
        await signUpForm.lastNameField.blur();
        await expect(signUpForm.lastNameField).toHaveValue('User');
    });

    test('TC022: Email is required', async () => {
        await signUpForm.emailField.focus();
        await signUpForm.emailField.blur();
        await expect(signUpForm.emailRequiredError).toBeVisible();
    });

    test('TC023: Email is invalid', async () => {
        await signUpForm.emailField.fill('invalid-email');
        await signUpForm.emailField.blur();
        await expect(signUpForm.emailInvalidError).toBeVisible();
    });

    test('TC024: Border color is red for invalid email', async () => {
        await signUpForm.emailField.fill('invalid-email');
        await signUpForm.emailField.blur();
        await expect(signUpForm.emailField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TC025: Valid email format', async () => {
        await signUpForm.emailField.fill('test.user@example.com');
        await signUpForm.emailField.blur();
        await expect(signUpForm.emailInvalidError).not.toBeVisible();
    });

    test('TC026: Email without domain is invalid', async () => {
        await signUpForm.emailField.fill('test.user@');
        await signUpForm.emailField.blur();
        await expect(signUpForm.emailInvalidError).toBeVisible();
    });

    test('TC027: Email without @ is invalid', async () => {
        await signUpForm.emailField.fill('test.userexample.com');
        await signUpForm.emailField.blur();
        await expect(signUpForm.emailInvalidError).toBeVisible();
    });

    test('TC028: Password is required', async () => {
        await signUpForm.passwordField.focus();
        await signUpForm.passwordField.blur();
        await expect(signUpForm.passwordRequiredError).toBeVisible();
    });

    test('TC029: Password is less than 8 characters', async () => {
        await signUpForm.passwordField.fill('Pass1');
        await signUpForm.passwordField.blur();
        await expect(
            signUpForm.passwordLengthError
        ).toBeVisible();
    });

    test('TC030: Password is more than 15 characters', async () => {
        await signUpForm.passwordField.fill('Password123456789');
        await signUpForm.passwordField.blur();
        await expect(signUpForm.passwordLengthError).toBeVisible();
    });

    test('TC031: Password without capital letter is invalid', async () => {
        await signUpForm.passwordField.fill('password1');
        await signUpForm.passwordField.blur();
        await expect(signUpForm.passwordLengthError).toBeVisible();
    });

    test('TC032: Password without small letter is invalid', async () => {
        await signUpForm.passwordField.fill('PASSWORD1');
        await signUpForm.passwordField.blur();
        await expect(signUpForm.passwordLengthError).toBeVisible();
    });

    test('TC033: Password without number is invalid', async () => {
        await signUpForm.passwordField.fill('Password');
        await signUpForm.passwordField.blur();
        await expect(signUpForm.passwordLengthError).toBeVisible();
    });

    test('TC034: Password with valid format', async () => {
        await signUpForm.passwordField.fill('Password1');
        await signUpForm.passwordField.blur();
        await expect(signUpForm.passwordLengthError).not.toBeVisible();
    });

    test('TC035: Border color is red for invalid password', async () => {
        await signUpForm.passwordField.fill('pass');
        await signUpForm.passwordField.blur();
        await expect(signUpForm.passwordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TC036: Repeat password is required', async () => {
        await signUpForm.confirmPasswordField.focus();
        await signUpForm.confirmPasswordField.blur();
        await expect(signUpForm.confirmPasswordRequiredError).toBeVisible();
    });

    test('TC037: Repeat password does not match', async () => {
        await signUpForm.passwordField.fill('Password1');
        await signUpForm.confirmPasswordField.fill('Password2');
        await signUpForm.confirmPasswordField.blur();
        await expect(signUpForm.confirmPasswordMismatchError).toBeVisible();
    });

    test('TC038: Repeat password matches', async () => {
        await signUpForm.passwordField.fill('Password1');
        await signUpForm.confirmPasswordField.fill('Password1');
        await signUpForm.confirmPasswordField.blur();
        await expect(signUpForm.confirmPasswordMismatchError).not.toBeVisible();
    });

    test('TC039: Border color is red for non-matching repeat password', async () => {
        await signUpForm.passwordField.fill('Password1');
        await signUpForm.confirmPasswordField.fill('Password2');
        await signUpForm.confirmPasswordField.blur();
        await expect(signUpForm.confirmPasswordField).toHaveCSS('border-color', 'rgb(220, 53, 69)');
    });

    test('TC040: Register button is disabled when registration form is invalid', async () => {
        await signUpForm.fillSignUpForm('Test', 'User', 'invalid-email', 'Password1', 'Password2');
        await expect(signUpForm.registerButton).toBeDisabled();
    });
});