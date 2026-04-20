import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {HooksApiScreen} from "../../../src/screens/api/hooks-api-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <HooksApiScreen />
    </Shell>
);

export default Page;
