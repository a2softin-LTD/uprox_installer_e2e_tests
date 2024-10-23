import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import { BUTTON_ADD_WIRELESS_DEVICE } from "../../utils/constants";

test.describe('Hub Page tests',{ tag: ['@smoke', '@stable']}, () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
    });

    test('Export wireless devices list', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678t0fvw'
            });

            await hubPage.panels.click();
            await hubPage.secondHub.click();

            await expect(page.getByText(BUTTON_ADD_WIRELESS_DEVICE)).toBeVisible();

            await (page.getByText('...')).click();
            const downloadPromise = page.waitForEvent('download');
            await hubPage.exportSensorsButton.click();
            const download = await downloadPromise;
            await download.saveAs(download.suggestedFilename());
    });

});