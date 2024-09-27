import {  Locator,  Page } from "@playwright/test";
import { INSTALLER_LOGIN_URL } from "../utils/path";

export class BasePage {
    readonly page: Page;
    private readonly _saveButton: Locator;
    private readonly _submitButton: Locator;
    private readonly _deleteButton: Locator;
    private readonly _addButton: Locator;
    private readonly _trashIcon: Locator;
    private readonly _closeWindowButton: Locator;
    private readonly _disableButton: Locator;
    private readonly _enableButton: Locator;
    private readonly _nextButton: Locator;
    private readonly _yesButton: Locator;
    private readonly _noButton: Locator;
    private readonly _okButton: Locator;
    private readonly _backButton: Locator;
    private readonly _onButton: Locator;
    private readonly _offButton: Locator;
    private readonly _editButton: Locator;
    private readonly _exportButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this._saveButton = page.getByText('Save');
        this._deleteButton = page.getByRole('button', { name: 'Delete' });
        this._addButton = page.getByRole('button', { name: 'Add' });
        this._trashIcon = page.locator('use[*|href="#icon-trash"]');
        this._submitButton = page.getByText('Submit');
        this._closeWindowButton = this.page.locator('.button__cancel-icon');
        this._disableButton = page.getByText('Disable');
        this._enableButton = page.getByText('Enable');
        this._nextButton = page.getByText('Next');
        this._yesButton = page.getByText('Yes');
        this._noButton = page.getByText('No');
        this._okButton = page.getByRole('button', { name: 'ОК' });
        this._backButton = page.locator('use[*|href="#icon-arrow"]');
        this._onButton = page.getByText('On',{ exact: true });
        this._offButton = page.getByText('Turn off',{ exact: true });
        this._editButton = page.getByText('Edit',{ exact: true });
        this._exportButton = page.getByRole('button', { name: 'Export' });
    }

    get saveButton(): Locator {
        return this._saveButton;
    }

    get deleteButton(): Locator {
        return this._deleteButton;
    }

    get trashIcon(): Locator {
        return this._trashIcon;
    }

    get submitButton(): Locator {
        return this._submitButton;
    }

    get addButton(): Locator {
        return this._addButton;
    }

    get disableButton(): Locator {
        return this._disableButton;
    }

    get closeWindowButton(): Locator {
        return this._closeWindowButton;
    }

    get enableButton(): Locator {
        return this._enableButton;
    }

    get nextButton(): Locator {
        return this._nextButton;
    }

    get yesButton(): Locator {
        return this._yesButton;
    }

    get noButton(): Locator {
        return this._noButton;
    }

    get okButton(): Locator {
        return this._okButton;
    }

    get backButton(): Locator {
        return this._backButton;
    }

    get onButton(): Locator {
        return this._onButton;
    }

    get offButton(): Locator {
        return this._offButton;
    }

    get editButton(): Locator {
        return this._editButton;
    }


    get exportButton(): Locator {
        return this._exportButton;
    }



    async openLoginPage(env: string) {
        await this.page.goto(INSTALLER_LOGIN_URL(env));
    }

    async clickOnButton(locator: Locator) {
        return locator.click();
    }

    findByText(text: string) {
        return this.page.getByText(text);
    }

    findByTextExact(text: string) {
        return this.page.getByText((text), { exact: true });
    }

}