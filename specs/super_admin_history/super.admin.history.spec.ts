import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { SUPER_ADMIN } from "../../utils/user_data";

test.describe('Hub history page', { tag: ['@stable']  }, () => {

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

    test.describe('History under SUPER_ADMIN role', () => {

        test('History display under SUPER_ADMIN role', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            await hubPage.history.click();

            await expect(hubPage.historyFirstEvent).toBeVisible();

            for (const event of await hubPage.historyEvent.all())
            { await expect(event).toBeVisible();}

            await hubPage.historyLastEvent.scrollIntoViewIfNeeded();

            await expect(hubPage.historyLastEvent).toBeVisible();
        });

        test('History filtration by hub under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            const serialNumber: string = "00:08:B7:10:02:04";

            await hubPage.history.click();
            await profilePage.companySearchByHubField.fill(serialNumber);
            await page.waitForTimeout(2000);

            for (const event of await hubPage.historyEvent.all())
            { await expect(event.filter({hasText:'d.pinchuk@itvsystems.com.ua'})).toBeVisible();}

        });

        test.skip('History filtration by date under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            const serialNumber: string = "00:08:B7:10:02:04";

            await hubPage.history.click();
            await profilePage.companySearchByHubField.fill(serialNumber);
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);
            for (const event of await hubPage.historyEvent.all())
            { await expect(event.filter({hasText:'d.pinchuk@itvsystems.com.ua'})).toBeVisible();}
        });

        test.skip('History filtration by event under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
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

        test('Download history file under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvcav'
            });

            await expect(page.getByText('Technical support')).toBeVisible();

            await hubPage.history.click();

            await expect(page.getByText('Save in XLS')).toBeVisible();

            const downloadPromise = page.waitForEvent('download');
            await hubPage.saveInXLSButton.click();
            const download = await downloadPromise;
            await download.saveAs(download.suggestedFilename());
        });

    });

});