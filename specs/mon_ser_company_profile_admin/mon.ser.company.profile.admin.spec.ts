import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import {MIXED, MONITORING_SERVICE_COMPANY_1, USER_1} from "../../utils/user_data";
import {
    PASSWORD_TEXT,
    SUPPORT_EMAIL,
    SUPPORT_TEXT,
    TITLE_MY_PROFILE, TITLE_MY_PROFILE_FRENCH,
    URL_LOGIN, URL_PANELS, URL_PROFILE_PANELS,
    USER_LANGUAGE_FOR_EMAIL_NEW,
    USER_LANGUAGE_FOR_EMAIL_OLD, USER_LANGUAGE_SHORT_NEW,
    USER_LANGUAGE_SHORT_OLD,
    USER_NAME_FULL,
    USER_NAME_NEW, USER_PASSWORD_FIRST, USER_PASSWORD_NEW, USER_PASSWORD_OLD,
    USER_PHONE_NEW, USER_PHONE_NEW_MS_ADMIN,
    USER_PHONE_OLD, USER_PHONE_OLD_MS_ADMIN
} from "../../utils/constants";
import {CompanyPage} from "../../pages/company/CompanyPage";

test.describe('Profile Page tests',{ tag: ['@smoke', '@stable']},() => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
        await expect(page).toHaveURL(URL_PANELS);

        await companyPage.myprofile.click();
    });

    test('Checking UI elements on the profile page of monitoring-service company admin', { tag: '@smoke' }, async () => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(profilePage.userName).toBeVisible();
        await expect(profilePage.userRole).toBeVisible();
        await expect(profilePage.userEmail).toBeVisible();
        await expect(profilePage.userPassword).toBeVisible();
        await expect(profilePage.userLanguageForEmails).toBeVisible();
        await expect(profilePage.feedback).toBeVisible();
        await expect(profilePage.message).toBeVisible();
        await expect(profilePage.myProfileButton).toBeVisible();
        await expect(profilePage.logoutButton).toBeVisible();
        await expect(profilePage.languageChoice).toBeVisible();
        await expect(profilePage.myProfileTitle).toBeVisible();
    });

    test.describe('Profile edit: monitoring-service company admin', () => {

        test('Name edit: monitoring-service company admin', { tag: '@smoke' }, async ({ page }) => {
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

        test('Phone edit: monitoring-service company admin', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rc9uy"
            });

            await profilePage.userPhone.click();
            await profilePage.userEditField.fill(USER_PHONE_NEW_MS_ADMIN);
            await profilePage.userEditSubmit.click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
            await expect(page.getByText(USER_PHONE_NEW_MS_ADMIN)).toBeVisible();

            await profilePage.userPhone.click();
            await profilePage.userEditField.fill(USER_PHONE_OLD_MS_ADMIN);
            await profilePage.userEditSubmit.click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
            await expect(page.getByText(USER_PHONE_OLD_MS_ADMIN)).toBeVisible();
        });

        test('Language for emails edit: monitoring-service company admin', { tag: '@smoke' }, async ({ page }) => {
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

        test('Language edit: monitoring-service company admin', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694f8kwd"
            });

            await profilePage.languageChoice.click();
            await page.getByText(USER_LANGUAGE_SHORT_NEW, { exact: true }).click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE_FRENCH)})).toBeVisible();

            await profilePage.languageChoice.click();
            await page.getByText(USER_LANGUAGE_SHORT_OLD, { exact: true }).click();

            await expect(profilePage.pageTitle.filter({has:page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
        });


        test('Support and messages: monitoring-service company admin', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rcauf"
            });


            await companyPage.myprofile.click();
            await companyPage.feedback.click();

            await expect(page.getByText(SUPPORT_TEXT)).toBeVisible();
            await expect(page.getByText(SUPPORT_EMAIL)).toBeVisible();

            await profilePage.message.click();

            await page.waitForTimeout(2000);

            for (const message of await profilePage.entityBlock.all())
                await expect(message).toBeVisible();

            for (const date of await profilePage.dateBlock.all())
                await expect(date).toBeVisible();

            for (const date of await profilePage.dateBlock.all())
                await expect(date).toHaveText(/\b[0-2]?\d:[0-5]\d\b/mg);
        });

        test('Password edit: monitoring-service company admin', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678rc9y0"
            });

            await profilePage.userPassword.click();
            await profilePage.userEditCurrentPasswordField.fill(USER_PASSWORD_FIRST);
            await profilePage.userEditNewPasswordField.click();
            await profilePage.userEditNewPasswordField.fill(USER_PASSWORD_NEW);
            await profilePage.userEditSubmit.click();
            await page.waitForTimeout(3000);
            await profilePage.userPassword.click();
            await profilePage.userEditCurrentPasswordField.fill(USER_PASSWORD_NEW);
            await profilePage.userEditNewPasswordField.click();
            await profilePage.userEditNewPasswordField.fill(USER_PASSWORD_FIRST);
            await profilePage.userEditSubmit.click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(PASSWORD_TEXT)).not.toBeVisible();
        });

    });

});