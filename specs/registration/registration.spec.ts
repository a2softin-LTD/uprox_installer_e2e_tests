import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { RegistrationModel } from "../../models/RegistrationModel";
import { RegistrationPage } from "../../pages/registration/RegistrationPage";
import {
    FAKER_EMAIL_FIRST, TEXT_1_LOWERCASE_LETTER, TEXT_1_NUMBER, TEXT_1_UPPERCASE_LETTER, TEXT_8_SYMBOLS,
    TEXT_CAPTCHA_IS_VISIBLE, TEXT_CHANGES_SAVED_SUCCESSFULLY, TEXT_EMAIL_ALREADY_EXISTS, TEXT_EMAIL_CONFIRMATION,
    TEXT_INCORRECT_EMAIL_FORMAT, TEXT_LATIN_CHARACTERS_ONLY, TEXT_NOT_RECEIVED_EMAIL, TEXT_PASSWORD_MUST_CONTAIN,
    TEXT_REGISTRATION, TEXT_RESEND_EMAIL, TEXT_USERS_WITH_NO_ACCESS, TEXT_WARNING,
    USER_EMAIL_NOT_VALID, USER_EMAIL_SECOND, USER_PASSWORD_FIRST, USER_PASSWORD_NOR_VALID, USER_PASSWORD_OLD
} from "../../utils/constants";

