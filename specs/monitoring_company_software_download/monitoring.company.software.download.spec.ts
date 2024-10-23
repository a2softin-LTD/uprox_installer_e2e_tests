import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { MONITORING_COMPANY } from "../../utils/user_data";
import {CompanyPage} from "../../pages/company/CompanyPage";

test.describe('Company Page tests', { tag: ['@smoke', '@stable', '@company']}, () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;
    let hubPage: HubPage;

    test('Download additional software:monitoring company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694fb8q1'
        });
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(MONITORING_COMPANY);
        await expect(page).toHaveURL('/panels');

        await companyPage.company.click();
        await companyPage.companyAdditionalSoftware.click();

        const downloadPromise = page.waitForEvent('download');
        await hubPage.entityBlock.last().click();
        const download = await downloadPromise;

        await download.saveAs(download.suggestedFilename());
    });

});