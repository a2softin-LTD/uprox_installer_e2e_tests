import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {
    TEXT_CHANGES_SAVED_SUCCESSFULLY, TITLE_GROUPS, TITLE_SYSTEM,
    TITLE_UPDATE_FIRMWARE_VERSION, URL_LOGIN, URL_PROFILE_PANELS
} from "../../utils/constants";

test.describe('Hub Page tests',{ tag: ['@smoke', '@hub']}, () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(USER_1);
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);
    });

    test('Reboot hub', { tag: ['@smoke']  }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await hubPage.panels.click();
        await hubPage.firstHub.click();

        await expect(hubPage.pageTitle.filter({hasText:TITLE_SYSTEM})).toBeVisible();

        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await hubPage.hubRebootButton.click();
        await hubPage.hubRebootSubmitButton.click();

        await expect(page.getByText(TEXT_CHANGES_SAVED_SUCCESSFULLY)).toBeVisible();
    });

});