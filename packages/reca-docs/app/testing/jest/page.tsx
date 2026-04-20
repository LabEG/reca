import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {JestTestingScreen} from "../../../src/screens/testing/jest-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <JestTestingScreen />
    </Shell>
);

export default Page;
