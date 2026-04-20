import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {ConfigApiScreen} from "../../../src/screens/api/config-api-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <ConfigApiScreen />
    </Shell>
);

export default Page;
