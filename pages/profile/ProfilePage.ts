import { BasePage } from "../BasePage";
import {Page,  Locator, expect} from "@playwright/test";

export class ProfilePage extends BasePage {
    readonly page: Page;
    private readonly _form: Locator;

    private readonly _userLogo: Locator;
    private readonly _userName: Locator;
    private readonly _userEditField: Locator;
    private readonly _userEditSubmit: Locator;
    private readonly _userPassword: Locator;
    private readonly _userEditCurrentPasswordField: Locator;
    private readonly _userEditNewPasswordField: Locator;
    private readonly _userPhone: Locator;
    private readonly _userLanguageForEmails: Locator;
    private readonly _languageChoice: Locator;
    private readonly _userRole: Locator;
    private readonly _userEmail: Locator;
    private readonly _myProfileButton: Locator;
    private readonly _logoutButton: Locator;
    private readonly _myProfileTitle: Locator;

    private readonly _message: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this._form = page.locator('form');
        this._userLogo= this.page.locator('.main-section__logo');
        this._userName = page.getByText('Full name');
        this._userEditField = this.page.locator('.input_block-input');
        this._userEditSubmit = page.getByText('Change',{ exact: true });
        this._userPassword = page.getByText('Change password');
        this._userEditCurrentPasswordField = this.form.locator('input[type="password"]').first();
        this._userEditNewPasswordField = this.form.locator('input[type="password"]').last();
        this._userPhone = page.getByText('Phone');
        this._userLanguageForEmails = page.getByText('Language for emails');
        this._languageChoice = this.page.locator('.header__lang');
        this._userRole = page.getByText('Role');
        this._userEmail = page.getByText('Email', { exact: true });
        this._myProfileButton = this.page.locator('div[routerlink="/profile"]');
        this._logoutButton = this.page.locator('span:text-is("Logout")');
        this._message = page.getByText('Messages');
        this._myProfileTitle = this.page.locator('span:text-is("Email")');


    }

    get form(): Locator {
        return this._form;
    }

    get userName(): Locator {
        return this._userName;
    }

    get userEditField(): Locator {
        return this._userEditField;
    }

    get userEditSubmit(): Locator {
        return this._userEditSubmit;
    }

    get userPassword(): Locator {
        return this._userPassword;
    }

    get userEditCurrentPasswordField(): Locator {
        return this._userEditCurrentPasswordField;
    }

    get userEditNewPasswordField(): Locator {
        return this._userEditNewPasswordField;
    }

    get userPhone(): Locator {
        return this._userPhone;
    }

    get userLanguageForEmails(): Locator {
        return this._userLanguageForEmails;
    }

    get languageChoice(): Locator {
        return this._languageChoice;
    }

    get message(): Locator {
        return this._message;
    }

    get userRole(): Locator {
        return this._userRole;
    }

    get userEmail(): Locator {
        return this._userEmail;
    }

    get myProfileButton(): Locator {
        return this._myProfileButton;
    }

    get logoutButton(): Locator {
        return this._logoutButton;
    }

    get userLogo(): Locator {
        return this._userLogo;
    }

    get myProfileTitle(): Locator {
        return this._myProfileTitle;
    }




}