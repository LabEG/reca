import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {RepositoryScreen} from "../../../src/screens/guides/repository-screen";

const Page = (): JSX.Element => (
    <Shell>
        <RepositoryScreen />
    </Shell>
);

export default Page;
