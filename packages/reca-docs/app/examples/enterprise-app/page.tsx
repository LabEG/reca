import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {EnterpriseExampleScreen} from "../../../src/screens/examples/enterprise-example-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <EnterpriseExampleScreen />
    </Shell>
);

export default Page;
