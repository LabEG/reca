import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {RepositoryLayerScreen} from "../../../src/screens/architecture/repository-layer-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <RepositoryLayerScreen />
    </Shell>
);

export default Page;
