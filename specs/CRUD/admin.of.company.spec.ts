import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN, SYSTEM_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {
        BUTTON_ADD_COMPANY,
        COUNTRY_UKRAINE, COUNTRY_UKRAINE_SHORT,
        EMAIL_NECESSARY_NAME_PART, ROLE_MONITORING_COMPANY, TEXT_ABSENT, TEXT_NO,
        TEXT_TEST_DEALER_ROLE,
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

    test.skip('Creation of the Security Company Admin under the Role = SYSTEM_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694att1n"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const contactEmail: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const contactPhone: string = faker.phone.number();

            await loginPage.auth(SYSTEM_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await companyPage.companies.click();

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

            await companyPage.companyAddButton.click();
            await companyPage.inputFirstField.fill(name);
            await companyPage.inputSecondField.fill(adminEmail);
            await companyPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await companyPage.selectFirstField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await companyPage.selectSecondField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await companyPage.inputFourthField.fill(contactEmail);
            await companyPage.inputFifthField.fill(contactPhone);
            await companyPage.inputSixthtField.fill(TEXT_NO);
            await companyPage.inputSeventhField.fill(TEXT_ABSENT);
            await companyPage.submitButton.click();

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(name)).toBeVisible();

            await (page.getByText(name)).click();

            await expect(page.getByText(adminEmail)).toBeVisible();
    });

    test.skip('Creation of the Security Company Admin under the Role = SUPER_ADMIN)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694att1n"
            });

            const name: string = faker.commerce.productName();
            const adminEmail: string = 'user@';
            const contactEmail: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const contactPhone: string = faker.phone.number();

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await companyPage.companies.click();

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

            await companyPage.companyAddButton.click();
            await companyPage.inputFirstField.fill(name);
            await companyPage.inputSecondField.fill(adminEmail);
            await companyPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await companyPage.selectFirstField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await companyPage.selectSecondField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await companyPage.inputFourthField.fill(contactEmail);
            await companyPage.inputFifthField.fill(contactPhone);
            await companyPage.inputSixthtField.fill(TEXT_NO);
            await companyPage.inputSeventhField.fill(TEXT_ABSENT);
            await companyPage.submitButton.click();

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(name)).toBeVisible();

            await (page.getByText(name)).click();

            await expect(page.getByText(adminEmail)).toBeVisible();
    });

});