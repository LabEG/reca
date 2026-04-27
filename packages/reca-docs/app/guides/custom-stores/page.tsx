import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {CustomStoresScreen} from "../../../src/screens/guides/custom-stores-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <CustomStoresScreen />
    </Shell>
);

export default Page;
