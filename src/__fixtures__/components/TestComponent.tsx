import {useStore} from "../../UseStore";
import {LiveCycleStore} from "../stores/LiveCycleStore";

export const TestComponent = () => {
    const store = useStore(LiveCycleStore);

    return (
        <div>
            {store.state}
        </div>
    );
}
