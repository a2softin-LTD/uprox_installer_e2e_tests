import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import {USER_1, USER_2} from "../../utils/user_data";
import {
    BUTTON_TRANSFER_OWNERSHIP, CODE_HIDE, EMAIL_NECESSARY_NAME_PART, FAKER_CODE,
    FAKER_EMAIL_FIRST, FAKER_FULL_NAME, FAKER_NAME_OF_GROUP_FIRST, TEXT_ADD_GROUP, TEXT_ERROR_CODE,
    TITLE_EDIT_USER, TITLE_GROUPS,
    TITLE_UPDATE_FIRMWARE_VERSION, TITLE_USERS, URL_LOGIN,
    URL_PROFILE_PANELS, USER_NAME_63_SYMBOLS
} from "../../utils/constants";
import {faker} from "@faker-js/faker";


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

    });

    test.skip('Add 250 users by autonomous installer', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf8"
        });
        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
            await hubPage.closeWindowButton.click()
        }
        await hubPage.users.click();

        // while (await hubPage.entityBlock.first().isVisible())
        // {   await hubPage.entityBlock.first().click();
        //     await page.waitForLoadState('domcontentloaded');
        //     await hubPage.deleteUserButton.click();
        //     await page.waitForLoadState('domcontentloaded');
        //     await hubPage.submitButton.click();
        //     await page.waitForTimeout(2000);
        //     await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();}
        //
        // await expect(hubPage.entityBlock).toHaveCount(0);

        var hubsNumber;

       for (hubsNumber=0;hubsNumber<=20; hubsNumber++) {

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
            await expect(page.getByText(BUTTON_TRANSFER_OWNERSHIP)).toBeVisible({timeout:7000});
        } catch (error) {
            await page.reload();
            await page.waitForTimeout(2000);
            await hubPage.users.click();
        } finally {     await expect(hubPage.pageTitle.filter({hasText:TITLE_USERS})).toBeVisible();;
        console.log(hubsNumber);}
        }
       // await expect(hubPage.entityBlock).toHaveCount(10);
       // await page.getByText(FAKER_FULL_NAME).click();

        //await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();}

        // await hubPage.settingsArmKeypadCode.click();
        // await page.waitForLoadState('domcontentloaded');
        // await hubPage.settingsKeypadCodeField.fill(FAKER_CODE);
        // await page.waitForLoadState('domcontentloaded');
        // await hubPage.saveButton.click()
        //
        // await expect(hubPage.settingsArmKeypadCode.filter({hasText:CODE_HIDE})).toBeVisible();
        //
        // await expect(page.getByText(TITLE_EDIT_USER)).toBeVisible();

    });

    test.skip('Add 251 user by autonomous installer', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf8"
        });
        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
            await hubPage.closeWindowButton.click()
        }
        await hubPage.users.click();

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

    test.skip('Add user with more than 63 symbols name', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf8"
        });
        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
            await hubPage.closeWindowButton.click()
        }
        await hubPage.users.click();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME_63_SYMBOLS);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        await expect(page.getByText(TEXT_ERROR_CODE)).toBeVisible();

    });

    test.skip('Add user with 63 symbols name', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf8"
        });
        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
            await hubPage.closeWindowButton.click()
        }
        await hubPage.users.click();

        await hubPage.addButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserName.fill(USER_NAME_63_SYMBOLS);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addUserEmail.fill(FAKER_EMAIL_FIRST);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.addButton.click();

        await expect(page.getByText(TEXT_ERROR_CODE)).toBeVisible();

    });

    test.skip('Delete all users by autonomous installer', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf8"
        });
        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
            await hubPage.closeWindowButton.click()
        }
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

    test.skip('Count users', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694amwf8"
        });
        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
            await hubPage.closeWindowButton.click()
        }
        await hubPage.users.click();

        var hubsNumber=0;


        for (const hub of await hubPage.entityBlock.all())
        {hubsNumber++;}

        console.log(hubsNumber);
    });

    test.skip('Add new group', { tag: ['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694euhwd'
        });

        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.thirdHub.click();
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible()) {
            await hubPage.closeWindowButton.click()}

        await hubPage.groups.click();
        await page.getByText(TEXT_ADD_GROUP).isVisible();

        await hubPage.groupAddGroupButton.click();
        await hubPage.inputFirstField.fill(FAKER_NAME_OF_GROUP_FIRST);
        await hubPage.saveButton.click();

        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();

        await hubPage.users.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.groups.click();

        await expect(hubPage.pageTitle.filter({hasText:TITLE_GROUPS})).toBeVisible();
        await expect(page.getByText(FAKER_NAME_OF_GROUP_FIRST)).toBeVisible();

    });
});
