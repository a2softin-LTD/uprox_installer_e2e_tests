import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {USER_1} from "../../utils/user_data";
import { faker } from "@faker-js/faker";

test.describe('Login Page tests', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')

    });

    test.describe('Checking recovery', () => {

        test('positive: Checking recovery', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8692udkp3"
            });
            const email: string = "snaut12@gmail.com";
            await loginPage.forgotYourPasswordLink.click();
            await page.waitForTimeout(2000);
            await loginPage.recoveryEmailField.fill(email);
            await loginPage.recoverySendButton.click();
            await page.waitForTimeout(2000);
            expect(page.getByText('A password recovery email has been sent to your email.')).toBeVisible();
        });

        test('negative: Checking recovery (non-valid user email)', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8692udkp3"
            });
            const email: string = "valera123gmail.com";
            await loginPage.forgotYourPasswordLink.click();
            await page.waitForTimeout(2000);
            await loginPage.recoveryEmailField.fill(email);
            await loginPage.recoverySendButton.click();
            await page.waitForTimeout(2000);
            expect(loginPage.findByText('Incorrect email address format.')).toBeVisible();

        });

        test('negative: Checking recovery (valid not-registrated user email)', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8692udkp3"
            });

            const email: string = faker.internet.email();
            await loginPage.forgotYourPasswordLink.click();
            await page.waitForTimeout(2000);
            await loginPage.recoveryEmailField.fill(email);
            await page.waitForTimeout(2000);
            await loginPage.recoverySendButton.click();
            await page.waitForTimeout(2000);
            expect(loginPage.findByText('User not found')).toBeVisible();

        });

    });

});