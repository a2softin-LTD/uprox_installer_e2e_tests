import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {USER_1} from "../../utils/user_data";
import {MONITORING_COMPANY_1} from "../../utils/user_data";


test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(MONITORING_COMPANY_1);
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
        expect(profilePage.companyServerAddButton).toBeVisible();
        expect(profilePage.companyFirstServer).toBeVisible();
        expect(profilePage.companySecondServer).toBeVisible();
        expect(profilePage.companyThirdServer).toBeVisible();
        expect(profilePage.companyFirstServer).toHaveText(firstServerText);
        expect(profilePage.companySecondServer).toHaveText(secondServerText);
        expect(profilePage.companyThirdServer).toHaveText(thirdServerText);

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

        expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
        expect(page.getByText(newName)).toBeVisible();


        await page.waitForTimeout(2000);
        await profilePage.trashIcon.last().click();
        await profilePage.submitButton.click();
        expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
        await page.waitForTimeout(2000);
        expect(page.getByText(newName)).not.toBeVisible();

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

        expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
        expect(page.getByText(newName)).toBeVisible();

        await page.waitForTimeout(2000);
        await profilePage.trashIcon.last().click();
        await profilePage.submitButton.click();
        expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
        await page.waitForTimeout(2000);
        expect(page.getByText(newName)).not.toBeVisible();

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

        expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
        await page.waitForTimeout(2000);
        expect(page.getByText(newName)).toBeVisible();

        await profilePage.findByText((newName)).click();
        await profilePage.companyNameServerField.fill(oldName);
        await profilePage.companyDnsServerField.fill(oldDNS);
        await profilePage.companyPortServerField.fill(oldPort);
        await profilePage.saveButton.click();

        expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
        await page.waitForTimeout(2000);
        expect(page.getByText(oldName)).toBeVisible();

    });


});