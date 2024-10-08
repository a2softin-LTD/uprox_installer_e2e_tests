import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { ProfilePage } from "../../pages/profile/ProfilePage";
import { DILER } from "../../utils/user_data";


test.describe('Hubs under DILER role', { tag: '@stable' },() => {

    let loginPage: LoginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        profilePage = new ProfilePage(page);

        await loginPage.openLoginPage('dev');
        await expect(page).toHaveURL('/login');
        await loginPage.auth(DILER);
        await expect(page).toHaveURL('/dealer/companies');
    });

    test('Hubs list under DILER role', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694vrf42"
        });
        const company: string = "AVL";

        await expect(page.getByText('Companies:')).toBeVisible();
        await expect(page.getByText(company)).toBeVisible();

        await page.getByText(company).click();

        await expect(page.getByText('Number of devices in the company')).toBeVisible();

        for (const hub of await profilePage.entityBlock.all())
            await expect(hub).toBeVisible();
        for (const hub of await profilePage.entityBlock.all())
        {await expect(hub.filter({has: profilePage.entityText})).toBeVisible();}

    });

    test.describe('Hub search under DILER role', () => {

        test('Hub search by serial number under role', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf4c"
            });

            const company: string = "AVL";
            const serialNumber: string = "00:08:9B:10:0B:EB";

            await expect(page.getByText('Companies:')).toBeVisible();
            await expect(page.getByText(company)).toBeVisible();

            await page.getByText(company).click();

            await expect(page.getByText('Number of devices in the company')).toBeVisible();

            await page.getByText('By serial number').click();
            await profilePage.searchField.fill(serialNumber);

            await expect(profilePage.entityBlock.filter({hasText:serialNumber})).toBeVisible();
            await expect(profilePage.entityBlock).toHaveCount(1);
        });


        test('Hub search by account under DILER role', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf48"
            });

            const company: string = "AVL";
            const account: string = "331C";

            await expect(page.getByText('Companies:')).toBeVisible();
            await expect(page.getByText(company)).toBeVisible();

            await page.getByText(company).click();

            await expect(page.getByText('Number of devices in the company')).toBeVisible();

            await page.getByText('By account').click();
            await profilePage.searchField.fill(account);

            await expect(profilePage.entityBlock.filter({hasText:account})).toBeVisible();
            await expect(profilePage.entityBlock).toHaveCount(1);
        });

        test('Hub search by company name under DILER role', async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: "https://app.clickup.com/t/8694vrf4b"
            });

            const company: string = "AVL";
            const name: string = "Os-au";

            await expect(page.getByText('Companies:')).toBeVisible();
            await expect(page.getByText(company)).toBeVisible();

            await page.getByText(company).click();

            await expect(page.getByText('Number of devices in the company')).toBeVisible();

            await page.getByText('By name').click();
            await profilePage.searchField.fill(name);

            await expect(profilePage.entityBlock.filter({hasText:name})).toBeVisible();
            await expect(profilePage.entityBlock).toHaveCount(1);
        });

    });

    test('Downloading hubs list under DILER role', async ({ page }) => {
        test.info().annotations.push({
            type: "test_id",
            description: "https://app.clickup.com/t/8694phqe6"
        });

        const company: string = "AVL";

        await expect(page.getByText('Companies:')).toBeVisible();
        await expect(page.getByText(company)).toBeVisible();

        await page.getByText(company).click();

        await expect(page.getByText('Number of devices in the company')).toBeVisible();

        const downloadPromise = page.waitForEvent('download');
        await profilePage.saveInXLSButton.click();

        await expect(page.getByText('Save in XLS')).toBeVisible();

        await page.getByText('Save in XLS').click();
        const download = await downloadPromise;
        await download.saveAs(download.suggestedFilename());
    });

});