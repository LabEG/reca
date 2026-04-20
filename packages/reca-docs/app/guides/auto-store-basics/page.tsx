import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {AutoStoreBasicsScreen} from "../../../src/screens/guides/auto-store-basics-screen";

const Page = (): JSX.Element => (
    <Shell>
        <AutoStoreBasicsScreen />
    </Shell>
);

export default Page;
