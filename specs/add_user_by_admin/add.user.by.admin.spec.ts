import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {HubPage} from "../../pages/hub/HubPage";
import {MONITORING_SERVICE_COMPANY_2} from "../../utils/user_data";
import {USER_3} from "../../utils/user_data";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test.skip('Add user by admin', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf9"
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);
        const name: string = "Дмитро";
        const newUser: string = "Дмитро | snaut12@gmail.com";

        await loginPage.auth(MONITORING_SERVICE_COMPANY_2);
        await expect(page).toHaveURL('/panels');

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await hubPage.addUserButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addUserAddButton.click();

        expect(hubPage.findByText('User Дмитро created successfully')).toBeVisible();
        expect (hubPage.findByText(newUser)).toBeVisible();

        await page.waitForTimeout(5000);
        await hubPage.findByText(name).click();
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();

        expect(hubPage.findByText('User Дмитро deleted successfully')).toBeVisible;
        expect (hubPage.findByText(newUser)).not.toBeVisible();

    });

});