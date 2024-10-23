import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import * as path from "node:path";
import {
    TEXT_CHANGES_SAVED_SUCCESSFULLY, TEXT_CREATE_COUNTRY,
    TEXT_DELETE_COUNTRY, TEXT_EDIT_COUNTRY,
    TEXT_LIST_OF_COUNTRIES,
    TITLE_COUNTRY_CONTROL
} from "../../utils/constants";

test.describe('SuperAdmin page tests', () => {

    let loginPage: LoginPage;
    let superAdminPage: SuperAdminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        superAdminPage = new SuperAdminPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
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
        await expect(page.getByText('Account Server')).toBeVisible();
        await expect(page.getByText('Country control')).toBeVisible();
        await expect(page.getByText('Captcha white list')).toBeVisible();
        await expect(page.getByText('Panel Server Node: devpanel-1.maks.systems')).toBeVisible();
        await expect(page.getByText('Panel Server Node: devpanel-2.maks.systems')).toBeVisible();
        await expect(page.getByText('Panel Server Node: devpanel-3.maks.systems')).toBeVisible();

        await (page.getByText('Account Server')).click();

        await expect(page.getByText('Clearing the cache on the Account server')).toBeVisible();
        await expect(superAdminPage.clearButton).toBeVisible();

    });

    test('Clearing the cache on the Account server', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694pyudd'
        });

        await superAdminPage.utils.click();

        await (page.getByText('Account Server')).click();

        await expect(page.getByText('Clearing the cache on the Account server')).toBeVisible();
        await superAdminPage.clearButton.click();

        await expect(page.getByText('Are you sure you want to clear the cache on Account server?')).toBeVisible();
        await superAdminPage.clearButton.click();
        await expect(page.getByText(TEXT_CHANGES_SAVED_SUCCESSFULLY)).toBeVisible();
    });

    test.describe('Captcha whitelist', () => {
        test('Captcha whitelist: email searching', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pyvf0'
            });

            const email: string = "zajac@ukr.net";

            await superAdminPage.utils.click();
            await (page.getByText('Captcha white list')).click();

            await expect(page.getByText('Search by email')).toBeVisible();

            await superAdminPage.inputFirstField.fill(email);

            await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:email})).toBeVisible();
            await expect(superAdminPage.utilsWhitelistEmailBlock).toHaveCount(1);
        });

        test('Captcha whitelist: add email', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pyvgf'
            });

            const email: string = "d.pinchuk@itvsystems.com.ua";

            await superAdminPage.utils.click();
            await (page.getByText('Captcha white list')).click();

            await expect(page.getByText('Search by email')).toBeVisible();

            await page.waitForTimeout(2000);

            if (await page.getByText(email).isVisible()){
                await (superAdminPage.utilsWhitelistEmailBlock.filter({hasText: email})).locator(superAdminPage.trashIcon).click();
                await expect(page.getByText('Search by email')).toBeVisible();

                await expect(page.getByText('Remove user from whitelist?')).toBeVisible();

                await superAdminPage.submitButton.click();
                await expect(page.getByText('Add email to whitelist')).toBeVisible();
                await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:email})).not.toBeVisible();
            }

            await superAdminPage.utilsAddEmailToWhitelistButton.click();

            await expect(page.getByText('Add user to captcha white list')).toBeVisible();

            await superAdminPage.inputField.fill(email);
            await superAdminPage.saveButton.click();

            await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:email})).toBeVisible();

            await (superAdminPage.utilsWhitelistEmailBlock.filter({hasText: email})).locator(superAdminPage.trashIcon).click();

            await expect(page.getByText('Remove user from whitelist?')).toBeVisible();

            await superAdminPage.submitButton.click();

            await expect(page.getByText('Search by email')).toBeVisible();
            await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:email})).not.toBeVisible();
        });

        test('Captcha whitelist: delete email', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694qbjc1'
            });

            const email: string = "d.pinchuk@itvsystems.com.ua";

            await superAdminPage.utils.click();
            await (page.getByText('Captcha white list')).click();

            await expect(page.getByText('Search by email')).toBeVisible();

            await page.waitForTimeout(2000);

            if (await page.getByText(email).isVisible()){
                await (superAdminPage.utilsWhitelistEmailBlock.filter({hasText: email})).locator(superAdminPage.trashIcon).click();
                await expect(page.getByText('Search by email')).toBeVisible();

                await expect(page.getByText('Remove user from whitelist?')).toBeVisible();

                await superAdminPage.submitButton.click();
                await expect(page.getByText('Add email to whitelist')).toBeVisible();
                await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:email})).not.toBeVisible();
            }

            await superAdminPage.utilsAddEmailToWhitelistButton.click();

            await expect(page.getByText('Add user to captcha white list')).toBeVisible();

            await superAdminPage.inputField.fill(email);
            await superAdminPage.saveButton.click();

            await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:email})).toBeVisible();

            await (superAdminPage.utilsWhitelistEmailBlock.filter({hasText: email})).locator(superAdminPage.trashIcon).click();

            await expect(page.getByText('Remove user from whitelist?')).toBeVisible();

            await superAdminPage.submitButton.click();

            await expect(page.getByText('Search by email')).toBeVisible();
            await expect(superAdminPage.utilsWhitelistEmailBlock.filter({hasText:email})).not.toBeVisible();
        });

    });

    test.describe('Country control', () => {

        test('Country control: add country', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/86966x7qf'
            });

            const countryCode: string = "DD";
            const countryUK: string = "ddr";
            const countryEN: string = "dddr";
            const countryRU: string = "ddddr";

            await superAdminPage.utils.click();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();

            await superAdminPage.addCountryButton.click();

            await expect(page.getByText(TEXT_CREATE_COUNTRY)).toBeVisible();

            await superAdminPage.inputFirstField.fill(countryCode);
            await superAdminPage.inputSecondField.fill(countryUK);
            await superAdminPage.inputThirdField.fill(countryEN);
            await superAdminPage.inputFourthField.fill(countryRU);
            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:countryCode})).toBeVisible();

            await (superAdminPage.rowBlock.filter({hasText: countryCode})).locator(superAdminPage.trashIcon).click();

            await expect(page.getByText(TEXT_DELETE_COUNTRY, {exact:true})).toBeVisible();

            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:countryCode})).not.toBeVisible();
        });

        test('Country control: delete country', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pyv1f'
            });

            const countryCode: string = "DD";
            const countryUK: string = "ddr";
            const countryEN: string = "dddr";
            const countryRU: string = "ddddr";

            await superAdminPage.utils.click();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();

            await superAdminPage.addCountryButton.click();

            await expect(page.getByText(TEXT_CREATE_COUNTRY)).toBeVisible();

            await superAdminPage.inputFirstField.fill(countryCode);
            await superAdminPage.inputSecondField.fill(countryUK);
            await superAdminPage.inputThirdField.fill(countryEN);
            await superAdminPage.inputFourthField.fill(countryRU);
            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:countryCode})).toBeVisible();

            await (superAdminPage.rowBlock.filter({hasText: countryCode})).locator(superAdminPage.trashIcon).click();

            await expect(page.getByText(TEXT_DELETE_COUNTRY, {exact:true})).toBeVisible();

            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:countryCode})).not.toBeVisible();
        });

        test('Country control: country editing', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pyuyj'
            });

            const countryCode: string = "DD";
            const countryUK: string = "ddr";
            const countryEN: string = "dddr";
            const countryRU: string = "ddddr";

            const countryUKNew: string = "bbr";
            const countryENNew: string = "bbbr";
            const countryRUNew: string = "bbbbr";

            await superAdminPage.utils.click();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();

            await superAdminPage.addCountryButton.click();

            await expect(page.getByText(TEXT_CREATE_COUNTRY)).toBeVisible();

            await superAdminPage.inputFirstField.fill(countryCode);
            await superAdminPage.inputSecondField.fill(countryUK);
            await superAdminPage.inputThirdField.fill(countryEN);
            await superAdminPage.inputFourthField.fill(countryRU);
            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:countryCode})).toBeVisible();

            await page.waitForTimeout(3000);

           await (superAdminPage.rowBlock.filter({hasText:countryCode})).locator(superAdminPage.editIcon).click({force:true});

            await expect(page.getByText(TEXT_EDIT_COUNTRY)).toBeVisible();

            await superAdminPage.inputSecondField.fill(countryUKNew);
            await superAdminPage.inputThirdField.fill(countryENNew);
            await superAdminPage.inputFourthField.fill(countryRUNew);
            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:countryUKNew})).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:countryRUNew})).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:countryENNew})).toBeVisible();

            await (superAdminPage.rowBlock.filter({hasText: countryCode})).locator(superAdminPage.trashIcon).click();

            await expect(page.getByText(TEXT_DELETE_COUNTRY, {exact:true})).toBeVisible();

            await superAdminPage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COUNTRY_CONTROL)).toBeVisible();

            await (page.getByText(TITLE_COUNTRY_CONTROL)).click();

            await expect(page.getByText(TEXT_LIST_OF_COUNTRIES)).toBeVisible();
            await expect(superAdminPage.rowBlock.filter({hasText:countryCode})).not.toBeVisible();
        });

    });

});