import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {HubPage} from "../../pages/hub/HubPage";
import {USER_1} from "../../utils/user_data";


test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

    });

    test.describe('History', () => {

        test('History display', async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/86946uqk8'
            });

            await loginPage.auth(USER_1);
            await expect(page).toHaveURL('/profile/panels');

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            await page.waitForTimeout(2000);
            if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
            await hubPage.history.click();
            await page.waitForTimeout(2000);
            expect(hubPage.historyFirstEvent).toBeVisible();
            await page.waitForTimeout(2000);
            await hubPage.historyLastEvent.scrollIntoViewIfNeeded();
            await page.waitForTimeout(5000);
            expect(hubPage.historyLastEvent).toBeVisible();

        });

        test('History filtration', async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/86946uqk8'
            });

            await loginPage.auth(USER_1);
            await expect(page).toHaveURL('/profile/panels');

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            await page.waitForTimeout(2000);
            if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
            await hubPage.history.click();
            await hubPage.historyAlarmCheckBox.click();
            await hubPage.historyTroublesCheckBox.click();
            await hubPage.historyArmsCheckBox.click();
            await hubPage.historyActionsCheckBox.click();


        });


        test('Download history file', async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/86946uqk8'
            });

            await loginPage.auth(USER_1);
            await expect(page).toHaveURL('/profile/panels');

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            await page.waitForTimeout(2000);
            if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
            await hubPage.history.click();
            await hubPage.saveInXLSButton.click();
            await hubPage.exportButton.click();

            await page.waitForTimeout(1000);
            expect(hubPage.findByText('File created successfully')).toBeVisible();

        });
    });

});