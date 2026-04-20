import {type JSX} from "react";
import {Shell} from "@/src/components/shell/shell.js";
import {AutoStoreBasicsScreen} from "@/src/screens/guides/auto-store-basics-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <AutoStoreBasicsScreen />
    </Shell>
);

export default Page;
