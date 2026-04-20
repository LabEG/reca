import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {WhyRecaScreen} from "@/src/screens/getting-started/why-reca-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <WhyRecaScreen />
    </Shell>
);

export default Page;
