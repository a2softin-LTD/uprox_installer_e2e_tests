import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {DILER } from "../../utils/user_data";

test.describe('Companies under DILER role', { tag: '@stable' },() => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(DILER);
        await expect(page).toHaveURL('/dealer/companies');
    });

    test('Checking UI elements on companies page under DILER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            })

            await expect(profilePage.companyCountryFilter).toBeVisible();
            await expect(profilePage.companyRoleFilter).toBeVisible();
            await expect(profilePage.companyAllFilter).toBeVisible();
            await expect(profilePage.companySearchField).toBeVisible();
           // await expect(profilePage.applyButton).toBeVisible();
            await expect(profilePage.pageTitle.filter({has:page.getByText('Companies:')})).toBeVisible();
    });

    test('Company list under DILER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf42"
            });

            await expect(page.getByText('Companies:')).toBeVisible();

            for (const company of await profilePage.entityBlock.all())
                await expect(company).toBeVisible();
            for (const hub of await profilePage.entityBlock.all())
            {await expect(hub.filter({has: profilePage.entityText})).toBeVisible();}

    });

    test.describe('Company search under DILER role', () => {

        test('Company search by country under DILER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf4a"
            });
            const country: string = "Ukraine";
            let companiesNumber=0;

            await expect(page.getByText('Companies:')).toBeVisible();

            for (const hub of await profilePage.entityBlock.filter({hasText:'Ukraine'}).all())
            { await expect(hub).toBeVisible();
                companiesNumber=companiesNumber+1;}

            await profilePage.companyCountryFilter.click();
            await page.getByText(country,{ exact: true }).first().click();

            for (const hub of await profilePage.entityBlock.filter({hasText:'Ukraine'}).all())
            { await expect(hub).toBeVisible();}

            await expect(profilePage.employeeBlock).toHaveCount(companiesNumber);
        });

        test('Company search by role under DILER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf4c"
            });

            const role: string = "Monitoring-service companies";

            await expect(page.getByText('Companies:')).toBeVisible();

            let companiesNumber=((await page.$$('div:text-is("Monitoring-service companies")')).length)-1;
            await profilePage.companyRoleFilter.click();
            await page.getByText(role, { exact: true }).first().click();

            for (const company of await profilePage.entityBlock.filter({hasText:'Monitoring-service companies'}).all())
            { await expect(company).toBeVisible();}

            await expect(profilePage.employeeBlock).toHaveCount(companiesNumber);
        });

        test('Company search by setting under DILER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf48"
            });
            const setting: string = "Shown in ADS";

            await expect(page.getByText('Companies:')).toBeVisible();

            let companiesNumber=((await page.$$('use[*|href="#icon-ads"]')).length);
            console.log(companiesNumber);
            await profilePage.companyAllFilter.click();
            await page.getByText(setting, { exact: true }).click();

            for (const company of await profilePage.entityBlock.filter({has:profilePage.adsIcon}).all())
            { await expect(company).toBeVisible();}

            await page.waitForTimeout(2000);
            await expect(profilePage.employeeBlock).toHaveCount(companiesNumber);
        });

        test('Company search by company name under DILER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf4b"
            });
            const company: string = "AVL";

            await expect(page.getByText('Companies:')).toBeVisible();
            await expect(page.getByText(company)).toBeVisible();

            await profilePage.companySearchField.fill(company);

            await expect(page.getByText(company)).toBeVisible();
            await expect(profilePage.employeeBlock).toHaveCount(1);
        });

    });

    test('Downloading companies list under DILER role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694phqe6"
            });

        await expect(page.getByText('Companies:')).toBeVisible();

        const downloadPromise = page.waitForEvent('download');
        await profilePage.saveInXLSButton.click();
        await expect(page.getByText('Save in XLS')).toBeVisible();
        await page.getByText('Save in XLS').click();
        const download = await downloadPromise;
        await download.saveAs(download.suggestedFilename());
        });

});