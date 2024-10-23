import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import {TITLE_UPDATE_FIRMWARE_VERSION} from "../../utils/constants";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        hubPage = new HubPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
    });

    test.skip('New request', { tag: ['@smoke']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678rb7xp"
        });

        const nameOfCompany: string = "AVL TEST";
        const contactPhone: string = "+3805066789089";
        const location: string = "Madrid";
        const note: string = "no";
        const warningMessage: string = "Unfortunately, there are no companies in your country to apply for service. You can select another country";

        await hubPage.panels.click();
        await hubPage.firstHub.click();
        if (await page.getByText(TITLE_UPDATE_FIRMWARE_VERSION).isVisible())
        {  await hubPage.closeWindowButton.click()}
        await hubPage.requests.click();
        if (await (page.getByText(warningMessage)).isVisible()) {  await hubPage.system.click()}
        else if (await page.getByText('Country selection').isVisible()){
        await hubPage.countryUkraine.click();
        await hubPage.saveButton.click();
        await expect(page.getByText('Server settings')).toBeVisible();
        await page.getByText((nameOfCompany)).click();
        await expect(page.getByText('Panel control transfer')).toBeVisible();
        await hubPage.requestsCreateApplicationButton.click();
        await hubPage.inputFirstField.fill(contactPhone);
        await hubPage.inputSecondField.fill(location);
        await hubPage.inputThirdField.fill(note);
        await hubPage.requestsCreateApplicationButton.click();

        await expect(page.getByText('Transfer request sent')).toBeVisible();
        await hubPage.closeButton.click();

        await expect(page.getByText('Put on service')).toBeVisible();
        await page.getByText('Revert application').click();

        await expect(page.getByText('Revoke a service request')).toBeVisible();
        await hubPage.submitButton.click();

        await expect(page.getByText('Server settings')).toBeVisible({timeout:25000});
        }
    });

});