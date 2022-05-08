import {withStore} from "../../index.js";
import {LiveCycleStore} from "../stores/LiveCycleStore.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TestWithStoreComponent = withStore(LiveCycleStore, (lcStore, props) => (
    <div>
        {lcStore.state}
    </div>
));
