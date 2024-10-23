import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { MONITORING_SERVICE_COMPANY_1 } from "../../utils/user_data";
import { TITLE_COMPANY_SETTINGS } from "../../utils/constants";
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
        await expect(page).toHaveURL('/login')
        await loginPage.auth(MONITORING_SERVICE_COMPANY_1);
        await expect(page).toHaveURL('/panels');
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
            const newEmail: string = "dmytro@ukr.net";
            const oldEmail: string = "d.pinchuk+002@itvsystems.com.ua";

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await page.waitForTimeout(2000);
            if (await companyPage.companyContactEmail.filter({hasText:newEmail}).isVisible()){
                await companyPage.companyContactEmail.click();
                await companyPage.inputFirstField.fill(oldEmail);
                await companyPage.saveButton.click();

                await expect(page.getByText(oldEmail)).toBeVisible();}

            else {await companyPage.companyContactEmail.click();
            await companyPage.inputFirstField.fill(newEmail);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(newEmail)).toBeVisible();

            await page.waitForTimeout(2000);
            await companyPage.companyContactEmail.click();
            await companyPage.inputFirstField.fill(oldEmail);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(oldEmail).last()).toBeVisible();}
        });

        test('Company contact phone editing: monitoring-service company', { tag: '@smoke' }, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nru3m"
            });
            const newPhone: string = "+380508888888";
            const oldPhone: string = "+380971344443";

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await page.waitForTimeout(2000);
            if (await companyPage.companyContactPhone.filter({hasText:newPhone}).isVisible()){
                await companyPage.companyContactPhone.click();
                await companyPage.inputFirstField.fill(oldPhone);
                await companyPage.saveButton.click();

                await expect(page.getByText(oldPhone)).toBeVisible();}

            else {await companyPage.companyContactPhone.click();
            await companyPage.inputFirstField.fill(newPhone);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(newPhone)).toBeVisible();

            await companyPage.companyContactPhone.click();
            await companyPage.inputFirstField.fill(oldPhone);
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(oldPhone)).toBeVisible();}
        });

        test('Language for emails edit: monitoring-service company', { tag: '@smoke' }, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nru86"
            });
            const languageOld: string = "English";
            const languageNew: string = "Dutch";

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await page.waitForTimeout(2000);
            if (await companyPage.companyLanguageForEmails.filter({hasText:languageNew}).isVisible()){
                await companyPage.companyContactPhone.click();
                await companyPage.inputFirstField.fill(languageOld);
                await companyPage.saveButton.click();

                await expect(companyPage.companyLanguageForEmails.filter({hasText:languageOld})).toBeVisible();}

            else {await companyPage.companyLanguageForEmails.click();
            await page.getByText(languageNew).click();
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.companyLanguageForEmails.filter({hasText:languageNew})).toBeVisible();

            await companyPage.companyLanguageForEmails.click();
            await page.getByText(languageOld).click();
            await companyPage.saveButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(companyPage.companyLanguageForEmails.filter({hasText:languageOld})).toBeVisible();}
        });

        test('Language of page editing: monitoring-service company', { tag: '@smoke' }, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            const languageNew: string = "FR";
            const languageOld: string = "EN";
            const newTitle: string = "Réglages société ";
            const oldTitle: string = "Company settings";

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await profilePage.languageChoice.click();
            await page.getByText(languageNew, {exact: true}).click();

            await expect(page.getByRole('heading', {name: newTitle})).toBeVisible();

            await profilePage.languageChoice.click();
            await page.getByText(languageOld, {exact: true}).click();

            await expect(page.getByRole('heading', {name: oldTitle})).toBeVisible();
        });

        test('Another settings editing: monitoring-service company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nrufc"
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

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            if (await companyPage.companyCountry.filter({hasText:countryNew}).isVisible())
            {   await companyPage.companyCountry.click();
                await companyPage.inputField.fill(countryOld);
                await page.waitForTimeout(2000);
                await page.getByText(countryOld, {exact: true}).click();
                await companyPage.submitButton.click();
                await expect(companyPage.companyCountry.filter({hasText:countryOld})).toBeVisible();}

            await companyPage.companyCountry.click();
            await companyPage.inputField.clear();
            await companyPage.inputField.fill(countryNewShortCut);
            await page.waitForTimeout(2000);
            await page.getByText(countryNew, {exact: true}).click();
            await companyPage.submitButton.click();


            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            if (await companyPage.companyUsersCabinet.filter({hasText:cabinetNew}).isVisible()){
                await companyPage.companyUsersCabinet.click();
                await companyPage.inputField.fill(cabinetOld);
                await companyPage.submitButton.click();

                await expect(companyPage.companyUsersCabinet.filter({hasText:cabinetOld})).toBeVisible();}

            await companyPage.companyUsersCabinet.click();
            await expect(page.getByText('Enter the link to the user\'s account')).toBeVisible();
            await companyPage.inputField.fill(cabinetNew);
            await companyPage.submitButton.click();

            if (await companyPage.companyGuestEngineers.filter({hasText:guestsNewStatus}).isVisible()){
                await companyPage.companyGuestEngineers.click();
                await page.getByText(guestsOldStatus).first().click();
                await companyPage.submitButton.click();

                await expect(companyPage.companyGuestEngineers.filter({hasText:guestsOldStatus})).toBeVisible();}

            await companyPage.companyGuestEngineers.click();
            await page.getByText(guestsNewStatus).first().click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            if (await companyPage.companyEventCategories.filter({hasText:'Alarms/Restores, Troubles/Restores, ...'}).isVisible()){
                await companyPage.companyEventCategories.click();
                await page.getByText(firstEvent, { exact: true }).click();
                await companyPage.submitButton.click();

                await expect(companyPage.companyEventCategories.filter({hasText:'Arms/Disarms, Alarms/Restores, ...'})).toBeVisible();}

            await companyPage.companyEventCategories.click();
            await page.getByText(firstEvent, { exact: true }).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(countryNew)).toBeVisible();
            await expect(page.getByText(cabinetNew)).toBeVisible();
            await expect(page.getByText(guestsNewStatus)).toBeVisible();
            await expect(page.getByText('Alarms/Restores, Troubles/Restores, ...')).toBeVisible();

            await companyPage.companyCountry.click();
            await companyPage.inputField.fill(countryOld);
            await page.getByText(countryOld).click();
            await companyPage.submitButton.click();
            await companyPage.companyUsersCabinet.click();
            await expect(page.getByText('Enter the link to the user\'s account')).toBeVisible();
            await companyPage.inputField.fill(cabinetOld);
            await companyPage.submitButton.click();
            await expect(page.getByText(TITLE_COMPANY_SETTINGS)).toBeVisible();
            await companyPage.companyGuestEngineers.click();
            await page.getByText(guestsOldStatus).click();
            await companyPage.submitButton.click();
            await companyPage.companyEventCategories.click();
            await page.getByText(firstEvent).click();
            await companyPage.submitButton.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(countryOld)).toBeVisible();
            await expect(page.getByText(cabinetOld)).toBeVisible();
            await expect(page.getByText(guestsOldStatus)).toBeVisible();
            await expect(page.getByText('Arms/Disarms, Alarms/Restores, ...')).toBeVisible();

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

            const oldCompanyName: string = "AQA_MONITORING_SERVICE_COMPANY";
            const newCompanyName: string = "АКВА моніторінгово-сервісна компанія";
            const oldCompanyDescription: string = "AQA TEST";
            const newCompanyDescription: string = "нова компанія";
            const oldCompanyContacts: string = "dpinchuk";
            const newCompanyContacts: string = "дпинчук";

            await companyPage.company.click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();

            await companyPage.companyInfoName.click();
            await companyPage.companyInfoNameField.click();
            await companyPage.companyInfoNameField.fill(newCompanyName);
            await companyPage.companyInfoDescriptionField.click();
            await companyPage.companyInfoDescriptionField.fill(newCompanyDescription);
            await companyPage.companyInfoContactsField.fill(newCompanyContacts);
            await companyPage.saveButton.click();
            await page.waitForTimeout(2000);
            await page.reload();
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
            await page.reload();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(oldCompanyName).last()).toBeVisible();
            await expect(page.getByText(oldCompanyDescription)).toBeVisible();
            await expect(page.getByText(oldCompanyContacts)).toBeVisible();
        });

        test('Localization adding: monitoring-service company',
            { tag: ['@smoke', '@stable', '@company']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nruya"
            });

            const newCompanyName: string = "АКВА компанія";
            const newCompanyDescription: string = "нова компанія";
            const newCompanyContacts: string = "дпинчук";
            const language: string = "Ukrainian";

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

            await expect(page.getByText(newCompanyName).last()).toBeVisible();
            await expect(page.getByText(newCompanyContacts)).toBeVisible();
            await expect(page.getByText(newCompanyDescription)).toBeVisible();

            await companyPage.companyDeleteLocalizationButton.click();
            await page.getByText('Delete', {exact: true}).click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(language).first()).not.toBeVisible();
        });

        test('Localization deleting: monitoring-service company',
            { tag: ['@smoke', '@stable', '@company']}, async ({page}) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694nrv0m"
            });

            const newCompanyName: string = "АКВА компанія";
            const newCompanyDescription: string = "нова компанія";
            const newCompanyContacts: string = "дпинчук";
            const language: string = "Ukrainian";

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

            await expect(page.getByText(newCompanyName).last()).toBeVisible();
            await expect(page.getByText(newCompanyContacts)).toBeVisible();
            await expect(page.getByText(newCompanyDescription)).toBeVisible();

            await companyPage.companyDeleteLocalizationButton.click();
            await page.getByText('Delete', {exact: true}).click();

            await expect(companyPage.pageTitle.filter({has:page.getByText(TITLE_COMPANY_SETTINGS)})).toBeVisible();
            await expect(page.getByText(language).first()).not.toBeVisible();
        });
    });

});