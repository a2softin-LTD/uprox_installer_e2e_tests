import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { CompanyPage } from "../../pages/company/CompanyPage";
import {
    ADMIN_EMAIL,
    BUTTON_ADD_COMPANY,
    COUNTRY_UKRAINE,
    COUNTRY_UKRAINE_SHORT, FAKER_EMAIL_FIFTH,
    FAKER_EMAIL_FOURTH,
    FAKER_NAME_OF_COMPANY_FIRST,
    FAKER_NAME_OF_COMPANY_SECOND, FAKER_PHONE_FIRST, ROLE_MONITORING_COMPANIES,
    ROLE_MONITORING_COMPANY,
    TEXT_ABSENT, TEXT_COUNTRY,
    TEXT_INTERNATIONAL,
    TEXT_NO, TEXT_REGION, TEXT_REQUIRED_FIELD,
    TEXT_TEST_DEALER_ROLE,
    URL_LOGIN,
    URL_SUPPORT_SEARCH
} from "../../utils/constants";

test.describe('Company Page tests', () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL(URL_SUPPORT_SEARCH);
    });

    test.describe('Create new monitoring company under the Role = SYSTEM_ADMIN ', () => {

        test('Create new monitoring company: verify Submit Button State', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f6g"
            });

            await companyPage.companies.click();

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

            await companyPage.companyAddButton.click();

            await expect(page.getByText(TEXT_COUNTRY)).toBeVisible();

            await companyPage.submitButton.click();

            await expect(page.getByText(TEXT_REQUIRED_FIELD).first()).toBeVisible();

            await companyPage.backButton.click();

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

            await companyPage.companyAddButton.click();

            await companyPage.inputSecondField.fill(FAKER_EMAIL_FOURTH);
            await companyPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();

            await companyPage.selectSecondField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await companyPage.selectThirdField.click();
            await page.getByText(ROLE_MONITORING_COMPANIES).click();

            await companyPage.submitButton.click();

            await expect(page.getByText(TEXT_REQUIRED_FIELD)).toBeVisible();




        });

        test.skip('Create new monitoring company with mandatory fields only', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f6k"
            });

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

            await companyPage.companyAddButton.click();
            await companyPage.inputFirstField.fill(FAKER_NAME_OF_COMPANY_FIRST);
            await companyPage.inputSecondField.fill(ADMIN_EMAIL);
            await companyPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await companyPage.selectFirstField.click();
            await page.getByText(TEXT_INTERNATIONAL).last().click();
            await companyPage.selectSecondField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await companyPage.selectThirdField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await companyPage.submitButton.click();

            await expect(page.getByText(FAKER_NAME_OF_COMPANY_FIRST)).toBeVisible();

            await (page.getByText(FAKER_NAME_OF_COMPANY_FIRST)).click();

            await expect(page.getByText(ADMIN_EMAIL)).toBeVisible();
        });

        test.skip('Create new monitoring company with optional fields', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f6n"
            });

            await companyPage.companies.click();

            await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

            await companyPage.companyAddButton.click();
            await companyPage.inputFirstField.fill(FAKER_NAME_OF_COMPANY_FIRST);
            await companyPage.inputSecondField.fill(ADMIN_EMAIL);
            await companyPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await companyPage.selectFirstField.click();
            await page.getByText(TEXT_INTERNATIONAL).click();
            await companyPage.selectSecondField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await companyPage.selectThirdField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await companyPage.inputFourthField.fill(FAKER_EMAIL_FOURTH);
            await companyPage.inputFifthField.fill(FAKER_PHONE_FIRST);
            await companyPage.inputSixthtField.fill(TEXT_NO);
            await companyPage.inputSeventhField.fill(TEXT_ABSENT);
            await companyPage.submitButton.click();

            await expect(page.getByText(FAKER_NAME_OF_COMPANY_FIRST)).toBeVisible();

            await (page.getByText(FAKER_NAME_OF_COMPANY_FIRST)).click();

            await expect(page.getByText(ADMIN_EMAIL)).toBeVisible();
        });

    });

});