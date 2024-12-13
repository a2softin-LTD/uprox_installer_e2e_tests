import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1, USER_2 } from "../../utils/user_data";
import {
    BUTTON_TRANSFER_OWNERSHIP,
    CODE_HIDE,
    CODE_SECOND,
    EMAIL_NECESSARY_NAME_PART, FAKER_EMAIL_FIFTH,
    FAKER_EMAIL_FIRST, FAKER_EMAIL_FOURTH, FAKER_EMAIL_SECOND, FAKER_EMAIL_SIX, FAKER_EMAIL_THIRD, FAKER_FULL_NAME,
    FAKER_NAME_OF_GROUP_FIRST, GROUP_NAME_FIRST, SETTINGS_ALARMS_RESTORES, SETTINGS_ARMS_DISARM,
    SETTINGS_ENABLED, SETTINGS_TROUBLES_RESTORES,
    TEXT_ADD_GROUP,
    TEXT_ADD_KEYFOB,
    TEXT_ADD_KEYFOB_INSTRUCTION_FIRST,
    TEXT_ADD_KEYFOB_INSTRUCTION_SECOND, TEXT_ALL_SELECTED,
    TEXT_CANSEL_REGISTRY,
    TEXT_EDIT_GROUP, TEXT_ENABLED, TEXT_ERROR_33_GROUP,
    TEXT_ERROR_CODE,
    TEXT_MOBILE,
    TEXT_MOBILE_NEW, TEXT_SERVICE, TEXT_SUBMIT,
    TEXT_USER_MANAGEMENT,
    TITLE_EDIT_USER,
    TITLE_GROUPS,
    TITLE_UPDATE_FIRMWARE_VERSION,
    TITLE_USERS,
    URL_LOGIN,
    URL_PROFILE_PANELS,
    USER_FULL_FIRST,
    USER_NAME_63_SYMBOLS,
    USER_NAME_67_SYMBOLS,
    USER_NAME_JAPAN,
    USER_NAME_LATIN,
    USER_NAME_SER_ARABIC,
    USER_NAME_SER_CYRILLIC,
    USER_NAME_SPECIAL_SYMBOLS,
    USER_NAME_SPECIAL_TURKISH, USER_PHONE_NEW, USER_PHONE_OLD
} from "../../utils/constants";
import {faker} from "@faker-js/faker";
import {ProfilePage} from "../../pages/profile/ProfilePage";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);
        profilePage = new ProfilePage(page);

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

    test('Add 33rd group by autonomous installer', { tag: ['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: ''
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
            description: ''
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
});