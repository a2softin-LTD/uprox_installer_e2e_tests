import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import {DILER_1, MIXED, MONITORING_COMPANY_1, SUPER_ADMIN} from "../../utils/user_data";
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
    HUB_SERIAL_NUMBER_TRUE_EIGHT,
    HUB_NAME_SIX,
    URL_DEALER_COMPANIES,
    TITLE_DEALERS,
    ROLE_SUPPORT_ADMIN_BIG,
    ROLE_SYS_ADMIN_BIG, ROLE_DEALER, URL_SUPPORT_SEARCH,
} from "../../utils/constants";
import {CompanyPage} from "../../pages/company/CompanyPage";
import {SuperAdminPage} from "../../pages/superAdmin/SuperAdminPage";

test.describe('Hub Page tests', { tag: ['@stable', '@hub']}, () => {

    let loginPage: LoginPage;
    let superAdminPage: SuperAdminPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        superAdminPage = new SuperAdminPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL(URL_SUPPORT_SEARCH);

        await superAdminPage.companies.click();
        await page.waitForLoadState('domcontentloaded');
        await superAdminPage.dealers.click();
    });
    test('Checking UI elements on the dealers page under SUPER_ADMIN role', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_DEALERS)})).toBeVisible();
        await expect(superAdminPage.addButton).toBeVisible();
    });

    test('Dealers list under SUPER_ADMIN role', {tag: '@smoke'}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_DEALERS)})).toBeVisible();

        await page.waitForTimeout(2000);

        for (const dealer of await superAdminPage.entityBlock.all())
            await expect(dealer).toBeVisible();

        for (const dealer of await superAdminPage.entityBlock.all())
            await expect(dealer.filter({has: superAdminPage.entityText})).toBeVisible();

        for (const dealer of await superAdminPage.entityBlock.all())
        {   await expect(dealer.filter({hasText:ROLE_DEALER})).toBeVisible();
            await expect(dealer.filter({hasText:/.+@.+\..+/i})).toBeVisible();}
    });
});