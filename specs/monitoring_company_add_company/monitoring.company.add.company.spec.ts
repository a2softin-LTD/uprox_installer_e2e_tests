import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {CompanyPage} from "../../pages/company/CompanyPage";
import {
    ADMIN_EMAIL,
    BUTTON_ADD_COMPANY,
    COUNTRY_UKRAINE, COUNTRY_UKRAINE_SHORT,
    ROLE_MONITORING_COMPANY, TEXT_ABSENT, TEXT_INTERNATIONAL, TEXT_NO,
    TEXT_TEST_DEALER_ROLE
} from "../../utils/constants";

test.describe('Company Page tests', () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });

    test.describe('Create new monitoring company under the Role = SYSTEM_ADMIN ', () => {

        test.skip('Create new monitoring company: verify Submit Button State', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f6g"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email();
            const contactEmail: string = faker.internet.email();
            const contactPhone: string = faker.phone.number();

            await companyPage.companies.click();

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

            await companyPage.companyAddButton.click();
            await companyPage.inputFirstField.fill(name);
            await companyPage.inputSecondField.fill(adminEmail);
            await companyPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await companyPage.selectFirstField.click();
            await page.getByText(TEXT_INTERNATIONAL).click();
            await companyPage.selectSecondField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await companyPage.selectThirdField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await companyPage.inputFourthField.fill(contactEmail);
            await companyPage.inputFifthField.fill(contactPhone);
            await companyPage.inputSixthtField.fill(TEXT_NO);
            await companyPage.inputSeventhField.fill(TEXT_ABSENT);
            await companyPage.submitButton.click();

            await expect(page.getByText(name)).toBeVisible();

            await (page.getByText(name)).click();

            await expect(page.getByText(adminEmail)).toBeVisible();
        });

        test.skip('Create new monitoring company with mandatory fields only', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f6k"
            });

            const name: string = faker.commerce.productName();

            await companyPage.companies.click();

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

            await companyPage.companyAddButton.click();
            await companyPage.inputFirstField.fill(name);
            await companyPage.inputSecondField.fill(ADMIN_EMAIL);
            await companyPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await companyPage.selectFirstField.click();
            await page.getByText(TEXT_INTERNATIONAL).last().click();
            await companyPage.selectSecondField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await companyPage.selectThirdField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await companyPage.submitButton.click();

            await expect(page.getByText(name)).toBeVisible();

            await (page.getByText(name)).click();

            await expect(page.getByText(ADMIN_EMAIL)).toBeVisible();
        });

        test.skip('Create new monitoring company with optional fields', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f6n"
            });

            const name: string = faker.commerce.productName();
            const contactEmail: string = faker.internet.email();
            const contactPhone: string = faker.phone.number();

            await companyPage.companies.click();

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

            await companyPage.companyAddButton.click();
            await companyPage.inputFirstField.fill(name);
            await companyPage.inputSecondField.fill(ADMIN_EMAIL);
            await companyPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await companyPage.selectFirstField.click();
            await page.getByText(TEXT_INTERNATIONAL).click();
            await companyPage.selectSecondField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await companyPage.selectThirdField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await companyPage.inputFourthField.fill(contactEmail);
            await companyPage.inputFifthField.fill(contactPhone);
            await companyPage.inputSixthtField.fill(TEXT_NO);
            await companyPage.inputSeventhField.fill(TEXT_ABSENT);
            await companyPage.submitButton.click();

            await expect(page.getByText(name)).toBeVisible();

            await (page.getByText(name)).click();

            await expect(page.getByText(ADMIN_EMAIL)).toBeVisible();
        });

    });

});