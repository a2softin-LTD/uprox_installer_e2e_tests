import { BasePage } from "../BasePage";
import {Page, Locator, expect} from "@playwright/test";

export class HubPage extends BasePage {
    readonly page: Page;
    private readonly _modal: Locator;
    private readonly _system: Locator;
    private readonly _users: Locator;
    private readonly _history: Locator;
    private readonly _addUserName: Locator;
    private readonly _addUserEmail: Locator;
    private readonly _transferOwnershipButton: Locator;
    private readonly _hubPanel: Locator;
    private readonly _hubRebootButton: Locator;
    private readonly _hubRebootSubmitButton: Locator;
    private readonly _userManagement: Locator;
    private readonly _userManagementEnable: Locator;
    private readonly _userManagementDisable: Locator;
    private readonly _deleteHubIcon: Locator;
    private readonly _addPanelButton: Locator;
    private readonly _addPanelEnterSerialButton: Locator;
    private readonly _countryField: Locator;
    private readonly _countryUkraine: Locator;
    private readonly _userBlock: Locator;
    private readonly _userAllowMobileAppManagementFromHome: Locator;
    private readonly _groupAddGroupButton: Locator;
    private readonly _groups: Locator;
    private readonly _groupNameField: Locator;
    private readonly _groupDeleteButton: Locator;
    private readonly _groupBlockWithName: Locator;
    private readonly _requests: Locator;
    private readonly _requestsCreateApplicationButton: Locator;
    private readonly _requestsContactPhoneField: Locator;
    private readonly _requestsLocationField: Locator;
    private readonly _requestsNoteField: Locator;
    private readonly _hubCorpNameAccountInfo: Locator;
    private readonly _hubCorpNumberConnectionInfo: Locator;
    private readonly _hubPowerNormalIcon: Locator;
    private readonly _hubPowerTroubleIcon: Locator;
    private readonly _hubTamperCloseIcon: Locator;
    private readonly _hubTamperOpenIcon: Locator;
    private readonly _hubBatteryIcon: Locator;
    private readonly _hubBatteryDetailedIcon: Locator;
    private readonly _hubEthernetTroubleIcon: Locator;
    private readonly _hubEthernetDefaultIcon: Locator;
    private readonly _hubGsmMaxIcon: Locator;
    private readonly _hubGsmGoodIcon: Locator;
    private readonly _hubGsmNormalIcon: Locator;
    private readonly _hubGsmLowIcon: Locator;
    private readonly _hubSimCardNoneIcon: Locator;
    private readonly _hubSimCardDefaultIcon: Locator;
    private readonly _hubWifiMaxIcon: Locator;
    private readonly _hubWifiGoodIcon: Locator;
    private readonly _hubWifiNormalIcon: Locator;
    private readonly _hubWifiLowIcon: Locator;
    private readonly _troubles: Locator;
    private readonly _firstWirelessDevice: Locator;
    private readonly _deleteNotExactButton: Locator;

    private readonly _historyAlarmCheckBox: Locator;
    private readonly _historyTroublesCheckBox: Locator;
    private readonly _historyArmsCheckBox: Locator;
    private readonly _historyActionsCheckBox: Locator;
    private readonly _historyFirstEvent: Locator;
    private readonly _historyLastEvent: Locator;
    private readonly _historyEvent: Locator;
    private readonly _settingsAirAlarm: Locator;
    private readonly _settingsKeypadCodeLength: Locator;
    private readonly _settingsKeypadCodeLength4digits: Locator;
    private readonly _settingsKeypadCodeLength6digits: Locator;
    private readonly _settingsArmKeypadCode: Locator;
    private readonly _settingsKeypadCodeField: Locator;
    private readonly _wirelessDevicePowerNormalIcon: Locator;
    private readonly _wirelessDevicePowerTroubleIcon: Locator;
    private readonly _wirelessDeviceTamperCloseIcon: Locator;
    private readonly _wirelessDeviceTamperOpenIcon: Locator;
    private readonly _wirelessDeviceBatteryIcon: Locator;
    private readonly _wirelessDeviceAddButton: Locator;

