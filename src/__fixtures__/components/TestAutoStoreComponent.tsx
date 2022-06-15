
import {useStore} from "../../index.js";
import type {ILiveCycleStoreProps} from "../stores/LiveCycleAutoStore.js";
import {LiveCycleAutoStore} from "../stores/LiveCycleAutoStore.js";

export const TestAutoStoreComponent = (props: ILiveCycleStoreProps): JSX.Element => {
    const store = useStore(LiveCycleAutoStore, props);

    return (
        <div>
            {store.state}
        </div>
    );
};
