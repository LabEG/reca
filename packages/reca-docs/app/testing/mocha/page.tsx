import {type JSX} from "react";
import {Shell} from "@/src/components/shell/shell.js";
import {MochaTestingScreen} from "@/src/screens/testing/mocha-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <MochaTestingScreen />
    </Shell>
);

export default Page;
