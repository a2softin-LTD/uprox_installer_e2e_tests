import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { RegistrationModel } from "../../models/RegistrationModel";
import { faker } from "@faker-js/faker";
import {RegistrationPage} from "../../pages/login/RegistrationPage";

test.describe('Login Page tests', () => {

    let loginPage: LoginPage;
    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await loginPage.registerLink.click();
        await expect(page).toHaveURL('/sign_up')
    });

    test.describe('Checking registration. Positive scenarios', () => {

        test('positive: Checking registration', async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pv"
            });

            registrationPage = new RegistrationPage(page);
            const User: RegistrationModel = {
                login: faker.internet.email(),
                password: 'asdASD123'
            };

            let passwordStars: string = '';
            for (let i = 0; i < User.password.length; i++) {
                passwordStars += '*';
            }

            await registrationPage.emailField.click();
            await registrationPage.emailField.fill(User.login);

            await expect(registrationPage.emailField).toHaveValue(User.login);

            await registrationPage.passwordField.click();
            await registrationPage.passwordField.fill(User.password);

            await registrationPage.agreeCheckbox.click();
            await page.waitForTimeout(3000);

            await registrationPage.registerButton.click();
            await page.waitForTimeout(5000);

            // await expect(registrationPage.loginHeader).toHaveText('Email confirmation');
            // await expect(registrationPage.registrationComplete).toHaveText(`An email has been sent to your ${User.login} . To start working with the system, follow the instructions in the email.`);
            // await expect(registrationPage.registrationCompleteNotReceivedEmail).toHaveText('Not received an email?');
        });

    });

});