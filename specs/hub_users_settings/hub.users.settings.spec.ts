import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";
import {
    BUTTON_TRANSFER_OWNERSHIP,
    CODE_HIDE, CODE_SECOND,
    SETTINGS_ALARMS_RESTORES,
    SETTINGS_ARMS_DISARM,
    SETTINGS_ENABLED,
    SETTINGS_TROUBLES_RESTORES,
    TEXT_ADD_KEYFOB,
    TEXT_ADD_KEYFOB_INSTRUCTION_FIRST, TEXT_ADD_KEYFOB_INSTRUCTION_SECOND,
    TEXT_CANSEL_REGISTRY,
    TEXT_MOBILE,
    TEXT_MOBILE_NEW,
    TEXT_SERVICE,
    TEXT_SUBMIT,
    TEXT_USER_MANAGEMENT,
    TITLE_EDIT_USER,
    TITLE_UPDATE_FIRMWARE_VERSION,
    TITLE_USERS,
    URL_LOGIN,
    URL_PROFILE_PANELS,
    USER_FULL_FIRST,
    USER_NAME,
    USER_PHONE_NEW
} from "../../utils/constants";

test.describe('Hub Page tests', { tag: ['@hub', '@stable']}, () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);

        await hubPage.panels.click();
        await hubPage.firstHub.click();
        await page.waitForTimeout(2000);

        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click();

        if (await (page.getByText(USER_NAME)).isVisible()) {
            await page.getByText(USER_NAME).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(USER_NAME);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible({timeout:15000});}
        catch (error) {console.error(`An error occurred: ${error.message}`);
        await page.reload();
            await page.waitForTimeout(1000);
        await hubPage.backButton.click();}
        finally {await expect(page.getByText(USER_FULL_FIRST)).toBeVisible();}
    });

    test('Checking UI elements on the hub users page', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(hubPage.transferOwnershipButton).toBeVisible();
        await expect(hubPage.addButton).toBeVisible();
        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_USERS)})).toBeVisible();
    });

    test('Checking UI elements on the hub user edit page', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await page.getByText(USER_FULL_FIRST).click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_EDIT_USER)})).toBeVisible();
        await expect(hubPage.settingsKeyfob).toBeVisible();
        await expect(hubPage.settingsMobileApp).toBeVisible();
        await expect(hubPage.settingsArmKeypadCode).toBeVisible();
        await expect(hubPage.settingsCallOnAlarm).toBeVisible();
        await expect(hubPage.deleteUserButton).toBeVisible();

        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();

        await expect (page.getByText((USER_FULL_FIRST))).not.toBeVisible();
    });

    test.describe('Hub users settings', () => {

        test('Arm keypad code', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            await page.getByText(USER_FULL_FIRST).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsArmKeypadCode.click();
            await hubPage.settingsKeypadCodeField.fill(CODE_SECOND);
            await hubPage.saveButton.click()

            await expect(hubPage.settingsArmKeypadCode.filter({hasText:CODE_HIDE})).toBeVisible();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((USER_FULL_FIRST))).not.toBeVisible();
        });

        test('Mobile application', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            await (page.getByText(USER_FULL_FIRST)).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await hubPage.backButton.click();

            await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();
            await expect(page.getByText(USER_FULL_FIRST)).toBeVisible();
            await expect(page.getByText(TEXT_MOBILE)).toBeVisible();

            await page.getByText(USER_FULL_FIRST).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((USER_FULL_FIRST))).not.toBeVisible();
        });

        test('User management', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            await (page.getByText(USER_FULL_FIRST)).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsUserManagement.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();
            await hubPage.users.click();

            await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();
            await expect(page.getByText(USER_FULL_FIRST)).toBeVisible();
            await expect(page.getByText(TEXT_MOBILE_NEW)).toBeVisible();
            await expect(page.getByText(TEXT_USER_MANAGEMENT)).toBeVisible();

            await page.getByText(USER_FULL_FIRST).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((USER_FULL_FIRST))).not.toBeVisible();
        });

        test('Mobile panic button', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            await (page.getByText(USER_FULL_FIRST)).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsPanicButton.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();
            await expect(hubPage.settingsPanicButton.filter({hasText:SETTINGS_ENABLED})).toBeVisible();

            await hubPage.users.click();

            await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();
            await expect(page.getByText(USER_FULL_FIRST)).toBeVisible();

            await page.getByText(USER_FULL_FIRST).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((USER_FULL_FIRST))).not.toBeVisible();
        });

        test('Keyfob', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            await (page.getByText(USER_FULL_FIRST)).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsKeyfob.click();
            await expect(page.getByText(TEXT_ADD_KEYFOB)).toBeVisible();
            await expect(page.getByText( TEXT_ADD_KEYFOB_INSTRUCTION_FIRST)).toBeVisible();
            await expect(page.getByText(TEXT_CANSEL_REGISTRY)).toBeVisible();

            await hubPage.settingsKeyfobImage.nth(0).click();

            await expect(page.getByText(TEXT_ADD_KEYFOB_INSTRUCTION_SECOND)).toBeVisible();

            await page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TEXT_ADD_KEYFOB)).toBeVisible();

            await hubPage.settingsKeyfobImage.nth(1).click();

            await expect(page.getByText(TEXT_ADD_KEYFOB_INSTRUCTION_SECOND)).toBeVisible();

            await page.reload();
            await page.waitForTimeout(2000);

            await hubPage.settingsKeyfobImage.nth(2).click();

            await expect(page.getByText(TEXT_ADD_KEYFOB_INSTRUCTION_SECOND)).toBeVisible();

            await page.reload();
            await page.waitForTimeout(2000);

            await hubPage.backButton.click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.users.click();

            await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();
            await expect(page.getByText(USER_FULL_FIRST)).toBeVisible();

            await page.getByText(USER_FULL_FIRST).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((USER_FULL_FIRST))).not.toBeVisible();
        });

        test('Call on alarm', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            await (page.getByText(USER_FULL_FIRST)).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsCallOnAlarm.click();
            await hubPage.enableButton.click();
            await hubPage.inputFirstField.fill(USER_PHONE_NEW);
            await hubPage.saveButton.click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();
            await expect(hubPage.settingsCallOnAlarm.filter({hasText:USER_PHONE_NEW})).toBeVisible();

            await hubPage.users.click();

            await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();
            await expect(page.getByText(USER_FULL_FIRST)).toBeVisible();

            await page.getByText(USER_FULL_FIRST).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((USER_FULL_FIRST))).not.toBeVisible();
        });

        test('Event categories', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            await (page.getByText(USER_FULL_FIRST)).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsEventCategories.click();

            await expect(page.getByText(TEXT_SUBMIT)).toBeVisible();

            await (page.getByText(SETTINGS_ARMS_DISARM)).click();
            await (page.getByText(SETTINGS_ALARMS_RESTORES)).click();
            await (page.getByText(SETTINGS_TROUBLES_RESTORES)).click();
            await hubPage.submitButton.click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();
            await expect(hubPage.settingsEventCategories.filter({hasText:TEXT_SERVICE})).toBeVisible();

            await hubPage.users.click();

            await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();
            await expect(page.getByText(USER_FULL_FIRST)).toBeVisible();

            await page.getByText(USER_FULL_FIRST).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((USER_FULL_FIRST))).not.toBeVisible();
        });
    });

});