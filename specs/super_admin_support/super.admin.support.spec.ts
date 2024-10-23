import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import {
    HUB_ACCOUNT_NAME,
    HUB_ACCOUNT_NAME_FULL,
    HUB_SERIAL_NUMBER_TRUE_FIRST,
    HUB_SERIAL_NUMBER_TRUE_SECOND,
    TEXT_SEARCH_FOR_ONE_OF_OPTIONS,
    TEXT_SEARCH_RESULT,
    TEXT_SHOW_CONFIGURATION,
    TITLE_PANEL_OR_SENSOR_SERIAL,
    TITLE_TECHNICAL_SUPPORT,
    USER_EMAIL_SECOND
} from "../../utils/constants";
import {CompanyPage} from "../../pages/company/CompanyPage";

test.describe('SuperAdmin page tests', { tag: ['@smoke', '@stable', '@superadmin']},() => {

    let loginPage: LoginPage;
    let superAdminPage: SuperAdminPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        superAdminPage = new SuperAdminPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });

    test('Checking UI elements of the support page under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
        await expect(page.getByText(TEXT_SEARCH_FOR_ONE_OF_OPTIONS)).toBeVisible();
        await expect(companyPage.companySearchByLogin).toBeVisible();
        await expect(companyPage.companySearchByNumber).toBeVisible();
        await expect(companyPage.companySearchByAccount).toBeVisible();
        await expect(superAdminPage.inputFirstField).toBeVisible();
        await expect(superAdminPage.searchButton).toBeVisible();
        await expect(page.getByText(TITLE_PANEL_OR_SENSOR_SERIAL)).toBeVisible();

    });

    test.describe('Search under SUPER_ADMIN role', () => {

        test('Search by login under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694py9mp"
            });

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();

            await companyPage.companySearchByLogin.click();
            await superAdminPage.inputFirstField.fill(USER_EMAIL_SECOND);
            await superAdminPage.searchButton.click();

            await expect(page.getByText(TEXT_SEARCH_RESULT)).toBeVisible();
        });

        test('Search by serial number under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694py9ch"
            });

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();

            await companyPage.companySearchByNumber.click();
            await superAdminPage.inputFirstField.fill(HUB_SERIAL_NUMBER_TRUE_FIRST);
            await superAdminPage.searchButton.click();

            await expect(page.getByText(TEXT_SHOW_CONFIGURATION)).toBeVisible();
        });

        test('Search by account under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694py97x"
            });

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();

            await companyPage.companySearchByAccount.click();
            await superAdminPage.inputFirstField.fill(HUB_ACCOUNT_NAME);
            await page.getByText(HUB_ACCOUNT_NAME_FULL).click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(HUB_SERIAL_NUMBER_TRUE_SECOND)).toBeVisible();
        });

    });

});