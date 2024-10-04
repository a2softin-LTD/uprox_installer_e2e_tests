import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { MIXED,MONITORING_SERVICE_COMPANY_1 } from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
        await expect(page).toHaveURL('/panels');
        await profilePage.company.click();
        await profilePage.companyServerList.click();
        for (const server of await profilePage.entityBlock.all())
        {   await  profilePage.trashIcon.click()
            await profilePage.submitButton.click();}

    });

    test('Servers list: monitoring-service company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694nt17d"
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

    test('Add server: monitoring-service company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694nt050"
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

    test('Delete server: monitoring-service company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694nt0np"
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

    test.skip('Server settings editing: monitoring-service company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694nt1k0"
        });

        const newName: string = "Best server";
        const newDNS: string = "179.36.500.218";
        const newPort: string = "4480";

        const oldName: string = "oldServer";
        const oldDNS: string = "123.345.346";
        const oldPort: string = "4450";

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