import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import {SERVICE_COMPANY_1, SUPER_ADMIN} from "../../utils/user_data";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import {
    HUB_SERIAL_NUMBER_TRUE_THIRD,
    TEN,
    TEXT_ADDED_NEW_USER,
    TEXT_DAY_FIRST,
    TEXT_DAY_SECOND,
    TEXT_PUT_ON_SERVICE,
    TEXT_REFUSE_PANEL_FROM_MONITORING,
    TEXT_REFUSE_SERVICE,
    TEXT_REMOVE_USER_EMAIL,
    TEXT_REMOVED_USER,
    TEXT_SAVE_IN_XLS,
    TEXT_SEPTEMBER_2024,
    TITLE_HISTORY_FOR_ALL_PANELS,
    TITLE_SERVICE_REQUESTS,
    TITLE_SYSTEM,
    URL_LOGIN,
    URL_PANELS,
    URL_SUPPORT_SEARCH,

} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company page tests',{ tag: ['@smoke', '@stable']}, () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(SERVICE_COMPANY_1);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test('Checking UI elements of the requests page under SERVICE_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: ''
        });

        await hubPage.requests.click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_SERVICE_REQUESTS)})).toBeVisible();


    });

    test('Requests list  under SERVICE_COMPANY_ADMIN role', { tag: ['@smoke']  }, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694vrfn3'
            });

            await hubPage.requests.click();

            await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_SERVICE_REQUESTS)})).toBeVisible();

            await page.waitForTimeout(2000);

            for (const request of await companyPage.entityBlock.all())
            { await expect(request).toBeVisible();}

           //for (const request of await companyPage.entityBlock.all())
           // {  await expect(request.filter({hasText:/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/})).toBeVisible();}

          for (const request of await companyPage.entityBlock.all())
          {  await expect((request.filter({hasText:TEXT_PUT_ON_SERVICE})).or((request.filter({hasText:TEXT_REFUSE_PANEL_FROM_MONITORING}))).
          or((request.filter({hasText:TEXT_REFUSE_SERVICE})))).toBeVisible();}

    });


});