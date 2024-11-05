import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {
    CABINET_FIRST, CABINET_SECOND,
    COMPANY_FIRST,
    COMPANY_SECOND,
    COMPANY_THIRD,
    COUNTRY_ALGERIA, COUNTRY_MOLDOVA, COUNTRY_MOLDOVA_SHORT,
    COUNTRY_UKRAINE,
    COUNTRY_UKRAINE_SHORT,
    DEALER_EMAIL_FIRST,
    DEALER_EMAIL_FIRST_SHORT,
    DEALER_EMAIL_SECOND,
    DEALER_EMAIL_SECOND_SHORT,
    EMAIL_NECESSARY_NAME_PART,
    FAKER_EMAIL_FIRST,
    FAKER_EMAIL_SECOND, FAKER_EMAIL_THIRD,
    FAKER_NAME_OF_COMPANY_FIRST,
    FAKER_PHONE_FIRST,
    ROLE_MONITORING_COMPANY,
    ROLE_SERVICE_COMPANIES, SELECTOR_FIFTH, SELECTOR_FOURTH,
    SETTINGS_BLOCKED,
    TEXT_ABSENT, TEXT_CHANGE_COMPANY_DEALER,
    TEXT_DISABLED,
    TEXT_ENABLED, TEXT_ENTER_THE_LINK,
    TEXT_NO,
    TEXT_SAVING_CHANGES,
    TEXT_SUCCESSFULLY,
    TEXT_TEST_DEALER_ROLE,
    TEXT_YES,
    TITLE_COMPANIES,
    TITLE_COMPANY_SETTINGS,
    URL_LOGIN,
    URL_SUPPORT_SEARCH
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('SuperAdmin page tests',() => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;
    let superAdminPage: SuperAdminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);
        superAdminPage = new SuperAdminPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL(URL_SUPPORT_SEARCH);
    });

    test('Checking UI elements on company page under SUPER_ADMIN role',
        { tag: ['@smoke', '@stable', '@superadmin']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await superAdminPage.companies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANIES)})).toBeVisible();
            await expect(companyPage.companyAddButton).toBeVisible();
            await expect(companyPage.companyCountryFilter).toBeVisible();
            await expect(companyPage.companyRoleFilter).toBeVisible();
            await expect(companyPage.companyAllFilter).toBeVisible();
            await expect(companyPage.companySearchField).toBeVisible();
            await expect(superAdminPage.applyButton).toBeVisible();
            await expect(companyPage.companySelectCommandField).toBeVisible();
            await expect(companyPage.actionsCheckbox).toBeVisible();
    });

    test.describe('Company list edit under SUPER_ADMIN role', () => {

        test('List of companies',
            { tag: ['@smoke', '@stable', '@superadmin']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40dv"
            });

            await superAdminPage.companies.click();

            await page.waitForTimeout(2000);

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANIES)})).toBeVisible();

            for (const company of await superAdminPage.entityBlock.all())
                await expect(company).toBeVisible();
            for (const hub of await superAdminPage.entityBlock.all())
            {await expect(hub.filter({has: superAdminPage.entityText})).toBeVisible();}

        });

        test.skip('Add company', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p407a"
            });

            await superAdminPage.companies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANIES)})).toBeVisible();

            await companyPage.companyAddButton.click();
            await superAdminPage.inputFirstField.fill(FAKER_NAME_OF_COMPANY_FIRST);
            await superAdminPage.inputSecondField.fill(FAKER_EMAIL_FIRST);
            await superAdminPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await superAdminPage.selectFirstField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await superAdminPage.selectSecondField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await superAdminPage.inputFourthField.fill(FAKER_EMAIL_SECOND);
            await superAdminPage.inputFifthField.fill(FAKER_PHONE_FIRST);
            await superAdminPage.inputSixthtField.fill(TEXT_NO);
            await superAdminPage.inputSeventhField.fill(TEXT_ABSENT);
            await superAdminPage.submitButton.click();

            await expect(page.getByText(FAKER_NAME_OF_COMPANY_FIRST)).toBeVisible();

            await page.getByText(FAKER_NAME_OF_COMPANY_FIRST).click();
            await companyPage.companyCloseButton.click();
            await page.getByText(COMPANY_FIRST).click();
            await superAdminPage.submitButton.click();

            await expect(page.getByText(FAKER_PHONE_FIRST)).not.toBeVisible();
        });

        test.skip('Delete company',{ tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40z1"
            });

            await superAdminPage.companies.click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANIES)})).toBeVisible();

            await companyPage.companyAddButton.click();
            await superAdminPage.inputFirstField.fill(FAKER_NAME_OF_COMPANY_FIRST);
            await superAdminPage.inputSecondField.fill(FAKER_EMAIL_FIRST);
            await superAdminPage.inputThirdField.fill(COUNTRY_UKRAINE_SHORT);
            await page.getByText(COUNTRY_UKRAINE).click();
            await superAdminPage.selectFirstField.click();
            await page.getByText(TEXT_TEST_DEALER_ROLE).click();
            await superAdminPage.selectSecondField.click();
            await page.getByText(ROLE_MONITORING_COMPANY).click();
            await superAdminPage.inputFourthField.fill(FAKER_EMAIL_SECOND);
            await superAdminPage.inputFifthField.fill(FAKER_PHONE_FIRST);
            await superAdminPage.inputSixthtField.fill(TEXT_NO);
            await superAdminPage.inputSeventhField.fill(TEXT_ABSENT);
            await superAdminPage.submitButton.click();

            await expect(page.getByText(FAKER_NAME_OF_COMPANY_FIRST)).toBeVisible();

            await page.getByText(FAKER_NAME_OF_COMPANY_FIRST).click();
            await companyPage.companyCloseButton.click();
            await page.getByText(COMPANY_FIRST).click();
            await superAdminPage.submitButton.click();

            await expect(page.getByText(FAKER_PHONE_FIRST)).not.toBeVisible();
        });

    });

    test.describe('Company search under SUPER_ADMIN role',{ tag: ['@smoke', '@stable', '@superadmin']},() => {

        test('Search by country', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p3ztg"
            });
            let count=0;

            await superAdminPage.companies.click();
            await page.waitForTimeout(5000);

            for (const hub of await superAdminPage.entityBlock.filter({hasText:COUNTRY_ALGERIA}).all())
            { await expect(hub).toBeVisible();
            count=count+1;}

            await companyPage.companyCountryFilter.click();
            await page.getByText(COUNTRY_ALGERIA,{ exact: true }).click();

            await page.waitForTimeout(2000);

            for (const hub of await superAdminPage.entityBlock.filter({hasText:COUNTRY_ALGERIA}).all())
            { await expect(hub).toBeVisible();}

            await expect(companyPage.employeeBlock).toHaveCount(count);
        });

        test('Search by role', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p3zwr"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(5000);
            let hubsNumber=((await page.$$(SELECTOR_FOURTH)).length)-1;
            await companyPage.companyRoleFilter.click();
            await page.getByText(ROLE_SERVICE_COMPANIES, { exact: true }).first().click();

            await page.waitForTimeout(2000);

            for (const hub of await superAdminPage.entityBlock.filter({hasText:ROLE_SERVICE_COMPANIES}).all())
            { await expect(hub).toBeVisible();}

            await expect(companyPage.employeeBlock).toHaveCount(hubsNumber);
        });


        test('Search by setting', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p404p"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(5000);
            let hubsNumber=((await page.$$(SELECTOR_FIFTH)).length);
            await companyPage.companyAllFilter.click();
            await page.getByText(SETTINGS_BLOCKED, { exact: true }).click();

            await page.waitForTimeout(2000);

            for (const hub of await superAdminPage.entityBlock.filter({has:superAdminPage.banIcon}).all())
            { await expect(hub).toBeVisible();}

            await expect(companyPage.employeeBlock).toHaveCount(hubsNumber);
        });

        test('Search by company name',{ tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p3zyz"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(5000);

            await expect(page.getByText(COMPANY_SECOND)).toBeVisible();

            await companyPage.companySearchField.fill(COMPANY_SECOND);

            await expect(page.getByText(COMPANY_SECOND)).toBeVisible();
            await expect(companyPage.employeeBlock).toHaveCount(1);
        });

    });

    test.describe('Company profile edit under SUPER_ADMIN role',  () => {

        test('Resending the letter', { tag: '@smoke'},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694phqe6"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(2000);
            await page.getByText(COMPANY_THIRD).click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await superAdminPage.resendEmailButton.click();
            await superAdminPage.sendButton.click();

            await expect(page.getByText(TEXT_SAVING_CHANGES)).toBeVisible();
            await expect(page.getByText(TEXT_SUCCESSFULLY)).toBeVisible();
        });

        test('Changing admin login', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694phr25"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(2000);
            await page.getByText(COMPANY_THIRD).click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyChangeAdminLogin.click();
            await superAdminPage.inputFirstField.fill(FAKER_EMAIL_THIRD);
            await superAdminPage.changeButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.reload();
            await page.waitForTimeout(2000);

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(FAKER_EMAIL_THIRD)).toBeVisible();
        });

        test('Another company settings editing under SUPER_ADMIN role', { tag: '@smoke'},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694phqe6"
            });

            await superAdminPage.companies.click();
            await page.waitForTimeout(2000);
            await page.getByText(COMPANY_THIRD).click();

            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            // COUNTRY

            await page.waitForTimeout(2000);

            if (await companyPage.companyCountry.filter({hasText:COUNTRY_MOLDOVA}).isVisible())
            {   await companyPage.companyCountry.click();
                await companyPage.inputField.clear();
                await companyPage.inputField.fill(COUNTRY_UKRAINE);
                await page.getByText(COUNTRY_UKRAINE, {exact: true}).click();
                await companyPage.submitButton.click();
                await expect(companyPage.companyCountry.filter({hasText:COUNTRY_UKRAINE})).toBeVisible();}

            await companyPage.companyCountry.click();
            await companyPage.inputField.clear();
            await companyPage.inputField.fill(COUNTRY_MOLDOVA_SHORT);
            await page.getByText(COUNTRY_MOLDOVA, {exact: true}).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            // USER CABINET

            await page.waitForTimeout(2000);
            if (await companyPage.companyUsersCabinet.filter({hasText:CABINET_SECOND}).isVisible()){
                await companyPage.companyUsersCabinet.click();
                await companyPage.inputFirstField.first().fill(CABINET_FIRST);
                await companyPage.submitButton.click();

                await expect(page.getByText(CABINET_FIRST)).toBeVisible();}

            await companyPage.companyUsersCabinet.click();

            await expect(page.getByText(TEXT_ENTER_THE_LINK)).toBeVisible();

            await companyPage.inputField.first().fill(CABINET_SECOND);
            await companyPage.submitButton.click();

            // DISPLAY IN ADVERTISING

            await page.waitForTimeout(2000);
            if (await companyPage.companyDisplayInAdvertising.filter({hasText:TEXT_YES}).isVisible())
            {   await companyPage.companyDisplayInAdvertising.click();
                await companyPage.noButton.click();
                await companyPage.submitButton.click();
                await expect(companyPage.companyDisplayInAdvertising.filter({hasText:TEXT_NO})).toBeVisible();}

            await companyPage.companyDisplayInAdvertising.click();
            await companyPage.yesButton.click();
            await companyPage.submitButton.click();

            await expect(companyPage.companyDisplayInAdvertising.filter({hasText:TEXT_YES})).toBeVisible();

            // AUTO PROCESSING

            await page.waitForTimeout(2000);
            if (await companyPage.companyAutoProcessingConAppl.filter({hasText:TEXT_ENABLED}).isVisible())
            {   await companyPage.companyAutoProcessingConAppl.click();
                await companyPage.disableButton.click();
                await companyPage.submitButton.click();
                await expect(companyPage.companyAutoProcessingConAppl.filter({hasText:TEXT_DISABLED})).toBeVisible();}

            await companyPage.companyAutoProcessingConAppl.click();
            await companyPage.enabledButton.click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            // PERMACONN

            await page.waitForTimeout(2000);
            if (await companyPage.companyPermaconn.filter({hasText:TEXT_ENABLED}).isVisible())
            {   await companyPage.companyPermaconn.click();
                await companyPage.disableButton.click();
                await companyPage.submitButton.click();
                await expect(companyPage.companyPermaconn.filter({hasText:TEXT_DISABLED})).toBeVisible();}

            await companyPage.companyPermaconn.click();
            await companyPage.enabledButton.click();
            await companyPage.submitButton.click();

            // DEALER

            await page.waitForTimeout(2000);
            if (await companyPage.companyDealer.filter({hasText:DEALER_EMAIL_SECOND_SHORT}).isVisible())
            {   await companyPage.companyDealer.click();
                await expect(page.getByText(TEXT_CHANGE_COMPANY_DEALER)).toBeVisible();
                await page.getByText(DEALER_EMAIL_FIRST).click();
                await companyPage.submitButton.click();
                await expect(companyPage.companyDealer.filter({hasText:DEALER_EMAIL_FIRST_SHORT})).toBeVisible();}

            await companyPage.companyDealer.click();

            await expect(page.getByText(TEXT_CHANGE_COMPANY_DEALER)).toBeVisible();

            await page.getByText(DEALER_EMAIL_SECOND).click();
            await companyPage.submitButton.click();


            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.companyCountry.filter({hasText:COUNTRY_MOLDOVA})).toBeVisible();
            await expect(companyPage.companyUsersCabinet.filter({hasText:CABINET_SECOND})).toBeVisible();
            await expect(companyPage.companyDisplayInAdvertising.filter({hasText:TEXT_YES})).toBeVisible();
            await expect(companyPage.companyAutoProcessingConAppl.filter({hasText:TEXT_ENABLED})).toBeVisible();
            await expect(companyPage.companyPermaconn.filter({hasText:TEXT_ENABLED})).toBeVisible();
            await expect(companyPage.companyDealer.filter({hasText:DEALER_EMAIL_SECOND_SHORT})).toBeVisible();

            await companyPage.companyCountry.click();
            await companyPage.inputField.fill(COUNTRY_UKRAINE);
            await page.getByText(COUNTRY_UKRAINE).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyUsersCabinet.click();

            await expect(page.getByText(TEXT_ENTER_THE_LINK)).toBeVisible();

            await companyPage.inputField.fill(CABINET_FIRST);
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyDisplayInAdvertising.click();
            await companyPage.noButton.click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyAutoProcessingConAppl.click();
            await companyPage.disableButton.click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyPermaconn.click();
            await companyPage.disableButton.click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyDealer.click();

            await expect(page.getByText(TEXT_CHANGE_COMPANY_DEALER)).toBeVisible();

            await page.getByText(DEALER_EMAIL_FIRST).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.companyCountry.filter({hasText:COUNTRY_UKRAINE})).toBeVisible();
            await expect(companyPage.companyUsersCabinet.filter({hasText:CABINET_FIRST})).toBeVisible();
            await expect(companyPage.companyDisplayInAdvertising.filter({hasText:TEXT_NO})).toBeVisible();
            await expect(companyPage.companyAutoProcessingConAppl.filter({hasText:TEXT_DISABLED})).toBeVisible();
            await expect(companyPage.companyPermaconn.filter({hasText:TEXT_DISABLED})).toBeVisible();
            await expect(companyPage.companyDealer.filter({hasText:DEALER_EMAIL_FIRST_SHORT})).toBeVisible();
        });

   });

});