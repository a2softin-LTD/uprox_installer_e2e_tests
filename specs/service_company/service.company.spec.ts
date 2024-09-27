import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {USER_1} from "../../utils/user_data";
import {SERVICE_COMPANY_1} from "../../utils/user_data";


test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;


    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(SERVICE_COMPANY_1);
        await expect(page).toHaveURL('/panels');
        profilePage = new ProfilePage(page);

    });

    test.describe('Checking UI elements of the Page', () => {

        test('Checking UI elements', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });
            await profilePage.company.click();
            await page.waitForTimeout(2000);
            await expect(profilePage.companyAbout).toBeVisible();
            await expect(profilePage.companyChangeLogoButton).toBeVisible();
            await expect(profilePage.companyContactEmail).toBeVisible();
            await expect(profilePage.companyContactPhone).toBeVisible();
            await expect(profilePage.companyCountry).toBeVisible();
            await expect(profilePage.companyDisplayInAdvertising).toBeVisible();
            await expect(profilePage.companyEventCategories).toBeVisible();
            await expect(profilePage.companyGuestEngineers).toBeVisible();
            await expect(profilePage.companyInfoDescription).toBeVisible();
            await expect(profilePage.companyInfoName).toBeVisible();
            await expect(profilePage.companyInfoName).toBeVisible();
            await expect(profilePage.companyInfoContacts).toBeVisible();
            await expect(profilePage.companyUsersCabinet).toBeVisible();
            await expect(profilePage.company).toBeVisible();
            await expect(profilePage.panels).toBeVisible();
            await expect(profilePage.history).toBeVisible();
            await expect(profilePage.requests).toBeVisible();
            await expect(profilePage.employees).toBeVisible();
            await expect(profilePage.myProfileButton).toBeVisible();
            await expect(profilePage.logoutButton).toBeVisible();
            await expect(profilePage.languageChoice).toBeVisible();
            await expect(profilePage.companySettingsTitle).toBeVisible();
        });
    });
    test.describe('Company profile edit.', () => {

        test('Company contact email editing', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhnuq"
            });
            const newEmail: string = "dmytro@ukr.net";
            const oldEmail: string = "asiarh45@ukr.net";

            await profilePage.company.click();
            await page.waitForTimeout(2000);
            await profilePage.companyContactEmail.click();
            await profilePage.userEditField.fill(newEmail);
            await profilePage.saveButton.click();

            expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
            expect(page.getByText(newEmail)).toBeVisible();

            await page.waitForTimeout(2000);
            await profilePage.companyContactEmail.click();
            await profilePage.userEditField.fill(oldEmail);
            await profilePage.saveButton.click();

            expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
            expect(page.getByText(oldEmail)).toBeVisible();


        });

        test('Company contact phone editing', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhp23"
            });
            const newPhone: string = "+380508888888";
            const oldPhone: string = "+380678974567";

            await profilePage.company.click();
            await page.waitForTimeout(2000);
            await profilePage.companyContactPhone.click();
            await profilePage.userEditField.fill(newPhone);
            await profilePage.saveButton.click();

            expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
            expect(page.getByText(newPhone)).toBeVisible();

            await page.waitForTimeout(2000);
            await profilePage.companyContactPhone.click();
            await profilePage.userEditField.fill(oldPhone);
            await profilePage.saveButton.click();

            expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
            expect(page.getByText(oldPhone)).toBeVisible();

            await page.waitForTimeout(2000);
        });


        test('Language for emails edit', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhp9y"
            });
            const languageOld: string = "Ukrainian";
            const languageNew: string = "French";

            await profilePage.company.click();
            await page.waitForTimeout(2000);
            await profilePage.companyLanguageForEmails.click();
            await page.getByText(languageNew).click();
            await profilePage.userLanguageForEmailsEditSubmit.click();

            // expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
            expect(page.getByText(languageNew).first()).toBeVisible();

            await page.waitForTimeout(2000);
            await profilePage.companyLanguageForEmails.click();
            await page.getByText(languageOld).click();
            await profilePage.userLanguageForEmailsEditSubmit.click();

            // expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
            expect(page.getByText(languageOld).first()).toBeVisible();

        });

        test('Language of page editing', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f8a"
            });

            const languageNew: string = "FR";
            const languageOld: string = "EN";
            const newTitle: string = "Réglages société ";
            const oldTitle: string = "Company settings";

            await profilePage.company.click();
            await page.waitForTimeout(2000);
            await profilePage.languageChoice.click();
            await page.getByText(languageNew, { exact: true }).click();

            expect(page.getByRole('heading', { name: newTitle })).toBeVisible();

            await page.waitForTimeout(2000);
            await profilePage.languageChoice.click();
            await page.getByText(languageOld, { exact: true }).click();

            expect(page.getByRole('heading', { name: oldTitle })).toBeVisible();

            await page.waitForTimeout(2000);
        });


        test('Information about company editing', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhqa6"
            });

            const oldCompanyName: string = "UIR_SERVICE_BEST";
            const newCompanyName: string = "NEW IMAGE";
            const oldCompanyDescription: string = "Обслуговуюча компанія №1463474";
            const newCompanyDescription: string = "support@u-prox.systems";
            const oldCompanyContacts: string = "Севастополь, Україна";
            const newCompanyContacts: string = "Lviv, Ukraine";


            await profilePage.company.click();
            await page.waitForTimeout(2000);
            await profilePage.companyInfoName.click();
            await page.waitForTimeout(2000);
            await profilePage.companyInfoNameField.click();
            await profilePage.companyInfoNameField.fill(newCompanyName);
            await profilePage.companyInfoDescriptionField.click();
            await profilePage.companyInfoDescriptionField.fill(newCompanyDescription);
            await profilePage.companyInfoContactsField.fill(newCompanyContacts);
            await profilePage.saveButton.click();
            expect(profilePage.findByText('Changes saved successfully')).toBeVisible();

            await page.waitForTimeout(2000);
            expect(page.getByText(newCompanyName)).toBeVisible();
            expect(page.getByText(newCompanyContacts)).toBeVisible();
            expect(page.getByText(newCompanyDescription)).toBeVisible();

            await page.waitForTimeout(2000);
            await profilePage.companyInfoName.click();
            await profilePage.companyInfoNameField.fill(oldCompanyName);
            await profilePage.companyInfoDescriptionField.fill(oldCompanyDescription);
            await profilePage.companyInfoContactsField.fill(oldCompanyContacts);
            await profilePage.saveButton.click();
            expect(profilePage.findByText('Changes saved successfully')).toBeVisible();

            await page.waitForTimeout(2000);
            expect(page.getByText(oldCompanyName).last()).toBeVisible();
            expect(page.getByText(oldCompanyDescription)).toBeVisible();
            expect(page.getByText(oldCompanyContacts)).toBeVisible();


        });

        test('Localization adding', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f8a"
            });


            const newCompanyName: string = "NEW IMAGE";
            const newCompanyDescription: string = "Service company №1463474";
            const newCompanyContacts: string = "Sevastopol, Ukraine";
            const language: string = "English";

            await profilePage.company.click();
            await page.waitForTimeout(2000);
            await profilePage.companyAddLocalizationButton.click();
            await page.waitForTimeout(2000);
            await profilePage.companyInfoLocalizationLanguageField.click();
            await page.getByText(language).click();
            await profilePage.companyInfoNameField.fill(newCompanyName);
            await profilePage.companyInfoDescriptionField.fill(newCompanyDescription);
            await profilePage.companyInfoContactsField.fill(newCompanyContacts);
            await profilePage.saveButton.click();
            expect(profilePage.findByText('Changes saved successfully')).toBeVisible();

            await page.waitForTimeout(2000);
            await page.getByText(language).click();
            expect(page.getByText(newCompanyName)).toBeVisible();
            expect(page.getByText(newCompanyContacts)).toBeVisible();
            expect(page.getByText(newCompanyDescription)).toBeVisible();

            await profilePage.companyDeleteLocalizationButton.click();
            await page.getByText('Delete',{ exact: true }).click();
            expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
            await page.waitForTimeout(2000);
            expect(page.getByText(language)).not.toBeVisible();

        });

        test('Localization deleting', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f8a"
            });

            const newCompanyName: string = "NEW IMAGE";
            const newCompanyDescription: string = "Service company №1463474";
            const newCompanyContacts: string = "Sevastopol, Ukraine";
            const language: string = "English";

            await profilePage.company.click();
            await page.waitForTimeout(2000);
            await profilePage.companyAddLocalizationButton.click();
            await page.waitForTimeout(2000);
            await profilePage.companyInfoLocalizationLanguageField.click();
            await page.getByText(language).click();
            await profilePage.companyInfoNameField.fill(newCompanyName);
            await profilePage.companyInfoDescriptionField.fill(newCompanyDescription);
            await profilePage.companyInfoContactsField.fill(newCompanyContacts);
            await profilePage.saveButton.click();
            expect(profilePage.findByText('Changes saved successfully')).toBeVisible();

            await page.waitForTimeout(2000);
            await page.getByText(language).click();
            expect(page.getByText(newCompanyName)).toBeVisible();
            expect(page.getByText(newCompanyContacts)).toBeVisible();
            expect(page.getByText(newCompanyDescription)).toBeVisible();

            await profilePage.companyDeleteLocalizationButton.click();
            await page.getByText('Delete',{ exact: true }).click();
            expect(profilePage.findByText('Changes saved successfully')).toBeVisible();
            await page.waitForTimeout(2000);
            expect(page.getByText(language)).not.toBeVisible();
        });
    });

});