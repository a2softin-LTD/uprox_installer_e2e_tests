import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";
import {
    BUTTON_ADD_USER,
    BUTTON_ADD_WIRELESS_DEVICE,
    BUTTON_RESTART_PANEL,
    BUTTON_TRANSFER_OWNERSHIP, CODE_FIRST,
    COUNTRY_MOLDOVA,
    COUNTRY_UKRAINE,
    HUB_NAME_FIRST,
    HUB_NAME_THIRD,
    SETTINGS_10_SECONDS,
    SETTINGS_30_SECONDS,
    SETTINGS_AUTOMATICALLY,
    SETTINGS_DISABLE,
    SETTINGS_DISABLED,
    SETTINGS_MANUALLY,
    SETTINGS_TRACK,
    SETTINGS_TURN_OFF,
    SETTINGS_TURN_ON, TEXT_4_SYMBOLS, TEXT_6_SYMBOLS,
    TEXT_CHANGE_KEYPAD_CODE_LENGTH, TEXT_COMMUNITY, TEXT_DISABLE_RADIO_JAM, TEXT_DISABLE_TAMPER, TEXT_DISTRICT,
    TEXT_INSTALLATION_COUNTRY, TEXT_PANEL_TAMPER_DISABLED, TEXT_RADIO_JAM_DISABLED, TEXT_REGION, TEXT_SELECT_COMMUNITY,
    TEXT_SELECT_CONTROLLER_TIME_ZONE, TEXT_SELECT_DISTRICT, TEXT_SELECT_REGION,
    TIME_ZONE_FIRST,
    TIME_ZONE_SECOND, TITLE_SPECIAL_SETTINGS,
    TITLE_UPDATE_FIRMWARE_VERSION,
    TITLE_USERS,
    URL_LOGIN,
    URL_PROFILE_PANELS, USER_FULL_FIRST, USER_NAME
} from "../../utils/constants";

