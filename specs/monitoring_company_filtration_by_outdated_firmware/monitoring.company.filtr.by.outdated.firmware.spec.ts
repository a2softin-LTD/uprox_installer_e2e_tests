import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { MONITORING_COMPANY_1 } from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(MONITORING_COMPANY_1);
        await expect(page).toHaveURL('/panels');
    });

    test('Search by panel state outdated firmware version: monitoring company', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678p0hwg"
            });
            const panelState: string = "Outdated firmware version";

            await profilePage.panels.click();
            await page.waitForTimeout(2000);
            await page.getByText('All panels').first().click();
            await page.getByText(panelState).first().click();

            for (const hub of await profilePage.entityBlock.all())
            {await expect(hub.filter({has:profilePage.updateFirmwareIcon})).toBeVisible();}
    });

});