import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {DecoratorsApiScreen} from "../../../src/screens/api/decorators-api-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <DecoratorsApiScreen />
    </Shell>
);

export default Page;
