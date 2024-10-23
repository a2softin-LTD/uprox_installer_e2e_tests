import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";

test.describe('Hub users page', { tag: ['@stable']  }, () => {

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

    test.describe('Hub users CRUD', () => {

        test('Add user to hub', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const name: string = "Дмитро";
            const newUser: string = "Дмитро | snaut12@gmail.com";

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            await page.waitForTimeout(1000);
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await hubPage.users.click();
            if (await (page.getByText(name)).isVisible())
            {   await page.getByText(name).click();
                await hubPage.deleteUserButton.click();
                await hubPage.submitButton.click();}
            await page.waitForTimeout(1000);
            await hubPage.addButton.click();
            await hubPage.addUserName.fill(name);
            await hubPage.addUserEmail.fill(USER_3['login']);
            await hubPage.addButton.click();
            await page.waitForTimeout(2000);

            await expect (page.getByText((name))).toBeVisible();

            await page.waitForTimeout(2000);
            await page.getByText(name).click();

            expect(page.getByText('Delete user'));

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();
            await page.waitForTimeout(1000);

            await expect (page.getByText((newUser))).not.toBeVisible();
        });

        test('Delete user from hub', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            const name: string = "01 | Дмитро ";
            const newUser: string = "Дмитро | snaut12@gmail.com";

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await page.waitForTimeout(2000);
            await hubPage.users.click();
            if (await (page.getByText(name)).isVisible()) {
                await page.getByText(name).click();
                await hubPage.deleteUserButton.click();
                await hubPage.submitButton.click();}
            await hubPage.addButton.click();
            await hubPage.addUserName.fill(name);
            await hubPage.addUserEmail.fill(USER_3['login']);
            await hubPage.addButton.click();
            await page.waitForTimeout(5000);

            await expect(page.getByText(newUser)).toBeVisible();

            await page.getByText(newUser).click();
            await page.waitForTimeout(2000);
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect(page.getByText((newUser))).not.toBeVisible();
        });

    });

    test.describe('Hub users profile editing', () => {

        test('Change name: hub user', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const name: string = "Дмитро";
            const nameNew: string = "Петро";
            const newUser1: string = "01 | Дмитро | snaut12@gmail.com";
            const newUser2: string = "| snaut12@gmail.com";
            const newUser3: string = "01 | Петро ";

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            await page.waitForTimeout(1000);
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await hubPage.users.click();
            if (await (page.getByText(name)).isVisible())
            {   await page.getByText(name).click();
                await hubPage.deleteUserButton.click();
                await hubPage.submitButton.click();}
            await page.waitForTimeout(1000);
            await hubPage.addButton.click();
            await hubPage.addUserName.fill(name);
            await hubPage.addUserEmail.fill(USER_3['login']);
            await hubPage.addButton.click();

            await expect(page.getByText('Transfer ownership')).toBeVisible();

            await expect (page.getByText((newUser1))).toBeVisible();
            await page.getByText(newUser1).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await page.getByText(name).click();

            await expect(page.getByText('Change username')).toBeVisible();
            await hubPage.inputFirstField.fill(nameNew);
            await hubPage.saveButton.click();

            await expect(page.getByText('Delete user')).toBeVisible();
            await expect(page.getByText(nameNew)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();

            await expect(page.getByText('Transfer ownership')).toBeVisible();
            await expect (page.getByText((newUser3))).not.toBeVisible();
        });

        test('Change email: hub user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            const name: string = "Дмитро";
            const email: string = "snaut12@gmail.com";
            const emailNew: string = "wiseman12@gmail.com";
            const user: string = "01 | Дмитро | snaut12@gmail.com";
            const newUser: string = "01 | Дмитро | wiseman12@gmail.com";

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            await page.waitForTimeout(1000);
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await hubPage.users.click();
            if (await (page.getByText(name)).isVisible())
            {   await page.getByText(name).click();
                await hubPage.deleteUserButton.click();
                await hubPage.submitButton.click();}
            await page.waitForTimeout(1000);
            await hubPage.addButton.click();
            await hubPage.addUserName.fill(name);
            await hubPage.addUserEmail.fill(USER_3['login']);
            await hubPage.addButton.click();

            await expect(page.getByText('Transfer ownership')).toBeVisible();
            await expect (page.getByText((user))).toBeVisible();

            await page.getByText(user).click();

            await expect(page.getByText('Edit user')).toBeVisible();

            await page.getByText(email).click();

            await expect(page.getByText('Editing Email')).toBeVisible();
            await hubPage.inputFirstField.fill(emailNew);
            await hubPage.saveButton.click();

            await expect(page.getByText('Delete user')).toBeVisible();
            await expect(page.getByText(emailNew)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();
            await page.waitForTimeout(1000);

            await expect(page.getByText('Transfer ownership')).toBeVisible();
            await expect (page.getByText((newUser))).not.toBeVisible();
        });

    });
});