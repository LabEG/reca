import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {StoreLayerScreen} from "../../../src/screens/architecture/store-layer-screen";

const Page = (): JSX.Element => (
    <Shell>
        <StoreLayerScreen />
    </Shell>
);

export default Page;
