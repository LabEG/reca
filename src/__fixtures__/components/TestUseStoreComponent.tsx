import {useStore} from "../../hooks/UseStore.js";
import {LiveCycleStore} from "../stores/LiveCycleStore.js";

export const TestUseStoreComponent = (props: Record<string, unknown>) => {

    const store = useStore(LiveCycleStore, props);

    return (
        <div>
            {store.state}
        </div>
    );
}
