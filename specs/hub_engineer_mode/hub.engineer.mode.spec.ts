import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {HubPage} from "../../pages/hub/HubPage";
import {USER_1} from "../../utils/user_data";


test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

    });

    test('Engineer mode ', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/86946gkfb"
        });


        await profilePage.panels.click();
        await profilePage.firstHub.click();
        await page.waitForTimeout(2000);
        if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
        await hubPage.hubEngineerModeSwitch.click();

        expect(hubPage.findByText('Changes saved successfully')).toBeVisible();
        expect(hubPage.findByText('Engineer mode seconds left:')).toBeVisible();

        await page.waitForTimeout(2000);
        await hubPage.hubEngineerModeSwitch.click();
        expect(hubPage.findByText('Changes saved successfully')).toBeVisible();
        expect(hubPage.findByText('Engineer mode seconds left:')).not.toBeVisible();


        await hubPage.wirelessDeviceAddButton.click();
        await page.waitForTimeout(2000);
        await hubPage.backButton.click();

        expect(hubPage.findByText('Engineer mode seconds left:')).toBeVisible();
        await page.waitForTimeout(2000);
        await hubPage.hubEngineerModeSwitch.click();
     //   expect(hubPage.findByText('Changes saved successfully')).toBeVisible();
        expect(hubPage.findByText('Engineer mode seconds left:')).not.toBeVisible();


    });
});