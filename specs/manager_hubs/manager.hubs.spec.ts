import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import {MANAGER_1, MIXED, SERVICE_COMPANY_1} from "../../utils/user_data";
import {
    TEXT_BY_ACCOUNT,
    TEXT_BY_NAME,
    TEXT_PANEL_STATES,
    TEXT_BY_SERIAL_NUMBER,
    TEXT_NUMBER_OF_DEVICES_IM_COMPANY,
    TEXT_SAVE_IN_XLS,
    TEXT_VIEW,
    URL_LOGIN,
    URL_PANELS,
    HUB_ACCOUNT_NAME_SECOND,
    HUB_NAME_FIFTH,
    HUB_SERIAL_NUMBER_TRUE_SEVENTH,
    TITLE_ALL_PANELS,
    PANEL_STATE_OUTDATED_FIRMWARE_VERSION,
    TEXT_ALL_PANELS,
    ROLE_DEALER,
    TEXT_EDIT_ADDITIONAL_INFO,
    HUB_SERIAL_NUMBER_TRUE_EIGHT,
    HUB_NAME_SIX,
    URL_PROFILE_PANELS,
    HUB_SERIAL_NUMBER_TRUE_NINTH, HUB_SERIAL_NUMBER_TRUE_FIRST, HUB_NAME_SEVENTH, HUB_ACCOUNT_NAME_THIRD,
} from "../../utils/constants";
import {CompanyPage} from "../../pages/company/CompanyPage";

