import {ContractDetail} from "@apps/iaa/screen-objects/contract/contract-detail/contract-detail.action";

export class ContractDetailValidator {
    constructor(private contractDetail: ContractDetail) {
    }

    expectDownloadedContractDocuments() {
        const totalContractDocuments = this.contractDetail.getTotalContractDocuments();
        const totalGreenIcons = this.contractDetail.getTotalDownloadedIcons();
        expect(totalGreenIcons).toEqual(totalContractDocuments);

        return this;
    }


}
