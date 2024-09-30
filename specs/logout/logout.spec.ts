import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {USER_1} from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test('Logout', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/86946uqka"
        });
        profilePage = new ProfilePage(page);

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');

        await profilePage.logoutButton.click();
        await page.waitForTimeout(2000)

        await expect(page).toHaveURL('/login')
    });
});