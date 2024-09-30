import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import { USER_3 } from "../../utils/user_data";

test.describe('HubPage tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test('Enable mobile app and user management', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        const name: string = "Дмитро";
        const user: string = "Дмитро | snaut12@gmail.com";
        const userManagment: string = "| Дмитро | snaut12@gmail.com Mobile | User management";

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click()
        if (await (hubPage.findByText(name)).isVisible()) {
            await hubPage.findByText(name).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();

        await expect(hubPage.findByText('User Дмитро created successfully')).toBeVisible();

        await (hubPage.findByText(user)).click();
        await hubPage.userMobileApp.click();
        await hubPage.enableButton.click();
        await hubPage.saveButton.click();


        await hubPage.userManagement.click();
        await hubPage.userManagementEnable.click();
        await hubPage.saveButton.click();
        await hubPage.users.click();

        await expect(hubPage.findByText(user)).toBeVisible();
        await expect(hubPage.findByText(userManagment)).toBeVisible();

        await page.waitForTimeout(3000);
        await hubPage.findByText(name).click();
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();

        await page.waitForTimeout(2000);
        await expect (hubPage.findByText((user))).not.toBeVisible();
    });

});