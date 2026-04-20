import {type JSX} from "react";
import {Shell} from "@/src/components/shell/shell.js";
import {ServicesScreen} from "@/src/screens/guides/services-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <ServicesScreen />
    </Shell>
);

export default Page;
