import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {HubPage} from "../../pages/hub/HubPage";
import {USER_1, USER_3} from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test.skip('Delete wireless device', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0hx1"
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
        await page.waitForTimeout(2000);
        await profilePage.secondHub.click();
        await page.waitForTimeout(2000);
        await hubPage.firstWirelessDevice.click();
        await hubPage.deleteNotExactButton.click();

        expect(hubPage.findByText('deleted successfully')).toBeVisible;

    });

});