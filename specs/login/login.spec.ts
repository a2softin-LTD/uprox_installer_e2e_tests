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
    MANAGER,
    INVALID_PASSWORD,
    INVALID_EMAIL_WITHOUT_AT,
    INVALID_EMAIL_WITHOUT_DOMAIN,
    UNKNOWN_EMAIL, INSTALLER_DACH, MIXED_DACH, MANAGER_DACH, MONITORING_COMPANY_DACH, ENGINEER_DACH, USER_DACH,
} from "../../utils/user_data";
import {
    UIErrorMessages,
    URL_PANELS, URL_PROFILE_COMPANIES,
    URL_PROFILE_FEEDBACK,
    URL_PROFILE_PANELS,
    URL_SUPPORT_SEARCH
} from "../../utils/constants";

test.describe('Login Page tests', {tag: '@stable'}, () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('/');
    });

    test.describe('Checking UI elements of the Page', () => {

        test('Checking UI elements on the Login Page', { tag: ['@smoke', '@smoke_dach'] }, async () => {
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

    test.describe('Checking authorization with different roles. Positive scenarios', () => {

        test('positive: Checking auth with Role = SUPER_ADMIN', { tag: ['@smoke', '@smoke_dach'] }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(SUPER_ADMIN);
            await expect(page).toHaveURL(URL_SUPPORT_SEARCH);
        });

        test('positive: Checking auth with Role = CORP_ADMIN', { tag: ['@smoke', '@smoke_dach'] }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(CORP_ADMIN);
            await expect(page).toHaveURL(URL_PROFILE_COMPANIES);
        });

        test('positive: Checking auth with Role = SYSTEM_ADMIN', { tag: ['@smoke', '@smoke_dach'] }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(SYSTEM_ADMIN);
            await expect(page).toHaveURL(URL_SUPPORT_SEARCH);
        });

        test('positive: Checking auth with Role = INSTALLER', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(INSTALLER);
            await expect(page).toHaveURL(URL_PANELS);
        });

        test.skip('positive: Checking auth with Role = INSTALLER_DACH', { tag: '@smoke_dach' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(INSTALLER_DACH);
            await expect(page).toHaveURL(URL_PANELS);
        });

        test('positive: Checking auth with Role = SUPPORT', { tag: ['@smoke', '@smoke_dach'] }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(SUPPORT);
            await expect(page).toHaveURL(URL_SUPPORT_SEARCH);
        });

        test('positive: Checking auth with Role = MIXED', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(MIXED);
            await expect(page).toHaveURL(URL_PANELS);
        });

        test.skip('positive: Checking auth with Role = MIXED_DACH', { tag: '@smoke_dach' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(MIXED_DACH);
            await expect(page).toHaveURL(URL_PANELS);
        });

        test('positive: Checking auth with Role = MANAGER', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(MANAGER);
            await expect(page).toHaveURL(URL_PROFILE_PANELS);
        });

        test.skip('positive: Checking auth with Role = MANAGER_DACH', { tag: '@smoke_dach' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(MANAGER_DACH);
            await expect(page).toHaveURL(URL_PROFILE_PANELS);
        });

        test('positive: Checking auth with Role = MONITORING_SERVICE_COMPANY_1', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
            await expect(page).toHaveURL(URL_PANELS);
        });

        test('positive: Checking auth with Role = MONITORING_SERVICE_COMPANY_2', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(MONITORING_SERVICE_COMPANY_2);
            await expect(page).toHaveURL(URL_PANELS);
        });

        test('positive: Checking auth with Role = MONITORING_COMPANY', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(MONITORING_COMPANY);
            await expect(page).toHaveURL(URL_PANELS);
        });

        test.skip('positive: Checking auth with Role = MONITORING_COMPANY_DACH', { tag: '@smoke_dach' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(MONITORING_COMPANY_DACH);
            await expect(page).toHaveURL(URL_PANELS);
        });

        test('positive: Checking auth with Role = ENGINEER', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(ENGINEER);
            await expect(page).toHaveURL(URL_PROFILE_FEEDBACK);
        });

        test.skip('positive: Checking auth with Role = ENGINEER_DACH', { tag: '@smoke_dach' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(ENGINEER_DACH);
            await expect(page).toHaveURL(URL_PROFILE_FEEDBACK);
        });

        test.skip('positive: Checking auth with Role = USER_DACH', { tag: '@smoke_dach' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(USER_DACH);
            await expect(page).toHaveURL(URL_PROFILE_PANELS);
        });

        test('positive: Checking auth with Role = USER_1', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(USER_1);
            await expect(page).toHaveURL(URL_PROFILE_PANELS);
        });

        test('positive: Checking auth with Role = USER_2', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await loginPage.auth(USER_2);
            await expect(page).toHaveURL(URL_PROFILE_PANELS);
        });
    });

    test.describe('Checking authorization. Other scenarios Positive scenarios', () => {

        test.skip('positive: Checking auth with included checkbox: Remember me', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/86946uqk8'
            });

            await loginPage.emailField.fill(USER_1['login']);
            await loginPage.passwordField.fill(USER_1['password']);
            await loginPage.rememberMeCheckbox.click();
            await loginPage.loginButton.click();
            await expect(page).toHaveURL(URL_PROFILE_PANELS);

            await page.close();
            loginPage = new LoginPage(page);
            await loginPage.openLoginPage('/');

            await expect(page).toHaveURL(URL_PROFILE_PANELS);
        });

    });

    test.describe('Checking authorization flow. Negative scenarios', () => {

        test('negative: Checking auth with UNKNOWN_EMAIL', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "clickUp_link",
                description: "https://app.clickup.com/t/86946uqk6"
            });

            await loginPage.auth(UNKNOWN_EMAIL);

            await expect(page.getByText(UIErrorMessages.WRONG_CREDENTIALS)).toBeVisible();
        });

        test('negative: Checking auth with INVALID_EMAIL (without @)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "clickUp_link",
                description: "https://app.clickup.com/t/86946uqk6"
            });

            await loginPage.emailField.fill(INVALID_EMAIL_WITHOUT_AT['login']);

            await expect(page.getByText(UIErrorMessages.INCORRECT_EMAIL_ADDRESS)).toBeVisible();
        });

        test('negative: Checking auth with INVALID_EMAIL (without domain)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "clickUp_link",
                description: "https://app.clickup.com/t/86946uqk6"
            });

            await loginPage.emailField.fill(INVALID_EMAIL_WITHOUT_DOMAIN['login']);

            await expect(page.getByText(UIErrorMessages.INCORRECT_EMAIL_ADDRESS)).toBeVisible();
        });

        test('negative: Checking auth with CLEARED_CREDENTIAL_FIELDS', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "clickUp_link",
                description: "https://app.clickup.com/t/86946uqk6"
            });

            await loginPage.emailField.fill(USER_1['login']);
            await loginPage.emailField.clear();
            await loginPage.passwordField.fill(USER_1['password']);
            await loginPage.passwordField.clear();
            await loginPage.loginButton.click();

            await expect(page.getByText(UIErrorMessages.REQUIRED_FIELD)).toHaveCount(2);
        });

        test('negative: Checking auth with EMPTY_CREDENTIAL_FIELDS', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "clickUp_link",
                description: "https://app.clickup.com/t/86946uqk6"
            });

            await loginPage.loginButton.click();

            await expect(loginPage.matWarn).toHaveCount(2);
        });

        test('negative: Checking auth with INVALID_PASSWORD', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/86946uqk6'
            });

            await loginPage.auth(INVALID_PASSWORD);

            await expect(page.getByText(UIErrorMessages.WRONG_CREDENTIALS)).toBeVisible();
        });

    });

});