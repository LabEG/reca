import {useStore} from "../../hooks/UseStore.js";
import {DIStore} from "../stores/DIStore.js";

export const TesDIComponent = (): JSX.Element => {
    const store = useStore(DIStore);

    return (
        <div>
            {store.diService.seed}
        </div>
    );
};
