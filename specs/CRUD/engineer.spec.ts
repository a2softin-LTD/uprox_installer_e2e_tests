import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { CORP_ADMIN, MONITORING_SERVICE_COMPANY_1 } from "../../utils/user_data";
import { faker } from "@faker-js/faker";
import { EMAIL_NECESSARY_NAME_PART } from "../../utils/constants";

test.describe('Login Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
    });

    test.describe('Creation of the Security Company Admin under the different role', () => {

        test('Creation of ENGINEER under the Role = MONITORING_SERVICE_COMPANY_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atxk3"
            });

            const name: string = "Петро";
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const phone: string = faker.phone.number();
            const role: string = "Engineer";

            await loginPage.auth(MONITORING_SERVICE_COMPANY_1);

            await expect(page).toHaveURL('/panels');

            await profilePage.employees.click();
            await profilePage.addButton.click();

            await expect(page.getByText('Add employee')).toBeVisible();

            await profilePage.employeeEmailField.fill(email);
            await profilePage.employeeNameField.fill(name);
            await profilePage.employeePhoneField.fill(phone);
            await profilePage.employeeRoleField.click();
            await page.getByText(role).click();
            await profilePage.addButton.click();

            await expect(page.getByText(email)).toBeVisible();

            await page.getByText(email).click();
            await profilePage.employeeDeleteManager.click();
            await profilePage.deleteButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).not.toBeVisible();
        });

        test.skip('Creation of ENGINEER under the Role = CORP_ADMIN', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694atyg8"
            });

            const name: string = "Петро";
            const email: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });
            const phone: string = faker.phone.number();
            const role: string = "Engineer";

            await loginPage.auth(CORP_ADMIN);

            await expect(page).toHaveURL('/profile/companies');
            await expect(page.getByText('QA- company-1')).toBeVisible();

            await (page.getByText('QA- company-1')).click();
            await profilePage.employees.click();
            await profilePage.addButton.click();

            await expect(page.getByText('Add employee')).toBeVisible();

            await profilePage.employeeEmailField.fill(email);
            await profilePage.employeeNameField.fill(name);
            await profilePage.employeePhoneField.fill(phone);
            await profilePage.employeeRoleField.click();
            await page.getByText(role).click();
            await profilePage.addButton.click();

            await expect(page.getByText(email)).toBeVisible();

            await page.getByText(email).click();
            await profilePage.employeeDeleteManager.click();
            await profilePage.deleteButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).not.toBeVisible();
        });

    });

});