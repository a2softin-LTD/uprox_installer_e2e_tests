import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {USER_1} from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
        profilePage = new ProfilePage(page);

    });

    test.describe('Checking UI elements of the Profile Page', () => {

        test('Checking UI elements on the Profile Page', async () => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await expect(profilePage.userLogo).toBeVisible();
            await expect(profilePage.userName).toBeVisible();
            await expect(profilePage.userRole).toBeVisible();
            await expect(profilePage.userEmail).toBeVisible();
            await expect(profilePage.userPassword).toBeVisible();
            await expect(profilePage.userLanguageForEmails).toBeVisible();
            await expect(profilePage.panels).toBeVisible();
            await expect(profilePage.feedback).toBeVisible();
            await expect(profilePage.message).toBeVisible();
            await expect(profilePage.myProfileButton).toBeVisible();
            await expect(profilePage.logoutButton).toBeVisible();
            await expect(profilePage.languageChoice).toBeVisible();
            await expect(profilePage.myProfileTitle).toBeVisible();
        });
    });

    test.describe('Profile edit.', () => {

        test('Name edit', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rc9at"
            });
            const newName: string = "Дмитро Дмитрук";
            const oldName: string = "Дмитро Анатольович Пінчук";

            await profilePage.userName.click();
            await profilePage.userEditField.fill(newName);
            await profilePage.userEditSubmit.click();

            await expect(page.getByText(newName)).toBeVisible();

            await page.waitForTimeout(2000);
            await profilePage.userName.click();
            await profilePage.userEditField.fill(oldName);
            await profilePage.userEditSubmit.click();

            await expect(page.getByText(oldName)).toBeVisible();
        });

        test('Phone edit', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rc9uy"
            });
            const newPhone: string = "+380508888888";
            const oldPhone: string = "+380507777777";

            await profilePage.userPhone.click();
            await profilePage.userEditField.fill(newPhone);
            await profilePage.userEditSubmit.click();

            await expect(page.getByText(newPhone)).toBeVisible();

            await page.waitForTimeout(2000);
            await profilePage.userPhone.click();
            await profilePage.userEditField.fill(oldPhone);
            await profilePage.userEditSubmit.click();

            await expect(page.getByText(oldPhone)).toBeVisible();
        });

        test('Password edit', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rc9y0"
            });
            const passwordCurrent: string = "lepidoptera111278DAP!@#";
            const passwordNew: string = "lepidoptera111278DAP!";

            await profilePage.userPassword.click();
            await page.waitForTimeout(2000);
            await profilePage.userEditCurrentPasswordField.fill(passwordCurrent);
            await profilePage.userEditNewPasswordField.click();
            await profilePage.userEditNewPasswordField.fill(passwordNew);
            await profilePage.userEditSubmit.click();
            await page.waitForTimeout(2000);
            await profilePage.userPassword.click();
            await page.waitForTimeout(2000);
            await profilePage.userEditCurrentPasswordField.fill(passwordNew);
            await profilePage.userEditNewPasswordField.click();
            await profilePage.userEditNewPasswordField.fill(passwordCurrent);
            await profilePage.userEditSubmit.click();

            await expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
        });

        test('Language for emails edit', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rcapf"
            });
            const languageOld: string = "English";
            const languageNew: string = "French";

            await profilePage.userLanguageForEmails.click();
            await page.getByText(languageNew).click();
            await profilePage.saveButton.click();

            await expect(page.getByText(languageNew)).toBeVisible();

            await page.waitForTimeout(2000);
            await profilePage.userLanguageForEmails.click();
            await page.getByText(languageOld).click();
            await profilePage.saveButton.click();

            await expect(page.getByText(languageOld)).toBeVisible();
        });

        test('Language edit', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694f8kwd"
            });

            const languageNew: string = "FR";
            const languageOld: string = "EN";
            const newTitle: string = "Mon profil";
            const oldTitle: string = "My profile";

            await profilePage.languageChoice.click();
            await page.getByText(languageNew, { exact: true }).click();

            await expect(page.getByRole('heading', {name: newTitle})).toBeVisible();

            await page.waitForTimeout(2000);
            await profilePage.languageChoice.click();
            await page.getByText(languageOld, { exact: true }).click();

            await expect(page.getByRole('heading', {name: oldTitle})).toBeVisible();
        });

        test('Support', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rcauf"
            });

            const supportText: string = "You can send your question or message to the technical support service at:";
            const supportEmail: string = "support@u-prox.systems";

            await profilePage.feedback.click();

            await expect(page.getByText(supportText)).toBeVisible();
            await expect(page.getByText(supportEmail)).toBeVisible();
        });
    });
});