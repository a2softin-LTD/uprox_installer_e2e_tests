import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { ENGINEER,USER_3 } from "../../utils/user_data";
import { URL_LOGIN, URL_PROFILE_FEEDBACK, USER_NAME } from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(ENGINEER);
        await expect(page).toHaveURL(URL_PROFILE_FEEDBACK);
    });

    test.skip('Add new user by ENGINEER', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwfa"
        });

        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(USER_3['login']);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        await expect (page.getByText((USER_NAME))).toBeVisible();

        await page.waitForTimeout(2000);
        await page.getByText(USER_NAME).click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.deleteUserButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.submitButton.click();

        await expect (page.getByText((USER_NAME))).not.toBeVisible();
    });

});