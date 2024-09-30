import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {MONITORING_COMPANY_1} from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(MONITORING_COMPANY_1);
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL('/panels');
        profilePage = new ProfilePage(page);

    });

    test('Servers list', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694fb8kd"
        });

        const firstServerText: string = "#1 | secondary 176.36.178.218:41150";
        const secondServerText: string = "#2 | new 113.345.145:4460";
        const thirdServerText: string = "#3 | old 123.345.346:4450";

        await profilePage.company.click();
        await page.waitForTimeout(2000);
        await profilePage.companyServerList.click();
        await page.waitForTimeout(2000);

        await expect(profilePage.companyServerAddButton).toBeVisible();
        await expect(profilePage.entityBlock.nth(0)).toBeVisible();
        await expect(profilePage.entityBlock.nth(1)).toBeVisible();
        await expect(profilePage.entityBlock.nth(2)).toBeVisible();
        await expect(profilePage.entityBlock.nth(0)).toHaveText(firstServerText);
        await expect(profilePage.entityBlock.nth(1)).toHaveText(secondServerText);
        await expect(profilePage.entityBlock.nth(2)).toHaveText(thirdServerText);

    });

    test('Add server', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694fb8nk"
        });
        const newName: string = "New server";
        const newDNS: string = "179.36.500.218";
        const newPort: string = "4480";

        await profilePage.company.click();
        await page.waitForTimeout(2000);
        await profilePage.companyServerList.click();
        await page.waitForTimeout(2000);
        await profilePage.companyServerAddButton.click();
        await profilePage.companyNameServerField.fill(newName);
        await profilePage.companyDnsServerField.fill(newDNS);
        await profilePage.companyPortServerField.fill(newPort);
        await profilePage.saveButton.click();

        await expect(page.getByText(newName)).toBeVisible();

        await profilePage.trashIcon.last().click();
        await profilePage.submitButton.click();
        await page.waitForTimeout(2000);

        await expect(page.getByText(newName)).not.toBeVisible();
    });

    test('Delete server', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694mgxr1"
        });

        const newName: string = "Best server";
        const newDNS: string = "179.36.500.218";
        const newPort: string = "4480";

        await profilePage.company.click();
        await page.waitForTimeout(2000);
        await profilePage.companyServerList.click();
        await page.waitForTimeout(2000);
        await profilePage.companyServerAddButton.click();
        await profilePage.companyNameServerField.fill(newName);
        await profilePage.companyDnsServerField.fill(newDNS);
        await profilePage.companyPortServerField.fill(newPort);
        await profilePage.saveButton.click();

        await expect(page.getByText(newName)).toBeVisible();

        await profilePage.trashIcon.last().click();
        await profilePage.submitButton.click();
        await page.waitForTimeout(2000);

        await expect(page.getByText(newName)).not.toBeVisible();
    });

    test('Server settings editing', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694mh0qb"
        });

        const newName: string = "Best server";
        const newDNS: string = "179.36.500.218";
        const newPort: string = "4480";

        const oldName: string = "old";
        const oldDNS: string = "123.345.346";
        const oldPort: string = "4450";

        await profilePage.company.click();
        await page.waitForTimeout(2000);
        await profilePage.companyServerList.click();
        await page.waitForTimeout(2000);
        await profilePage.findByText((oldName)).click();
        await profilePage.companyNameServerField.fill(newName);
        await profilePage.companyDnsServerField.fill(newDNS);
        await profilePage.companyPortServerField.fill(newPort);
        await profilePage.saveButton.click();
        await page.waitForTimeout(2000);

        await expect(page.getByText(newName)).toBeVisible();

        await profilePage.findByText((newName)).click();
        await profilePage.companyNameServerField.fill(oldName);
        await profilePage.companyDnsServerField.fill(oldDNS);
        await profilePage.companyPortServerField.fill(oldPort);
        await profilePage.saveButton.click();
        await page.waitForTimeout(2000);

        await expect(page.getByText(oldName)).toBeVisible();
    });
});