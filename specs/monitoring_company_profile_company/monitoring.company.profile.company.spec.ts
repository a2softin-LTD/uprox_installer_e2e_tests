import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { MONITORING_COMPANY}  from "../../utils/user_data";
import {
    CABINET_FIRST, CABINET_SECOND, COMPANY_EMAIL_NEW, COMPANY_MONITORING_CONTACTS_NEW,
    COMPANY_MONITORING_CONTACTS_OLD, COMPANY_MONITORING_DESCRIPTION_NEW,
    COMPANY_MONITORING_DESCRIPTION_OLD, COMPANY_MONITORING_EMAIL_OLD,
    COMPANY_MONITORING_NAME_NEW, COMPANY_MONITORING_NAME_OLD, COMPANY_MONITORING_PHONE_OLD,
    COMPANY_PHONE_NEW, COUNTRY_MOLDOVA, COUNTRY_MOLDOVA_SHORT, COUNTRY_UKRAINE,
    LANGUAGE_DUTCH, LANGUAGE_ENGLISH, LANGUAGE_ENGLISH_SHORT, LANGUAGE_FRENCH_SHORT, LANGUAGE_UKRAINIAN,
    TEXT_ADD_LOCALIZATION, TEXT_DELETE, TEXT_ENTER_THE_LINK, TITLE_COMPANY_SETTINGS,
    TITLE_COMPANY_SETTINGS_FRENCH, URL_LOGIN, URL_PANELS
} from "../../utils/constants";
import { CompanyPage } from "../../pages/company/CompanyPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";

