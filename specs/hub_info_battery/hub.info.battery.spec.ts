import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {TEXT_DEVICE_BATTERY_STATISTICS, TITLE_UPDATE_FIRMWARE_VERSION} from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);


        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL('/profile/panels');
    });

    test('Information about the hub battery state', { tag: ['@smoke', '@stable', '@hub']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etgm1"
        });

        await hubPage.panels.click();
        await hubPage.firstHub.click();
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await hubPage.hubBatteryDetailedIcon.click();

        await page.getByText(TEXT_DEVICE_BATTERY_STATISTICS).isVisible();
    });

});