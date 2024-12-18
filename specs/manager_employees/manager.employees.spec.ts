import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { MANAGER_1 } from "../../utils/user_data";
import {
    DEALER_1_NAME_NEW, DEALER_EMAIL_FIRST_SHORT,
    EMPLOYEE_EMAIL, EMPLOYEE_NAME,
    TITLE_EMPLOYEES, URL_LOGIN,  URL_PROFILE_PANELS, USER_NAME, USER_NAME_NEW
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
        await loginPage.auth(MANAGER_1);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);

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

    test('Checking UI elements on the employee page under MANAGER role', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(companyPage.pageTitle.filter({has: page.getByText(TITLE_EMPLOYEES)})).toBeVisible();
        await expect(companyPage.employeeSearchField).toBeVisible();
    });


    test('Employee search under MANAGER role', { tag: ['@smoke', '@problem']} , async ({ page }) => {
        test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/86973zxwd"
            });

        await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();
        await expect(page.getByText(EMPLOYEE_NAME)).toBeVisible();

        await companyPage.employeeSearchField.fill(EMPLOYEE_NAME);

        await expect(page.getByText(EMPLOYEE_NAME)).toBeVisible();
        await expect(companyPage.employeeBlock).toHaveCount(1);

        await page.waitForTimeout(2000);

        await companyPage.employeeSearchField.fill(DEALER_1_NAME_NEW);

        await expect(page.getByText(DEALER_1_NAME_NEW)).not.toBeVisible();
        await expect(companyPage.employeeBlock).toHaveCount(0);

        await page.waitForTimeout(2000);

        await companyPage.employeeSearchField.fill(EMPLOYEE_EMAIL);

        await expect(page.getByText(EMPLOYEE_EMAIL)).toBeVisible();
        await expect(companyPage.employeeBlock).toHaveCount(1);

        await page.waitForTimeout(2000);

        await companyPage.employeeSearchField.fill(DEALER_EMAIL_FIRST_SHORT);

        await expect(page.getByText(DEALER_EMAIL_FIRST_SHORT)).not.toBeVisible();
        await expect(companyPage.employeeBlock).toHaveCount(0);

    });

});
