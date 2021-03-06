const expectedPartialDamageList = [
    'Registration papers',
    'VIN/identification plate',
    'Overview',
    'Damage big',
    'Damage detail',
    'Damage detail',
    'Damage detail',
    'Damage detail',
    'Damage detail',
    'Previous damage',
    'Previous damage',
    'Meter count',
    'Bank account',
    'Ranger rapport',
    'Bill',
    'Investments',
    'Miscellaneous',
    '',
    ''
];
const expectedWriteOffList: Array<string> = [
    'Registration papers',
    'Right registration papers page without licence plate',
    'VIN/identification plate',
    'Overview diagonal front right',
    'Front',
    'Overview diagonal front left',
    'Overview diagonal back left',
    'Rear',
    'Overview diagonal back right',
    'Boot',
    'Roof',
    'Damage detail',
    'Damage detail',
    'Damage detail',
    'Damage detail',
    '1 Wheel',
    'Engine bay',
    'Whole dashboard',
    'Seats front',
    'Seats rear',
    'Belts/tensioner',
    'Dashboard with KM and running engine',
    'Service book & car key',
    'Bill/receipt',
    'Leasing contract',
    'Investments',
    'Bill',
    'Bill',
    'Bill',
    '',
    ''
];
const expectedHWSList: Array<string> = [
    'Registration papers',
    'VIN/identification plate',
    'Overview',
    'Damage detail',
    'Damage detail',
    'Rear',
    'Rear left side',
    'Rear right side',
    '90° angle from above',
    'Rear height with folding rule',
    'Belts/tensioner',
    'Driving seat with angle and folding rule',
    "Co-driver's seat with angle and folding rule",
    'Meter count',
    '',
    ''
];
const expectedAscendingVehicleList: Array<string> = [
    'Registration papers',
    'VIN/identification plate',
    'Overview',
    'Damage detail',
    'Damage detail',
    'Front',
    '90° angle from above',
    'Clearance left doors',
    'Clearance right doors',
    'Front height with folding rule',
    'Whole dashboard',
    'Meter count',
    '',
    ''
];
const expectedRiskAssessmentList: Array<string> = [
    'Registration papers',
    'VIN/identification plate',
    'Overview diagonal front left',
    'Overview diagonal back right',
    'Damage detail',
    'Damage detail',
    'Roof',
    'Roof',
    'Interior',
    'Interior',
    'Meter count',
    '',
    ''
];
const expectedAppreciationList: Array<string> = [
    'Registration papers',
    'Overview diagonal front left',
    'Overview diagonal back right',
    'Interior',
    'Engine bay',
    'Boot',
    'VIN/identification plate',
    'Meter count',
    'Special photo',
    'Special photo',
    'Damage (corrosion) of body',
    'Damage (dents/scratches) of body',
    'Damage/flaws of painting',
    'Damage of interior',
    'Service book & car key',
    'Bill/receipt',
    '',
    ''
];
const expectedXpertCheckList: Array<string> = [
    'Registration papers',
    'Maintenance booklet indicating last service',
    'VIN/identification plate',
    'Entire front end, eye-level',
    'Entire front end, hip-level',
    'Diagonal front left - entire vehicle',
    'Tyre & rim, front left',
    'Entire left side',
    'Tyre & rim, back left',
    'Diagonal back left - entire vehicle',
    'Entire back end',
    'Boot open',
    'Diagonal back right - entire vehicle',
    'Tyre & rim, back right',
    'Entire right side',
    'Tyre & rim, front right',
    'Diagonal front right - entire vehicle',
    'Interior, passenger side',
    'Interior, back seat',
    'Interior, driver side',
    'Dashboard showing mileage, engine running',
    'Interior, driver’s perspective (from behind)',
    'Additional photo 1',
    'Additional photo 2',
    'Additional photo 3',
    '',
    ''
];

const expectedCommercialHailList: Array<string> = [
    'Registration papers',
    'Chassis number/Nameplate',
    'Overview',
    '',
    ''
];

