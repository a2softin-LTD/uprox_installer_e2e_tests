import {  Locator, type Page } from "@playwright/test";
import { INSTALLER_URL } from "../utils/path";

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async openLoginPage(env: string) {
        await this.page.goto(INSTALLER_URL(env));
    }

    async clickOnButton(locator: Locator) {
        return locator.click();
    }

    findByText(text: string) {
        return this.page.getByText(text);
    }
}