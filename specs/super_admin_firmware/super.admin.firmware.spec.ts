import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import {
    TEXT_CHANNEL,
    TEXT_DELETING_VERSION,
    TEXT_DEPLOY_PERCENTAGE,
    TEXT_DEVICE_TYPE, TEXT_FILENAME,
    TEXT_FTP_LINK,
    TEXT_VERSION_CODE,
    TEXT_VERSION_TYPE,
    TITLE_CONSOLE_FIRMWARE_VERSIONS,
    TITLE_PANEL_FIRMWARE_VERSIONS, VERSION_CODE, VERSION_NAME
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('SuperAdmin Page test', () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;
    let superAdminPage: SuperAdminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);
        superAdminPage = new SuperAdminPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });

    test('Checking UI elements of the panel firmware versions page', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await superAdminPage.firmware.click();

            await expect(superAdminPage.uploadFirmwareButton).toBeVisible();
            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_PANEL_FIRMWARE_VERSIONS)})).toBeVisible();
            await expect(page.getByText(TEXT_CHANNEL)).toBeVisible();
            await expect(page.getByText(TEXT_DEVICE_TYPE)).toBeVisible();
            await expect(page.getByText(TEXT_VERSION_CODE)).toBeVisible();
            await expect(page.getByText(TEXT_VERSION_TYPE)).toBeVisible();
            await expect(page.getByText(TEXT_DEPLOY_PERCENTAGE)).toBeVisible();
            await expect(page.getByText(TEXT_FTP_LINK)).toBeVisible();
    });

    test.describe('Firmware under SUPER_ADMIN role', () => {

        test('Add panel firmware version under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694p4320'
            });

            await superAdminPage.firmware.click();

            await expect(page.getByText(TITLE_PANEL_FIRMWARE_VERSIONS).first()).toBeVisible();

            await superAdminPage.uploadFirmwareButton.click();

            await expect(page.getByText(TEXT_FILENAME).first()).toBeVisible();

            await page.waitForTimeout(1000);
            await superAdminPage.upLoadFirmwareSelectFile.setInputFiles("./test-data/mpx_ua_dev_22_79.ebin");
            await page.waitForTimeout(1000);
            await superAdminPage.uploadFirmwareCode.fill(VERSION_CODE);
            await page.waitForTimeout(1000);
            await superAdminPage.uploadFirmwareName.fill(VERSION_NAME);

            await page.waitForTimeout(1000);
            await superAdminPage.submitButton.click();

            await page.waitForTimeout(5000);
            await expect(page.getByText(TITLE_PANEL_FIRMWARE_VERSIONS).first()).toBeVisible({timeout:10000});
            await expect(page.getByText(VERSION_CODE)).toBeVisible();

            await (superAdminPage.rowBlock.filter({hasText: VERSION_CODE})).locator(superAdminPage.trashIcon).click();
            await expect(page.getByText(TEXT_DELETING_VERSION)).toBeVisible();
            await superAdminPage.deleteButton.click();

            await expect(page.getByText(TITLE_PANEL_FIRMWARE_VERSIONS).first()).toBeVisible();
            await expect(page.getByText(VERSION_CODE)).not.toBeVisible();
        });

        test('Delete panel firmware version under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694p434a'
            });


            await superAdminPage.firmware.click();

            await expect(page.getByText(TITLE_PANEL_FIRMWARE_VERSIONS).first()).toBeVisible();

            await superAdminPage.uploadFirmwareButton.click();

            await expect(page.getByText(TEXT_FILENAME).first()).toBeVisible();

            await page.waitForTimeout(1000);
            await superAdminPage.upLoadFirmwareSelectFile.setInputFiles("./test-data/mpx_ua_dev_22_79.ebin");
            await page.waitForTimeout(1000);
            await superAdminPage.uploadFirmwareCode.fill(VERSION_CODE);
            await page.waitForTimeout(1000);
            await superAdminPage.uploadFirmwareName.fill(VERSION_NAME);

            await page.waitForTimeout(1000);
            await superAdminPage.submitButton.click();

            await page.waitForTimeout(5000);
            await expect(page.getByText(TITLE_PANEL_FIRMWARE_VERSIONS).first()).toBeVisible({timeout:10000});
            await expect(page.getByText(VERSION_CODE)).toBeVisible();

            await (superAdminPage.rowBlock.filter({hasText: VERSION_CODE})).locator(superAdminPage.trashIcon).click();
            await expect(page.getByText(TEXT_DELETING_VERSION)).toBeVisible();
            await superAdminPage.deleteButton.click();

            await expect(page.getByText(TITLE_PANEL_FIRMWARE_VERSIONS).first()).toBeVisible();
            await expect(page.getByText(VERSION_CODE)).not.toBeVisible();

        });

        test('List of panel firmware versions under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694p42zr'
            });

            await superAdminPage.firmware.click();

            await expect(page.getByText(TITLE_PANEL_FIRMWARE_VERSIONS).first()).toBeVisible();

            for (const firmware of await superAdminPage.rowBlock.all())
                await expect(firmware).toBeVisible();

            for (const firmware of await superAdminPage.rowBlock.all())
            {await expect(firmware.filter({has: superAdminPage.trashIcon})).toBeVisible();}
        });

    });

    test('Checking UI elements of the console app firmware versions page', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await superAdminPage.firmware.click();
            await superAdminPage.consoleApplication.click();

            await expect(superAdminPage.uploadFirmwareButton).toBeVisible();
            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_CONSOLE_FIRMWARE_VERSIONS)})).toBeVisible();
            await expect(page.getByText(TEXT_VERSION_CODE)).toBeVisible();
            await expect(page.getByText(TEXT_VERSION_TYPE)).toBeVisible();
            await expect(page.getByText(TEXT_FTP_LINK)).toBeVisible();
    });

    test.describe('Firmware under SUPER_ADMIN role', () => {

        test.skip('Add console app firmware version under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694p43de'
            });

            await superAdminPage.firmware.click();
            await superAdminPage.consoleApplication.click();

            await expect(page.getByText(TITLE_CONSOLE_FIRMWARE_VERSIONS).first()).toBeVisible();

            await superAdminPage.uploadFirmwareButton.click();

            await expect(page.getByText(TEXT_FILENAME).first()).toBeVisible();

            await page.waitForTimeout(1000);
            await superAdminPage.upLoadFirmwareSelectFile.setInputFiles("./test-data/console_2,456.exe");
            await page.waitForTimeout(1000);
            await superAdminPage.uploadFirmwareCode.fill(VERSION_CODE);
            await page.waitForTimeout(1000);
            await superAdminPage.uploadFirmwareName.fill(VERSION_NAME);

            await page.waitForTimeout(1000);
            await superAdminPage.submitButton.click();

            await page.waitForTimeout(5000);
            await expect(page.getByText(TITLE_CONSOLE_FIRMWARE_VERSIONS).first()).toBeVisible();
            await expect(page.getByText(VERSION_CODE)).toBeVisible();

            await (superAdminPage.rowBlock.filter({hasText: VERSION_CODE})).locator(superAdminPage.trashIcon).click();
            await expect(page.getByText(TEXT_DELETING_VERSION)).toBeVisible();
            await superAdminPage.deleteButton.click();

            await expect(page.getByText(TITLE_CONSOLE_FIRMWARE_VERSIONS).first()).toBeVisible();
            await expect(page.getByText(VERSION_CODE)).not.toBeVisible();
        });

        test.skip('Delete console app firmware version under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694pk0nj'
            });

            await superAdminPage.firmware.click();
            await superAdminPage.consoleApplication.click();

            await expect(page.getByText(TITLE_CONSOLE_FIRMWARE_VERSIONS).first()).toBeVisible();

            await superAdminPage.uploadFirmwareButton.click();

            await expect(page.getByText(TEXT_FILENAME).first()).toBeVisible();

            await page.waitForTimeout(1000);
            await superAdminPage.upLoadFirmwareSelectFile.setInputFiles("./test-data/mpx_ua_dev_22_79.ebin");
            await page.waitForTimeout(1000);
            await superAdminPage.uploadFirmwareCode.fill(VERSION_CODE);
            await page.waitForTimeout(1000);
            await superAdminPage.uploadFirmwareName.fill(VERSION_NAME);

            await page.waitForTimeout(1000);
            await superAdminPage.submitButton.click();

            await page.waitForTimeout(5000);
            await expect(page.getByText(TITLE_CONSOLE_FIRMWARE_VERSIONS).first()).toBeVisible();
            await expect(page.getByText(VERSION_CODE)).toBeVisible();

            await (superAdminPage.rowBlock.filter({hasText: VERSION_CODE})).locator(superAdminPage.trashIcon).click();
            await expect(page.getByText(TEXT_DELETING_VERSION)).toBeVisible();
            await superAdminPage.deleteButton.click();

            await expect(page.getByText(TITLE_CONSOLE_FIRMWARE_VERSIONS).first()).toBeVisible();
            await expect(page.getByText(VERSION_CODE)).not.toBeVisible();

        });

        test('List of console app firmware versions under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694p43cq'
            });

            await superAdminPage.firmware.click();
            await superAdminPage.consoleApplication.click();

            await expect(page.getByText(TITLE_CONSOLE_FIRMWARE_VERSIONS).first()).toBeVisible();

            for (const firmware of await superAdminPage.rowBlock.all())
                await expect(firmware).toBeVisible();

            for (const firmware of await superAdminPage.rowBlock.all())
            {await expect(firmware.filter({has: superAdminPage.trashIcon})).toBeVisible();}
        });

    });

});