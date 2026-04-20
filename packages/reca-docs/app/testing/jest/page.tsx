import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {JestTestingScreen} from "../../../src/screens/testing/jest-screen";

const Page = (): JSX.Element => (
    <Shell>
        <JestTestingScreen />
    </Shell>
);

export default Page;
