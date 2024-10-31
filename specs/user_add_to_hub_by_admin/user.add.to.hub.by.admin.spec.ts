import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { MONITORING_SERVICE_COMPANY_3, USER_3 } from "../../utils/user_data";
import {
    USER_NAME,
    TEXT_NUMBER_OF_DEVICES_IM_COMPANY,
    TITLE_SYSTEM,
    TITLE_USERS, URL_LOGIN, URL_PANELS
} from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(MONITORING_SERVICE_COMPANY_3);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test.skip('Add new user by ADMIN', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf9"
        });

        await hubPage.panels.click();

        await expect(hubPage.pageTitle.filter({hasText:TEXT_NUMBER_OF_DEVICES_IM_COMPANY})).toBeVisible();

        await hubPage.entityBlock.first().click();

        await expect(hubPage.pageTitle.filter({hasText:TITLE_SYSTEM})).toBeVisible();

        await hubPage.users.click();

        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();

        await hubPage.addButton.click();
        await hubPage.addUserName.fill(USER_NAME);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();

        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
        await expect (page.getByText(USER_NAME)).toBeVisible();

        await page.waitForTimeout(1000);
        await page.getByText(USER_NAME).click();
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();

        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
        await expect(page.getByText(USER_NAME)).not.toBeVisible();
    });

});