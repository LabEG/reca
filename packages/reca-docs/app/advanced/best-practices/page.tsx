import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {BestPracticesScreen} from "../../../src/screens/advanced/best-practices-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <BestPracticesScreen />
    </Shell>
);

export default Page;
