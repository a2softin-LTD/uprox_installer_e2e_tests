import {  Locator, type Page } from "@playwright/test";
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
    private readonly _changeButton: Locator;
    private readonly _inputFirstField: Locator;
    private readonly _inputSecondField: Locator;
    private readonly _inputThirdField: Locator;
    private readonly _inputFourthField: Locator;
    private readonly _inputFifthField: Locator;
    private readonly _inputSixthField: Locator;
    private readonly _inputSeventhField: Locator;
    private readonly _selectFirstField: Locator;
    private readonly _selectSecondField: Locator;
    private readonly _selectThirdField: Locator;
    private readonly _entityBlock: Locator;

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
        this._exportButton = page.getByText('Export',{ exact: true });
        this._changeButton = page.getByText('Change',{ exact: true });
        this._inputFirstField = this.page.locator('.mat-mdc-input-element').nth(0);
        this._inputSecondField = this.page.locator('.mat-mdc-input-element').nth(1);
        this._inputThirdField = this.page.locator('.mat-mdc-input-element').nth(2);
        this._inputFourthField = this.page.locator('.mat-mdc-input-element').nth(3);
        this._inputFifthField = this.page.locator('.mat-mdc-input-element').nth(4);
        this._inputSixthField = this.page.locator('.mat-mdc-input-element').nth(5);
        this._inputSeventhField = this.page.locator('.mat-mdc-input-element').nth(6);
        this._selectFirstField = this.page.locator('.mat-mdc-select-value').nth(0);
        this._selectSecondField = this.page.locator('.mat-mdc-select-value').nth(1);
        this._selectThirdField = this.page.locator('.mat-mdc-select-value').nth(2);
        this._entityBlock = this.page.locator('.part__item');

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

    get changeButton(): Locator {
        return this._changeButton;
    }

    get inputFirstField(): Locator {
        return this._inputFirstField;
    }

    get inputSecondField(): Locator {
        return this._inputSecondField;
    }

    get inputThirdField(): Locator {
        return this._inputThirdField;
    }

    get inputFourthField(): Locator {
        return this._inputFourthField;
    }

    get inputFifthField(): Locator {
        return this._inputFifthField;
    }

    get inputSixthtField(): Locator {
        return this._inputSixthField;
    }

    get inputSeventhField(): Locator {
        return this._inputSeventhField;
    }

    get selectFirstField(): Locator {
        return this._selectFirstField;
    }

    get selectSecondField(): Locator {
        return this._selectSecondField;
    }

    get selectThirdField(): Locator {
        return this._selectThirdField;
    }

    get entityBlock(): Locator {
        return this._entityBlock;
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