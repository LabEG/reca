import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {ComponentCommunicationScreen} from "../../../src/screens/guides/component-communication-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <ComponentCommunicationScreen />
    </Shell>
);

export default Page;
