import {englishTranslation} from '@shared/assets/eng';

export const favoritePartnerParameters = [
    {
        description: 'should be able to add favorite partner ',
        partnerNumber: 'P-1175-2272',
        partnerInfo: 'Claudio Schuerch\n31.10.1968 (52)\nAdolf-Frey-Strasse, 5000 Aarau'
    },
    {
        description: 'should be able to add favorite partner ',
        partnerNumber: 'P-1007-9196',
        partnerInfo: 'Bruno Zebert\n27.03.1972 (48)\nroute de Berne 4, 1000 Lausanne 25'
    },
    {
        description: 'should be able to add favorite partner ',
        partnerNumber: 'P-1816-0469',
        partnerInfo: 'Johanna Schluep\navenue Jean-Bourgknecht, 1700 Fribourg'
    },
    {
        description: 'should be able to add favorite partner ',
        partnerNumber: 'P-1233-5156',
        partnerInfo: 'Bruno Praz\n12.07.1936 (84)\nAhornweg 5, 5000 Aarau'
    },
    {
        description: 'should be able to add favorite partner ',
        partnerNumber: 'P-2421-1863',
        partnerInfo: 'Ueli Tester\n01.01.1955 (65)\nBahnhofstrasse 5, 3400 Burgdorf'
    },
    {
        description: 'should be able to add favorite partner ',
        partnerNumber: 'P-2420-4042',
        partnerInfo: 'KMU Test AG\nAarestrasse 35, 5000 Aarau'
    },
    {
        description: 'should be able to add favorite partner ',
        partnerNumber: 'P-1050-6126',
        partnerInfo: 'Bruno Hofstetter\n19.12.1933 (86)\nchemin de Genièvre, 1616 Attalens'
    }
];

export const paramFavoritePartnerInfo = [
    {
        description: 'should display the favorite partner: ',
        notYetDownloadedPartnerInfo: 'Claudio Schuerch\n31.10.1968\nAdolf-Frey-Strasse, 5000 Aarau',
        downloadedPartnerInfo: 'Claudio Schuerch\n31.10.1968 (52)\nAdolf-Frey-Strasse, 5000 Aarau',
        partnerName: 'Claudio Schuerch'
    },
    {
        description: 'should display the favorite partner: ',
        notYetDownloadedPartnerInfo: 'Bruno Zebert\n27.03.1972\nroute de Berne 4, 1000 Lausanne 25',
        downloadedPartnerInfo: 'Bruno Zebert\n27.03.1972 (48)\nroute de Berne 4, 1000 Lausanne 25',
        partnerName: 'Bruno Zebert'
    },
    {
        description: 'should display the favorite partner: ',
        notYetDownloadedPartnerInfo: 'Johanna Schluep\navenue Jean-Bourgknecht, 1700 Fribourg',
        downloadedPartnerInfo: 'Johanna Schluep\navenue Jean-Bourgknecht, 1700 Fribourg',
        partnerName: 'Johanna Schluep'
    },
    {
        description: 'should display the favorite partner: ',
        notYetDownloadedPartnerInfo: 'Bruno Praz\n12.07.1936\nAhornweg 5, 5000 Aarau',
        downloadedPartnerInfo: 'Bruno Praz\n12.07.1936 (84)\nAhornweg 5, 5000 Aarau',
        partnerName: 'Bruno Praz'
    },
    {
        description: 'should display the favorite partner: ',
        notYetDownloadedPartnerInfo: 'Ueli Tester\n01.01.1955\nBahnhofstrasse 5, 3400 Burgdorf',
        downloadedPartnerInfo: 'Ueli Tester\n01.01.1955 (65)\nBahnhofstrasse 5, 3400 Burgdorf',
        partnerName: 'Ueli Tester'
    },
    {
        description: 'should display the favorite partner: ',
        notYetDownloadedPartnerInfo: 'KMU Test AG\nAarestrasse 35, 5000 Aarau',
        downloadedPartnerInfo: 'KMU Test AG\nAarestrasse 35, 5000 Aarau',
        partnerName: 'KMU Test AG'
    },
    {
        description: 'should display the favorite partner: ',
        notYetDownloadedPartnerInfo: 'Bruno Hofstetter\n19.12.1933\nchemin de Genièvre, 1616 Attalens',
        downloadedPartnerInfo: 'Bruno Hofstetter\n19.12.1933 (87)\nchemin de Genièvre, 1616 Attalens',
        partnerName: 'Bruno Hofstetter'
    }
];

export const nonFavoritePartnerParameters = [
    {
        description: 'should display the non-favorite partner: ',
        partnerNumber: 'P-2422-1119',
        partnerInfo: 'Peter Muller\n01.01.1967 (53)\nGuntenfluhweg 1, 4710 Balsthal'
    }
];

export const paramNonFavoritePartners = [
    {
        partnerNumber: 'P-1182-0250',
        partnerInfo: '',
        partnerName: ''
    },
    {
        partnerNumber: 'P-1471-3550',
        partnerInfo: '',
        partnerName: ''
    },
    {
        partnerNumber: 'P-1023-1404',
        partnerInfo: '',
        partnerName: ''
    }
];

export const mobiHintForFavoritePartner = [
    {
        description: 'should display proper mobi hint about favorite partners in English : ',
        language: 'English',
        titleAndContent: englishTranslation.emptyFavoritesTitle.concat(englishTranslation.emptyFavoritesContent)
    }
];

export const menuParameters = [
    {
        description: 'should display errorIcon icon on header when navigating to menu: ',
        menuName: 'Basic Data'
    },
    {
        description: 'should display errorIcon icon on header when navigating to menu: ',
        menuName: 'Partner Relations'
    },
    {
        description: 'should display errorIcon icon on header when navigating to menu: ',
        menuName: 'Contracts'
    },
    {
        description: 'should display errorIcon icon on header when navigating to menu: ',
        menuName: 'Offers'
    },
    {
        description: 'should display errorIcon icon on header when navigating to menu: ',
        menuName: 'Claims'
    },
    {
        description: 'should display errorIcon icon on header when navigating to menu: ',
        menuName: 'Documents'
    }
];

export const documentTypeAndCategory = [
    {
        category: 'Vertragsdokumente',
        type: 'Offerte-Antrag'
    },
    {
        category: 'Vollmacht',
        type: 'Mandat'
    },
    {
        category: 'Vollmacht',
        type: 'Treuhänderinformation'
    },
    {
        category: 'Beratung / Vertrieb',
        type: 'Ausschreibung Broker'
    },
    {
        category: 'Vertragsdokumente',
        type: 'Fremdvertrag'
    },
    {
        category: 'Korrespondenzdokumente',
        type: 'Korrespondenz Allgemein-Dokumente (Initial)'
    },
    {
        category: 'Vollmacht',
        type: 'Vollmacht'
    },
    {
        category: 'Beleg / Schätzung / Wertnachweis',
        type: 'Bestätigung Fahrsicherheitskurse'
    },
    {
        category: 'Amtliche Dokumente',
        type: 'Amtliche Akten/Dokumente (Initial)'
    },
    {
        category: 'Korrespondenzdokumente',
        type: 'Kündigung'
    },
    {
        category: 'Beratung / Vertrieb',
        type: 'Beratungsprotokoll'
    }
];
