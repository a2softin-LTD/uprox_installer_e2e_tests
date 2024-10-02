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

    test('Enable mobile app and user management', { tag: '@smoke' }, async ({ page }) => {
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
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL('/profile/panels');

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click()
        if (await (page.getByText(name)).isVisible()) {
            await page.getByText(name).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();

        await expect(page.getByText('User Дмитро created successfully')).toBeVisible();

        await (page.getByText(user)).click();
        await hubPage.userMobileApp.click();
        await hubPage.enableButton.click();
        await hubPage.saveButton.click();


        await hubPage.userManagement.click();
        await hubPage.userManagementEnable.click();
        await hubPage.saveButton.click();
        await hubPage.users.click();

        await expect(page.getByText(user)).toBeVisible();
        await expect(page.getByText(userManagment)).toBeVisible();

        await page.waitForTimeout(2000);
        await page.getByText(name).click();
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();

        await page.waitForTimeout(2000);
        await expect (page.getByText((user))).not.toBeVisible();
    });

});