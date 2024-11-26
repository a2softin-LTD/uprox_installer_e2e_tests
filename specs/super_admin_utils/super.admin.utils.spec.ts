import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import {
    COMPANY_MONITORING_SERVICE_EMAIL_FIRST,
    COUNTRY_CODE_EN_FIRST, COUNTRY_CODE_EN_SECOND,
    COUNTRY_CODE_FIRST,
    COUNTRY_CODE_RU_FIRST, COUNTRY_CODE_RU_SECOND,
    COUNTRY_CODE_UK_FIRST, COUNTRY_CODE_UK_SECOND,
    TEXT_ADD_EMAIL_TO_WHITELIST,
    TEXT_ADD_USER_TO_CAPTCHA__WHITELIST,
    TEXT_CHANGES_SAVED_SUCCESSFULLY,
    TEXT_CLEARING_CACHE,
    TEXT_CLEARING_CACHE_CONFIRMATION,
    TEXT_CREATE_COUNTRY,
    TEXT_DELETE_COUNTRY,
    TEXT_EDIT_COUNTRY,
    TEXT_LIST_OF_COUNTRIES,
    TEXT_PANEL_NODE_FIRST,
    TEXT_PANEL_NODE_SECOND,
    TEXT_REMOVE_USER_FROM_WHITELIST,
    TEXT_SEARCH_BY_EMAIL,
    TITLE_ACCOUNT_SERVER,
    TITLE_CAPTCHA_WHITE_LIST,
    TITLE_COUNTRY_CONTROL,
    URL_LOGIN,
    URL_SUPPORT_SEARCH,
    USER_EMAIL_SECOND
} from "../../utils/constants";

