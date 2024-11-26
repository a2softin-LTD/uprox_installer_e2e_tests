import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {BUTTON_RESTART_PANEL, SELECTOR_THIRD, TITLE_UPDATE_FIRMWARE_VERSION, URL_HUB_DOC} from "../../utils/constants";

test.describe('Hub Page tests', { tag: ['@smoke', '@stable', '@hub']},() => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL('/profile/panels');
    });

    test('Detailed information about the hub', { tag: ['@smoke']  }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694etgat"
        });

        await hubPage.panels.click();
        await hubPage.firstHub.click();

        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}

        await page.waitForTimeout(2000);
        await hubPage.hubPanel.click();

        await expect(page.getByText(BUTTON_RESTART_PANEL)).toBeVisible();

        const [newPage]= await Promise.all([
            page.waitForEvent('popup'),
            page.locator(SELECTOR_THIRD).click()])

        //await newPage.waitForLoadState();
        await expect(newPage).toHaveURL(URL_HUB_DOC);

        await newPage.close();
    });

});