import {reflection} from "first-di";
import {Store} from "../../../src/index.js";
import type {ITestDIWithPropsComponent} from "../components/TestDIWithPropsComponent";
import {TestDIService} from "../services/TestDIService";

@reflection
export class DIWithPropsStore<P extends ITestDIWithPropsComponent> extends Store<P> {

    public test: number = 0;

    public constructor (
        // eslint-disable-next-line @typescript-eslint/parameter-properties
        public diService: TestDIService,
        props: P
    ) {
        super();

        this.test = props.test;
    }

}
