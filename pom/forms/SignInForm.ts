import { Locator, Page } from "@playwright/test";

export default class SignInForm {
    public readonly emailField: Locator;
    public readonly passwordField: Locator;
    public readonly loginButton: Locator;
    public readonly invalidCredentialsMessage: Locator;
    public readonly emptyEmailMessage: Locator;
    public readonly emptyPasswordMessage: Locator;
    public readonly invalidEmailMessage: Locator;

    constructor(page: Page) {
        this.emailField = page.getByLabel('Email');
        this.passwordField = page.getByLabel('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredentialsMessage = page.getByText('Wrong email or password');
        this.emptyEmailMessage = page.getByText('Email required');
        this.emptyPasswordMessage = page.getByText('Password required');
        this.invalidEmailMessage = page.getByText('Email is incorrect');
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async signIn(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}