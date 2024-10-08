import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { MONITORING_SERVICE_COMPANY_1 } from "../../utils/user_data";
import { faker } from "@faker-js/faker";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
        await expect(page).toHaveURL('/panels');
    });

    test.describe('Employees', () => {

        test('Add employee', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rju80"
            });

            const name: string = "Дмитро";
            const email: string = faker.internet.email({ firstName: 'sastest2398_' });
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

            await expect(page.getByText(email)).toBeVisible();

            await page.getByText(email).click();
            await profilePage.employeeDeleteManager.click();
            await profilePage.deleteButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).not.toBeVisible();
        });

        test('Delete employee', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694v0c04"
            });

            const name: string = "Дмитро";
            const email: string = faker.internet.email({ firstName: 'sastest2398_' });
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

            await expect(page.getByText(email)).toBeVisible();

            await page.getByText(email).click();
            await profilePage.employeeDeleteManager.click();
            await profilePage.deleteButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(email)).not.toBeVisible();
        });

        test('Employee data editing', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rju83"
            });

            const nameOld: string = "Дмитро Дмитрович";
            const emailOld: string = faker.internet.email({ firstName: 'sastest2398_' });
            const phoneOld: string = faker.phone.number();
            const nameNew: string = "Петро Пилипів";
            const phoneNew: string = faker.phone.number();
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

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(emailOld)).toBeVisible();

            await page.getByText(emailOld).click();
            await page.getByText('Full name').click();
            await profilePage.userEditField.fill(nameNew);
            await profilePage.saveButton.click();
            page.getByText('Phone').click();
            await profilePage.userEditField.fill(phoneNew);
            await profilePage.saveButton.click();
            await page.getByText('Configuring panels').click();
            await profilePage.enableButton.click();
            await profilePage.saveButton.click()
            await page.getByText('Block employee').click();
            await profilePage.yesButton.click();
            await profilePage.saveButton.click();

            await expect(page.getByText(nameNew)).toBeVisible();
            await expect(page.getByText('Enable')).toBeVisible();
            await expect(page.getByText('Yes')).toBeVisible();

            await profilePage.employeeDeleteManager.click();
            await profilePage.deleteButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(nameNew,{ exact: true })).not.toBeVisible();

        });

        test('Employee search', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rju7u"
            });

            const name: string = "ДЖОНСОН";
            const email: string = faker.internet.email({ firstName: 'sastest2398_' });
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

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(name)).toBeVisible();

            await profilePage.employeeSearchField.fill(name);

            await expect(page.getByText(name)).toBeVisible();
            await expect(profilePage.employeeBlock).toHaveCount(1);

            await profilePage.employeeSearchField.fill(email);

            await expect(page.getByText(email)).toBeVisible();
            await expect(profilePage.employeeBlock).toHaveCount(1);

            await page.getByText(name).click();
            await profilePage.employeeDeleteManager.click();
            await profilePage.deleteButton.click();

            await expect(page.getByText('Employees')).toBeVisible();
            await expect(page.getByText(name,{ exact: true })).not.toBeVisible();
        });

    });

});