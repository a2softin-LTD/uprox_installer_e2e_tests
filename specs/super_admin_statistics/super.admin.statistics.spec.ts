import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { SUPER_ADMIN } from "../../utils/user_data";

test.describe('Statistics under SUPER_ADMIN role', { tag: ['@stable']  }, () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });
    test('Checking UI elements of the statistics page', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await profilePage.statistics.click();

        await expect(profilePage.pageTitle.first().filter({hasText:'Statistics'})).toBeVisible();
        await expect(profilePage.pageTitle.last().filter({hasText:'Statistics: Panels'})).toBeVisible();
        await expect(profilePage.saveInXLSButton).toBeVisible();
        await expect(page.getByText('Panels', {exact:true})).toBeVisible();
        await expect(page.getByText('Radio devices')).toBeVisible();
        await expect(page.getByText('Total number of devices:')).toBeVisible();

    });

    test.skip('Statistics editing under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await hubPage.history.click();
            await hubPage.historyAlarmCheckBox.isVisible();
            await hubPage.historyTroublesCheckBox.isVisible();
            await hubPage.historyArmsCheckBox.isVisible();
            await hubPage.historyActionsCheckBox.isVisible();
            await hubPage.historyAlarmCheckBox.click();
            await hubPage.historyTroublesCheckBox.click();
            await hubPage.historyArmsCheckBox.click();

            await expect(page.getByText('Removed user').first()).toBeVisible();
            await expect(page.getByText('Added new user').first()).toBeVisible();

            await hubPage.historyAlarmCheckBox.click();
            await hubPage.historyTroublesCheckBox.click();
            await hubPage.historyArmsCheckBox.click();
            await hubPage.historyActionsCheckBox.click();

            await expect(page.getByText('Removed user').first()).not.toBeVisible();
            await expect(page.getByText('Added new user').first()).not.toBeVisible();
        });

    test('Download statistics file under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvcav'
            });

            await expect(page.getByText('Technical support')).toBeVisible();

            await profilePage.statistics.click();

            await expect(profilePage.pageTitle.filter({hasText:'Statistics: Panels'})).toBeVisible();

            await expect(page.getByText('Save in XLS')).toBeVisible();

            const downloadPromise = page.waitForEvent('download');
            await profilePage.saveInXLSButton.click();
            const download = await downloadPromise;
            await download.saveAs(download.suggestedFilename());
        });

});