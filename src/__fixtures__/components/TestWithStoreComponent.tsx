import {withStore} from "../../index";
import {LiveCycleStore} from "../stores/LiveCycleStore";

export const TestWithStoreComponent = withStore(LiveCycleStore, (lcStore, props) => (
    <div>
        {lcStore.state}
    </div>
));
