import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { USER_1 } from "../../utils/user_data";
import {URL_LOGIN, URL_PROFILE_PANELS} from "../../utils/constants";

test.describe('Profile Page tests',{ tag: ['@smoke', '@stable']}, () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);
    });

    test('Logout', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/86946uqka"
        });

        await profilePage.logoutButton.click();

        await page.waitForTimeout(2000);

        await expect(page).toHaveURL(URL_LOGIN);
        await expect(loginPage.passwordField).toBeEmpty();
        await expect(loginPage.emailField).toBeEmpty();
    });
});