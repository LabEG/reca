import {reflection} from "first-di";
import {Store} from "../../index.js";
import {TestDIService} from "../services/TestDIService";

@reflection
export class DIStore extends Store {

    public constructor (public diService: TestDIService) {
        super();
    }

}
