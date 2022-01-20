import {ExpertiseType} from '@apps/xca/specs/test-data/expertise-type';
import {
    expectedAppreciationList,
    expectedAscendingVehicleList,
    expectedAutoscout24,
    expectedCommercialHailList,
    expectedHailDriveIn,
    expectedHWSList,
    expectedPartialDamageList,
    expectedReturnExtern,
    expectedReturnStuden,
    expectedRiskAssessmentList,
    expectedWriteOffList,
    expectedXpertCheckList
} from '@apps/xca/specs/test-data/expertise.category';

const expertiseParam = [
    {
        targetExpertiseType: ExpertiseType.PartialDamage,
        categoryNames: expectedPartialDamageList,
        numberOfCategoryIcons: 2
    },
    {
        targetExpertiseType: ExpertiseType.WriteOff,
        categoryNames: expectedWriteOffList,
        numberOfCategoryIcons: 2
    },
    {
        targetExpertiseType: ExpertiseType.HWS,
        categoryNames: expectedHWSList,
        numberOfCategoryIcons: 2
    },
    {
        targetExpertiseType: ExpertiseType.AscendingVehicle,
        categoryNames: expectedAscendingVehicleList,
        numberOfCategoryIcons: 2
    },
    {
        targetExpertiseType: ExpertiseType.RiskAssessmentCaravanCamper,
        categoryNames: expectedRiskAssessmentList,
        numberOfCategoryIcons: 2
    },
    {
        targetExpertiseType: ExpertiseType.Appreciation,
        categoryNames: expectedAppreciationList,
        numberOfCategoryIcons: 2
    },
    {
        targetExpertiseType: ExpertiseType.XpertCheck,
        categoryNames: expectedXpertCheckList,
        numberOfCategoryIcons: 2
    },
    {
        targetExpertiseType: ExpertiseType.CommercialHail,
        categoryNames: expectedCommercialHailList,
        numberOfCategoryIcons: 2,
        rowLabel: ['Vehicle 1']
    },
    {
        targetExpertiseType: ExpertiseType.ReturnStuden,
        categoryNames: expectedReturnStuden,
        numberOfCategoryIcons: 1,
        rowLabel: ['Claim 1']
    },
    {
        targetExpertiseType: ExpertiseType.ReturnExtern,
        categoryNames: expectedReturnExtern,
        numberOfCategoryIcons: 1,
        rowLabel: ['Claim 1']
    },
    {
        targetExpertiseType: ExpertiseType.Autoscout24,
        categoryNames: expectedAutoscout24,
        numberOfCategoryIcons: 1,
        rowLabel: ['Claim 1']
    },
    {
        targetExpertiseType: ExpertiseType.HailDriveIn,
        categoryNames: expectedHailDriveIn,
        numberOfCategoryIcons: 2
    }
];

export {expertiseParam};
