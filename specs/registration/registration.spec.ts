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

    test.describe('Checking registration. Positive scenarios', () => {

        test('positive: Checking registration (valid user data)', async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pv"
            });

            registrationPage = new RegistrationPage(page);
            const User: RegistrationModel = {
                login: faker.internet.email(),
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
            await page.waitForTimeout(5000);

            await expect(registrationPage.findByText('Email confirmation')).toBeVisible();
            await expect(registrationPage.findByText(`An email has been sent to your ${User.login} . To start working with the system, follow the instructions in the email.`)).toBeVisible();
            await expect(registrationPage.findByText('Not received an email?')).toBeVisible();
        });
    });

    test.describe('Checking registration. Negative scenarios', () => {

        test('negative: Checking registration (non-valid user email)', async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/8692uuajm"
            });

            registrationPage = new RegistrationPage(page);
            const email: string = "user@user";

            await registrationPage.emailField.click();
            await registrationPage.emailField.fill(email);
            await registrationPage.registerButton.click();

            await expect(registrationPage.findByText('Incorrect email address format.')).toBeVisible();
        });

        test('negative: Checking registration (non-valid user password)', async ({ page }) => {
            test.info().annotations.push({
                type: "ClickUp_link",
                description: "https://app.clickup.com/t/86946t9pw"
            });

            registrationPage = new RegistrationPage(page);

            const password: string = "~";
            await registrationPage.passwordField.click();
            await registrationPage.passwordField.fill(password);

            await expect(registrationPage.findByText('Password must contain at least')).toBeVisible();
            await expect(registrationPage.findByText('8 symbols')).toBeVisible();
            await expect(registrationPage.findByText('1 number')).toBeVisible();
            await expect(registrationPage.findByText('1 lowercase letter')).toBeVisible();
            await expect(registrationPage.findByText('1 uppercase letter')).toBeVisible();
            await expect(registrationPage.findByText('latin characters only')).toBeVisible();
        });

        test('negative: Checking registration (already exist user data)', async ({ page }) => {
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
            await page.waitForTimeout(2000);

            await expect(registrationPage.findByText('Email already exists')).toBeVisible();
        });
    });
});