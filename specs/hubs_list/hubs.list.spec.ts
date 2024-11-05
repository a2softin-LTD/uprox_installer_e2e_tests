import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { MIXED, USER_1 } from "../../utils/user_data";
import {
    TEXT_NUMBER_OF_DEVICES_IM_COMPANY,
    TITLE_MY_PROFILE,
    URL_LOGIN, URL_PANELS,
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
    });

    test('Hubs list for user', { tag: ['@smoke', '@hub']},async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0fth"
        });

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);

        await hubPage.panels.click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();

        await page.waitForTimeout(2000);

        for (const hubs of await hubPage.entityBlock.all())
        { await expect(hubs).toBeVisible();}

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
        await expect(page).toHaveURL(URL_PANELS);

        await hubPage.panels.click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)})).toBeVisible();

        await page.waitForTimeout(2000);

        for (const hubs of await hubPage.entityBlock.all())
            await expect(hubs).toBeVisible();

        for (const hub of await hubPage.entityBlock.all())
        {await expect(hub.filter({has: hubPage.hubEngineerIcon})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all())
        {await expect(hub.filter({has: hubPage.informationIcon})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all())
        {await expect(hub.filter({has: hubPage.trashIcon})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all())
        {await expect(hub.filter({has: hubPage.hubCorpNameAccountInfo})).toBeVisible();}

        for (const hub of await hubPage.entityBlock.all())
        {await expect(hub.filter({has: hubPage.hubCorpNumberConnectionInfo})).toBeVisible();}

       // const hubsCounter = Number((await hubPage.hubsCounter.textContent()).slice(-3,-1));
        //let hubsNumber=((await page.$$('.part__item')).length).toString();

       // await expect(hubPage.entityBlock).toHaveCount(hubsCounter);
    });

});