import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {FirstComponentScreen} from "../../../src/screens/getting-started/first-component-screen";

const Page = (): JSX.Element => (
    <Shell>
        <FirstComponentScreen />
    </Shell>
);

export default Page;
