import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { MONITORING_SERVICE_COMPANY_1 } from "../../utils/user_data";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test('Download additional software:monitoring-service company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694nt24q'
            });
            loginPage = new LoginPage(page);
            profilePage = new ProfilePage(page);
            hubPage = new HubPage(page);

            await loginPage.openLoginPage('/');
            await expect(page).toHaveURL('/login')

            await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
            await expect(page).toHaveURL('/panels');

            await profilePage.company.click();
            await profilePage.companyAdditionalSoftware.click();

            const downloadPromise = page.waitForEvent('download');
            await hubPage.entityBlock.last().click();
            const download = await downloadPromise;

            await download.saveAs(download.suggestedFilename());
    });

});