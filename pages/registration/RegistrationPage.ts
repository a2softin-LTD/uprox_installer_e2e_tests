import { BasePage } from "../BasePage";
import { Page, Locator, expect } from "@playwright/test";

export class RegistrationPage extends BasePage {
    readonly page: Page;
    private readonly _logo: Locator;
    private readonly _form: Locator;
    private readonly _emailField: Locator;
    private readonly _passwordField: Locator;
    private readonly _passwordEye: Locator;
    private readonly _agreeCheckbox: Locator;
    private readonly _registerButton: Locator;
    private readonly _signInLink: Locator;
    private readonly _privacyPolicyLink: Locator;
    private readonly _termsOfServiceLink: Locator;
    private readonly _languagesList: Locator;
    private readonly _matWarn: Locator;
    private readonly _loginHeader: Locator;
    private readonly _registrationComplete: Locator;
    private readonly _registrationCompleteNotReceivedEmail: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this._logo = page.locator('mat-icon[svgicon="login-logo-desktop"]')
        this._form = page.locator('form');
        this._emailField = this.form.locator('#signUpEmail');
        this._passwordField = this.form.locator('#signUpPassword');
        this._passwordEye = this.form.locator('button[aria-label="Hide password"]');
        this._agreeCheckbox = this.form.locator('.mdc-checkbox__native-control');
        this._registerButton = this.form.locator('.mdc-button');
        this._signInLink = page.getByText('Sign in');
        this._privacyPolicyLink = page.locator('a[href="https://policies.google.com/privacy?hl=en"]');
        this._termsOfServiceLink = page.locator('a[href="https://policies.google.com/terms?hl=en"]');
        this._languagesList = page.locator('.language-dd');
        this._matWarn = this.form.locator('button .mat-warn');
        this._loginHeader = page.locator('.login__header');
        this._registrationComplete = page.locator('.registration-complete').first();
        this._registrationCompleteNotReceivedEmail = page.locator('.registration-complete').last();
    }

    get logo(): Locator {
        return this._logo;
    }

    get form(): Locator {
        return this._form;
    }

    get emailField(): Locator {
        return this._emailField;
    }

    get passwordField(): Locator {
        return this._passwordField;
    }

    get passwordEye(): Locator {
        return this._passwordEye;
    }

    get agreeCheckbox(): Locator {
        return this._agreeCheckbox;
    }

    get registerButton(): Locator {
        return this._registerButton;
    }

    get signInLink(): Locator {
        return this._signInLink;
    }

    get privacyPolicyLink(): Locator {
        return this._privacyPolicyLink;
    }

    get termsOfServiceLink(): Locator {
        return this._termsOfServiceLink;
    }

    get languagesList(): Locator {
        return this._languagesList;
    }

    get matWarn(): Locator {
        return this._matWarn;
    }

    get loginHeader(): Locator {
        return this._loginHeader;
    }

    get registrationComplete(): Locator {
        return this._registrationComplete;
    }

    get registrationCompleteNotReceivedEmail(): Locator {
        return this._registrationCompleteNotReceivedEmail;
    }

    async registration(user: object, isAgreeBox: boolean) {
        await this.emailField.fill(user['login']);
        await this.passwordField.fill(user['password']);
        await this.passwordEye.hover();
        await expect(this.page.getByText(user['login'])).toBeDefined();
        await expect(this.page.getByText(user['password'])).toBeDefined();
        if (isAgreeBox) {
            await this.agreeCheckbox.click();
        }
        await this.registerButton.click();
    }

}