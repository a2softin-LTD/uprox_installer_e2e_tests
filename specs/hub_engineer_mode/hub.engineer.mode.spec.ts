import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import { TEXT_ENGINEER_MODE_SECONDS_LEFT, TITLE_UPDATE_FIRMWARE_VERSION, URL_LOGIN, URL_PROFILE_PANELS } from "../../utils/constants";

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

    test('Engineer mode', { tag: ['@smoke', '@hub', '@stable']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/86967gd6a"
        });

        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForTimeout(5000);

        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}

        await hubPage.hubEngineerModeSwitch.click();
        await page.waitForTimeout(2000);

        await expect(page.getByText(TEXT_ENGINEER_MODE_SECONDS_LEFT)).toBeVisible();

        await page.waitForTimeout(2000);
        await hubPage.hubEngineerModeSwitch.click();
        await page.waitForTimeout(2000);

        await expect(page.getByText(TEXT_ENGINEER_MODE_SECONDS_LEFT)).not.toBeVisible();

        await hubPage.wirelessDeviceAddButton.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        await hubPage.backButton.click();
        await page.waitForTimeout(2000);

        await expect(page.getByText(TEXT_ENGINEER_MODE_SECONDS_LEFT)).toBeVisible();

        await page.waitForTimeout(2000);
        await hubPage.hubEngineerModeSwitch.click();
        await page.waitForTimeout(2000);

        await expect(page.getByText(TEXT_ENGINEER_MODE_SECONDS_LEFT)).not.toBeVisible();
    });

});