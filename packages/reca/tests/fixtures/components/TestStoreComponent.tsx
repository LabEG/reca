import {useStore} from "../../../src/index.js";
import type {ILiveCycleStoreProps} from "../stores/LiveCycleStore";
import {LiveCycleStore} from "../stores/LiveCycleStore";

export const TestStoreComponent = (props: ILiveCycleStoreProps): JSX.Element => {
    const store = useStore(LiveCycleStore, props);

    return (
        <div>
            {store.state}
        </div>
    );
};