test.describe('Login Page tests', { tag: ['@smoke', '@stable']},() => {

    let loginPage: LoginPage;
    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        registrationPage = new RegistrationPage(page);

        await loginPage.openLoginPage('/');
        await loginPage.registerLink.click();
    });

    test.describe('Checking registration. Positive scenarios', () => {

        test('positive: Checking registration (valid user data)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pv"
            });

            const User: RegistrationModel = {
                login: FAKER_EMAIL_FIRST,
                password: USER_PASSWORD_FIRST
            };

            await registrationPage.emailField.click();
            await page.waitForLoadState('domcontentloaded');
            await registrationPage.emailField.fill(User.login);

            await expect(registrationPage.emailField).toHaveValue(User.login);

            await registrationPage.passwordField.click();
            await page.waitForLoadState('domcontentloaded');
            await registrationPage.passwordField.fill(User.password);
            await page.waitForLoadState('domcontentloaded');
            await registrationPage.agreeCheckbox.click();
            await page.waitForTimeout(3000);
            await page.waitForLoadState('domcontentloaded');
            await registrationPage.registerButton.click();
            await page.waitForTimeout(3000);

            if (await page.getByText(TEXT_WARNING).isVisible()) {
                await expect (page.getByText(TEXT_WARNING)).toBeVisible();
                console.log(TEXT_CAPTCHA_IS_VISIBLE);
            }
            else if (await page.getByText(TEXT_NOT_RECEIVED_EMAIL).isVisible()) {
                await expect(page.getByText(TEXT_EMAIL_CONFIRMATION)).toBeVisible();
                await expect(page.getByText(`An email has been sent to your ${User.login} . To start working with the system, follow the instructions in the email.`)).toBeVisible();
                await expect(page.getByText(TEXT_NOT_RECEIVED_EMAIL)).toBeVisible();
            }
        });
    });

    test.describe('Checking registration. Negative scenarios', { tag: '@smoke' }, () => {

        test('negative: Checking registration (non-valid user email)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/8692uuajm"
            });

            await registrationPage.emailField.click();
            await page.waitForLoadState('domcontentloaded');
            await registrationPage.emailField.fill(USER_EMAIL_NOT_VALID);
            await page.waitForLoadState('domcontentloaded');
            await registrationPage.registerButton.click();

            await expect(page.getByText(TEXT_INCORRECT_EMAIL_FORMAT)).toBeVisible();
        });

        test('negative: Checking registration (non-valid user password)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pw"
            });

            await registrationPage.passwordField.click();
            await page.waitForLoadState('domcontentloaded');
            await registrationPage.passwordField.fill(USER_PASSWORD_NOR_VALID);

            await expect(page.getByText(TEXT_PASSWORD_MUST_CONTAIN)).toBeVisible();
            await expect(page.getByText(TEXT_8_SYMBOLS)).toBeVisible();
            await expect(page.getByText(TEXT_1_NUMBER)).toBeVisible();
            await expect(page.getByText(TEXT_1_LOWERCASE_LETTER)).toBeVisible();
            await expect(page.getByText(TEXT_1_UPPERCASE_LETTER)).toBeVisible();
            await expect(page.getByText(TEXT_LATIN_CHARACTERS_ONLY)).toBeVisible();
        });

        test('negative:Checking registration (already exist user data)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pw"
            });

            const User: RegistrationModel = {
                login: USER_EMAIL_SECOND,
                password: USER_PASSWORD_OLD
            };

            await registrationPage.emailField.click();
            await page.waitForLoadState('domcontentloaded');
            await registrationPage.emailField.fill(User.login);

            await expect(registrationPage.emailField).toHaveValue(User.login);

            await registrationPage.passwordField.click();
            await page.waitForLoadState('domcontentloaded');
            await registrationPage.passwordField.fill(User.password);
            await page.waitForLoadState('domcontentloaded');
            await registrationPage.agreeCheckbox.click();
            await page.waitForLoadState('domcontentloaded');
            await page.waitForTimeout(2000);
            await registrationPage.registerButton.click();

            if (await page.getByText(TEXT_WARNING).isVisible()) {await expect (page.getByText(TEXT_WARNING)).toBeVisible();
                console.log(TEXT_CAPTCHA_IS_VISIBLE);}
            else if (await page.getByText(TEXT_EMAIL_ALREADY_EXISTS).isVisible())
            {await expect(page.getByText(TEXT_EMAIL_ALREADY_EXISTS)).toBeVisible();}
        });

    });

    test('Registration conditions', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "ClickUp_link",
            description: "https://app.clickup.com/t/86946t9q2"
        });

        await registrationPage.termsOfRegistrationLink.click();

        await expect(page.getByText(TEXT_USERS_WITH_NO_ACCESS)).toBeVisible();

        await registrationPage.closeButton.click();

        await expect(page.getByText(TEXT_REGISTRATION,{exact:true})).toBeVisible();
    });

    test('Resending confirmation letter', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "ClickUp_link",
            description: "https://app.clickup.com/t/86946t9q4"
        });

        const User: RegistrationModel = {
            login: FAKER_EMAIL_FIRST,
            password: USER_PASSWORD_FIRST
        };

        await registrationPage.emailField.click();
        await page.waitForLoadState('domcontentloaded');
        await registrationPage.emailField.fill(User.login);

        await expect(registrationPage.emailField).toHaveValue(User.login);

        await registrationPage.passwordField.click();
        await page.waitForLoadState('domcontentloaded');
        await registrationPage.passwordField.fill(User.password);
        await page.waitForLoadState('domcontentloaded');
        await registrationPage.agreeCheckbox.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(3000);
        await registrationPage.registerButton.click();
        await page.waitForTimeout(3000);

        if (await page.getByText(TEXT_WARNING).isVisible()) {
            await expect (page.getByText(TEXT_WARNING)).toBeVisible()
            console.log(TEXT_CAPTCHA_IS_VISIBLE);
        }
        else if (await page.getByText(TEXT_NOT_RECEIVED_EMAIL).isVisible()) {
            await expect(page.getByText(TEXT_EMAIL_CONFIRMATION)).toBeVisible();
            await expect(page.getByText(`An email has been sent to your ${User.login} . To start working with the system, follow the instructions in the email.`)).toBeVisible();
            await expect(page.getByText(TEXT_NOT_RECEIVED_EMAIL)).toBeVisible();

            await page.waitForTimeout(15000);

            await registrationPage.resendLetterButton.click();

            await expect (page.getByText(TEXT_CHANGES_SAVED_SUCCESSFULLY)).toBeVisible();
            await expect(page.getByText(TEXT_NOT_RECEIVED_EMAIL)).toBeVisible();
            await expect(page.getByText(TEXT_RESEND_EMAIL)).not.toBeVisible();
        }
    });

});