import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {
    BUTTON_CREATE_SCHEDULE,
    DAY_MONDAY,
    GROUP_NAME,
    REACTION_ERROR_MESSAGE, REACTION_WARNING_DELETE_MESSAGE,
    REACTION_WARNING_MESSAGE,
    SETTINGS_DISARMING,
    SETTINGS_TIME_ZONE,
    TEXT_FIRST_REACTION,
    TEXT_SECOND_REACTION,
    TEXT_SELECT_CONTROLLER_TIME_ZONE, TIME_ZONE_FIRST, TIME_ZONE_SECOND,
    TITLE_AUTOMATION,
    TITLE_UPDATE_FIRMWARE_VERSION, URL_LOGIN, URL_PROFILE_PANELS
} from "../../utils/constants";

test.describe('Hub Page tests',{ tag: ['@stable', '@hub']}, () => {

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
        await page.waitForTimeout(2000);

        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await page.waitForLoadState('domcontentloaded');
        await hubPage.automation.click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_AUTOMATION)})).toBeVisible();
    });

    test('Checking UI elements on the hub reactions page', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(page.getByText(SETTINGS_TIME_ZONE)).toBeVisible();
        await expect(hubPage.automationCreateReactionButton).toBeVisible();
        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_AUTOMATION)})).toBeVisible();
    });

    test.describe('Reactions', () => {

        test('Reactions list display', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694kxg6v'
            });

            await page.waitForTimeout(2000);

            for (const reaction of await hubPage.entityBlock.all())
                await expect(reaction).toBeVisible();

            for (const reaction of await hubPage.entityBlock.all())
            {await expect(reaction.filter({has: hubPage.trashIcon})).toBeVisible();}

            for (const reaction of await hubPage.entityBlock.all())
            {await expect(reaction.filter({has: hubPage.entityText})).toBeVisible();}

        });

        test('Add reaction', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694fch75'
            });

            await page.waitForTimeout(2000);

            if (await (page.getByText(TEXT_FIRST_REACTION)).isVisible()) {
                await  (((hubPage.entityBlock).filter({hasText:TEXT_FIRST_REACTION})).locator(hubPage.trashIcon)).click();
                await hubPage.submitButton.click();}

            await hubPage.automationCreateReactionButton.click();

            await expect(page.getByText(REACTION_WARNING_MESSAGE)).toBeVisible();

            await hubPage.inputFirstField.fill(TEXT_FIRST_REACTION);
            await page.waitForLoadState('domcontentloaded');
            await hubPage.inputSecondField.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.selectFirstField.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(SETTINGS_DISARMING,{exact:true}).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.selectSecondField.click();
            await page.getByText(GROUP_NAME,{exact:true}).click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(DAY_MONDAY,{exact:true}).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_AUTOMATION)})).toBeVisible();
            await expect(page.getByText(TEXT_FIRST_REACTION)).toBeVisible();

            await  (((hubPage.entityBlock).filter({hasText:TEXT_FIRST_REACTION})).locator(hubPage.trashIcon)).click();

            await expect(page.getByText(REACTION_WARNING_DELETE_MESSAGE)).toBeVisible();

            await hubPage.submitButton.click();

            if (await page.getByText(REACTION_ERROR_MESSAGE).isVisible())
            {  await hubPage.closeWindowButton.click();}

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_AUTOMATION)})).toBeVisible();
            await expect(page.getByText(TEXT_FIRST_REACTION)).not.toBeVisible();

        });

        test('Delete reaction', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694fchq3'
            });

            await page.waitForTimeout(2000);

            if (await (page.getByText(TEXT_FIRST_REACTION)).isVisible()) {
                await  (((hubPage.entityBlock).filter({hasText:TEXT_FIRST_REACTION})).locator(hubPage.trashIcon)).click();
                await hubPage.submitButton.click();}

            await hubPage.automationCreateReactionButton.click();

            await expect(page.getByText(REACTION_WARNING_MESSAGE)).toBeVisible();

            await hubPage.inputFirstField.fill(TEXT_FIRST_REACTION);
            await page.waitForLoadState('domcontentloaded');
            await hubPage.inputSecondField.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.selectFirstField.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(SETTINGS_DISARMING,{exact:true}).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.selectSecondField.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(GROUP_NAME,{exact:true}).click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(DAY_MONDAY,{exact:true}).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_AUTOMATION)})).toBeVisible();
            await expect(page.getByText(TEXT_FIRST_REACTION)).toBeVisible();

            await  (((hubPage.entityBlock).filter({hasText:TEXT_FIRST_REACTION})).locator(hubPage.trashIcon)).click();

            await expect(page.getByText(REACTION_WARNING_DELETE_MESSAGE)).toBeVisible();

            await hubPage.submitButton.click();

            if (await page.getByText(REACTION_ERROR_MESSAGE).isVisible())
            {  await hubPage.closeWindowButton.click()}

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_AUTOMATION)})).toBeVisible();
            await expect(page.getByText(TEXT_FIRST_REACTION)).not.toBeVisible();
        });

        test('Edit reaction', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694fchp2'
            });

            await page.waitForTimeout(2000);

            if (await (page.getByText(TEXT_FIRST_REACTION)).isVisible()) {
                await  (((hubPage.entityBlock).filter({hasText:TEXT_FIRST_REACTION})).locator(hubPage.trashIcon)).click();
                await expect(page.getByText(REACTION_WARNING_DELETE_MESSAGE)).toBeVisible();
                await hubPage.submitButton.click();}

            await hubPage.automationCreateReactionButton.click();

            await expect(page.getByText(REACTION_WARNING_MESSAGE)).toBeVisible();

            await hubPage.inputFirstField.fill(TEXT_FIRST_REACTION);
            await page.waitForLoadState('domcontentloaded');
            await hubPage.inputSecondField.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.submitButton.click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.selectFirstField.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(SETTINGS_DISARMING,{exact:true}).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.selectSecondField.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(GROUP_NAME,{exact:true}).click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(DAY_MONDAY,{exact:true}).click();
            await page.waitForLoadState('domcontentloaded');
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_AUTOMATION)})).toBeVisible();
            await expect(page.getByText(TEXT_FIRST_REACTION)).toBeVisible();

            await page.getByText(TEXT_FIRST_REACTION).click();

            await expect(page.getByText(REACTION_WARNING_MESSAGE)).toBeVisible();

            await hubPage.inputFirstField.fill(TEXT_SECOND_REACTION);
            await hubPage.saveButton.click();

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_AUTOMATION)})).toBeVisible();
            await expect(page.getByText(TEXT_SECOND_REACTION)).toBeVisible();

            await  (((hubPage.entityBlock).filter({hasText:TEXT_SECOND_REACTION})).locator(hubPage.trashIcon)).click();

            await expect(page.getByText(REACTION_WARNING_DELETE_MESSAGE)).toBeVisible();

            await hubPage.submitButton.click();

            if (await page.getByText(REACTION_ERROR_MESSAGE).isVisible())
            {  await hubPage.closeWindowButton.click();}

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_AUTOMATION)})).toBeVisible();
            await expect(page.getByText(TEXT_SECOND_REACTION)).not.toBeVisible();
        });

    });

    test('Time zone editing', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694kxc3a'
        });

        await page.getByText(SETTINGS_TIME_ZONE).click();

        await expect(page.getByText(TEXT_SELECT_CONTROLLER_TIME_ZONE)).toBeVisible();

        await hubPage.inputField.click();
        await page.waitForLoadState('domcontentloaded');
        await page.getByText(TIME_ZONE_SECOND).click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.submitButton.click();

        await expect(page.getByText(BUTTON_CREATE_SCHEDULE)).toBeVisible();
        await expect(page.getByText(TIME_ZONE_SECOND)).toBeVisible();

        await page.getByText(SETTINGS_TIME_ZONE).click();

        await expect(page.getByText(TEXT_SELECT_CONTROLLER_TIME_ZONE)).toBeVisible();

        await hubPage.inputField.click();
        await page.waitForLoadState('domcontentloaded');
        await page.getByText(TIME_ZONE_FIRST).click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.submitButton.click();

        await expect(page.getByText(BUTTON_CREATE_SCHEDULE)).toBeVisible();
        await expect(page.getByText(TIME_ZONE_FIRST)).toBeVisible();
    });

});