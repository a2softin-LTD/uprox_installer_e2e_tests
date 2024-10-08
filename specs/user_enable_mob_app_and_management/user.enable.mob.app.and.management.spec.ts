import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";

test.describe('HubPage tests', () => {

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

    test('User enable mobile app and management', { tag: ['@smoke','@hub']  }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        const name: string = "Дмитро";
        const user: string = "Дмитро | snaut12@gmail.com";
        const userManagement: string = "| Дмитро | snaut12@gmail.com Mobile | User management";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click()
        if (await (page.getByText(name)).isVisible()) {
            await page.getByText(name).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();

        await (page.getByText(user)).click();
        await hubPage.userMobileApp.click();
        await hubPage.enableButton.click();
        await hubPage.saveButton.click();
        await hubPage.userManagement.click();
        await hubPage.userManagementEnable.click();
        await hubPage.saveButton.click();
        await hubPage.users.click();

        await expect(page.getByText(user)).toBeVisible();
        await expect(page.getByText(userManagement)).toBeVisible();

        await page.getByText(name).click();
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();

        await expect (page.getByText((user))).not.toBeVisible();
    });

});