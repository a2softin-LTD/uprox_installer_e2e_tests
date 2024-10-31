import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import {
    COMPANY_FIFTH,
    HUB_NAME_FIRST,
    HUB_SERIAL_NUMBER_TRUE_THIRD,
    LANGUAGE_FRENCH,
    LANGUAGE_FRENCH_UKR,
    LANGUAGE_GREEK,
    LANGUAGE_GREEK_UKR,
    TEXT_EDIT_PUSH_TEMPLATE,
    TEXT_EDIT_TEMPLATE, TEXT_EMAIL_TEMPLATES_FAILURES,
    TEXT_LANGUAGE,
    TEXT_LANGUAGE_COUNT,
    TEXT_LETTER_TEMPLATES, TEXT_NO_LINK,
    TEXT_SEND_TO,
    TEXT_SUCCESSFULLY,
    TEXT_TEMPLATE_TYPE,
    TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES, TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES_,
    TEXT_TEST_EMAIL_SEND_SUCCESSFULLY,
    TITLE_PUSH_NOTIFICATIONS, URL_LOGIN, URL_SUPPORT_SEARCH, USER_EMAIL, USER_EMAIL_NON_REGISTERED, USER_EMAIL_SECOND
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

    test('Checking UI elements of the letter templates page', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await superAdminPage.letterTemplates.click();

            await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

            await superAdminPage.email.click();

            await expect(superAdminPage.selectFirstField).toBeVisible();
            await expect(superAdminPage.testEmailButton).toBeVisible();
            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TEXT_LETTER_TEMPLATES)})).toBeVisible();
            await expect(page.getByText(TEXT_TEMPLATE_TYPE)).toBeVisible();
            await expect(page.getByText(TEXT_LANGUAGE_COUNT)).toBeVisible();
            await expect(page.getByText(TEXT_LANGUAGE, {exact:true})).toBeVisible();
    });

    test('List of letter templates under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694pj3q7'
        });

        await superAdminPage.letterTemplates.click();

        await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

        await page.waitForTimeout(2000);

        for (const template of await superAdminPage.rowBlock.all())
        {await expect(template).toBeVisible();}

        for (const template of await superAdminPage.rowBlock.all())
        {await expect(template.filter({hasText: /[A-Z]/})).toBeVisible();}

        for (const template of await superAdminPage.rowBlock.all())
        {await expect(template.filter({hasText: /[a-z]/})).not.toBeVisible();}

        for (const template of await superAdminPage.rowBlock.all())
        {await expect(template.filter({hasText: /[0-9]/})).toBeVisible();}
    });

    test('Letter template under SUPER_ADMIN role', { tag: '@smoke', }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694pja78'
        });

        await superAdminPage.letterTemplates.click();

        await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

        await superAdminPage.rowBlock.first().click();

        await expect(page.getByText(TEXT_EDIT_TEMPLATE)).toBeVisible();
        await expect(superAdminPage.pushLetterTemplateTitle).toBeVisible();

        await page.waitForTimeout(2000);

        for (const localization of await superAdminPage.pushLetterLocalization.all())
        { await expect(localization).toBeVisible();}

        for (const parameter of await superAdminPage.letterParameters.all())
        { await expect(parameter).toBeVisible();}

        await expect(superAdminPage.inputFirstField).toBeVisible();
        await expect(superAdminPage.emailTestButton).toBeVisible();
        await expect(superAdminPage.letterPreview).toBeVisible();

        await superAdminPage.backButton.click();

        await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

        await page.waitForTimeout(3000);
        await superAdminPage.rowBlock.last().click();

        await expect(page.getByText(TEXT_EDIT_TEMPLATE)).toBeVisible();
        await expect(superAdminPage.pushLetterTemplateTitle).toBeVisible();

        for (const localization of await superAdminPage.pushLetterLocalization.all())
        { await expect(localization).toBeVisible();}

        for (const parameter of await superAdminPage.letterParameters.all())
        { await expect(parameter).toBeVisible();}

        await expect(superAdminPage.inputFirstField).toBeVisible();
        await expect(superAdminPage.emailTestButton).toBeVisible();
        await expect(superAdminPage.letterPreview).toBeVisible();
    });

    test.describe('Checking the availability of a letter template for a given language', () => {

        test('Positive: checking the availability of a letter template for a given language', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pj8r4'
            });

            await superAdminPage.letterTemplates.click();

            await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

            await superAdminPage.selectFirstField.click();
            await (page.getByText(LANGUAGE_FRENCH_UKR)).click();
            await superAdminPage.existEntity.first().click();

            await expect(page.getByText(TEXT_EDIT_TEMPLATE)).toBeVisible();
            await expect(page.getByText(LANGUAGE_FRENCH)).toBeVisible();
        });

        test('Negative: checking the availability of a letter template for a given language', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pj8r4'
            });

            await superAdminPage.letterTemplates.click();

            await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

            await superAdminPage.selectFirstField.click();
            await (page.getByText(LANGUAGE_GREEK_UKR)).click();
            await superAdminPage.notExistEntity.first().click();

            await expect(page.getByText(TEXT_EDIT_TEMPLATE)).toBeVisible();
            await expect(page.getByText(LANGUAGE_GREEK)).not.toBeVisible();
        });

    });

    test('Sending test letter under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694pjqj8'
        });
        await superAdminPage.letterTemplates.click();

        await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

        await (page.getByText(TEXT_EMAIL_TEMPLATES_FAILURES)).click();

        await expect(page.getByText(TEXT_EDIT_TEMPLATE)).toBeVisible();

        await superAdminPage.emailTestButton.click();

        await expect(page.getByText(TEXT_SEND_TO)).toBeVisible();

        await superAdminPage.emailTestField.first().fill(USER_EMAIL);
        await superAdminPage.emailTestField.last().fill(COMPANY_FIFTH);
        await superAdminPage.sendButton.click();

        await expect(page.getByText(TEXT_TEST_EMAIL_SEND_SUCCESSFULLY)).toBeVisible();
    });

    test('Checking UI elements of push notifications templates page', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

        await superAdminPage.letterTemplates.click();
        await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();
        await superAdminPage.push.click();

        await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_PUSH_NOTIFICATIONS)})).toBeVisible();
        await expect(superAdminPage.selectFirstField).toBeVisible();

        await expect(page.getByText(TEXT_TEMPLATE_TYPE)).toBeVisible();
        await expect(page.getByText(TEXT_LANGUAGE_COUNT)).toBeVisible();
        await expect(page.getByText(TEXT_LANGUAGE, {exact:true})).toBeVisible();
    });

    test('List of push notification templates under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694pj411'
        });

        await superAdminPage.letterTemplates.click();

        await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

        await superAdminPage.push.click();

        await expect(page.getByText(TITLE_PUSH_NOTIFICATIONS)).toBeVisible();

        await page.waitForTimeout(2000);

        for (const template of await superAdminPage.rowBlock.all())
            await expect(template).toBeVisible();

        for (const template of await superAdminPage.rowBlock.all())
        {await expect(template.filter({hasText: /[A-Z]/})).toBeVisible();}

        for (const template of await superAdminPage.rowBlock.all())
        {await expect(template.filter({hasText: /[a-z]/})).not.toBeVisible();}

        for (const template of await superAdminPage.rowBlock.all())
        {await expect(template.filter({hasText: /[0-9]/})).toBeVisible();}
    });

    test('Push notification template under SUPER_ADMIN role', { tag:'@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694pja1r'
        });

        await superAdminPage.letterTemplates.click();

        await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

        await superAdminPage.push.click();

        await expect(page.getByText(TITLE_PUSH_NOTIFICATIONS)).toBeVisible();

        await superAdminPage.rowBlock.first().click();

        await expect(page.getByText(TEXT_EDIT_PUSH_TEMPLATE)).toBeVisible();
        await expect(superAdminPage.pushLetterTemplateTitle).toBeVisible();

        for (const localization of await superAdminPage.pushLetterLocalization.all())
        { await expect(localization).toBeVisible();}

        await expect(superAdminPage.inputFirstField).toBeVisible();
        await expect(superAdminPage.inputSecondField).toBeVisible();
        await expect(superAdminPage.pushTestButton).toBeVisible();

        await superAdminPage.backButton.click();

        await expect(page.getByText(TITLE_PUSH_NOTIFICATIONS)).toBeVisible();

        await page.waitForTimeout(3000);
        await superAdminPage.rowBlock.last().click();

        await expect(page.getByText(TEXT_EDIT_PUSH_TEMPLATE)).toBeVisible();
        await expect(superAdminPage.pushLetterTemplateTitle).toBeVisible();

        for (const localization of await superAdminPage.pushLetterLocalization.all())
        { await expect(localization).toBeVisible();}

        await expect(superAdminPage.inputFirstField).toBeVisible();
        await expect(superAdminPage.inputSecondField).toBeVisible();
        await expect(superAdminPage.pushTestButton).toBeVisible();
    });

    test.describe('Checking the availability of a push notification for a given language  under SUPER_ADMIN role', () => {

        test('Positive: checking the availability of a push notification for a given language', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pj85z'
            });

            await superAdminPage.letterTemplates.click();

            await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

            await superAdminPage.push.click();

            await expect(page.getByText(TITLE_PUSH_NOTIFICATIONS)).toBeVisible();

            await superAdminPage.selectFirstField.click();
            await (page.getByText(LANGUAGE_FRENCH_UKR)).click();
            await superAdminPage.existEntity.first().click();

            await expect(page.getByText(TEXT_EDIT_PUSH_TEMPLATE)).toBeVisible();
            await expect(page.getByText(LANGUAGE_FRENCH)).toBeVisible();
        });

        test('Negative: checking the availability of a push notification for a given language', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pj85z'
            });

            await superAdminPage.letterTemplates.click();

            await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

            await superAdminPage.push.click();

            await expect(page.getByText(TITLE_PUSH_NOTIFICATIONS)).toBeVisible();

            await superAdminPage.selectFirstField.click();
            await (page.getByText(LANGUAGE_GREEK_UKR)).click();
            await superAdminPage.notExistEntity.first().click();

            await expect(page.getByText(TEXT_EDIT_PUSH_TEMPLATE)).toBeVisible();
            await expect(page.getByText(LANGUAGE_GREEK)).not.toBeVisible();
        });

    });
    test.skip('Sending test push notification under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694pjqm4'
        });


        await superAdminPage.letterTemplates.click();

        await expect(page.getByText(TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES)).toBeVisible();

        await superAdminPage.push.click();

        await expect(page.getByText(TITLE_PUSH_NOTIFICATIONS)).toBeVisible();

        await (page.getByText(TEXT_NO_LINK, {exact:true})).click();

        await expect(page.getByText(TEXT_EDIT_PUSH_TEMPLATE)).toBeVisible();

        await superAdminPage.pushTestButton.click();

        await expect(page.getByText(TEXT_SEND_TO)).toBeVisible();

        await superAdminPage.emailTestField.nth(0).fill(USER_EMAIL_SECOND);
        await superAdminPage.emailTestField.nth(1).fill(HUB_SERIAL_NUMBER_TRUE_THIRD);
        await superAdminPage.emailTestField.nth(2).fill(HUB_NAME_FIRST);
        await superAdminPage.sendButton.click();

        await expect(page.getByText(TEXT_SUCCESSFULLY)).toBeVisible();
    });

});