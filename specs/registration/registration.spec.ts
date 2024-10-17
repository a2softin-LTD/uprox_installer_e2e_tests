import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { RegistrationModel } from "../../models/RegistrationModel";
import { faker } from "@faker-js/faker";
import { RegistrationPage } from "../../pages/registration/RegistrationPage";
import {EMAIL_NECESSARY_NAME_PART} from "../../utils/constants";

test.describe('Login Page tests', {tag: '@stable'}, () => {

    let loginPage: LoginPage;
    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        await loginPage.openLoginPage('/');
        await loginPage.registerLink.click();
    });

    test.describe('Checking registration. Positive scenarios', () => {

        test('positive: Checking registration (valid user data)', async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pv"
            });

            registrationPage = new RegistrationPage(page);
            const User: RegistrationModel = {
                login: faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART }),
                password: 'asdASD123'
            };

            await registrationPage.emailField.click();
            await registrationPage.emailField.fill(User.login);

            await expect(registrationPage.emailField).toHaveValue(User.login);

            await registrationPage.passwordField.click();
            await registrationPage.passwordField.fill(User.password);
            await registrationPage.agreeCheckbox.click();
            await page.waitForTimeout(3000);
            await registrationPage.registerButton.click();
            await page.waitForTimeout(3000);

            if (await page.getByText('Warning!').isVisible()) {
                await expect (page.getByText('Warning!')).toBeVisible()
            }
            else if (await page.getByText('Not received an email?').isVisible()) {
                await expect(page.getByText('Email confirmation')).toBeVisible();
                await expect(page.getByText(`An email has been sent to your ${User.login} . To start working with the system, follow the instructions in the email.`)).toBeVisible();
                await expect(page.getByText('Not received an email?')).toBeVisible();
            }

        });
    });

    test.describe('Checking registration. Negative scenarios', () => {

        test('negative: Checking registration (non-valid user email)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/8692uuajm"
            });

            registrationPage = new RegistrationPage(page);

            const email: string = "user@user";

            await registrationPage.emailField.click();
            await registrationPage.emailField.fill(email);
            await registrationPage.registerButton.click();

            await expect(page.getByText('Incorrect email address format.')).toBeVisible();
        });

        test('negative: Checking registration (non-valid user password)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pw"
            });

            registrationPage = new RegistrationPage(page);

            const password: string = "~";
            await registrationPage.passwordField.click();
            await registrationPage.passwordField.fill(password);

            await expect(page.getByText('Password must contain at least')).toBeVisible();
            await expect(page.getByText('8 symbols')).toBeVisible();
            await expect(page.getByText('1 number')).toBeVisible();
            await expect(page.getByText('1 lowercase letter')).toBeVisible();
            await expect(page.getByText('1 uppercase letter')).toBeVisible();
            await expect(page.getByText('latin characters only')).toBeVisible();
        });

        test('negative:Checking registration (already exist user data)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pw"
            });

            registrationPage = new RegistrationPage(page);
            const User: RegistrationModel = {
                login: 'pinchuk.dap@gmail.com',
                password: 'lepidoptera111278DAP!@#'
            };

            await registrationPage.emailField.click();
            await registrationPage.emailField.fill(User.login);

            await expect(registrationPage.emailField).toHaveValue(User.login);

            await registrationPage.passwordField.click();
            await registrationPage.passwordField.fill(User.password);
            await registrationPage.agreeCheckbox.click();
            await page.waitForTimeout(2000);
            await registrationPage.registerButton.click();

            if (await page.getByText('Warning!').isVisible()) {await expect (page.getByText('Warning!')).toBeVisible()}
            else if (await page.getByText('Email already exists').isVisible())
            {await expect(page.getByText('Email already exists')).toBeVisible();}
        });

    });

});