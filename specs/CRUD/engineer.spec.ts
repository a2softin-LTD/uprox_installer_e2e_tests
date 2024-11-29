import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { CORP_ADMIN, MONITORING_SERVICE_COMPANY_1 } from "../../utils/user_data";
import {
    COMPANY_FOURTH, FAKER_EMAIL_FIRST, FAKER_PHONE_FIRST,
    ROLE_ENGINEER, TEXT_ADD_EMPLOYEE, TEXT_EDIT_EMPLOYEE,
    TITLE_EMPLOYEES, URL_PANELS, URL_PROFILE_COMPANIES,
    USER_NAME_NEW
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

    test('Creation of ENGINEER under the Role = MONITORING_SERVICE_COMPANY_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atxk3"
            });

            await loginPage.auth(MONITORING_SERVICE_COMPANY_1);

            await expect(page).toHaveURL(URL_PANELS);

            await companyPage.employees.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible();

            await companyPage.addButton.click();

            await expect(page.getByText(TEXT_ADD_EMPLOYEE)).toBeVisible({ timeout: 10000 });

            await companyPage.employeeEmailField.fill(FAKER_EMAIL_FIRST);
            await companyPage.employeeNameField.fill(USER_NAME_NEW);
            await companyPage.employeePhoneField.fill(FAKER_PHONE_FIRST);
            await companyPage.employeeRoleField.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(ROLE_ENGINEER).click();
            await companyPage.addButton.click();

            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();

            await page.getByText(FAKER_EMAIL_FIRST).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.employeeDeleteManager.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
    });

    test.skip('Creation of ENGINEER under the Role = CORP_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atyg8"
            });

            await loginPage.auth(CORP_ADMIN);

            await expect(page).toHaveURL(URL_PROFILE_COMPANIES);
            await expect(page.getByText(COMPANY_FOURTH)).toBeVisible();

            await (page.getByText(COMPANY_FOURTH)).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.employees.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible();

            await companyPage.addButton.click();

            await expect(page.getByText(TEXT_ADD_EMPLOYEE)).toBeVisible();

            await companyPage.employeeEmailField.fill(FAKER_EMAIL_FIRST);
            await companyPage.employeeNameField.fill(USER_NAME_NEW);
            await companyPage.employeePhoneField.fill(FAKER_PHONE_FIRST);
            await companyPage.employeeRoleField.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(ROLE_ENGINEER).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.addButton.click();

            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();

            await page.getByText(FAKER_EMAIL_FIRST).click();

            await expect(page.getByText(TEXT_EDIT_EMPLOYEE)).toBeVisible();

            await companyPage.employeeDeleteManager.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
    });

});