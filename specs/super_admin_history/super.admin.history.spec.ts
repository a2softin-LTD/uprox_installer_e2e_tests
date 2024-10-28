import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import {
    HUB_SERIAL_NUMBER_TRUE_THIRD,
    TEN,
    TEXT_ADD_USER_EMAIL,
    TEXT_ADDED_NEW_USER, TEXT_DAY_FIRST, TEXT_DAY_SECOND,
    TEXT_REMOVE_USER_EMAIL,
    TEXT_REMOVED_USER,
    TEXT_SAVE_IN_XLS, TEXT_SEPTEMBER_2024,
    TITLE_HISTORY_FOR_ALL_PANELS,
    TITLE_SYSTEM, URL_LOGIN, URL_SUPPORT_SEARCH,
    USER_EMAIL_SECOND
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('SuperAdmin page tests',{ tag: ['@smoke', '@stable', '@superadmin']}, () => {

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
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL(URL_SUPPORT_SEARCH);
    });

    test('Checking UI elements of the history page under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: ''
        });

        await hubPage.history.click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_HISTORY_FOR_ALL_PANELS)})).toBeVisible();
        await expect(page.getByText(TEXT_SAVE_IN_XLS)).toBeVisible();
        await hubPage.inputFirstField.isVisible();
        await superAdminPage.historyDate.nth(0).isVisible();
        await superAdminPage.historyDate.nth(1).isVisible();
        await hubPage.historyAlarmCheckBox.isVisible();
        await hubPage.historyTroublesCheckBox.isVisible();
        await hubPage.historyArmsCheckBox.isVisible();
        await hubPage.historyActionsCheckBox.isVisible();
        await hubPage.historyServiceCheckBox.isVisible();
    });

    test.describe('History under SUPER_ADMIN role', () => {

        test('History display under SUPER_ADMIN role', { tag: ['@smoke']  }, async ({ page }) => {
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

        test('History filtration by hub under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
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
            { await expect((event.filter({hasText:USER_EMAIL_SECOND})).or(event.filter({hasText:TITLE_SYSTEM}))).toBeVisible();}

        });

        test('History filtration by date under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
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

            await expect(page.getByText(TEXT_DAY_FIRST)).toBeVisible();
            await expect(page.getByText(TEXT_DAY_SECOND)).not.toBeVisible();

        });

        test('History filtration by event under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
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

            await expect(page.getByText(TEXT_REMOVE_USER_EMAIL).first()).toBeVisible();
            await expect(page.getByText(TEXT_ADD_USER_EMAIL).first()).toBeVisible();
            await expect(page.getByText(TEXT_REMOVED_USER).first()).toBeVisible();
            await expect(page.getByText(TEXT_ADDED_NEW_USER).first()).toBeVisible();

            await hubPage.historyAlarmCheckBox.click();
            await hubPage.historyTroublesCheckBox.click();
            await hubPage.historyArmsCheckBox.click();
            await hubPage.historyActionsCheckBox.click();

            await page.waitForTimeout(2000);

            await expect(page.getByText(TEXT_REMOVE_USER_EMAIL).first()).toBeVisible();
            await expect(page.getByText(TEXT_ADD_USER_EMAIL).first()).toBeVisible();
            await expect(page.getByText(TEXT_REMOVED_USER).first()).not.toBeVisible();
            await expect(page.getByText(TEXT_ADDED_NEW_USER).first()).not.toBeVisible();

        });

        test('Download history file under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
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