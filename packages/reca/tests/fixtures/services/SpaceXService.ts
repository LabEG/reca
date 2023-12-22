import {reflection} from "first-di";
import {SpaceXCompanyInfo} from "../models/SpaceXCompanyInfo";

@reflection
export class SpaceXService {

    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public async getCompanyInfo (): Promise<SpaceXCompanyInfo> {
        const response = await fetch("https://api.spacexdata.com/v3/info");
        const json: unknown = await response.json();

        // ... and manies manies lines of logics

        if (typeof json === "object" && json !== null) {
            return new SpaceXCompanyInfo().applyData(json);
        }
        throw new Error("SpaceXService.getCompanyInfo: response object is not json");
    }

}
