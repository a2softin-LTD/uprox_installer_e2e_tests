import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import { faker } from "@faker-js/faker";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');

    });

    test.describe('Working with groups', () => {

        test('Add group', { tag: ['@smoke','@hub']}, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhwd'
            });

            const nameOfGroup: string = faker.string.alphanumeric({ length: { min: 10, max: 12 } });
            const name: string = "Дмитро";

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await hubPage.users.click();
            if (await (page.getByText(name)).isVisible()) {
                await page.getByText(name).click();
                await hubPage.deleteUserButton.click();
                await hubPage.submitButton.click();}
            await hubPage.groups.click();
            await hubPage.groupAddGroupButton.click();
            await hubPage.groupNameField.fill(nameOfGroup);
            await hubPage.saveButton.click();
            await page.waitForTimeout(2000);
            await page.reload();

            await expect(page.getByText((nameOfGroup))).toBeVisible();

            await page.getByText(nameOfGroup).click();

            await expect(page.getByText('Edit group')).toBeVisible();

            await hubPage.groupDeleteButton.click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(`Delete ${nameOfGroup}?`)).toBeVisible();

            await hubPage.deleteButton.click();
            await page.waitForTimeout(2000);
            await page.reload();

            await expect (page.getByText((nameOfGroup))).not.toBeVisible();
        });

        test('Changing name of the group', {  tag: ['@smoke','@hub']}, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhtb'
            });

            const nameOfGroup: string = 'newGroup_' + faker.string.alphanumeric({ length: { min: 3, max: 5 } });
            const newNameOfGroup: string = 'newgroup_' + faker.string.alphanumeric({ length: { min: 2, max: 4 } });

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await hubPage.groups.click();
            await hubPage.groupAddGroupButton.click();
            await hubPage.groupNameField.fill(nameOfGroup);
            await hubPage.saveButton.click();
            await page.waitForTimeout(2000);
            page.reload();

            await expect(page.getByText((nameOfGroup))).toBeVisible();

            await page.getByText((nameOfGroup)).click();
            await hubPage.groupBlockWithName.click();
            await hubPage.groupNameField.fill(newNameOfGroup);
            await hubPage.saveButton.click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);

            await expect (page.getByText((newNameOfGroup))).toBeVisible();

            await hubPage.groupDeleteButton.click();

            await expect(page.getByText(`Delete ${newNameOfGroup}?`)).toBeVisible();

            await hubPage.deleteButton.click();
            await page.waitForTimeout(2000);
            await page.reload();

            await expect (page.getByText((newNameOfGroup))).not.toBeVisible();
        });

        test('Delete group', {  tag: ['@smoke','@hub']}, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694euhxu'
            });

            const nameOfGroup: string = 'DELETE_' + faker.string.alphanumeric({ length: { min: 10, max: 12 } });

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await hubPage.groups.click();
            await hubPage.groupAddGroupButton.click();
            
            await expect(page.getByText('Enter group name')).toBeVisible();

            await hubPage.groupNameField.fill(nameOfGroup);
            await hubPage.saveButton.click();

            await expect(hubPage.groupAddGroupButton).toBeVisible();

            await page.waitForTimeout(2000);
            await page.reload();

            await expect(page.getByText(nameOfGroup)).toBeVisible();

            await page.getByText(nameOfGroup).click();

            await expect(page.getByText('Edit group')).toBeVisible();

            await hubPage.groupDeleteButton.click();

            await expect(page.getByText(`Delete ${nameOfGroup}?`)).toBeVisible();

            await hubPage.deleteButton.click();
            await page.waitForTimeout(2000);
            await page.reload();

            await expect(hubPage.groupAddGroupButton).toBeVisible();
            await expect (page.getByText((nameOfGroup))).not.toBeVisible();
        });

    });

});