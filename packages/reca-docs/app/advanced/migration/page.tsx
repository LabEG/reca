import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {MigrationScreen} from "../../../src/screens/advanced/migration-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <MigrationScreen />
    </Shell>
);

export default Page;
