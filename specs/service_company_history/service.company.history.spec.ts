import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { SERVICE_COMPANY_1 } from "../../utils/user_data";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import {
    HUB_SERIAL_NUMBER_TRUE_FIFTH, SEVENTEEN, TEN, TEXT_DAY_SECOND, TEXT_DAY_THIRD, TEXT_OCTOBER_2024,
    TEXT_SAVE_IN_XLS, TEXT_USER_LOGGED_IN, TITLE_HISTORY_FOR_ALL_PANELS, URL_LOGIN, URL_PANELS,
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company page tests',{ tag: ['@history']}, () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;
    let superAdminPage: SuperAdminPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);
        superAdminPage = new SuperAdminPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(SERVICE_COMPANY_1);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test('Checking UI elements of the history page under SERVICE_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: ''
        });

        await hubPage.history.click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)})).toBeVisible();
        await expect(page.getByText(TEXT_SAVE_IN_XLS)).toBeVisible();

        await companyPage.companySearchByHubField.isVisible();
        await companyPage.companySearchByEngineerField.isVisible();
        await superAdminPage.historyDate.nth(0).isVisible();
        await superAdminPage.historyDate.nth(1).isVisible();
        await hubPage.historyAlarmCheckBox.isVisible();
        await hubPage.historyTroublesCheckBox.isVisible();
        await hubPage.historyArmsCheckBox.isVisible();
        await hubPage.historyActionsCheckBox.isVisible();

    });

    test.describe('History under SERVICE_COMPANY_ADMIN role', () => {

        test('History display under SERVICE_COMPANY_ADMIN role', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8696ybbay'
            });

            await hubPage.history.click();

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)})).toBeVisible();

            await page.waitForTimeout(2000);

            for (const event of await hubPage.historyEvent.all())
            { await expect(event).toBeVisible();}
        });

        test('History filtration by hub under SERVICE_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8696ybbx9'
            });

            await hubPage.history.click();

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)})).toBeVisible();

            await companyPage.companySearchByHubField.fill(HUB_SERIAL_NUMBER_TRUE_FIFTH);
            await page.waitForTimeout(2000);
            await page.getByText(TITLE_HISTORY_FOR_ALL_PANELS).isVisible();

            await superAdminPage.historyDate.nth(0).click();
            await page.waitForLoadState('domcontentloaded');
            while (await page.getByText(TEXT_OCTOBER_2024).isHidden()) {await superAdminPage.historyChangeMonth.nth(0).click();
                await page.waitForTimeout(2000);}
            await superAdminPage.historyCalendarDayEntity.filter({hasText:TEN}).click();
            await page.waitForTimeout(2000);

            await companyPage.companySearchByHubField.fill(HUB_SERIAL_NUMBER_TRUE_FIFTH);
            await page.waitForTimeout(2000);
            await page.getByText(TITLE_HISTORY_FOR_ALL_PANELS).isVisible();

            for (const event of await hubPage.historyEvent.all())
            { await expect((event.filter({hasText:HUB_SERIAL_NUMBER_TRUE_FIFTH}))).toBeVisible();}

        });

        test('History filtration by date under SERVICE_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8696ybe1k'
            });

            await hubPage.history.click();

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();


            await superAdminPage.historyDate.nth(0).click();
            await page.waitForLoadState('domcontentloaded');
            while (await page.getByText(TEXT_OCTOBER_2024).isHidden()) {await superAdminPage.historyChangeMonth.nth(0).click();
                await page.waitForTimeout(2000);}
            await superAdminPage.historyCalendarDayEntity.filter({hasText:SEVENTEEN}).click();
            await page.waitForTimeout(2000);
            await superAdminPage.historyDate.nth(1).click();
            await page.waitForLoadState('domcontentloaded');
            while (await page.getByText(TEXT_OCTOBER_2024).isHidden()) {await superAdminPage.historyChangeMonth.nth(0).click();
                await page.waitForTimeout(2000);}
            await superAdminPage.historyCalendarDayEntity.filter({hasText:SEVENTEEN}).click();
            await page.waitForTimeout(3000);

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();
            await expect(page.getByText(TEXT_DAY_THIRD)).toBeVisible({ timeout: 10000 });
            await expect(page.getByText(TEXT_DAY_SECOND)).not.toBeVisible();

        });

        test('History filtration by event under SERVICE_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8696ybd0p'
            });

            await hubPage.history.click();

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();

            await superAdminPage.historyDate.nth(0).click();

            while (await page.getByText(TEXT_OCTOBER_2024).isHidden()) {await superAdminPage.historyChangeMonth.nth(0).click();
                await page.waitForTimeout(2000);}
            await superAdminPage.historyCalendarDayEntity.filter({hasText:TEN}).click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TEXT_USER_LOGGED_IN).first()).toBeVisible({ timeout: 10000 });

            await hubPage.historyActionsCheckBox.click();

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();

            await page.waitForTimeout(2000);

            await expect(page.getByText(TEXT_USER_LOGGED_IN).first()).not.toBeVisible();
        });

        test.skip('Download history file under SERVICE_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8696ybf5p'
            });

            await hubPage.history.click();

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)})).toBeVisible();
            await expect(page.getByText(TEXT_SAVE_IN_XLS)).toBeVisible();

            const [download]=await
                Promise.all([page.waitForEvent('download'), hubPage.saveInXLSButton.click()] );

            await download.saveAs(download.suggestedFilename());
        });

    });

});