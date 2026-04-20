import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {InstallationScreen} from "../../../src/screens/getting-started/installation-screen";

const Page = (): JSX.Element => (
    <Shell>
        <InstallationScreen />
    </Shell>
);

export default Page;
