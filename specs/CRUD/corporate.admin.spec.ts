import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {
    SUPER_ADMIN,
    SYSTEM_ADMIN,
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

    test.describe('Creation of the Corporate Admin under the different role', () => {

        test('Creation of the Corporate Administrator under the Role = SYSTEM_ADMIN', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694attun"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email();

            await loginPage.auth(SYSTEM_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.companies.click();
            await page.waitForTimeout(1000);
            await profilePage.groupsOfCompanies.click();

            await expect(page.getByText('Add new group')).toBeVisible();

            await profilePage.companyAddGroupButton.click();
            await profilePage.inputFirstField.fill(name);
            await profilePage.inputSecondField.fill(adminEmail);
            await page.waitForTimeout(1000);

            await profilePage.connectButton.click();
            await page.waitForTimeout(1000);
            await profilePage.connectButton.last().click()

            await page.waitForTimeout(4000);
            await profilePage.companies.first().click();
            await page.waitForTimeout(1000);
            await profilePage.groupsOfCompanies.click();
            await page.waitForTimeout(1000);
            await page.reload();
            await page.waitForTimeout(1000)

            await expect(page.getByText(name)).toBeVisible();
            await expect(page.getByText(adminEmail)).toBeVisible();

            await (page.getByText(name)).click()
            await page.waitForTimeout(1000);
            await profilePage.deleteButton.click();
            await page.waitForTimeout(1000);
            await profilePage.deleteButton.click();

            await page.waitForTimeout(1000);
            await page.reload();
            await page.waitForTimeout(1000)

            await expect(page.getByText(name)).not.toBeVisible();
        });

        test('Creation of the Corporate Administrator under the Role = SUPER_ADMIN)', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atuwv"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email();

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.companies.click();
            await page.waitForTimeout(1000);
            await profilePage.groupsOfCompanies.click();

            await expect(page.getByText('Add new group')).toBeVisible();

            await profilePage.companyAddGroupButton.click();
            await profilePage.inputFirstField.fill(name);
            await profilePage.inputSecondField.fill(adminEmail);
            await page.waitForTimeout(1000);

            await profilePage.connectButton.click();
            await page.waitForTimeout(2000);
            await profilePage.connectButton.last().click()

            await page.waitForTimeout(2000);
            await profilePage.groupsOfCompanies.click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000)

            await expect(page.getByText(name)).toBeVisible();
            await expect(page.getByText(adminEmail)).toBeVisible();

            await (page.getByText(name)).click()
            await page.waitForTimeout(1000);
            await profilePage.deleteButton.click();
            await page.waitForTimeout(1000);
            await profilePage.deleteButton.click();

            await page.waitForTimeout(1000);
            await page.reload();
            await page.waitForTimeout(1000)

            await expect(page.getByText(name)).not.toBeVisible();
        });
    });

});