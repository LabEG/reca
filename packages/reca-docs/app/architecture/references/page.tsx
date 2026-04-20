import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {ReferencesScreen} from "../../../src/screens/architecture/references-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <ReferencesScreen />
    </Shell>
);

export default Page;
