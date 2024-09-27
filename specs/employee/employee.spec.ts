import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {MONITORING_SERVICE_COMPANY_1, USER_1} from "../../utils/user_data";
import { faker } from "@faker-js/faker";


test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
        await expect(page).toHaveURL('/panels');
        profilePage = new ProfilePage(page);

    });


    test.describe('Employees', () => {

        test('Add employee', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rju80"
            });
            const name: string = "Дмитро";
            const email: string = faker.internet.email();
            const phone: string = faker.phone.number();
            const role: string = "Manager";


            await profilePage.employees.click();
            await page.waitForTimeout(2000);
            await profilePage.addButton.click();
            await profilePage.employeeEmailField.fill(email);
            await profilePage.employeeNameField.fill(name);
            await profilePage.employeePhoneField.fill(phone);
            await profilePage.employeeRoleField.click();
            await page.getByText(role).click();
            await profilePage.addButton.click();

            if (await profilePage.closeWindowButton.isVisible()) {  await profilePage.closeWindowButton.click()}
            await page.waitForTimeout(2000);
            expect(page.getByText(email)).toBeVisible();

            await page.getByText(email).click();
            await profilePage.employeeDeleteManager.click();
            await profilePage.deleteButton.click();

            expect(profilePage.findByText('successfully deleted')).toBeVisible();
            await page.waitForTimeout(2000);
            expect(page.getByText(email)).not.toBeVisible();



        });

        test('Delete employee', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694v0c04"
            });
            const name: string = "Дмитро";
            const email: string = faker.internet.email();
            const phone: string = faker.phone.number();
            const role: string = "Manager";


            await profilePage.employees.click();
            await page.waitForTimeout(2000);
            await profilePage.addButton.click();
            await profilePage.employeeEmailField.fill(email);
            await profilePage.employeeNameField.fill(name);
            await profilePage.employeePhoneField.fill(phone);
            await profilePage.employeeRoleField.click();
            await page.getByText(role).click();
            await profilePage.addButton.click();

            if (await profilePage.closeWindowButton.isVisible()) {  await profilePage.closeWindowButton.click()}
            await page.waitForTimeout(2000);
            expect(page.getByText(email)).toBeVisible();

            await page.getByText(email).click();
            await profilePage.employeeDeleteManager.click();
            await profilePage.deleteButton.click();

            expect(profilePage.findByText('successfully deleted')).toBeVisible();
            await page.waitForTimeout(2000);
            expect(page.getByText(email)).not.toBeVisible();
        });

        test('Employee editing', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rju83"
            });

            const nameOld: string = "Дмитро Дмитрович";
            const emailOld: string = faker.internet.email();
            const phoneOld: string = faker.phone.number();
            const nameNew: string = "Петро Пилипів";
            const phoneNew: string = "+380506784544";
            const role: string = "Manager";


            await profilePage.employees.click();
            await page.waitForTimeout(2000);
            await profilePage.addButton.click();
            await profilePage.employeeEmailField.fill(emailOld);
            await profilePage.employeeNameField.fill(nameOld);
            await profilePage.employeePhoneField.fill(phoneOld);
            await profilePage.employeeRoleField.click();
            await page.getByText(role).click();
            await profilePage.addButton.click();

            if (await profilePage.closeWindowButton.isVisible()) {  await profilePage.closeWindowButton.click()}
            await page.waitForTimeout(2000);
            expect(page.getByText(emailOld)).toBeVisible();

            await page.getByText(emailOld).click();
            await page.getByText('Full name').click();
            await profilePage.userEditField.fill(nameNew);
            await profilePage.saveButton.click();
            await page.waitForTimeout(2000);
            // page.getByText('Phone').click();
            //await profilePage.userEditField.fill(phoneNew);
            //await profilePage.saveButton.click();
            //await page.waitForTimeout(2000);
            await page.getByText('Configuring panels').click();
            await profilePage.enableButton.click();
            await profilePage.saveButton.click()
            await page.waitForTimeout(2000);
            await page.getByText('Block employee').click();
            await profilePage.yesButton.click();
            await profilePage.saveButton.click();

            await page.waitForTimeout(2000);
            expect(page.getByText(nameNew)).toBeVisible();
            expect(page.getByText('Enable')).toBeVisible();
            expect(page.getByText('Yes')).toBeVisible();

            await profilePage.employeeDeleteManager.click();
            await profilePage.deleteButton.click();


            expect(profilePage.findByText('successfully deleted')).toBeVisible();
            await page.waitForTimeout(2000);
            expect(page.getByText(nameNew,{ exact: true })).not.toBeVisible();

        });

        test('Employee search', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rju7u"
            });

            const name: string = "ДЖОНСОН";
            const email: string = faker.internet.email();
            const phone: string = faker.phone.number();
            const role: string = "Manager";


            await profilePage.employees.click();
            await page.waitForTimeout(2000);
            await profilePage.addButton.click();
            await profilePage.employeeEmailField.fill(email);
            await profilePage.employeeNameField.fill(name);
            await profilePage.employeePhoneField.fill(phone);
            await profilePage.employeeRoleField.click();
            await page.getByText(role).click();
            await profilePage.addButton.click();

            if (await profilePage.closeWindowButton.isVisible()) {  await profilePage.closeWindowButton.click()}
            await page.waitForTimeout(2000);
            expect(page.getByText(name)).toBeVisible();
            await profilePage.employeeSearchField.fill(name);
            await page.waitForTimeout(2000);
            expect(page.getByText(name)).toBeVisible();
            expect(profilePage.employeeBlock).toHaveCount(1);

            await page.getByText(name).click();
            await profilePage.employeeDeleteManager.click();
            await profilePage.deleteButton.click();

            expect(profilePage.findByText('successfully deleted')).toBeVisible();
            await page.waitForTimeout(2000);
            expect(page.getByText(name,{ exact: true })).not.toBeVisible();

        });

    });
});