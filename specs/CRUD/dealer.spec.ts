import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { CompanyPage } from "../../pages/company/CompanyPage";
import {
    FAKER_EMAIL_ADMIN, FAKER_NAME_OF_COMPANY_SECOND, TITLE_COMPANIES,
    TITLE_DEALERS, TITLE_TECHNICAL_SUPPORT, URL_SUPPORT_SEARCH
} from "../../utils/constants";

test.describe('Company Page tests', { tag: '@crud' },() => {

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

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain(URL_SUPPORT_SEARCH);

            await companyPage.companies.click();

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();

            await companyPage.dealers.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_DEALERS})).toBeVisible();

            await companyPage.addButton.click();
            await companyPage.inputFirstField.fill(FAKER_EMAIL_ADMIN);
            await companyPage.inputSecondField.fill(FAKER_NAME_OF_COMPANY_SECOND);
            await companyPage.addButton.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_DEALERS})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).toBeVisible();
            await expect(page.getByText(FAKER_EMAIL_ADMIN)).toBeVisible();

            await (page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_DEALERS})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).not.toBeVisible();
        });

});