enum ExpertiseType {
    PartialDamage = 'Partial damage',
    WriteOff = 'Write-off',
    HWS = 'HWS',
    AscendingVehicle = 'Ascending vehicle',
    RiskAssessmentCaravanCamper = 'Risk assessment caravan/camper',
    Appreciation = 'Appreciation',
    XpertCheck = 'XpertCheck',
    CommercialHail = 'Commercial hail',
    ReturnStuden = 'Return Studen',
    ReturnExtern = 'Return Extern',
    Autoscout24 = 'Autoscout24',
    HailDriveIn = 'Hail Drive-In'
}

const expertiseTypeValues: Array<string> = Object.values(ExpertiseType);
export {ExpertiseType, expertiseTypeValues};
