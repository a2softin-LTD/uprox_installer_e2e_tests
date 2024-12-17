import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {
    BUTTON_TRANSFER_OWNERSHIP,
    CODE_HIDE,
    CODE_SECOND,
    EMAIL_NECESSARY_NAME_PART, FAKER_EMAIL_FIFTH,
    FAKER_EMAIL_FIRST, FAKER_EMAIL_FOURTH, FAKER_EMAIL_SECOND, FAKER_EMAIL_SIX, FAKER_EMAIL_THIRD, FAKER_FULL_NAME,
    GROUP_NAME_FIRST,
    TEXT_ADD_KEYFOB,
    TEXT_ADD_KEYFOB_INSTRUCTION_FIRST,
    TEXT_ADD_KEYFOB_INSTRUCTION_SECOND, TEXT_ALL_SELECTED,
    TEXT_CANSEL_REGISTRY,
    TEXT_EDIT_GROUP, TEXT_ENABLED,
    TEXT_ERROR_CODE,
    TITLE_EDIT_USER,
    TITLE_GROUPS,
    TITLE_UPDATE_FIRMWARE_VERSION,
    TITLE_USERS,
    URL_LOGIN,
    URL_PROFILE_PANELS,
    USER_NAME_63_SYMBOLS,
    USER_NAME_67_SYMBOLS, USER_NAME_ARABIC, USER_NAME_CYRILLIC,
    USER_NAME_JAPAN,
    USER_NAME_LATIN,
    USER_NAME_SPECIAL_SYMBOLS,
    USER_NAME_TURKISH
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

    test('Add 250 users by autonomous installer', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696vqggt"
        });

        await hubPage.users.click();
        let hubsNumber;

       for (hubsNumber=0;hubsNumber<250;) {

           let FAKER_FULL_NAME: string = faker.person.fullName();
           let FAKER_EMAIL_FIRST: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(FAKER_FULL_NAME);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        try {
            await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible({timeout:5000});
        } catch (error) {
            await page.reload();
            await page.waitForTimeout(1000);
            await hubPage.users.click();
        } finally {
            await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
            hubsNumber=((await page.$$('.part__item')).length);
            console.log(hubsNumber);}
        }
        await expect(hubPage.entityBlock).toHaveCount(250);
    });

    test('Add 251st user by autonomous installer: negative', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696vqgpn"
        });

        await hubPage.users.click();

        await expect(hubPage.entityBlock).toHaveCount(250);

        let FAKER_FULL_NAME: string = faker.person.fullName();
        let FAKER_EMAIL_FIRST: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(FAKER_FULL_NAME);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        await expect(page.getByText(TEXT_ERROR_CODE)).toBeVisible();
    });

    test('Editing 25Oth user email', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696w4vfp"
        });

        await hubPage.users.click();
        await expect(hubPage.entityBlock).toHaveCount(250);
        await hubPage.entityBlock.last().click();
        await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

        await profilePage.userProfileBlock.nth(0).click();
        await profilePage.userEditField.clear();
        await profilePage.userEditField.fill(FAKER_EMAIL_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await profilePage.saveButton.click();

        await expect(page.getByText(FAKER_EMAIL_FIRST)).toBeVisible();
    });

    test('Editing 250th user name', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696w4vfg"
        });

        await hubPage.users.click();
        await expect(hubPage.entityBlock).toHaveCount(250);
        await hubPage.entityBlock.last().click();
        await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

        await profilePage.userProfileBlock.nth(1).click();
        await profilePage.userEditField.clear();
        await profilePage.userEditField.fill(FAKER_FULL_NAME);
        await page.waitForLoadState('domcontentloaded');
        await profilePage.saveButton.click();

        await expect(page.getByText(FAKER_FULL_NAME)).toBeVisible();
    });

    test.describe('Editing 25Oth user setting by autonomous installer', () => {

        test('Arm keypad code: 250th user', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8696w4vfc'
            });
            await hubPage.users.click();
            await expect(hubPage.entityBlock).toHaveCount(250);
            await hubPage.entityBlock.last().click();
            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsArmKeypadCode.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.settingsKeypadCodeField.fill(CODE_SECOND);
            await page.waitForLoadState('domcontentloaded');
            await hubPage.saveButton.click()

            await expect(hubPage.settingsArmKeypadCode.filter({hasText:CODE_HIDE})).toBeVisible();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

        });

        test('Mobile application: 250th user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8696w4vfc'
            });

            await hubPage.users.click();
            await expect(hubPage.entityBlock).toHaveCount(250);
            await hubPage.entityBlock.last().click();
            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsMobileApp.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.enableButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.saveButton.click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();
            await expect(hubPage.settingsMobileApp.filter({hasText:TEXT_ENABLED})).toBeVisible();

        });

        test.skip('Group access: 250th user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8696w4vfc'
            });

            await hubPage.groups.click();
            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await hubPage.groupAddGroupButton.click();
            await hubPage.inputFirstField.fill(GROUP_NAME_FIRST);
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await page.getByText(GROUP_NAME_FIRST).click();

            await hubPage.users.click();
            await expect(hubPage.entityBlock).toHaveCount(250);
            await hubPage.entityBlock.last().click();
            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsGroupAccess.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(TEXT_ALL_SELECTED).click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(GROUP_NAME_FIRST).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();

            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();
            await expect(hubPage.settingsGroupAccess.filter({hasText:GROUP_NAME_FIRST})).toBeVisible();

            await hubPage.backButton.click();

            await hubPage.groups.click();
            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

            await page.getByText(GROUP_NAME_FIRST).click();

            await expect(page.getByText(TEXT_EDIT_GROUP)).toBeVisible();

            await hubPage.groupDeleteButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.deleteButton.click();

            await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
            await expect (page.getByText((GROUP_NAME_FIRST))).not.toBeVisible();

        });


        test('Keyfob: 250th user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8696w4vfc'
            });

            await hubPage.users.click();
            await expect(hubPage.entityBlock).toHaveCount(250);
            await hubPage.entityBlock.last().click();
            await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

            await hubPage.settingsKeyfob.click();
            await expect(page.getByText(TEXT_ADD_KEYFOB)).toBeVisible();
            await expect(page.getByText( TEXT_ADD_KEYFOB_INSTRUCTION_FIRST)).toBeVisible();
            await expect(page.getByText(TEXT_CANSEL_REGISTRY)).toBeVisible();

            await hubPage.settingsKeyfobImage.nth(0).click();

            await expect(page.getByText(TEXT_ADD_KEYFOB_INSTRUCTION_SECOND)).toBeVisible();

            await page.reload();
            await page.waitForTimeout(5000);

            if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
            { await hubPage.closeWindowButton.click();}

            await expect(page.getByText(TEXT_ADD_KEYFOB)).toBeVisible();

            await hubPage.settingsKeyfobImage.nth(1).click();

            await expect(page.getByText(TEXT_ADD_KEYFOB_INSTRUCTION_SECOND)).toBeVisible();

            await page.reload();
            await page.waitForTimeout(5000);

            if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
            { await hubPage.closeWindowButton.click();}

            await hubPage.settingsKeyfobImage.nth(2).click();

            await expect(page.getByText(TEXT_ADD_KEYFOB_INSTRUCTION_SECOND)).toBeVisible();

        });

    });
    test('Delete 250th user by autonomous installer', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696w4vfu"
        });

        await hubPage.users.click();
        await expect(hubPage.entityBlock).toHaveCount(250);
        await hubPage.entityBlock.last().click();
        await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

        await hubPage.deleteUserButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.submitButton.click();
        await page.waitForTimeout(5000);
        await page.reload();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();

        await expect(hubPage.entityBlock).toHaveCount(249);
    });
    test('Delete all 250 users by autonomous installer', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696vqxbg"
        });

        await hubPage.users.click();

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

    test('Add user with more than 63 symbols name by autonomous installer', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696vqhvh"
        });

        await hubPage.users.click();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME_67_SYMBOLS);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        await expect(page.getByText(TEXT_ERROR_CODE)).toBeVisible();

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

    test('Add user with 63 symbols name by autonomous installer', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696vqjxw"
        });

        await hubPage.users.click();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME_63_SYMBOLS);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
        await expect(page.getByText(USER_NAME_63_SYMBOLS)).toBeVisible();

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

    test('Add user with name by different languages and special symbols', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8696vqn4q"
        });

        await hubPage.users.click();
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

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME_LATIN);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();
        await page.waitForTimeout(5000);
        await page.reload();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
        await expect(page.getByText(USER_NAME_LATIN)).toBeVisible();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME_CYRILLIC);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_SECOND);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();
        await page.waitForTimeout(5000);
        await page.reload();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
        await expect(page.getByText(USER_NAME_CYRILLIC)).toBeVisible();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME_SPECIAL_SYMBOLS);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_THIRD);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();
        await page.waitForTimeout(5000);
        await page.reload();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
        await expect(page.getByText(USER_NAME_SPECIAL_SYMBOLS)).toBeVisible();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME_JAPAN);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FOURTH);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();
        await page.waitForTimeout(5000);
        await page.reload();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
        await expect(page.getByText(USER_NAME_JAPAN)).toBeVisible();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME_ARABIC);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FIFTH);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();
        await page.waitForTimeout(5000);
        await page.reload();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
        await expect(page.getByText(USER_NAME_ARABIC)).toBeVisible();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME_TURKISH);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_SIX);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();
        await page.waitForTimeout(5000);
        await page.reload();
        await page.waitForTimeout(2000);
        await hubPage.users.click();
        await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
        await expect(page.getByText(USER_NAME_TURKISH)).toBeVisible();

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

    // test.skip('Count users', {tag: ['@smoke']}, async ({page}) => {
    //     test.info().annotations.push({
    //         type: "test_id",
    //         description: ""
    //     });
    //     await hubPage.panels.click();
    //     await page.waitForLoadState('domcontentloaded');
    //     await hubPage.firstHub.click();
    //     await page.waitForLoadState('domcontentloaded');
    //     await page.waitForTimeout(2000);
    //     if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
    //         await hubPage.closeWindowButton.click()
    //     }
    //     await hubPage.users.click();
    //     await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();
    //     var hubsNumber=0;
    //     for (const hub of await hubPage.entityBlock.all())
    //     {hubsNumber++;}
    //     console.log(hubsNumber);
    // });

});
