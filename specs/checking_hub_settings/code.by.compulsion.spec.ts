import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {
    BUTTON_RESTART_PANEL,
    BUTTON_TRANSFER_OWNERSHIP, CODE_FIFTH,
    CODE_FOURTH,
    CODE_HIDE,
    CODE_SIXTH,
    CODE_THIRD,
    FAKER_EMAIL_FIRST,
    FAKER_EMAIL_SECOND,
    FAKER_FULL_NAME,
    FAKER_FULL_NAME_FIRST, TEXT_4_SYMBOLS,
    TEXT_6_SYMBOLS,
    TEXT_ERROR_CODE_BY_COMPULSION,
    TITLE_EDIT_USER,
    TITLE_UPDATE_FIRMWARE_VERSION,
    TITLE_USERS,
    URL_LOGIN,
    URL_PROFILE_PANELS,
    USER_NAME,
} from "../../utils/constants";


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

        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(5000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click();}
    });

    test('Code by compulsion: 4 digits', {tag:['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696wch20"
        });
        await hubPage.hubPanel.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await page.waitForTimeout(3000);

        if (await (page.getByText(TEXT_6_SYMBOLS)).isVisible())
        {   await hubPage.settingsKeypadCodeLength.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.settingsKeypadCodeLength4digits.click();
            await hubPage.change_Button.click();
            await expect(page.getByText(TEXT_4_SYMBOLS)).toBeVisible();}

        await expect(page.getByText(TEXT_4_SYMBOLS)).toBeVisible();
        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();

        if (await (page.getByText(USER_NAME)).isVisible()) {
            await page.getByText(USER_NAME).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();}

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(FAKER_FULL_NAME);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();}
        catch (error) {console.error(`An error occurred: ${error.message}`);
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.backButton.click();}
        finally {await expect(page.getByText(FAKER_FULL_NAME)).toBeVisible();}

        await page.getByText(FAKER_FULL_NAME).click();

        await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

        await hubPage.settingsArmKeypadCode.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.settingsKeypadCodeField.fill(CODE_FIFTH);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.saveButton.click();

        await expect(hubPage.settingsArmKeypadCode.filter({hasText:CODE_HIDE})).toBeVisible();

        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(FAKER_FULL_NAME_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_SECOND);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();}
        catch (error) {console.error(`An error occurred: ${error.message}`);
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.backButton.click();}
        finally {await expect(page.getByText(FAKER_FULL_NAME_FIRST)).toBeVisible();}

        await page.getByText(FAKER_FULL_NAME_FIRST).click();

        await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

        await hubPage.settingsArmKeypadCode.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.settingsKeypadCodeField.fill(CODE_SIXTH);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.saveButton.click();

        await expect(page.getByText(TEXT_ERROR_CODE_BY_COMPULSION)).toBeVisible();
        await hubPage.closeWindowButton.click();

        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();

        while (await hubPage.entityBlock.first().isVisible())
        {   await hubPage.entityBlock.first().click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);
            await hubPage.users.click();
            await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();}

        await expect(hubPage.entityBlock).toHaveCount(0);
    });

    test('Code by compulsion: 6 digits', {tag:['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696wch20"
        });
        await hubPage.hubPanel.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();
        await page.waitForTimeout(3000);

        if (await (page.getByText(TEXT_4_SYMBOLS)).isVisible())
        {   await hubPage.settingsKeypadCodeLength.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.settingsKeypadCodeLength6digits.click();
            await hubPage.change_Button.click();
            await expect(page.getByText(TEXT_6_SYMBOLS)).toBeVisible();}

        await expect(page.getByText(TEXT_6_SYMBOLS)).toBeVisible();
        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();

        if (await (page.getByText(USER_NAME)).isVisible()) {
            await page.getByText(USER_NAME).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();}

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(FAKER_FULL_NAME);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();}
        catch (error) {console.error(`An error occurred: ${error.message}`);
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.backButton.click();}
        finally {await expect(page.getByText(FAKER_FULL_NAME)).toBeVisible();}

        await page.getByText(FAKER_FULL_NAME).click();

        await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

        await hubPage.settingsArmKeypadCode.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.settingsKeypadCodeField.fill(CODE_THIRD);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.saveButton.click();

        await expect(hubPage.settingsArmKeypadCode.filter({hasText:CODE_HIDE})).toBeVisible();

        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(FAKER_FULL_NAME_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_SECOND);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        try {await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible();}
        catch (error) {console.error(`An error occurred: ${error.message}`);
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.backButton.click();}
        finally {await expect(page.getByText(FAKER_FULL_NAME_FIRST)).toBeVisible();}

        await page.getByText(FAKER_FULL_NAME_FIRST).click();

        await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

        await hubPage.settingsArmKeypadCode.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.settingsKeypadCodeField.fill(CODE_FOURTH);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.saveButton.click();

        await expect(page.getByText(TEXT_ERROR_CODE_BY_COMPULSION)).toBeVisible();
        await hubPage.closeWindowButton.click();

        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();

        while (await hubPage.entityBlock.first().isVisible())
        {   await hubPage.entityBlock.first().click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteUserButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);
            await hubPage.users.click();
            await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();}

        await expect(hubPage.entityBlock).toHaveCount(0);
    });



});