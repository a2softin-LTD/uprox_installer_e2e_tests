import { expect, test } from "@playwright/test";
import { LoginPage } from "../../pages/login/LoginPage";
import { SuperAdminPage } from "../../pages/superAdmin/SuperAdminPage";
import { SUPER_ADMIN } from "../../utils/user_data";
import {
    BUTTON_DEPLOY_NEW_NODE,
    TEXT_CONNECTION,
    TEXT_INFO,
    TEXT_NODES,
    TITLE_NODES,
    TITLE_PANELS, URL_LOGIN, URL_SUPPORT_SEARCH
} from "../../utils/constants";

test.describe('SuperAdmin page tests', { tag: ['@smoke', '@stable', '@superadmin']},() => {

    let loginPage: LoginPage;
    let superAdminPage: SuperAdminPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        superAdminPage = new SuperAdminPage(page);

        await loginPage.openLoginPage('/');
        await expect(page).toHaveURL(URL_LOGIN);
        await loginPage.auth(SUPER_ADMIN);
        await expect(page).toHaveURL(URL_SUPPORT_SEARCH);
    });

        test('Checking UI elements of the routing page under SUPER_ADMIN role', { tag: '@smoke' }, async ({ page }) => {
            test.info().annotations.push({
                type: "test_id",
                description: ""
            });

            await superAdminPage.routing.click();

            await expect(superAdminPage.routingReloudIcon).toBeVisible();
            await expect(superAdminPage.pageTitle.filter({has:page.getByText(TITLE_NODES)})).toBeVisible();
            await expect(page.getByText(BUTTON_DEPLOY_NEW_NODE)).toBeVisible();
            await expect(page.getByText(TITLE_PANELS, {exact:true})).toBeVisible();
            await expect(page.getByText(TEXT_NODES, {exact:true})).toBeVisible();
            await expect(page.getByText(TEXT_INFO, {exact:true})).toBeVisible();
            await expect(page.getByText(TEXT_CONNECTION, {exact:true})).toBeVisible();
        });

        test('List of nodes under SUPER_ADMIN role', { tag: '@smoke'}, async ({ page }) => {
            test.info().annotations.push({
                type: 'test_id',
                description: 'https://app.clickup.com/t/8694p41w6'
            });

            await superAdminPage.routing.click();

            await expect(page.getByText(BUTTON_DEPLOY_NEW_NODE)).toBeVisible();

            for (const node of await superAdminPage.rowBlock.all())
                await expect(node).toBeVisible();
        });

    });













