import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { MONITORING_COMPANY_1 } from "../../utils/user_data";
import { PANEL_STATE, TITLE_ALL_PANELS } from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company Page tests',{ tag: ['@smoke', '@stable', '@company']}, () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(MONITORING_COMPANY_1);
        await expect(page).toHaveURL('/panels');
    });

    test('Search by panel state outdated firmware version: monitoring company', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/86957f77h"
            });

            await companyPage.panels.click();
            await page.waitForTimeout(2000);
            await page.getByText(TITLE_ALL_PANELS).first().click();
            await page.getByText(PANEL_STATE).first().click();

            for (const hub of await companyPage.entityBlock.all())
            {await expect(hub.filter({has:companyPage.updateFirmwareIcon})).toBeVisible();}
    });

});