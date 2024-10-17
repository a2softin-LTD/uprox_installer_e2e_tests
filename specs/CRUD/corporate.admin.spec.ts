import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import {
    SUPER_ADMIN,
    SYSTEM_ADMIN,
} from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {EMAIL_NECESSARY_NAME_PART} from "../../utils/constants";

test.describe('Login Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');

    });

    test.describe('Creation of the Corporate Admin under the different role', () => {

        test('Creation of the Corporate Administrator under the Role = SYSTEM_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694attun"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

            await loginPage.auth(SYSTEM_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.companies.click();
            await profilePage.groupsOfCompanies.click();

            await expect(page.getByText('Add new group')).toBeVisible();

            await profilePage.companyAddGroupButton.click();
            await profilePage.inputFirstField.fill(name);
            await profilePage.inputSecondField.fill(adminEmail);
            await profilePage.connectButton.click();
            await profilePage.connectButton.last().click()
            await page.waitForTimeout(3000)
            await profilePage.companies.first().click();
            await profilePage.groupsOfCompanies.click();
            await page.waitForTimeout(1000);
            await page.reload();
            await page.waitForTimeout(1000)

            await expect(page.getByText(name)).toBeVisible();
            await expect(page.getByText(adminEmail)).toBeVisible();

            await (page.getByText(name)).click()
            await profilePage.deleteButton.click();
            await profilePage.deleteButton.click();

            await page.waitForTimeout(1000);
            await page.reload();
            await page.waitForTimeout(1000)

            await expect(page.getByText(name)).not.toBeVisible();
        });

        test('Creation of the Corporate Administrator under the Role = SUPER_ADMIN)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atuwv"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.companies.click();
            await profilePage.groupsOfCompanies.click();

            await expect(page.getByText('Add new group')).toBeVisible();

            await profilePage.companyAddGroupButton.click();
            await profilePage.inputFirstField.fill(name);
            await profilePage.inputSecondField.fill(adminEmail);

            await profilePage.connectButton.click();
            await profilePage.connectButton.last().click()
            await page.waitForTimeout(3000)
            await profilePage.companies.first().click();
            await profilePage.groupsOfCompanies.click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000)

            await expect(page.getByText(name)).toBeVisible();
            await expect(page.getByText(adminEmail)).toBeVisible();

            await (page.getByText(name)).click()
            await profilePage.deleteButton.click();
            await profilePage.deleteButton.click();

            await page.waitForTimeout(1000);
            await page.reload();
            await page.waitForTimeout(1000)

            await expect(page.getByText(name)).not.toBeVisible();
        });

    });

});