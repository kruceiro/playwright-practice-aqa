import { Locator, Page } from '@playwright/test';

export default class HomePage {
    readonly signUpButton: Locator;

    constructor(page: Page) {
        this.signUpButton = page.locator('.btn-primary');
    };

    async clickSignUpButton() {
        await this.signUpButton.click();
    };
}