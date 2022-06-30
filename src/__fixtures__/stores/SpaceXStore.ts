import {reflection} from "first-di";
import {Store} from "../../index.js";
import {SpaceXCompanyInfo} from "../models/SpaceXCompanyInfo.js";
import {SpaceXService} from "../services/SpaceXService.js";

@reflection
export class SpaceXStore extends Store {

    public companyInfo: SpaceXCompanyInfo = new SpaceXCompanyInfo();

    public constructor (private readonly spaceXService: SpaceXService) {
        super();
    }

    public activate (): void {
        this.fetchCompanyInfo();
    }

    private async fetchCompanyInfo (): Promise<void> {
        try {
            this.companyInfo = await this.spaceXService.getCompanyInfo();
        } catch (error) {
            // Process exceptions, ex: this.logger.error(error.message);
        }
    }

}
