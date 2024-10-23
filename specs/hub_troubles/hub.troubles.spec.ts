import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { MIXED } from "../../utils/user_data";
import {
    TEXT_NO_HUB_WITH_TROUBLES,
    TEXT_NUMBER_OF_DEVICES_IM_COMPANY,
    TITLE_SYSTEM,
    TITLE_TROUBLES,
    TITLE_UPDATE_FIRMWARE_VERSION
} from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(MIXED);
        await expect(page).toHaveURL('/panels');
    });

    test('Troubles', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694ky0zj"
        });

        await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();
        if (hubPage.hubsOnline.filter({has:hubPage.tamperOpenIcon}).first().isVisible())
        { await hubPage.hubsOnline.filter({has:hubPage.tamperOpenIcon}).first().click();

        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await expect(hubPage.pageTitle.filter({hasText:TITLE_SYSTEM})).toBeVisible();
        await hubPage.troubles.click();

        await expect(hubPage.pageTitle.filter({hasText:TITLE_TROUBLES})).toBeVisible();
        for (const device of await hubPage.entityBlock.all())
        {await expect(device.filter({has: hubPage.hubTroublesState})).toBeVisible();}}

        else {console.log(TEXT_NO_HUB_WITH_TROUBLES);}
    });

});