import {reflection} from "first-di";
import {Store} from "../../index.js";
import {TestDIService} from "../services/TestDIService";

@reflection
export class DIStore extends Store {

    // eslint-disable-next-line @typescript-eslint/parameter-properties
    public constructor (public diService: TestDIService) {
        super();
    }

}
