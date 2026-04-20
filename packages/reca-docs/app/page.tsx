import {type JSX} from "react";
import {Shell} from "../src/components/shell/shell.js";
import {IndexPage} from "../src/screens/index/index-page.js";

const Page = (): JSX.Element => (
    <Shell>
        <IndexPage />
    </Shell>
);

export default Page;
