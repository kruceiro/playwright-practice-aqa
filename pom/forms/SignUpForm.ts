import { Locator, Page } from '@playwright/test';

export default class SignUpForm {
    readonly registrationTitle: Locator;
    readonly nameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly confirmPasswordField: Locator;
    readonly registerButton: Locator;

    readonly nameRequiredError: Locator;
    readonly nameInvalidError: Locator;
    readonly nameLengthError: Locator;

    readonly lastNameRequiredError: Locator;
    readonly lastNameInvalidError: Locator;
    readonly lastNameLengthError: Locator;

    readonly emailRequiredError: Locator;
    readonly emailInvalidError: Locator;

    readonly passwordRequiredError: Locator;
    readonly passwordLengthError: Locator;

    readonly confirmPasswordRequiredError: Locator;
    readonly confirmPasswordMismatchError: Locator;

    constructor(page: Page) {
        this.registrationTitle = page.getByRole('heading', { name: 'Registration' });
        this.nameField = page.locator('#signupName');
        this.lastNameField = page.locator('#signupLastName');
        this.emailField = page.locator('#signupEmail');
        this.passwordField = page.locator('#signupPassword');
        this.confirmPasswordField = page.locator('#signupRepeatPassword');
        this.registerButton = page.getByRole('button', { name: 'Register' })
        this.nameRequiredError = page.getByText('Name is required');
        this.nameInvalidError = page.getByText('Name is invalid');
        this.nameLengthError = page.getByText(
            'Name has to be from 2 to 20 characters long');
        this.lastNameRequiredError = page.getByText('Last name is required');
        this.lastNameInvalidError = page.getByText('Last name is invalid');
        this.lastNameLengthError = page.getByText('Last name has to be from 2 to 20 characters long');
        this.emailRequiredError = page.getByText('Email required');
        this.emailInvalidError = page.getByText('Email is incorrect');
        this.passwordRequiredError = page.getByText('Password required');
        this.passwordLengthError = page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        this.confirmPasswordRequiredError = page.getByText('Re-enter password required');
        this.confirmPasswordMismatchError = page.getByText('Passwords do not match');
    };


    async enterName(name: string) {
        await this.nameField.fill(name);
    };

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    };

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    };

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    };

    async enterConfirmPassword(confirmPassword: string) {
        await this.confirmPasswordField.fill(confirmPassword);
    };

    async clickRegisterButton() {
        await this.registerButton.click();
    };

    async fillSignUpForm(name: string, lastName: string, email: string, password: string, confirmPassword: string) {
        await this.enterName(name);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
    };
}