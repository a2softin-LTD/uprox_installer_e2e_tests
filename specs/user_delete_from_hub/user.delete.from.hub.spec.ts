import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage} from "../../pages/hub/HubPage";
import { USER_1,USER_3 } from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL('/profile/panels');
    });

    test('Delete user', { tag: ['@smoke','@hub']  }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694hvwdg"
        });

        const name: string = "01 | Дмитро ";
        const newUser: string = "Дмитро | snaut12@gmail.com";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        if (await (page.getByText(name)).isVisible()) {
            await page.getByText(name).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();
        await page.waitForTimeout(5000);

        await expect(page.getByText(newUser)).toBeVisible();

        await page.getByText(newUser).click();
        await page.waitForTimeout(2000);
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();

        await expect(page.getByText((newUser))).not.toBeVisible();
    });

});