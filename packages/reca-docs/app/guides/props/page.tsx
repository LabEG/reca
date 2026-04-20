import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {PropsScreen} from "../../../src/screens/guides/props-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <PropsScreen />
    </Shell>
);

export default Page;
