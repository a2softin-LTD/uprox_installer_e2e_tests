import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { SUPER_ADMIN } from "../../utils/user_data";

test.describe('Utils under SUPER_ADMIN role', { tag: ['@stable']  }, () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });

    test('Utils panel under SUPER_ADMIN role', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await profilePage.utils.click();

        await expect(profilePage.addCountryButton).toBeVisible();

        await expect(profilePage.utilsAddEmailToWhitelistButton).toBeVisible();
        await expect(profilePage.utilsExtractVersionButton).toBeVisible();
        await expect(page.getByText('Account Server')).toBeVisible();
        await expect(page.getByText('Country control')).toBeVisible();
        await expect(page.getByText('Captcha white list')).toBeVisible();
        await expect(page.getByText('Panel Server Node: devpanel-1.maks.systems')).toBeVisible();
        await expect(page.getByText('Panel Server Node: devpanel-2.maks.systems')).toBeVisible();
        await expect(page.getByText('Panel Server Node: devpanel-3.maks.systems')).toBeVisible();

        await (page.getByText('Account Server')).click();

        await expect(page.getByText('Clearing the cache on the Account server')).toBeVisible();
        await expect(profilePage.clearButton).toBeVisible();

    });

    test('Clearing the cache on the Account server', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8678rvbzg'
        });

        await profilePage.utils.click();

        await (page.getByText('Account Server')).click();

        await expect(page.getByText('Clearing the cache on the Account server')).toBeVisible();
        await profilePage.clearButton.click();

        await expect(page.getByText('Are you sure you want to clear the cache on Account server?')).toBeVisible();
        await profilePage.clearButton.click();
        await expect(page.getByText('Changes saved successfully')).toBeVisible();
    });

    test.describe('Captcha whitelist', () => {
        test('Captcha whitelist: email searching', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const email: string = "zajac@ukr.net";

            await profilePage.utils.click();

            await (page.getByText('Captcha white list')).click();

            await expect(page.getByText('Search by email')).toBeVisible();
            await profilePage.inputFirstField.fill(email);

            await expect(profilePage.utilsWhitelistEmailBlock.filter({hasText:email})).toBeVisible();
            await expect(profilePage.utilsWhitelistEmailBlock).toHaveCount(1);
        });

        test('Captcha whitelist: add email', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const email: string = "d.pinchuk@itvsystems.com.ua";

            await profilePage.utils.click();

            await (page.getByText('Captcha white list')).click();

            await expect(page.getByText('Search by email')).toBeVisible();
            await profilePage.utilsAddEmailToWhitelistButton.click();
            await expect(page.getByText('Add user to captcha white list')).toBeVisible();
            await profilePage.inputField.fill(email);
            await profilePage.saveButton.click();

            await expect(profilePage.utilsWhitelistEmailBlock.filter({hasText:email})).toBeVisible();

            await (profilePage.utilsWhitelistEmailBlock.filter({hasText: email})).locator(profilePage.trashIcon).click();
            await expect(page.getByText('Remove user from whitelist?')).toBeVisible();
            await profilePage.submitButton.click();

            await expect(page.getByText('Search by email')).toBeVisible();
            await expect(profilePage.utilsWhitelistEmailBlock.filter({hasText:email})).not.toBeVisible();
        });

        test('Captcha whitelist: delete email', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const email: string = "d.pinchuk@itvsystems.com.ua";

            await profilePage.utils.click();

            await (page.getByText('Captcha white list')).click();

            await expect(page.getByText('Search by email')).toBeVisible();
            await profilePage.utilsAddEmailToWhitelistButton.click();
            await expect(page.getByText('Add user to captcha white list')).toBeVisible();
            await profilePage.inputFirstField.fill(email);
            await profilePage.saveButton.click();

            await expect(profilePage.utilsWhitelistEmailBlock.filter({hasText:email})).toBeVisible();

            await (profilePage.utilsWhitelistEmailBlock.filter({hasText: email})).locator(profilePage.trashIcon).click();
            await expect(page.getByText('Remove user from whitelist?')).toBeVisible();
            await profilePage.submitButton.click();

            await expect(page.getByText('Search by email')).toBeVisible();
            await expect(profilePage.utilsWhitelistEmailBlock.filter({hasText:email})).not.toBeVisible();
        });

    });

    test.describe('Country control', () => {

        test('Country control: add country', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const countryCode: string = "DD";
            const countryUK: string = "ddr";
            const countryEN: string = "dddr";
            const countryRU: string = "ddddr";

            await profilePage.utils.click();

            await (page.getByText('Country control')).click();

            await expect(page.getByText('List of available countries:')).toBeVisible();

            await profilePage.addCountryButton.click();

            await expect(page.getByText('Create country')).toBeVisible();

            await profilePage.inputFirstField.fill(countryCode);
            await profilePage.inputSecondField.fill(countryUK);
            await profilePage.inputThirdField.fill(countryEN);
            await profilePage.inputFourthField.fill(countryRU);
            await profilePage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText('Country control')).toBeVisible();

            await (page.getByText('Country control')).click();

            await expect(page.getByText('List of available countries:')).toBeVisible();
            await expect(profilePage.rowBlock.filter({hasText:countryCode})).toBeVisible();

            await (profilePage.rowBlock.filter({hasText: countryCode})).locator(profilePage.trashIcon).click();

            await expect(page.getByText('Delete country', {exact:true})).toBeVisible();

            await profilePage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText('Country control')).toBeVisible();

            await (page.getByText('Country control')).click();

            await expect(page.getByText('List of available countries:')).toBeVisible();
            await expect(profilePage.rowBlock.filter({hasText:countryCode})).not.toBeVisible();
        });

        test('Country control: delete country', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const countryCode: string = "DD";
            const countryUK: string = "ddr";
            const countryEN: string = "dddr";
            const countryRU: string = "ddddr";

            await profilePage.utils.click();

            await (page.getByText('Country control')).click();

            await expect(page.getByText('List of available countries:')).toBeVisible();

            await profilePage.addCountryButton.click();

            await expect(page.getByText('Create country')).toBeVisible();

            await profilePage.inputFirstField.fill(countryCode);
            await profilePage.inputSecondField.fill(countryUK);
            await profilePage.inputThirdField.fill(countryEN);
            await profilePage.inputFourthField.fill(countryRU);
            await profilePage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText('Country control')).toBeVisible();

            await (page.getByText('Country control')).click();

            await expect(page.getByText('List of available countries:')).toBeVisible();
            await expect(profilePage.rowBlock.filter({hasText:countryCode})).toBeVisible();

            await (profilePage.rowBlock.filter({hasText: countryCode})).locator(profilePage.trashIcon).click();

            await expect(page.getByText('Delete country', {exact:true})).toBeVisible();

            await profilePage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText('Country control')).toBeVisible();

            await (page.getByText('Country control')).click();

            await expect(page.getByText('List of available countries:')).toBeVisible();
            await expect(profilePage.rowBlock.filter({hasText:countryCode})).not.toBeVisible();
        });

        test.skip('Country control: country editing', { tag: ['@smoke','@hub']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8678rvbyg'
            });

            const countryCode: string = "DD";
            const countryUK: string = "ddr";
            const countryEN: string = "dddr";
            const countryRU: string = "ddddr";

            const countryUKNew: string = "bbr";
            const countryENNew: string = "bbbr";
            const countryRUNew: string = "bbbbr";

            await profilePage.utils.click();

            await (page.getByText('Country control')).click();

            await expect(page.getByText('List of available countries:')).toBeVisible();

            await profilePage.addCountryButton.click();

            await expect(page.getByText('Create country')).toBeVisible();

            await profilePage.inputFirstField.fill(countryCode);
            await profilePage.inputSecondField.fill(countryUK);
            await profilePage.inputThirdField.fill(countryEN);
            await profilePage.inputFourthField.fill(countryRU);
            await profilePage.submitButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText('Country control')).toBeVisible();

            await (page.getByText('Country control')).click();

            await expect(page.getByText('List of available countries:')).toBeVisible();
            await expect(profilePage.rowBlock.filter({hasText:countryCode})).toBeVisible();

            await page.waitForTimeout(3000);
           // await (profilePage.rowBlock.filter({hasText:countryCode})).locator(profilePage.editIcon).click();
            await profilePage.editIcon.last().click();

            await expect(page.getByText('Edit country')).toBeVisible();

            // await profilePage.inputSecondField.fill(countryUKNew);
            // await profilePage.inputThirdField.fill(countryENNew);
            // await profilePage.inputFourthField.fill(countryRUNew);
            // await profilePage.submitButton.click();
            // await page.waitForTimeout(2000);
            // page.reload();
            // await page.waitForTimeout(2000);
            //
            // await expect(page.getByText('Country control')).toBeVisible();
            //
            // await (page.getByText('Country control')).click();
            //
            // await expect(page.getByText('List of available countries:')).toBeVisible();
            // await expect(profilePage.rowBlock.filter({hasText:countryUKNew})).toBeVisible();
            // await expect(profilePage.rowBlock.filter({hasText:countryRUNew})).toBeVisible();
            // await expect(profilePage.rowBlock.filter({hasText:countryENNew})).toBeVisible();
            //
            // await (profilePage.rowBlock.filter({hasText: countryCode})).locator(profilePage.trashIcon).click();
            //
            // await expect(page.getByText('Delete country', {exact:true})).toBeVisible();
            //
            // await profilePage.submitButton.click();
            // await page.waitForTimeout(2000);
            // page.reload();
            // await page.waitForTimeout(2000);
            //
            // await expect(page.getByText('Country control')).toBeVisible();
            //
            // await (page.getByText('Country control')).click();
            //
            // await expect(page.getByText('List of available countries:')).toBeVisible();
            // await expect(profilePage.rowBlock.filter({hasText:countryCode})).not.toBeVisible();
        });

    });

});