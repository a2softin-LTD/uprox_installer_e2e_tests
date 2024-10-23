import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { DILER } from "../../utils/user_data";
import {
    COMPANY_FIRST,
    COUNTRY_UKRAINE,
    ROLE_MONITORING_SERVICE_COMPANIES,
    SETTING_SHOW_IN_ADS, TEXT_SAVE_IN_XLS, TITLE_COMPANIES
} from "../../utils/constants";
import {CompanyPage} from "../../pages/company/CompanyPage";

test.describe('Company Page tests', { tag: ['@smoke', '@stable']}, () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(DILER);
        await expect(page).toHaveURL('/dealer/companies');
    });

    test('Checking UI elements on companies page under DEALER role', { tag: '@smoke'}, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            })

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANIES)})).toBeVisible();
            await expect(companyPage.companyCountryFilter).toBeVisible();
            await expect(companyPage.companyRoleFilter).toBeVisible();
            await expect(companyPage.companyAllFilter).toBeVisible();
            await expect(companyPage.companySearchField).toBeVisible();
            await expect(companyPage.saveInXLSButton).toBeVisible();
    });

    test('Company list under DEALER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf42"
            });

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();

            for (const company of await companyPage.entityBlock.all())
                await expect(company).toBeVisible();
            for (const hub of await companyPage.entityBlock.all())
            {await expect(hub.filter({has: companyPage.entityText})).toBeVisible();}

    });

    test.describe('Company search under DEALER role', () => {

        test('Company search by country under DEALER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf4a"
            });

            let companiesNumber=0;

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();
            await page.waitForTimeout(2000);

            for (const hub of await companyPage.entityBlock.filter({hasText:COUNTRY_UKRAINE}).all())
            { await expect(hub).toBeVisible();
                companiesNumber=companiesNumber+1;}

            await companyPage.companyCountryFilter.click();
            await page.getByText(COUNTRY_UKRAINE,{ exact: true }).first().click();

            for (const hub of await companyPage.entityBlock.filter({hasText:COUNTRY_UKRAINE}).all())
            { await expect(hub).toBeVisible();}

            await expect(companyPage.employeeBlock).toHaveCount(companiesNumber);
        });

        test('Company search by role under DEALER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf4c"
            });

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();
            await page.waitForTimeout(2000);

            let companiesNumber=((await page.$$('div:text-is("Monitoring-service companies")')).length)-1;

            await companyPage.companyRoleFilter.click();
            await page.getByText(ROLE_MONITORING_SERVICE_COMPANIES, { exact: true }).first().click();

            for (const company of await companyPage.entityBlock.filter({hasText:ROLE_MONITORING_SERVICE_COMPANIES}).all())
            { await expect(company).toBeVisible();}

            await expect(companyPage.employeeBlock).toHaveCount(companiesNumber);
        });

        test('Company search by setting under DEALER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf48"
            });

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();
            await page.waitForTimeout(2000);

            let companiesNumber=((await page.$$('use[*|href="#icon-ads"]')).length);

            await companyPage.companyAllFilter.click();
            await page.getByText(SETTING_SHOW_IN_ADS, { exact: true }).click();

            for (const company of await companyPage.entityBlock.filter({has:companyPage.adsIcon}).all())
            { await expect(company).toBeVisible();}

            await page.waitForTimeout(2000);
            await expect(companyPage.employeeBlock).toHaveCount(companiesNumber);
        });

        test('Company search by company name under DEALER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695e9b7n"
            });

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();
            await expect(page.getByText(COMPANY_FIRST)).toBeVisible();

            await companyPage.companySearchField.fill(COMPANY_FIRST);

            await expect(page.getByText(COMPANY_FIRST)).toBeVisible();
            await expect(companyPage.employeeBlock).toHaveCount(1);
        });

    });

    test('Downloading companies list under DEALER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695e9dz1"
            });

        await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();

        const downloadPromise = page.waitForEvent('download');
        await companyPage.saveInXLSButton.click();

        await expect(page.getByText(TEXT_SAVE_IN_XLS)).toBeVisible();

        await page.getByText(TEXT_SAVE_IN_XLS).click();
        const download = await downloadPromise;
        await download.saveAs(download.suggestedFilename());
        });

});