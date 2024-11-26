import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { MONITORING_COMPANY } from "../../utils/user_data";
import {
    SERVER_DNS_FIRST,
    SERVER_DNS_SECOND,
    SERVER_NAME_FIRST,
    SERVER_NAME_SECOND, SERVER_PORT_FIRST,
    SERVER_PORT_SECOND,
    TITLE_COMPANY_SETTINGS, URL_LOGIN, URL_PANELS
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";

test.describe('Company Page test', { tag: '@stable' },() => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN)
        await loginPage.auth(MONITORING_COMPANY);
        await expect(page).toHaveURL(URL_PANELS);

        await companyPage.company.click();
        await companyPage.companyServerList.click();
        await page.waitForTimeout(2000);

        for (const server of await companyPage.entityBlock.all())
        {   await  (server).locator(companyPage.trashIcon).click();
            await page.waitForTimeout(2000);
            await companyPage.submitButton.click();
            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeEnabled();}
    });

    test('Servers list: monitoring company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694fb8kd"
        });

        await companyPage.company.click();
        await companyPage.companyServerList.click();

        await expect(companyPage.companyServerAddButton).toBeVisible();

        await page.waitForTimeout(2000);

        for (const server of await companyPage.entityBlock.all())
        { await expect(server).toBeVisible();}

        for (const server of await companyPage.entityBlock.all())
        {await expect(server.filter({has: companyPage.companyServerNameInfo})).toBeVisible();}

        for (const server of await companyPage.entityBlock.all())
        {await expect(server.filter({has: companyPage.companyServerDnsPortInfo})).toBeVisible();}

        for (const server of await companyPage.entityBlock.all())
        {await expect(server.filter({has: companyPage.trashIcon})).toBeVisible();}
    });

    test('Add server: monitoring company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694fb8nk"
        });

        await companyPage.company.click();
        await companyPage.companyServerList.click();
        await companyPage.companyServerAddButton.click();
        await companyPage.companyNameServerField.fill(SERVER_NAME_FIRST);
        await companyPage.companyDnsServerField.fill(SERVER_DNS_FIRST);
        await companyPage.companyPortServerField.fill(SERVER_PORT_FIRST);
        await companyPage.saveButton.click();

        await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible({timeout:10000});
        await expect(page.getByText(SERVER_NAME_FIRST)).toBeVisible();

        await companyPage.trashIcon.click();
        await companyPage.submitButton.click();
        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(2000);

        await expect(page.getByText(SERVER_NAME_FIRST)).not.toBeVisible();
    });

    test('Delete server: monitoring company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694mgxr1"
        });

        await companyPage.company.click();
        await companyPage.companyServerList.click();
        await companyPage.companyServerAddButton.click();
        await companyPage.companyNameServerField.fill(SERVER_NAME_FIRST);
        await companyPage.companyDnsServerField.fill(SERVER_DNS_FIRST);
        await companyPage.companyPortServerField.fill(SERVER_PORT_FIRST);
        await companyPage.saveButton.click();

        await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible({timeout:10000});
        await expect(page.getByText(SERVER_NAME_FIRST)).toBeVisible();

        await companyPage.trashIcon.click();
        await companyPage.submitButton.click();
        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(2000);

        await expect(page.getByText(SERVER_NAME_FIRST)).not.toBeVisible();
    });

    test('Server settings editing: monitoring company', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694mh0qb"
        });

        await companyPage.company.click();
        await companyPage.companyServerList.click();
        await companyPage.companyServerAddButton.click();
        await companyPage.companyNameServerField.fill(SERVER_NAME_SECOND);
        await companyPage.companyDnsServerField.fill(SERVER_DNS_SECOND);
        await companyPage.companyPortServerField.fill(SERVER_PORT_SECOND);
        await companyPage.saveButton.click();

        await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible({timeout:10000});
        await expect(page.getByText(SERVER_NAME_SECOND)).toBeVisible();

        await page.getByText((SERVER_NAME_SECOND)).click();
        await companyPage.companyNameServerField.fill(SERVER_NAME_FIRST);
        await companyPage.companyDnsServerField.fill(SERVER_DNS_FIRST);
        await companyPage.companyPortServerField.fill(SERVER_PORT_FIRST);
        await companyPage.saveButton.click();

        await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible({timeout:10000});
        await expect(page.getByText(SERVER_NAME_FIRST)).toBeVisible();

        await companyPage.trashIcon.click();
        await companyPage.submitButton.click();
        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(2000);

        await expect(page.getByText(SERVER_NAME_FIRST)).not.toBeVisible();
    });
});