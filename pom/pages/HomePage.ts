import { Locator, Page } from '@playwright/test';

export default class HomePage {
    readonly page: Page;
    readonly signUpButton: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signUpButton = page.locator('.btn-primary');
        this.signInButton = page.locator('.header_signin');
    };

    async openPage() {
        await this.page.goto('/');
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    };

    async openSignInForm() {
        await this.signInButton.click();
    }
}