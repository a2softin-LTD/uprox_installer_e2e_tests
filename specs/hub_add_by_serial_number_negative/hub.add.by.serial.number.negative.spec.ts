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

        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(USER_1);
        await expect(page).toHaveURL('/profile/panels');
    });

    test('Add hub by serial number: negative', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p1vxc"
        });

        const serialNumber: string = "56:08:B7:10:02:44";
        const serialNumber1: string = "00:08:B7:10:02:04";

        await profilePage.panels.click();
        await hubPage.addPanelButton.click();
        await hubPage.addPanelEnterSerialButton.click();
        await hubPage.inputFirstField.fill(serialNumber);
        await hubPage.nextButton.click();

        await expect(page.getByText('Serial number in wrong format')).toBeVisible();
    });

});