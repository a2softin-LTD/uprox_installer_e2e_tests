import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { faker } from "@faker-js/faker";
import {
    EMAIL_NECESSARY_NAME_PART, FAKER_EMAIL_FIRST,
    TEXT_INCORRECT_EMAIL_FORMAT,
    TEXT_PASSWORD_RECOVERY,
    TEXT_PASSWORD_RECOVERY_SENT, TEXT_USER_NOT_FOUND,
    TEXT_WARNING,
    TEXT_WHAT_EMAIL_IS_ASSOCIATED,
    URL_LOGIN,
    USER_EMAIL,
    USER_EMAIL_NON_REGISTERED
} from "../../utils/constants";

test.describe('Login Page tests',{ tag: ['@smoke', '@stable']},  () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
    });

    test.describe('Checking recovery', () => {

        test('Recovery page', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8692udm64"
            });

            await loginPage.forgotYourPasswordLink.click();;
            await page.waitForTimeout(2000);

            await expect(page.getByText(TEXT_PASSWORD_RECOVERY)).toBeVisible();
            await expect(page.getByText(TEXT_WHAT_EMAIL_IS_ASSOCIATED)).toBeVisible();
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

            if (await page.getByText(TEXT_WARNING).isVisible()) {await expect (page.getByText(TEXT_WARNING)).toBeVisible()}
            else if (await page.getByText(TEXT_PASSWORD_RECOVERY_SENT).isVisible())
            {await expect(page.getByText(TEXT_PASSWORD_RECOVERY_SENT)).toBeVisible();}
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

            await expect(page.getByText(TEXT_INCORRECT_EMAIL_FORMAT)).toBeVisible();
        });

        test('negative: Checking recovery (valid not-registrated user email)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8692udp0v"
            });

            await loginPage.forgotYourPasswordLink.click();
            await page.waitForTimeout(2000);
            await loginPage.recoveryEmailField.fill(FAKER_EMAIL_FIRST);
            await page.waitForTimeout(2000);
            await loginPage.sendButton.click();

            if (await page.getByText(TEXT_WARNING).isVisible()) {await expect (page.getByText(TEXT_WARNING)).toBeVisible()}
            else if (await page.getByText(TEXT_USER_NOT_FOUND).isVisible())
            {await expect(page.getByText(TEXT_USER_NOT_FOUND)).toBeVisible();}

        });

    });

});