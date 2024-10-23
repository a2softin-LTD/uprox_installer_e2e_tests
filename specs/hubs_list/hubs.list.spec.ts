import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { MIXED, USER_1 } from "../../utils/user_data";

test.describe('Hub Page tests',{ tag: ['@smoke', '@stable', '@hub']}, () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
    });


    test('Hubs list for user', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0fth"
        });

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');

        await hubPage.panels.click();

        for (const hubs of await hubPage.entityBlock.all())
            await expect(hubs).toBeVisible();
        for (const hub of await hubPage.entityBlock.all())
        {await expect(hub.filter({has: hubPage.entityText})).toBeVisible();}
        for (const hub of await hubPage.entityBlock.all())
        {await expect(hub.filter({has: hubPage.trashIcon})).toBeVisible();}

    });

    test('Hubs list for company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0fth"
        });

        await loginPage.auth(MIXED);
        await expect(page).toHaveURL('/panels');

        await hubPage.panels.click();

        for (const hubs of await hubPage.entityBlock.all())
            await expect(hubs).toBeVisible();

        //const hubsCounter = Number((await hubPage.hubsCounter.textContent()).slice(-3,-1));
        //let hubsNumber=((await page.$$('.part__item')).length).toString();

       // await expect(hubPage.entityBlock).toHaveCount(hubsCounter);
    });

});