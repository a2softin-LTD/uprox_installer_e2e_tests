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
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test('New request', { tag: '@smoke' }, async ({ page }) => {
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
        const warningMessage: string = "Unfortunately, there are no companies in your country to apply for service. You can select another country";

        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');

        await profilePage.panels.click();
        await profilePage.firstHub.click();
        await page.waitForTimeout(2000);
        if (await page.getByText('Update firmware version').isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.requests.click();
        await page.waitForTimeout(2000);
        if (await (page.getByText(warningMessage)).isVisible()) {  await hubPage.system.click()}
        else {
        await page.waitForTimeout(2000);
        await hubPage.countryUkraine.click();
        await hubPage.saveButton.click();
        await page.waitForTimeout(2000);
        await page.getByText((nameOfCompany)).click();
        await page.waitForTimeout(2000);
        await hubPage.requestsCreateApplicationButton.click();
        await hubPage.requestsContactPhoneField.fill(contactPhone);
        await hubPage.requestsLocationField.fill(location);
        await hubPage.requestsNoteField.fill(note);
        await hubPage.requestsCreateApplicationButton.click();

        await expect(page.getByText('Transfer request sent')).toBeVisible();}
    });

});