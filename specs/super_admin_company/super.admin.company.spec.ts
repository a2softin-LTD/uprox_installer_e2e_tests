import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {SUPER_ADMIN} from "../../utils/user_data";
import { faker } from "@faker-js/faker";

test.describe('Company under SUPER_ADMIN role', { tag: '@stable' },() => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL('/support/search');
    });

    test.describe('Checking UI elements of the Page', () => {

        test('Checking UI elements on company page: by SUPER_ADMIN role', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await profilePage.companies.click();
            await page.waitForTimeout(2000);

            await expect(profilePage.companyAddButton).toBeVisible();
            await expect(profilePage.companyCountryFilter).toBeVisible();
            await expect(profilePage.companyRoleFilter).toBeVisible();
            await expect(profilePage.companyAllFilter).toBeVisible();
            await expect(profilePage.companySearchField).toBeVisible();
            await expect(profilePage.applyButton).toBeVisible();
            await expect(profilePage.pageTitle.filter({has:page.getByText('Companies:')})).toBeVisible();
            await expect(profilePage.companySelectCommandField).toBeVisible();
            await expect(profilePage.actionsCheckbox).toBeVisible();
        });
    });

    test.describe('Company list edit.', () => {

        test('List of companies', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40dv"
            });

            await profilePage.companies.click();

            for (const company of await profilePage.entityBlock.all())
                await expect(company).toBeVisible();
            for (const hub of await profilePage.entityBlock.all())
            {await expect(hub.filter({has: profilePage.entityText})).toBeVisible();}

        });

        test.skip('Add company', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p407a"
            });

            const name: string = faker.commerce.productName();
            const email: string = faker.internet.email();
            const country: string = "Ukr";
            const contactEmail: string = faker.internet.email();
            const contactPhone: string = faker.phone.number();
            const description: string = "no";
            const contacts: string = "absent";
            const company: string = "фів";

            await profilePage.companies.click();
            await profilePage.companyAddButton.click();
            await profilePage.inputFirstField.fill(name);
            await profilePage.inputSecondField.fill(email);
            await profilePage.inputThirdField.fill(country);
            await page.getByText('Ukraine').click();
            await profilePage.selectFirstField.click();
            await page.getByText('Test dealer role').click();
            await profilePage.selectSecondField.click();
            await page.getByText('Monitoring company').click();
            await profilePage.inputFourthField.fill(contactEmail);
            await profilePage.inputFifthField.fill(contactPhone);
            await profilePage.inputSixthtField.fill(description);
            await profilePage.inputSeventhField.fill(contacts);
            await profilePage.submitButton.click();

            await expect(page.getByText(name)).toBeVisible();

            await page.getByText(name).click();
            await profilePage.companyCloseButton.click();
            await page.getByText(company).click();
            await profilePage.submitButton.click();

            await expect(page.getByText(contactPhone)).not.toBeVisible();
        });

        test.skip('Delete company', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p40z1"
            });

            const name: string = faker.commerce.productName();
            const email: string = faker.internet.email();
            const country: string = "Ukr";
            const contactEmail: string = faker.internet.email();
            const contactPhone: string = faker.phone.number();
            const description: string = "no";
            const contacts: string = "absent";
            const company: string = "фів";

            await profilePage.companies.click();
            await profilePage.companyAddButton.click();
            await profilePage.inputFirstField.fill(name);
            await profilePage.inputSecondField.fill(email);
            await profilePage.inputThirdField.fill(country);
            await page.getByText('Ukraine').click();
            await profilePage.selectFirstField.click();
            await page.getByText('Test dealer role').click();
            await profilePage.selectSecondField.click();
            await page.getByText('Monitoring company').click();
            await profilePage.inputFourthField.fill(contactEmail);
            await profilePage.inputFifthField.fill(contactPhone);
            await profilePage.inputSixthtField.fill(description);
            await profilePage.inputSeventhField.fill(contacts);
            await profilePage.submitButton.click();

            await expect(page.getByText(name)).toBeVisible();

            await page.getByText(name).click();
            await profilePage.companyCloseButton.click();
            await page.getByText(company).click();
            await profilePage.submitButton.click();

           await expect(page.getByText(contactPhone)).not.toBeVisible();
        });

    });

    test.describe('Company search', () => {

        test('Search by country', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p3ztg"
            });
            const country: string = "Algeria (inter)";
            let count=0;

            await profilePage.companies.click();
            await page.waitForTimeout(5000);

            for (const hub of await profilePage.entityBlock.filter({hasText:'Algeria'}).all())
            { await expect(hub).toBeVisible();
            count=count+1;}

            await profilePage.companyCountryFilter.click();
            await page.getByText(country,{ exact: true }).click();

            for (const hub of await profilePage.entityBlock.filter({hasText:'Algeria'}).all())
            { await expect(hub).toBeVisible();}

            await expect(profilePage.employeeBlock).toHaveCount(count);
        });

        test('Search by role', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p3zwr"
            });

            const role: string = "Service companies";

            await profilePage.companies.click();
            await page.waitForTimeout(5000);
            let hubsNumber=((await page.$$('div:text-is("Service companies")')).length)-1;
            await profilePage.companyRoleFilter.click();
            await page.getByText(role, { exact: true }).first().click();

            for (const hub of await profilePage.entityBlock.filter({hasText:'Service companies'}).all())
            { await expect(hub).toBeVisible();}

            await expect(profilePage.employeeBlock).toHaveCount(hubsNumber);
        });


        test('Search by setting', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p404p"
            });
            const setting: string = "Blocked";

            await profilePage.companies.click();
            await page.waitForTimeout(5000);
            let hubsNumber=((await page.$$('use[*|href="#icon-ban"]')).length);
            await profilePage.companyAllFilter.click();
            await page.getByText(setting, { exact: true }).click();

            for (const hub of await profilePage.entityBlock.filter({has:profilePage.banIcon}).all())
            { await expect(hub).toBeVisible();}

            await expect(profilePage.employeeBlock).toHaveCount(hubsNumber);
        });

        test('Search by company name', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694p3zyz"
            });
            const company: string = "Сиротин";

            await profilePage.companies.click();
            await page.waitForTimeout(5000);

            await expect(page.getByText(company)).toBeVisible();

            await profilePage.companySearchField.fill(company);

            await expect(page.getByText(company)).toBeVisible();
            await expect(profilePage.employeeBlock).toHaveCount(1);
        });

    });

    test.describe('Company profile edit', () => {

        test('Resending the letter', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694phqe6"
            });

            const company: string = 'Handcrafted Concrete Mouse';

            await profilePage.companies.click();
            await page.waitForTimeout(2000);
            await page.getByText(company).click();

            await profilePage.resendEmailButton.click();
            await profilePage.sendButton.click();

            await expect(page.getByText('Saving changes')).toBeVisible();
            await expect(page.getByText('successfully')).toBeVisible();
        });

        test('Changing admin login', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694phr25"
            });

            const company: string = 'Handcrafted Concrete Mouse';
            const email: string = faker.internet.email('pol');

            await profilePage.companies.click();
            await page.waitForTimeout(2000);
            await page.getByText(company).click();

            await profilePage.companyChangeAdminLogin.click();
            await profilePage.inputFirstField.fill(email);
            await profilePage.changeButton.click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(email)).toBeVisible();
        });

   });

});