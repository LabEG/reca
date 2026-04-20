import {type JSX} from "react";
import {Shell} from "@/src/components/shell/shell.js";
import {StoreLayerScreen} from "@/src/screens/architecture/store-layer-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <StoreLayerScreen />
    </Shell>
);

export default Page;
