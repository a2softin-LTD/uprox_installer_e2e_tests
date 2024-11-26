import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { MONITORING_SERVICE_COMPANY_1 } from "../../utils/user_data";
import {
    CABINET_FIRST,
    CABINET_SECOND,
    COMPANY_EMAIL_NEW,
    COMPANY_MONITORING_SERVICE_CONTACTS_NEW, COMPANY_MONITORING_SERVICE_CONTACTS_OLD,
    COMPANY_MONITORING_SERVICE_DESCRIPTION_NEW,
    COMPANY_MONITORING_SERVICE_DESCRIPTION_OLD,
    COMPANY_MONITORING_SERVICE_EMAIL_OLD,
    COMPANY_MONITORING_SERVICE_NAME_NEW,
    COMPANY_MONITORING_SERVICE_NAME_OLD,
    COMPANY_MONITORING_SERVICE_PHONE_OLD,
    COMPANY_PHONE_NEW,
    COUNTRY_MOLDOVA,
    COUNTRY_MOLDOVA_SHORT,
    COUNTRY_UKRAINE,
    LANGUAGE_DUTCH,
    LANGUAGE_ENGLISH,
    LANGUAGE_ENGLISH_SHORT,
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
    URL_PANELS
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";

test.describe('Company Page test', () => {

    let loginPage: LoginPage;
    let companyPage: CompanyPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        companyPage = new CompanyPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN)
        await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test('Checking UI elements on the page', { tag: '@smoke' }, async ({page}) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });
        await companyPage.company.click();

        await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
        await expect(companyPage.companySettingsTitle).toBeVisible();
        await expect(companyPage.companyChangeLogoButton).toBeVisible();
        await expect(companyPage.companyContactEmail).toBeVisible();
        await expect(companyPage.companyContactPhone).toBeVisible();
        await expect(companyPage.companyCountry).toBeVisible();
        await expect(companyPage.companyUsersCabinet).toBeVisible();
        await expect(companyPage.companyDisplayInAdvertising).toBeVisible();
        await expect(companyPage.companyLanguageForEmails).toBeVisible();
        await expect(companyPage.companyGuestEngineers).toBeVisible();
        await expect(companyPage.companyEventCategories).toBeVisible();
        await expect(companyPage.companyInfoName).toBeVisible();
        await expect(companyPage.companyInfoDescription).toBeVisible();
        await expect(companyPage.companyInfoContacts).toBeVisible();
        await expect(companyPage.company).toBeVisible();
        await expect(companyPage.employees).toBeVisible();
        await expect(companyPage.panels).toBeVisible();
        await expect(companyPage.requests).toBeVisible();
        await expect(companyPage.history).toBeVisible();
        await expect(profilePage.myProfileButton).toBeVisible();
        await expect(profilePage.logoutButton).toBeVisible();
        await expect(profilePage.languageChoice).toBeVisible();
        await expect(companyPage.companyAbout).toBeVisible();
        await expect(companyPage.companyServerList).toBeVisible();
        await expect(companyPage.companyIntegration).toBeVisible();
        await expect(companyPage.companyAdditionalSoftware).toBeVisible();
    });

    test.describe('Company profile edit.', () => {

        test('Company contact email editing: monitoring-service company', { tag: '@smoke' }, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nru21"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);
            if (await companyPage.companyContactEmail.filter({hasText:COMPANY_EMAIL_NEW}).isVisible()){
                await companyPage.companyContactEmail.click();
                await companyPage.inputFirstField.fill(COMPANY_MONITORING_SERVICE_EMAIL_OLD);
                await companyPage.saveButton.click();

                await expect(page.getByText(COMPANY_MONITORING_SERVICE_EMAIL_OLD)).toBeVisible();}

            else {await companyPage.companyContactEmail.click();

            await companyPage.inputFirstField.fill(COMPANY_EMAIL_NEW);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_EMAIL_NEW)).toBeVisible();

            await page.waitForTimeout(2000);
            await companyPage.companyContactEmail.click();
            await companyPage.inputFirstField.fill(COMPANY_MONITORING_SERVICE_EMAIL_OLD);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_SERVICE_EMAIL_OLD).last()).toBeVisible();}
        });

        test('Company contact phone editing: monitoring-service company', { tag: '@smoke' }, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nru3m"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await page.waitForTimeout(2000);

            if (await companyPage.companyContactPhone.filter({hasText:COMPANY_PHONE_NEW}).isVisible()){
                await companyPage.companyContactPhone.click();
                await companyPage.inputFirstField.fill(COMPANY_MONITORING_SERVICE_PHONE_OLD);
                await companyPage.saveButton.click();

                await expect(page.getByText(COMPANY_MONITORING_SERVICE_PHONE_OLD)).toBeVisible();}

            else {await companyPage.companyContactPhone.click();

            await companyPage.inputFirstField.fill(COMPANY_PHONE_NEW);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_PHONE_NEW)).toBeVisible();

            await companyPage.companyContactPhone.click();
            await companyPage.inputFirstField.fill(COMPANY_MONITORING_SERVICE_PHONE_OLD);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_SERVICE_PHONE_OLD)).toBeVisible();}
        });

        test('Language for emails edit: monitoring-service company', { tag: '@smoke' }, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nru86"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);

            if (await companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_DUTCH}).isVisible()){
                await companyPage.companyLanguageForEmails.click();
                await page.getByText(LANGUAGE_ENGLISH).click();
                await companyPage.saveButton.click();

                await expect(companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_ENGLISH})).toBeVisible();}

            else {await companyPage.companyLanguageForEmails.click();
                await page.getByText(LANGUAGE_DUTCH).click();
                await companyPage.saveButton.click();
                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
                await expect(companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_DUTCH})).toBeVisible();

                await companyPage.companyLanguageForEmails.click();
                await page.getByText(LANGUAGE_ENGLISH).click();
                await companyPage.saveButton.click();

                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
                await expect(companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_ENGLISH})).toBeVisible();}
        });

        test('Language of page editing: monitoring-service company', { tag: '@smoke' }, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await companyPage.company.click();
            await profilePage.languageChoice.click();
            await page.getByText(LANGUAGE_FRENCH_SHORT, { exact: true }).click();

            await expect(page.getByRole('heading', {name: TITLE_COMPANY_SETTINGS_FRENCH})).toBeVisible();

            await profilePage.languageChoice.click();
            await page.getByText(LANGUAGE_ENGLISH_SHORT, { exact: true }).click();

            await expect(page.getByRole('heading', {name: TITLE_COMPANY_SETTINGS})).toBeVisible();
        });

        test('Another settings editing: monitoring-service company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nrufc"
            });

            await companyPage.company.click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible();

            await page.waitForTimeout(2000);

            if (await companyPage.companyCountry.filter({hasText:COUNTRY_MOLDOVA}).isVisible())
            {   await companyPage.companyCountry.click();
                await companyPage.inputField.clear();
                await companyPage.inputField.fill(COUNTRY_UKRAINE);
                await page.getByText(COUNTRY_UKRAINE, {exact: true}).click();
                await companyPage.submitButton.click();
                await expect(companyPage.companyCountry.filter({hasText:COUNTRY_UKRAINE})).toBeVisible();}

            await companyPage.companyCountry.click();
            await companyPage.inputField.clear();
            await companyPage.inputField.fill(COUNTRY_MOLDOVA_SHORT);
            await page.getByText(COUNTRY_MOLDOVA, {exact: true}).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);

            if (await companyPage.companyUsersCabinet.filter({hasText:CABINET_SECOND}).isVisible()){
                await companyPage.companyUsersCabinet.click();
                await companyPage.inputFirstField.first().fill(CABINET_FIRST);
                await companyPage.submitButton.click();

                await expect(companyPage.companyUsersCabinet.filter({hasText:CABINET_FIRST})).toBeVisible();}

            await companyPage.companyUsersCabinet.click();

            await expect(page.getByText(TEXT_ENTER_THE_LINK)).toBeVisible();

            await companyPage.inputField.first().fill(CABINET_SECOND);
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            if (await companyPage.companyGuestEngineers.filter({hasText:SETTINGS_DENIED}).isVisible()){
                await companyPage.companyGuestEngineers.click();
                await page.getByText(SETTINGS_ALLOWED).first().click();
                await companyPage.submitButton.click();

                await expect(companyPage.companyGuestEngineers.filter({hasText:SETTINGS_ALLOWED})).toBeVisible();}

            await companyPage.companyGuestEngineers.click();
            await page.getByText(SETTINGS_DENIED).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            if (await companyPage.companyEventCategories.filter({hasText:SETTINGS_ALARMS_RESTORES}).filter({hasNotText:SETTINGS_ARMS_DISARM}).isVisible()){
                await companyPage.companyEventCategories.click();
                await page.getByText(SETTINGS_ARMS_DISARM, { exact: true }).click();
                await companyPage.submitButton.click();
                await expect(companyPage.companyEventCategories.filter({hasText:SETTINGS_ARMS_DISARMS_ALARMS_RESTORES})).toBeVisible();}

            await companyPage.companyEventCategories.click();
            await page.getByText(SETTINGS_ARMS_DISARM, { exact: true }).click();
            await companyPage.submitButton.click();

            await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible();
            await expect(page.getByText(COUNTRY_MOLDOVA)).toBeVisible();
            await expect(page.getByText(CABINET_SECOND)).toBeVisible();
            await expect(page.getByText(SETTINGS_DENIED)).toBeVisible();
            await expect(page.getByText(SETTINGS_ALARMS_RESTORES)).toBeVisible();

            await companyPage.companyCountry.click();
            await companyPage.inputField.fill(COUNTRY_UKRAINE);
            await page.getByText(COUNTRY_UKRAINE).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyUsersCabinet.click();

            await expect(page.getByText(TEXT_ENTER_THE_LINK)).toBeVisible();

            await companyPage.inputField.fill(CABINET_FIRST);
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyGuestEngineers.click();
            await page.getByText(SETTINGS_ALLOWED).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyEventCategories.click();
            await page.getByText(SETTINGS_ARMS_DISARM,{ exact: true }).click();
            await companyPage.submitButton.click();

            await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible();
            await expect(page.getByText(COUNTRY_UKRAINE)).toBeVisible();
            await expect(page.getByText(CABINET_FIRST)).toBeVisible();
            await expect(page.getByText(SETTINGS_ALLOWED)).toBeVisible();
            await expect(page.getByText(SETTINGS_ARMS_DISARMS_ALARMS_RESTORES)).toBeVisible();

        });

        test('Add or change monitoring-service company logo', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nruh0"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyChangeLogoButton.setInputFiles("./test-data/logo.jpg");
            await page.waitForTimeout(2000);

            await expect(companyPage.companyDefaultLogo).not.toBeVisible();

            await companyPage.companyDeleteLogoButton.click();
            await page.waitForTimeout(2000);

            await expect(companyPage.companyDefaultLogo.last()).toBeVisible();
        });

        test('Delete monitoring-service company logo', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nrun3"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyChangeLogoButton.setInputFiles("./test-data/logo.jpg");
            await page.waitForTimeout(2000);

            await expect(companyPage.companyDefaultLogo).not.toBeVisible();

            await companyPage.companyDeleteLogoButton.click();
            await page.waitForTimeout(2000);

            await expect(companyPage.companyDefaultLogo.last()).toBeVisible();
        });

        test('Information about company editing: monitoring-service  company',
            { tag: ['@smoke', '@stable', '@company']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nruut"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyInfoName.click();
            await companyPage.companyInfoNameField.click();
            await companyPage.companyInfoNameField.fill(COMPANY_MONITORING_SERVICE_NAME_NEW);
            await companyPage.companyInfoDescriptionField.click();
            await companyPage.companyInfoDescriptionField.fill(COMPANY_MONITORING_SERVICE_DESCRIPTION_NEW);
            await companyPage.companyInfoContactsField.fill(COMPANY_MONITORING_SERVICE_CONTACTS_NEW);
            await companyPage.saveButton.click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_SERVICE_NAME_NEW).last()).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_SERVICE_CONTACTS_NEW)).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_SERVICE_DESCRIPTION_NEW)).toBeVisible();

            await companyPage.companyInfoName.click();
            await companyPage.companyInfoNameField.fill(COMPANY_MONITORING_SERVICE_NAME_OLD);
            await companyPage.companyInfoDescriptionField.fill(COMPANY_MONITORING_SERVICE_DESCRIPTION_OLD);
            await companyPage.companyInfoContactsField.fill(COMPANY_MONITORING_SERVICE_CONTACTS_OLD);
            await companyPage.saveButton.click();
            await page.waitForTimeout(2000);
            await page.reload();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_SERVICE_NAME_OLD).last()).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_SERVICE_DESCRIPTION_OLD)).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_SERVICE_CONTACTS_OLD)).toBeVisible();
        });

        test('Localization adding: monitoring-service company',
            { tag: ['@smoke', '@stable', '@company']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nruya"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);

            if (await (page.getByText(LANGUAGE_UKRAINIAN)).isVisible()){
                await page.getByText(LANGUAGE_UKRAINIAN).click();
                await companyPage.companyDeleteLocalizationButton.click();
                await page.getByText(TEXT_DELETE, {exact: true}).click();

                await expect(page.getByText(LANGUAGE_UKRAINIAN).first()).not.toBeVisible();}

            await companyPage.companyAddLocalizationButton.click();
            await companyPage.companyInfoLocalizationLanguageField.click();

            await expect(page.getByText(TEXT_ADD_LOCALIZATION)).toBeVisible();

            await page.getByText(LANGUAGE_UKRAINIAN).click();
            await companyPage.companyInfoNameField.fill(COMPANY_MONITORING_SERVICE_NAME_NEW);
            await companyPage.companyInfoDescriptionField.fill(COMPANY_MONITORING_SERVICE_DESCRIPTION_NEW);
            await companyPage.companyInfoContactsField.fill(COMPANY_MONITORING_SERVICE_CONTACTS_NEW);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);

            await page.getByText(LANGUAGE_UKRAINIAN).click();

            await expect(page.getByText(COMPANY_MONITORING_SERVICE_NAME_NEW).last()).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_SERVICE_CONTACTS_NEW)).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_SERVICE_DESCRIPTION_NEW)).toBeVisible();

            await companyPage.companyDeleteLocalizationButton.click();
            await page.getByText(TEXT_DELETE, {exact: true}).click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(LANGUAGE_UKRAINIAN).first()).not.toBeVisible();
        });

        test('Localization deleting: monitoring-service company',
            { tag: ['@smoke', '@stable', '@company']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nrv0m"
            });

                await companyPage.company.click();

                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

                await page.waitForTimeout(2000);

                if (await (page.getByText(LANGUAGE_UKRAINIAN)).isVisible()){
                    await page.getByText(LANGUAGE_UKRAINIAN).click();
                    await companyPage.companyDeleteLocalizationButton.click();
                    await page.getByText(TEXT_DELETE, {exact: true}).click();

                    await expect(page.getByText(LANGUAGE_UKRAINIAN).first()).not.toBeVisible();}

                await companyPage.companyAddLocalizationButton.click();
                await companyPage.companyInfoLocalizationLanguageField.click();

                await expect(page.getByText(TEXT_ADD_LOCALIZATION)).toBeVisible();

                await page.getByText(LANGUAGE_UKRAINIAN).click();
                await companyPage.companyInfoNameField.fill(COMPANY_MONITORING_SERVICE_NAME_NEW);
                await companyPage.companyInfoDescriptionField.fill(COMPANY_MONITORING_SERVICE_DESCRIPTION_NEW);
                await companyPage.companyInfoContactsField.fill(COMPANY_MONITORING_SERVICE_CONTACTS_NEW);
                await companyPage.saveButton.click();

                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

                await page.waitForTimeout(2000);
                await page.reload();
                await page.waitForTimeout(2000);
                await page.getByText(LANGUAGE_UKRAINIAN).click();

                await expect(page.getByText(COMPANY_MONITORING_SERVICE_NAME_NEW).last()).toBeVisible();
                await expect(page.getByText(COMPANY_MONITORING_SERVICE_CONTACTS_NEW)).toBeVisible();
                await expect(page.getByText(COMPANY_MONITORING_SERVICE_DESCRIPTION_NEW)).toBeVisible();

                await companyPage.companyDeleteLocalizationButton.click();
                await page.getByText(TEXT_DELETE, {exact: true}).click();

                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
                await expect(page.getByText(LANGUAGE_UKRAINIAN).first()).not.toBeVisible();
        });
    });

});