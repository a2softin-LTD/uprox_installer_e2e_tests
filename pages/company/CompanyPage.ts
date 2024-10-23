import { BasePage } from "../BasePage";
import {Page, Locator, expect} from "@playwright/test";

export class CompanyPage extends BasePage {
    readonly page: Page;

    private readonly _form: Locator;
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
    private readonly _companyAutoProcessingConAppl: Locator;
    private readonly _companyAutoProcessingDisconAppl: Locator;
    private readonly _companyChangeLogoButton: Locator;
    private readonly _companyDeleteLogoButton: Locator;
    private readonly _companyDefaultLogo: Locator;

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
    private readonly _companyNameServerField: Locator;
    private readonly _companyDnsServerField: Locator;
    private readonly _companyPortServerField: Locator;
    private readonly _companyServerAddButton: Locator;
    private readonly _companyServerNameInfo: Locator;
    private readonly _companyServerDnsPortInfo: Locator;

    private readonly _companyAddButton: Locator;
    private readonly _companyAddGroupButton: Locator;
    private readonly _companyCloseButton: Locator;
    private readonly _employeeEmailField: Locator;
    private readonly _employeeNameField: Locator;
    private readonly _employeePhoneField: Locator;
    private readonly _employeeRoleField: Locator;
    private readonly _employeeDeleteManager: Locator;
    private readonly _employeeSearchField: Locator;
    private readonly _employeeBlock: Locator;

    private readonly _companyCountryFilter: Locator;
    private readonly _companyRoleFilter: Locator;
    private readonly _companyAllFilter: Locator;
    private readonly _companySearchField: Locator;
    private readonly _companySearchByLogin: Locator;
    private readonly _companySearchByNumber: Locator;
    private readonly _companySearchByAccount: Locator;

    private readonly _companyChangeAdminLogin: Locator;
    private readonly _companyAddToGroupButton: Locator;
    private readonly _companyAddNewGroupButton: Locator;
    private readonly _companySelectCommandField: Locator;
    private readonly _actionsCheckbox: Locator;
    private readonly _companySearchByHubField: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this._form = page.locator('form');
        this._companyInfoName = page.getByText('Name');
        this._companyInfoDescription = page.getByText('Description');
        this._companyInfoContacts = page.getByText('Contacts', {exact: true});
        this._companyInfoNameField = this.form.locator('input.mat-mdc-input-element');
        this._companyInfoDescriptionField = this.form.locator('textarea.mat-mdc-input-element').first();
        this._companyInfoContactsField = this.form.locator('textarea.mat-mdc-input-element').last();
        this._companyInfoLocalizationLanguageField = this.form.locator('div.mat-mdc-select-trigger');
        this._companyAbout = page.getByText('About company');
        this._companyContactEmail = this.page.locator('state-property-view[propname="feature_company_fields_contact_email"]');
        this._companyContactPhone = this.page.locator('state-property-view[propname="feature_company_fields_contact_phone"]');
        this._companyCountry = this.page.locator('state-property-view[propname="feature_panel_additional_info_country"]');
        this._companyUsersCabinet = this.page.locator('state-property-view[propname="feature_company_cabinet_header"]');
        this._companyDisplayInAdvertising = page.getByText('Display in advertising');
        this._companyLanguageForEmails = this.page.locator('state-property-view[propname="feature_user_email_language_title"]');
        this._companyGuestEngineers = this.page.locator('state-property-view[propname="feature_guest_engineers_control_title"]');
        this._companyAutoProcessingConAppl = page.getByText('Auto processing of connection applications');
        this._companyAutoProcessingDisconAppl = page.getByText('Auto processing of disconnection applications');
        this._companyEventCategories = this.page.locator('state-property-view[propname="feature_event_category_title"]');
        this._companyChangeLogoButton = page.getByText('Change logo');
        this._companyDeleteLogoButton = page.getByText('Delete logo');
        this._companyDefaultLogo = this.page.locator('img[src="./assets/icons/gradient/gradient-company-default.svg"]');
        this._companyAddLocalizationButton = this.page.locator('div.add-block');
        this._companyDeleteLocalizationButton = this.page.locator('span.delete_point');
        this._companySettingsTitle = page.getByText('Company settings');

        this._companyServerList = page.getByText('Server list', {exact: true});
        this._companyIntegration = page.getByText('Integration', {exact: true});
        this._companyAdditionalSoftware = page.getByText('Additional software', {exact: true});
        this._companyNameServerField = this.page.locator('input.mat-mdc-input-element').nth(0);
        this._companyDnsServerField = this.page.locator('input.mat-mdc-input-element').nth(1);
        this._companyPortServerField = this.page.locator('input.mat-mdc-input-element').nth(2);
        this._companyServerNameInfo = this.page.locator('div.server-name');
        this._companyServerDnsPortInfo = this.page.locator('.part__item-text-small');

