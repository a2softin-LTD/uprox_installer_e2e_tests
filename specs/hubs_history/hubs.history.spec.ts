import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {
    TEXT_ADDED_NEW_USER,
    TEXT_REMOVED_USER,
    TEXT_SAVE_IN__XLS,
    TITLE_UPDATE_FIRMWARE_VERSION, URL_LOGIN, URL_PROFILE_PANELS
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
        {  await hubPage.closeWindowButton.click()}

        await hubPage.history.click();
        await expect(page.getByText(TEXT_SAVE_IN__XLS)).toBeVisible();
    });

    test('History display', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            await page.waitForTimeout(2000);

            for (const event of await hubPage.historyEvent.all())
            { await expect(event).toBeVisible();}
    });

    test('History filtration', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            await hubPage.historyAlarmCheckBox.isVisible();
            await hubPage.historyTroublesCheckBox.isVisible();
            await hubPage.historyArmsCheckBox.isVisible();
            await hubPage.historyActionsCheckBox.isVisible();
            await hubPage.historyAlarmCheckBox.click();
            await hubPage.historyTroublesCheckBox.click();
            await hubPage.historyArmsCheckBox.click();

            await expect(page.getByText(TEXT_REMOVED_USER).first()).toBeVisible();
            await expect(page.getByText(TEXT_ADDED_NEW_USER).first()).toBeVisible();

            await hubPage.historyAlarmCheckBox.click();
            await hubPage.historyTroublesCheckBox.click();
            await hubPage.historyArmsCheckBox.click();
            await hubPage.historyActionsCheckBox.click();

            await expect(page.getByText(TEXT_REMOVED_USER).first()).not.toBeVisible();
            await expect(page.getByText(TEXT_ADDED_NEW_USER).first()).not.toBeVisible();
    });

    test.skip('Downloading history file: user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvcav'
            });

            await hubPage.saveInXLSButton.click();
            const [download]=await
                Promise.all([page.waitForEvent('download'), hubPage.exportButton.click()] );

            await download.saveAs(download.suggestedFilename());
    });

});