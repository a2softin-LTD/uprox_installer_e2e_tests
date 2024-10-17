import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { faker } from "@faker-js/faker";

test.describe('Creation of the DEALER', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
    });

    test('Creation of the DEALER under the Role = SUPER_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695ehy9m"
            });

            const name: string = 'COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } })
            const adminEmail: string = faker.internet.email({ firstName: 'sastest2398_' });

            await loginPage.auth(SUPER_ADMIN);

            await expect(page.getByText('Technical support')).toBeVisible();
            expect(page.url()).toContain('/support/search');

            await profilePage.companies.click();
            await expect(page.getByText('Companies:')).toBeVisible();
            await profilePage.dealers.click();

            await expect(profilePage.pageTitle.filter({hasText:'Dealers'})).toBeVisible();

            await profilePage.addButton.click();
            await profilePage.inputFirstField.fill(adminEmail);
            await profilePage.inputSecondField.fill(name);

            await profilePage.addButton.click();

            await expect(profilePage.pageTitle.filter({hasText:'Dealers'})).toBeVisible();
            await expect(page.getByText(name)).toBeVisible();
            await expect(page.getByText(adminEmail)).toBeVisible();

            await (page.getByText(name)).click()
            await profilePage.deleteUserButton.click();
            await profilePage.submitButton.click();

            await expect(profilePage.pageTitle.filter({hasText:'Dealers'})).toBeVisible();

            await expect(page.getByText(name)).not.toBeVisible();
        });

});