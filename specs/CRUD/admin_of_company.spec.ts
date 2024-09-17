import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SupportHeaderPage } from "../../pages/support/SupportHeaderPage";
import { CompanyManagement } from "../../pages/support/companyManagement/SupportHeaderPage";
import {
    SYSTEM_ADMIN,
} from "../../utils/user_data";

test.describe('Login Page tests', () => {

    let loginPage: LoginPage;
    let supportHeaderPage: SupportHeaderPage;
    let companyManagementPage: CompanyManagement;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test.describe('Checking UI elements of the page', () => {

        test('Checking UI elements on the Login Page', async () => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694att1n"
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

    test.describe('Creation of the Security Company Admin under the System Admin account. Positive scenarios', () => {

        test('positive: CCreation of the Security Company Administrator under the Role = SYSTEM_ADMIN', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694att1n"
            });
            supportHeaderPage = new SupportHeaderPage(page);
            companyManagementPage = new CompanyManagement(page);

            await loginPage.auth(SYSTEM_ADMIN);
            await expect(page).toHaveURL('/support/search');
            await supportHeaderPage.companiesMenuItem.click();
            await companyManagementPage.addCompanyButton.click();
            console.log();

        });
    });

    test.describe('Creation of the Security Company Admin under the System Admin account. Negative scenarios', () => {

    });

});