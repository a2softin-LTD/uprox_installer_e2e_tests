import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";
import { BUTTON_TRANSFER_OWNERSHIP } from "../../utils/constants";

test.describe('Hub Page tests',  () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        const name: string = "Дмитро";
        const user: string = "01 | Дмитро | snaut12@gmail.com";

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');

        await hubPage.panels.click();
        await hubPage.firstHub.click();
        await page.waitForTimeout(2000);
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click();

        if (await (page.getByText(name)).isVisible()) {
            await page.getByText(name).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}
        await hubPage.addButton.click();
        await hubPage.addUserName.fill(name);
        await hubPage.addUserEmail.fill(USER_3['login']);
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible({timeout:15000});}
        catch (error) {console.error(`An error occurred: ${error.message}`);
        await page.reload();
            await page.waitForTimeout(1000);
        await hubPage.backButton.click();}
        finally {await expect(page.getByText(user)).toBeVisible();}
    });

    test('Checking UI elements on the hub users page', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(hubPage.transferOwnershipButton).toBeVisible();
        await expect(hubPage.addButton).toBeVisible();
        await expect(hubPage.pageTitle.filter({has:page.getByText('Users')})).toBeVisible();
    });

    test('Checking UI elements on the hub user edit page', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });
        const user: string = "01 | Дмитро | snaut12@gmail.com";

        await page.getByText(user).click();

        await expect(hubPage.pageTitle.filter({has:page.getByText('Edit user')})).toBeVisible();
        await expect(hubPage.settingsKeyfob).toBeVisible();
        await expect(hubPage.settingsMobileApp).toBeVisible();
        await expect(hubPage.settingsArmKeypadCode).toBeVisible();
        await expect(hubPage.settingsCallOnAlarm).toBeVisible();
        await expect(hubPage.deleteUserButton).toBeVisible();

        await hubPage.deleteUserButton.click();
        await hubPage.submitButton.click();

        await expect (page.getByText((user))).not.toBeVisible();
    });

    test.describe('Hub users settings', () => {

        test('Arm keypad code', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            const code: string = "111111";
            const codeHide: string = "******";
            const user: string = "01 | Дмитро | snaut12@gmail.com";

            await page.getByText(user).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsArmKeypadCode.click();
            await hubPage.settingsKeypadCodeField.fill(code);
            await hubPage.saveButton.click()

            await expect(hubPage.settingsArmKeypadCode.filter({hasText:codeHide})).toBeVisible();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((user))).not.toBeVisible();
        });

        test('Mobile application', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            const user: string = "01 | Дмитро | snaut12@gmail.com";

            await (page.getByText(user)).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await hubPage.backButton.click();

            await expect(page.getByText('Transfer ownership')).toBeVisible();
            await expect(page.getByText(user)).toBeVisible();
            await expect(page.getByText('Mobile')).toBeVisible();

            await page.getByText(user).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((user))).not.toBeVisible();
        });

        test('User management', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            const user: string = "01 | Дмитро | snaut12@gmail.com";

            await (page.getByText(user)).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsUserManagement.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();
            await hubPage.users.click();

            await expect(page.getByText('Transfer ownership')).toBeVisible();
            await expect(page.getByText(user)).toBeVisible();
            await expect(page.getByText('Mobile |')).toBeVisible();
            await expect(page.getByText('User management')).toBeVisible();

            await page.getByText(user).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((user))).not.toBeVisible();
        });

        test('Mobile panic button', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            const user: string = "01 | Дмитро | snaut12@gmail.com";

            await (page.getByText(user)).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsPanicButton.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await expect(page.getByText('Edit user')).toBeVisible();
            await expect(hubPage.settingsPanicButton.filter({hasText:'Enabled'})).toBeVisible();

            await hubPage.users.click();

            await expect(page.getByText('Transfer ownership')).toBeVisible();
            await expect(page.getByText(user)).toBeVisible();

            await page.getByText(user).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((user))).not.toBeVisible();
        });

        test('Keyfob', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            const user: string = "01 | Дмитро | snaut12@gmail.com";

            await (page.getByText(user)).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsKeyfob.click();
            await expect(page.getByText('Add keyfob / panic button')).toBeVisible();
            await expect(page.getByText('Place the key fob no more than 2 m from the security center. Registration takes place at the lowest possible power in order to avoid the influence of neighboring systems, possibly configured nearby. To add a device, hold down any button for about 10 seconds until the green indicator blinks. Wait for the message about successful device registration. Also make sure that there is a charged battery in the key fob.')).toBeVisible();
            await expect(page.getByText('Cancel registry')).toBeVisible();

            await hubPage.settingsKeyfobImage.nth(0).click();
            await expect(page.getByText('Press the button and hold for 10 seconds until the green indicator blinks.')).toBeVisible();

            await page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText('Add keyfob / panic button')).toBeVisible();

            await hubPage.settingsKeyfobImage.nth(1).click();
            await expect(page.getByText('Press the button and hold for 10 seconds until the green indicator blinks.')).toBeVisible();

            await page.reload();
            await page.waitForTimeout(2000);

            await hubPage.settingsKeyfobImage.nth(2).click();
            await expect(page.getByText('Press the button and hold for 10 seconds until the green indicator blinks.')).toBeVisible();

            await page.reload();
            await page.waitForTimeout(2000);

            await hubPage.backButton.click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.users.click();

            await expect(page.getByText('Transfer ownership')).toBeVisible();
            await expect(page.getByText(user)).toBeVisible();

            await page.getByText(user).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((user))).not.toBeVisible();
        });

        test('Call on alarm', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            const user: string = "01 | Дмитро | snaut12@gmail.com";
            const phone: string = "+38067890678";

            await (page.getByText(user)).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsCallOnAlarm.click();
            await hubPage.enableButton.click();
            await hubPage.inputFirstField.fill(phone);
            await hubPage.saveButton.click();

            await expect(page.getByText('Edit user')).toBeVisible();
            await expect(hubPage.settingsCallOnAlarm.filter({hasText:phone})).toBeVisible();

            await hubPage.users.click();

            await expect(page.getByText('Transfer ownership')).toBeVisible();
            await expect(page.getByText(user)).toBeVisible();

            await page.getByText(user).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((user))).not.toBeVisible();
        });

        test('Event categories', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1cv'
            });

            const user: string = "01 | Дмитро | snaut12@gmail.com";

            await (page.getByText(user)).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await hubPage.enableButton.click();
            await hubPage.saveButton.click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.settingsEventCategories.click();
            await expect(page.getByText('Submit')).toBeVisible();
            await (page.getByText('Arms/Disarms')).click();
            await (page.getByText('Alarms/Restores')).click();
            await (page.getByText('Troubles/Restores')).click();
            await hubPage.submitButton.click();

            await expect(page.getByText('Edit user')).toBeVisible();
            await expect(hubPage.settingsEventCategories.filter({hasText:'Service'})).toBeVisible();

            await hubPage.users.click();

            await expect(page.getByText('Transfer ownership')).toBeVisible();
            await expect(page.getByText(user)).toBeVisible();

            await page.getByText(user).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect (page.getByText((user))).not.toBeVisible();
        });
    });

});