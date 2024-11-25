import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { MONITORING_COMPANY_1 } from "../../utils/user_data";
import {
    TEXT_PUT_ON_SERVICE, TEXT_PUT_PANEL_ON_MONITORING,
    TEXT_REFUSE_PANEL_FROM_MONITORING,
    TEXT_REFUSE_SERVICE,
    TITLE_SERVICE_REQUESTS,
    URL_LOGIN,
    URL_PANELS,
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
        await loginPage.auth(MONITORING_COMPANY_1);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test('Checking UI elements of the requests page under MONITORING_COMPANY_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: ''
        });

        await hubPage.requests.click();

        await expect(hubPage.pageTitle.filter({has:page.getByText(TITLE_SERVICE_REQUESTS)})).toBeVisible();
    });

    test('Requests list  under MONITORING_COMPANY_ADMIN role', { tag: ['@smoke']  }, async ({ page }) => {
        test.info().annotations.push({
            type: 'test_id',
            description: 'https://app.clickup.com/t/8694vrfn3'
        });

        await hubPage.requests.click();

        await expect(hubPage.pageTitle.filter({has: page.getByText(TITLE_SERVICE_REQUESTS)})).toBeVisible();

        await page.waitForTimeout(2000);

        for (const request of await companyPage.entityBlock.all()) {
            await expect(request).toBeVisible();
        }

        //for (const request of await companyPage.entityBlock.all())
        // {  await expect(request.filter({hasText:/^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/})).toBeVisible();}

        for (const request of await companyPage.entityBlock.all()) {
            await expect((request.filter({hasText: TEXT_PUT_PANEL_ON_MONITORING})).or((request.filter({hasText: TEXT_REFUSE_PANEL_FROM_MONITORING}))).
            or((request.filter({hasText: TEXT_REFUSE_SERVICE}))).or(((request.filter({hasText: TEXT_PUT_ON_SERVICE}))))).toBeVisible();
        }
    });
});