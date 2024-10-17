import { BasePage } from "../BasePage";
import {Page, Locator, expect} from "@playwright/test";

export class superAdminPage extends BasePage {
    readonly page: Page;

    private readonly _form: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;

        this._form = page.locator('form');

    }

    get form(): Locator {
        return this._form;
    }



}