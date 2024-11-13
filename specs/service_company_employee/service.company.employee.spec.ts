import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {MONITORING_SERVICE_COMPANY_1, SERVICE_COMPANY_1} from "../../utils/user_data";
import {
    FAKER_EMAIL_FIRST, FAKER_PHONE_FIRST, FAKER_PHONE_SECOND,
    ROLE_MANAGER,
    SETTINGS_ENABLE,
    TEXT_BLOCK_EMPLOYEE, TEXT_CONFIGURING_PANELS,
    TEXT_EDIT_EMPLOYEE, TEXT_FULL_NAME,
    TEXT_PHONE,
    TEXT_YES,
    TITLE_EMPLOYEES, URL_LOGIN, URL_PANELS,
    USER_NAME,
    USER_NAME_NEW,
    USER_NAME_OLD
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company Page tests', () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(SERVICE_COMPANY_1);
        await expect(page).toHaveURL(URL_PANELS);

        await companyPage.employees.click();

        await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();

        await page.waitForTimeout(2000);

        for (const employee of await (companyPage.entityBlock.filter({hasText: USER_NAME})).all())
        {   await employee.click();
            await page.waitForTimeout(2000);
            await companyPage.employeeDeleteManager.click();
            await companyPage.deleteButton.click();
            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();}

        for (const employee of await (companyPage.entityBlock.filter({hasText: USER_NAME_NEW})).all())
        {   await employee.click();
            await page.waitForTimeout(2000);
            await companyPage.employeeDeleteManager.click();
            await companyPage.deleteButton.click();
            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();}
    });

    test('Checking UI elements on the employee page', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(companyPage.pageTitle.filter({has: page.getByText(TITLE_EMPLOYEES)})).toBeVisible();
        await expect(companyPage.addButton).toBeVisible();
        await expect(companyPage.employeeSearchField).toBeVisible();
    });

    test.describe('Employees: service company', () => {

        test('Add employee: service company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rju80"
            });

            await companyPage.addButton.click();
            await companyPage.employeeEmailField.fill(FAKER_EMAIL_FIRST);
            await companyPage.employeeNameField.fill(USER_NAME);
            await companyPage.employeePhoneField.fill(FAKER_PHONE_FIRST);
            await companyPage.employeeRoleField.click();
            await page.getByText(ROLE_MANAGER).click();
            await companyPage.addButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:15000});
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();

            await page.getByText(FAKER_EMAIL_FIRST).click();
            await companyPage.employeeDeleteManager.click();
            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:5000});

            await companyPage.panels.click();
            await companyPage.employees.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
        });

        test('Delete employee: service company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694v0c04"
            });

            await companyPage.addButton.click();
            await companyPage.employeeEmailField.fill(FAKER_EMAIL_FIRST);
            await companyPage.employeeNameField.fill(USER_NAME);
            await companyPage.employeePhoneField.fill(FAKER_PHONE_FIRST);
            await companyPage.employeeRoleField.click();
            await page.getByText(ROLE_MANAGER).click();
            await companyPage.addButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:15000});
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();

            await page.getByText(FAKER_EMAIL_FIRST).click();
            await companyPage.employeeDeleteManager.click();
            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:5000});

            await companyPage.panels.click();
            await companyPage.employees.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
        });

        test('Employee data editing: service company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rju83"
            });

            await companyPage.addButton.click();
            await companyPage.employeeEmailField.fill(FAKER_EMAIL_FIRST);
            await companyPage.employeeNameField.fill(USER_NAME_OLD);
            await companyPage.employeePhoneField.fill(FAKER_PHONE_FIRST);
            await companyPage.employeeRoleField.click();
            await page.getByText(ROLE_MANAGER).click();
            await companyPage.addButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:15000});
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();

            await page.getByText(FAKER_EMAIL_FIRST).click();
            await page.getByText(TEXT_FULL_NAME).click();
            await companyPage.inputFirstField.fill(USER_NAME_NEW);
            await companyPage.saveButton.click();
            await page.getByText(TEXT_PHONE).click();
            await companyPage.inputFirstField.fill(FAKER_PHONE_SECOND);
            await companyPage.saveButton.click();
            await page.getByText(TEXT_CONFIGURING_PANELS).click();
            await companyPage.enabledButton.click();
            await companyPage.saveButton.click()
            await page.getByText(TEXT_BLOCK_EMPLOYEE).click();
            await companyPage.yesButton.click();
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TEXT_EDIT_EMPLOYEE)})).toBeVisible({timeout:15000});
            await expect(page.getByText(USER_NAME_NEW)).toBeVisible();
            await expect(page.getByText(SETTINGS_ENABLE)).toBeVisible();
            await expect(page.getByText(TEXT_YES)).toBeVisible();

            await companyPage.employeeDeleteManager.click();
            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:5000});

            await companyPage.panels.click();
            await companyPage.employees.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();
            await expect(page.getByText(USER_NAME_NEW,{ exact: true })).not.toBeVisible();

        });

        test('Employee search: service company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rju7u"
            });

            await companyPage.addButton.click();
            await companyPage.employeeEmailField.fill(FAKER_EMAIL_FIRST);
            await companyPage.employeeNameField.fill(USER_NAME_NEW);
            await companyPage.employeePhoneField.fill(FAKER_PHONE_FIRST);
            await companyPage.employeeRoleField.click();
            await page.getByText(ROLE_MANAGER).click();
            await companyPage.addButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:15000});
            await expect(page.getByText(USER_NAME_NEW)).toBeVisible();

            await companyPage.employeeSearchField.fill(USER_NAME_NEW);

            await expect(page.getByText(USER_NAME_NEW)).toBeVisible();
            await expect(companyPage.employeeBlock).toHaveCount(1);

            await companyPage.employeeSearchField.fill(FAKER_EMAIL_FIRST);

            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();
            await expect(companyPage.employeeBlock).toHaveCount(1);

            await page.getByText(USER_NAME_NEW).click();
            await companyPage.employeeDeleteManager.click();
            await companyPage.deleteButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:5000});
            await expect(page.getByText(USER_NAME_NEW,{ exact: true })).not.toBeVisible();
        });

    });

});