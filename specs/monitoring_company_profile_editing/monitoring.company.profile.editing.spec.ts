import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { MONITORING_COMPANY}  from "../../utils/user_data";

test.describe('Monitoring company profile editing', { tag: '@stable' },() => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login')
        await loginPage.auth(MONITORING_COMPANY);
        await expect(page).toHaveURL('/panels');
    });

    test.describe('Checking UI elements of the Page', () => {

        test('Checking UI elements on the monitoring company page', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await profilePage.company.click();

            await expect(profilePage.companySettingsTitle).toBeVisible();
            await expect(profilePage.companyChangeLogoButton).toBeVisible();
            await expect(profilePage.companyContactEmail).toBeVisible();
            await expect(profilePage.companyContactPhone).toBeVisible();
            await expect(profilePage.companyCountry).toBeVisible();
            await expect(profilePage.companyUsersCabinet).toBeVisible();
            await expect(profilePage.companyDisplayInAdvertising).toBeVisible();
            await expect(profilePage.companyLanguageForEmails).toBeVisible();
            await expect(profilePage.companyAutoProcessingConAppl).toBeVisible();
            await expect(profilePage.companyAutoProcessingDisconAppl).toBeVisible();
            await expect(profilePage.companyInfoName).toBeVisible();
            await expect(profilePage.companyInfoDescription).toBeVisible();
            await expect(profilePage.companyInfoContacts).toBeVisible();
            await expect(profilePage.company).toBeVisible();
            await expect(profilePage.panels).toBeVisible();
            await expect(profilePage.requests).toBeVisible();
            await expect(profilePage.myProfileButton).toBeVisible();
            await expect(profilePage.logoutButton).toBeVisible();
            await expect(profilePage.languageChoice).toBeVisible();
            await expect(profilePage.companyAbout).toBeVisible();
            await expect(profilePage.companyServerList).toBeVisible();
            await expect(profilePage.companyIntegration).toBeVisible();
            await expect(profilePage.companyAdditionalSoftware).toBeVisible();
        });
    });

    test.describe('Company profile edit.', () => {

        test('Company contact email editing: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhnuq"
            });
            const newEmail: string = "dmytro@ukr.net";
            const oldEmail: string = "d.pinchuk+002@itvsystems.com.ua";

            await profilePage.company.click();
            if (await profilePage.companyContactEmail.filter({hasText:newEmail}).isVisible()){
                await profilePage.companyContactEmail.click();
                await profilePage.userEditField.fill(oldEmail);
                await profilePage.saveButton.click();

                await expect(page.getByText(oldEmail)).toBeVisible();}

            await profilePage.companyContactEmail.click();
            await profilePage.userEditField.fill(newEmail);
            await profilePage.saveButton.click();

            await expect(page.getByText(newEmail)).toBeVisible();

            await profilePage.companyContactEmail.click();
            await profilePage.userEditField.fill(oldEmail);
            await profilePage.saveButton.click();

            await expect(page.getByText(oldEmail).last()).toBeVisible();
        });

        test('Company contact phone editing: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhp23"
            });
            const newPhone: string = "+380508888888";
            const oldPhone: string = "+380971344443";

            await profilePage.company.click();
            if (await profilePage.companyContactPhone.filter({hasText:newPhone}).isVisible()){
                await profilePage.companyContactPhone.click();
                await profilePage.userEditField.fill(oldPhone);
                await profilePage.saveButton.click();

                await expect(page.getByText(oldPhone)).toBeVisible();}
            await profilePage.companyContactPhone.click();
            await profilePage.userEditField.fill(newPhone);
            await profilePage.saveButton.click();

            await expect(page.getByText(newPhone)).toBeVisible();

            await profilePage.companyContactPhone.click();
            await profilePage.userEditField.fill(oldPhone);
            await profilePage.saveButton.click();

            await expect(page.getByText(oldPhone)).toBeVisible();
        });

        test('Language for emails edit: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhp9y"
            });
            const languageOld: string = "English";
            const languageNew: string = "Dutch";

            await profilePage.company.click();
            if (await profilePage.companyLanguageForEmails.filter({hasText:languageNew}).isVisible()){
                await profilePage.companyContactPhone.click();
                await profilePage.userEditField.fill(languageOld);
                await profilePage.saveButton.click();

                await expect(profilePage.companyLanguageForEmails.filter({hasText:'English'})).toBeVisible();}

            await profilePage.companyLanguageForEmails.click();
            await page.getByText(languageNew).click();
            await profilePage.saveButton.click()

            await expect(profilePage.companyLanguageForEmails.filter({hasText:'Dutch'})).toBeVisible();

            await profilePage.companyLanguageForEmails.click();
            await page.getByText(languageOld).click();
            await profilePage.saveButton.click();

            await expect(profilePage.companyLanguageForEmails.filter({hasText:'English'})).toBeVisible();
        });

        test('Language of page editing: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f8a"
            });

            const languageNew: string = "FR";
            const languageOld: string = "EN";
            const newTitle: string = "Réglages société ";
            const oldTitle: string = "Company settings";

            await profilePage.company.click();
            await profilePage.languageChoice.click();
            await page.getByText(languageNew, { exact: true }).click();

            await expect(page.getByRole('heading', {name: newTitle})).toBeVisible();

            await profilePage.languageChoice.click();
            await page.getByText(languageOld, { exact: true }).click();

            await expect(page.getByRole('heading', {name: oldTitle})).toBeVisible();
        });

        test('Another settings editing:monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694fau7g"
            });

            const countryNewShortCut: string = "Mold";
            const countryNew: string = "Moldova";
            const countryOld: string = "Ukraine";
            const cabinetNew: string = "https://qwertynew.com";
            const cabinetOld: string = "https://qwerty.com";

            await profilePage.company.click();
            await page.waitForTimeout(2000);

            await expect(page.getByText('Company settings')).toBeVisible();

            if (await profilePage.companyCountry.filter({hasText:countryNew}).isVisible())
            {   await profilePage.companyCountry.click();
                await profilePage.inputField.fill(countryOld);
                await page.getByText(countryOld, {exact: true}).click();
                await profilePage.submitButton.click();
                await expect(profilePage.companyCountry.filter({hasText:countryOld})).toBeVisible();}

            await profilePage.companyCountry.click();
            await profilePage.inputField.fill(countryNewShortCut);
            await page.getByText(countryNew, {exact: true}).click();
            await profilePage.submitButton.click();
            if (await profilePage.companyUsersCabinet.filter({hasText:cabinetNew}).isVisible()){
                await profilePage.companyUsersCabinet.click();
                await profilePage.userEditField.fill(cabinetOld);
                await profilePage.submitButton.click();

                await expect(page.getByText(cabinetOld)).toBeVisible();}
            await profilePage.companyUsersCabinet.click();

            await expect(page.getByText('Enter the link to the user\'s account')).toBeVisible();

            await profilePage.inputField.fill(cabinetNew);
            await profilePage.submitButton.click();

            await expect(page.getByText('Company settings')).toBeVisible();
            await expect(page.getByText(countryNew)).toBeVisible();
            await expect(page.getByText(cabinetNew)).toBeVisible();

            await profilePage.companyCountry.click();
            await profilePage.inputField.fill(countryOld);
            await page.getByText(countryOld).click();
            await profilePage.submitButton.click();
            await profilePage.companyUsersCabinet.click();

            await expect(page.getByText('Enter the link to the user\'s account')).toBeVisible();

            await profilePage.inputField.fill(cabinetOld);
            await profilePage.submitButton.click();

            await expect(page.getByText('Company settings')).toBeVisible();
            await expect(page.getByText(countryOld)).toBeVisible();
            await expect(page.getByText(cabinetOld)).toBeVisible();
        });

        test('Add or change monitoring company logo: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694fb1p8"
            });

            await profilePage.company.click();
            await profilePage.companyChangeLogoButton.setInputFiles("./test-data/logo.jpg");

            await expect(profilePage.defaultCompanyLogo).not.toBeVisible();

            await profilePage.companyDeleteLogoButton.click();

            await expect(profilePage.defaultCompanyLogo.last()).toBeVisible();
        });

        test('Delete monitoring company logo: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mc54u"
            });

            await profilePage.company.click();
            await profilePage.companyChangeLogoButton.setInputFiles("./test-data/logo.jpg");

            await expect(profilePage.defaultCompanyLogo).not.toBeVisible();

            await profilePage.companyDeleteLogoButton.click();

            await expect(profilePage.defaultCompanyLogo.last()).toBeVisible();
        });

        test('Information about company editing: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694mhqa6"
            });

            const oldCompanyName: string = "AQA COMPANY";
            const newCompanyName: string = "АКВА компанія";
            const oldCompanyDescription: string = "AQA TEST";
            const newCompanyDescription: string = "нова компанія";
            const oldCompanyContacts: string = "dpinchuk";
            const newCompanyContacts: string = "дпинчук";

            await profilePage.company.click();

            await page.waitForTimeout(2000);
            await profilePage.companyInfoName.click();
            await profilePage.companyInfoNameField.click();
            await profilePage.companyInfoNameField.fill(newCompanyName);
            await profilePage.companyInfoDescriptionField.click();
            await profilePage.companyInfoDescriptionField.fill(newCompanyDescription);
            await profilePage.companyInfoContactsField.fill(newCompanyContacts);
            await profilePage.saveButton.click();
            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(newCompanyName).last()).toBeVisible();
            await expect(page.getByText(newCompanyContacts)).toBeVisible();
            await expect(page.getByText(newCompanyDescription)).toBeVisible();

            await profilePage.companyInfoName.click();
            await profilePage.companyInfoNameField.fill(oldCompanyName);
            await profilePage.companyInfoDescriptionField.fill(oldCompanyDescription);
            await profilePage.companyInfoContactsField.fill(oldCompanyContacts);
            await profilePage.saveButton.click();

            await page.waitForTimeout(2000);
            await page.reload();
            await page.waitForTimeout(2000);

            await expect(page.getByText(oldCompanyName).last()).toBeVisible();
            await expect(page.getByText(oldCompanyDescription)).toBeVisible();
            await expect(page.getByText(oldCompanyContacts)).toBeVisible();
        });

        test('Localization adding: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f8a"
            });

            const newCompanyName: string = "АКВА компанія";
            const newCompanyDescription: string = "нова компанія";
            const newCompanyContacts: string = "дпинчук";
            const language: string = "Ukrainian";

            await profilePage.company.click()
            await profilePage.companyAbout.click();
            if (await (page.getByText(language)).isVisible()){
                await page.getByText(language).click();
                await profilePage.companyDeleteLocalizationButton.click();
                await page.getByText('Delete', {exact: true}).click();

                await expect(page.getByText(language).first()).not.toBeVisible();}
            await profilePage.companyAddLocalizationButton.click();
            await profilePage.companyInfoLocalizationLanguageField.click();

            await expect(page.getByText('Add Localization')).toBeVisible();

            await page.getByText(language).click();
            await profilePage.companyInfoNameField.fill(newCompanyName);
            await profilePage.companyInfoDescriptionField.fill(newCompanyDescription);
            await profilePage.companyInfoContactsField.fill(newCompanyContacts);
            await profilePage.saveButton.click();

            await expect(page.getByText('Company settings')).toBeVisible();

            await page.getByText(language).click();

            await expect(page.getByText(newCompanyName)).toBeVisible();
            await expect(page.getByText(newCompanyContacts)).toBeVisible();
            await expect(page.getByText(newCompanyDescription)).toBeVisible();

            await profilePage.companyDeleteLocalizationButton.click();
            await page.getByText('Delete',{ exact: true }).click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(language)).not.toBeVisible();
        });

        test('Localization deleting: monitoring company', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8678m6f8a"
            });

            const newCompanyName: string = "АКВА компанія";
            const newCompanyDescription: string = "нова компанія";
            const newCompanyContacts: string = "дпинчук";
            const language: string = "Ukrainian";

            await profilePage.company.click();
            await profilePage.companyAbout.click();
            if (await (page.getByText(language)).isVisible()){
                await page.getByText(language).click();
                await profilePage.companyDeleteLocalizationButton.click();
                await page.getByText('Delete', {exact: true}).click();

                await expect(page.getByText(language).first()).not.toBeVisible();}
            await profilePage.companyAddLocalizationButton.click();
            await profilePage.companyInfoLocalizationLanguageField.click();

            await expect(page.getByText('Add Localization')).toBeVisible();

            await page.getByText(language).click();
            await profilePage.companyInfoNameField.fill(newCompanyName);
            await profilePage.companyInfoDescriptionField.fill(newCompanyDescription);
            await profilePage.companyInfoContactsField.fill(newCompanyContacts);
            await profilePage.saveButton.click();

            await expect(page.getByText('Company settings')).toBeVisible();

            await page.getByText(language).click();

            await expect(page.getByText(newCompanyName)).toBeVisible();
            await expect(page.getByText(newCompanyContacts)).toBeVisible();
            await expect(page.getByText(newCompanyDescription)).toBeVisible();

            await profilePage.companyDeleteLocalizationButton.click();
            await page.getByText('Delete',{ exact: true }).click();
            await page.waitForTimeout(2000);

            await expect(page.getByText(language)).not.toBeVisible();
        });

    });

});