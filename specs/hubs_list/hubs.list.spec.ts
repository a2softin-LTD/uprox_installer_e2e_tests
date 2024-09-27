import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {HubPage} from "../../pages/hub/HubPage";
import {MIXED, USER_1} from "../../utils/user_data";


test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });


    test('Hubs list for user', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0fth"
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');

        await profilePage.panels.click();

        await page.waitForTimeout(2000);
        expect(hubPage.findByText('PIN@dev')).toBeVisible();
       // expect(hubPage.findByText('Untitled')).toBeVisible();
    });

    test('Hubs list for company', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0fth"
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.auth(MIXED);
        await expect(page).toHaveURL('/panels');

        await profilePage.panels.click();

        await page.waitForTimeout(2000);
        expect(hubPage.findByText('52')).toBeVisible();
        expect(hubPage.findByText('Alert')).toBeVisible();
        expect(hubPage.findByTextExact('Os-test')).toBeVisible();

    });

});