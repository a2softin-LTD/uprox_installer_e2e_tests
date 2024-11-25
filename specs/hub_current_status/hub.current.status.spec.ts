import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import { TITLE_UPDATE_FIRMWARE_VERSION, URL_LOGIN, URL_PROFILE_PANELS } from "../../utils/constants";

test.describe('Hub Page tests', { tag: ['@smoke', '@hub']},() => {

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

    test('Display of hub current status ', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await hubPage.panels.click();
        await hubPage.firstHub.click();
        await page.waitForTimeout(3000);

        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
            await hubPage.closeWindowButton.click();}

        await expect((hubPage.hubPowerNormalIcon).or(hubPage.hubPowerTroubleIcon)).toBeVisible();
        await expect((hubPage.hubTamperOpenIcon).or(hubPage.hubTamperCloseIcon)).toBeVisible();
        await expect(hubPage.hubBatteryIcon).toBeVisible();
        await expect((hubPage.hubEthernetDefaultIcon).or(hubPage.hubEthernetTroubleIcon)).toBeVisible();
        await expect((hubPage.hubWifiMaxIcon).or(hubPage.hubWifiGoodIcon).or(hubPage.hubWifiNormalIcon).or(hubPage.hubWifiLowIcon)).toBeVisible();
        await expect((hubPage.hubGsmMaxIcon).or(hubPage.hubGsmGoodIcon).or(hubPage.hubGsmNormalIcon).or(hubPage.hubGsmLowIcon).or(hubPage.hubSimCardNoneIcon).or(hubPage.hubSimCardDefaultIcon)).toBeVisible();
    });

});