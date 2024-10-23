import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { ENGINEER,USER_3 } from "../../utils/user_data";
import { USER_NAME } from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(ENGINEER);
        await expect(page).toHaveURL('/profile/feedback');
    });

    test.skip('Add new user by ENGINEER', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwfa"
        });

        await hubPage.panels.click();
        await hubPage.firstHub.click();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(USER_NAME);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();

        await expect (page.getByText((USER_NAME))).toBeVisible();

        await page.waitForTimeout(2000);
        await page.getByText(USER_NAME).click();
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();

        await expect (page.getByText((USER_NAME))).not.toBeVisible();
    });

});