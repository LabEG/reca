import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell";
import {TodoApplicationScreen} from "../../../src/screens/guides/todo-application-screen";

const Page = (): JSX.Element => (
    <Shell>
        <TodoApplicationScreen />
    </Shell>
);

export default Page;
