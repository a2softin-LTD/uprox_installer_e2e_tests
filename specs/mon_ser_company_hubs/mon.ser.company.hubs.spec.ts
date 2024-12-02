import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { MIXED } from "../../utils/user_data";
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
    ROLE_DEALER, TEXT_EDIT_ADDITIONAL_INFO,
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
        await loginPage.auth(MIXED);
        await expect(page).toHaveURL(URL_PANELS);
        await hubPage.panels.click();
    });
    test('Checking UI elements on the page under MONITORING-SERVICE_COMPANY_ADMIN role', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(hubPage.pageTitle.filter({has: page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)})).toBeVisible();
        await expect(hubPage.addPanelButton).toBeVisible();
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

    test('Hubs list under MONITORING-SERVICE_COMPANY_ADMIN role: compact view', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0fth"
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

    test('Hubs list under MONITORING-SERVICE_COMPANY_ADMIN role: short view', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0fth"
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

    test('Hubs list under MONITORING-SERVICE_COMPANY_ADMIN role: detail view', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0fth"
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

    test.describe('Hub search under MONITORING-SERVICE_COMPANY_ADMIN role', () => {

        test('Hub search by serial number under MONITORING-SERVICE_COMPANY_ADMIN role', {tag: '@smoke'}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695e8trb"
            });

            await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.getByText(TEXT_BY_SERIAL_NUMBER).click();
            await companyPage.inputFirstField.fill(HUB_SERIAL_NUMBER_TRUE_SEVENTH);

            await expect(companyPage.entityBlock.filter({hasText: HUB_SERIAL_NUMBER_TRUE_SEVENTH})).toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(1);
        });

        test('Hub search by account under MONITORING-SERVICE_COMPANY_ADMIN role', {tag: '@smoke'}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695e9b9n"
            });


            await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.getByText(TEXT_BY_ACCOUNT).click();
            await companyPage.inputFirstField.fill(HUB_ACCOUNT_NAME_SECOND);

            await page.waitForTimeout(2000);

            await expect(companyPage.entityBlock.filter({hasText: HUB_ACCOUNT_NAME_SECOND})).toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(1);
        });

        test('Hub search by name under MONITORING-SERVICE_COMPANY_ADMIN role', {tag: '@smoke'}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695e9b7n"
            });

            await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.getByText(TEXT_BY_NAME).click();
            await companyPage.inputFirstField.fill(HUB_NAME_FIFTH);

            await expect(companyPage.entityBlock.filter({hasText: HUB_NAME_FIFTH})).toBeVisible();
            await expect(companyPage.entityBlock).toHaveCount(1);
        });

        test('Hub search by panel state under MONITORING-SERVICE_COMPANY_ADMIN role', {tag: '@smoke'}, async ({page}) => {
            test.info().annotations.push({
               type: "test_id",
                description: "https://app.clickup.com/t/86957f77h"
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

    test('Downloading hubs  list under MONITORING-SERVICE_COMPANY_ADMIN role', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8695e9ff0"
            });

        await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

        const downloadPromise = page.waitForEvent('download');
        await hubPage.saveInXLSButton.click();

        await expect(page.getByText(TEXT_SAVE_IN_XLS)).toBeVisible();

        await page.getByText(TEXT_SAVE_IN_XLS).click();
        const download = await downloadPromise;
        await download.saveAs(download.suggestedFilename());
    });

});
