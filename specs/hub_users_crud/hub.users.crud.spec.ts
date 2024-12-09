import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_3 } from "../../utils/user_data";
import {
    BUTTON_DELETE_USER,
    BUTTON_TRANSFER_OWNERSHIP, TEXT_CHANGE_USER_NAME,
    TEXT_EDITING_EMAIL, TITLE_EDIT_USER,
    TITLE_UPDATE_FIRMWARE_VERSION, URL_LOGIN, URL_PROFILE_PANELS,
    USER_EMAIL, USER_EMAIL_NON_REGISTERED,
    USER_FULL_FIRST, USER_FULL_SECOND, USER_NAME,
    USER_NAME_NEW, USER_SHORT_FIRST, USER_SHORT_SECOND
} from "../../utils/constants";

test.describe('Hub Page tests', { tag: ['@smoke', '@hub']}, () => {

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
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForTimeout(5000);

        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}

        await page.waitForLoadState('domcontentloaded');
        await hubPage.users.click();
        await page.waitForTimeout(1000);

        if (await (page.getByText(USER_NAME)).isVisible())
        {   await page.getByText(USER_NAME).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();}

        await page.waitForTimeout(1000);
        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(USER_3['login']);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible({timeout:15000});}
        catch (error) {console.error(`An error occurred: ${error.message}`);
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.backButton.click();}
        finally {await expect(page.getByText(USER_SHORT_FIRST)).toBeVisible();}
    });

    test.describe('Hub users CRUD', () => {

        test('Add user to hub', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1vn'
            });

            await page.waitForTimeout(2000);
            await page.getByText(USER_SHORT_FIRST).click();

            await expect(page.getByText(BUTTON_DELETE_USER)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();
            await page.waitForTimeout(1000);

            await expect (page.getByText((USER_SHORT_FIRST))).not.toBeVisible();
        });

        test('Delete user from hub', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey1xd'
            });

            await page.getByText(USER_SHORT_FIRST).click();
            await page.waitForLoadState('domcontentloaded');
            await page.waitForTimeout(2000);
            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();

            await expect(page.getByText((USER_SHORT_FIRST))).not.toBeVisible();
        });

    });

    test.describe('Hub users profile editing', () => {

        test('Change name: hub user', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey157'
            });

            await page.getByText(USER_FULL_FIRST).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await page.getByText(USER_NAME).click();

            await expect(page.getByText(TEXT_CHANGE_USER_NAME)).toBeVisible();

            await hubPage.inputFirstField.fill(USER_NAME_NEW);
            await page.waitForLoadState('domcontentloaded');
            await hubPage.saveButton.click();

            await expect(page.getByText(BUTTON_DELETE_USER)).toBeVisible();
            await expect(page.getByText(USER_NAME_NEW)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();

            await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();
            await expect (page.getByText((USER_SHORT_SECOND))).not.toBeVisible();
        });

        test('Change email: hub user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694ey139'
            });

            await page.getByText(USER_FULL_FIRST).click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await page.getByText(USER_EMAIL).click();

            await expect(page.getByText(TEXT_EDITING_EMAIL)).toBeVisible();

            await hubPage.inputFirstField.fill(USER_EMAIL_NON_REGISTERED);
            await page.waitForLoadState('domcontentloaded');
            await hubPage.saveButton.click();

            await expect(page.getByText(BUTTON_DELETE_USER)).toBeVisible();
            await expect(page.getByText(USER_EMAIL_NON_REGISTERED)).toBeVisible();

            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();
            await page.waitForTimeout(1000);

            await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();
            await expect (page.getByText((USER_FULL_SECOND))).not.toBeVisible();
        });

    });

});