test.describe('Hub Page tests', { tag: ['@stable', '@hub']}, () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(MANAGER_1);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);
        await hubPage.panels.click();
    });
    test('Checking UI elements on the hub page under MANAGER role', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await page.waitForTimeout(10000);

        await expect(hubPage.pageTitle.filter({has: page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)})).toBeVisible();
        await expect(hubPage.saveInXLSButton).toBeVisible();
        await expect(companyPage.inputFirstField).toBeVisible();
        await expect((page.getByText(TEXT_ALL_PANELS).first())).toBeVisible();
        await expect(page.getByText(TEXT_BY_SERIAL_NUMBER)).toBeVisible();
        await expect(page.getByText(TEXT_BY_ACCOUNT)).toBeVisible();
        await expect(page.getByText(TEXT_BY_NAME)).toBeVisible();
        await expect(page.getByText(TEXT_PANEL_STATES)).toBeVisible();
        await expect(page.getByText(TEXT_VIEW)).toBeVisible();
        await expect((hubPage.hubListView).nth(0)).toBeVisible();
        await expect((hubPage.hubListView).nth(1)).toBeVisible();
        await expect((hubPage.hubListView).nth(2)).toBeVisible();
    });

    test('Hubs list under MANAGER role: compact view', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(hubPage.pageTitle.filter({has: page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)})).toBeVisible();

        await ((hubPage.hubListView).nth(1)).click();

        await page.waitForTimeout(2000);

        for (const hubs of await hubPage.entityBlock.all())
            await expect(hubs).toBeVisible();

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.hubEngineerIcon})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.informationIcon})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.trashIcon})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.hubCorpNameAccountInfo})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.hubCorpNumberConnectionInfo})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({hasText:TEXT_EDIT_ADDITIONAL_INFO})).not.toBeVisible();}

    });

    test('Hubs list under MANAGER role: short view', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(hubPage.pageTitle.filter({has: page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)})).toBeVisible();

        await ((hubPage.hubListView).nth(0)).click();

        await page.waitForTimeout(2000);

        for (const hubs of await hubPage.entityBlock.all())
            await expect(hubs).toBeVisible();

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.hubEngineerIcon})).not.toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.informationIcon})).not.toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.trashIcon})).not.toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.hubCorpNameAccountInfo})).not.toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.hubCorpNumberConnectionInfo})).not.toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({hasText:TEXT_EDIT_ADDITIONAL_INFO})).not.toBeVisible();}
    });

    test('Hubs list under MANAGER role: detail view', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(hubPage.pageTitle.filter({has: page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)})).toBeVisible();

        await ((hubPage.hubListView).nth(2)).click();

        await page.waitForTimeout(2000);

        for (const hubs of await hubPage.entityBlock.all())
            await expect(hubs).toBeVisible();

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.hubEngineerIcon})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.trashIcon})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.hubCorpNameAccountInfo})).not.toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({has: hubPage.hubCorpNumberConnectionInfo})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all()) {
            await expect(hub.filter({hasText:TEXT_EDIT_ADDITIONAL_INFO})).toBeVisible();}

    });

    test.describe('Hub search under SERVICE_COMPANY_ADMIN role', () => {

        test('Hub search by serial number under MANAGER role', {tag: '@smoke'}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.getByText(TEXT_BY_SERIAL_NUMBER).click();
            await companyPage.inputFirstField.fill(HUB_SERIAL_NUMBER_TRUE_FIRST);

            await page.waitForTimeout(2000);

            await expect(companyPage.entityBlock.filter({hasText: HUB_SERIAL_NUMBER_TRUE_FIRST})).not.toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(0);

            await page.getByText(TEXT_BY_SERIAL_NUMBER).click();
            await companyPage.inputFirstField.fill(HUB_SERIAL_NUMBER_TRUE_NINTH);

            await page.waitForTimeout(2000);

            await expect(companyPage.entityBlock.filter({hasText: HUB_SERIAL_NUMBER_TRUE_NINTH})).toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(1);
        });

        test('Hub search by account under MANAGER role', {tag: '@smoke'}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.getByText(TEXT_BY_ACCOUNT).click();
            await companyPage.inputFirstField.fill(HUB_ACCOUNT_NAME_SECOND);

            await page.waitForTimeout(2000);

            await expect(companyPage.entityBlock.filter({hasText: HUB_ACCOUNT_NAME_SECOND})).not.toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(0);

            await page.getByText(TEXT_BY_ACCOUNT).click();
            await companyPage.inputFirstField.fill(HUB_ACCOUNT_NAME_THIRD);

            await page.waitForTimeout(2000);

            await expect(companyPage.entityBlock.filter({hasText: HUB_ACCOUNT_NAME_THIRD})).toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(1);
        });

        test('Hub search by name under MANAGER role', {tag: '@smoke'}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.getByText(TEXT_BY_NAME).click();
            await companyPage.inputFirstField.fill(HUB_NAME_SEVENTH);

            await page.waitForTimeout(2000);

            await expect(companyPage.entityBlock.filter({hasText: HUB_NAME_SEVENTH})).toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(1);

            await page.getByText(TEXT_BY_NAME).click();
            await companyPage.inputFirstField.fill(HUB_NAME_SIX);

            await page.waitForTimeout(2000);

            await expect(companyPage.entityBlock.filter({hasText: HUB_NAME_SIX})).not.toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(0);
        });

        test('Hub search by panel state under MANAGER role', {tag: '@smoke'}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.getByText(TITLE_ALL_PANELS).first().click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(PANEL_STATE_OUTDATED_FIRMWARE_VERSION).first().click();

            await page.waitForTimeout(2000);

            for (const hub of await companyPage.entityBlock.all()) {
                await expect(hub.filter({has: companyPage.updateFirmwareIcon})).toBeVisible();}
        });

    });

    test.skip('Downloading hubs  list under MANAGER role', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

        await page.waitForTimeout(2000);

        const downloadPromise = page.waitForEvent('download');

        await page.waitForTimeout(2000);

        await hubPage.saveInXLSButton.click(

        );

        await expect(page.getByText(TEXT_SAVE_IN_XLS)).toBeVisible();

        await page.getByText(TEXT_SAVE_IN_XLS).click();
        const download = await downloadPromise;
        await download.saveAs(download.suggestedFilename());
    });

});