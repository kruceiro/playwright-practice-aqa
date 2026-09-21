import { test as base, expect } from '@playwright/test';
import path from 'path';
import GaragePage from '../pom/pages/GaragePage';

const authFile = path.resolve(__dirname, '../playwright/.auth/user.json');

type Fixtures = {
    userGaragePage: GaragePage;
};

export const test = base.extend<Fixtures>({
    userGaragePage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: authFile,
        });

        const page = await context.newPage();

        const garagePage = new GaragePage(page);

        await garagePage.openPage();

        await use(garagePage);

        await context.close();
    },
});

export { expect };