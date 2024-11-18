import { BasePage } from "../BasePage";
import { Page, Locator } from "@playwright/test";

export class SuperAdminPage extends BasePage {
    readonly page: Page;

    private readonly _form: Locator;
    private readonly _pushLetterLocalization: Locator;
    private readonly _pushTestButton: Locator;
    private readonly _letterPreview: Locator;
    private readonly _pushLetterTemplateTitle: Locator;
    private readonly _letterParameters: Locator;
    private readonly _emailTestButton: Locator;
    private readonly _emailTestField: Locator;
    private readonly _consoleApplication: Locator;
    private readonly _testEmailButton: Locator;
    private readonly _uploadFirmwareButton: Locator;
    private readonly _uploadFirmwareCode: Locator;
    private readonly _uploadFirmwareName: Locator;
    private readonly _upLoadFirmwareSelectFile: Locator;
    private readonly _upLoadFirmwareWinSelectFile: Locator;
    private readonly _upLoadFirmwareLinuxSelectFile: Locator;
    private readonly _utilsExtractVersionButton: Locator;
    private readonly _utilsAddEmailToWhitelistButton: Locator;
    private readonly _utilsWhitelistEmailBlock: Locator;
    private readonly _routingReloudIcon: Locator;
    private readonly _companyRemovePermissionButton: Locator;
    private readonly _statisticsFilter: Locator;
    private readonly _statisticsEntity: Locator;
    private readonly _historyDate: Locator;
    private readonly _historyChangeMonth: Locator;
    private readonly _historyCalendarDayEntity: Locator;
    private readonly _employeeBlock: Locator;

    private readonly _profileNameBlock: Locator;
    private readonly _profilePhoneBlock: Locator;
    private readonly _profileLanguageBlock: Locator;

    private readonly _firmware: Locator;
    private readonly _utils: Locator;
    private readonly _letterTemplates: Locator;
    private readonly _push: Locator;
    private readonly _email: Locator;
    private readonly _statistics: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this._form = page.locator('form');
        this._consoleApplication = page.getByText('Console Application',{ exact: true });
        this._testEmailButton = page.getByText('Test email for all language');
        this._pushLetterLocalization = this.page.locator('.template-tab');
        this._letterPreview = this.page.locator('.preview-section');
        this._pushLetterTemplateTitle = this.page.locator('.constant_block-title');
        this._letterParameters = this.page.locator('label.ng-star-inserted');
        this._pushTestButton = page.getByText('Test push');
        this._emailTestButton = page.getByText('Test email');
        this._emailTestField = this.page.locator('.mat-mdc-form-field').locator(this.page.locator('.mat-mdc-input-element'));
        this._uploadFirmwareButton = page.getByText('Upload panel firmware').or(page.getByText('Upload console application firmware'));
        this._upLoadFirmwareSelectFile = this.page.locator('#file');
        this._upLoadFirmwareWinSelectFile = this.page.locator('#fileWin');
        this._upLoadFirmwareLinuxSelectFile = this.page.locator('#fileLinux');
        this._uploadFirmwareCode = this.page.locator('#mat-input-2');
        this._uploadFirmwareName = this.page.locator('#mat-input-3');
        this._utilsExtractVersionButton = page.getByText('Extract version');
        this._utilsAddEmailToWhitelistButton = page.getByText('Add email to whitelist');
        this._utilsWhitelistEmailBlock = this.page.locator('.blacklisted_panel');
        this._routingReloudIcon = page.locator('use[*|href="#icon-reload"]');
        this._companyRemovePermissionButton = page.getByText(' Remove support permissions ');
        this._statisticsFilter = this.page.locator('.input_block-input--select');
        this._statisticsEntity = this.page.locator('.statistics-main-block');
        this._historyDate = page.locator('.input-part-interval');
        this._historyChangeMonth = page.locator('.change_month');
        this._historyCalendarDayEntity = page.locator('.calendar__day');
        this._employeeBlock = this.page.locator('.input_block.constant_block.constant_block-action').nth(0);

        this._profileNameBlock = this.page.locator('.input_block.constant_block.constant_block-action').nth(0);
        this._profilePhoneBlock = this.page.locator('.input_block.constant_block.constant_block-action').nth(1);
        this._profileLanguageBlock = this.page.locator('.input_block.constant_block.constant_block-action').nth(2);


        this._firmware = page.getByText('Firmware version');
        this._utils = page.getByText('Utils');
        this._letterTemplates = page.getByText('Letter templates');
        this._push = page.getByText('Push');
        this._email = page.getByText('Email',{ exact: true })
        this._statistics = page.getByText('Statistics',{ exact: true });
    }

    get form(): Locator {
        return this._form;
    }

    get uploadFirmwareButton (): Locator {
        return this._uploadFirmwareButton;
    }

    get statisticsFilter (): Locator {
        return this._statisticsFilter;
    }

    get statisticsEntity (): Locator {
        return this._statisticsEntity;
    }

    get upLoadFirmwareSelectFile (): Locator {
        return this._upLoadFirmwareSelectFile;
    }

    get upLoadFirmwareWinSelectFile (): Locator {
        return this._upLoadFirmwareWinSelectFile;
    }

    get profileNameBlock (): Locator {
        return this._profileNameBlock;
    }

    get profilePhoneBlock (): Locator {
        return this._profilePhoneBlock;
    }

    get profileLanguageBlock (): Locator {
        return this._profileLanguageBlock;
    }

    get upLoadFirmwareLinuxSelectFile (): Locator {
        return this._upLoadFirmwareLinuxSelectFile;
    }

    get uploadFirmwareCode (): Locator {
        return this._uploadFirmwareCode;
    }

    get uploadFirmwareName (): Locator {
        return this._uploadFirmwareName;
    }

    get consoleApplication (): Locator {
        return this._consoleApplication;
    }

    get historyDate (): Locator {
        return this._historyDate ;
    }

    get employeeBlock (): Locator {
        return this._employeeBlock ;
    }

    get historyCalendarDayEntity (): Locator {
        return this._historyCalendarDayEntity ;
    }

    get historyChangeMonth (): Locator {
        return this._historyChangeMonth ;
    }

    get pushLetterLocalization (): Locator {
        return this._pushLetterLocalization;
    }

    get letterPreview (): Locator {
        return this._letterPreview;
    }

    get pushLetterTemplateTitle (): Locator {
        return this._pushLetterTemplateTitle;
    }

    get letterParameters (): Locator {
        return this._letterParameters;
    }

    get testEmailButton (): Locator {
        return this._testEmailButton;
    }

    get pushTestButton(): Locator {
        return this._pushTestButton;
    }

    get emailTestButton (): Locator {
        return this._emailTestButton;
    }

    get emailTestField (): Locator {
        return this._emailTestField;
    }

    get utilsExtractVersionButton (): Locator {
        return this._utilsExtractVersionButton;
    }

    get utilsAddEmailToWhitelistButton (): Locator {
        return this._utilsAddEmailToWhitelistButton;
    }

    get utilsWhitelistEmailBlock (): Locator {
        return this._utilsWhitelistEmailBlock;
    }

    get routingReloudIcon(): Locator {
        return this._routingReloudIcon ;
    }

    get companyRemovePermissionButton(): Locator {
        return this._companyRemovePermissionButton ;
    }

    get firmware (): Locator {
        return this._firmware;
    }

    get letterTemplates (): Locator {
        return this._letterTemplates;
    }

    get push (): Locator {
        return this._push;
    }

    get email (): Locator {
        return this._email;
    }

    get utils(): Locator {
        return this._utils;
    }

    get statistics(): Locator {
        return this._statistics;
    }

}