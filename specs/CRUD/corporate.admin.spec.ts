import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN, SYSTEM_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {
        EMAIL_NECESSARY_NAME_PART,
        TEXT_ADDING_GROUPS_OF_COMPANIES, TEXT_DELETING_GROUPS_OF_COMPANIES,
        TITLE_GROUPS_OF_COMPANIES,
        TITLE_TECHNICAL_SUPPORT
} from "../../utils/constants";
import {CompanyPage} from "../../pages/company/CompanyPage";

test.describe('Company Page tests', () => {

        let loginPage: LoginPage;
        let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
            loginPage = new LoginPage(page);
            companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
    });

    test('Creation of the Corporate Admin under the Role = SYSTEM_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694attun"
            });

            const nameCompany: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

            await loginPage.auth(SYSTEM_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await companyPage.companies.click();
            await companyPage.groupsOfCompanies.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            await companyPage.companyAddGroupButton.click()
            await expect(page.getByText(TEXT_ADDING_GROUPS_OF_COMPANIES)).toBeVisible();
            await companyPage.inputFirstField.fill(nameCompany);
            await companyPage.inputSecondField.fill(adminEmail);
            await companyPage.connectButton.click();
            await companyPage.connectButton.last().click();
            await page.waitForTimeout(3000);
            await companyPage.companies.first().click({force:true});
            await companyPage.groupsOfCompanies.click({ timeout: 10000 });
            await page.waitForTimeout(3000);
            await page.reload();
            await page.waitForTimeout(1000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(nameCompany)).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(adminEmail)).toBeVisible({ timeout: 10000 });

            await (page.getByText(nameCompany)).click();
            await companyPage.deleteButton.click();
            await expect(page.getByText(TEXT_DELETING_GROUPS_OF_COMPANIES)).toBeVisible();
            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(nameCompany)).not.toBeVisible({ timeout: 10000 });
    });

    test('Creation of the Corporate Admin under the Role = SUPER_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atuwv"
            });

            const nameCompany: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await companyPage.companies.click();
            await companyPage.groupsOfCompanies.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            await companyPage.companyAddGroupButton.click();

            await expect(page.getByText(TEXT_ADDING_GROUPS_OF_COMPANIES)).toBeVisible();

            await companyPage.inputFirstField.fill(nameCompany);
            await companyPage.inputSecondField.fill(adminEmail);

            await companyPage.connectButton.click();
            await companyPage.connectButton.last().click()
            await page.waitForTimeout(3000)
            await companyPage.companies.first().click();
            await companyPage.groupsOfCompanies.click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000)

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(nameCompany)).toBeVisible();
            await expect(page.getByText(adminEmail)).toBeVisible();

            await (page.getByText(nameCompany)).click();
            await companyPage.deleteButton.click();
            await expect(page.getByText(TEXT_DELETING_GROUPS_OF_COMPANIES)).toBeVisible();
            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(nameCompany)).not.toBeVisible();
    });

});