import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {ServicesScreen} from "../../../src/screens/guides/services-screen";

const Page = (): JSX.Element => (
    <Shell>
        <ServicesScreen />
    </Shell>
);

export default Page;
