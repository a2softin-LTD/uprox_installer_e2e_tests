import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import {
    SUPER_ADMIN
} from "../../utils/user_data";
import { ENVIRONMENT } from "../../utils/constants";
import { faker } from "@faker-js/faker";

test.describe('Login Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage(ENVIRONMENT);
        profilePage = new ProfilePage(page);
    });

    test.describe('Creation of the System Admin by SUPER_ADMIN with and without password', () => {

        test('Creation of the System Admin by SUPER_ADMIN with password', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694aw8r6"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const email: string = faker.internet.email();
            const password: string = 'asdASD123';
            const role: string = 'system_admin';

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.permissions.click();
            await page.waitForTimeout(1000);
            await profilePage.addButton.click();
            await profilePage.inputFirstField.fill(email);
            await profilePage.inputSecondField.fill(password);
            await profilePage.inputThirdField.fill(name);
            await page.waitForTimeout(1000);
            await profilePage.selectFirstField.click();
            await page.waitForTimeout(2000);
            await (page.getByText(role)).click()
            await profilePage.addButton.click()
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000)

            await expect(page.getByText(email)).toBeVisible();

            await (page.getByText(name)).click()
            await page.waitForTimeout(1000);
            await profilePage.deleteUserButton.click();
            await page.waitForTimeout(1000);
            await profilePage.submitButton.click();
            await page.waitForTimeout(3000);
            await page.reload();
            await page.waitForTimeout(1000)

            await expect(page.getByText(email)).not.toBeVisible();
        });

        test('Creation of the System Admin by SUPER_ADMIN without password', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atvun"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const email: string = faker.internet.email();
            const role: string = 'system_admin';

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.permissions.click();
            await page.waitForTimeout(1000);
            await profilePage.addButton.click();
            await profilePage.inputFirstField.fill(email);
            await profilePage.inputThirdField.fill(name);
            await page.waitForTimeout(1000);
            await profilePage.selectFirstField.click();
            await page.waitForTimeout(2000);
            await (page.getByText(role)).click()
            await profilePage.addButton.click()
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000)

            await expect(page.getByText(email)).toBeVisible();

            await (page.getByText(name)).click()
            await page.waitForTimeout(1000);
            await profilePage.deleteUserButton.click();
            await page.waitForTimeout(1000);
            await profilePage.submitButton.click();
            await page.waitForTimeout(3000);
            await page.reload();
            await page.waitForTimeout(1000)

            await expect(page.getByText(email)).not.toBeVisible();
        });
    });

});