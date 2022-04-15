import {useStore} from "../../hooks/UseStore";
import {LiveCycleStore} from "../stores/LiveCycleStore";

export const TestUseStoreComponent = (props: Record<string, unknown>) => {

    const store = useStore(LiveCycleStore, props);

    return (
        <div>
            {store.state}
        </div>
    );
}
