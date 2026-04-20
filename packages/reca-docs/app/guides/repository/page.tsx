import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {RepositoryScreen} from "../../../src/screens/guides/repository-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <RepositoryScreen />
    </Shell>
);

export default Page;
