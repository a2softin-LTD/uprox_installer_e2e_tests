import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { MONITORING_COMPANY_1 } from "../../utils/user_data";
import { PANEL_STATE_OUTDATED_FIRMWARE_VERSION, TITLE_ALL_PANELS, URL_LOGIN, URL_PANELS } from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company Page tests',{ tag: ['@smoke', '@stable', '@company']}, () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(MONITORING_COMPANY_1);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test('Search by panel state outdated firmware version: monitoring company', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/86957f77h"
            });

            await companyPage.panels.click();
            await page.waitForLoadState('domcontentloaded');
            await page.waitForTimeout(2000);
            await page.getByText(TITLE_ALL_PANELS).first().click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(PANEL_STATE_OUTDATED_FIRMWARE_VERSION).first().click();

            await page.waitForTimeout(2000);

            for (const hub of await companyPage.entityBlock.all())
            {await expect(hub.filter({has:companyPage.updateFirmwareIcon})).toBeVisible();}
    });

});