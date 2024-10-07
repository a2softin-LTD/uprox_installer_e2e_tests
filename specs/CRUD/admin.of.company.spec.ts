import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
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
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage(ENVIRONMENT);
    });

    test.describe('Creation of the Security Company Admin under the different role', () => {

        test.skip('Creation of the Security Company Administrator under the Role = SYSTEM_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694att1n"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email();
            const country: string = "Ukr";
            const contactEmail: string = faker.internet.email();
            const contactPhone: string = faker.phone.number();
            const description: string = "no";
            const contacts: string = "absent";
            const company: string = "фів";

            await loginPage.auth(SYSTEM_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.companies.click();

            await expect(page.getByText('Add company')).toBeVisible();

            await profilePage.companyAddButton.click();
            await profilePage.inputFirstField.fill(name);
            await profilePage.inputSecondField.fill(adminEmail);
            await profilePage.inputThirdField.fill(country);
            await page.getByText('Ukraine').click();
            await profilePage.selectFirstField.click();
            await page.getByText('Test dealer role').click();
            await profilePage.selectSecondField.click();
            await page.getByText('Monitoring company').click();
            await profilePage.inputFourthField.fill(contactEmail);
            await profilePage.inputFifthField.fill(contactPhone);
            await profilePage.inputSixthtField.fill(description);
            await profilePage.inputSeventhField.fill(contacts);
            await profilePage.submitButton.click();

            await expect(page.getByText(name)).toBeVisible();

            await (page.getByText(name)).click();

            await expect(page.getByText(adminEmail)).toBeVisible();
        });

        test.skip('Creation of the Security Company Administrator under the Role = SUPER_ADMIN)', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694att1n"
            });

            const name: string = faker.commerce.productName();
            const adminEmail: string = 'user@';
            const country: string = "Ukr";
            const contactEmail: string = faker.internet.email();
            const contactPhone: string = faker.phone.number();
            const description: string = "no";
            const contacts: string = "absent";
            const company: string = "фів";

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.companies.click();

            await expect(page.getByText('Add company')).toBeVisible();

            await profilePage.companyAddButton.click();
            await profilePage.inputFirstField.fill(name);
            await profilePage.inputSecondField.fill(adminEmail);
            await profilePage.inputThirdField.fill(country);
            await page.getByText('Ukraine').click();
            await profilePage.selectFirstField.click();
            await page.getByText('Test dealer role').click();
            await profilePage.selectSecondField.click();
            await page.getByText('Monitoring company').click();
            await profilePage.inputFourthField.fill(contactEmail);
            await profilePage.inputFifthField.fill(contactPhone);
            await profilePage.inputSixthtField.fill(description);
            await profilePage.inputSeventhField.fill(contacts);
            await profilePage.submitButton.click();

            await expect(page.getByText(name)).toBeVisible();

            await (page.getByText(name)).click();

            await expect(page.getByText(adminEmail)).toBeVisible();
        });

    });

});