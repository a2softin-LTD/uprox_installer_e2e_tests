import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SERVICE_COMPANY_1 } from "../../utils/user_data";
import {
    COMPANY_SERVICE_EMAIL_NEW,
    COMPANY_SERVICE_EMAIL_OLD,
    COMPANY_SERVICE_PHONE_NEW, COMPANY_SERVICE_PHONE_OLD, LANGUAGE_FRENCH, LANGUAGE_UKRAINIAN,
    TITLE_COMPANY_SETTINGS
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
        await expect(page).toHaveURL('/login');
        await loginPage.auth(SERVICE_COMPANY_1);
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL('/panels');
    });

    test.describe('Checking UI elements of the page', { tag: ['@smoke']  },() => {

        test('Checking UI elements', { tag: ['@smoke']  },async ({ page }) => {
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
            if (await companyPage.companyContactEmail.filter({hasText:COMPANY_SERVICE_EMAIL_NEW}).isVisible()){
                await companyPage.companyContactEmail.click();
                await companyPage.inputFirstField.fill(COMPANY_SERVICE_EMAIL_OLD);
                await companyPage.saveButton.click();

                await expect(page.getByText(COMPANY_SERVICE_EMAIL_OLD)).toBeVisible();}

            else {await companyPage.companyContactEmail.click();
            await companyPage.inputFirstField.fill(COMPANY_SERVICE_EMAIL_NEW);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_EMAIL_NEW)).toBeVisible();

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

            await expect(page.getByText('Company settings')).toBeVisible();
            await page.waitForTimeout(2000);
            if (await companyPage.companyContactPhone.filter({hasText:COMPANY_SERVICE_PHONE_NEW}).isVisible()){
                await companyPage.companyContactPhone.click();
                await companyPage.inputFirstField.fill(COMPANY_SERVICE_PHONE_OLD);
                await companyPage.saveButton.click();

                await expect(page.getByText(COMPANY_SERVICE_PHONE_OLD)).toBeVisible();}

            else {await companyPage.companyContactPhone.click();
            await companyPage.inputFirstField.fill(COMPANY_SERVICE_PHONE_NEW);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(COMPANY_SERVICE_PHONE_NEW)).toBeVisible();

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

            const languageNew: string = "FR";
            const languageOld: string = "EN";
            const newTitle: string = "Réglages société ";
            const oldTitle: string = "Company settings";

            await companyPage.company.click();
            await profilePage.languageChoice.click();
            await page.getByText(languageNew, { exact: true }).click();

            await expect(page.getByRole('heading', {name: newTitle})).toBeVisible();

            await profilePage.languageChoice.click();
            await page.getByText(languageOld, { exact: true }).click();

            await expect(page.getByRole('heading', {name: oldTitle})).toBeVisible();
        });

        test('Another settings editing:service company', { tag: ['@smoke']  },async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhpj3"
            });

            const countryNewShortCut: string = "Mold";
            const countryNew: string = "Moldova";
            const countryOld: string = "Ukraine";
            const cabinetNew: string = "https://qwertynew.com";
            const cabinetOld: string = "https://qwerty.com";
            const guestsNewStatus: string = "Denied";
            const guestsOldStatus: string = "Allowed";
            const firstEvent: string = "Arms/Disarms";

            await companyPage.company.click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible();
            await page.waitForTimeout(2000);
            if (await companyPage.companyCountry.filter({hasText:countryNew}).isVisible())
            {   await companyPage.companyCountry.click();
                await companyPage.inputField.clear();
                await companyPage.inputField.fill(countryOld);
                await page.getByText(countryOld, {exact: true}).click();
                await companyPage.submitButton.click();
                await expect(companyPage.companyCountry.filter({hasText:countryOld})).toBeVisible();}

            await companyPage.companyCountry.click();
            await companyPage.inputField.clear();
            await companyPage.inputField.fill(countryNewShortCut);
            await page.getByText(countryNew, {exact: true}).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await page.waitForTimeout(2000);
            if (await companyPage.companyUsersCabinet.filter({hasText:cabinetNew}).isVisible()){
                await companyPage.companyUsersCabinet.click();
                await companyPage.inputFirstField.fill(cabinetOld);
                await companyPage.submitButton.click();

                await expect(companyPage.companyUsersCabinet.filter({hasText:cabinetOld})).toBeVisible();}

            await companyPage.companyUsersCabinet.click();

            await expect(page.getByText('Enter the link to the user\'s account')).toBeVisible();

            await companyPage.inputField.fill(cabinetNew);
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            if (await companyPage.companyGuestEngineers.filter({hasText:guestsNewStatus}).isVisible()){
                await companyPage.companyGuestEngineers.click();
                await page.getByText(guestsOldStatus).first().click();
                await companyPage.submitButton.click();

                await expect(companyPage.companyGuestEngineers.filter({hasText:guestsOldStatus})).toBeVisible();}

            await companyPage.companyGuestEngineers.click();
            await page.getByText(guestsNewStatus).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            if (await companyPage.companyEventCategories.filter({hasText:'Alarms/Restores'}).filter({hasNotText:'Arms/Disarms'}).isVisible()){
                await companyPage.companyEventCategories.click();
                await page.getByText(firstEvent, { exact: true }).click();
                await companyPage.submitButton.click();

                await expect(companyPage.companyEventCategories.filter({hasText:'Arms/Disarms, Alarms/Restores'})).toBeVisible();}

            await companyPage.companyEventCategories.click();
            await page.getByText(firstEvent, { exact: true }).click();
            await companyPage.submitButton.click();

            await expect(page.getByText('Company settings')).toBeVisible();
            await expect(page.getByText(countryNew)).toBeVisible();
            await expect(page.getByText(cabinetNew)).toBeVisible();
            await expect(page.getByText(guestsNewStatus)).toBeVisible();
            await expect(page.getByText('Alarms/Restores')).toBeVisible();

            await companyPage.companyCountry.click();
            await companyPage.inputField.fill(countryOld);
            await page.getByText(countryOld).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyUsersCabinet.click();

            await expect(page.getByText('Enter the link to the user\'s account')).toBeVisible();

            await companyPage.inputField.fill(cabinetOld);
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyGuestEngineers.click();
            await page.getByText(guestsOldStatus).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyEventCategories.click();
            await page.getByText(firstEvent,{ exact: true }).click();
            await companyPage.submitButton.click();

            await expect(page.getByText('Company settings')).toBeVisible();
            await expect(page.getByText(countryOld)).toBeVisible();
            await expect(page.getByText(cabinetOld)).toBeVisible();
            await expect(page.getByText(guestsOldStatus)).toBeVisible();
            await expect(page.getByText('Arms/Disarms, Alarms/Restores')).toBeVisible();
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

            const oldCompanyName: string = "UIR_SERVICE_BEST";
            const oldCompanyDescription: string = "Обслуговуюча компанія №1463474";
            const oldCompanyContacts: string = "Севастополь, Україна";
            const newCompanyName: string = "NEW IMAGE";
            const newCompanyDescription: string = "support@u-prox.systems";
            const newCompanyContacts: string = "Lviv, Ukraine";

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyInfoName.click();
            await companyPage.companyInfoNameField.fill(newCompanyName);
            await companyPage.companyInfoDescriptionField.fill(newCompanyDescription);
            await companyPage.companyInfoContactsField.fill(newCompanyContacts);
            await companyPage.saveButton.click();

            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(newCompanyName).last()).toBeVisible();
            await expect(page.getByText(newCompanyContacts)).toBeVisible();
            await expect(page.getByText(newCompanyDescription)).toBeVisible();

            await companyPage.companyInfoName.click();
            await companyPage.companyInfoNameField.fill(oldCompanyName);
            await companyPage.companyInfoDescriptionField.fill(oldCompanyDescription);
            await companyPage.companyInfoContactsField.fill(oldCompanyContacts);
            await companyPage.saveButton.click();

            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(oldCompanyName).last()).toBeVisible();
            await expect(page.getByText(oldCompanyDescription)).toBeVisible();
            await expect(page.getByText(oldCompanyContacts)).toBeVisible();
        });

        test('Localization adding:service company',
            { tag: ['@smoke', '@stable', '@company']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhqhp"
            });

            const newCompanyName: string = "NEW IMAGE";
            const newCompanyDescription: string = "Service company №1463474";
            const newCompanyContacts: string = "Sevastopol, Ukraine";
            const language: string = "Dutch";

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyAbout.click();
            if (await (page.getByText(language)).isVisible()){
                await page.getByText(language).click();
                await companyPage.companyDeleteLocalizationButton.click();
                await page.getByText('Delete', {exact: true}).click();

                await expect(page.getByText(language).first()).not.toBeVisible();}

            await companyPage.companyAddLocalizationButton.click();

            await expect(page.getByText('Add Localization')).toBeVisible();

            await companyPage.companyInfoLocalizationLanguageField.click();
            await page.getByText(language).click();
            await companyPage.companyInfoNameField.fill(newCompanyName);
            await companyPage.companyInfoDescriptionField.fill(newCompanyDescription);
            await companyPage.companyInfoContactsField.fill(newCompanyContacts);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.getByText(language).click();

            await expect(page.getByText(newCompanyName).last()).toBeVisible();
            await expect(page.getByText(newCompanyContacts)).toBeVisible();
            await expect(page.getByText(newCompanyDescription)).toBeVisible();

            await companyPage.companyDeleteLocalizationButton.click();
            await page.getByText('Delete',{ exact: true }).click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(language)).not.toBeVisible();
        });

        test('Localization deleting:service company',
            { tag: ['@smoke', '@stable', '@company']},async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhqrc"
            });

            const newCompanyName: string = "NEW IMAGE";
            const newCompanyDescription: string = "Service company №1463474";
            const newCompanyContacts: string = "Sevastopol, Ukraine";
            const language: string = "Dutch";

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyAbout.click();
            if (await (page.getByText(language)).isVisible()){
                await page.getByText(language).click();
                await companyPage.companyDeleteLocalizationButton.click();
                await page.getByText('Delete', {exact: true}).click();

                await expect(page.getByText(language).first()).not.toBeVisible();}
            await companyPage.companyAddLocalizationButton.click();
            await companyPage.companyInfoLocalizationLanguageField.click();

            await expect(page.getByText('Add Localization')).toBeVisible();

            await page.getByText(language).click();
            await companyPage.companyInfoNameField.fill(newCompanyName);
            await companyPage.companyInfoDescriptionField.fill(newCompanyDescription);
            await companyPage.companyInfoContactsField.fill(newCompanyContacts);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.getByText(language).click();

            await expect(page.getByText(newCompanyName)).toBeVisible();
            await expect(page.getByText(newCompanyContacts)).toBeVisible();
            await expect(page.getByText(newCompanyDescription)).toBeVisible();

            await companyPage.companyDeleteLocalizationButton.click();
            await page.getByText('Delete',{ exact: true }).click();
            await page.waitForTimeout(2000);
            page.reload();
            await page.waitForTimeout(2000);

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(language)).not.toBeVisible();
        });

    });

});