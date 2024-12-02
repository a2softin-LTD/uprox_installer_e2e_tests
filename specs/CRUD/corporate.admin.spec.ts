import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN, SYSTEM_ADMIN } from "../../utils/user_data";
import {
        FAKER_EMAIL_FIRST, FAKER_NAME_OF_COMPANY_SECOND,
        TEXT_ADDING_GROUPS_OF_COMPANIES, TEXT_DELETING_GROUPS_OF_COMPANIES, TITLE_COMPANIES,
        TITLE_GROUPS_OF_COMPANIES, TITLE_HISTORY_FOR_ALL_PANELS,
        TITLE_TECHNICAL_SUPPORT, URL_SUPPORT_SEARCH
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company Page tests', { tag: '@crud' },() => {

        let loginPage: LoginPage;
        let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
            loginPage = new LoginPage(page);
            companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
    });

    test('Creation of the Corporate Admin under the Role = SYSTEM_ADMIN',{ tag: ['@smoke', '@problem']} , async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694attun"
            });

            await loginPage.auth(SYSTEM_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain(URL_SUPPORT_SEARCH);

            await companyPage.companies.click();
            await companyPage.groupsOfCompanies.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            await companyPage.companyAddGroupButton.click();

            await expect(page.getByText(TEXT_ADDING_GROUPS_OF_COMPANIES)).toBeVisible();

            await companyPage.inputFirstField.fill(FAKER_NAME_OF_COMPANY_SECOND);
            await companyPage.inputSecondField.fill(FAKER_EMAIL_FIRST);

            await companyPage.connectButton.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.connectButton.last().click()
            await page.waitForTimeout(5000);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.history.click({ force:true});

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();

            await companyPage.companies.click({ timeout: 10000 });

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();

            await companyPage.groupsOfCompanies.click({ timeout: 10000 });

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            await page.waitForTimeout(3000);
            await page.reload();
            await page.waitForTimeout(1000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).toBeVisible();
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();

            await (page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.deleteButton.click();

            await expect(page.getByText(TEXT_DELETING_GROUPS_OF_COMPANIES)).toBeVisible();

            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).not.toBeVisible();
    });

    test('Creation of the Corporate Admin under the Role = SUPER_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atuwv"
            });

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain(URL_SUPPORT_SEARCH);

            await companyPage.companies.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.groupsOfCompanies.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            await companyPage.companyAddGroupButton.click();

            await expect(page.getByText(TEXT_ADDING_GROUPS_OF_COMPANIES)).toBeVisible();

            await companyPage.inputFirstField.fill(FAKER_NAME_OF_COMPANY_SECOND);
            await companyPage.inputSecondField.fill(FAKER_EMAIL_FIRST);
            await companyPage.connectButton.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.connectButton.last().click()
            await page.waitForTimeout(3000);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.history.click({ timeout: 10000});

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();

            await companyPage.companies.click({ timeout: 10000 });

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();

            await companyPage.groupsOfCompanies.click({ timeout: 10000 });

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            await page.waitForTimeout(3000);
            await page.reload();
            await page.waitForTimeout(1000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).toBeVisible();
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();

            await (page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.deleteButton.click();

            await expect(page.getByText(TEXT_DELETING_GROUPS_OF_COMPANIES)).toBeVisible();

            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).not.toBeVisible();
    });

});