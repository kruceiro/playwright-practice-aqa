import { Locator, Page } from '@playwright/test';

export default class GaragePage {
    readonly addCarModal: Locator;

    constructor(private page: Page) {
        this.addCarModal = page.locator('.modal-content');
    }

    async openPage() {
        await this.page.goto('/panel/garage');
    }

    async clickAddCar() {
        await this.page.getByRole('button', { name: 'Add car' }).click();
    }
}