    private readonly _settingsGroup: Locator;
    private readonly _settingsLightIndication: Locator;
    private readonly _settingsCountry: Locator;
    private readonly _settingsAutoCancelAlarm: Locator;
    private readonly _settingsFirmwareUpdate: Locator;
    private readonly _settingsTrackSimCardExpenses: Locator;
    private readonly _settingsTimeZone: Locator;
    private readonly _settingsHubName: Locator;

    private readonly _settingsKeyfob: Locator;
    private readonly _settingsKeyfobImage: Locator;
    private readonly _settingsCallOnAlarm: Locator;
    private readonly _settingsPanicButton: Locator;
    private readonly _settingsEventCategories: Locator;
    private readonly _settingsUserManagement: Locator;
    private readonly _settingsMobileApp: Locator;


    private readonly _hubEngineerModeSwitch: Locator;
    private readonly _hubInfoCity: Locator;
    private readonly _hubInfoStreet: Locator;
    private readonly _hubInfoStreetEditButton: Locator;
    private readonly _hubInfoStreetEditField: Locator;
    private readonly _hubInfoBuilding: Locator;
    private readonly _hubInfoApartment: Locator;
    private readonly _settingsWifiNetwork: Locator;
    private readonly _hubsCounter: Locator;
    private readonly _hubTroublesState: Locator;

    private readonly _automationCreateReactionButton: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this._modal = page.locator('.main__modal active');
        this._users = page.getByText('Users').and(this.page.locator('.navbar__sub-text'));
        this._history = page.getByText('History',{ exact: true });
        this._system = page.getByText('System',{ exact: true });
        this._addUserName = this.page.locator('#name');
        this._addUserEmail = this.page.locator('#email');
        this._transferOwnershipButton = page.getByText('Transfer ownership');
        this._hubPanel = this.page.locator('.main-block__panel-item');
        this._hubRebootButton = page.getByText('Restart panel');
        this._hubRebootSubmitButton = page.getByText('Restart', { exact: true });

