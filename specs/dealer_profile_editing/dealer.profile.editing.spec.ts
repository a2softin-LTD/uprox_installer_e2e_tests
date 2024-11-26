import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { DILER_1 } from "../../utils/user_data";
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
    DEALER_1_PHONE_OLD
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
        await loginPage.auth(DILER_1);
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

            if (await superAdminPage.profileNameBlock.filter({hasText: DEALER_1_NAME_NEW}).isVisible()) {
                await superAdminPage.profileNameBlock.click();
                await superAdminPage.inputFirstField.fill(DEALER_1_NAME_OLD);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.profileNameBlock.filter({hasText: DEALER_1_NAME_OLD})).toBeVisible();
            } else {
                await superAdminPage.profileNameBlock.click();

                await superAdminPage.inputFirstField.fill(DEALER_1_NAME_NEW);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileNameBlock.filter({hasText: DEALER_NAME_NEW})).toBeVisible();

                await superAdminPage.profileNameBlock.click();
                await superAdminPage.inputFirstField.fill(DEALER_1_NAME_OLD);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(superAdminPage.profileNameBlock.filter({hasText: DEALER_1_NAME_OLD})).toBeVisible();
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

            if (await superAdminPage.profilePhoneBlock.filter({hasText: DEALER_1_PHONE_NEW}).isVisible()) {
                await superAdminPage.profilePhoneBlock.click();
                await superAdminPage.inputField.fill(DEALER_1_PHONE_OLD);
                await superAdminPage.changeButton.click();

                await expect(page.getByText(DEALER_1_PHONE_OLD)).toBeVisible();
            } else {
                await superAdminPage.profilePhoneBlock.click();

                await superAdminPage.inputField.fill(DEALER_1_PHONE_NEW);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(page.getByText(DEALER_1_PHONE_NEW)).toBeVisible();

                await superAdminPage.profilePhoneBlock.click();
                await superAdminPage.inputField.fill(DEALER_1_PHONE_OLD);
                await superAdminPage.changeButton.click();

                await expect(superAdminPage.pageTitle.filter({has: page.getByText(TITLE_MY_PROFILE)})).toBeVisible();
                await expect(page.getByText(DEALER_1_PHONE_OLD)).toBeVisible();
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

    });

});