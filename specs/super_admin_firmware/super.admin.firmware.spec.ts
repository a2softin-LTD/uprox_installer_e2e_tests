import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import * as path from "node:path";

test.describe('Firmware under SUPER_ADMIN role', { tag: ['@stable']  }, () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });

    test.describe('Checking UI elements of the panel firmware versions page', () => {

        test('Checking UI elements of the panel firmware versions page', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await profilePage.firmware.click();

            await expect(profilePage.uploadFirmwareButton).toBeVisible();
            await expect(profilePage.pageTitle.filter({has:page.getByText('Panel firmware versions')})).toBeVisible();
            await expect(page.getByText('Channel')).toBeVisible();
            await expect(page.getByText('Device type')).toBeVisible();
            await expect(page.getByText('Version code')).toBeVisible();
            await expect(page.getByText('Version type')).toBeVisible();
            await expect(page.getByText('Deploy percentage')).toBeVisible();
            await expect(page.getByText('ftp-link')).toBeVisible();
        });
    });

    test.describe('Firmware under SUPER_ADMIN role', () => {

        test('Add panel firmware version under SUPER_ADMIN role', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const versionCode: string = "2279";
            const versionName: string = "22.79";

            await profilePage.firmware.click();

            await expect(page.getByText('Panel firmware versions').first()).toBeVisible();

            await profilePage.uploadFirmwareButton.click();

            await expect(page.getByText('Filename').first()).toBeVisible();

            await page.waitForTimeout(1000);
            await profilePage.upLoadFirmwareSelectFile.setInputFiles("./test-data/mpx_ua_dev_22_79.ebin");
            await page.waitForTimeout(1000);
            await profilePage.uploadFirmwareCode.fill(versionCode);
            await page.waitForTimeout(1000);
            await profilePage.uploadFirmwareName.fill(versionName);

            await page.waitForTimeout(1000);
            await profilePage.submitButton.click();

            await page.waitForTimeout(5000);
            await expect(page.getByText('Panel firmware versions').first()).toBeVisible();
            await expect(page.getByText(versionCode)).toBeVisible();

            await (profilePage.rowBlock.filter({hasText: '2279'})).locator(profilePage.trashIcon).click();
            await expect(page.getByText('Deleting version')).toBeVisible();
            await profilePage.deleteButton.click();

            await expect(page.getByText('Panel firmware versions').first()).toBeVisible();
            await expect(page.getByText(versionCode)).not.toBeVisible();
        });

        test('Delete panel firmware version under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            const versionCode: string = "2279";
            const versionName: string = "22.79";

            await profilePage.firmware.click();

            await expect(page.getByText('Panel firmware versions').first()).toBeVisible();

            await profilePage.uploadFirmwareButton.click();

            await expect(page.getByText('Filename').first()).toBeVisible();

            await page.waitForTimeout(1000);
            await profilePage.upLoadFirmwareSelectFile.setInputFiles("./test-data/mpx_ua_dev_22_79.ebin");
            await page.waitForTimeout(1000);
            await profilePage.uploadFirmwareCode.fill(versionCode);
            await page.waitForTimeout(1000);
            await profilePage.uploadFirmwareName.fill(versionName);

            await page.waitForTimeout(1000);
            await profilePage.submitButton.click();

            await page.waitForTimeout(5000);
            await expect(page.getByText('Panel firmware versions').first()).toBeVisible();
            await expect(page.getByText(versionCode)).toBeVisible();

            await (profilePage.rowBlock.filter({hasText: '2279'})).locator(profilePage.trashIcon).click();
            await expect(page.getByText('Deleting version')).toBeVisible();
            await profilePage.deleteButton.click();

            await expect(page.getByText('Panel firmware versions').first()).toBeVisible();
            await expect(page.getByText(versionCode)).not.toBeVisible();

        });

        test('List of panel firmware versions under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            await profilePage.firmware.click();

            await expect(page.getByText('Panel firmware versions').first()).toBeVisible();

            for (const firmware of await hubPage.rowBlock.all())
                await expect(firmware).toBeVisible();

            for (const firmware of await profilePage.rowBlock.all())
            {await expect(firmware.filter({has: profilePage.trashIcon})).toBeVisible();}
        });


    });

    test.describe('Checking UI elements of the console app firmware versions page', () => {

        test('Checking UI elements of the console app firmware versions page', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await profilePage.firmware.click();
            await profilePage.consoleApplication.click();

            await expect(profilePage.uploadFirmwareButton).toBeVisible();
            await expect(profilePage.pageTitle.filter({has:page.getByText('Console application firmware versions')})).toBeVisible();
            await expect(page.getByText('Version code')).toBeVisible();
            await expect(page.getByText('Version type')).toBeVisible();
            await expect(page.getByText('ftp-link')).toBeVisible();
        });
    });

    test.describe('Firmware under SUPER_ADMIN role', () => {

        test.skip('Add console app firmware version under SUPER_ADMIN role', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const versionCode: string = "2279";
            const versionName: string = "22.79";

            await profilePage.firmware.click();
            await profilePage.consoleApplication.click();

            await expect(page.getByText('Console application firmware versions').first()).toBeVisible();

            await profilePage.uploadFirmwareButton.click();

            await expect(page.getByText('Filename').first()).toBeVisible();

            await page.waitForTimeout(1000);
            await profilePage.upLoadFirmwareSelectFile.setInputFiles("./test-data/console_2,456.exe");
            await page.waitForTimeout(1000);
            await profilePage.uploadFirmwareCode.fill(versionCode);
            await page.waitForTimeout(1000);
            await profilePage.uploadFirmwareName.fill(versionName);

            await page.waitForTimeout(1000);
            await profilePage.submitButton.click();

            await page.waitForTimeout(5000);
            await expect(page.getByText('Console application firmware versions').first()).toBeVisible();
            await expect(page.getByText(versionCode)).toBeVisible();

            await (profilePage.rowBlock.filter({hasText: '2279'})).locator(profilePage.trashIcon).click();
            await expect(page.getByText('Deleting version')).toBeVisible();
            await profilePage.deleteButton.click();

            await expect(page.getByText('Console application firmware versions').first()).toBeVisible();
            await expect(page.getByText(versionCode)).not.toBeVisible();
        });

        test.skip('Delete console app firmware version under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            const versionCode: string = "2279";
            const versionName: string = "22.79";

            await profilePage.firmware.click();
            await profilePage.consoleApplication.click();

            await expect(page.getByText('Console application firmware versions').first()).toBeVisible();

            await profilePage.uploadFirmwareButton.click();

            await expect(page.getByText('Filename').first()).toBeVisible();

            await page.waitForTimeout(1000);
            await profilePage.upLoadFirmwareSelectFile.setInputFiles("./test-data/mpx_ua_dev_22_79.ebin");
            await page.waitForTimeout(1000);
            await profilePage.uploadFirmwareCode.fill(versionCode);
            await page.waitForTimeout(1000);
            await profilePage.uploadFirmwareName.fill(versionName);

            await page.waitForTimeout(1000);
            await profilePage.submitButton.click();

            await page.waitForTimeout(5000);
            await expect(page.getByText('Console application firmware versions').first()).toBeVisible();
            await expect(page.getByText(versionCode)).toBeVisible();

            await (profilePage.rowBlock.filter({hasText: '2279'})).locator(profilePage.trashIcon).click();
            await expect(page.getByText('Deleting version')).toBeVisible();
            await profilePage.deleteButton.click();

            await expect(page.getByText('Console application firmware versions').first()).toBeVisible();
            await expect(page.getByText(versionCode)).not.toBeVisible();

        });

        test('List of console app firmware versions under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            await profilePage.firmware.click();
            await profilePage.consoleApplication.click();

            await expect(page.getByText('Console application firmware versions').first()).toBeVisible();

            for (const firmware of await hubPage.rowBlock.all())
                await expect(firmware).toBeVisible();

            for (const firmware of await profilePage.rowBlock.all())
            {await expect(firmware.filter({has: profilePage.trashIcon})).toBeVisible();}
        });

    });

});