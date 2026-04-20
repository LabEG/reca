import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {StoreApiScreen} from "../../../src/screens/api/store-api-screen";

const Page = (): JSX.Element => (
    <Shell>
        <StoreApiScreen />
    </Shell>
);

export default Page;
