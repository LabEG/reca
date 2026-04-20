import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {AutoStoreApiScreen} from "../../../src/screens/api/auto-store-api-screen";

const Page = (): JSX.Element => (
    <Shell>
        <AutoStoreApiScreen />
    </Shell>
);

export default Page;
