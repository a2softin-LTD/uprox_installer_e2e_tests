import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";

test.describe('Profile Page tests', () => {

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

    test.skip('Transfer of ownership to new user', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694hvwe2"
        });

        const name: string = "Дмитро";
        const newOwner: string = "Дмитро | snaut12@gmail.com";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await hubPage.users.click();
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();
        await (page.getByText(newOwner)).click();
        await hubPage.userMobileApp.click();
        await page.waitForTimeout(2000);
        await hubPage.userManagementEnable.click();
        await hubPage.saveButton.click();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await page.waitForTimeout(2000);
        await hubPage.transferOwnershipButton.click();
        await page.waitForTimeout(2000);
        await page.getByText((newOwner)).click();
        await hubPage.submitButton.click();

        await expect(page.getByText('successfully')).toBeVisible();
    });

});