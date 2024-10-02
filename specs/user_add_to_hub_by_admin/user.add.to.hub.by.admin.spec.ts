import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { MONITORING_SERVICE_COMPANY_2, USER_3 } from "../../utils/user_data";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test.skip('Add new user by admin', { tag: '@smoke' }, async ({ page }) => {
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
        await page.waitForTimeout(1000);
        await hubPage.users.click();
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();

        await expect (page.getByText(newUser)).toBeVisible();

        await page.waitForTimeout(1000);
        await page.getByText(name).click();
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();

        await expect(page.getByText(newUser)).not.toBeVisible();
    });

});