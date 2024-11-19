import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {DILER, SERVICE_COMPANY_1, SUPER_ADMIN} from "../../utils/user_data";
import {
    CABINET_FIRST,
    CABINET_SECOND,
    COMPANY_EMAIL_NEW,
    COMPANY_SERVICE_EMAIL_OLD,
    COMPANY_PHONE_NEW,
    COMPANY_SERVICE_PHONE_OLD,
    COUNTRY_MOLDOVA,
    COUNTRY_MOLDOVA_SHORT,
    COUNTRY_UKRAINE,
    LANGUAGE_ENGLISH_SHORT,
    LANGUAGE_FRENCH,
    LANGUAGE_FRENCH_SHORT,
    LANGUAGE_UKRAINIAN,
    SETTINGS_ALARMS_RESTORES,
    SETTINGS_ALLOWED,
    SETTINGS_ARMS_DISARM,
    SETTINGS_ARMS_DISARMS_ALARMS_RESTORES,
    SETTINGS_DENIED,
    TEXT_ADD_LOCALIZATION,
    TEXT_DELETE,
    TEXT_ENTER_THE_LINK,
    TITLE_COMPANY_SETTINGS,
    TITLE_COMPANY_SETTINGS_FRENCH,
    URL_LOGIN,
    URL_PANELS,
    COMPANY_MONITORING_SERVICE_NAME_NEW,
    COMPANY_MONITORING_SERVICE_DESCRIPTION_NEW,
    COMPANY_MONITORING_SERVICE_CONTACTS_NEW,
    COMPANY_MONITORING_SERVICE_NAME_OLD,
    COMPANY_MONITORING_SERVICE_DESCRIPTION_OLD,
    COMPANY_MONITORING_SERVICE_CONTACTS_OLD,
    COMPANY_SERVICE_CONTACTS_NEW,
    COMPANY_SERVICE_DESCRIPTION_NEW,
    COMPANY_SERVICE_NAME_NEW,
    COMPANY_SERVICE_CONTACTS_OLD,
    COMPANY_SERVICE_DESCRIPTION_OLD,
    COMPANY_SERVICE_NAME_OLD,
    LANGUAGE_DUTCH,
    URL_SUPPORT_SEARCH,
    TITLE_MY_PROFILE,
    SUPER_ADMIN_NAME_NEW,
    SUPER_ADMIN_NAME_OLD,
    SUPER_ADMIN_PHONE_NEW,
    SUPER_ADMIN_PHONE_OLD,
    TEXT_ROLE,
    TEXT_EMAIL,
    URL_DEALER_COMPANIES,
    DEALER_NAME_NEW,
    DEALER_NAME_OLD,
    DEALER_PHONE_NEW,
    DEALER_PHONE_OLD,
    USER_PASSWORD_OLD,
    USER_PASSWORD_NEW, PASSWORD_TEXT, USER_PASSWORD_FIRST
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import {SuperAdminPage} from "../../pages/superAdmin/SuperAdminPage";

test.describe('Company Page test', () => {

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
        await loginPage.auth(DILER);
        await expect(page).toHaveURL(URL_DEALER_COMPANIES);
    });

    test.describe('Checking UI elements of the page', {tag: ['@smoke']}, () => {

        test('Checking UI elements on Dealer profile page', {tag: ['@smoke']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await profilePage.myProfileButton.click();

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
    });
    test.describe('Dealer profile editing', () => {

        test('Dealer name editing', {tag: ['@smoke']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8696kbjbx"
            });

            await profilePage.myProfileButton.click();

            await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();

            await page.waitForTimeout(2000);

            if (await superAdminPage.profileNameBlock.filter({hasText: DEALER_NAME_NEW}).isVisible()) {
                await superAdminPage.profileNameBlock.click();
                await superAdminPage.inputFirstField.fill(DEALER_NAME_OLD);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.profileNameBlock.filter({hasText: DEALER_NAME_OLD})).toBeVisible();
            } else {
                await superAdminPage.profileNameBlock.click();

                await superAdminPage.inputFirstField.fill(DEALER_NAME_NEW);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileNameBlock.filter({hasText: DEALER_NAME_NEW})).toBeVisible();

                await superAdminPage.profileNameBlock.click();
                await superAdminPage.inputFirstField.fill(DEALER_NAME_OLD);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileNameBlock.filter({hasText: DEALER_NAME_OLD})).toBeVisible();
            }
        });

        test('Dealer contact phone editing', {tag: ['@smoke']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8696kbq7d"
            });

            await profilePage.myProfileButton.click();

            await expect(page.getByText(TITLE_MY_PROFILE)).toBeVisible();

            await page.waitForTimeout(2000);

            if (await superAdminPage.profilePhoneBlock.filter({hasText: DEALER_PHONE_NEW}).isVisible()) {
                await superAdminPage.profilePhoneBlock.click();
                await superAdminPage.inputField.fill(DEALER_PHONE_OLD);
                await superAdminPage.changeButton.click();

                await expect(page.getByText(DEALER_PHONE_OLD)).toBeVisible();
            } else {
                await superAdminPage.profilePhoneBlock.click();

                await superAdminPage.inputField.fill(DEALER_PHONE_NEW);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(page.getByText(DEALER_PHONE_NEW)).toBeVisible();

                await superAdminPage.profilePhoneBlock.click();
                await superAdminPage.inputField.fill(DEALER_PHONE_OLD);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(page.getByText(DEALER_PHONE_OLD)).toBeVisible();
            }
        });

        test('Language for emails edit: dealer profile', {tag: ['@smoke']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8696kbzvb"
            });

            await profilePage.myProfileButton.click();
            await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();

            await page.waitForTimeout(2000);

            if (await superAdminPage.profileLanguageBlock.filter({hasText: LANGUAGE_FRENCH}).isVisible()) {
                await superAdminPage.profileLanguageBlock.click();
                await page.getByText(LANGUAGE_UKRAINIAN).click();
                await superAdminPage.saveButton.click();
                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileLanguageBlock.filter({hasText: LANGUAGE_UKRAINIAN})).toBeVisible();
            } else {
                await superAdminPage.profileLanguageBlock.click();

                await page.getByText(LANGUAGE_FRENCH).click();
                await superAdminPage.saveButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileLanguageBlock.filter({hasText: LANGUAGE_FRENCH})).toBeVisible();

                await superAdminPage.profileLanguageBlock.click();
                await page.getByText(LANGUAGE_UKRAINIAN).click();
                await superAdminPage.saveButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileLanguageBlock.filter({hasText: LANGUAGE_UKRAINIAN})).toBeVisible();
            }
        });

        test.skip('Dealer password editing', {tag: ['@smoke']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8696kbtfx"
            });

            await profilePage.myProfileButton.click();
            await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();

            await page.waitForTimeout(2000);

            await profilePage.userPassword.click();
            await profilePage.userEditCurrentPasswordField.fill(USER_PASSWORD_FIRST);
            await profilePage.userEditNewPasswordField.click();
            await profilePage.userEditNewPasswordField.fill(USER_PASSWORD_NEW);
            await profilePage.changeButton.click();

            await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();

            await profilePage.userPassword.click();
            await profilePage.userEditCurrentPasswordField.fill(USER_PASSWORD_NEW);
            await profilePage.userEditNewPasswordField.click();
            await profilePage.userEditNewPasswordField.fill(USER_PASSWORD_FIRST);
            await profilePage.changeButton.click();
            await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
        });

    });

});