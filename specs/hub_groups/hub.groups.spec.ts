import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {
    FAKER_NAME_OF_GROUP_FIRST, FAKER_NAME_OF_GROUP_SECOND,
    TEXT_ADD_GROUP,
    TEXT_EDIT_GROUP,
    TEXT_ENTER_GROUP_NAME,
    TITLE_GROUPS,
    TITLE_SYSTEM,
    TITLE_UPDATE_FIRMWARE_VERSION, URL_LOGIN, URL_PROFILE_PANELS, USER_NAME
} from "../../utils/constants";

test.describe('Hub Page tests', { tag: ['@smoke', '@stable', '@hub']},() => {

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
        {  await hubPage.closeWindowButton.click();
            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_SYSTEM)})).toBeVisible();}

        await hubPage.users.click();

        if (await (page.getByText(USER_NAME)).first().isVisible()) {
            await page.getByText(USER_NAME).first().click();
            await hubPage.deleteUserButton.click();
            await hubPage.submitButton.click();}

        await hubPage.groups.click();
        await page.getByText(TEXT_ADD_GROUP).isVisible();
    });

    test('Checking UI elements on the hub groups page', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(hubPage.groupAddGroupButton).toBeVisible();
        await expect(hubPage.pageTitle.filter({has:page.getByText('Groups')})).toBeVisible();
    });

    test('Groups list on panels/system page', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/86967gbcx"
        });

        await hubPage.system.click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_SYSTEM)})).toBeVisible();

        await page.waitForTimeout(2000);

        for (const group of await hubPage.groupBlock.all())
        { await expect(group).toBeVisible();}

        for (const group of await hubPage.groupBlock.all())
        {await expect((group.filter({has: hubPage.hubArmStateIcon})).or(group.filter({has: hubPage.hubDisarmStateIcon}))).toBeVisible();}

        for (const group of await hubPage.groupBlock.all())
        { await expect(group.filter({has: hubPage.entityText})).toBeVisible();}
    });

    test.describe('Working with groups',() => {

        test('Add group:hub', { tag: ['@smoke']}, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhwd'
            });

            await hubPage.groupAddGroupButton.click();
            await hubPage.inputFirstField.fill(FAKER_NAME_OF_GROUP_FIRST);
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await hubPage.users.click();
            await hubPage.groups.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await page.getByText(FAKER_NAME_OF_GROUP_FIRST).click();

            await expect(page.getByText(TEXT_EDIT_GROUP)).toBeVisible();

            await hubPage.groupDeleteButton.click();
            await hubPage.deleteButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await expect (page.getByText((FAKER_NAME_OF_GROUP_FIRST))).not.toBeVisible();
        });

        test('Changing name of the group: hub', {  tag: ['@smoke']}, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhtb'
            });

            await hubPage.groupAddGroupButton.click();
            await hubPage.inputFirstField.fill(FAKER_NAME_OF_GROUP_FIRST);
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await hubPage.users.click();
            await hubPage.groups.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await expect(page.getByText((FAKER_NAME_OF_GROUP_FIRST))).toBeVisible();

            await page.getByText((FAKER_NAME_OF_GROUP_FIRST)).click();
            await hubPage.groupBlockWithName.click();
            await hubPage.inputFirstField.fill(FAKER_NAME_OF_GROUP_SECOND);
            await hubPage.saveButton.click();

            await expect(page.getByText(TEXT_EDIT_GROUP)).toBeVisible();
            await expect (page.getByText((FAKER_NAME_OF_GROUP_SECOND))).toBeVisible();

            await hubPage.groupDeleteButton.click();
            await hubPage.deleteButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await expect (page.getByText((FAKER_NAME_OF_GROUP_SECOND))).not.toBeVisible();
        });

        test('Delete group: hub', {  tag: ['@smoke']}, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhxu'
            });

            await hubPage.groupAddGroupButton.click();

            await expect(page.getByText(TEXT_ENTER_GROUP_NAME)).toBeVisible();

            await hubPage.inputFirstField.fill(FAKER_NAME_OF_GROUP_FIRST);
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await hubPage.users.click();
            await hubPage.groups.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await page.getByText(FAKER_NAME_OF_GROUP_FIRST).click();

            await expect(page.getByText(TEXT_EDIT_GROUP)).toBeVisible();

            await hubPage.groupDeleteButton.click();
            await hubPage.deleteButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await expect (page.getByText((FAKER_NAME_OF_GROUP_FIRST))).not.toBeVisible();
        });

    });

});