test.describe('Company Page test', { tag: ['@smoke', '@stable']},() => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let companyPage: CompanyPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        companyPage = new CompanyPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN)
        await loginPage.auth(MONITORING_COMPANY);
        await expect(page).toHaveURL(URL_PANELS);
    });

    test('Checking UI elements on the monitoring company page', { tag: '@smoke' }, async ({ page }) => {
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
            await expect(companyPage.companyAutoProcessingConAppl).toBeVisible();
            await expect(companyPage.companyInfoName).toBeVisible();
            await expect(companyPage.companyInfoDescription).toBeVisible();
            await expect(companyPage.companyInfoContacts).toBeVisible();
            await expect(companyPage.company).toBeVisible();
            await expect(companyPage.panels).toBeVisible();
            await expect(companyPage.requests).toBeVisible();
            await expect(profilePage.myProfileButton).toBeVisible();
            await expect(profilePage.logoutButton).toBeVisible();
            await expect(profilePage.languageChoice).toBeVisible();
            await expect(companyPage.companyAbout).toBeVisible();
            await expect(companyPage.companyServerList).toBeVisible();
            await expect(companyPage.companyIntegration).toBeVisible();
            await expect(companyPage.companyAdditionalSoftware).toBeVisible();
    });

    test.describe('Company profile edit: monitoring company', () => {

        test('Company contact email editing: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694fatbf"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);
            if (await companyPage.companyContactEmail.filter({hasText:COMPANY_EMAIL_NEW}).isVisible()){
                await companyPage.companyContactEmail.click();
                await page.waitForLoadState('domcontentloaded');
                await companyPage.inputFirstField.fill(COMPANY_MONITORING_EMAIL_OLD);
                await page.waitForLoadState('domcontentloaded');
                await companyPage.saveButton.click();

                await expect(page.getByText(COMPANY_MONITORING_EMAIL_OLD)).toBeVisible();}

            else {await companyPage.companyContactEmail.click({ force: true });

            await companyPage.inputFirstField.fill(COMPANY_EMAIL_NEW);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_EMAIL_NEW)).toBeVisible();

            await companyPage.companyContactEmail.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.inputFirstField.fill(COMPANY_MONITORING_EMAIL_OLD);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_EMAIL_OLD).last()).toBeVisible();}
        });

        test('Company contact phone editing: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694fatf5"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);
            if (await companyPage.companyContactPhone.filter({hasText:COMPANY_PHONE_NEW}).isVisible()){
                await companyPage.companyContactPhone.click();
                await page.waitForLoadState('domcontentloaded');
                await companyPage.inputFirstField.fill(COMPANY_MONITORING_PHONE_OLD);
                await page.waitForLoadState('domcontentloaded');
                await companyPage.saveButton.click();

                await expect(page.getByText(COMPANY_MONITORING_PHONE_OLD)).toBeVisible();}
            else {await companyPage.companyContactPhone.click();

            await companyPage.inputFirstField.fill(COMPANY_PHONE_NEW);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_PHONE_NEW)).toBeVisible();

            await companyPage.companyContactPhone.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.inputFirstField.fill(COMPANY_MONITORING_PHONE_OLD);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_PHONE_OLD)).toBeVisible();}
        });

        test('Language for emails edit: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mevpv"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);
            if (await companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_DUTCH}).isVisible()){
                await companyPage.companyLanguageForEmails.click();
                await page.waitForLoadState('domcontentloaded');
                await page.getByText(LANGUAGE_ENGLISH).click();
                await page.waitForLoadState('domcontentloaded');
                await companyPage.saveButton.click();

                await expect(companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_ENGLISH})).toBeVisible();}

            else {await companyPage.companyLanguageForEmails.click();

            await page.getByText(LANGUAGE_DUTCH).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.saveButton.click();
            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_DUTCH})).toBeVisible();

            await companyPage.companyLanguageForEmails.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(LANGUAGE_ENGLISH).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.companyLanguageForEmails.filter({hasText:LANGUAGE_ENGLISH})).toBeVisible();}
        });

        test('Language of page editing: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await companyPage.company.click();
            await page.waitForLoadState('domcontentloaded');
            await profilePage.languageChoice.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(LANGUAGE_FRENCH_SHORT, { exact: true }).click();

            await expect(page.getByRole('heading', {name: TITLE_COMPANY_SETTINGS_FRENCH})).toBeVisible();

            await profilePage.languageChoice.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(LANGUAGE_ENGLISH_SHORT, { exact: true }).click();

            await expect(page.getByRole('heading', {name: TITLE_COMPANY_SETTINGS})).toBeVisible();
        });

        test('Another settings editing:monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694fau7g"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            // COUNTRY

            if (await companyPage.companyCountry.filter({hasText:COUNTRY_MOLDOVA}).isVisible())
            {   await companyPage.companyCountry.click();
                await page.waitForLoadState('domcontentloaded');
                await companyPage.inputField.clear();
                await page.waitForLoadState('domcontentloaded');
                await companyPage.inputField.fill(COUNTRY_UKRAINE);
                await page.waitForLoadState('domcontentloaded');
                await page.getByText(COUNTRY_UKRAINE, {exact: true}).click();
                await page.waitForLoadState('domcontentloaded');
                await companyPage.submitButton.click();
                await expect(companyPage.companyCountry.filter({hasText:COUNTRY_UKRAINE})).toBeVisible();}

            await companyPage.companyCountry.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.inputField.clear();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.inputField.fill(COUNTRY_MOLDOVA_SHORT);
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(COUNTRY_MOLDOVA, {exact: true}).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            // USER CABINET

            if (await companyPage.companyUsersCabinet.filter({hasText:CABINET_SECOND}).isVisible()){
                await companyPage.companyUsersCabinet.click();
                await page.waitForLoadState('domcontentloaded');
                await companyPage.inputFirstField.first().fill(CABINET_FIRST);
                await page.waitForLoadState('domcontentloaded');
                await companyPage.submitButton.click();
                await expect(companyPage.companyUsersCabinet.filter({hasText:CABINET_FIRST})).toBeVisible();}

            await companyPage.companyUsersCabinet.click();

            await expect(page.getByText(TEXT_ENTER_THE_LINK)).toBeVisible();

            await companyPage.inputField.first().fill(CABINET_SECOND);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.companyCountry.filter({hasText:COUNTRY_MOLDOVA})).toBeVisible();
            await expect(companyPage.companyUsersCabinet.filter({hasText:CABINET_SECOND})).toBeVisible();


            await companyPage.companyCountry.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.inputField.fill(COUNTRY_UKRAINE);
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(COUNTRY_UKRAINE).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyUsersCabinet.click();

            await expect(page.getByText(TEXT_ENTER_THE_LINK)).toBeVisible();

            await companyPage.inputField.first().fill(CABINET_FIRST);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COUNTRY_UKRAINE)).toBeVisible();
            await expect(page.getByText(CABINET_FIRST)).toBeVisible();
        });

        test('Add or change monitoring company logo: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694fb1p8"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyChangeLogoButton.setInputFiles("./test-data/logo.jpg");

            await expect(companyPage.companyDefaultLogo).not.toBeVisible();

            await companyPage.companyDeleteLogoButton.click();

            await expect(companyPage.companyDefaultLogo.last()).toBeVisible();
        });

        test('Delete monitoring company logo: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mc54u"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyChangeLogoButton.setInputFiles("./test-data/logo.jpg");

            await expect(companyPage.companyDefaultLogo).not.toBeVisible();

            await companyPage.companyDeleteLogoButton.click();

            await expect(companyPage.companyDefaultLogo.last()).toBeVisible();
        });

        test('Information about company editing: monitoring company',
            { tag: ['@smoke', '@stable', '@company']}, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694fb2qx"
            });

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyInfoName.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoNameField.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoNameField.fill(COMPANY_MONITORING_NAME_NEW);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoDescriptionField.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoDescriptionField.fill(COMPANY_MONITORING_DESCRIPTION_NEW);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoContactsField.fill(COMPANY_MONITORING_CONTACTS_NEW);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.saveButton.click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_NAME_NEW).last()).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_CONTACTS_NEW)).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_DESCRIPTION_NEW)).toBeVisible();

            await companyPage.companyInfoName.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoNameField.fill(COMPANY_MONITORING_NAME_OLD);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoDescriptionField.fill(COMPANY_MONITORING_DESCRIPTION_OLD);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoContactsField.fill(COMPANY_MONITORING_CONTACTS_OLD);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.saveButton.click();

            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_NAME_OLD).last()).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_DESCRIPTION_OLD)).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_CONTACTS_OLD)).toBeVisible();
        });

        test('Localization adding: monitoring company',
            { tag: ['@smoke', '@stable', '@company']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mcnf3"
            });

            await companyPage.company.click()

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyAbout.click();

            await page.waitForTimeout(2000);

            if (await (page.getByText(LANGUAGE_UKRAINIAN)).isVisible()){
                await page.getByText(LANGUAGE_UKRAINIAN).click();
                await page.waitForLoadState('domcontentloaded');
                await companyPage.companyDeleteLocalizationButton.click();
                await page.waitForLoadState('domcontentloaded');
                await page.getByText(TEXT_DELETE, {exact: true}).click();

                await expect(page.getByText(LANGUAGE_UKRAINIAN).first()).not.toBeVisible();}

            await companyPage.companyAddLocalizationButton.click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoLocalizationLanguageField.click();

            await expect(page.getByText(TEXT_ADD_LOCALIZATION)).toBeVisible();

            await page.getByText(LANGUAGE_UKRAINIAN).click();
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoNameField.fill(COMPANY_MONITORING_NAME_NEW);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoDescriptionField.fill(COMPANY_MONITORING_DESCRIPTION_NEW);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.companyInfoContactsField.fill(COMPANY_MONITORING_CONTACTS_NEW);
            await page.waitForLoadState('domcontentloaded');
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);

            await page.getByText(LANGUAGE_UKRAINIAN).click();

            await expect(page.getByText(COMPANY_MONITORING_NAME_NEW)).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_CONTACTS_NEW)).toBeVisible();
            await expect(page.getByText(COMPANY_MONITORING_DESCRIPTION_NEW)).toBeVisible();

            await companyPage.companyDeleteLocalizationButton.click();
            await page.waitForLoadState('domcontentloaded');
            await page.getByText(TEXT_DELETE,{ exact: true }).click();
            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(LANGUAGE_UKRAINIAN)).not.toBeVisible();
        });

        test('Localization deleting: monitoring company',
            { tag: ['@smoke', '@stable', '@company']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mcq4n"
            });

                await companyPage.company.click()

                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

                await companyPage.companyAbout.click();
                if (await (page.getByText(LANGUAGE_UKRAINIAN)).isVisible()){
                    await page.getByText(LANGUAGE_UKRAINIAN).click();
                    await page.waitForLoadState('domcontentloaded');
                    await companyPage.companyDeleteLocalizationButton.click();
                    await page.waitForLoadState('domcontentloaded');
                    await page.getByText(TEXT_DELETE, {exact: true}).click();

                    await expect(page.getByText(LANGUAGE_UKRAINIAN).first()).not.toBeVisible();}

                await companyPage.companyAddLocalizationButton.click();
                await page.waitForLoadState('domcontentloaded');
                await companyPage.companyInfoLocalizationLanguageField.click();

                await expect(page.getByText(TEXT_ADD_LOCALIZATION)).toBeVisible();

                await page.getByText(LANGUAGE_UKRAINIAN).click();
                await page.waitForLoadState('domcontentloaded');
                await companyPage.companyInfoNameField.fill(COMPANY_MONITORING_NAME_NEW);
                await page.waitForLoadState('domcontentloaded');
                await companyPage.companyInfoDescriptionField.fill(COMPANY_MONITORING_DESCRIPTION_NEW);
                await page.waitForLoadState('domcontentloaded');
                await companyPage.companyInfoContactsField.fill(COMPANY_MONITORING_CONTACTS_NEW);
                await page.waitForLoadState('domcontentloaded');
                await companyPage.saveButton.click();

                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible()

                await page.waitForTimeout(2000);
                await page.reload();
                await page.waitForTimeout(2000);
                await page.getByText(LANGUAGE_UKRAINIAN).click();

                await expect(page.getByText(COMPANY_MONITORING_NAME_NEW)).toBeVisible();
                await expect(page.getByText(COMPANY_MONITORING_CONTACTS_NEW)).toBeVisible();
                await expect(page.getByText(COMPANY_MONITORING_DESCRIPTION_NEW)).toBeVisible();

                await companyPage.companyDeleteLocalizationButton.click();
                await page.waitForLoadState('domcontentloaded');
                await page.getByText(TEXT_DELETE,{ exact: true }).click();
                await page.waitForTimeout(2000);

                await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
                await expect(page.getByText(LANGUAGE_UKRAINIAN)).not.toBeVisible();
        });

    });

});