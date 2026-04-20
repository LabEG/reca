import {type JSX} from "react";
import {Shell} from "../../src/components/shell/shell.js";
import {InstallationPage} from "../../src/screens/installation/installation-page.js";

const Page = (): JSX.Element => (
    <Shell>
        <InstallationPage />
    </Shell>
);

export default Page;
