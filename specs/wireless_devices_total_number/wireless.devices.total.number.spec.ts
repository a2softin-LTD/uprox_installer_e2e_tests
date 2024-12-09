import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import { TITLE_SYSTEM, URL_LOGIN, URL_PROFILE_PANELS } from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN)
    });

    test('Wireless device total number panel', { tag: ['@smoke', '@hub','@stable']},async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678t0fvj"
        });

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL(URL_PROFILE_PANELS);
        await page.waitForTimeout(2000);
        await hubPage.secondHub.click();
        await page.waitForTimeout(2000);

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_SYSTEM)})).toBeVisible();
        await expect(hubPage.devicesCounterPanel).toBeVisible();

        await page.waitForTimeout(2000);

        for (const counter of await hubPage.devicesCounter.all())
            await expect(counter).toBeVisible();

        // const hubsCounter = Number((await hubPage.hubsCounter.textContent()).slice(-3,-1));
        //let hubsNumber=((await page.$$('.part__item')).length).toString();

        //let countGroup=0;
        //let countUser=0;

        //const devicesCounter = Number((await hubPage.devicesCounter.filter({has:page.getByText(TITLE_GROUPS_)}).textContent()).slice(-3,-2));

        //console.log(devicesCounter);

        // for (const group of await hubPage.groupBlock.all())
        // { await expect(group).toBeVisible();
        //     countGroup=countGroup+1;}
        //
        // await hubPage.groups.click();
        //
        // for (const user of await hubPage.entityBlock.all())
        // { await expect(user).toBeVisible();
        //     countUser=countUser+1;}
        //
        // await hubPage.system.click();

    });
});