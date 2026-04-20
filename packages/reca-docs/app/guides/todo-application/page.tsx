import {type JSX} from "react";
import {Shell} from "../../../src/components/shell/shell.js";
import {TodoApplicationScreen} from "../../../src/screens/guides/todo-application-screen.js";

const Page = (): JSX.Element => (
    <Shell>
        <TodoApplicationScreen />
    </Shell>
);

export default Page;
