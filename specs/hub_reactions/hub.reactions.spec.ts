import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";

test.describe('Hub reactions', { tag: ['@stable']  }, () => {

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

    test('Checking UI elements on the hub reactions page', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });
        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await profilePage.automation.click();

        await expect(page.getByText('Time zone')).toBeVisible();
        await expect(hubPage.automationCreateReactionButton).toBeVisible();
        await expect(profilePage.pageTitle.filter({has:page.getByText('Automation')})).toBeVisible();
    });

    test.describe('Reactions', () => {

        test('Reactions list display', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await profilePage.automation.click();

            await expect(page.getByText('Create schedule')).toBeVisible();

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
                description: 'https://app.clickup.com/t/8678rvbzg'
            });

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await profilePage.automation.click();

            await expect(page.getByText('Create schedule')).toBeVisible();

            await hubPage.automationCreateReactionButton.click();

            await expect(page.getByText('At least 1 day of the week must be selected')).toBeVisible();

            await hubPage.inputFirstField.fill('First reaction');
            await hubPage.inputSecondField.click();
            await hubPage.submitButton.click();
            await hubPage.selectFirstField.click();
            await page.getByText('Disarming',{exact:true}).click();
            await hubPage.selectSecondField.click();
            await page.getByText('Group 1',{exact:true}).click();
            await page.getByText('Mo',{exact:true}).click();
            await hubPage.saveButton.click();

            await expect(page.getByText('Time zone')).toBeVisible();
            await expect(page.getByText('First reaction')).toBeVisible();

            await  (((hubPage.entityBlock).filter({hasText:'First reaction'})).locator(hubPage.trashIcon)).click();

            await expect(page.getByText('Are you sure you want to delete reaction?')).toBeVisible();

            await hubPage.submitButton.click();

            if (await page.getByText('Error code: {{CODE}}').isVisible())
            {  await hubPage.closeWindowButton.click()}

            await expect(page.getByText('First reaction')).not.toBeVisible();

        });

        test('Delete reaction', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvcav'
            });

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await profilePage.automation.click();

            await expect(page.getByText('Create schedule')).toBeVisible();

            await hubPage.automationCreateReactionButton.click();

            await expect(page.getByText('At least 1 day of the week must be selected')).toBeVisible();

            await hubPage.inputFirstField.fill('First reaction');
            await hubPage.inputSecondField.click();
            await hubPage.submitButton.click();
            await hubPage.selectFirstField.click();
            await page.getByText('Disarming',{exact:true}).click();
            await hubPage.selectSecondField.click();
            await page.getByText('Group 1',{exact:true}).click();
            await page.getByText('Mo',{exact:true}).click();
            await hubPage.saveButton.click();

            await expect(page.getByText('Time zone')).toBeVisible();
            await expect(page.getByText('First reaction')).toBeVisible();

            await  (((hubPage.entityBlock).filter({hasText:'First reaction'})).locator(hubPage.trashIcon)).click();

            await expect(page.getByText('Are you sure you want to delete reaction?')).toBeVisible();

            await hubPage.submitButton.click();

            if (await page.getByText('Error code: {{CODE}}').isVisible())
            {  await hubPage.closeWindowButton.click()}

            await expect(page.getByText('First reaction')).not.toBeVisible();
        });

        test('Edit reaction', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvcav'
            });

            await profilePage.panels.click();
            await profilePage.firstHub.click();
            if (await page.getByText('Update firmware version').isVisible())
            {  await hubPage.closeWindowButton.click()}
            await profilePage.automation.click();

            await expect(page.getByText('Create schedule')).toBeVisible();

            await hubPage.automationCreateReactionButton.click();

            await expect(page.getByText('At least 1 day of the week must be selected')).toBeVisible();

            await hubPage.inputFirstField.fill('First reaction');
            await hubPage.inputSecondField.click();
            await hubPage.submitButton.click();
            await hubPage.selectFirstField.click();
            await page.getByText('Disarming',{exact:true}).click();
            await hubPage.selectSecondField.click();
            await page.getByText('Group 1',{exact:true}).click();
            await page.getByText('Mo',{exact:true}).click();
            await hubPage.saveButton.click();

            await expect(page.getByText('Time zone')).toBeVisible();
            await expect(page.getByText('First reaction')).toBeVisible();

            await page.getByText('First reaction').click();

            await expect(page.getByText('At least 1 day of the week must be selected')).toBeVisible();

            await hubPage.inputFirstField.fill('Second reaction');
            await hubPage.saveButton.click();

            await expect(page.getByText('Time zone')).toBeVisible();
            await expect(page.getByText('Second reaction')).toBeVisible();

            await  (((hubPage.entityBlock).filter({hasText:'Second reaction'})).locator(hubPage.trashIcon)).click();

            await expect(page.getByText('Are you sure you want to delete reaction?')).toBeVisible();

            await hubPage.submitButton.click();

            if (await page.getByText('Error code: {{CODE}}').isVisible())
            {  await hubPage.closeWindowButton.click()}

            await expect(page.getByText('Second reaction')).not.toBeVisible();
        });

    });

    test('Time zone editing', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8678rvcav'
        });

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await profilePage.automation.click();

        await expect(page.getByText('Create schedule')).toBeVisible();

        await page.getByText('Time zone').click();

        await expect(page.getByText('Select controller time zone')).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText('Kabul (+04:30 UTC)').click();
        await hubPage.submitButton.click();

        await expect(page.getByText('Create schedule')).toBeVisible();
        await expect(page.getByText('Kabul (+04:30 UTC)')).toBeVisible();

        await page.getByText('Time zone').click();

        await expect(page.getByText('Select controller time zone')).toBeVisible();

        await hubPage.inputField.click();
        await page.getByText('Kyiv (+03:00 UTC) ').click();
        await hubPage.submitButton.click();

        await expect(page.getByText('Create schedule')).toBeVisible();
        await expect(page.getByText('Kyiv (+03:00 UTC) ')).toBeVisible();
    });

});