import {type JSX} from "react";
import {Shell} from "@/src/components/shell/shell.js";
import {FirstComponentScreen} from "@/src/screens/getting-started/first-component-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <FirstComponentScreen />
    </Shell>
);

export default Page;
