import {type JSX} from "react";
import {Shell} from "../../src/components/shell/shell.js";
import {PlaceholderPage} from "../../src/components/placeholder-page/placeholder-page.js";

const Page = (): JSX.Element => (
    <Shell>
        <PlaceholderPage title="Hooks" />
    </Shell>
);

export default Page;
