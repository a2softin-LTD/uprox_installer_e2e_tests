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


    test.skip('Transfer of ownership to new user', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694hvwe2"
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);
        const name: string = "Дмитро";
        const newOwner: string = "Дмитро | snaut12@gmail.com";

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
        await profilePage.panels.click();
        await profilePage.firstHub.click();
        await page.waitForTimeout(2000);

        await hubPage.users.click();
        await hubPage.users.click();
        await hubPage.addUserButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addUserAddButton.click();

        expect(hubPage.findByText('User Дмитро created successfully')).toBeVisible();

        await (hubPage.findByText(newOwner)).click();
        await hubPage.userMobileApp.click();
        await page.waitForTimeout(2000);
        //await hubPage.userMobileAppEnable.click();
        await hubPage.saveButton.click();

        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await page.waitForTimeout(2000);
        await hubPage.transferOwnershipButton.click();
        await page.waitForTimeout(2000);
        await hubPage.findByTextExact((newOwner)).click();
        await hubPage.submitButton.click();

        expect(hubPage.findByText('successfully')).toBeVisible();

    });

});