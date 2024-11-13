import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SERVICE_COMPANY_1 } from "../../utils/user_data";
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
    COMPANY_SERVICE_DESCRIPTION_OLD, COMPANY_SERVICE_NAME_OLD, LANGUAGE_DUTCH
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";

test.describe('Company Page test', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(SERVICE_COMPANY_1);
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test('Checking UI elements of the service company page', { tag: ['@smoke']  },async ({ page }) => {
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
            await expect(companyPage.companyEventCategories).toBeVisible();
            await expect(companyPage.companyGuestEngineers).toBeVisible();
            await expect(companyPage.companyAbout).toBeVisible();
            await expect(companyPage.companyInfoName).toBeVisible();
            await expect(companyPage.companyInfoDescription).toBeVisible();
            await expect(companyPage.companyInfoContacts).toBeVisible();
            await expect(companyPage.company).toBeVisible();
            await expect(companyPage.employees).toBeVisible();
            await expect(companyPage.panels).toBeVisible();
            await expect(companyPage.requests).toBeVisible();
            await expect(companyPage.history).toBeVisible();
            await expect(companyPage.requests).toBeVisible();
            await expect(profilePage.myProfileButton).toBeVisible();
            await expect(profilePage.logoutButton).toBeVisible();
            await expect(profilePage.languageChoice).toBeVisible();
    });

    test.describe('Company profile edit:service company',  () => {

        test('Company contact email editing:service company', { tag: ['@smoke'] },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhnuq"
            });

            await companyPage.company.click();

            await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible();

            await page.waitForTimeout(2000);

            if (await companyPage.companyContactEmail.filter({hasText:COMPANY_EMAIL_NEW}).isVisible()){
                await companyPage.companyContactEmail.click();
                await companyPage.inputFirstField.fill(COMPANY_SERVICE_EMAIL_OLD);
                await companyPage.saveButton.click();

                await expect(page.getByText(COMPANY_SERVICE_EMAIL_OLD)).toBeVisible();}

            else {await companyPage.companyContactEmail.click();

            await companyPage.inputFirstField.fill(COMPANY_EMAIL_NEW);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_EMAIL_NEW)).toBeVisible();

            await companyPage.companyContactEmail.click();
            await companyPage.inputFirstField.fill(COMPANY_SERVICE_EMAIL_OLD);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_EMAIL_OLD)).toBeVisible();}
        });

        test('Company contact phone editing: service', { tag: ['@smoke']  },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhp23"
            });

            await companyPage.company.click();

            await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible();

            await page.waitForTimeout(2000);

            if (await companyPage.companyContactPhone.filter({hasText:COMPANY_PHONE_NEW}).isVisible()){
                await companyPage.companyContactPhone.click();
                await companyPage.inputFirstField.fill(COMPANY_SERVICE_PHONE_OLD);
                await companyPage.saveButton.click();

                await expect(page.getByText(COMPANY_SERVICE_PHONE_OLD)).toBeVisible();}

            else {await companyPage.companyContactPhone.click();

            await companyPage.inputFirstField.fill(COMPANY_PHONE_NEW);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_PHONE_NEW)).toBeVisible();

            await companyPage.companyContactPhone.click();
            await companyPage.inputFirstField.fill(COMPANY_SERVICE_PHONE_OLD);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_PHONE_OLD)).toBeVisible();}
        });

        test('Language for emails edit', { tag: ['@smoke']  },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhp9y"
            });

            await companyPage.company.click();
            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);

            if (await companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_FRENCH}).isVisible()){
                await companyPage.companyLanguageForEmails.click();
                await page.getByText(LANGUAGE_UKRAINIAN).click();
                await companyPage.saveButton.click();
                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
                await expect(companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_UKRAINIAN})).toBeVisible();}

            else { await companyPage.companyLanguageForEmails.click();

            await page.getByText(LANGUAGE_FRENCH).click();
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_FRENCH})).toBeVisible();

            await companyPage.companyLanguageForEmails.click();
            await page.getByText(LANGUAGE_UKRAINIAN).click();
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_UKRAINIAN})).toBeVisible();}
        });

        test('Language of page editing', { tag: ['@smoke']  },async ({ page }) => {
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

        test('Another settings editing:service company', { tag: ['@smoke']  },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhpj3"
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
            await page.waitForTimeout(3000);
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

        test('Add/change service company logo', { tag: ['@smoke']  },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhptt"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyChangeLogoButton.setInputFiles("./test-data/logo.jpg");

            await expect(companyPage.companyDefaultLogo).not.toBeVisible();

            await companyPage.companyDeleteLogoButton.click();

            await expect(companyPage.companyDefaultLogo.last()).toBeVisible();
        });

        test('Delete service company logo', { tag: ['@smoke']  },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhptt"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyChangeLogoButton.setInputFiles("./test-data/logo.jpg");

            await expect(companyPage.companyDefaultLogo).not.toBeVisible();

            await companyPage.companyDeleteLogoButton.click();

            await expect(companyPage.companyDefaultLogo.last()).toBeVisible();
        });

        test('Information about company editing:service',
            { tag: ['@smoke', '@stable', '@company']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhqa6"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyInfoName.click();
            await companyPage.companyInfoNameField.fill(COMPANY_SERVICE_NAME_NEW);
            await companyPage.companyInfoDescriptionField.fill(COMPANY_SERVICE_DESCRIPTION_NEW);
            await companyPage.companyInfoContactsField.fill(COMPANY_SERVICE_CONTACTS_NEW);
            await companyPage.saveButton.click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_NAME_NEW).last()).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_CONTACTS_NEW)).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_DESCRIPTION_NEW)).toBeVisible();

            await companyPage.companyInfoName.click();
            await companyPage.companyInfoNameField.fill(COMPANY_SERVICE_NAME_OLD);
            await companyPage.companyInfoDescriptionField.fill(COMPANY_SERVICE_DESCRIPTION_OLD);
            await companyPage.companyInfoContactsField.fill(COMPANY_SERVICE_CONTACTS_OLD);
            await companyPage.saveButton.click();
            await page.waitForTimeout(2000);
            await page.reload();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_NAME_OLD).last()).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_DESCRIPTION_OLD)).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_CONTACTS_OLD)).toBeVisible();
        });

        test('Localization adding:service company',
            { tag: ['@smoke', '@stable', '@company']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhqhp"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyAbout.click();
            if (await (page.getByText(LANGUAGE_DUTCH)).isVisible()){
                await page.getByText(LANGUAGE_DUTCH).click();
                await companyPage.companyDeleteLocalizationButton.click();
                await page.getByText(TEXT_DELETE, {exact: true}).click();

                await expect(page.getByText(LANGUAGE_DUTCH).first()).not.toBeVisible();}

            await companyPage.companyAddLocalizationButton.click();

            await expect(page.getByText(TEXT_ADD_LOCALIZATION)).toBeVisible();

            await companyPage.companyInfoLocalizationLanguageField.click();
            await page.getByText(LANGUAGE_DUTCH).click();
            await companyPage.companyInfoNameField.fill(COMPANY_SERVICE_NAME_NEW);
            await companyPage.companyInfoDescriptionField.fill(COMPANY_SERVICE_DESCRIPTION_NEW);
            await companyPage.companyInfoContactsField.fill(COMPANY_SERVICE_CONTACTS_NEW);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);
            await page.getByText(LANGUAGE_DUTCH).click();

            await expect(page.getByText(COMPANY_SERVICE_NAME_NEW).last()).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_CONTACTS_NEW)).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_DESCRIPTION_NEW)).toBeVisible();

            await companyPage.companyDeleteLocalizationButton.click();
            await page.getByText(TEXT_DELETE,{ exact: true }).click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(LANGUAGE_DUTCH)).not.toBeVisible();
        });

        test('Localization deleting:service company',
            { tag: ['@smoke', '@stable', '@company']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhqrc"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyAbout.click();
                if (await (page.getByText(LANGUAGE_DUTCH)).isVisible())
                   {await page.getByText(LANGUAGE_DUTCH).click();
                    await companyPage.companyDeleteLocalizationButton.click();
                    await page.getByText(TEXT_DELETE, {exact: true}).click();

                    await expect(page.getByText(LANGUAGE_DUTCH).first()).not.toBeVisible();}

                await companyPage.companyAddLocalizationButton.click();

                await expect(page.getByText(TEXT_ADD_LOCALIZATION)).toBeVisible();

                await companyPage.companyInfoLocalizationLanguageField.click();
                await page.getByText(LANGUAGE_DUTCH).click();
                await companyPage.companyInfoNameField.fill(COMPANY_SERVICE_NAME_NEW);
                await companyPage.companyInfoDescriptionField.fill(COMPANY_SERVICE_DESCRIPTION_NEW);
                await companyPage.companyInfoContactsField.fill(COMPANY_SERVICE_CONTACTS_NEW);
                await companyPage.saveButton.click();

                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

                await page.waitForTimeout(2000);
                await page.reload();
                await page.waitForTimeout(2000);

                await page.getByText(LANGUAGE_DUTCH).click();

                await expect(page.getByText(COMPANY_SERVICE_NAME_NEW).last()).toBeVisible();
                await expect(page.getByText(COMPANY_SERVICE_CONTACTS_NEW)).toBeVisible();
                await expect(page.getByText(COMPANY_SERVICE_DESCRIPTION_NEW)).toBeVisible();

                await companyPage.companyDeleteLocalizationButton.click();
                await page.getByText(TEXT_DELETE,{ exact: true }).click();
                await page.waitForTimeout(2000);
                page.reload();
                await page.waitForTimeout(2000);

                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
                await expect(page.getByText(LANGUAGE_DUTCH)).not.toBeVisible();
        });

    });

});