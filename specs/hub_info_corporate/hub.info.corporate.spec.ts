import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { MIXED } from "../../utils/user_data";

test.describe('Profile Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test('information about corporate hub ', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0hzj"
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.auth(MIXED);
        await expect(page).toHaveURL('/panels');

        await page.waitForTimeout(2000);
        if (await hubPage.closeWindowButton.isVisible()) {  await hubPage.closeWindowButton.click()}

        for (const hub of await profilePage.hubEngineerIcon.all())
        { await expect(hub).toBeVisible();}
        for (const hub of await hubPage.hubInformationIcon.all())
        { await expect(hub).toBeVisible();}
        for (const hub of await hubPage.deleteHubIcon.all())
        { await expect(hub).toBeVisible();}
        for (const hub of await hubPage.hubCorpNameAccountInfo.all())
        { await expect(hub).toBeVisible();}
        for (const hub of await hubPage.hubCorpNumberConnectionInfo.all())
        { await expect(hub).toBeVisible();}

        await (hubPage.hubInformationIcon.first()).click();
        await page.waitForTimeout(2000);
        await hubPage.editButton.click();
        await hubPage.hubInfoCity.click();
        await hubPage.hubInfoCity.fill('Poltava');
        await hubPage.findByText('Poltava').click();
        await hubPage.hubInfoBuilding.click();
        await hubPage.hubInfoBuilding.fill('12');
        await hubPage.hubInfoApartment.click();
        await hubPage.hubInfoApartment.fill('28');
        await page.waitForTimeout(2000);
        await hubPage.okButton.click();
        await page.waitForTimeout(4000);
        await page.reload();
        await page.waitForTimeout(2000);
        await (hubPage.hubInformationIcon.first()).click();
        await page.waitForTimeout(2000);
        await hubPage.editButton.click();
        await hubPage.hubInfoCity.click();
        await page.waitForTimeout(2000);
        await hubPage.hubInfoCity.fill('Dnipro');
        await page.waitForTimeout(2000);
        await hubPage.findByTextExact('Dnipro').click();
        await page.waitForTimeout(2000);
        await hubPage.hubInfoBuilding.click();
        await hubPage.hubInfoBuilding.fill('45');
        await hubPage.hubInfoApartment.click();
        await hubPage.hubInfoApartment.fill('7');
        await page.waitForTimeout(2000);
        await hubPage.okButton.click();
        await page.waitForTimeout(4000);
        await page.reload();
        await page.waitForTimeout(2000);
        await (hubPage.hubInformationIcon.first()).click();

        await expect(hubPage.findByText('Dnipro')).toBeVisible();
        await expect(hubPage.findByText('Sinna, 45, 7')).toBeVisible();
    });

});