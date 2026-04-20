import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {LifecycleScreen} from "../../../src/screens/guides/lifecycle-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <LifecycleScreen />
    </Shell>
);

export default Page;
