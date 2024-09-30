import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { USER_3 } from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test.skip('Delete account', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694f0xqb"
        });

        profilePage = new ProfilePage(page);
        const password: string = "Maximum99";

        await loginPage.auth(USER_3);
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL('/profile/panels');

        await profilePage.deleteButton.click();
        await profilePage.deletePasswordField.fill(password);
        await profilePage.deleteCheckbox.click();
        await profilePage.deleteFinalButton.click();

        await expect(profilePage.findByText('Your account has been successfully deleted')).toBeVisible();
        await expect(page).toHaveURL('/login')
    });

});