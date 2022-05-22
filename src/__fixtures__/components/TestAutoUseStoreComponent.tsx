
import {useStore} from "../../index.js";
import {LiveCycleAutoStore} from "../stores/LiveCycleAutoStore.js";

export const TestAutoUseStoreComponent = (props: Record<string, unknown>): JSX.Element => {
    const store = useStore(LiveCycleAutoStore, props);

    return (
        <div>
            {store.state}
        </div>
    );
};
