import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {ArchitectureOverviewScreen} from "../../../src/screens/architecture/overview-screen";

const Page = (): JSX.Element => (
    <Shell>
        <ArchitectureOverviewScreen />
    </Shell>
);

export default Page;
