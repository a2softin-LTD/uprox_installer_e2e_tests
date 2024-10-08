import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";

test.describe('Creation of the Tech Support  by SUPER_ADMIN', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
    });

    test.describe('Creation of the Tech Support  by SUPER_ADMIN with and without password', () => {

        test('Creation of the Tech Support  under the Role = SUPER_ADMIN with password', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694ayqex"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const email: string = faker.internet.email({ firstName: 'sastest2398_' });
            const password: string = 'asdASD123';
            const role: string = 'system_admin';

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.permissions.click();
            await profilePage.addButton.click();
            await profilePage.inputFirstField.fill(email);
            await profilePage.inputSecondField.fill(password);
            await profilePage.inputThirdField.fill(name);
            await profilePage.selectFirstField.click();
            await (page.getByText(role, {exact:true})).click();
            await profilePage.addButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).toBeVisible();

            await (page.getByText(name)).click()
            await profilePage.deleteUserButton.click();
            await profilePage.submitButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).not.toBeVisible();
        });

        test('Creation of the Tech Support  under the Role = SUPER_ADMIN without password', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atwq3"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const email: string = faker.internet.email({ firstName: 'sastest2398_' });
            const role: string = 'support';

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.permissions.click();
            await profilePage.addButton.click();
            await profilePage.inputFirstField.fill(email);
            await profilePage.inputThirdField.fill(name);
            await profilePage.selectFirstField.click();
            await (page.getByText(role, {exact:true})).click();
            await profilePage.addButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).toBeVisible();

            await (page.getByText(name)).click()
            await profilePage.deleteUserButton.click();
            await profilePage.submitButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).not.toBeVisible();
        });

    });

});