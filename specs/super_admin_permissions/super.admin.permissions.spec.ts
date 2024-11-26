import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import {
    BLOCKING_SYSTEM_ADMIN, FAKER_EMAIL_FIRST,
    FAKER_NAME_OF_COMPANY_SECOND,
    ROLE_SUPPORT_ADMIN_BIG,
    ROLE_SYS_ADMIN_BIG,
    ROLE_SYS_ADMIN_SMALL,
    TEXT_ALL_ROLES,
    TEXT_BLOCK_EMPLOYEE,
    TEXT_YES,
    TITLE_EMPLOYEES,
    URL_LOGIN,
    URL_SUPPORT_SEARCH,
    USER_EMAIL_THIRD
} from "../../utils/constants";

test.describe('SuperAdmin page tests', { tag: ['@smoke', '@stable']},() => {

    let loginPage: LoginPage;
    let superAdminPage: SuperAdminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        superAdminPage = new SuperAdminPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL(URL_SUPPORT_SEARCH);
    });

    test('Checking UI elements of the permissions page under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await superAdminPage.permissions.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();
            await expect(superAdminPage.searchField).toBeVisible();
            await expect(superAdminPage.inputFirstField).toBeVisible();
            await expect(superAdminPage.selectFirstField.filter({has:page.getByText(TEXT_ALL_ROLES)})).toBeVisible();
            await expect(superAdminPage.addButton).toBeVisible();
    });

    test.describe('Permissions', () => {

        test('List of employees:', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694pw15y"
            });

            await superAdminPage.permissions.click();
            await page.waitForTimeout(2000);

            for (const employee of await superAdminPage.entityBlock.all())
                await expect(employee).toBeVisible();

            for (const hub of await superAdminPage.entityBlock.all())
                await expect(hub.filter({has: superAdminPage.entityText})).toBeVisible();

            for (const hub of await superAdminPage.entityBlock.all())
            {   await expect((hub.filter({hasText:ROLE_SUPPORT_ADMIN_BIG})).or (hub.filter({hasText:ROLE_SYS_ADMIN_BIG}))).toBeVisible();
                await expect(hub.filter({hasText:/.+@.+\..+/i})).toBeVisible();}
        });

        test('Employee: search by role', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/86968n2fh"
            });

            await superAdminPage.permissions.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();

            await superAdminPage.selectFirstField.click();
            await (page.getByText(ROLE_SYS_ADMIN_BIG)).first().click();

            await page.waitForTimeout(2000);

            for (const employee of await superAdminPage.entityBlock.all())
            {await expect(employee.filter({hasText:ROLE_SYS_ADMIN_BIG})).toBeVisible();}
        });

        test('Employee: search by email', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/86968n2me"
            });

            await superAdminPage.permissions.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();

            await superAdminPage.inputFirstField.fill(USER_EMAIL_THIRD);

            await page.waitForTimeout(2000);

            for (const employee of await superAdminPage.entityBlock.all())
            {await expect(employee.filter({hasText:USER_EMAIL_THIRD})).toBeVisible();}
        });

        test('Add employee', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694pw18d"
            });

            await superAdminPage.permissions.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();

            await superAdminPage.addButton.click();
            await superAdminPage.inputFirstField.fill(FAKER_EMAIL_FIRST);
            await superAdminPage.inputThirdField.fill(FAKER_NAME_OF_COMPANY_SECOND);
            await page.waitForTimeout(1000);
            await superAdminPage.selectFirstField.click();
            await page.waitForTimeout(1000);
            await (page.getByText(ROLE_SYS_ADMIN_SMALL)).click()
            await superAdminPage.addButton.click()

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:20000});
            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).toBeVisible();

            await (page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).click();
            await page.waitForTimeout(1000);
            await superAdminPage.deleteUserButton.click();
            await page.waitForTimeout(1000);
            await superAdminPage.submitButton.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:20000});
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
        });


        test('Delete employee', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694pw1d6"
            });

            await superAdminPage.permissions.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();

            await superAdminPage.addButton.click();
            await superAdminPage.inputFirstField.fill(FAKER_EMAIL_FIRST);
            await superAdminPage.inputThirdField.fill(FAKER_NAME_OF_COMPANY_SECOND);
            await page.waitForTimeout(1000);
            await superAdminPage.selectFirstField.click();
            await page.waitForTimeout(1000);
            await (page.getByText(ROLE_SYS_ADMIN_SMALL)).click()
            await superAdminPage.addButton.click()

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:20000});
            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).toBeVisible();

            await (page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).click();
            await page.waitForTimeout(1000);
            await superAdminPage.deleteUserButton.click();
            await page.waitForTimeout(1000);
            await superAdminPage.submitButton.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:20000});
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
        });

        test('Block employee', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694pw1d6"
            });

            await superAdminPage.permissions.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();

            await superAdminPage.addButton.click();
            await superAdminPage.inputFirstField.fill(FAKER_EMAIL_FIRST);
            await superAdminPage.inputThirdField.fill(FAKER_NAME_OF_COMPANY_SECOND);
            await page.waitForTimeout(1000);
            await superAdminPage.selectFirstField.click();
            await page.waitForTimeout(1000);
            await (page.getByText(ROLE_SYS_ADMIN_SMALL)).click();
            await superAdminPage.addButton.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:20000});
            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).toBeVisible();

            await (page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).click();
            await page.waitForTimeout(1000);
            await superAdminPage.employeeBlock.click();
            await expect(page.getByText(BLOCKING_SYSTEM_ADMIN)).toBeVisible();
            await (page.getByText(TEXT_YES)).click();
            await superAdminPage.saveButton.click();
            await expect(superAdminPage.employeeBlock.filter({has:page.getByText(TEXT_YES)})).toBeVisible({timeout:20000});

            await superAdminPage.deleteUserButton.click();
            await page.waitForTimeout(1000);
            await superAdminPage.submitButton.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:20000});
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
        });

        test('Remove permission', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694pw1gj"
            });

            await superAdminPage.permissions.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();

            await superAdminPage.addButton.click();
            await superAdminPage.inputFirstField.fill(FAKER_EMAIL_FIRST);
            await superAdminPage.inputThirdField.fill(FAKER_NAME_OF_COMPANY_SECOND);
            await superAdminPage.selectFirstField.click();
            await (page.getByText(ROLE_SYS_ADMIN_SMALL)).click();
            await superAdminPage.addButton.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:20000});

            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).toBeVisible();

            await (page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).click()

            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).toBeVisible();

            await superAdminPage.companyRemovePermissionButton.click();
            await superAdminPage.submitButton.click();
            await superAdminPage.backButton.click();

            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:20000});
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
        });
        test('Info about employee', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694pw1pu"
            });

            await superAdminPage.permissions.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible();

            await superAdminPage.addButton.click();
            await superAdminPage.inputFirstField.fill(FAKER_EMAIL_FIRST);
            await superAdminPage.inputThirdField.fill(FAKER_NAME_OF_COMPANY_SECOND);
            await superAdminPage.selectFirstField.click();
            await (page.getByText(ROLE_SYS_ADMIN_SMALL)).click()
            await superAdminPage.addButton.click()

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:20000});
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();

            await (page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).click()

            await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).toBeVisible();
            await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();
            await expect(page.getByText(ROLE_SYS_ADMIN_SMALL)).toBeVisible();
            await expect(superAdminPage.deleteUserButton).toBeVisible();
            await expect(superAdminPage.companyRemovePermissionButton).toBeVisible();

            await page.getByText(TEXT_BLOCK_EMPLOYEE).click();
            await superAdminPage.yesButton.click();
            await superAdminPage.saveButton.click();

            await expect(page.getByText(TEXT_YES)).toBeVisible();

            await superAdminPage.deleteUserButton.click();
            await superAdminPage.submitButton.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_EMPLOYEES)})).toBeVisible({timeout:20000});
            await expect(page.getByText(FAKER_EMAIL_FIRST)).not.toBeVisible();
        });

    });

});