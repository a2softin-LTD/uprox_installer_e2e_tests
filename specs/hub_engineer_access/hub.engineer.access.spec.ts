import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { MIXED } from "../../utils/user_data";
import { ENGINEER_EMAIL, ENGINEER_NUMBER_FINAL, ENGINEER_NUMBER_START, TEXT_NUMBER_OF_DEVICES_IM_COMPANY, URL_LOGIN, URL_PANELS} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";
import { HubPage } from "../../pages/hub/HubPage";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(MIXED);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test('Access for engineer: company hub', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0k8b"
        });

        await companyPage.panels.click();

        await expect (page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

        await page.waitForTimeout(2000);

        if (await ((hubPage.hubEngineerIcon).filter(({ hasText: ENGINEER_NUMBER_FINAL }))).isVisible())
        {   await hubPage.hubEngineerIcon.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText((ENGINEER_EMAIL)).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.okButton.click();

            await expect (page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

            await page.reload();
            await page.waitForTimeout(1000);

            await expect (page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();
            await expect(hubPage.hubEngineerIcon).toHaveText(ENGINEER_NUMBER_START);
        }

        await hubPage.hubEngineerIcon.click();
        await page.waitForLoadState('domcontentloaded');
        await page.getByText((ENGINEER_EMAIL)).click();
        await page.waitForLoadState('domcontentloaded');
        await companyPage.okButton.click();

        await expect (page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

        await page.reload();
        await page.waitForTimeout(2000);

        await expect (page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();
        await expect(hubPage.hubEngineerIcon).toHaveText(ENGINEER_NUMBER_FINAL);

        await hubPage.hubEngineerIcon.click();
        await page.waitForLoadState('domcontentloaded');
        await page.getByText((ENGINEER_EMAIL)).click();
        await page.waitForLoadState('domcontentloaded');
        await companyPage.okButton.click();

        await expect (page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

        await page.reload();
        await page.waitForTimeout(2000);

        await expect (page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();
        await expect(hubPage.hubEngineerIcon).toHaveText(ENGINEER_NUMBER_START);
    });

});