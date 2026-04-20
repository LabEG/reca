import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {SsrScreen} from "../../../src/screens/guides/ssr-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <SsrScreen />
    </Shell>
);

export default Page;
