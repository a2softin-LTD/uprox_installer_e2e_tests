import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {
    SUPER_ADMIN,
    CORP_ADMIN,
    SYSTEM_ADMIN,
    INSTALLER,
    SUPPORT,
    MIXED,
    MONITORING_SERVICE_COMPANY_1,
    MONITORING_SERVICE_COMPANY_2,
    MONITORING_COMPANY,
    ENGINEER,
    USER_1,
    USER_2,
     } from "../../utils/roles";

test.describe('Login Page tests', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
    });

    test.describe('Checking UI elements of the Page', () => {

        test('Checking UI elements on the Login Page', async () => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await expect(loginPage.logo).toBeVisible();
            await expect(loginPage.languagesList).toBeVisible();
            await expect(loginPage.emailField).toBeVisible();
            await expect(loginPage.passwordField).toBeVisible();
            await expect(loginPage.passwordEye).toBeVisible();
            await expect(loginPage.forgotYourPasswordLink).toBeVisible();
            await expect(loginPage.registerLink).toBeVisible();
            await expect(loginPage.loginButton).toBeVisible();
            await expect(loginPage.privacyPolicyLink).toBeVisible();
            await expect(loginPage.termsOfServiceLink).toBeVisible();
        });
    });

    test.describe('Checking authorization with different roles', () => {

        test('Checking auth with Role = SUPER_ADMIN', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(SUPER_ADMIN);
            await expect(page).toHaveURL('/support/search');
        });

        test('Checking auth with Role = CORP_ADMIN', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(CORP_ADMIN);
            await expect(page).toHaveURL('/profile/companies');
        });

        test('Checking auth with Role = SYSTEM_ADMIN', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(SYSTEM_ADMIN);
            await expect(page).toHaveURL('/support/search');
        });

        test('Checking auth with Role = INSTALLER', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(INSTALLER);
            await expect(page).toHaveURL('/panels');
        });

        test('Checking auth with Role = SUPPORT', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(SUPPORT);
            await expect(page).toHaveURL('/panels');
        });

        test('Checking auth with Role = MIXED', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(MIXED);
            await expect(page).toHaveURL('/panels');
        });

        test('Checking auth with Role = MONITORING_SERVICE_COMPANY_1', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
            await expect(page).toHaveURL('/panels');
        });

        test('Checking auth with Role = MONITORING_SERVICE_COMPANY_2', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(MONITORING_SERVICE_COMPANY_2);
            await expect(page).toHaveURL('/panels');
        });

        test('Checking auth with Role = MONITORING_COMPANY', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(MONITORING_COMPANY);
            await expect(page).toHaveURL('/panels');
        });

        test('Checking auth with Role = ENGINEER', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(ENGINEER);
            await expect(page).toHaveURL('/profile/feedback');
        });

        test('Checking auth with Role = USER_1', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(USER_1);
            await expect(page).toHaveURL('/profile/panels');
        });

        test('Checking auth with Role = USER_2', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(USER_2);
            await expect(page).toHaveURL('/profile/panels');
        });
    });

});