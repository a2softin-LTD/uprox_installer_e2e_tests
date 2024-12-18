import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { DILER_1 } from "../../utils/user_data";
import {
    COMPANY_SEVEN,
    COMPANY_SIX,
    HUB_ACCOUNT_NAME_FIRST, HUB_NAME_FOURTH,
    HUB_SERIAL_NUMBER_TRUE_FOURTH, TEXT_BY_ACCOUNT, TEXT_BY_NAME, TEXT_BY_SERIAL_NUMBER,
    TEXT_NUMBER_OF_DEVICES_IM_COMPANY, TEXT_SAVE_IN_XLS,
    TITLE_COMPANIES, URL_DEALER_COMPANIES, URL_LOGIN
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company Page tests',{ tag: ['@smoke', '@stable']},() => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(DILER_1);
        await expect(page).toHaveURL(URL_DEALER_COMPANIES);
    });

    test('Hubs list under DEALER role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8695e8e1a"
        });

        await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();
        await expect(page.getByText(COMPANY_SIX)).toBeVisible();

        await page.getByText(COMPANY_SIX).click();

        await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

        await page.waitForTimeout(2000);

        for (const hub of await companyPage.entityBlock.all())
        { await expect(hub).toBeVisible();}

        for (const hub of await companyPage.entityBlock.all())
        { await expect(hub.filter({has: companyPage.entityText})).toBeVisible();}

    });

    test.describe('Hub search under DEALER role',() => {

        test('Hub search by serial number under DEALER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695e8trb"
            });

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();
            await expect(page.getByText(COMPANY_SIX)).toBeVisible();

            await page.getByText(COMPANY_SIX).click();

            await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.getByText(TEXT_BY_SERIAL_NUMBER).click();
            await companyPage.searchField.fill(HUB_SERIAL_NUMBER_TRUE_FOURTH);

            await expect(companyPage.entityBlock.filter({hasText:HUB_SERIAL_NUMBER_TRUE_FOURTH})).toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(1);
        });

        test('Hub search by account under DEALER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695e9b9n"
            });

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();
            await expect(page.getByText(COMPANY_SEVEN)).toBeVisible();

            await page.getByText(COMPANY_SEVEN).click();

            await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.getByText(TEXT_BY_ACCOUNT).click();
            await companyPage.searchField.fill(HUB_ACCOUNT_NAME_FIRST);

            await page.waitForTimeout(2000);

            await expect(companyPage.entityBlock.filter({hasText:HUB_ACCOUNT_NAME_FIRST})).toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(1);
        });

        test('Hub search by name under DEALER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695e9b7n"
            });

            await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();
            await expect(page.getByText(COMPANY_SIX)).toBeVisible();

            await page.getByText(COMPANY_SIX).click();

            await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.getByText(TEXT_BY_NAME).click();
            await companyPage.searchField.fill(HUB_NAME_FOURTH);

            await expect(companyPage.entityBlock.filter({hasText:HUB_NAME_FOURTH})).toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(1);
        });

    });

    test('Downloading hubs list under DEALER role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8695e9ff0"
        });

        await expect(page.getByText(TITLE_COMPANIES)).toBeVisible();
        await expect(page.getByText(COMPANY_SIX)).toBeVisible();

        await page.getByText(COMPANY_SIX).click();

        await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

        const downloadPromise = page.waitForEvent('download');
        await companyPage.saveInXLSButton.click();

        await expect(page.getByText(TEXT_SAVE_IN_XLS)).toBeVisible();

        await page.getByText(TEXT_SAVE_IN_XLS).click();
        const download = await downloadPromise;
        await download.saveAs(download.suggestedFilename());
    });

});