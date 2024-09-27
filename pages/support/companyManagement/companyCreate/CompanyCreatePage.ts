import { BasePage } from "../../../BasePage";
import {Page, type Locator } from "@playwright/test";

export class CompanyCreatePage extends BasePage {
    readonly page: Page;
    private readonly _mainSection: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this._mainSection = page.locator('.list__header button').first()
    }

}