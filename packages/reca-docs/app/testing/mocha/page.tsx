import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {MochaTestingScreen} from "../../../src/screens/testing/mocha-screen";

const Page = (): JSX.Element => (
    <Shell>
        <MochaTestingScreen />
    </Shell>
);

export default Page;
