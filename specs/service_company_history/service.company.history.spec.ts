import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import {SERVICE_COMPANY_1, SUPER_ADMIN} from "../../utils/user_data";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import {
    HUB_SERIAL_NUMBER_TRUE_THIRD,
    TEN,
    TEXT_ADDED_NEW_USER, TEXT_DAY_FIRST, TEXT_DAY_SECOND,
    TEXT_REMOVE_USER_EMAIL,
    TEXT_REMOVED_USER,
    TEXT_SAVE_IN_XLS, TEXT_SEPTEMBER_2024,
    TITLE_HISTORY_FOR_ALL_PANELS,
    URL_LOGIN, URL_PANELS, URL_SUPPORT_SEARCH,

} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company page tests',{ tag: ['@smoke', '@stable']}, () => {

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

    test.skip('Checking UI elements of the history page under SERVICE_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: ''
        });

        await hubPage.history.click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)})).toBeVisible();
        await expect(page.getByText(TEXT_SAVE_IN_XLS)).toBeVisible();

        await companyPage.companySearchByHubField.isVisible();
        await superAdminPage.historyDate.nth(0).isVisible();
        await superAdminPage.historyDate.nth(1).isVisible();
        await hubPage.historyAlarmCheckBox.isVisible();
        await hubPage.historyTroublesCheckBox.isVisible();
        await hubPage.historyArmsCheckBox.isVisible();
        await hubPage.historyActionsCheckBox.isVisible();

    });

    test.describe.skip('History under SERVICE_COMPANY_ADMIN role', () => {

        test('History display under SERVICE_COMPANY_ADMIN role', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694vrfn3'
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
                description: 'https://app.clickup.com/t/8694vrfn2'
            });

            await hubPage.history.click();

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)})).toBeVisible();

            await companyPage.companySearchByHubField.fill(HUB_SERIAL_NUMBER_TRUE_THIRD);
            await page.waitForTimeout(2000);
            await page.getByText(TITLE_HISTORY_FOR_ALL_PANELS).isVisible();

            for (const event of await hubPage.historyEvent.all())
            { await expect((event.filter({hasText:HUB_SERIAL_NUMBER_TRUE_THIRD}))).toBeVisible();}

        });

        test('History filtration by date under SERVICE_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694vrfmy'
            });

            await hubPage.history.click();

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();

            await companyPage.companySearchByHubField.fill(HUB_SERIAL_NUMBER_TRUE_THIRD);
            await page.waitForTimeout(2000);
            await superAdminPage.historyDate.nth(0).click();

            while (await page.getByText(TEXT_SEPTEMBER_2024).isHidden()) {await superAdminPage.historyChangeMonth.nth(0).click();
                await page.waitForTimeout(2000);}
            await superAdminPage.historyCalendarDayEntity.filter({hasText:TEN}).click();
            await page.waitForTimeout(2000);
            await superAdminPage.historyDate.nth(1).click();
            while (await page.getByText(TEXT_SEPTEMBER_2024).isHidden()) {await superAdminPage.historyChangeMonth.nth(0).click();
                await page.waitForTimeout(2000);}
            await superAdminPage.historyCalendarDayEntity.filter({hasText:TEN}).click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();
            await expect(page.getByText(TEXT_DAY_FIRST)).toBeVisible();
            await expect(page.getByText(TEXT_DAY_SECOND)).not.toBeVisible();

        });

        test('History filtration by event under SERVICE_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694vrfn1'
            });

            await hubPage.history.click();

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();

            await companyPage.companySearchByHubField.fill(HUB_SERIAL_NUMBER_TRUE_THIRD);
            await page.waitForTimeout(2000);
            await hubPage.historyAlarmCheckBox.isVisible();
            await hubPage.historyTroublesCheckBox.isVisible();
            await hubPage.historyArmsCheckBox.isVisible();
            await hubPage.historyActionsCheckBox.isVisible();
            await hubPage.historyServiceCheckBox.isVisible();

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();
            await expect(page.getByText(TEXT_REMOVE_USER_EMAIL).first()).toBeVisible();
            await expect(page.getByText(TEXT_REMOVED_USER).first()).toBeVisible();
            await expect(page.getByText(TEXT_ADDED_NEW_USER).first()).toBeVisible();

            await hubPage.historyAlarmCheckBox.click();
            await hubPage.historyTroublesCheckBox.click();
            await hubPage.historyArmsCheckBox.click();
            await hubPage.historyActionsCheckBox.click();

            await expect(page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)).toBeVisible();

            await page.waitForTimeout(2000);

            await expect(page.getByText(TEXT_REMOVE_USER_EMAIL).first()).toBeVisible();
            await expect(page.getByText(TEXT_REMOVED_USER).first()).not.toBeVisible();
            await expect(page.getByText(TEXT_ADDED_NEW_USER).first()).not.toBeVisible();

        });

        test.skip('Download history file under SERVICE_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694vrfn0'
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