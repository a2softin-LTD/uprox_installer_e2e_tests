import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import {
    FAKER_EMAIL_FIRST, FAKER_NAME_OF_COMPANY_SECOND,
    ROLE_SYS_ADMIN_SMALL, TEXT_ADD_SUPPORT, TEXT_EDIT_SUPPORT,
    TITLE_EMPLOYEES,
    TITLE_TECHNICAL_SUPPORT, URL_SUPPORT_SEARCH, USER_PASSWORD_FIRST
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company Page tests',{ tag: '@crud' }, () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);
        
        await loginPage.openLoginPage('/');
    });

    test('Creation of the System Admin under the Role = SUPER_ADMIN with password', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694aw8r6"
            });

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain(URL_SUPPORT_SEARCH);

            await companyPage.permissions.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible();

            await companyPage.addButton.click();

            await expect(page.getByText(TEXT_ADD_SUPPORT)).toBeVisible();

            await companyPage.inputFirstField.fill(FAKER_EMAIL_FIRST);
            await companyPage.inputSecondField.fill(USER_PASSWORD_FIRST);
            await companyPage.inputThirdField.fill(FAKER_NAME_OF_COMPANY_SECOND);
            await companyPage.selectFirstField.click();
            await (page.getByText(ROLE_SYS_ADMIN_SMALL)).click()
            await companyPage.addButton.click()

            await expect(page.getByText(TITLE_EMPLOYEES)).toBeVisible({ timeout: 20000 });
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();

            await (page.getByText(FAKER_EMAIL_FIRST)).click();

            await expect(page.getByText(TEXT_EDIT_SUPPORT)).toBeVisible();

            await companyPage.deleteUserButton.click();
            await companyPage.submitButton.click();

            await expect(page.getByText(TITLE_EMPLOYEES)).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
    });

    test('Creation of the System Admin under the Role = SUPER_ADMIN without password', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atvun"
            });

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
            expect(page.url()).toContain(URL_SUPPORT_SEARCH);

            await companyPage.permissions.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible();

            await companyPage.addButton.click();

            await expect(page.getByText(TEXT_ADD_SUPPORT)).toBeVisible();

            await companyPage.inputFirstField.fill(FAKER_EMAIL_FIRST);
            await companyPage.inputThirdField.fill(FAKER_NAME_OF_COMPANY_SECOND);
            await companyPage.selectFirstField.click();
            await (page.getByText(ROLE_SYS_ADMIN_SMALL)).click()
            await companyPage.addButton.click()

            await expect(page.getByText(TITLE_EMPLOYEES)).toBeVisible({ timeout: 20000 });
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();

            await (page.getByText(FAKER_EMAIL_FIRST)).click();

            await expect(page.getByText(TEXT_EDIT_SUPPORT)).toBeVisible();

            await companyPage.deleteUserButton.click();
            await companyPage.submitButton.click();

            await expect(page.getByText(TITLE_EMPLOYEES)).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
    });

});