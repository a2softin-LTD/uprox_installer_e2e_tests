import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {SUPER_ADMIN} from "../../utils/user_data";
import { faker } from "@faker-js/faker";

test.describe('Profile Page tests', () => {

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

    test.describe('Checking UI elements of the Page', () => {

        test('Checking UI elements on groups of companies page', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await profilePage.companies.click();
            await profilePage.groupsOfCompanies.click();
            await page.waitForTimeout(2000);

            await expect(profilePage.companyAddNewGroupButton).toBeVisible();
            await expect(profilePage.pageTitle.filter({has:page.getByText('Groups of companies')})).toBeVisible();
        });
    });

    test.describe('Groups of companies editing', () => {

        test('List of  groups', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40dv"
            });

            await profilePage.companies.click();
            await profilePage.groupsOfCompanies.click();
            await page.waitForTimeout(2000);

            for (const employee of await profilePage.entityBlock.all())
                await expect(employee).toBeVisible();

            for (const hub of await profilePage.entityBlock.all())
                await expect(hub.filter({has: profilePage.entityText})).toBeVisible();

            for (const hub of await profilePage.entityBlock.all())
            {await expect(hub.filter({hasText:/.+@.+\..+/i})).toBeVisible();}

            for (const hub of await profilePage.entityBlock.all())
                await expect(hub.filter({has: profilePage.informationIcon})).toBeVisible();
        });

        test('Add company to group', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p407a"
            });

            const company: string = 'Handcrafted Concrete Mouse';

            await profilePage.companies.click();
            await profilePage.groupsOfCompanies.click();
            await profilePage.entityBlock.first().click();
            await profilePage.companyAddToGroupButton.click();
            await page.getByText(company).click();
            await profilePage.okButton.click();

            await profilePage.trashIcon.last().click();
            await profilePage.submitButton.click();
            page.reload()

            await expect(page.getByText(company)).not.toBeVisible();
        });

        test('Delete company from the group', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40z1"
            });

            const company: string = 'Handcrafted Concrete Mouse';

            await profilePage.companies.click();
            await profilePage.groupsOfCompanies.click();
            await profilePage.entityBlock.first().click();
            await profilePage.companyAddToGroupButton.click();
            await page.getByText(company).click();
            await profilePage.okButton.click();

            await profilePage.trashIcon.last().click();
            await profilePage.submitButton.click();
            page.reload()

            await expect(page.getByText(company)).not.toBeVisible();
        });

        test('Add group of companies', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40z1"
            });

            const name: string = 'TEST_COMPANY_' + faker.string.alphanumeric({ length: { min: 3, max: 5 } })
            const email: string = faker.internet.email({ firstName: 'sastest2398_' });

            await profilePage.companies.click();
            await profilePage.groupsOfCompanies.click();
            await profilePage.companyAddNewGroupButton.click();
            await profilePage.inputFirstField.fill(name);
            await profilePage.inputSecondField.fill(email);
            await profilePage.connectButton.click();
            await profilePage.connectButton.last().click();
            await profilePage.companies.first().click();
            await profilePage.groupsOfCompanies.click();
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(name)).toBeVisible();

            await page.getByText(name).click();
            await profilePage.deleteButton.click();
            await profilePage.deleteButton.last().click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(name)).not.toBeVisible();
        });

        test('Delete  group of companies', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40z1"
            });

            const name: string = 'TEST_COMPANY_' + faker.string.alphanumeric({ length: { min: 3, max: 5 } })
            const email: string = faker.internet.email({ firstName: 'sastest2398_' });

            await profilePage.companies.click();
            await profilePage.groupsOfCompanies.click();
            await profilePage.companyAddNewGroupButton.click();
            await profilePage.inputFirstField.fill(name);
            await profilePage.inputSecondField.fill(email);
            await profilePage.connectButton.click();
            await profilePage.connectButton.last().click();
            await profilePage.companies.first().click();
            await profilePage.groupsOfCompanies.click();
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(name)).toBeVisible();

            await page.getByText(name).click();
            await profilePage.deleteButton.click();
            await profilePage.deleteButton.last().click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(name)).not.toBeVisible();
        });

    });

});