import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { MIXED } from "../../utils/user_data";
import {
    CITY_DNIPRO,
    CITY_POLTAVA, NUMBER_12, NUMBER_28, NUMBER_45, NUMBER_7, TEXT_ADRESS,
    TEXT_NUMBER_OF_DEVICES_IM_COMPANY,
    TEXT_PANEL_INFORMATION, URL_LOGIN, URL_PANELS
} from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(MIXED);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test('Editing information about corporate hub', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0hzj"
        });

        await expect(hubPage.pageTitle.filter({has:page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)})).toBeVisible();

        await page.waitForTimeout(2000);

        for (const hub of await hubPage.informationIcon.all())
        { await expect(hub).toBeVisible();}

        await (hubPage.informationIcon.first()).click();

        await expect(page.getByText(TEXT_PANEL_INFORMATION)).toBeVisible();

        await hubPage.editButton.click();
        await hubPage.inputFourthField.click();
        await hubPage.inputFourthField.fill(CITY_POLTAVA);
        await page.getByText(CITY_POLTAVA).click();
        await hubPage.inputSixthtField.click();
        await hubPage.inputSixthtField.fill(NUMBER_12);
        await hubPage.inputSeventhField.click();
        await hubPage.inputSeventhField.fill(NUMBER_28);
        await hubPage.okButton.click();
        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(2000);

        await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

        await (hubPage.informationIcon.first()).click();

        await expect(page.getByText(TEXT_PANEL_INFORMATION)).toBeVisible();

        await hubPage.editButton.click();
        await hubPage.inputFourthField.click();
        await hubPage.inputFourthField.fill(CITY_DNIPRO);
        await page.getByText(CITY_DNIPRO, { exact: true }).click();
        await hubPage.inputSixthtField.click();
        await hubPage.inputSixthtField.fill(NUMBER_45);
        await hubPage.inputSeventhField.click();
        await hubPage.inputSeventhField.fill(NUMBER_7);
        await hubPage.okButton.click()
        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(2000);

        await expect(page.getByText(TEXT_NUMBER_OF_DEVICES_IM_COMPANY)).toBeVisible();

        await (hubPage.informationIcon.first()).click();

        await expect(page.getByText(TEXT_PANEL_INFORMATION)).toBeVisible();
        await expect(page.getByText(CITY_DNIPRO)).toBeVisible();
        await expect(page.getByText(TEXT_ADRESS)).toBeVisible();
    });

});