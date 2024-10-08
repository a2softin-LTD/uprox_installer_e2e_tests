import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { MIXED } from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(MIXED);
        await expect(page).toHaveURL('/panels');
    });

    test.describe('Hub search', () => {

        test('Search by name: hub', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678p0hwg"
            });
            const name: string = "Os-au";

            await profilePage.panels.click();
            await page.waitForTimeout(2000);
            await page.getByText('By name').click();
            await profilePage.searchField.fill(name);

            await expect(profilePage.entityBlock.filter({hasText:name})).toBeVisible();
            await expect(profilePage.entityBlock).toHaveCount(1);
        });

        test('Search by serial number: hub', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678p0hwg"
            });

            const serialNumber: string = "00:08:9B:10:0B:EB";

            await profilePage.panels.click();
            await page.waitForTimeout(2000);
            await page.getByText('By serial number').click();
            await profilePage.searchField.fill(serialNumber);

            await expect(profilePage.entityBlock.filter({hasText:serialNumber})).toBeVisible();
            await expect(profilePage.entityBlock).toHaveCount(1);
        });

        test('Search by account: hub', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678p0hwg"
            });
            const account: string = "331C";

            await profilePage.panels.click();
            await page.waitForTimeout(2000);
            await page.getByText('By account').click();
            await profilePage.searchField.fill(account);

            await expect(profilePage.entityBlock.filter({hasText:account})).toBeVisible();
            await expect(profilePage.entityBlock).toHaveCount(1);
        });

    });

});