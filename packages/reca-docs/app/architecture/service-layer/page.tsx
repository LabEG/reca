import {type JSX} from "react";
import {Shell} from "@/src/components/shell/shell.js";
import {ServiceLayerScreen} from "@/src/screens/architecture/service-layer-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <ServiceLayerScreen />
    </Shell>
);

export default Page;
