import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {IntroductionScreen} from "../../../src/screens/getting-started/introduction-screen";

const Page = (): JSX.Element => (
    <Shell>
        <IntroductionScreen />
    </Shell>
);

export default Page;
