import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {HubPage} from "../../pages/hub/HubPage";
import {USER_1} from "../../utils/user_data";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test.skip('New request', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);
        const country: string = "Ukraine";
        const nameOfCompany: string = "AVL TEST";
        const contactPhone: string = "+3805066789089";
        const location: string = "Madrid";
        const note: string = "no";

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        await page.waitForTimeout(2000);
        if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
        await hubPage.requests.click();
        await page.waitForTimeout(2000);
        await hubPage.countryUkraine.click();
        await hubPage.saveButton.click();
        await page.waitForTimeout(2000);
        await hubPage.findByText((nameOfCompany)).click();
        await page.waitForTimeout(2000);
        await hubPage.requestsCreateApplicationButton.click();
        await hubPage.requestsContactPhoneField.fill(contactPhone);
        await hubPage.requestsLocationField.fill(location);
        await hubPage.requestsNoteField.fill(note);
        await hubPage.requestsCreateApplicationButton.click();

        expect(hubPage.findByText('Saving changes')).toBeVisible();
        expect(hubPage.findByText('Transfer request sent')).toBeVisible();

    });

});