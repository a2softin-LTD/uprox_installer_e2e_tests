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
    private readonly _userLanguageForEmailsEditSubmit: Locator;
    private readonly _companyInfoName: Locator;
    private readonly _companyInfoDescription: Locator;
    private readonly _companyInfoContacts: Locator;
    private readonly _companyAbout: Locator;
    private readonly _companyContactEmail: Locator;
    private readonly _companyContactPhone: Locator;
    private readonly _companyCountry: Locator;
    private readonly _companyUsersCabinet: Locator;
    private readonly _companyDisplayInAdvertising: Locator;
    private readonly _companyLanguageForEmails: Locator;
    private readonly _companyGuestEngineers: Locator;
    private readonly _companyEventCategories: Locator;
    private readonly _companyAutoProcessingApplications: Locator;
    private readonly _companyChangeLogoButton: Locator;
    private readonly _deletePasswordField: Locator;
    private readonly _deleteCheckbox: Locator;
    private readonly _deleteAccountButton: Locator;
    private readonly _deleteFinalButton: Locator;
    private readonly _panels: Locator;
    private readonly _company: Locator;
    private readonly _feedback: Locator;
    private readonly _message: Locator;
    private readonly _requests: Locator;
    private readonly _history: Locator;
    private readonly _employees: Locator;
    private readonly _firstHub: Locator;
    private readonly _secondHub: Locator;
    private readonly _languageChoice: Locator;
    private readonly _userRole: Locator;
    private readonly _userEmail: Locator;
    private readonly _myProfileButton: Locator;
    private readonly _logoutButton: Locator;
    private readonly _myProfileTitle: Locator;
    private readonly _hubEngineerIcon: Locator;
    private readonly _companySettingsTitle: Locator;
    private readonly _companyInfoNameField: Locator;
    private readonly _companyInfoDescriptionField: Locator;
    private readonly _companyInfoContactsField: Locator;
    private readonly _companyAddLocalizationButton: Locator;
    private readonly _companyDeleteLocalizationButton: Locator;
    private readonly _companyInfoLocalizationLanguageField: Locator;
    private readonly _companyServerList: Locator;
    private readonly _companyIntegration: Locator;
    private readonly _companyAdditionalSoftware: Locator;
    private readonly _companyFirstServer: Locator;
    private readonly _companySecondServer: Locator;
    private readonly _companyThirdServer: Locator;
    private readonly _companyNameServerField: Locator;
    private readonly _companyDnsServerField: Locator;
    private readonly _companyPortServerField: Locator;
    private readonly _companyServerAddButton: Locator;
    private readonly _employeeEmailField: Locator;
    private readonly _employeeNameField: Locator;
    private readonly _employeePhoneField: Locator;
    private readonly _employeeRoleField: Locator;
    private readonly _employeeDeleteManager: Locator;
    private readonly _employeeSearchField: Locator;
    private readonly _employeeBlock: Locator;


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
        this._userLanguageForEmailsEditSubmit = page.getByText('Save');
        this._companyInfoName = page.getByText('Name');
        this._companyInfoDescription = page.getByText('Description');
        this._companyInfoContacts = page.getByText('Description');
        this._companyInfoNameField = this.form.locator('input.mat-mdc-input-element');
        this._companyInfoDescriptionField = this.form.locator('textarea.mat-mdc-input-element').first();
        this._companyInfoContactsField = this.form.locator('textarea.mat-mdc-input-element').last();
        this._companyInfoLocalizationLanguageField = this.form.locator('div.mat-mdc-select-trigger');
        this._companyAbout = page.getByText('About company');
        this._companyContactEmail = page.getByText('Contact email');
        this._companyContactPhone = page.getByText('Contact phone');
        this._companyCountry = page.getByText('Country');
        this._companyUsersCabinet = page.getByText('cabinet');
        this._companyDisplayInAdvertising  = page.getByText('Display in advertising');
        this._companyLanguageForEmails = page.getByText('Language for emails');
        this._companyGuestEngineers  = page.getByText('Guest engineers');
        this._companyAutoProcessingApplications  = page.getByText('Auto processing of applications');
        this._companyEventCategories  = page.getByText('Event categories');
        this._companyChangeLogoButton = page.getByText('Change logo');
        this._companyAddLocalizationButton = this.page.locator('div.add-block');
        this._companyDeleteLocalizationButton = this.page.locator('span.delete_point');
        this._deleteAccountButton = page.getByText('Delete account');
        this._companySettingsTitle = page.getByText('Company settings');
        this._deletePasswordField = this.page.locator('#deletePasswordId');
        this._deleteFinalButton = this.page.locator('.filled');
        this._deleteCheckbox = this.page.locator('.mdc-checkbox__native-control');
        this._panels = page.getByText('Panels',{ exact: true });
        this._company = page.getByText('Company',{ exact: true });
        this._employees= page.getByText('Employees',{ exact: true });
        this._requests= page.getByText('Requests',{ exact: true });
        this._history= page.getByText('History',{ exact: true });
        this._feedback = page.getByText('Feedback');
        this._firstHub = this.page.locator('.part__item').first();
        this._secondHub = this.page.locator('.part__item').nth(1);
        this._languageChoice = this.page.locator('.header__lang');
        this._userRole = page.getByText('Role');
        this._userEmail = page.getByText('Email', { exact: true });
        this._myProfileButton = this.page.locator('div[routerlink="/profile"]');
        this._logoutButton = this.page.locator('span:text-is("Logout")');
        this._message = page.getByText('Messages');
        this._myProfileTitle = this.page.locator('span:text-is("Email")');
        this._hubEngineerIcon = this.page.locator('.icon-with-text.has_action.ng-star-inserted').first();
        this._companyServerList = page.getByText('Server list',{ exact: true });
        this._companyIntegration = page.getByText('Integration',{ exact: true });
        this._companyAdditionalSoftware= page.getByText('Additional software',{ exact: true });
        this._companyFirstServer = this.page.locator('li.part__item').nth(0);
        this._companySecondServer = this.page.locator('li.part__item').nth(1);
        this._companyThirdServer = this.page.locator('li.part__item').nth(2);
        this._companyNameServerField = this.page.locator('input.mat-mdc-input-element').nth(0);
        this._companyDnsServerField = this.page.locator('input.mat-mdc-input-element').nth(1);
        this._companyPortServerField = this.page.locator('input.mat-mdc-input-element').nth(2);
        this._companyServerAddButton = page.getByText('Add server');
        this._employeeEmailField = this.form.locator('input[formcontrolname="email"]');
        this._employeeNameField = this.form.locator('input[formcontrolname="pib"]');
        this._employeePhoneField = this.form.locator('input[formcontrolname="phone"]');
        this._employeeRoleField = this.page.locator('span:text-is("Select role")');
        this._employeeDeleteManager = page.getByRole('button', { name: 'Delete' });
        this._employeeSearchField = this.page.locator('input[placeholder*="Enter the"]');
        this._employeeBlock = this.page.locator('div.part__item');
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

    get userLanguageForEmailsEditSubmit(): Locator {
        return this._userLanguageForEmailsEditSubmit;
    }

    get deleteAccountButton(): Locator {
        return this._deleteAccountButton;
    }

    get deletePasswordField(): Locator {
        return this._deletePasswordField;
    }

    get deleteCheckbox(): Locator {
        return this._deleteCheckbox;
    }

    get deleteFinalButton(): Locator {
        return this._deleteFinalButton;
    }

    get panels(): Locator {
        return this._panels;
    }

    get company(): Locator {
        return this._company;
    }

    get feedback(): Locator {
        return this._feedback;
    }
    get secondHub(): Locator {
        return this._secondHub;
    }

    get firstHub(): Locator {
        return this._firstHub;
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

    get hubEngineerIcon (): Locator {
        return this._hubEngineerIcon ;
    }

    get companyInfoName (): Locator {
        return this._companyInfoName ;
    }

    get companyInfoContacts (): Locator {
        return this._companyInfoContacts ;
    }

    get companyInfoDescription (): Locator {
        return this._companyInfoDescription ;
    }

    get companyAbout (): Locator {
        return this._companyAbout;
    }

    get companyContactEmail (): Locator {
        return this._companyContactEmail;
    }

    get companyContactPhone (): Locator {
        return this._companyContactPhone;
    }

    get companyCountry (): Locator {
        return this._companyCountry;
    }

    get companyDisplayInAdvertising (): Locator {
        return this._companyDisplayInAdvertising;
    }

    get companyLanguageForEmails (): Locator {
        return this._companyLanguageForEmails;
    }

    get companyGuestEngineers(): Locator {
        return this._companyGuestEngineers;
    }

    get companyEventCategories (): Locator {
        return this._companyEventCategories;
    }

    get companyAutoProcessingApplications  (): Locator {
        return this._companyAutoProcessingApplications ;
    }

    get companyUsersCabinet (): Locator {
        return this._companyUsersCabinet;
    }

    get companyChangeLogoButton (): Locator {
        return this._companyChangeLogoButton;
    }

    get requests (): Locator {
        return this._requests;
    }

    get history (): Locator {
        return this._history;
    }

    get employees (): Locator {
        return this._employees;
    }

    get companySettingsTitle (): Locator {
        return this._companySettingsTitle;
    }

    get companyInfoNameField (): Locator {
        return this._companyInfoNameField;
    }

    get companyInfoDescriptionField (): Locator {
        return this._companyInfoDescriptionField;
    }

    get companyInfoContactsField (): Locator {
        return this._companyInfoContactsField;
    }

    get companyAddLocalizationButton (): Locator {
        return this._companyAddLocalizationButton;
    }

    get companyDeleteLocalizationButton (): Locator {
        return this._companyDeleteLocalizationButton;
    }

    get companyInfoLocalizationLanguageField (): Locator {
        return this._companyInfoLocalizationLanguageField;
    }

    get companyServerList (): Locator {
        return this._companyServerList;
    }

    get companyFirstServer (): Locator {
        return this._companyFirstServer;
    }

    get companySecondServer (): Locator {
        return this._companySecondServer;
    }

    get companyThirdServer (): Locator {
        return this._companyThirdServer;
    }

    get companyNameServerField (): Locator {
        return this._companyNameServerField;
    }

    get companyDnsServerField (): Locator {
        return this._companyDnsServerField;
    }

    get companyPortServerField (): Locator {
        return this._companyPortServerField;
    }

    get companyServerAddButton (): Locator {
        return this._companyServerAddButton;
    }

    get employeeEmailField (): Locator {
        return this._employeeEmailField;
    }

    get employeeNameField (): Locator {
        return this._employeeNameField;
    }

    get employeePhoneField (): Locator {
        return this._employeePhoneField;
    }

    get employeeRoleField (): Locator {
        return this._employeeRoleField;
    }

    get employeeDeleteManager (): Locator {
        return this._employeeDeleteManager;
    }

    get employeeSearchField (): Locator {
        return this._employeeSearchField;
    }

    get employeeBlock (): Locator {
        return this._employeeBlock;
    }

    get companyIntegration (): Locator {
        return this._companyIntegration;
    }

    get companyAdditionalSoftware (): Locator {
        return this._companyAdditionalSoftware;
    }
}