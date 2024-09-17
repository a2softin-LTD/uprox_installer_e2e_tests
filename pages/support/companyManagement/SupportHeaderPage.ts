import { BasePage } from "../../BasePage";
import { Page, type Locator } from "@playwright/test";

export class CompanyManagement extends BasePage {
    readonly page: Page;
    private readonly _addCompanyButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this._addCompanyButton = page.locator('button[routerlink="create"]').first()
    }

    get addCompanyButton(): Locator {
        return this._addCompanyButton;
    }
}