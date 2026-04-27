import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {AppStructureScreen} from "../../../src/screens/examples/app-structure-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <AppStructureScreen />
    </Shell>
);

export default Page;
