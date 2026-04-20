import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {InstallationScreen} from "../../../src/screens/getting-started/installation-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <InstallationScreen />
    </Shell>
);

export default Page;
