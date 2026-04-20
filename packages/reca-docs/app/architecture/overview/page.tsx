import {type JSX} from "react";
import {Shell} from "@/src/components/shell/shell.js";
import {ArchitectureOverviewScreen} from "@/src/screens/architecture/overview-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <ArchitectureOverviewScreen />
    </Shell>
);

export default Page;
