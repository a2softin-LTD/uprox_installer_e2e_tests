import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";
import {
    BUTTON_RESTART_PANEL,
    BUTTON_TRANSFER_OWNERSHIP,
    COUNTRY_MOLDOVA,
    COUNTRY_UKRAINE,
    HUB_NAME_FIRST,
    HUB_NAME_THIRD, SETTINGS_10_SECONDS, SETTINGS_30_SECONDS,
    SETTINGS_AUTOMATICALLY,
    SETTINGS_MANUALLY,
    TEXT_SELECT_CONTROLLER_TIME_ZONE,
    TIME_ZONE_FIRST,
    TIME_ZONE_SECOND
} from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');

        await hubPage.panels.click();
        await hubPage.firstHub.click();

        await page.waitForTimeout(2000);
        if (await page.getByText('Update firmware version').isVisible())
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

            await expect(page.getByText('Installation Country')).toBeVisible();

            await hubPage.inputField.click();
            await page.getByText(COUNTRY_UKRAINE, {exact: true}).click();
            await hubPage.submitButton.click();
            await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
            await expect(hubPage.settingsCountry.filter({hasText:COUNTRY_UKRAINE})).toBeVisible();}

        else {await hubPage.settingsCountry.click();

        await expect(page.getByText('Installation Country')).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText(COUNTRY_MOLDOVA, {exact: true}).click();

        await hubPage.submitButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsCountry.filter({hasText:COUNTRY_MOLDOVA})).toBeVisible();

        await hubPage.settingsCountry.click();

        await expect(page.getByText('Installation Country')).toBeVisible();

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

        const turnOn: string = "Turn on";
        const turnOff: string = "Turn off";

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await page.waitForTimeout(2000);
        if (await hubPage.settingsLightIndication.filter({hasText:turnOff}).isVisible()){
            await hubPage.settingsLightIndication.click();
            await (page.getByText(turnOn, {exact: true}).first()).click();
            await hubPage.saveButton.click();
            await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
            await expect(hubPage.settingsLightIndication.filter({hasText:turnOn})).toBeVisible();}

        else {await hubPage.settingsLightIndication.click();
        await (page.getByText(turnOff, {exact: true}).first()).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(page.getByText(turnOff).first()).toBeVisible();

        await hubPage.settingsLightIndication.click();
        await page.getByText(turnOn, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(page.getByText(turnOn)).toBeVisible();}
    });

    test.skip('Hub air alarm setting', { tag: ['@smoke'] }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        const region: string = "Дніпропетровська область";
        const district: string = "Дніпровський район";
        const community: string = "Любимівська територіальна громада";

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await hubPage.settingsAirAlarm.click();
        await hubPage.onButton.click();
        await page.getByText('Select region').click();
        await page.getByText((region)).click();
        await page.getByText('Select district').click();
        await page.getByText((district)).click();
        await page.getByText('Select community').click();
        await page.getByText((community)).click();
        await hubPage.saveButton.click();
        await hubPage.settingsAirAlarm.click();
        await hubPage.offButton.click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(page.getByText('Turn off')).toBeVisible();
    });

    test('Track Sim-Card Expenses setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        const track: string = "Track";
        const disabled: string = "Disabled";

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await page.waitForTimeout(2000);
        if (await hubPage.settingsTrackSimCardExpenses.filter({hasText:track, hasNotText:'Disable'}).isVisible()){
            await hubPage.settingsTrackSimCardExpenses.click();
            await hubPage.disableButton.click();
            await hubPage.saveButton.click();
            await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
            await expect(hubPage.settingsTrackSimCardExpenses.filter({hasText:disabled})).toBeVisible();}

        else {await hubPage.settingsTrackSimCardExpenses.click();
        await page.getByText(track, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsTrackSimCardExpenses.filter({hasText:track})).toBeVisible();

        await hubPage.settingsTrackSimCardExpenses.click();
        await hubPage.disableButton.click();
        await hubPage.saveButton.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await expect(hubPage.settingsTrackSimCardExpenses.filter({hasText:disabled})).toBeVisible();}
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

        const name: string = "Дмитро";
        const user: string = "01 | Дмитро | snaut12@gmail.com";
        const code: string = "1111";

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        await hubPage.settingsKeypadCodeLength.click();
        await hubPage.settingsKeypadCodeLength4digits.click();
        if (await hubPage.changeButton.isDisabled())
        {   await hubPage.settingsKeypadCodeLength6digits.click()
            await hubPage.change_Button.click();
            await expect(page.getByText('6 symbols')).toBeVisible();
            await hubPage.settingsKeypadCodeLength.click();
            await expect(page.getByText('Change keypad code length')).toBeVisible();
            await hubPage.settingsKeypadCodeLength4digits.click();}
        await hubPage.change_Button.click();

        await expect(page.getByText('4 symbols')).toBeVisible();
        await expect(page.getByText('Users', {exact: true})).toBeVisible();

        await hubPage.users.click();
        if (await (page.getByText(name)).isVisible()) {
            await page.getByText(name).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}
        await expect(page.getByText('Add user')).toBeVisible();
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible({timeout:10000});}
        catch (error) {console.error(`An error occurred: ${error.message}`);
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.backButton.click();}
        finally {await expect(page.getByText(user)).toBeVisible();}

        await page.getByText(user).click();
        await hubPage.settingsArmKeypadCode.click();
        await hubPage.settingsKeypadCodeField.fill(code);
        await hubPage.saveButton.click()

        await expect(page.getByText('Users', {exact: true})).toBeVisible();

        await hubPage.users.click();
        await page.getByText(name).click();
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();
        await hubPage.system.click();
        await hubPage.hubPanel.click();
        await hubPage.settingsKeypadCodeLength.click();
        await expect(page.getByText('Change keypad code length')).toBeVisible();
        await hubPage.settingsKeypadCodeLength6digits.click();
        await hubPage.change_Button.click();

        await expect(page.getByText('6 symbols')).toBeVisible();
    });

    test('Special settings', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etg0f"
        });

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await page.getByText('Special settings', {exact: true}).click();
        await page.getByText('Disable tamper', {exact: true}).click();
        await page.getByText('Disable radio jam detection', {exact: true}).click();
        await hubPage.submitButton.click();

        await expect(page.getByText('Panel tamper disabled')).toBeVisible();
        await expect(page.getByText('Radio jam detection disabled')).toBeVisible();

        await page.getByText('Special settings', {exact: true}).click();
        await page.getByText('Disable tamper', {exact: true}).click();
        await page.getByText('Disable radio jam detection', {exact: true}).click();
        await hubPage.submitButton.click();

        await expect(page.getByText('Panel tamper disabled')).not.toBeVisible();
        await expect(page.getByText('Radio jam detection disabled')).not.toBeVisible();
    });

});