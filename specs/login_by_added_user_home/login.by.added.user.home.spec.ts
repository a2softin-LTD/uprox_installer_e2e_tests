import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {HubPage} from "../../pages/hub/HubPage";
import {USER_1} from "../../utils/user_data";
import {USER_3} from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test('Login by user added from Home app', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);
        const name: string = "Дмитро";
        const newUser: string = "Дмитро | snaut12@gmail.com";

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        await page.waitForTimeout(2000);
        if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click();
        await hubPage.addUserButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await page.waitForTimeout(2000);
        await hubPage.userAllowMobileAppManagmentFromHome.click();
        await hubPage.addUserAddButton.click();

        expect(hubPage.findByText('User Дмитро created successfully')).toBeVisible();
        await page.waitForTimeout(3000);
        expect (hubPage.findByText((newUser))).toBeVisible();
        await page.waitForTimeout(3000);
        await profilePage.logoutButton.click();

        await page.waitForTimeout(3000);
        await loginPage.openLoginPage('dev');
        await loginPage.auth(USER_3);
        await expect(page).toHaveURL('/profile/panels');


    });

});