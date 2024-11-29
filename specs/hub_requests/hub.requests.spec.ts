import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {
    CITY_MADRID,
    COMPANY_FIRST,
    COMPANY_PHONE_OLD,
    TEXT_COUNTRY_SELECTION,
    TEXT_NO, TEXT_PANEL_CONTROL_TRANSFER, TEXT_PUT_ON_SERVICE,
    TEXT_REQUEST_WARNING_MESSAGE, TEXT_REVERT_APPLICATION, TEXT_REVOKE_SERVICE_REQUEST,
    TEXT_SERVER_SETTINGS, TEXT_TRANSFER_REQUEST_SENT,
    TITLE_UPDATE_FIRMWARE_VERSION,
    URL_LOGIN,
    URL_PROFILE_PANELS
} from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);
    });

    test.skip('New request', { tag: ['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678rb7xp"
        });

        await hubPage.panels.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.firstHub.click();
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}

        await hubPage.requests.click();
        if (await (page.getByText(TEXT_REQUEST_WARNING_MESSAGE)).isVisible()) {  await hubPage.system.click()}
        else if (await page.getByText(TEXT_COUNTRY_SELECTION).isVisible()){
        await hubPage.countryUkraine.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.saveButton.click();
        await expect(page.getByText(TEXT_SERVER_SETTINGS)).toBeVisible();
        await page.getByText((COMPANY_FIRST)).click();
        await expect(page.getByText(TEXT_PANEL_CONTROL_TRANSFER)).toBeVisible();
        await hubPage.requestsCreateApplicationButton.click();
        await page.waitForLoadState('domcontentloaded');
        await hubPage.inputFirstField.fill(COMPANY_PHONE_OLD);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.inputSecondField.fill(CITY_MADRID);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.inputThirdField.fill(TEXT_NO);
        await page.waitForLoadState('domcontentloaded');
        await hubPage.requestsCreateApplicationButton.click();

        await expect(page.getByText(TEXT_TRANSFER_REQUEST_SENT)).toBeVisible();
        await hubPage.closeButton.click();

        await expect(page.getByText(TEXT_PUT_ON_SERVICE)).toBeVisible();
        await page.getByText(TEXT_REVERT_APPLICATION).click();

        await expect(page.getByText(TEXT_REVOKE_SERVICE_REQUEST)).toBeVisible();
        await hubPage.submitButton.click();

        await expect(page.getByText(TEXT_SERVER_SETTINGS)).toBeVisible({timeout:25000});
        }
    });

});