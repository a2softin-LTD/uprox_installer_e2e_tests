import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import { BUTTON_RESTART_PANEL, TEXT_DEVICE_BATTERY_STATISTICS, TITLE_UPDATE_FIRMWARE_VERSION, URL_LOGIN, URL_PROFILE_PANELS } from "../../utils/constants";

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

    test('Information about the hub battery state', { tag: ['@smoke', '@stable', '@hub']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etgm1"
        });

        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForTimeout(5000);

        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
           { await hubPage.closeWindowButton.click()}

        await hubPage.hubPanel.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await hubPage.hubBatteryDetailedIcon.click();

        await expect(page.getByText(TEXT_DEVICE_BATTERY_STATISTICS)).toBeVisible();
    });

});