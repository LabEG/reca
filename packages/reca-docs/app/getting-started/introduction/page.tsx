import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {IntroductionScreen} from "../../../src/screens/getting-started/introduction-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <IntroductionScreen />
    </Shell>
);

export default Page;
