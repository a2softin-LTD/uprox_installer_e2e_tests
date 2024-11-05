import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { MONITORING_SERVICE_COMPANY_1 } from "../../utils/user_data";
import { CompanyPage } from "../../pages/company/CompanyPage";
import {URL_LOGIN, URL_PANELS} from "../../utils/constants";

test.describe('Company Page tests',{ tag: ['@smoke', '@stable', '@company']},  () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;
    let hubPage: HubPage;

    test('Download additional software: monitoring-service company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694nt24q'
            });
            loginPage = new LoginPage(page);
            companyPage = new CompanyPage(page);
            hubPage = new HubPage(page);

            await loginPage.openLoginPage('/');
            await expect(page).toHaveURL(URL_LOGIN)
            await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
            await expect(page).toHaveURL(URL_PANELS);

            await companyPage.company.click();
            await companyPage.companyAdditionalSoftware.click();

            const downloadPromise = page.waitForEvent('download');
            await hubPage.entityBlock.last().click();
            const download = await downloadPromise;
            await download.saveAs(download.suggestedFilename());
    });

});