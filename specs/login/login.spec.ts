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
    UNKNOWN_EMAIL,
} from "../../utils/user_data";
import { ENVIRONMENT, UIErrorMessages } from "../../utils/constants";

test.describe('Login Page tests', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage(ENVIRONMENT);
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

    test.describe('Checking authorization with different roles. Positive scenarios', () => {

        test('positive: Checking auth with Role = SUPER_ADMIN', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(SUPER_ADMIN);
            await expect(page).toHaveURL('/support/search');
        });

        test('positive: Checking auth with Role = CORP_ADMIN', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(CORP_ADMIN);
            await expect(page).toHaveURL('/profile/companies');
        });

        test('positive: Checking auth with Role = SYSTEM_ADMIN', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(SYSTEM_ADMIN);
            await expect(page).toHaveURL('/support/search');
        });

        test('positive: Checking auth with Role = INSTALLER', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(INSTALLER);
            await expect(page).toHaveURL('/panels');
        });

        test('positive: Checking auth with Role = SUPPORT', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(SUPPORT);
            await expect(page).toHaveURL('/support/search');
        });

        test('positive: Checking auth with Role = MIXED', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(MIXED);
            await expect(page).toHaveURL('/panels');
        });

        test('positive: Checking auth with Role = MANAGER', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(MANAGER);
            await expect(page).toHaveURL('/profile/panels');
        });

        test('positive: Checking auth with Role = MONITORING_SERVICE_COMPANY_1', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
            await expect(page).toHaveURL('/panels');
        });

        test('positive: Checking auth with Role = MONITORING_SERVICE_COMPANY_2', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(MONITORING_SERVICE_COMPANY_2);
            await expect(page).toHaveURL('/panels');
        });

        test('positive: Checking auth with Role = MONITORING_COMPANY', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(MONITORING_COMPANY);
            await expect(page).toHaveURL('/panels');
        });

        test('positive: Checking auth with Role = ENGINEER', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(ENGINEER);
            await expect(page).toHaveURL('/profile/feedback');
        });

        test('positive: Checking auth with Role = USER_1', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(USER_1);
            await expect(page).toHaveURL('/profile/panels');
        });

        test('positive: Checking auth with Role = USER_2', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await loginPage.auth(USER_2);
            await expect(page).toHaveURL('/profile/panels');
        });
    });

    test.describe('Checking authorization. Other scenarios Positive scenarios', () => {

        //TODO
        test.skip('positive: Checking auth with included checkbox: Remember me', async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/86946uqk8'
            });
            await loginPage.emailField.fill(USER_1['login']);
            await loginPage.passwordField.fill(USER_1['password']);
            await expect(page).toHaveURL('/support/search');
        });

    });

    test.describe('Checking authorization flow. Negative scenarios', () => {

        test('negative: Checking auth with UNKNOWN_EMAIL', async ({ page }) => {
            test.info().annotations.push({
                type: "clickUp_link",
                description: "https://app.clickup.com/t/86946uqk6"
            });
            await loginPage.auth(UNKNOWN_EMAIL);
            await expect(loginPage.findByText(UIErrorMessages.WRONG_CREDENTIALS)).toBeVisible();
        });

        test('negative: Checking auth with INVALID_EMAIL (without @)', async ({ page }) => {
            test.info().annotations.push({
                type: "clickUp_link",
                description: "https://app.clickup.com/t/86946uqk6"
            });
            await loginPage.emailField.fill(INVALID_EMAIL_WITHOUT_AT['login']);
            await expect(loginPage.findByText(UIErrorMessages.INCORRECT_EMAIL_ADDRESS)).toBeVisible();
        });

        test('negative: Checking auth with INVALID_EMAIL (without domain)', async ({ page }) => {
            test.info().annotations.push({
                type: "clickUp_link",
                description: "https://app.clickup.com/t/86946uqk6"
            });
            await loginPage.emailField.fill(INVALID_EMAIL_WITHOUT_DOMAIN['login']);
            await expect(loginPage.findByText(UIErrorMessages.INCORRECT_EMAIL_ADDRESS)).toBeVisible();
        });

        test('negative: Checking auth with CLEARED_CREDENTIAL_FIELDS', async ({ page }) => {
            test.info().annotations.push({
                type: "clickUp_link",
                description: "https://app.clickup.com/t/86946uqk6"
            });
            await loginPage.emailField.fill(USER_1['login']);
            await loginPage.emailField.clear();
            await loginPage.passwordField.fill(USER_1['password']);
            await loginPage.passwordField.clear();
            await loginPage.loginButton.click();
            await expect(loginPage.findByText(UIErrorMessages.REQUIRED_FIELD)).toHaveCount(2);
        });

        test('negative: Checking auth with EMPTY_CREDENTIAL_FIELDS', async ({ page }) => {
            test.info().annotations.push({
                type: "clickUp_link",
                description: "https://app.clickup.com/t/86946uqk6"
            });
            await loginPage.loginButton.click();
            await expect(loginPage.matWarn).toHaveCount(2);
        });

        test('negative: Checking auth with INVALID_PASSWORD', async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/86946uqk6'
            });
            await loginPage.auth(INVALID_PASSWORD);
            await expect(loginPage.findByText(UIErrorMessages.WRONG_CREDENTIALS)).toBeVisible();
        });

    });

});