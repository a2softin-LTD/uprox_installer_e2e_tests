import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { faker } from "@faker-js/faker";

test.describe('Login Page tests', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')

    });

    test.describe('Checking recovery', () => {

        test('positive: Checking recovery', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8692udkp3"
            });
            const email: string = "snaut12@gmail.com";

            await loginPage.forgotYourPasswordLink.click();;
            await page.waitForTimeout(2000);
            await loginPage.recoveryEmailField.fill(email);
            await loginPage.recoverySendButton.click();
            await page.waitForTimeout(2000);
            await expect(page.getByText('A password recovery email has been sent to your email.')).toBeVisible();
        });

        test('negative: Checking recovery (non-valid user email)', { tag: '@smoke' }, async ({ page }) => {
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
            await expect(page.getByText('Incorrect email address format.')).toBeVisible();
        });

        test('negative: Checking recovery (valid not-registrated user email)', { tag: '@smoke' }, async ({ page }) => {
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
            await expect(page.getByText('User not found')).toBeVisible();
        });
    });
});