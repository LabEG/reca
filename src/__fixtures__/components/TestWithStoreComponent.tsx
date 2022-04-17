import {withStore} from "../../index.js";
import {LiveCycleStore} from "../stores/LiveCycleStore.js";

export const TestWithStoreComponent = withStore(LiveCycleStore, (lcStore, props) => (
    <div>
        {lcStore.state}
    </div>
));
