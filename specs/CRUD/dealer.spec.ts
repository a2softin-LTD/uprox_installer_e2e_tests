import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {CompanyPage} from "../../pages/company/CompanyPage";
import {TITLE_COMPANIES, TITLE_DEALERS, TITLE_TECHNICAL_SUPPORT} from "../../utils/constants";

test.describe('Company Page tests', () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
    });

    test('Creation of the DEALER under the Role = SUPER_ADMIN', { tag: ['@smoke', '@stable', '@crud']}, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695ehy9m"
            });

            const nameCompany: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email({ firstName: 'sastest2398_' });

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await companyPage.companies.click();
            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();
            await companyPage.dealers.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_DEALERS})).toBeVisible();

            await companyPage.addButton.click();
            await companyPage.inputFirstField.fill(adminEmail);
            await companyPage.inputSecondField.fill(nameCompany);

            await companyPage.addButton.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_DEALERS})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(nameCompany)).toBeVisible();
            await expect(page.getByText(adminEmail)).toBeVisible();

            await (page.getByText(nameCompany)).click()
            await companyPage.deleteUserButton.click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_DEALERS})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(nameCompany)).not.toBeVisible();
        });

});