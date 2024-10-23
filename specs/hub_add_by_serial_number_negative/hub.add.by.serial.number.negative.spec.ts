import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { HubPage } from "../../pages/hub/HubPage";
import { USER_1 } from "../../utils/user_data";
import { HUB_SERIAL_NUMBER_FALSE_FIRST, TEXT_SERIAL_NUMBER_WRONG_FORMAT } from "../../utils/constants";

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

    test('Add hub by serial number: negative', { tag: ['@smoke', '@stable', '@hub']}, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8678p1vxc"
        });

        await hubPage.panels.click();
        await hubPage.addPanelButton.click();
        await hubPage.addPanelEnterSerialButton.click();
        await hubPage.inputFirstField.fill(HUB_SERIAL_NUMBER_FALSE_FIRST);
        await hubPage.nextButton.click();

        await expect(page.getByText(TEXT_SERIAL_NUMBER_WRONG_FORMAT)).toBeVisible();
    });

});