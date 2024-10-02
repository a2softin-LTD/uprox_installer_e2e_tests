import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { HubPage } from "../../pages/hub/HubPage";
import { MIXED } from "../../utils/user_data";

test.describe('Hub Page tests', () => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;
    let hubPage: HubPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login')
    });

    test('Access for engineer (company hub)', { tag: '@smoke' }, async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: ""
        });
        const engineerEmail: string = "jan.macao@gmail.com";
        const engineersNumberStart: string = "(1)";
        const engineersNumberFinal: string = "(2)";

        profilePage = new ProfilePage(page);
        hubPage = new HubPage(page);

        await loginPage.auth(MIXED);
        await expect(page).toHaveURL('/panels');

        await profilePage.panels.click();

        await page.waitForTimeout(2000)
        if (await ((profilePage.hubEngineerIcon).filter(({ hasText: engineersNumberFinal }))).isVisible())
        {        await profilePage.hubEngineerIcon.click();
            await page.getByText((engineerEmail)).click();
            await page.getByText('ОК').click();
            await page.waitForTimeout(1000)
            page.reload()
            await page.waitForTimeout(1000);}

        await profilePage.hubEngineerIcon.click();
        await page.getByText((engineerEmail)).click();
        await page.getByText('ОК').click();

        page.reload()
        await page.waitForTimeout(2000);

        await expect(profilePage.hubEngineerIcon).toHaveText(engineersNumberFinal);

        await profilePage.hubEngineerIcon.click();
        await page.getByText((engineerEmail)).click();
        await page.getByText('ОК').click();
        page.reload()
        await page.waitForTimeout(2000);

        await expect(profilePage.hubEngineerIcon).toHaveText(engineersNumberStart);
    });

});