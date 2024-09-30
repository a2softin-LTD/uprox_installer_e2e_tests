import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import {MIXED, USER_1} from "../../utils/user_data";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test('Troubles', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694ky0zj"
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);
        const hubSerialNumber: string = "00:08:9B:30:0C:60 | Wifi | GPRS | ";

        await loginPage.auth(MIXED);
        await expect(page).toHaveURL('/panels');
        await page.getByText(hubSerialNumber).isVisible();
        await page.getByText(hubSerialNumber).click();
        await page.waitForTimeout(2000);
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.troubles.click();
        await page.waitForTimeout(2000);
        page.reload();
        await page.waitForTimeout(2000);
        for (const device of await hubPage.entityBlock.all())

        {await expect(device.filter({has: hubPage.hubTroublesState})).toBeVisible();}
    });

});