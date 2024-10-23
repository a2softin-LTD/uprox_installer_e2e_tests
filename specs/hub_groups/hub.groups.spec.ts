import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import {
    TEXT_ADD_GROUP,
    TEXT_EDIT_GROUP,
    TEXT_ENTER_GROUP_NAME,
    TITLE_GROUPS,
    TITLE_SYSTEM,
    TITLE_UPDATE_FIRMWARE_VERSION, USER_NAME
} from "../../utils/constants";

test.describe('Hub Page tests', { tag: ['@smoke', '@stable', '@hub']},() => {

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
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click();
            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_SYSTEM)})).toBeVisible();}
        await hubPage.users.click();
        if (await (page.getByText(USER_NAME)).isVisible()) {
            await page.getByText(USER_NAME).click();
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

        for (const group of await hubPage.groupBlock.all())
        { await expect(group).toBeVisible();}

        for (const group of await hubPage.groupBlock.all())
        {await expect((group.filter({has: hubPage.hubArmStateIcon})).or(group.filter({has: hubPage.hubDisarmStateIcon}))).toBeVisible();}

        for (const group of await hubPage.groupBlock.all())
        { await expect(group.filter({has: hubPage.entityText})).toBeVisible();}
    });

    test.describe('Working with groups',() => {

        test('Add group', { tag: ['@smoke']}, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhwd'
            });

            const nameOfGroup: string = faker.string.alphanumeric({ length: { min: 10, max: 12 } });

            await hubPage.groupAddGroupButton.click();
            await hubPage.inputFirstField.fill(nameOfGroup);
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await hubPage.users.click();
            await hubPage.groups.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await page.getByText(nameOfGroup).click();

            await expect(page.getByText(TEXT_EDIT_GROUP)).toBeVisible();

            await hubPage.groupDeleteButton.click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(`Delete ${nameOfGroup}?`)).toBeVisible();

            await hubPage.deleteButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await expect (page.getByText((nameOfGroup))).not.toBeVisible();
        });

        test('Changing name of the group', {  tag: ['@smoke']}, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhtb'
            });

            const nameOfGroup: string = 'newGroup_' + faker.string.alphanumeric({ length: { min: 3, max: 5 } });
            const newNameOfGroup: string = 'newgroup_' + faker.string.alphanumeric({ length: { min: 2, max: 4 } });

            await hubPage.groupAddGroupButton.click();
            await hubPage.inputFirstField.fill(nameOfGroup);
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await hubPage.users.click();
            await hubPage.groups.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await expect(page.getByText((nameOfGroup))).toBeVisible();

            await page.getByText((nameOfGroup)).click();
            await hubPage.groupBlockWithName.click();
            await hubPage.inputFirstField.fill(newNameOfGroup);
            await hubPage.saveButton.click();

            await expect(page.getByText(TEXT_EDIT_GROUP)).toBeVisible();
            await expect (page.getByText((newNameOfGroup))).toBeVisible();

            await hubPage.groupDeleteButton.click();

            await expect(page.getByText(`Delete ${newNameOfGroup}?`)).toBeVisible();

            await hubPage.deleteButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await expect (page.getByText((newNameOfGroup))).not.toBeVisible();
        });

        test('Delete group', {  tag: ['@smoke']}, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhxu'
            });

            const nameOfGroup: string = 'DELETE_' + faker.string.alphanumeric({ length: { min: 10, max: 12 } });

            await hubPage.groupAddGroupButton.click();

            await expect(page.getByText(TEXT_ENTER_GROUP_NAME)).toBeVisible();

            await hubPage.inputFirstField.fill(nameOfGroup);
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await hubPage.users.click();
            await hubPage.groups.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await page.getByText(nameOfGroup).click();

            await expect(page.getByText(TEXT_EDIT_GROUP)).toBeVisible();

            await hubPage.groupDeleteButton.click();

            await expect(page.getByText(`Delete ${nameOfGroup}?`)).toBeVisible();

            await hubPage.deleteButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await expect (page.getByText((nameOfGroup))).not.toBeVisible();
        });

    });

});