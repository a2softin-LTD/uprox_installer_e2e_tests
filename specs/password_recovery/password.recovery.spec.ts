import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { faker } from "@faker-js/faker";
import { EMAIL_NECESSARY_NAME_PART, USER_EMAIL, USER_EMAIL_NON_REGISTERED } from "../../utils/constants";

test.describe('Login Page tests',{ tag: ['@smoke', '@stable']},  () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
    });

    test.describe('Checking recovery', () => {

        test('Recovery page', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8692udm64"
            });


            await loginPage.forgotYourPasswordLink.click();;
            await page.waitForTimeout(2000);

            await expect(page.getByText('Password recovery')).toBeVisible();
            await expect(page.getByText('What email is associated with your U-Prox profile?')).toBeVisible();
            await expect(loginPage.sendButton).toBeVisible();
            await expect(loginPage.recoveryEmailField).toBeVisible();
            await expect(loginPage.goToAuthorizationButton).toBeVisible();
        });

        test('positive: Checking recovery', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8692udm64"
            });


            await loginPage.forgotYourPasswordLink.click();;
            await page.waitForTimeout(2000);
            await loginPage.recoveryEmailField.fill(USER_EMAIL);
            await loginPage.sendButton.click();

            if (await page.getByText('Warning!').isVisible()) {await expect (page.getByText('Warning!')).toBeVisible()}
            else if (await page.getByText('A password recovery email has been sent to your email.').isVisible())
            {await expect(page.getByText('A password recovery email has been sent to your email.')).toBeVisible();}
        });

        test('negative: Checking recovery (non-valid user email)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8692udp0v"
            });

            await loginPage.forgotYourPasswordLink.click();
            await page.waitForTimeout(2000);
            await loginPage.recoveryEmailField.fill(USER_EMAIL_NON_REGISTERED);
            await loginPage.sendButton.click();
            await page.waitForTimeout(2000);

            await expect(page.getByText('Incorrect email address format.')).toBeVisible();
        });

        test('negative: Checking recovery (valid not-registrated user email)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8692udp0v"
            });

            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

            await loginPage.forgotYourPasswordLink.click();
            await page.waitForTimeout(2000);
            await loginPage.recoveryEmailField.fill(email);
            await page.waitForTimeout(2000);
            await loginPage.sendButton.click();

            if (await page.getByText('Warning!').isVisible()) {await expect (page.getByText('Warning!')).toBeVisible()}
            else if (await page.getByText('User not found').isVisible())
            {await expect(page.getByText('User not found')).toBeVisible();}

        });

    });

});