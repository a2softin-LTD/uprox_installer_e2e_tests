import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { USER_1 } from "../../utils/user_data";
import { HubPage } from "../../pages/hub/HubPage";
import {TITLE_SYSTEM, URL_LOGIN, URL_PROFILE_PANELS} from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN)
    });

    test('List of devices and current status', { tag: ['@smoke', '@hub']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678t0fu2"
        });

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);
        await page.waitForTimeout(2000);
        await hubPage.secondHub.click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_SYSTEM)})).toBeVisible();

        await page.waitForTimeout(2000);

        for (const device of await hubPage.wirelessDeviceEntity.all())
            await expect(device).toBeVisible();

        for (const device of await hubPage.wirelessDeviceEntity.all())
        {await expect(device.filter({has: hubPage.wirelessDeviceIcon})).toBeVisible();}

        for (const device of await hubPage.wirelessDeviceEntity.all())
        {await expect(device.filter({has: hubPage.wirelessDeviceTextBlock})).toBeVisible();}

        for (const device of await hubPage.wirelessDeviceEntity.all())
        {await expect(device.filter({has: hubPage.wirelessDeviceStateIcon})).toBeVisible();}

    });
});