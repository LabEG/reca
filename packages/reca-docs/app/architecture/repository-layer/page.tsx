import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {RepositoryLayerScreen} from "../../../src/screens/architecture/repository-layer-screen";

const Page = (): JSX.Element => (
    <Shell>
        <RepositoryLayerScreen />
    </Shell>
);

export default Page;