        this._companyServerAddButton = page.getByText('Add server');
        this._companyAddButton = page.getByText('Add company');
        this._companyAddGroupButton = page.getByText('Add new group');
        this._companyCloseButton = page.getByText('Close company');
        this._companyCountryFilter = page.getByText('All countries').and(this.page.locator('span'));
        this._companyRoleFilter = this.page.locator('span:text-is("All roles")');
        this._companyAllFilter = this.page.locator('span:text-is("All")');
        this._companySearchField = this.page.locator('input[placeholder*="Company search"]');
        this._companySearchByHubField = this.page.locator('input[placeholder*="All panels"]');
        this._companySelectCommandField = page.getByText('Select command');
        this._companySearchByLogin = page.getByText('Login').and(this.page.locator('.tab-item'));
        this._companySearchByNumber = page.getByText('Serial number').and(this.page.locator('.tab-item'));
        this._companySearchByAccount = page.getByText('Account').and(this.page.locator('.tab-item'));

        this._actionsCheckbox = page.getByText('Actions');
        this._companyChangeAdminLogin = page.getByText('Change admin login');
        this._companyAddToGroupButton = page.getByText('Add company to group');
        this._companyAddNewGroupButton = page.getByText('Add new group');

        this._employeeEmailField = this.form.locator('input[formcontrolname="email"]');
        this._employeeNameField = this.form.locator('input[formcontrolname="pib"]');
        this._employeePhoneField = this.form.locator('input[formcontrolname="phone"]');
        this._employeeRoleField = this.page.locator('span:text-is("Select role")');
        this._employeeDeleteManager = page.getByRole('button', {name: 'Delete'});
        this._employeeSearchField = this.page.locator('input[placeholder*="Enter the"]');
        this._employeeBlock = this.page.locator('div.part__item');
    }

    get form(): Locator {
        return this._form;
    }

    get companyInfoName(): Locator {
        return this._companyInfoName;
    }

    get companyInfoContacts(): Locator {
        return this._companyInfoContacts;
    }

    get companyInfoDescription(): Locator {
        return this._companyInfoDescription;
    }

    get companyAbout(): Locator {
        return this._companyAbout;
    }

    get companyContactEmail(): Locator {
        return this._companyContactEmail;
    }

    get companyContactPhone(): Locator {
        return this._companyContactPhone;
    }

    get companyCountry(): Locator {
        return this._companyCountry;
    }

    get companyDisplayInAdvertising(): Locator {
        return this._companyDisplayInAdvertising;
    }

    get companyLanguageForEmails(): Locator {
        return this._companyLanguageForEmails;
    }

    get companyGuestEngineers(): Locator {
        return this._companyGuestEngineers;
    }

    get companyEventCategories(): Locator {
        return this._companyEventCategories;
    }

    get companyAutoProcessingConAppl(): Locator {
        return this._companyAutoProcessingConAppl;
    }

    get companyAutoProcessingDisconAppl  (): Locator {
        return this._companyAutoProcessingDisconAppl ;
    }

    get companyUsersCabinet (): Locator {
        return this._companyUsersCabinet;
    }

    get companyChangeLogoButton (): Locator {
        return this._companyChangeLogoButton;
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

    get companyAddGroupButton (): Locator {
        return this._companyAddGroupButton ;
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

    get companyServerNameInfo (): Locator {
        return this._companyServerNameInfo;
    }

    get companyServerDnsPortInfo (): Locator {
        return this._companyServerDnsPortInfo;
    }

    get companyAddButton (): Locator {
        return this._companyAddButton;
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

    get companyCloseButton (): Locator {
        return this._companyCloseButton;
    }

    get companyCountryFilter (): Locator {
        return this._companyCountryFilter;
    }

    get companyRoleFilter (): Locator {
        return this._companyRoleFilter;
    }

    get companyAllFilter (): Locator {
        return this._companyAllFilter;
    }

    get companySearchField (): Locator {
        return this._companySearchField;
    }

    get companyDeleteLogoButton (): Locator {
        return this._companyDeleteLogoButton;
    }

    get companyDefaultLogo (): Locator {
        return this._companyDefaultLogo;
    }

    get companyChangeAdminLogin (): Locator {
        return this._companyChangeAdminLogin;
    }

    get companyAddToGroupButton (): Locator {
        return this._companyAddToGroupButton;
    }

    get companyAddNewGroupButton (): Locator {
        return this._companyAddNewGroupButton;
    }

    get companySelectCommandField (): Locator {
        return this._companySelectCommandField;
    }

    get actionsCheckbox  (): Locator {
        return this._actionsCheckbox ;
    }

    get companySearchByLogin (): Locator {
        return this._companySearchByLogin;
    }

    get companySearchByNumber (): Locator {
        return this._companySearchByNumber;
    }

    get companySearchByAccount (): Locator {
        return this._companySearchByAccount;
    }

    get companySearchByHubField (): Locator {
        return this._companySearchByHubField;
    }

}




