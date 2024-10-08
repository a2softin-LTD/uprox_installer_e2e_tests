import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";

test.describe('Hub Page tests', () => {

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

    test('Hub air alarm setting', { tag: ['@smoke','@hub'] }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        const region: string = "Дніпропетровська область";
        const district: string = "Дніпровський район";
        const community: string = "Любимівська територіальна громада";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        await page.waitForTimeout(2000);
        if (await page.getByText('Update firmware version').isVisible())
        {   await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await hubPage.settingsAirAlarm.click();
        await hubPage.onButton.click();
        await page.getByText('Select region').click();
        await page.getByText((region)).click();
        await page.getByText('Select district').click();
        await page.getByText((district)).click();
        await page.getByText('Select community').click();
        await page.getByText((community)).click();
        await hubPage.saveButton.click();
        await hubPage.settingsAirAlarm.click();
        await hubPage.offButton.click();
        await hubPage.saveButton.click();

        await expect(page.getByText('Turn off')).toBeVisible();
    });

});