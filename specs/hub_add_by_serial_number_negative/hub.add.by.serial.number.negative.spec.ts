import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {
    COUNTRY_UKRAINE,
    HUB_SERIAL_NUMBER_FALSE_FIRST,
    HUB_SERIAL_NUMBER_FALSE_SECOND,
    TEXT_INSTALLATION_COUNTRY, TEXT_INSTALLATION_COUNTRY_FULL,
    TEXT_SERIAL_NUMBER_ALREADY_ADDED,
    TEXT_SERIAL_NUMBER_WRONG_FORMAT,
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

    test('Add hub by serial number: negative (wrong format)', { tag: ['@smoke', '@stable', '@hub']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p1vxc"
        });

        await hubPage.panels.click();
        await hubPage.addPanelButton.click();
        await hubPage.addPanelEnterSerialButton.click();
        await hubPage.inputFirstField.fill(HUB_SERIAL_NUMBER_FALSE_FIRST);
        await hubPage.nextButton.click();

        await expect(page.getByText(TEXT_SERIAL_NUMBER_WRONG_FORMAT)).toBeVisible();
    });

    test('Add hub by serial number: negative hub already added', { tag: ['@smoke', '@stable', '@hub']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p1vxc"
        });

        await hubPage.panels.click();
        await hubPage.addPanelButton.click();
        await hubPage.addPanelEnterSerialButton.click();
        await hubPage.inputFirstField.fill(HUB_SERIAL_NUMBER_FALSE_SECOND);
        await hubPage.nextButton.click();

        await expect(page.getByText(TEXT_INSTALLATION_COUNTRY_FULL)).toBeVisible();

        await page.waitForTimeout(2000);
        await hubPage.inputField.nth(0).click();
        await page.getByText(COUNTRY_UKRAINE, {exact: true}).click();

        await hubPage.nextButton.click();

        await expect(page.getByText(TEXT_SERIAL_NUMBER_ALREADY_ADDED)).toBeVisible();
    });

});