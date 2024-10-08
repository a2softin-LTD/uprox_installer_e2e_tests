import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";

test.describe('Keypad code setting', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
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

});