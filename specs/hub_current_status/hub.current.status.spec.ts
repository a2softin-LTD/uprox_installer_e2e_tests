import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
    });

    test('Display of hub current status ', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678t0fxq"
        });

        await profilePage.panels.click();
        await profilePage.firstHub.click();

        if (await page.getByText('Update firmware version').isVisible()) {
            await hubPage.closeWindowButton.click();
        }

        await expect((hubPage.hubPowerNormalIcon).or(hubPage.hubPowerTroubleIcon)).toBeVisible();
        await expect((hubPage.hubTamperOpenIcon).or(hubPage.hubTamperCloseIcon)).toBeVisible();
        await expect(hubPage.hubBatteryIcon).toBeVisible();
        await expect((hubPage.hubEthernetDefaultIcon).or(hubPage.hubEthernetTroubleIcon)).toBeVisible();
        await expect((hubPage.hubWifiMaxIcon).or(hubPage.hubWifiGoodIcon).or(hubPage.hubWifiNormalIcon).or(hubPage.hubWifiLowIcon)).toBeVisible();
        await expect((hubPage.hubGsmMaxIcon).or(hubPage.hubGsmGoodIcon).or(hubPage.hubGsmNormalIcon).or(hubPage.hubGsmLowIcon).or(hubPage.hubSimCardNoneIcon).or(hubPage.hubSimCardDefaultIcon)).toBeVisible();
    });

});