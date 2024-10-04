import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { MONITORING_COMPANY } from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(MONITORING_COMPANY);
        await expect(page).toHaveURL('/panels');
        await profilePage.company.click();
        await profilePage.companyServerList.click();
        for (const server of await profilePage.entityBlock.all())
        {   await  profilePage.trashIcon.click()
            await profilePage.submitButton.click();}

    });

    test('Servers list: monitoring company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694fb8kd"
        });

        await profilePage.company.click();
        await profilePage.companyServerList.click();

        await expect(profilePage.companyServerAddButton).toBeVisible();
        for (const server of await profilePage.entityBlock.all())
            await expect(server).toBeVisible();
        for (const server of await profilePage.entityBlock.all())
        {await expect(server.filter({has: profilePage.companyServerNameInfo})).toBeVisible();}
        for (const server of await profilePage.entityBlock.all())
        {await expect(server.filter({has: profilePage.companyServerDnsPortInfo})).toBeVisible();}
        for (const server of await profilePage.entityBlock.all())
        {await expect(server.filter({has: profilePage.trashIcon})).toBeVisible();}
    });

    test('Add server: monitoring company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694fb8nk"
        });
        const newName: string = "New server";
        const newDNS: string = "179.36.500.218";
        const newPort: string = "4480";

        await profilePage.company.click();
        await profilePage.companyServerList.click();
        await profilePage.companyServerAddButton.click();
        await profilePage.companyNameServerField.fill(newName);
        await profilePage.companyDnsServerField.fill(newDNS);
        await profilePage.companyPortServerField.fill(newPort);
        await profilePage.saveButton.click();

        await expect(page.getByText(newName)).toBeVisible();

        await profilePage.trashIcon.last().click();
        await profilePage.submitButton.click();
        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(2000);
        await expect(page.getByText(newName)).not.toBeVisible();
    });

    test('Delete server: monitoring company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694mgxr1"
        });

        const newName: string = "Best server";
        const newDNS: string = "179.36.500.218";
        const newPort: string = "4480";

        await profilePage.company.click();
        await profilePage.companyServerList.click();
        await profilePage.companyServerAddButton.click();
        await profilePage.companyNameServerField.fill(newName);
        await profilePage.companyDnsServerField.fill(newDNS);
        await profilePage.companyPortServerField.fill(newPort);
        await profilePage.saveButton.click();

        await expect(page.getByText(newName)).toBeVisible();

        await profilePage.trashIcon.last().click();
        await profilePage.submitButton.click();
        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(2000);

        await expect(page.getByText(newName)).not.toBeVisible();
    });

    test('Server settings editing: monitoring company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694mh0qb"
        });

        const newName: string = "Best new server";
        const newDNS: string = "179.36.500.218";
        const newPort: string = "4480";

        const oldName: string = "Worst server";
        const oldDNS: string = "345.345.346";
        const oldPort: string = "4455";

        await profilePage.company.click();
        await profilePage.companyServerList.click();
        await profilePage.companyServerAddButton.click();
        await profilePage.companyNameServerField.fill(oldName);
        await profilePage.companyDnsServerField.fill(oldDNS);
        await profilePage.companyPortServerField.fill(oldPort);
        await profilePage.saveButton.click();
        await expect(page.getByText(oldName)).toBeVisible();

        await page.getByText((oldName)).click();
        await profilePage.companyNameServerField.fill(newName);
        await profilePage.companyDnsServerField.fill(newDNS);
        await profilePage.companyPortServerField.fill(newPort);
        await profilePage.saveButton.click();

        await expect(page.getByText(newName)).toBeVisible();

        await profilePage.trashIcon.last().click();
        await profilePage.submitButton.click();
        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(2000);
        await expect(page.getByText(newName)).not.toBeVisible();
    });
});