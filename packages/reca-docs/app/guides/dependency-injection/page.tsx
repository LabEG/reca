import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {DependencyInjectionScreen} from "../../../src/screens/guides/dependency-injection-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <DependencyInjectionScreen />
    </Shell>
);

export default Page;