        this._userManagement = page.getByText('User management');
        this._userManagementEnable = page.getByText('Enable').first();
        this._userManagementDisable = page.getByText('Disable').nth(1);
        this._deleteHubIcon = page.locator('.icon.body-icon.body-icon--action.ng-star-inserted');
        this._deleteNotExactButton = page.getByText('Delete');
        this._addPanelButton = page.getByText('Add panel');
        this._addPanelEnterSerialButton = page.getByText('Enter the serial number of the device');
        this._countryField = this.page.locator('.mat-mdc-autocomplete-trigger').first();
        this._countryUkraine = page.getByText('Ukraine').and(this.page.locator('.part__item-text'));;
        this._userBlock = this.page.locator('.panel-header_text-block').last();
        this._userAllowMobileAppManagementFromHome = page.getByText('Allow control from U-Prox Home application');
        this._groupAddGroupButton = page.getByText('Add group');
        this._groups = page.getByText('Groups',{ exact: true });
        this._groupNameField = this.page.locator('.input_block-input');
        this._groupDeleteButton = page.getByText('Delete group');
        this._groupBlockWithName = this.page.locator('.input_block.constant_block.constant_block-action');
        this._requests = page.getByText('Requests',{ exact: true });
        this._requestsCreateApplicationButton = page.getByText('Create application',{ exact: true });
        this._requestsContactPhoneField = this.page.locator('.input_block-input').nth(1);
        this._requestsLocationField = this.page.locator('.input_block-input').nth(2);
        this._requestsNoteField = this.page.locator('.input_block-input').nth(3);
        this._hubCorpNameAccountInfo = this.page.locator('div.part__item-text--main');
        this._hubCorpNumberConnectionInfo = this.page.locator('div.part__item-text--small');
        this._hubsCounter = this.page.locator('h3.list__header-text');
        this._hubTroublesState = this.page.locator('.Warning').or(this.page.locator('.Trouble'));
        this._hubEngineerModeSwitch = this.page.locator('span.slider.round');
        this._hubPowerNormalIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="power-normal"]')});
        this._hubPowerTroubleIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="power-trouble"]')});
        this._hubTamperCloseIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="tamper-close"]')});
        this._hubTamperOpenIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="tamper-open"]')});
        this._hubBatteryIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="battery-full"]')});
        this._hubEthernetDefaultIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="ethernet-default"]')});
        this._hubEthernetTroubleIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="ethernet-trouble"]')});
        this._hubGsmGoodIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="gsm-good"]')});
        this._hubGsmMaxIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="gsm-max"]')});
        this._hubGsmNormalIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="gsm-normal"]')});
        this._hubGsmLowIcon  = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="gsm-low"]')});
        this._hubSimCardNoneIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="sim-card-none"]')});
        this._hubSimCardDefaultIcon  = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="sim-card-default"]')});
        this._hubWifiGoodIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="wifi-signal-good"]')});
        this._hubWifiMaxIcon  = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="wifi-signal-max"]')});
        this._hubWifiNormalIcon  = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="wifi-signal-normal"]')});
        this._hubWifiLowIcon = this.page.locator('.group_and_panel-state').filter({has:this.page.locator('mat-icon[data-mat-icon-name="wifi-signal-low"]')});
        this._hubBatteryDetailedIcon = this.page.locator('.state-icon-block').filter({has:this.page.locator('mat-icon[data-mat-icon-name="battery-full"]')});

        this._wirelessDevicePowerNormalIcon = this.page.locator('.part-content__device-list').filter({has:this.page.locator('mat-icon[data-mat-icon-name="power-normal"]')});
        this._wirelessDevicePowerTroubleIcon = this.page.locator('.part-content__device-list').filter({has:this.page.locator('mat-icon[data-mat-icon-name="power-trouble"]')});
        this._wirelessDeviceTamperCloseIcon = this.page.locator('.part-content__device-list').filter({has:this.page.locator('mat-icon[data-mat-icon-name="tamper-close"]')});
        this._wirelessDeviceTamperOpenIcon = this.page.locator('.part-content__device-list').filter({has:this.page.locator('mat-icon[data-mat-icon-name="tamper-open"]')});
        this._wirelessDeviceBatteryIcon = this.page.locator('.part-content__device-list').filter({has:this.page.locator('mat-icon[data-mat-icon-name="battery-full"]')});
        this._wirelessDeviceAddButton = page.getByText('Add wireless device');
        this._troubles = page.getByText('Troubles',{ exact: true });
        this._firstWirelessDevice = page.locator('.part__item.ng-star-inserted').nth(1);

        this._automationCreateReactionButton = page.getByText('Create schedule',{ exact: true });




        this._historyAlarmCheckBox = this.page.locator('.checkbox__block').nth(0);
        this._historyTroublesCheckBox = this.page.locator('.checkbox__block').nth(1);
        this._historyArmsCheckBox = this.page.locator('.checkbox__block').nth(2);
        this._historyActionsCheckBox = this.page.locator('.checkbox__block').nth(3);
        this._historyFirstEvent = this.page.locator('.part__item--checked').first();
        this._historyEvent = this.page.locator('.part__item--checked');
        this._historyLastEvent = this.page.locator('.part__item--checked').last();

        this._settingsAirAlarm = page.getByText('Air raid alarms');
        this._settingsKeypadCodeLength = page.getByText('Keypad code length');
        this._settingsKeypadCodeLength4digits = page.getByText('4 digits');
        this._settingsKeypadCodeLength6digits = page.getByText('6 digits');
        this._settingsArmKeypadCode = page.locator('.input_block').filter({hasText:'Arm/disarm keypad code'});
        this._settingsKeyfob = page.locator('.input_block').filter({hasText:'Keyfob'});
        this._settingsMobileApp = page.locator('.input_block').filter({hasText:'Mobile app'});
        this._settingsUserManagement = page.locator('.input_block').filter({hasText:'User management'});
        this._settingsCallOnAlarm = page.locator('.input_block').filter({hasText:'Call on alarm'});
        this._settingsPanicButton = page.locator('.input_block').filter({hasText:'Mobile panic button'});
        this._settingsEventCategories = page.locator('.input_block').filter({hasText:'Event categories'});
        this._settingsKeyfobImage = page.locator('.peripheral_item-block');


        this._settingsKeypadCodeField = this.page.locator('input[type="password"]');
        this._settingsGroup = page.getByText('Group');
        this._settingsWifiNetwork= page.getByText('Wi-Fi network');
        this._settingsCountry = this.page.locator('pc-panel-prop-view[propname="feature_panel_additional_info_country"]');
        this._settingsFirmwareUpdate = this.page.locator('pc-panel-prop-view[propname="feature_panel_firmware_auto_update_header"]');
        this._settingsAutoCancelAlarm = page.getByText('Auto cancel alarm');
        this._settingsTrackSimCardExpenses = this.page.locator('pc-panel-prop-view[propname="feature_sim_card_track_balance_header"]');
        this._settingsLightIndication = page.getByText('Light indication');
        this._settingsTimeZone = this.page.locator('pc-panel-prop-view[propname="feature_time_zone_name"]');
        this._settingsHubName = this.page.locator('pc-device-name-view[titlename="feature_device_name_panel_header"]');

        this._hubInfoCity = this.page.locator('addit-info-city input.input_block-input.ng-untouched.ng-pristine.ng-valid');
        this._hubInfoStreet = this.page.locator('addit-info-street input.input_block-input.ng-untouched.ng-pristine.ng-valid');
        this._hubInfoStreetEditButton = this.page.locator('.icon-edit.ng-star-inserted').last();
        this._hubInfoStreetEditField = this.page.locator('div.input_block.input_block-modal input.input_block-input').first();
        this._hubInfoBuilding = this.page.locator('div.building_block input.input_block-input.ng-untouched.ng-pristine.ng-valid').first();
        this._hubInfoApartment = this.page.locator('div.building_block input.input_block-input.ng-untouched.ng-pristine.ng-valid').last();

    }

    get modal(): Locator {
        return this._modal;
    }

    get users(): Locator {
        return this._users;
    }

    get history(): Locator {
        return this._history;
    }

    get system(): Locator {
        return this._system;
    }

    get addUserName(): Locator {
        return this._addUserName;
    }

    get addUserEmail(): Locator {
        return this._addUserEmail;
    }

    get transferOwnershipButton(): Locator {
        return this._transferOwnershipButton;
    }

    get hubPanel(): Locator {
        return this._hubPanel;
    }

    get hubRebootButton(): Locator {
        return this._hubRebootButton;
    }

    get hubRebootSubmitButton(): Locator {
        return this._hubRebootSubmitButton;
    }


    get userManagement(): Locator {
        return this._userManagement;
    }

    get userManagementEnable(): Locator {
        return this._userManagementEnable;
    }

    get userManagementDisable(): Locator {
        return this._userManagementDisable;
    }

    get deleteHubIcon(): Locator {
        return this._deleteHubIcon;
    }

    get addPanelButton(): Locator {
        return this._addPanelButton;
    }

    get addPanelEnterSerialButton(): Locator {
        return this._addPanelEnterSerialButton;
    }


    get countryField(): Locator {
        return this._countryField;
    }

    get countryUkraine(): Locator {
        return this._countryUkraine;
    }

    get userBlock(): Locator {
        return this._userBlock;
    }

    get userAllowMobileAppManagementFromHome(): Locator {
        return this._userAllowMobileAppManagementFromHome;
    }

    get groupAddGroupButton(): Locator {
        return this._groupAddGroupButton;
    }

    get groups(): Locator {
        return this._groups;
    }

    get groupNameField(): Locator {
        return this._groupNameField;
    }

    get groupDeleteButton(): Locator {
        return this._groupDeleteButton;
    }

    get groupBlockWithName(): Locator {
        return this._groupBlockWithName;
    }

    get requests(): Locator {
        return this._requests;
    }

    get requestsCreateApplicationButton(): Locator {
        return this._requestsCreateApplicationButton;
    }

    get requestsContactPhoneField(): Locator {
        return this._requestsContactPhoneField;
    }

    get requestsLocationField(): Locator {
        return this._requestsLocationField;
    }

    get requestsNoteField(): Locator {
        return this._requestsNoteField;
    }

    get hubPowerNormalIcon(): Locator {
        return this._hubPowerNormalIcon;
    }

    get hubPowerTroubleIcon(): Locator {
        return this._hubPowerTroubleIcon;
    }

    get hubTamperCloseIcon(): Locator {
        return this._hubTamperCloseIcon;
    }

    get hubTamperOpenIcon(): Locator {
        return this._hubTamperOpenIcon;
    }

    get hubBatteryIcon(): Locator {
        return this._hubBatteryIcon;
    }

    get hubEthernetDefaultIcon (): Locator {
        return this._hubEthernetDefaultIcon ;
    }

    get hubEthernetTroubleIcon (): Locator {
        return this._hubEthernetTroubleIcon ;
    }

    get hubGsmMaxIcon (): Locator {
        return this._hubGsmMaxIcon ;
    }

    get hubGsmGoodIcon (): Locator {
        return this._hubGsmGoodIcon ;
    }

    get hubGsmNormalIcon (): Locator {
        return this._hubGsmNormalIcon ;
    }

    get hubGsmLowIcon (): Locator {
        return this._hubGsmLowIcon ;
    }

    get hubSimCardNoneIcon (): Locator {
        return this._hubSimCardNoneIcon ;
    }

    get hubSimCardDefaultIcon (): Locator {
        return this._hubSimCardDefaultIcon ;
    }

    get hubWifiMaxIcon (): Locator {
        return this._hubWifiMaxIcon ;
    }

    get hubWifiGoodIcon (): Locator {
        return this._hubWifiGoodIcon ;
    }

    get hubWifiNormalIcon (): Locator {
        return this._hubWifiNormalIcon ;
    }

    get hubWifiLowIcon (): Locator {
        return this._hubWifiLowIcon ;
    }

    get wirelessDevicePowerNormalIcon(): Locator {
        return this._wirelessDevicePowerNormalIcon;
    }

    get wirelessDevicePowerTroubleIcon(): Locator {
        return this._wirelessDevicePowerTroubleIcon;
    }

    get wirelessDeviceTamperCloseIcon(): Locator {
        return this._wirelessDeviceTamperCloseIcon;
    }

    get wirelessDeviceTamperOpenIcon(): Locator {
        return this._wirelessDeviceTamperOpenIcon;
    }

    get wirelessDeviceBatteryIcon(): Locator {
        return this._wirelessDeviceBatteryIcon;
    }

    get wirelessDeviceAddButton(): Locator {
        return this._wirelessDeviceAddButton;
    }

    get troubles (): Locator {
        return this._troubles ;
    }

    get firstWirelessDevice (): Locator {
        return this._firstWirelessDevice ;
    }

    get deleteNotExactButton (): Locator {
        return this._deleteNotExactButton ;
    }

    get historyAlarmCheckBox (): Locator {
        return this._historyAlarmCheckBox ;
    }

    get historyTroublesCheckBox (): Locator {
        return this._historyTroublesCheckBox ;
    }

    get historyArmsCheckBox (): Locator {
        return this._historyArmsCheckBox ;
    }

    get historyActionsCheckBox (): Locator {
        return this._historyActionsCheckBox ;
    }

    get historyFirstEvent (): Locator {
        return this._historyFirstEvent ;
    }

    get historyLastEvent (): Locator {
        return this._historyLastEvent ;
    }

    get historyEvent (): Locator {
        return this._historyEvent ;
    }

    get settingsAirAlarm (): Locator {
        return this._settingsAirAlarm ;
    }

    get settingsKeypadCodeLength (): Locator {
        return this._settingsKeypadCodeLength ;
    }

    get settingsKeypadCodeLength4digits (): Locator {
        return this._settingsKeypadCodeLength4digits ;
    }

    get settingsKeypadCodeLength6digits (): Locator {
        return this._settingsKeypadCodeLength6digits ;
    }

    get settingsArmKeypadCode (): Locator {
        return this._settingsArmKeypadCode ;
    }

    get settingsKeypadCodeField (): Locator {
        return this._settingsKeypadCodeField ;
    }

    get settingsGroup (): Locator {
        return this._settingsGroup ;
    }

    get settingsLightIndication (): Locator {
        return this._settingsLightIndication ;
    }

    get hubEngineerModeSwitch (): Locator {
        return this._hubEngineerModeSwitch ;
    }

    get hubInfoCity (): Locator {
        return this._hubInfoCity ;
    }

    get hubInfoStreet (): Locator {
        return this._hubInfoStreet ;
    }

    get hubInfoBuilding (): Locator {
        return this._hubInfoBuilding;
    }

    get hubInfoApartment (): Locator {
        return this._hubInfoApartment ;
    }

    get hubInfoStreetEditButton (): Locator {
        return this._hubInfoStreetEditButton  ;
    }

    get hubInfoStreetEditField (): Locator {
        return this._hubInfoStreetEditField  ;
    }

    get settingsWifiNetwork (): Locator {
        return this._settingsWifiNetwork ;
    }

    get hubsCounter (): Locator {
        return this._hubsCounter ;
    }

    get hubCorpNameAccountInfo (): Locator {
        return this._hubCorpNameAccountInfo ;
    }

    get hubCorpNumberConnectionInfo (): Locator {
        return this._hubCorpNumberConnectionInfo ;
    }

    get hubTroublesState (): Locator {
        return this._hubTroublesState ;
    }

    get hubBatteryDetailedIcon (): Locator {
        return this._hubBatteryDetailedIcon ;
    }

    get settingsAutoCancelAlarm (): Locator {
        return this._settingsAutoCancelAlarm ;
    }

    get settingsCountry (): Locator {
        return this._settingsCountry ;
    }

    get settingsFirmwareUpdate (): Locator {
        return this._settingsFirmwareUpdate ;
    }

    get settingsTrackSimCardExpenses (): Locator {
        return this._settingsTrackSimCardExpenses ;
    }

    get settingsTimeZone (): Locator {
        return this._settingsTimeZone ;
    }

    get settingsHubName (): Locator {
        return this._settingsHubName ;
    }

    get settingsKeyfob (): Locator {
        return this._settingsKeyfob ;
    }

    get settingsKeyfobImage (): Locator {
        return this._settingsKeyfobImage ;
    }

    get settingsMobileApp (): Locator {
        return this._settingsMobileApp ;
    }

    get settingsCallOnAlarm (): Locator {
        return this._settingsCallOnAlarm ;
    }

    get settingsPanicButton (): Locator {
        return this._settingsPanicButton ;
    }

    get settingsEventCategories (): Locator {
        return this._settingsEventCategories ;
    }

    get settingsUserManagement(): Locator {
        return this._settingsUserManagement ;
    }

    get automationCreateReactionButton(): Locator {
        return this._automationCreateReactionButton ;
    }
}