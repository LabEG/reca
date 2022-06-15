
import {useStore} from "../../index.js";
import {DIWithPropsStore} from "../stores/DIWithPropsStore.js";

export interface ITestDIWithPropsComponent {
    test: number;
}

export const TestDIWithPropsComponent = <P extends ITestDIWithPropsComponent>(props: P): JSX.Element => {
    const store = useStore(DIWithPropsStore, props);

    const {test} = props;

    return (
        <div>
            Seed:
            {" "}

            {store.diService.seed}

            <br />

            Props:
            {" "}

            {test}
        </div>
    );
};
