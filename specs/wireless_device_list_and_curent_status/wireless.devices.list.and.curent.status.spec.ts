import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { USER_1 } from "../../utils/user_data";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login')
    });

    test.skip('Wireless devices: current status', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678t0fu2"
        });

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
        await page.waitForTimeout(2000);
        await profilePage.secondHub.click();
        await page.waitForTimeout(2000);
    });
});