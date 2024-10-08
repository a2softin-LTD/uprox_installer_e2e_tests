import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1,USER_3 } from "../../utils/user_data";

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

    test('Add new user by autonomous installer', { tag: ['@smoke','@hub']  }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf8"
        });

        const name: string = "Дмитро";
        const newUser: string = "Дмитро | snaut12@gmail.com";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        await page.waitForTimeout(1000);
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click();
        if (await (page.getByText(name)).isVisible())
        {   await page.getByText(name).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}
        await page.waitForTimeout(1000);
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();
        await page.waitForTimeout(2000);

        await expect (page.getByText((name))).toBeVisible();

        await page.waitForTimeout(2000);
        await page.getByText(name).click();

        expect(page.getByText('Delete user'));

        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();
        await page.waitForTimeout(1000);

        await expect (page.getByText((newUser))).not.toBeVisible();
    });

});