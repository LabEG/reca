import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {ManualStoreScreen} from "../../../src/screens/guides/manual-store-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <ManualStoreScreen />
    </Shell>
);

export default Page;
