import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { CORP_ADMIN, MONITORING_SERVICE_COMPANY_1 } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {
    COMPANY_FOURTH,
    EMAIL_NECESSARY_NAME_PART, ROLE_MANAGER,
    TEXT_ADD_EMPLOYEE,
    TEXT_EDIT_EMPLOYEE,
    TITLE_EMPLOYEES, USER_NAME_NEW
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company Page tests', () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
    });

    test('Creation of MANAGER under the Role = MONITORING_SERVICE_COMPANY_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atxk3"
            });

            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const phone: string = faker.phone.number();

            await loginPage.auth(MONITORING_SERVICE_COMPANY_1);

            await expect(page).toHaveURL('/panels');

            await companyPage.employees.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible();

            await companyPage.addButton.click();

            await expect(page.getByText(TEXT_ADD_EMPLOYEE)).toBeVisible({ timeout: 10000 });

            await companyPage.employeeEmailField.fill(email);
            await companyPage.employeeNameField.fill(USER_NAME_NEW);
            await companyPage.employeePhoneField.fill(phone);
            await companyPage.employeeRoleField.click();
            await page.getByText(ROLE_MANAGER).click();
            await companyPage.addButton.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(email)).toBeVisible();

            await page.getByText(email).click();
            await companyPage.employeeDeleteManager.click();
            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(email)).not.toBeVisible();
    });

    test.skip('Creation of MANAGER under the Role = CORP_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atyg8"
            });

            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const phone: string = faker.phone.number();

            await loginPage.auth(CORP_ADMIN);

            await expect(page).toHaveURL('/profile/companies');
            await expect(page.getByText(COMPANY_FOURTH)).toBeVisible();

            await (page.getByText(COMPANY_FOURTH)).click();
            await companyPage.employees.click();
            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible({ timeout: 10000 });
            await companyPage.addButton.click();

            await expect(page.getByText(TEXT_ADD_EMPLOYEE)).toBeVisible();

            await companyPage.employeeEmailField.fill(email);
            await companyPage.employeeNameField.fill(USER_NAME_NEW);
            await companyPage.employeePhoneField.fill(phone);
            await companyPage.employeeRoleField.click();
            await page.getByText(ROLE_MANAGER).click();
            await companyPage.addButton.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(email)).toBeVisible();

            await page.getByText(email).click();

            await expect(page.getByText(TEXT_EDIT_EMPLOYEE)).toBeVisible();

            await companyPage.employeeDeleteManager.click();
            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({hasText:TITLE_EMPLOYEES})).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(email)).not.toBeVisible();
    });

});