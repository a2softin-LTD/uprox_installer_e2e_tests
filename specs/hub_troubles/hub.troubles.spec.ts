import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { MIXED } from "../../utils/user_data";

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

        const hubSerialNumber: string = "00:08:9B:30:0C:60 | Wifi | GPRS | ";

        await page.getByText(hubSerialNumber).isVisible();
        await page.waitForTimeout(2000);
        await page.getByText(hubSerialNumber).click();
        await page.waitForTimeout(2000);
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await expect(hubPage.pageTitle.filter({hasText:'System'})).toBeVisible();
        await hubPage.troubles.click();

        await expect(hubPage.pageTitle.filter({hasText:'Troubles'})).toBeVisible();
        for (const device of await hubPage.entityBlock.all())
        {await expect(device.filter({has: hubPage.hubTroublesState})).toBeVisible();}
    });

});