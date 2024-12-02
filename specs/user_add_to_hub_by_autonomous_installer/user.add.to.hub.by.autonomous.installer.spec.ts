import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1,USER_3 } from "../../utils/user_data";
import {
    BUTTON_DELETE_USER, BUTTON_TRANSFER_OWNERSHIP, FAKER_EMAIL_ADMIN, TITLE_EDIT_USER,
    TITLE_UPDATE_FIRMWARE_VERSION, TITLE_USERS, URL_LOGIN, URL_PROFILE_PANELS, USER_NAME, USER_SHORT_FIRST
} from "../../utils/constants";
import { sequelize } from "../../db/db.config";
import { GET_DELETED_USERS, GET_USER_BY_EMAIL } from "../../db/Query";
import { QueryTypes } from "sequelize";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);

    });

    test('Add new user by autonomous installer', { tag: ['@smoke']  }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf8"
        });
        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click();

        if (await (page.getByText(USER_NAME)).isVisible()) {
            await page.getByText(USER_NAME).click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}
        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(USER_3['login']);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();}
        catch (error) {console.error(`An error occurred: ${error.message}`);
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.backButton.click();}
        finally {await expect(page.getByText(USER_SHORT_FIRST)).toBeVisible();}

        await page.getByText(USER_NAME).click();

        expect(page.getByText(BUTTON_DELETE_USER));

        await hubPage.deleteUserButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.submitButton.click();
        await page.waitForTimeout(1000);

        await expect (page.getByText((USER_SHORT_FIRST))).not.toBeVisible();
    });

    test('Add user by autonomous installer with Home permission', {tag:['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf8"
        });

        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click();

        if (await (page.getByText(USER_NAME)).isVisible()) {
            await page.getByText(USER_NAME).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();}
        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(USER_3['login']);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.userAllowMobileAppManagementFromHome.click();
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();}
        catch (error) {console.error(`An error occurred: ${error.message}`);
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.backButton.click();}
        finally {await expect(page.getByText(USER_SHORT_FIRST)).toBeVisible();}

        await page.getByText(USER_NAME).click();

        expect(page.getByText(BUTTON_DELETE_USER));

        await hubPage.deleteUserButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.submitButton.click();

        await expect (page.getByText((USER_SHORT_FIRST))).not.toBeVisible();
    });

    test.skip('Add new user by autonomous installer with data base confirmation', { tag: ['@smoke']  }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694ba6jx"
        });
        
        let userEmail: string = '';
        const userName: string = 'Дмитро1';

        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');

            const user: object[] = await sequelize.query(GET_DELETED_USERS(1), { type: QueryTypes.SELECT });

            userEmail = user[0]['email'];
            console.log(user[0]['email']);

            await expect(user[0]['user_state']).toEqual('DELETED');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();

        await expect(page.getByText('Add wireless device')).toBeVisible();

        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();

        if (await (page.getByText(`01 | ${userName} `)).isVisible()) {
            await page.getByText(`01 | ${userName} `).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();}

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(userName);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(userEmail);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        await expect (page.getByText(`01 | ${userName} `)).toBeVisible();
        await expect (page.getByText(`| ${userEmail} `)).toBeVisible();

        await (page.getByText(`01 | ${userName} `)).click();
        
        await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

        await hubPage.settingsMobileApp.click();

        await expect(page.getByText('Allow to use mobile application for current user?')).toBeVisible();

        await hubPage.enableButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.inputFirstField.fill(FAKER_EMAIL_ADMIN);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.saveButton.click();

        await expect(page.getByText('Allow to use mobile application for current user?')).not.toBeVisible();

        await hubPage.backButton.click();

        console.log('-------------------------------------------------------------------');
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');

            const user: object[] = await sequelize.query(GET_USER_BY_EMAIL(userEmail), { type: QueryTypes.SELECT });

            console.log(user[0]['user_state']);

            await expect(user[0]['user_state']).toEqual('NOT_FINISHED_BY_INVITE');

        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        await page.getByText(userName).click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.deleteUserButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.submitButton.click();

        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
        await expect(page.getByText(userName)).not.toBeVisible();
    });

});