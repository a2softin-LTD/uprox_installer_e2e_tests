import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { MIXED,USER_1 } from "../../utils/user_data";
import {
    PASSWORD_TEXT,
    SUPPORT_EMAIL,
    SUPPORT_TEXT,
    TITLE_MY_PROFILE,
    TITLE_MY_PROFILE_FRENCH,
    USER_LANGUAGE_FOR_EMAIL_NEW,
    USER_LANGUAGE_FOR_EMAIL_OLD, USER_LANGUAGE_SHORT_NEW,
    USER_LANGUAGE_SHORT_OLD,
    USER_NAME,
    USER_NAME_FULL,
    USER_NAME_NEW, USER_PASSWORD_NEW, USER_PASSWORD_OLD,
    USER_PHONE_NEW,
    USER_PHONE_OLD
} from "../../utils/constants";

test.describe('Profile Page tests',{ tag: ['@smoke', '@stable']},() => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
    });

    test('Checking UI elements on the Profile Page of autonomous user', { tag: '@smoke' }, async () => {
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

    test.describe('Profile edit: autonomous user', () => {

        test('Name edit: autonomous user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rc9at"
            });

            await profilePage.userName.click();
            await profilePage.userEditField.fill(USER_NAME_NEW);
            await profilePage.userEditSubmit.click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
            await expect(page.getByText(USER_NAME_NEW)).toBeVisible();

            await profilePage.userName.click();
            await profilePage.userEditField.fill(USER_NAME_FULL);
            await profilePage.userEditSubmit.click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
            await expect(page.getByText(USER_NAME_FULL)).toBeVisible();
        });

        test('Phone edit: autonomous user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rc9uy"
            });

            await profilePage.userPhone.click();
            await profilePage.userEditField.fill(USER_PHONE_NEW);
            await profilePage.userEditSubmit.click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
            await expect(page.getByText(USER_PHONE_NEW)).toBeVisible();

            await profilePage.userPhone.click();
            await profilePage.userEditField.fill(USER_PHONE_OLD);
            await profilePage.userEditSubmit.click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
            await expect(page.getByText(USER_PHONE_OLD)).toBeVisible();
        });

        test('Language for emails edit: autonomous user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rcapf"
            });

            await profilePage.userLanguageForEmails.click();
            await page.getByText(USER_LANGUAGE_FOR_EMAIL_NEW).click();
            await profilePage.saveButton.click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
            await expect(page.getByText(USER_LANGUAGE_FOR_EMAIL_NEW)).toBeVisible();

            await profilePage.userLanguageForEmails.click();
            await page.getByText(USER_LANGUAGE_FOR_EMAIL_OLD).click();
            await profilePage.saveButton.click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
            await expect(page.getByText(USER_LANGUAGE_FOR_EMAIL_OLD)).toBeVisible();
        });

        test('Language edit: autonomous user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694f8kwd"
            });

            await profilePage.languageChoice.click();
            await page.getByText(USER_LANGUAGE_SHORT_NEW, { exact: true }).click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();

            await profilePage.languageChoice.click();
            await page.getByText(USER_LANGUAGE_SHORT_OLD, { exact: true }).click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
        });

        test('Support: autonomous user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rcauf"
            });

            await profilePage.feedback.click();

            await expect(page.getByText(SUPPORT_TEXT)).toBeVisible();
            await expect(page.getByText(SUPPORT_EMAIL)).toBeVisible();
        });

        test('Support and messages: admin', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rcauf"
            });

            await profilePage.logoutButton.click();
            await loginPage.openLoginPage('/');
            await expect(page).toHaveURL('/login')
            await loginPage.auth(MIXED);
            await expect(page).toHaveURL('/panels')

            await profilePage.myProfileButton.click();
            await profilePage.feedback.click();

            await expect(page.getByText(SUPPORT_TEXT)).toBeVisible();
            await expect(page.getByText(SUPPORT_EMAIL)).toBeVisible();

            await profilePage.message.click();

            for (const message of await profilePage.entityBlock.all())
                await expect(message).toBeVisible();

            for (const message of await profilePage.entityBlock.all())
                await expect(message).toHaveText(/\b[0-2]?\d:[0-5]\d\b/mg);
        });

        test('Password edit: autonomous user', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rc9y0"
            });


            await profilePage.userPassword.click();
            await profilePage.userEditCurrentPasswordField.fill(USER_PASSWORD_OLD);
            await profilePage.userEditNewPasswordField.click();
            await profilePage.userEditNewPasswordField.fill(USER_PASSWORD_NEW);
            await profilePage.userEditSubmit.click();
            await page.waitForTimeout(3000);
            await profilePage.userPassword.click();
            await profilePage.userEditCurrentPasswordField.fill(USER_PASSWORD_NEW);
            await profilePage.userEditNewPasswordField.click();
            await profilePage.userEditNewPasswordField.fill(USER_PASSWORD_OLD);
            await profilePage.userEditSubmit.click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(PASSWORD_TEXT)).not.toBeVisible();
        });

    });

});