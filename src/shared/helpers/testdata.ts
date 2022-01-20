export const credentials = {
    invalid: {
        username: 'test@gmail.com',
        password: '12345678'
    },
    valid: {
        usernameCRA: 'TEST\\U903662',
        usernameCRA_Protekta: '',
        usernameCIA: 'TEST\\U903257',
        usernameIAA: 'TEST\\U903662',
        usernameXCA: 'TEST\\U903634',
        password: 'Compaq@1'
    }
};
export const partnerNumber = {
    personal: {
        male1: '10079196',
        male2: '11752272',
        male3: '10071264',
        female: 'P-2400-2945',
        peterMuller: 'P-1241-1850'
    },
    companyList: {
        company1: '13771183',
        company2: 'P-1537-7598',
        company3: '10181768'
    },
    group: {
        group1: 'P24003829'
    }
};

export const commonClaimNumberForInspection = '840011012882';

export enum ScreenName {
    Settings = 'settings',
    Start = 'start',
    Notification = 'notification',
    Menu = 'menu',
    PartnerNotification = 'partnerNotification',
    NewFreeTextTask = 'new free text task',
    BasicData = 'basic data',
    PartnerRelation = 'partner relations',
    Contracts = 'contracts',
    Offers = 'offers',
    Claims = 'claims',
    ClaimOverview = 'claim overview',
    Documents = 'documents',
    AddDocument = 'add document',
    ForeignContractDetails = 'foreign contract details',
    ContractDetails = 'contract details',
    ScannedDocPreview = 'scanned doc preview',
    ScannedForeignContractPreview = 'scanned foreign contract preview',
    EditPartner = 'edit partner'
}

export enum ScreenSelector {
    settingScreen = 'app-settings',
    startScreen = 'app-overview',
    notificationModalScreen = 'app-notification-modal',
    taskListScreen = 'app-task-list',
    newFreeTextTaskScreen = 'app-freetext-task',
    menuScreen = 'app-menu',
    basicDataScreen = 'app-basic-partner',
    partnerRelationScreen = 'app-partner-relations',
    contractScreen = 'app-contract',
    contractDetailsScreen = 'app-contract-detail',
    foreignContractDetailsScreen = 'app-foreign-contract-detail',
    offersScreen = 'app-offer',
    claimsScreen = 'app-claim',
    claimOverviewScreen = 'app-claim-detail',
    documentsScreen = 'app-document',
    addDocumentScreen = 'app-add-document',
    searchPartnerScreen = 'page-partner-search',
    partnerModification = 'app-partner-modification-modal',
    communicationDetails = 'communication-detail',
    scannedForeignContractPreview = 'app-preview-foreign-contract-modal',
    scannedDocumentPreview = 'app-image-preview-modal'
}

export enum MenuName {
    BasicData = 'Basic Data',
    PartnerRelation = 'Partner Relations',
    Contracts = 'Contracts',
    Offers = 'Offers',
    Claims = 'Claims',
    Documents = 'Documents'
}

export enum ButtonName {
    Setting = 'setting',
    Home = 'home',
    ActionMenu = 'action menu',
    Notification = 'notification',
    Back = 'back',
    Close = 'close',
    Done = 'done'
}

export enum SegmentName {
    Favorites = 'Favorites',
    Recent = 'Recent'
}

export enum ComponentIcon {
    ErrorIcon = 'Error Icon',
    SuccessIcon = 'Success Icon',
    HourGlassIcon = 'Hour Glass Icon'
}
