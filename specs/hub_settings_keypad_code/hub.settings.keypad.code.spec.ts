import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {HubPage} from "../../pages/hub/HubPage";
import {USER_1} from "../../utils/user_data";
import {USER_3} from "../../utils/user_data";


test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

    });

    test('Keypad code setting ', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8693q67d2"
        });
        const name: string = "Дмитро";
        const newUser: string = "Дмитро | snaut12@gmail.com";
        const mail: string = "| snaut12@gmail.com";
        const code: string = "1111";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        await page.waitForTimeout(1000);
        if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
        await hubPage.hubPanel.click();
        await page.waitForTimeout(1000);
        await hubPage.settingsKeypadCodeLength.click();
        await hubPage.settingsKeypadCodeLength4digits.click();
        await page.waitForTimeout(1000);
        await hubPage.changeButton.click();

        expect(hubPage.findByText('Changes saved successfully')).toBeVisible();

        await page.waitForTimeout(1000);
        await hubPage.users.click();
        await hubPage.addUserButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addUserAddButton.click();

        expect(hubPage.findByText('User Дмитро created successfully')).toBeVisible();

        await page.waitForTimeout(1000);
        await hubPage.findByText(mail).click();
        await page.waitForTimeout(1000);
        await hubPage.settingsArmKeypadCode.click();
        await page.waitForTimeout(1000);
        await hubPage.settingsKeypadCodeField.fill(code);
        await hubPage.saveButton.click();

        expect(hubPage.findByText('Changes saved successfully')).toBeVisible();

        await page.waitForTimeout(1000);
        await hubPage.users.click();
        await page.waitForTimeout(1000);
        await hubPage.findByText(name).click();
        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();
        await page.waitForTimeout(2000);
        await hubPage.system.click();
        await hubPage.hubPanel.click();
        await hubPage.settingsKeypadCodeLength.click();
        await hubPage.settingsKeypadCodeLength6digits.click();
        await page.waitForTimeout(2000);
        await hubPage.changeButton.click();

        expect(hubPage.findByText('Changes saved successfully')).toBeVisible();

    });
});