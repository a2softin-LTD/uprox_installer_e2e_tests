import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {DILER_1, ENGINEER, MANAGER_1} from "../../utils/user_data";
import {
    LANGUAGE_FRENCH,
    LANGUAGE_UKRAINIAN,
    URL_LOGIN,
    TITLE_MY_PROFILE,
    TEXT_ROLE,
    TEXT_EMAIL,
    URL_DEALER_COMPANIES,
    DEALER_NAME_NEW,
    DEALER_1_NAME_NEW,
    DEALER_1_NAME_OLD,
    DEALER_1_PHONE_NEW,
    DEALER_1_PHONE_OLD,
    URL_PROFILE_PANELS,
    MANAGER_1_NAME_NEW,
    MANAGER_1_NAME_OLD,
    MANAGER_1_PHONE_OLD,
    MANAGER_1_PHONE_NEW,
    SUPPORT_TEXT,
    SUPPORT_EMAIL,
    URL_PROFILE_FEEDBACK,
    ENGINEER_NAME_NEW, ENGINEER_NAME_OLD, ENGINEER_PHONE_NEW, ENGINEER_PHONE_OLD
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import {SuperAdminPage} from "../../pages/superAdmin/SuperAdminPage";

test.describe('Company Page test', { tag: ['@stable']},() => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let superAdminPage: SuperAdminPage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        superAdminPage = new SuperAdminPage(page);
        companyPage = new CompanyPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(ENGINEER);
        await expect(page).toHaveURL(URL_PROFILE_FEEDBACK);
    });

    test('Checking UI elements on Engineer profile page', {tag: ['@smoke']}, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        await expect(companyPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
        await expect(page.getByText(TEXT_ROLE)).toBeVisible();
        await expect(page.getByText(TEXT_EMAIL,{exact:true})).toBeVisible();
        await expect(profilePage.userPassword).toBeVisible();
        await expect(profilePage.userDeleteAccount).toBeVisible();
        await expect(superAdminPage.profilePhoneBlock).toBeVisible();
        await expect(superAdminPage.profileLanguageBlock).toBeVisible();
        await expect(superAdminPage.profileNameBlock).toBeVisible();
        await expect(superAdminPage.feedback).toBeVisible();
        await expect(profilePage.message).toBeVisible();
    });

    test.describe('Engineer profile editing', () => {

        test('Engineer name editing', {tag: ['@smoke']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            if (await superAdminPage.profileNameBlock.filter({hasText: ENGINEER_NAME_NEW}).isVisible()) {
                await superAdminPage.profileNameBlock.click();
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.inputFirstField.fill(ENGINEER_NAME_OLD);
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.profileNameBlock.filter({hasText: ENGINEER_NAME_OLD})).toBeVisible();
            } else {
                await superAdminPage.profileNameBlock.click();
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.inputFirstField.fill(ENGINEER_NAME_NEW);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileNameBlock.filter({hasText: ENGINEER_NAME_NEW})).toBeVisible();

                await superAdminPage.profileNameBlock.click();
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.inputFirstField.fill(ENGINEER_NAME_OLD);
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileNameBlock.filter({hasText: ENGINEER_NAME_OLD})).toBeVisible();
            }
        });

        test('Engineer contact phone editing', {tag: ['@smoke']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            if (await superAdminPage.profilePhoneBlock.filter({hasText: ENGINEER_PHONE_NEW}).isVisible()) {
                await superAdminPage.profilePhoneBlock.click();
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.inputField.fill(ENGINEER_PHONE_OLD);
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.changeButton.click();

                await expect(page.getByText(ENGINEER_PHONE_OLD)).toBeVisible();
            } else {
                await superAdminPage.profilePhoneBlock.click();

                await superAdminPage.inputField.fill(ENGINEER_PHONE_NEW);
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(page.getByText(ENGINEER_PHONE_NEW)).toBeVisible();

                await superAdminPage.profilePhoneBlock.click();
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.inputField.fill(ENGINEER_PHONE_OLD);
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(page.getByText(ENGINEER_PHONE_OLD)).toBeVisible();
            }
        });

        test('Language for emails edit: Engineer profile', {tag: ['@smoke']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            if (await superAdminPage.profileLanguageBlock.filter({hasText: LANGUAGE_FRENCH}).isVisible()) {
                await superAdminPage.profileLanguageBlock.click();
                await page.waitForLoadState('domcontentloaded');
                await page.getByText(LANGUAGE_UKRAINIAN).click();
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.saveButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileLanguageBlock.filter({hasText: LANGUAGE_UKRAINIAN})).toBeVisible();
            } else {
                await superAdminPage.profileLanguageBlock.click();
                await page.waitForLoadState('domcontentloaded');
                await page.getByText(LANGUAGE_FRENCH).click();
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.saveButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileLanguageBlock.filter({hasText: LANGUAGE_FRENCH})).toBeVisible();

                await superAdminPage.profileLanguageBlock.click();
                await page.waitForLoadState('domcontentloaded');
                await page.getByText(LANGUAGE_UKRAINIAN).click();
                await page.waitForLoadState('domcontentloaded');
                await superAdminPage.saveButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileLanguageBlock.filter({hasText: LANGUAGE_UKRAINIAN})).toBeVisible();
            }
        });

        test('Support and messages: Engineer profile', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8696uya0z"
            });

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

    });

});