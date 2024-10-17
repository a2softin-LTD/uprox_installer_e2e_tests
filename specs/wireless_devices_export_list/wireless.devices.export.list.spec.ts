import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";

test.describe('Hub history page', { tag: ['@stable']  }, () => {

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

    test('Export wireless devices list', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvcav'
            });

            await profilePage.panels.click();
            await profilePage.secondHub.click();

            await expect(page.getByText('Add wireless device')).toBeVisible();

            await (page.getByText('...')).click();
            const downloadPromise = page.waitForEvent('download');
            await hubPage.exportSensorsButton.click();
            const download = await downloadPromise;
            await download.saveAs(download.suggestedFilename());
    });

});