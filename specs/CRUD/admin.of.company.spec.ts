import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SUPER_ADMIN, SYSTEM_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {
    ADMIN_EMAIL,
    BUTTON_ADD_COMPANY,
    COUNTRY_UKRAINE,
    COUNTRY_UKRAINE_SHORT,
    EMAIL_NECESSARY_NAME_PART, FAKER_EMAIL_FIRST, FAKER_EMAIL_SECOND,
    FAKER_NAME_OF_COMPANY_FIRST, FAKER_NAME_OF_COMPANY_SECOND,
    FAKER_PHONE_FIRST,
    ROLE_MONITORING_COMPANY,
    TEXT_ABSENT,
    TEXT_NO,
    TEXT_TEST_DEALER_ROLE,
    TITLE_TECHNICAL_SUPPORT,
    URL_SUPPORT_SEARCH
} from "../../utils/constants";
import {CompanyPage} from "../../pages/company/CompanyPage";

test.describe('Company Page tests', () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
    });

    test.skip('Creation of the Security Company Admin under the Role = SYSTEM_ADMIN', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694att1n"
        });

        await loginPage.auth(SYSTEM_ADMIN);

        await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
        expect(page.url()).toContain(URL_SUPPORT_SEARCH);

        await companyPage.companies.click();

        await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

        await companyPage.companyAddButton.click();
        await companyPage.inputFirstField.fill(FAKER_NAME_OF_COMPANY_SECOND);
        await companyPage.inputSecondField.fill(FAKER_EMAIL_FIRST);
        await companyPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
        await page.getByText(COUNTRY_UKRAINE).click();
        await companyPage.selectFirstField.click();
        await page.getByText(TEXT_TEST_DEALER_ROLE).click();
        await companyPage.selectSecondField.click();
        await page.getByText(ROLE_MONITORING_COMPANY).click();
        await companyPage.inputFourthField.fill(FAKER_EMAIL_SECOND);
        await companyPage.inputFifthField.fill(FAKER_PHONE_FIRST);
        await companyPage.inputSixthtField.fill(TEXT_NO);
        await companyPage.inputSeventhField.fill(TEXT_ABSENT);
        await companyPage.submitButton.click();

        await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible({ timeout: 10000 });
        await expect(page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).toBeVisible();

        await (page.getByText(FAKER_NAME_OF_COMPANY_SECOND)).click();

        await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();
    });

    test.skip('Creation of the Security Company Admin under the Role = SUPER_ADMIN)', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694att1n"
        });

        const contactEmail: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });


        await loginPage.auth(SUPER_ADMIN);

        await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();
        expect(page.url()).toContain(URL_SUPPORT_SEARCH);

        await companyPage.companies.click();

        await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible();

        await companyPage.companyAddButton.click();
        await companyPage.inputFirstField.fill(FAKER_NAME_OF_COMPANY_FIRST);
        await companyPage.inputSecondField.fill(ADMIN_EMAIL);
        await companyPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
        await page.getByText(COUNTRY_UKRAINE).click();
        await companyPage.selectFirstField.click();
        await page.getByText(TEXT_TEST_DEALER_ROLE).click();
        await companyPage.selectSecondField.click();
        await page.getByText(ROLE_MONITORING_COMPANY).click();
        await companyPage.inputFourthField.fill(contactEmail);
        await companyPage.inputFifthField.fill(FAKER_PHONE_FIRST);
        await companyPage.inputSixthtField.fill(TEXT_NO);
        await companyPage.inputSeventhField.fill(TEXT_ABSENT);
        await companyPage.submitButton.click();

        await expect(page.getByText(BUTTON_ADD_COMPANY)).toBeVisible({ timeout: 10000 });
        await expect(page.getByText(FAKER_NAME_OF_COMPANY_FIRST)).toBeVisible();

        await (page.getByText(FAKER_NAME_OF_COMPANY_FIRST)).click();

        await expect(page.getByText(ADMIN_EMAIL)).toBeVisible();
    });

});