import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {
    COMPANY_THIRD,
    EMAIL_NECESSARY_NAME_PART,
    TITLE_GROUP_OF_COMPANIES,
    TITLE_GROUPS_OF_COMPANIES
} from "../../utils/constants";
import {CompanyPage} from "../../pages/company/CompanyPage";
import {SuperAdminPage} from "../../pages/superAdmin/SuperAdminPage";

test.describe('SuperAdmin Page tests', { tag: ['@smoke', '@superadmin']},() => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;
    let superAdminPage: SuperAdminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);
        superAdminPage = new SuperAdminPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });

    test('Checking UI elements on groups of companies page', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await superAdminPage.companies.click();
            await superAdminPage.groupsOfCompanies.click();
            await page.waitForTimeout(2000);

            await expect(companyPage.companyAddNewGroupButton).toBeVisible();
            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();
    });

    test.describe('Groups of companies editing', { tag: '@smoke' }, () => {

        test('List of  groups', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p415n"
            });

            await superAdminPage.companies.click();
            await superAdminPage.groupsOfCompanies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            for (const employee of await superAdminPage.entityBlock.all())
                await expect(employee).toBeVisible();

            for (const hub of await superAdminPage.entityBlock.all())
                await expect(hub.filter({has: superAdminPage.entityText})).toBeVisible();

            for (const hub of await superAdminPage.entityBlock.all())
            {await expect(hub.filter({hasText:/.+@.+\..+/i})).toBeVisible();}

            for (const hub of await superAdminPage.entityBlock.all())
                await expect(hub.filter({has: superAdminPage.informationIcon})).toBeVisible();
        });

        test('Add company to group', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/30937733/v/l/xg4m5-4967"
            });

            await superAdminPage.companies.click();
            await superAdminPage.groupsOfCompanies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            await superAdminPage.entityBlock.first().click();
            await companyPage.companyAddToGroupButton.click();
            await page.getByText(COMPANY_THIRD).click();
            await superAdminPage.okButton.click();

            await superAdminPage.trashIcon.last().click();
            await superAdminPage.submitButton.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_GROUP_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(COMPANY_THIRD)).not.toBeVisible();
        });

        test('Delete company from the group', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694phzya"
            });

            await superAdminPage.companies.click();
            await superAdminPage.groupsOfCompanies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            await superAdminPage.entityBlock.first().click();
            await companyPage.companyAddToGroupButton.click();
            await page.getByText(COMPANY_THIRD).click();
            await superAdminPage.okButton.click();

            await superAdminPage.trashIcon.last().click();
            await superAdminPage.submitButton.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_GROUP_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(COMPANY_THIRD)).not.toBeVisible();
        });

        test('Create group of companies', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p4175"
            });

            const name: string = 'TEST_COMPANY_' + faker.string.alphanumeric({ length: { min: 3, max: 5 } })
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

            await superAdminPage.companies.click();
            await superAdminPage.groupsOfCompanies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            await companyPage.companyAddNewGroupButton.click();
            await superAdminPage.inputFirstField.fill(name);
            await superAdminPage.inputSecondField.fill(email);
            await superAdminPage.connectButton.click();
            await superAdminPage.connectButton.last().click();
            await superAdminPage.companies.first().click();
            await superAdminPage.groupsOfCompanies.click();
            await page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(name)).toBeVisible();

            await page.getByText(name).click();
            await superAdminPage.deleteButton.click();
            await superAdminPage.deleteButton.last().click();
            await page.waitForTimeout(2000);

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(name)).not.toBeVisible();
        });

        test('Delete  group of companies',{ tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p41at"
            });

            const name: string = 'TEST_COMPANY_' + faker.string.alphanumeric({ length: { min: 3, max: 5 } })
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

            await superAdminPage.companies.click();
            await superAdminPage.groupsOfCompanies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();

            await companyPage.companyAddNewGroupButton.click();
            await superAdminPage.inputFirstField.fill(name);
            await superAdminPage.inputSecondField.fill(email);
            await superAdminPage.connectButton.click();
            await superAdminPage.connectButton.last().click();
            await superAdminPage.companies.first().click();
            await superAdminPage.groupsOfCompanies.click();
            await page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(name)).toBeVisible();

            await page.getByText(name).click();
            await superAdminPage.deleteButton.click();
            await superAdminPage.deleteButton.last().click();
            await page.waitForTimeout(2000);

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_GROUPS_OF_COMPANIES)})).toBeVisible();
            await expect(page.getByText(name)).not.toBeVisible();
        });

    });

});