test.describe('Hub Page tests',{ tag: '@hub' }, () => {

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

        await hubPage.hubPanel.click();
    });

    test('Name setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await page.waitForTimeout(2000);

        if (await hubPage.settingsHubName.filter({hasText:HUB_NAME_THIRD}).isVisible()){
            await hubPage.settingsHubName.click();
            await hubPage.inputField.fill(HUB_NAME_FIRST);
            await hubPage.saveButton.click();
            await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
            await expect(hubPage.settingsHubName.filter({hasText:HUB_NAME_FIRST})).toBeVisible();}

        else { await hubPage.settingsHubName.click();

        await hubPage.inputField.fill(HUB_NAME_THIRD);
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsHubName.filter({hasText:HUB_NAME_THIRD})).toBeVisible();

        await hubPage.settingsHubName.click();
        await hubPage.inputField.fill(HUB_NAME_FIRST);
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsHubName.filter({hasText:HUB_NAME_FIRST})).toBeVisible();}
    });
    test('Country setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await page.waitForTimeout(2000);

        if (await hubPage.settingsCountry.filter({hasText:COUNTRY_MOLDOVA}).isVisible()){
            await hubPage.settingsCountry.click();

            await expect(page.getByText(TEXT_INSTALLATION_COUNTRY)).toBeVisible();

            await hubPage.inputField.click();
            await page.getByText(COUNTRY_UKRAINE, {exact: true}).click();
            await hubPage.submitButton.click();
            await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
            await expect(hubPage.settingsCountry.filter({hasText:COUNTRY_UKRAINE})).toBeVisible();}

        else {await hubPage.settingsCountry.click();

        await expect(page.getByText(TEXT_INSTALLATION_COUNTRY)).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText(COUNTRY_MOLDOVA, {exact: true}).click();

        await hubPage.submitButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsCountry.filter({hasText:COUNTRY_MOLDOVA})).toBeVisible();

        await hubPage.settingsCountry.click();

        await expect(page.getByText(TEXT_INSTALLATION_COUNTRY)).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText(COUNTRY_UKRAINE, {exact: true}).click();
        await hubPage.submitButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsCountry.filter({hasText:COUNTRY_UKRAINE})).toBeVisible();}
    });

    test('Firmware update setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await page.waitForTimeout(2000);

        if (await hubPage.settingsFirmwareUpdate.filter({hasText:SETTINGS_MANUALLY}).isVisible()){
            await hubPage.settingsFirmwareUpdate.click();
            await page.getByText(SETTINGS_AUTOMATICALLY, {exact: true}).click();
            await hubPage.saveButton.click();
            await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
            await expect(hubPage.settingsFirmwareUpdate.filter({hasText:SETTINGS_AUTOMATICALLY})).toBeVisible();}

        else {await hubPage.settingsFirmwareUpdate.click();

        await page.getByText(SETTINGS_MANUALLY, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsFirmwareUpdate.filter({hasText:SETTINGS_MANUALLY})).toBeVisible();

        await hubPage.settingsFirmwareUpdate.click();
        await page.getByText(SETTINGS_AUTOMATICALLY, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsFirmwareUpdate.filter({hasText:SETTINGS_AUTOMATICALLY})).toBeVisible();}
    });

    test('Light Indication setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await page.waitForTimeout(2000);

        if (await hubPage.settingsLightIndication.filter({hasText:SETTINGS_TURN_OFF}).isVisible()){
            await hubPage.settingsLightIndication.click();
            await (page.getByText(SETTINGS_TURN_ON, {exact: true}).first()).click();
            await hubPage.saveButton.click();
            await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
            await expect(hubPage.settingsLightIndication.filter({hasText:SETTINGS_TURN_ON})).toBeVisible();}

        else {await hubPage.settingsLightIndication.click();

        await (page.getByText(SETTINGS_TURN_OFF, {exact: true}).first()).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(page.getByText(SETTINGS_TURN_OFF).first()).toBeVisible();

        await hubPage.settingsLightIndication.click();
        await page.getByText(SETTINGS_TURN_ON, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(page.getByText(SETTINGS_TURN_ON)).toBeVisible();}
    });

    test('Hub air alarm setting', { tag: ['@smoke'] }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await hubPage.settingsAirAlarm.click();
        await hubPage.onButton.click();
        await page.getByText(TEXT_SELECT_REGION).click();
        await page.getByText((TEXT_REGION)).click();
        await page.getByText(TEXT_SELECT_DISTRICT).click();
        await page.getByText((TEXT_DISTRICT)).click();
        await page.getByText(TEXT_SELECT_COMMUNITY).click();
        await page.getByText((TEXT_COMMUNITY)).click();
        await hubPage.saveButton.click();
        await hubPage.settingsAirAlarm.click();
        await hubPage.offButton.click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(page.getByText(SETTINGS_TURN_OFF)).toBeVisible();
    });

    test('Track Sim-Card Expenses setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await page.waitForTimeout(2000);

        if (await hubPage.settingsTrackSimCardExpenses.filter({hasText:SETTINGS_TRACK, hasNotText:SETTINGS_DISABLE}).isVisible()){
            await hubPage.settingsTrackSimCardExpenses.click();
            await hubPage.disableButton.click();
            await hubPage.saveButton.click();
            await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
            await expect(hubPage.settingsTrackSimCardExpenses.filter({hasText:SETTINGS_DISABLED})).toBeVisible();}

        else {await hubPage.settingsTrackSimCardExpenses.click();

        await page.getByText(SETTINGS_TRACK, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsTrackSimCardExpenses.filter({hasText:SETTINGS_TRACK})).toBeVisible();

        await hubPage.settingsTrackSimCardExpenses.click();
        await hubPage.disableButton.click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsTrackSimCardExpenses.filter({hasText:SETTINGS_DISABLED})).toBeVisible();}
    });

    test('Auto cansel alarm setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await page.waitForTimeout(2000);

        if (await hubPage.settingsAutoCancelAlarm.filter({hasText:SETTINGS_30_SECONDS}).isVisible()){
            await hubPage.settingsAutoCancelAlarm.click();
            await page.getByText(SETTINGS_30_SECONDS, {exact: true}).click();
            await hubPage.saveButton.click();
            await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
            await expect(hubPage.settingsAutoCancelAlarm.filter({hasText:SETTINGS_30_SECONDS})).toBeVisible();}

        else {await hubPage.settingsAutoCancelAlarm.click();

        await page.getByText(SETTINGS_10_SECONDS, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(SETTINGS_10_SECONDS)).toBeVisible();

        await hubPage.settingsAutoCancelAlarm.click();
        await page.getByText(SETTINGS_30_SECONDS, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(SETTINGS_30_SECONDS)).toBeVisible();}
    });

    test('Time zone setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await page.waitForTimeout(2000);

        if (await hubPage.settingsTimeZone.filter({hasText:TIME_ZONE_SECOND}).isVisible()){
            await hubPage.settingsTimeZone.click();
            await page.getByText(TIME_ZONE_FIRST, {exact: true}).click();
            await hubPage.saveButton.click();
            await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
            await expect(hubPage.settingsTimeZone.filter({hasText:TIME_ZONE_FIRST})).toBeVisible();}

        else {await hubPage.settingsTimeZone.click();

        await expect(page.getByText(TEXT_SELECT_CONTROLLER_TIME_ZONE)).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText(TIME_ZONE_SECOND, {exact: true}).click();

        await hubPage.submitButton.click();

        await expect(hubPage.settingsTimeZone.filter({hasText:TIME_ZONE_SECOND})).toBeVisible();

        await hubPage.settingsTimeZone.click();

        await expect(page.getByText(TEXT_SELECT_CONTROLLER_TIME_ZONE)).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText(TIME_ZONE_FIRST, {exact: true}).click();
        await hubPage.submitButton.click();
        await page.waitForTimeout(2000);

        await expect(hubPage.settingsTimeZone.filter({hasText:TIME_ZONE_FIRST})).toBeVisible();}
    });


    test('Keypad code setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8693q67d2"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await hubPage.settingsKeypadCodeLength.click();
        await hubPage.settingsKeypadCodeLength4digits.click();

        if (await hubPage.changeButton.isDisabled())
        {   await hubPage.settingsKeypadCodeLength6digits.click()
            await hubPage.change_Button.click();
            await expect(page.getByText(TEXT_6_SYMBOLS)).toBeVisible();
            await hubPage.settingsKeypadCodeLength.click();
            await expect(page.getByText(TEXT_CHANGE_KEYPAD_CODE_LENGTH)).toBeVisible();
            await hubPage.settingsKeypadCodeLength4digits.click();}
        await hubPage.change_Button.click();

        await expect(page.getByText(TEXT_4_SYMBOLS)).toBeVisible();
        await expect(page.getByText(TITLE_USERS, {exact: true})).toBeVisible();

        await hubPage.users.click();

        if (await (page.getByText(USER_NAME)).isVisible()) {
            await page.getByText(USER_NAME).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}

        await expect(page.getByText(BUTTON_ADD_USER)).toBeVisible();

        await hubPage.addButton.click();
        await hubPage.addUserName.fill(USER_NAME);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible({timeout:10000});}
        catch (error) {console.error(`An error occurred: ${error.message}`);
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.backButton.click();}
        finally {await expect(page.getByText(USER_FULL_FIRST)).toBeVisible();}

        await page.getByText(USER_FULL_FIRST).click();
        await hubPage.settingsArmKeypadCode.click();
        await hubPage.settingsKeypadCodeField.fill(CODE_FIRST);
        await hubPage.saveButton.click()

        await expect(page.getByText(TITLE_USERS, {exact: true})).toBeVisible();

        await hubPage.users.click();
        await page.getByText(USER_NAME).click();
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();
        await hubPage.system.click()

        await expect(page.getByText(BUTTON_ADD_WIRELESS_DEVICE)).toBeVisible();

        await page.waitForTimeout(3000);

        await hubPage.hubPanel.click();
        await hubPage.settingsKeypadCodeLength.click();

        await expect(page.getByText(TEXT_CHANGE_KEYPAD_CODE_LENGTH)).toBeVisible();

        await page.waitForTimeout(1000);
        await hubPage.settingsKeypadCodeLength6digits.click();
        await hubPage.change_Button.click();

        await expect(page.getByText(TEXT_6_SYMBOLS)).toBeVisible();
    });

    test('Special settings', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await page.getByText(TITLE_SPECIAL_SETTINGS, {exact: true}).click();
        await page.getByText(TEXT_DISABLE_TAMPER, {exact: true}).click();
        await page.getByText(TEXT_DISABLE_RADIO_JAM, {exact: true}).click();
        await hubPage.submitButton.click();

        await expect(page.getByText(TEXT_PANEL_TAMPER_DISABLED)).toBeVisible();
        await expect(page.getByText(TEXT_RADIO_JAM_DISABLED)).toBeVisible();

        await page.getByText(TITLE_SPECIAL_SETTINGS, {exact: true}).click();
        await page.getByText(TEXT_DISABLE_TAMPER, {exact: true}).click();
        await page.getByText(TEXT_DISABLE_RADIO_JAM, {exact: true}).click();
        await hubPage.submitButton.click();

        await expect(page.getByText(TEXT_PANEL_TAMPER_DISABLED)).not.toBeVisible();
        await expect(page.getByText(TEXT_RADIO_JAM_DISABLED)).not.toBeVisible();
    });

});