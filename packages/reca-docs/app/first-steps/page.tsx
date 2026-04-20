import {type JSX} from "react";
import {Shell} from "../../src/components/shell/shell.js";
import {FirstStepsPage} from "../../src/screens/first-steps/first-steps-page.js";

const Page = (): JSX.Element => (
    <Shell>
        <FirstStepsPage />
    </Shell>
);

export default Page;