test.describe('SuperAdmin page tests', { tag: ['@smoke', '@stable', '@superadmin']},() => {

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

    test('Utils panel under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await superAdminPage.utils.click();

        await expect(superAdminPage.addCountryButton).toBeVisible();
        await expect(superAdminPage.utilsAddEmailToWhitelistButton).toBeVisible();
        await expect(superAdminPage.utilsExtractVersionButton).toBeVisible();
        await expect(page.getByText(TITLE_ACCOUNT_SERVER)).toBeVisible();
        await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();
        await expect(page.getByText(TITLE_CAPTCHA_WHITE_LIST)).toBeVisible();
        await expect(page.getByText(TEXT_PANEL_NODE_FIRST)).toBeVisible();
        await expect(page.getByText(TEXT_PANEL_NODE_SECOND)).toBeVisible();
        //await expect(page.getByText(TEXT_PANEL_NODE_THIRD)).toBeVisible();

        await (page.getByText(TITLE_ACCOUNT_SERVER)).click();

        await expect(page.getByText(TEXT_CLEARING_CACHE)).toBeVisible();
        await expect(superAdminPage.clearButton).toBeVisible();

    });

    test('Clearing the cache on the Account server', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694pyudd'
        });

        await superAdminPage.utils.click();
        await (page.getByText(TITLE_ACCOUNT_SERVER)).click();

        await expect(page.getByText(TEXT_CLEARING_CACHE)).toBeVisible();

        await superAdminPage.clearButton.click();

        await expect(page.getByText(TEXT_CLEARING_CACHE_CONFIRMATION)).toBeVisible();

        await superAdminPage.clearButton.click();

        await expect(page.getByText(TEXT_CHANGES_SAVED_SUCCESSFULLY)).toBeVisible();
    });

    test.describe('Captcha whitelist', () => {
        test('Captcha whitelist: email searching', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pyvf0'
            });

            await superAdminPage.utils.click();
            await (page.getByText(TITLE_CAPTCHA_WHITE_LIST)).click();

            await expect(page.getByText(TEXT_SEARCH_BY_EMAIL)).toBeVisible();

            await superAdminPage.inputFirstField.fill(COMPANY_MONITORING_SERVICE_EMAIL_FIRST);

            await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:COMPANY_MONITORING_SERVICE_EMAIL_FIRST})).toBeVisible();
            await expect(superAdminPage.utilsWhitelistEmailBlock).toHaveCount(1);
        });

        test('Captcha whitelist: add email', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pyvgf'
            });

            await superAdminPage.utils.click();
            await (page.getByText(TITLE_CAPTCHA_WHITE_LIST)).click();

            await expect(page.getByText(TEXT_SEARCH_BY_EMAIL)).toBeVisible();

            await page.waitForTimeout(2000);

            if (await page.getByText(USER_EMAIL_SECOND).isVisible()){
                await (superAdminPage.utilsWhitelistEmailBlock.filter({hasText: USER_EMAIL_SECOND})).locator(superAdminPage.trashIcon).click();
                await expect(page.getByText(TEXT_SEARCH_BY_EMAIL)).toBeVisible();

                await expect(page.getByText(TEXT_REMOVE_USER_FROM_WHITELIST)).toBeVisible();

                await superAdminPage.submitButton.click();

                await expect(page.getByText(TEXT_ADD_EMAIL_TO_WHITELIST)).toBeVisible();
                await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:USER_EMAIL_SECOND})).not.toBeVisible();
            }

            await superAdminPage.utilsAddEmailToWhitelistButton.click();

            await expect(page.getByText(TEXT_ADD_USER_TO_CAPTCHA__WHITELIST)).toBeVisible();

            await superAdminPage.inputField.fill(USER_EMAIL_SECOND);
            await superAdminPage.saveButton.click();

            await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:USER_EMAIL_SECOND})).toBeVisible();

            await (superAdminPage.utilsWhitelistEmailBlock.filter({hasText: USER_EMAIL_SECOND})).locator(superAdminPage.trashIcon).click();

            await expect(page.getByText(TEXT_REMOVE_USER_FROM_WHITELIST)).toBeVisible();

            await superAdminPage.submitButton.click();

            await expect(page.getByText(TEXT_SEARCH_BY_EMAIL)).toBeVisible();
            await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:USER_EMAIL_SECOND})).not.toBeVisible();
        });

        test('Captcha whitelist: delete email', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694qbjc1'
            });

            await superAdminPage.utils.click();
            await (page.getByText(TITLE_CAPTCHA_WHITE_LIST)).click();

            await expect(page.getByText(TEXT_SEARCH_BY_EMAIL)).toBeVisible();

            await page.waitForTimeout(2000);

            if (await page.getByText(USER_EMAIL_SECOND).isVisible()){
                await (superAdminPage.utilsWhitelistEmailBlock.filter({hasText: USER_EMAIL_SECOND})).locator(superAdminPage.trashIcon).click();
                await expect(page.getByText(TEXT_SEARCH_BY_EMAIL)).toBeVisible();

                await expect(page.getByText(TEXT_REMOVE_USER_FROM_WHITELIST)).toBeVisible();

                await superAdminPage.submitButton.click();

                await expect(page.getByText(TEXT_ADD_EMAIL_TO_WHITELIST)).toBeVisible();
                await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:USER_EMAIL_SECOND})).not.toBeVisible();
            }

            await superAdminPage.utilsAddEmailToWhitelistButton.click();

            await expect(page.getByText(TEXT_ADD_USER_TO_CAPTCHA__WHITELIST)).toBeVisible();

            await superAdminPage.inputField.fill(USER_EMAIL_SECOND);
            await superAdminPage.saveButton.click();

            await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:USER_EMAIL_SECOND})).toBeVisible();

            await (superAdminPage.utilsWhitelistEmailBlock.filter({hasText: USER_EMAIL_SECOND})).locator(superAdminPage.trashIcon).click();

            await expect(page.getByText(TEXT_REMOVE_USER_FROM_WHITELIST)).toBeVisible();

            await superAdminPage.submitButton.click();

            await expect(page.getByText(TEXT_SEARCH_BY_EMAIL)).toBeVisible();
            await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:USER_EMAIL_SECOND})).not.toBeVisible();
        });

    });

    test.describe('Country control', () => {

        test('Country control: add country', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/86966x7qf'
            });

            await superAdminPage.utils.click();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();

            await superAdminPage.addCountryButton.click();

            await expect(page.getByText(TEXT_CREATE_COUNTRY)).toBeVisible();

            await superAdminPage.inputFirstField.fill(COUNTRY_CODE_FIRST);
            await superAdminPage.inputSecondField.fill(COUNTRY_CODE_UK_FIRST);
            await superAdminPage.inputThirdField.fill(COUNTRY_CODE_EN_FIRST);
            await superAdminPage.inputFourthField.fill(COUNTRY_CODE_RU_FIRST);
            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:COUNTRY_CODE_FIRST})).toBeVisible();

            await (superAdminPage.rowBlock.filter({hasText: COUNTRY_CODE_FIRST})).locator(superAdminPage.trashIcon).click();

            await expect(page.getByText(TEXT_DELETE_COUNTRY, {exact:true})).toBeVisible();

            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:COUNTRY_CODE_FIRST})).not.toBeVisible();
        });

        test('Country control: delete country', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pyv1f'
            });

            await superAdminPage.utils.click();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();

            await superAdminPage.addCountryButton.click();

            await expect(page.getByText(TEXT_CREATE_COUNTRY)).toBeVisible();

            await superAdminPage.inputFirstField.fill(COUNTRY_CODE_FIRST);
            await superAdminPage.inputSecondField.fill(COUNTRY_CODE_UK_FIRST);
            await superAdminPage.inputThirdField.fill(COUNTRY_CODE_EN_FIRST);
            await superAdminPage.inputFourthField.fill(COUNTRY_CODE_RU_FIRST);
            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:COUNTRY_CODE_FIRST})).toBeVisible();

            await (superAdminPage.rowBlock.filter({hasText: COUNTRY_CODE_FIRST})).locator(superAdminPage.trashIcon).click();

            await expect(page.getByText(TEXT_DELETE_COUNTRY, {exact:true})).toBeVisible();

            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:COUNTRY_CODE_FIRST})).not.toBeVisible();
        });

        test('Country control: country editing', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pyuyj'
            });


            await superAdminPage.utils.click();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();

            await superAdminPage.addCountryButton.click();

            await expect(page.getByText(TEXT_CREATE_COUNTRY)).toBeVisible();

            await superAdminPage.inputFirstField.fill(COUNTRY_CODE_FIRST);
            await superAdminPage.inputSecondField.fill(COUNTRY_CODE_UK_FIRST);
            await superAdminPage.inputThirdField.fill(COUNTRY_CODE_EN_FIRST);
            await superAdminPage.inputFourthField.fill(COUNTRY_CODE_RU_FIRST);
            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:COUNTRY_CODE_FIRST})).toBeVisible();

            await page.waitForTimeout(3000);
           await (superAdminPage.rowBlock.filter({hasText:COUNTRY_CODE_FIRST})).locator(superAdminPage.editIcon).click({force:true});

            await expect(page.getByText(TEXT_EDIT_COUNTRY)).toBeVisible();

            await superAdminPage.inputSecondField.fill(COUNTRY_CODE_UK_SECOND);
            await superAdminPage.inputThirdField.fill(COUNTRY_CODE_EN_SECOND);
            await superAdminPage.inputFourthField.fill(COUNTRY_CODE_RU_SECOND);
            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:COUNTRY_CODE_EN_SECOND})).toBeVisible();

            await (superAdminPage.rowBlock.filter({hasText: COUNTRY_CODE_FIRST})).locator(superAdminPage.trashIcon).click();

            await expect(page.getByText(TEXT_DELETE_COUNTRY, {exact:true})).toBeVisible();

            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:COUNTRY_CODE_FIRST})).not.toBeVisible();
        });

    });

});