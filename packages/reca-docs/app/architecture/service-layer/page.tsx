import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {ServiceLayerScreen} from "../../../src/screens/architecture/service-layer-screen";

const Page = (): JSX.Element => (
    <Shell>
        <ServiceLayerScreen />
    </Shell>
);

export default Page;
