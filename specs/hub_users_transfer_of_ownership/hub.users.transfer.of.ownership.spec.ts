import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";
import {
    TEXT_CHANGES_SAVED_SUCCESSFULLY,
    TITLE_UPDATE_FIRMWARE_VERSION,
    URL_LOGIN, URL_PROFILE_PANELS,
    USER_NAME
} from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);
    });

    test.skip('Transfer of ownership to new user', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694hvwe2"
        });

        await hubPage.panels.click();
        await hubPage.firstHub.click();
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await hubPage.users.click();
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(USER_NAME);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();
        await (page.getByText(USER_NAME)).click();
        await hubPage.settingsMobileApp.click();
        await page.waitForTimeout(2000);
        await hubPage.enableButton.click();
        await hubPage.saveButton.click();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await page.waitForTimeout(2000);
        await hubPage.transferOwnershipButton.click();
        await page.waitForTimeout(2000);
        await page.getByText((USER_NAME)).click();
        await hubPage.submitButton.click();

        await expect(page.getByText(TEXT_CHANGES_SAVED_SUCCESSFULLY)).toBeVisible();
    });

});