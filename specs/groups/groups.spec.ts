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

    test.describe('Working with groups', () => {

        test('Add group', async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhpq'
            });

            const nameOfGroup: string = "newGroup";

            await loginPage.auth(USER_1);
            await expect(page).toHaveURL('/profile/panels');

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            await page.waitForTimeout(2000);
            if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
            await hubPage.groups.click();
            await hubPage.groupAddGroupButton.click();
            await page.waitForTimeout(2000);
            await hubPage.groupNameField.fill(nameOfGroup);
            await hubPage.saveButton.click();

            expect(hubPage.findByText('Saving changes')).toBeVisible();
            expect(hubPage.findByText('created successfully')).toBeVisible();
            await page.waitForTimeout(5000);
            expect (hubPage.findByText((nameOfGroup))).toBeVisible();
        });

        test('Change name of the group', async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhpq'
            });
            const nameOfGroup: string = "newGroup";
            const newNameOfGroup: string = "newNameGroup";

            await loginPage.auth(USER_1);
            await expect(page).toHaveURL('/profile/panels');

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            await page.waitForTimeout(2000);
            if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
            await hubPage.groups.click();
            await hubPage.findByText((nameOfGroup)).click();
            await hubPage.groupBlockWithName.click();
            await hubPage.groupNameField.fill(newNameOfGroup);
            await hubPage.saveButton.click();

            expect(hubPage.findByText('Saving changes')).toBeVisible();
            expect(hubPage.findByText('saved successfully')).toBeVisible();
            await page.waitForTimeout(2000);
            expect (hubPage.findByText((newNameOfGroup))).toBeVisible();
        });

        test('Delete group', async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhpq'
            });

            const nameOfGroup: string = "newNameGroup";

            await loginPage.auth(USER_1);
            await expect(page).toHaveURL('/profile/panels');

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            await page.waitForTimeout(2000);
            if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
            await hubPage.groups.click();
            await page.waitForTimeout(2000);
            await hubPage.findByText((nameOfGroup)).click();
            await hubPage.groupDeleteButton.click();
            await hubPage.deleteButton.click();

            expect(hubPage.findByText('deleted successfully')).toBeVisible();
            await page.waitForTimeout(5000);
            expect (hubPage.findByTextExact((nameOfGroup))).not.toBeVisible();

        });
    });

});