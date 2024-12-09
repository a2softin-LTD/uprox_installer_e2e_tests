import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { URL_LOGIN, TITLE_DEALERS, ROLE_DEALER, URL_SUPPORT_SEARCH } from "../../utils/constants";
import {SuperAdminPage} from "../../pages/superAdmin/SuperAdminPage";

test.describe('Hub Page tests', { tag: ['@stable', '@hub']}, () => {

    let loginPage: LoginPage;
    let superAdminPage: SuperAdminPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        superAdminPage = new SuperAdminPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL(URL_SUPPORT_SEARCH);

        await superAdminPage.companies.click();
        await page.waitForLoadState('domcontentloaded');
        await superAdminPage.dealers.click();
    });
    test('Checking UI elements on the dealers page under SUPER_ADMIN role', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_DEALERS)})).toBeVisible();
        await expect(superAdminPage.addButton).toBeVisible();
    });

    test('Dealers list under SUPER_ADMIN role', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696ycpdd"
        });

        await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_DEALERS)})).toBeVisible();

        await page.waitForTimeout(2000);

        for (const dealer of await superAdminPage.entityBlock.all())
            await expect(dealer).toBeVisible();

        for (const dealer of await superAdminPage.entityBlock.all())
            await expect(dealer.filter({has: superAdminPage.entityText})).toBeVisible();

        for (const dealer of await superAdminPage.entityBlock.all())
        {   await expect(dealer.filter({hasText:ROLE_DEALER})).toBeVisible();
            await expect(dealer.filter({hasText:/.+@.+\..+/i})).toBeVisible();}
    });
});