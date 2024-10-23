import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {
    COMPANY_FIRST,
    COMPANY_SECOND,
    COMPANY_THIRD,
    COUNTRY_ALGERIA,
    COUNTRY_UKRAINE,
    COUNTRY_UKRAINE_SHORT,
    EMAIL_NECESSARY_NAME_PART,
    ROLE_MONITORING_COMPANY,
    ROLE_SERVICE_COMPANIES,
    SETTINGS_BLOCKED,
    TEXT_ABSENT,
    TEXT_NO, TEXT_SAVING_CHANGES,
    TEXT_SUCCESSFULLY,
    TEXT_TEST_DEALER_ROLE,
    TITLE_COMPANIES,
    TITLE_COMPANY_SETTINGS
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('SuperAdmin page tests',() => {

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

    test('Checking UI elements on company page under SUPER_ADMIN role',
        { tag: ['@smoke', '@stable', '@superadmin']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await superAdminPage.companies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANIES)})).toBeVisible();
            await expect(companyPage.companyAddButton).toBeVisible();
            await expect(companyPage.companyCountryFilter).toBeVisible();
            await expect(companyPage.companyRoleFilter).toBeVisible();
            await expect(companyPage.companyAllFilter).toBeVisible();
            await expect(companyPage.companySearchField).toBeVisible();
            await expect(superAdminPage.applyButton).toBeVisible();
            await expect(companyPage.companySelectCommandField).toBeVisible();
            await expect(companyPage.actionsCheckbox).toBeVisible();
    });

    test.describe('Company list edit under SUPER_ADMIN role', () => {

        test('List of companies',
            { tag: ['@smoke', '@stable', '@superadmin']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40dv"
            });

            await superAdminPage.companies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANIES)})).toBeVisible();

            for (const company of await superAdminPage.entityBlock.all())
                await expect(company).toBeVisible();
            for (const hub of await superAdminPage.entityBlock.all())
            {await expect(hub.filter({has: superAdminPage.entityText})).toBeVisible();}

        });

        test.skip('Add company', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p407a"
            });

            const name: string = faker.commerce.productName();
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const contactEmail: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const contactPhone: string = faker.phone.number();

            await superAdminPage.companies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANIES)})).toBeVisible();

            await companyPage.companyAddButton.click();
            await superAdminPage.inputFirstField.fill(name);
            await superAdminPage.inputSecondField.fill(email);
            await superAdminPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await superAdminPage.selectFirstField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await superAdminPage.selectSecondField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await superAdminPage.inputFourthField.fill(contactEmail);
            await superAdminPage.inputFifthField.fill(contactPhone);
            await superAdminPage.inputSixthtField.fill(TEXT_NO);
            await superAdminPage.inputSeventhField.fill(TEXT_ABSENT);
            await superAdminPage.submitButton.click();

            await expect(page.getByText(name)).toBeVisible();

            await page.getByText(name).click();
            await companyPage.companyCloseButton.click();
            await page.getByText(COMPANY_FIRST).click();
            await superAdminPage.submitButton.click();

            await expect(page.getByText(contactPhone)).not.toBeVisible();
        });

        test.skip('Delete company',{ tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40z1"
            });

            const name: string = faker.commerce.productName();
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const contactEmail: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const contactPhone: string = faker.phone.number();


            await superAdminPage.companies.click();
            await companyPage.companyAddButton.click();
            await superAdminPage.inputFirstField.fill(name);
            await superAdminPage.inputSecondField.fill(email);
            await superAdminPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await superAdminPage.selectFirstField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await superAdminPage.selectSecondField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await superAdminPage.inputFourthField.fill(contactEmail);
            await superAdminPage.inputFifthField.fill(contactPhone);
            await superAdminPage.inputSixthtField.fill(TEXT_NO);
            await superAdminPage.inputSeventhField.fill(TEXT_ABSENT);
            await superAdminPage.submitButton.click();

            await expect(page.getByText(name)).toBeVisible();

            await page.getByText(name).click();
            await companyPage.companyCloseButton.click();
            await page.getByText(COMPANY_FIRST).click();
            await superAdminPage.submitButton.click();

           await expect(page.getByText(contactPhone)).not.toBeVisible();
        });

    });

    test.describe('Company search under SUPER_ADMIN role',{ tag: ['@smoke', '@stable', '@superadmin']},() => {

        test('Search by country', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p3ztg"
            });
            let count=0;

            await superAdminPage.companies.click();
            await page.waitForTimeout(5000);

            for (const hub of await superAdminPage.entityBlock.filter({hasText:COUNTRY_ALGERIA}).all())
            { await expect(hub).toBeVisible();
            count=count+1;}

            await companyPage.companyCountryFilter.click();
            await page.getByText(COUNTRY_ALGERIA,{ exact: true }).click();

            for (const hub of await superAdminPage.entityBlock.filter({hasText:COUNTRY_ALGERIA}).all())
            { await expect(hub).toBeVisible();}

            await expect(companyPage.employeeBlock).toHaveCount(count);
        });

        test('Search by role', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p3zwr"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(5000);
            let hubsNumber=((await page.$$('div:text-is("Service companies")')).length)-1;
            await companyPage.companyRoleFilter.click();
            await page.getByText(ROLE_SERVICE_COMPANIES, { exact: true }).first().click();

            for (const hub of await superAdminPage.entityBlock.filter({hasText:ROLE_SERVICE_COMPANIES}).all())
            { await expect(hub).toBeVisible();}

            await expect(companyPage.employeeBlock).toHaveCount(hubsNumber);
        });


        test('Search by setting', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p404p"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(5000);
            let hubsNumber=((await page.$$('use[*|href="#icon-ban"]')).length);
            await companyPage.companyAllFilter.click();
            await page.getByText(SETTINGS_BLOCKED, { exact: true }).click();

            for (const hub of await superAdminPage.entityBlock.filter({has:superAdminPage.banIcon}).all())
            { await expect(hub).toBeVisible();}

            await expect(companyPage.employeeBlock).toHaveCount(hubsNumber);
        });

        test('Search by company name',{ tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p3zyz"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(5000);

            await expect(page.getByText(COMPANY_SECOND)).toBeVisible();

            await companyPage.companySearchField.fill(COMPANY_SECOND);

            await expect(page.getByText(COMPANY_SECOND)).toBeVisible();
            await expect(companyPage.employeeBlock).toHaveCount(1);
        });

    });

    test.describe('Company profile edit under SUPER_ADMIN role',  () => {

        test('Resending the letter', { tag: '@smoke'},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694phqe6"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(2000);
            await page.getByText(COMPANY_THIRD).click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await superAdminPage.resendEmailButton.click();
            await superAdminPage.sendButton.click();

            await expect(page.getByText(TEXT_SAVING_CHANGES)).toBeVisible();
            await expect(page.getByText(TEXT_SUCCESSFULLY)).toBeVisible();
        });

        test('Changing admin login', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694phr25"
            });

            const email: string = faker.internet.email({ firstName: 'pol_' + EMAIL_NECESSARY_NAME_PART });

            await superAdminPage.companies.click();
            await page.waitForTimeout(2000);
            await page.getByText(COMPANY_THIRD).click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyChangeAdminLogin.click();
            await superAdminPage.inputFirstField.fill(email);
            await superAdminPage.changeButton.click();
            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await page.reload();
            await page.waitForTimeout(2000);

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(email)).toBeVisible();
        });

        test('Another company settings editing under SUPER_ADMIN role', { tag: '@smoke'},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694phqe6"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(2000);
            await page.getByText(COMPANY_THIRD).click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await superAdminPage.resendEmailButton.click();
            await superAdminPage.sendButton.click();

            await expect(page.getByText(TEXT_SAVING_CHANGES)).toBeVisible();
            await expect(page.getByText(TEXT_SUCCESSFULLY)).toBeVisible();
        });

   });

});