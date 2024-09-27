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

    test('Hub air alarm setting', async ({ page }) => {
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
        if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await page.waitForTimeout(2000);
        await hubPage.settingsAirAlarm.click();
        await hubPage.onButton.click();
        await page.waitForTimeout(2000);
        await hubPage.findByText('Select region').click();
        await hubPage.findByText((region)).click();
        await page.waitForTimeout(2000);
        await hubPage.findByText('Select district').click();
        await hubPage.findByText((district)).click();
        await page.waitForTimeout(2000);
        await hubPage.findByText('Select community').click();
        await hubPage.findByText((community)).click();
        await page.waitForTimeout(2000);
        await hubPage.saveButton.click();

        await page.waitForTimeout(2000);
        await hubPage.settingsAirAlarm.click();
        await page.waitForTimeout(2000);
        await hubPage.offButton.click();
        await hubPage.saveButton.click();
        
        await page.waitForTimeout(2000);
        expect(hubPage.findByText('Turn off')).toBeVisible();

    });
});