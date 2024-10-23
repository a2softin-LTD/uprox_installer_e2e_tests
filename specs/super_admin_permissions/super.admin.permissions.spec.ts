import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import { EMAIL_NECESSARY_NAME_PART } from "../../utils/constants";

test.describe('Permissions under SUPER_ADMIN role', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });

    test.describe('Checking UI elements of the permissions page', () => {

        test('Checking UI elements: super-admin role', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await profilePage.permissions.click();
            await page.waitForTimeout(2000);

            await expect(profilePage.searchField).toBeVisible();
            await expect(profilePage.selectFirstField.filter({has:page.getByText('All roles')})).toBeVisible();
            await expect(profilePage.addButton).toBeVisible();
            await expect(profilePage.pageTitle.filter({has:page.getByText('Employees')})).toBeVisible();
        });
    });

    test.describe('Permissions', () => {

        test('List of employees:', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40dv"
            });

            await profilePage.permissions.click();
            await page.waitForTimeout(2000);

            for (const employee of await profilePage.entityBlock.all())
                await expect(employee).toBeVisible();

            for (const hub of await profilePage.entityBlock.all())
                await expect(hub.filter({has: profilePage.entityText})).toBeVisible();

            for (const hub of await profilePage.entityBlock.all())
            {   await expect((hub.filter({hasText:'Tech Support'})).or (hub.filter({hasText:'Sysadmin'}))).toBeVisible();
                await expect(hub.filter({hasText:/.+@.+\..+/i})).toBeVisible();}
        });

        test('Add employee', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p407a"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const role: string = 'system_admin';

            await profilePage.permissions.click();
            await page.waitForTimeout(1000);
            await profilePage.addButton.click();
            await profilePage.inputFirstField.fill(email);
            await profilePage.inputThirdField.fill(name);
            await page.waitForTimeout(1000);
            await profilePage.selectFirstField.click();
            await page.waitForTimeout(1000);
            await (page.getByText(role)).click()
            await profilePage.addButton.click()

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).toBeVisible();

            await (page.getByText(name)).click()
            await page.waitForTimeout(1000);
            await profilePage.deleteUserButton.click();
            await page.waitForTimeout(1000);
            await profilePage.submitButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).not.toBeVisible();
        });


        test('Delete employee', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40z1"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const role: string = 'system_admin';

            await profilePage.permissions.click();
            await page.waitForTimeout(1000);
            await profilePage.addButton.click();
            await profilePage.inputFirstField.fill(email);
            await profilePage.inputThirdField.fill(name);
            await page.waitForTimeout(1000);
            await profilePage.selectFirstField.click();
            await page.waitForTimeout(1000);
            await (page.getByText(role)).click()
            await profilePage.addButton.click()

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).toBeVisible();

            await (page.getByText(name)).click()
            await page.waitForTimeout(1000);
            await profilePage.deleteUserButton.click();
            await page.waitForTimeout(1000);
            await profilePage.submitButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).not.toBeVisible();
        });

        test('Remove permission', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40z1"
            });
            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const role: string = 'system_admin';

            await profilePage.permissions.click();
            await profilePage.addButton.click();
            await profilePage.inputFirstField.fill(email);
            await profilePage.inputThirdField.fill(name);
            await profilePage.selectFirstField.click();
            await (page.getByText(role)).click()
            await profilePage.addButton.click()
            await expect(page.getByText('Employees')).toBeVisible();

            await expect(page.getByText(email)).toBeVisible();

            await (page.getByText(name)).click()

            await expect(page.getByText(name)).toBeVisible();

            await profilePage.companyRemovePermissionButton.click();
            await profilePage.submitButton.click();
            await profilePage.backButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).not.toBeVisible();
        });
        test('Info about employee', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40z1"
            });
            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const role: string = 'system_admin';

            await profilePage.permissions.click();
            await profilePage.addButton.click();
            await profilePage.inputFirstField.fill(email);
            await profilePage.inputThirdField.fill(name);
            await profilePage.selectFirstField.click();
            await (page.getByText(role)).click()
            await profilePage.addButton.click()

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).toBeVisible();

            await (page.getByText(name)).click()

            await expect(page.getByText(name)).toBeVisible();
            await expect(page.getByText(email)).toBeVisible();
            await expect(page.getByText(role)).toBeVisible();
            await expect(profilePage.deleteUserButton).toBeVisible();
            await expect(profilePage.companyRemovePermissionButton).toBeVisible();

            await page.getByText('Block employee').click();
            await profilePage.yesButton.click();
            await profilePage.saveButton.click();

            await expect(page.getByText('Yes')).toBeVisible();

            await profilePage.deleteUserButton.click();
            await profilePage.submitButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).not.toBeVisible();
        });

    });

});