import {type JSX} from "react";
import {Shell} from "@/src/components/shell/shell.js";
import {InterfacesScreen} from "@/src/screens/guides/interfaces-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <InterfacesScreen />
    </Shell>
);

export default Page;
