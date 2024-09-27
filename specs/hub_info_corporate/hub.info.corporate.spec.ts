import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {HubPage} from "../../pages/hub/HubPage";
import {MIXED} from "../../utils/user_data";
import {USER_3} from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test.skip('information about corporate hub ', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/86949tbtn"
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);
        const name: string = "Дмитро";
        const newUser: string = "Дмитро | snaut12@gmail.com";

        await loginPage.auth(MIXED);
        await expect(page).toHaveURL('/panels');

        await page.waitForTimeout(2000);


        if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}
        await expect(hubPage.hubHeader).toHaveText;
        await expect(hubPage.deleteHubIcon.first()).toBeVisible();
        await expect(profilePage.hubEngineerIcon.first()).toBeVisible();
        await page.waitForTimeout(2000);
        await (hubPage.hubInformationIcon.first()).click();
        await page.waitForTimeout(2000);
        await hubPage.editButton.click();
        await hubPage.hubInfoCity.click();
        await hubPage.hubInfoCity.fill('Poltava');
        await hubPage.findByText('Poltava').click();
        await page.waitForTimeout(2000);
        await hubPage.hubInfoStreetEditButton.click();
        await hubPage.hubInfoStreetEditField.fill('Sinna');
        await page.waitForTimeout(2000);
        await hubPage.saveButton.click();
        await hubPage.hubInfoBuilding.click();
        await hubPage.hubInfoBuilding.fill('12');
        await hubPage.hubInfoApartment.click();
        await hubPage.hubInfoApartment.fill('45');
        await page.waitForTimeout(2000);
        await hubPage.okButton.click();

        expect(hubPage.findByText('saved successfully')).toBeVisible();

        await page.waitForTimeout(2000);
        await page.reload();
        await page.waitForTimeout(2000);
        await (hubPage.hubInformationIcon.first()).click();
        await page.waitForTimeout(2000);
        await hubPage.editButton.click();
        await hubPage.hubInfoCity.click();
        await hubPage.hubInfoCity.fill('Dnipro');
        await page.waitForTimeout(2000);
        await hubPage.findByTextExact('Dnipro').click();
        await page.waitForTimeout(2000);
        await hubPage.hubInfoStreetEditButton.click();
        await hubPage.hubInfoStreetEditField.fill('Shidna');
        await hubPage.saveButton.click();
        await hubPage.hubInfoBuilding.click();
        await hubPage.hubInfoBuilding.fill('15');
        await hubPage.hubInfoApartment.click();
        await hubPage.hubInfoApartment.fill('55');
        await page.waitForTimeout(2000);
        await hubPage.okButton.click();

        expect(hubPage.findByText('saved successfully')).toBeVisible();

    });

});