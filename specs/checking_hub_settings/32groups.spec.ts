import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {
    FAKER_NAME_OF_GROUP_FIRST, GROUP_NAME_ARABIC, GROUP_NAME_CHINESE, GROUP_NAME_CYRILLIC,
    GROUP_NAME_GREEK, GROUP_NAME_JAPAN, GROUP_NAME_KOREAN,
    GROUP_NAME_LATIN,
    GROUP_NAME_SPECIAL_SYMBOLS, GROUP_NAME_TURKISH,
    TEXT_EDIT_GROUP,
    TEXT_ERROR_33_GROUP,
    TITLE_GROUPS,
    TITLE_UPDATE_FIRMWARE_VERSION,
    URL_LOGIN,
    URL_PROFILE_PANELS,
} from "../../utils/constants";
import {faker} from "@faker-js/faker";
import {ProfilePage} from "../../pages/profile/ProfilePage";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({page}) => {
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
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
            await hubPage.closeWindowButton.click();}

    });

     test('Add 32 groups by autonomous installer', { tag: ['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8696x8t70'
        });

        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

        let groupsNumber;

        for (groupsNumber=0;groupsNumber<32;) {

            let FAKER_GROUP_NAME: string = faker.string.alphanumeric({ length: { min: 10, max: 12 } })

            await hubPage.groupAddGroupButton.click();
            await hubPage.inputFirstField.fill(FAKER_GROUP_NAME);
            await hubPage.saveButton.click();
            if (await page.getByText(TEXT_ERROR_33_GROUP).isVisible()) break;
            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await hubPage.users.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.groups.click();
            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await expect(page.getByText(FAKER_GROUP_NAME)).toBeVisible();
            groupsNumber=((await page.$$('.part__item')).length);
            console.log(groupsNumber);}

        await expect(hubPage.entityBlock).toHaveCount(32);
    });

    test('Add 33rd group by autonomous installer: negative', { tag: ['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/869740amj'
        });

        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

        await expect(hubPage.entityBlock).toHaveCount(32);

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(FAKER_NAME_OF_GROUP_FIRST);
        await hubPage.saveButton.click();

        await expect(page.getByText(TEXT_ERROR_33_GROUP)).toBeVisible();
    });

    test('Delete all groups by autonomous installer', { tag: ['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/869740bd0'
        });

        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

        while (await hubPage.entityBlock.last().isVisible())
        {   await hubPage.entityBlock.last().click();
            await page.waitForLoadState('domcontentloaded');
            await expect(page.getByText(TEXT_EDIT_GROUP)).toBeVisible();
            if (await page.getByText('Group 1').isVisible()) break;
            await hubPage.groupDeleteButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteButton.click();
            await page.waitForTimeout(2000);
            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();}

        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(hubPage.entityBlock).toHaveCount(1);
    });

    test('Add group with name by different languages and special symbols', { tag: ['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8696x9en2'
        });

        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

        while (await hubPage.entityBlock.last().isVisible())
        {   await hubPage.entityBlock.last().click();
            await page.waitForLoadState('domcontentloaded');
            await expect(page.getByText(TEXT_EDIT_GROUP)).toBeVisible();
            if (await page.getByText('Group 1').isVisible()) break;
            await hubPage.groupDeleteButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteButton.click();
            await page.waitForTimeout(2000);
            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();}

        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(hubPage.entityBlock).toHaveCount(1);

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(GROUP_NAME_LATIN);
        await hubPage.saveButton.click();

        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(page.getByText(GROUP_NAME_LATIN)).toBeVisible();

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(GROUP_NAME_CYRILLIC);
        await hubPage.saveButton.click();

        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(page.getByText(GROUP_NAME_CYRILLIC)).toBeVisible();

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(GROUP_NAME_SPECIAL_SYMBOLS);
        await hubPage.saveButton.click();

        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(page.getByText(GROUP_NAME_SPECIAL_SYMBOLS)).toBeVisible();

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(GROUP_NAME_JAPAN);
        await hubPage.saveButton.click();

        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(page.getByText(GROUP_NAME_JAPAN)).toBeVisible();

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(GROUP_NAME_CHINESE);
        await hubPage.saveButton.click();

        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(page.getByText(GROUP_NAME_CHINESE)).toBeVisible();

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(GROUP_NAME_KOREAN);
        await hubPage.saveButton.click();

        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(page.getByText(GROUP_NAME_KOREAN)).toBeVisible();

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(GROUP_NAME_GREEK);
        await hubPage.saveButton.click();

        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(page.getByText(GROUP_NAME_GREEK)).toBeVisible();

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(GROUP_NAME_TURKISH);
        await hubPage.saveButton.click();

        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(page.getByText(GROUP_NAME_TURKISH)).toBeVisible();

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(GROUP_NAME_ARABIC);
        await hubPage.saveButton.click();

        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(page.getByText(GROUP_NAME_ARABIC)).toBeVisible();

        while (await hubPage.entityBlock.last().isVisible())
        {   await hubPage.entityBlock.last().click();
            await page.waitForLoadState('domcontentloaded');
            await expect(page.getByText(TEXT_EDIT_GROUP)).toBeVisible();
            if (await page.getByText('Group 1').isVisible()) break;
            await hubPage.groupDeleteButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteButton.click();
            await page.waitForTimeout(2000);
            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();}

        await hubPage.groups.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(hubPage.entityBlock).toHaveCount(1);
    });
});