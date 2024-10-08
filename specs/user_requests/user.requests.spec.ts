import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
    });

    test('New request', { tag: ['@smoke','@hub']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678rb7xp"
        });

        const nameOfCompany: string = "AVL TEST";
        const contactPhone: string = "+3805066789089";
        const location: string = "Madrid";
        const note: string = "no";
        const warningMessage: string = "Unfortunately, there are no companies in your country to apply for service. You can select another country";

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.requests.click();
        if (await (page.getByText(warningMessage)).isVisible()) {  await hubPage.system.click()}
        else if (await (hubPage.countryUkraine).isVisible()){
        await hubPage.countryUkraine.click();
        await hubPage.saveButton.click();
        await page.getByText((nameOfCompany)).click();
        await hubPage.requestsCreateApplicationButton.click();
        await hubPage.requestsContactPhoneField.fill(contactPhone);
        await hubPage.requestsLocationField.fill(location);
        await hubPage.requestsNoteField.fill(note);
        await hubPage.requestsCreateApplicationButton.click();

        await expect(page.getByText('Transfer request sent')).toBeVisible();}
    });

});