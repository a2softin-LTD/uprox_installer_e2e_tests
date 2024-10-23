import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import {
    COMPANY_FIRST,
    COMPANY_FOURTH, COUNTRY_AUSTRALIA, TEXT_COUNT_OF_DEVICES_IN_COUNTRY,
    TEXT_SAVE_IN_XLS,
    TEXT_TOTAL_NUMBER_OF_DEVICES,
    TEXT_TOTAL_NUMBER_OF_RADIO_DEVICES,
    TITLE_COMPANIES_,
    TITLE_PANELS,
    TITLE_RADIO_DEVICES,
    TITLE_STATISTICS,
    TITLE_STATISTICS_COMPANIES,
    TITLE_STATISTICS_PANELS,
    TITLE_STATISTICS_RADIO_DEVICES,
    TITLE_TECHNICAL_SUPPORT
} from "../../utils/constants";

test.describe('SuperAdmin page tests', { tag: ['@smoke', '@stable', '@superadmin']},() => {

    let loginPage: LoginPage;
    let superAdminPage: SuperAdminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        superAdminPage = new SuperAdminPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });
    test('Checking UI elements of the statistics page', { tag: ['@smoke']  },async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await superAdminPage.statistics.click();

        await expect(superAdminPage.pageTitle.first().filter({hasText:TITLE_STATISTICS})).toBeVisible();
        await expect(superAdminPage.pageTitle.last().filter({hasText:TITLE_STATISTICS_PANELS})).toBeVisible();
        await expect(superAdminPage.saveInXLSButton).toBeVisible();
        await expect(page.getByText(TITLE_PANELS, {exact:true})).toBeVisible();
        await expect(page.getByText(TITLE_RADIO_DEVICES)).toBeVisible();
        await expect(page.getByText(TITLE_COMPANIES_).nth(1)).toBeVisible();
        await expect(page.getByText(TEXT_TOTAL_NUMBER_OF_DEVICES)).toBeVisible();

    });

    test('Statistics panel under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694p41mv'
            });

        await superAdminPage.statistics.click();

        await expect(superAdminPage.pageTitle.first().filter({hasText:TITLE_STATISTICS})).toBeVisible();

        await page.getByText(TITLE_PANELS, {exact:true}).click();

        await expect(superAdminPage.pageTitle.nth(1).filter({hasText:TITLE_STATISTICS_PANELS})).toBeVisible();
        await expect(page.getByText(TEXT_TOTAL_NUMBER_OF_DEVICES)).toBeVisible();

        for (const entity of await superAdminPage.statisticsEntity.all())
        { await expect(entity).toBeVisible();}

        await page.getByText(TITLE_RADIO_DEVICES, {exact:true}).click();

        await expect(superAdminPage.pageTitle.nth(1).filter({hasText:TITLE_STATISTICS_RADIO_DEVICES})).toBeVisible();
        await expect(page.getByText(TEXT_TOTAL_NUMBER_OF_RADIO_DEVICES)).toBeVisible()

        for (const entity of await superAdminPage.statisticsEntity.all())
        { await expect(entity).toBeVisible();}

        await page.getByText(TITLE_COMPANIES_).nth(1).click();

        await expect(superAdminPage.pageTitle.nth(1).filter({hasText:TITLE_STATISTICS_COMPANIES})).toBeVisible();
        await expect(page.getByText(TEXT_COUNT_OF_DEVICES_IN_COUNTRY)).toBeVisible();

        for (const entity of await superAdminPage.statisticsEntity.all())
        { await expect(entity).toBeVisible();}

        await superAdminPage.statisticsFilter.click();
        await page.getByText(COUNTRY_AUSTRALIA).click();

        await expect(page.getByText(COMPANY_FOURTH)).toBeVisible();
        await expect(page.getByText(COMPANY_FIRST)).not.toBeVisible();
    });

    test('Download statistics file under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694p41np'
            });

            await expect(page.getByText(TITLE_TECHNICAL_SUPPORT)).toBeVisible();

            await superAdminPage.statistics.click();

            await expect(superAdminPage.pageTitle.filter({hasText:TITLE_STATISTICS_PANELS})).toBeVisible();

            await expect(page.getByText(TEXT_SAVE_IN_XLS)).toBeVisible();

            const downloadPromise = page.waitForEvent('download');
            await superAdminPage.saveInXLSButton.click();
            const download = await downloadPromise;
            await download.saveAs(download.suggestedFilename());
    });

});