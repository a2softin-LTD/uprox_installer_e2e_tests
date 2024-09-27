import { BasePage } from "../BasePage";
import { Page, type Locator } from "@playwright/test";

export class SupportHeaderPage extends BasePage {
    readonly page: Page;
    private readonly _companiesMenuItem: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this._companiesMenuItem = page.locator('.header__list li').first()
    }

    get companiesMenuItem(): Locator {
        return this._companiesMenuItem;
    }
}