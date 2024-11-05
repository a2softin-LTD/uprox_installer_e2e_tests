import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { MIXED } from "../../utils/user_data";
import {
    HUB_ACCOUNT_NAME, HUB_NAME_SECOND,
    HUB_SERIAL_NUMBER_TRUE_FIRST, PANEL_STATE, TEXT_BY_ACCOUNT,
    TEXT_BY_NAME,
    TEXT_BY_SERIAL_NUMBER, TITLE_ALL_PANELS, URL_LOGIN, URL_PANELS
} from "../../utils/constants";
import { HubPage } from "../../pages/hub/HubPage";

test.describe('Hub Page tests',{ tag: ['@smoke', '@hub']}, () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(MIXED);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test.describe('Hub search', () => {

        test('Search by name: hub', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678p0hwg"
            });

            await hubPage.panels.click();
            await page.waitForTimeout(2000);
            await page.getByText(TEXT_BY_NAME).click();
            await hubPage.searchField.fill(HUB_NAME_SECOND);

            await expect(hubPage.entityBlock.filter({hasText:HUB_NAME_SECOND})).toBeVisible();
            await expect(hubPage.entityBlock).toHaveCount(1);
        });

        test('Search by serial number: hub', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678p0hwg"
            });

            await hubPage.panels.click();
            await page.waitForTimeout(2000);
            await page.getByText(TEXT_BY_SERIAL_NUMBER).click();
            await hubPage.searchField.fill(HUB_SERIAL_NUMBER_TRUE_FIRST);

            await expect(hubPage.entityBlock.filter({hasText:HUB_SERIAL_NUMBER_TRUE_FIRST})).toBeVisible();
            await expect(hubPage.entityBlock).toHaveCount(1);
        });

        test('Search by account: hub', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678p0hwg"
            });

            await hubPage.panels.click();
            await page.waitForTimeout(2000);
            await page.getByText(TEXT_BY_ACCOUNT).click();
            await hubPage.searchField.fill(HUB_ACCOUNT_NAME);

            await expect(hubPage.entityBlock.filter({hasText:HUB_ACCOUNT_NAME})).toBeVisible();
            await expect(hubPage.entityBlock).toHaveCount(1);
        });

        test('Search by panel state outdated firmware version: hub', { tag: '@smoke' },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678p0hwg"
            });

            await hubPage.panels.click();
            await page.waitForTimeout(2000);
            await page.getByText(TITLE_ALL_PANELS).first().click();
            await page.getByText(PANEL_STATE).first().click();
            await page.waitForTimeout(2000);

            for (const hub of await hubPage.entityBlock.all())
            {await expect(hub.filter({has:hubPage.updateFirmwareIcon})).toBeVisible();}
        });

    });

});