import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import {ProfilePage} from "../../pages/profile/ProfilePage";
import {HubPage} from "../../pages/hub/HubPage";
import {ENGINEER} from "../../utils/user_data";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test.skip('Add hub by engineer: positive', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p0hu6"
        });

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);
        const serialNumber: string = "Дмитро";

        await loginPage.auth(ENGINEER);
        await expect(page).toHaveURL('/profile/panels');

        await profilePage.panels.click();
        await hubPage.addPanelButton.click();
        await hubPage.addPanelEnterSerialButton.click();
        await hubPage.nextButton.click();
        await hubPage.serialNumberField.fill(serialNumber);
        await hubPage.nextButton.click();

    });

});