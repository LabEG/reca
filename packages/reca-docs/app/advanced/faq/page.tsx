import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {FaqScreen} from "../../../src/screens/advanced/faq-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <FaqScreen />
    </Shell>
);

export default Page;
