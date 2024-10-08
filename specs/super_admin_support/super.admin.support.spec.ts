import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { SUPER_ADMIN } from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });

    test.describe('Search under SUPER_ADMIN role', () => {

        test('Search by login under SUPER_ADMIN role', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694py9mp"
            });
            const login: string = "d.pinchuk@itvsystems.com.ua";

            await expect(page.getByText('Technical support')).toBeVisible();

            await profilePage.companySearchByLogin.click();
            await profilePage.inputFirstField.fill(login);
            await profilePage.searchButton.click();

            await expect(page.getByText('Search result for d.pinchuk@itvsystems.com.ua')).toBeVisible();
        });

        test('Search by serial number under SUPER_ADMIN role', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694py9ch"
            });

            const serialNumber: string = "00:08:9B:10:0B:EB";

            await expect(page.getByText('Technical support')).toBeVisible();

            await profilePage.companySearchByNumber.click();
            await profilePage.inputFirstField.fill(serialNumber);
            await profilePage.searchButton.click();

            await expect(page.getByText('Show configuration')).toBeVisible();
        });

        test('Search by account under SUPER_ADMIN role', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694py97x"
            });
            const accountShort: string = "331C";
            const accountFull: string = "331c - AVL TEST ";

            await expect(page.getByText('Technical support')).toBeVisible();

            await profilePage.companySearchByAccount.click();
            await profilePage.inputFirstField.fill(accountShort);
            await page.getByText(accountFull).click();
            await page.waitForTimeout(2000);

            await expect(page.getByText('00:08:B7:FE:33:1C | MPX')).toBeVisible();
        });

    });

});