const expectedReturnStuden: Array<string> = [
    'e (Fahrgestellnummer/Typenschild am Fahrzeug)',
    'f (Armaturenbrett/Kilometerstand bei laufendem Motor)',
    'g (Armaturenbrett mit Serviceanzeige bei laufendem Motor)',
    'g1 (Fahrzeugausweis)',
    'g1 (Fahrzeugausweis)(2)',
    'g2 (Bordpapiere/Schlüssel/Serviceheft/SD-Karte/Navi CD)',
    'g2 (Bordpapiere/Schlüssel/Serviceheft/SD-Karte/Navi CD)(2)',
    'h (Zusätzliche Räder im Kofferraum (nicht immer vorhanden)',
    'i (Türöffnung vorne links)',
    'j (Armaturenbrett-übersicht von Rückbank aus)',
    'k (Türöffnung hinten links)',
    'l (Bei 7. Sitzer Foto der zusätzlichen Sitze von vorne)',
    'm (Zusätzliche Sitze von hinten)',
    'n (Kofferraum geöffnet/Ladefläche - Abdeckung geschlossen)',
    'o (Kofferraum geöffnet/Ladefläche - Abdeckung geöffnet)',
    'p (Ladefläche angehoben für Sicht Radmulde)',
    'q (Ladekabel bei Elektrofahrzeugen)',
    'r (Türöffnung hinten rechts)',
    's (Türöffnung vorne rechts)',
    't (Frontklappe geöffnet)',
    'u (Unterboden vorne)',
    'v (Unterboden hinten)',
    'w (Reserveräder /Reservepneus (sind zusätsätliche Räder oder Reifen))',
    'x (Reserve)',
    'y (Reserve)',
    'z (Reserve)',
    ''
];

const expectedReturnExtern: Array<string> = [
    'a (Diagonal vorne rechts – ganzes Fahrzeug)',
    'b (Diagonal vorne links – ganzes Fahrzeug)',
    'c (Diagonal hinten links – ganzes Fahrzeug)',
    'd (Diagonal hinten rechts – ganzes Fahrzeug)',
    'e (Fahrgestellnummer/Typenschild am Fahrzeug)',
    'f (Armaturenbrett/Kilometerstand bei laufendem Motor)',
    'g (Armaturenbrett mit Serviceanzeige bei laufendem Motor)',
    'g1 (Fahrzeugausweis)',
    'g2 (Bordpapiere/Schlüssel/Serviceheft/SD-Karte/Navi CD)',
    'h (Zusätzliche Räder im Kofferraum (nicht immer vorhanden)',
    'i (Türöffnung vorne links)',
    'j (Armaturenbrett-übersicht von Rückbank aus)',
    'k (Türöffnung hinten links)',
    'l (Bei 7. Sitzer Foto der zusätzlichen Sitze von vorne)',
    'm (Zusätzliche Sitze von hinten)',
    'n (Kofferraum geöffnet/Ladefläche - Abdeckung geschlossen)',
    'o (Kofferraum geöffnet/Ladefläche - Abdeckung geöffnet)',
    'p (Ladefläche angehoben für Sicht Radmulde)',
    'q (Ladekabel bei Elektrofahrzeugen)',
    'r (Türöffnung hinten rechts)',
    's (Türöffnung vorne rechts)',
    't (Frontklappe geöffnet)',
    'u (Unterboden vorne)',
    'v (Unterboden hinten)',
    'w (Reserveräder /Reservepneus (sind zusätsätliche Räder oder Reifen))',
    'x (Reserve)',
    'y (Reserve)',
    'z (Reserve)',
    ''
];

const expectedAutoscout24: Array<string> = [
    'Diagonal vorne rechts – ganzes Fahrzeug',
    'Diagonal vorne links – ganzes Fahrzeug',
    'Diagonal hinten links – ganzes Fahrzeug',
    'Diagonal hinten rechts – ganzes Fahrzeug',
    'Armaturenbrett / Kilometerstand bei laufendem Motor',
    'Armaturenbrett mit Serviceanzeige bei laufendem Motor',
    'Armaturenbrett-übersicht von Rückbank aus',
    'Fahrzeugausweis',
    'Fahrzeugausweis rechte Seite ohne Kontrollschild',
    'Bordpapiere/Schlüssel/Serviceheft/SD-Karte/Navi CD)',
    'Zusätzliche Sitze hinten',
    'Kofferraum geöffnet / Ladefläche - Abdeckung geöffnet',
    'Ladefläche angehoben für Sicht Radmulde',
    'Ladekabel bei Elektrofahrzeugen',
    'Motorraum',
    'Reserve',
    'Reserve',
    'Reserve',
    ''
];

const expectedHailDriveIn: Array<string> = [
    'Registration papers',
    'Bank account',
    'Indemnity Agreement',
    'Vehicle/Overview photo',
    'Chassis number/Nameplate',
    'Pre-damage 1',
    'Pre-damage 2',
    'Pre-damage 3',
    'Pre-damage 4',
    '',
    ''
];

export {
    expectedPartialDamageList,
    expectedWriteOffList,
    expectedHWSList,
    expectedAscendingVehicleList,
    expectedRiskAssessmentList,
    expectedAppreciationList,
    expectedXpertCheckList,
    expectedCommercialHailList,
    expectedReturnStuden,
    expectedReturnExtern,
    expectedAutoscout24,
    expectedHailDriveIn
};
