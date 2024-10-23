import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {
    EMAIL_NECESSARY_NAME_PART, ROLE_SUPPORT_ADMIN_SMALL,
    ROLE_SYS_ADMIN_SMALL, TEXT_ADD_SUPPORT, TEXT_EDIT_SUPPORT,
    TITLE_EMPLOYEES,
    TITLE_TECHNICAL_SUPPORT, USER_PASSWORD_FIRST
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company Page test',() => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
    });

    test('Creation of the Tech Support  under the Role = SUPER_ADMIN with password', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694ayqex"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await companyPage.permissions.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible();

            await companyPage.addButton.click();

            await expect(page.getByText(TEXT_ADD_SUPPORT)).toBeVisible();

            await companyPage.inputFirstField.fill(email);
            await companyPage.inputSecondField.fill(USER_PASSWORD_FIRST);
            await companyPage.inputThirdField.fill(name);
            await companyPage.selectFirstField.click();
            await (page.getByText(ROLE_SYS_ADMIN_SMALL, {exact:true})).click();
            await companyPage.addButton.click();

            await expect(page.getByText(TITLE_EMPLOYEES)).toBeVisible({ timeout: 20000 });
            await expect(page.getByText(email)).toBeVisible();

            await (page.getByText(name)).click();

            await expect(page.getByText(TEXT_EDIT_SUPPORT)).toBeVisible();

            await companyPage.deleteUserButton.click();
            await companyPage.submitButton.click();

            await expect(page.getByText(TITLE_EMPLOYEES)).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(email)).not.toBeVisible();
        });

    test('Creation of the Tech Support  under the Role = SUPER_ADMIN without password', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atwq3"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await companyPage.permissions.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible();

            await companyPage.addButton.click();

            await expect(page.getByText(TEXT_ADD_SUPPORT)).toBeVisible();

            await companyPage.inputFirstField.fill(email);
            await companyPage.inputThirdField.fill(name);
            await companyPage.selectFirstField.click();
            await (page.getByText(ROLE_SUPPORT_ADMIN_SMALL, {exact:true})).click();
            await companyPage.addButton.click();

            await expect(page.getByText(TITLE_EMPLOYEES)).toBeVisible({ timeout: 20000 });
            await expect(page.getByText(email)).toBeVisible();

            await (page.getByText(name)).click();

            await expect(page.getByText(TEXT_EDIT_SUPPORT)).toBeVisible();

            await companyPage.deleteUserButton.click();
            await companyPage.submitButton.click();

            await expect(page.getByText(TITLE_EMPLOYEES)).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(email)).not.toBeVisible();
    });

});