import {reflection} from "first-di";
import {SpaceXCompanyInfo} from "../models/SpaceXCompanyInfo.js";

@reflection
export class SpaceXService {

    // Hardcoded SpaceX company info (api.spacexdata.com was archived in June 2026)
    // eslint-disable-next-line class-methods-use-this
    private getCompanyInfoData () {
        return {
            name: "SpaceX",
            founder: "Elon Musk",
            founded: 2002,
            employees: 13000,
            ceo: "Elon Musk",
            cto: "Elon Musk",
            cvo: "Gwynne Shotwell",
            headquarters: {
                address: "Hawthorne, California",
                city: "Hawthorne",
                state: ""
            },
            links: {
                website: "https://www.spacex.com/",
                elonTwitter: "elonmusk"
            },
            valuation: 76000000000,
            summary: "SpaceX designs, manufactures and launches advanced rockets and spacecraft."
        };
    }

    public async getCompanyInfo (): Promise<SpaceXCompanyInfo> {
        const result = new SpaceXCompanyInfo().applyData(this.getCompanyInfoData());

        return Promise.resolve(result);
    }

}

