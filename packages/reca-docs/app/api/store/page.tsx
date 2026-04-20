import {type JSX} from "react";
import {Shell} from "@/src/components/shell/shell.js";
import {StoreApiScreen} from "@/src/screens/api/store-api-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <StoreApiScreen />
    </Shell>
);

export default Page;
