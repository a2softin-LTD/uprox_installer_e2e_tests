import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";

test.describe('Hub settings', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
    });

    test('Hub name setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8693q67d2"
        });

        const nameOld: string = "PIN@dev";
        const nameNew: string = "PIN@devNew";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await hubPage.settingsHubName.click();
        await hubPage.inputField.fill(nameNew);
        await hubPage.saveButton.click();

        await expect(hubPage.settingsHubName.filter({hasText:nameNew})).toBeVisible();

        await hubPage.settingsHubName.click();
        await hubPage.inputField.fill(nameOld);
        await hubPage.saveButton.click();

        await expect(hubPage.settingsHubName.filter({hasText:nameOld})).toBeVisible();
    });
    test('Country setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8693q67d2"
        });

        const countryNew: string = "Moldova";
        const countryOld: string = "Ukraine";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await hubPage.settingsCountry.click();

        await expect(page.getByText('Installation Country')).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText(countryNew, {exact: true}).click();

        await hubPage.submitButton.click();

        await expect(hubPage.settingsCountry.filter({hasText:countryNew})).toBeVisible();

        await hubPage.settingsCountry.click();

        await expect(page.getByText('Installation Country')).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText(countryOld, {exact: true}).click();
        await hubPage.submitButton.click();
        await page.waitForTimeout(2000);

        await expect(hubPage.settingsCountry.filter({hasText:countryOld})).toBeVisible();
    });

    test('Firmware update setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8693q67d2"
        });

        const automatically: string = "Automatically";
        const manually: string = "Manually";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await hubPage.settingsFirmwareUpdate.click();
        await page.getByText(manually, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(hubPage.settingsFirmwareUpdate.filter({hasText:manually})).toBeVisible();

        await hubPage.settingsFirmwareUpdate.click();
        await page.getByText(automatically, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(hubPage.settingsFirmwareUpdate.filter({hasText:automatically})).toBeVisible();
    });

    test('Light Indication setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8693q67d2"
        });

        const turnOn: string = "Turn on";
        const turnOff: string = "Turn off";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await hubPage.settingsLightIndication.click();
        await (page.getByText(turnOff, {exact: true}).first()).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(turnOff).first()).toBeVisible();

        await hubPage.settingsLightIndication.click();
        await page.getByText(turnOn, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(turnOn)).toBeVisible();
    });

    test.skip('Hub air alarm setting', { tag: ['@smoke','@hub'] }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        const region: string = "Дніпропетровська область";
        const district: string = "Дніпровський район";
        const community: string = "Любимівська територіальна громада";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        await page.waitForTimeout(2000);
        if (await page.getByText('Update firmware version').isVisible())
        {   await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
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

        await expect(page.getByText('Turn off')).toBeVisible();
    });

    test('Track Sim-Card Expenses setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8693q67d2"
        });

        const track: string = "Track";
        const disabled: string = "Disabled";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await hubPage.settingsTrackSimCardExpenses.click();
        await page.getByText(track, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(hubPage.settingsTrackSimCardExpenses.filter({hasText:track})).toBeVisible();

        await hubPage.settingsTrackSimCardExpenses.click();
        await page.getByText(disabled, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(hubPage.settingsTrackSimCardExpenses.filter({hasText:disabled})).toBeVisible();
    });

    test('Auto cansel alarm setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8693q67d2"
        });

        const sec10: string = "10 seconds";
        const sec30: string = "30 seconds";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await hubPage.settingsAutoCancelAlarm.click();
        await page.getByText(sec10, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(sec10)).toBeVisible();

        await hubPage.settingsAutoCancelAlarm.click();
        await page.getByText(sec30, {exact: true}).click();
        await hubPage.saveButton.click();

        await expect(page.getByText(sec30)).toBeVisible();
    });

    test('Time zone setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8693q67d2"
        });

        const timeZoneNew: string = "Kabul (+04:30 UTC)";
        const timeZoneOld: string = "Kyiv (+03:00 UTC)";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await hubPage.settingsTimeZone.click();

        await expect(page.getByText('Select controller time zone')).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText(timeZoneNew, {exact: true}).click();

        await hubPage.submitButton.click();

        await expect(hubPage.settingsTimeZone.filter({hasText:timeZoneNew})).toBeVisible();

        await hubPage.settingsTimeZone.click();

        await expect(page.getByText('Select controller time zone')).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText(timeZoneOld, {exact: true}).click();
        await hubPage.submitButton.click();
        await page.waitForTimeout(2000);

        await expect(hubPage.settingsTimeZone.filter({hasText:timeZoneOld})).toBeVisible();
    });


    test('Keypad code setting', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8693q67d2"
        });

        const name: string = "Дмитро";
        const mail: string = "| snaut12@gmail.com";
        const code: string = "1111";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
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
        await page.getByText(mail).click();
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
            description: "https://app.clickup.com/t/8693q67d2"
        });

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
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