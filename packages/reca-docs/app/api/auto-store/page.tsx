import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {AutoStoreApiScreen} from "../../../src/screens/api/auto-store-api-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <AutoStoreApiScreen />
    </Shell>
);

export default Page;
