import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import * as path from "node:path";

test.describe('Letter and push notification templates under SUPER_ADMIN role', { tag: ['@stable']  }, () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });

    test('Checking UI elements of the letter templates page', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await profilePage.letterTemplates.click();
            await expect(page.getByText('Test email for all language')).toBeVisible();
            await profilePage.email.click();

            await expect(profilePage.selectFirstField).toBeVisible();
            await expect(profilePage.testEmailButton).toBeVisible();
            await expect(profilePage.pageTitle.filter({has:page.getByText('Letter templates')})).toBeVisible();
            await expect(page.getByText('Template type')).toBeVisible();
            await expect(page.getByText('Language count')).toBeVisible();
            await expect(page.getByText('Language', {exact:true})).toBeVisible();
    });

    test('List of letter templates under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8678rvbzg'
        });

        await profilePage.letterTemplates.click();

        await expect(page.getByText('Test email for all language')).toBeVisible();

        for (const template of await profilePage.rowBlock.all())
            await expect(template).toBeVisible();

        for (const template of await profilePage.rowBlock.all())
        {await expect(template.filter({hasText: /[A-Z]/})).toBeVisible();}

        for (const template of await profilePage.rowBlock.all())
        {await expect(template.filter({hasText: /[a-z]/})).not.toBeVisible();}

        for (const template of await profilePage.rowBlock.all())
        {await expect(template.filter({hasText: /[0-9]/})).toBeVisible();}
    });

    test('Letter template under SUPER_ADMIN role', { tag: ['@smoke','@hub']  }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8678rvbyg'
        });

        await profilePage.letterTemplates.click();

        await expect(page.getByText('Test email for all language')).toBeVisible();

        await profilePage.rowBlock.first().click();

        await expect(page.getByText('Edit template')).toBeVisible();
        await expect(profilePage.pushLetterTemplateTitle).toBeVisible();
        for (const localization of await profilePage.pushLetterLocalization.all())
        { await expect(localization).toBeVisible();}
        for (const parameter of await profilePage.letterParameters.all())
        { await expect(parameter).toBeVisible();}
        await expect(profilePage.inputFirstField).toBeVisible();
        await expect(profilePage.emailTestButton).toBeVisible();
        await expect(profilePage.letterPreview).toBeVisible();

        await profilePage.backButton.click();

        await expect(page.getByText('Test email for all language')).toBeVisible();
        await page.waitForTimeout(3000);

        await profilePage.rowBlock.last().click();

        await expect(page.getByText('Edit template')).toBeVisible();
        await expect(profilePage.pushLetterTemplateTitle).toBeVisible();
        for (const localization of await profilePage.pushLetterLocalization.all())
        { await expect(localization).toBeVisible();}
        for (const parameter of await profilePage.letterParameters.all())
        { await expect(parameter).toBeVisible();}
        await expect(profilePage.inputFirstField).toBeVisible();
        await expect(profilePage.emailTestButton).toBeVisible();
        await expect(profilePage.letterPreview).toBeVisible();
    });

    test.describe('Checking the availability of a letter template for a given language', () => {

        test('Positive: checking the availability of a letter template for a given language', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const language: string = "Французька";
            const languageByEng: string = "French";

            await profilePage.letterTemplates.click();

            await expect(page.getByText('Test email for all language')).toBeVisible();

            await profilePage.selectFirstField.click();
            await (page.getByText(language)).click();

            await profilePage.existEntity.first().click();

            await expect(page.getByText('Edit template')).toBeVisible();

            await expect(page.getByText(languageByEng)).toBeVisible();
        });

        test('Negative: checking the availability of a letter template for a given language', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            const language: string = "Грецька";
            const languageByEng: string = "Greek";

            await profilePage.letterTemplates.click();

            await expect(page.getByText('Test email for all language')).toBeVisible();

            await profilePage.selectFirstField.click();
            await (page.getByText(language)).click();

            await profilePage.notExistEntity.first().click();

            await expect(page.getByText('Edit template')).toBeVisible();

            await expect(page.getByText(languageByEng)).not.toBeVisible();
        });

    });

    test('Sending test letter  under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8678rvbzg'
        });

        const email: string = "snaut123@gmail.com";
        const name: string = "AQA_MONITORING_SERVICE_COMPANY";

        await profilePage.letterTemplates.click();

        await expect(page.getByText('Test email for all language')).toBeVisible();

        await (page.getByText('EMAIL_TEMPLATES_FAILURES')).click();

        await expect(page.getByText('Edit template')).toBeVisible();

        await profilePage.emailTestButton.click();

        await expect(page.getByText('Send to')).toBeVisible();

        await profilePage.emailTestField.first().fill(email);
        await profilePage.emailTestField.last().fill(name);

        await profilePage.sendButton.click();

        await expect(page.getByText('Test email send successfully')).toBeVisible();
    });

    test('Checking UI elements of push notifications templates page', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await profilePage.letterTemplates.click();
            await expect(page.getByText('Test email for all language')).toBeVisible();
            await profilePage.push.click();

            await expect(profilePage.pageTitle.filter({has:page.getByText('Push notifications')})).toBeVisible();
            await expect(profilePage.selectFirstField).toBeVisible();
            await expect(page.getByText('Template type')).toBeVisible();
            await expect(page.getByText('Language count')).toBeVisible();
            await expect(page.getByText('Language', {exact:true})).toBeVisible();
    });

    test('List of push notification templates under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8678rvbzg'
        });

        await profilePage.letterTemplates.click();

        await expect(page.getByText('Test email for all language')).toBeVisible();

        await profilePage.push.click();

        await expect(page.getByText('Push notifications')).toBeVisible();

        for (const template of await profilePage.rowBlock.all())
            await expect(template).toBeVisible();

        for (const template of await profilePage.rowBlock.all())
        {await expect(template.filter({hasText: /[A-Z]/})).toBeVisible();}

        for (const template of await profilePage.rowBlock.all())
        {await expect(template.filter({hasText: /[a-z]/})).not.toBeVisible();}

        for (const template of await profilePage.rowBlock.all())
        {await expect(template.filter({hasText: /[0-9]/})).toBeVisible();}
    });

    test('Push notification template under SUPER_ADMIN role', { tag: ['@smoke','@hub']  }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8678rvbyg'
        });

        await profilePage.letterTemplates.click();

        await expect(page.getByText('Test email for all language')).toBeVisible();

        await profilePage.push.click();

        await expect(page.getByText('Push notifications')).toBeVisible();

        await profilePage.rowBlock.first().click();

        await expect(page.getByText('Edit push template')).toBeVisible();
        await expect(profilePage.pushLetterTemplateTitle).toBeVisible()
        for (const localization of await profilePage.pushLetterLocalization.all())
        { await expect(localization).toBeVisible();}
        await expect(profilePage.inputFirstField).toBeVisible();
        await expect(profilePage.inputSecondField).toBeVisible();
        await expect(profilePage.pushTestButton).toBeVisible();

        await profilePage.backButton.click();

        await expect(page.getByText('Push notifications')).toBeVisible();
        await page.waitForTimeout(3000);

        await profilePage.rowBlock.last().click();

        await expect(page.getByText('Edit push template')).toBeVisible();
        await expect(profilePage.pushLetterTemplateTitle).toBeVisible();
        for (const localization of await profilePage.pushLetterLocalization.all())
        { await expect(localization).toBeVisible();}
        await expect(profilePage.inputFirstField).toBeVisible();
        await expect(profilePage.inputSecondField).toBeVisible();
        await expect(profilePage.pushTestButton).toBeVisible();
    });

    test.describe('Checking the availability of a push notification for a given language  under SUPER_ADMIN role', () => {

        test('Positive: checking the availability of a push notification for a given language', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const language: string = "Французька";
            const languageByEng: string = "French";

            await profilePage.letterTemplates.click();

            await expect(page.getByText('Test email for all language')).toBeVisible();

            await profilePage.push.click();

            await expect(page.getByText('Push notifications')).toBeVisible();

            await profilePage.selectFirstField.click();
            await (page.getByText(language)).click();

            await profilePage.existEntity.first().click();

            await expect(page.getByText('Edit push template')).toBeVisible();
            await expect(page.getByText(languageByEng)).toBeVisible();
        });

        test('Negative: checking the availability of a push notification for a given language', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            const language: string = "Грецька";
            const languageByEng: string = "Greek";

            await profilePage.letterTemplates.click();

            await expect(page.getByText('Test email for all language')).toBeVisible();

            await profilePage.push.click();

            await expect(page.getByText('Push notifications')).toBeVisible();

            await profilePage.selectFirstField.click();
            await (page.getByText(language)).click();

            await profilePage.notExistEntity.first().click();

            await expect(page.getByText('Edit push template')).toBeVisible();
            await expect(page.getByText(languageByEng)).not.toBeVisible();
        });

    });
    test('Sending test push notification under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8678rvbzg'
        });

        const email: string = "d.pinchuk@itvsystems.com.ua";
        const panel: string = "00:08:B7:10:02:04";
        const name: string = "PIN@dev";

        await profilePage.letterTemplates.click();

        await expect(page.getByText('Test email for all language')).toBeVisible();

        await profilePage.push.click();

        await expect(page.getByText('Push notifications')).toBeVisible();

        await (page.getByText('NO_LINK', {exact:true})).click();

        await expect(page.getByText('Edit push template')).toBeVisible();

        await profilePage.pushTestButton.click();

        await expect(page.getByText('Send to')).toBeVisible();

        await profilePage.emailTestField.nth(0).fill(email);
        await profilePage.emailTestField.nth(1).fill(panel);
        await profilePage.emailTestField.nth(2).fill(name);

        await profilePage.sendButton.click();

        await expect(page.getByText('send successfully')).toBeVisible();
    });

});