import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";
import { BUTTON_TRANSFER_OWNERSHIP, TITLE_UPDATE_FIRMWARE_VERSION } from "../../utils/constants";

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

    test('Login by user added from Home app', { tag: ['@smoke']  }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        const name: string = "Дмитро";

        await hubPage.panels.click();
        await hubPage.firstHub.click();

        await page.waitForTimeout(2000);

        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click();
        if (await (page.getByText(name)).isVisible()) {
            await page.getByText(name).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.userAllowMobileAppManagementFromHome.click();
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();}
        catch (error) {console.error(`An error occurred: ${error.message}`);
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.backButton.click();}
        finally {await expect(page.getByText(name)).toBeVisible();}

        await profilePage.logoutButton.click();
        await loginPage.openLoginPage('/');
        await loginPage.auth(USER_3);

        await expect(page).toHaveURL('/profile/panels');
    });
});