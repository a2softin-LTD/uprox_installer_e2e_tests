import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { RegistrationModel } from "../../models/RegistrationModel";
import { faker } from "@faker-js/faker";
import { RegistrationPage } from "../../pages/registration/RegistrationPage";
import { ENVIRONMENT } from "../../utils/constants";

test.describe('Login Page tests', () => {

    let loginPage: LoginPage;
    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage(ENVIRONMENT);
        await loginPage.registerLink.click();
        //await expect(page).toHaveURL('/sign_up')
    });

    test.describe('-Checking CRUD Engineer. Positive scenarios', () => {

        test('positive: -Checking registration (valid user data)', async ({ page }) => {
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

            expect(registrationPage.findByText('Email confirmation'));
            expect(registrationPage.findByText(`An email has been sent to your ${User.login} . To start working with the system, follow the instructions in the email.`));
            expect(registrationPage.findByText('Not received an email?'));
        });

        test('negative: -Checking registration (non-valid user email)', async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/8692uuajm"
            });

            registrationPage = new RegistrationPage(page);

            const email: string = "user@user";
            await registrationPage.emailField.click();
            await registrationPage.emailField.fill(email);

            expect(registrationPage.findByText('Incorrect email address format.'));
        });

        test('negative: -Checking registration (non-valid user password)', async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pw"
            });

            registrationPage = new RegistrationPage(page);

            const password: string = "~";
            await registrationPage.passwordField.click();
            await registrationPage.passwordField.fill(password);

            expect(registrationPage.findByText('Password must contain at least:\n' +
                '8 symbols\n' +
                '1 number\n' +
                '1 lowercase letter\n' +
                '1 uppercase letter\n' +
                'latin characters only'));
        });

        test('negative: -Checking registration (always exist user data)', async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pw"
            });

            registrationPage = new RegistrationPage(page);
            const User: RegistrationModel = {
                login: 'pinchuk.dap@gmail.com',
                password: 'lepidoptera111278DAP!@#'
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

            expect(registrationPage.findByText('Email already exists'));
        });
    });

});