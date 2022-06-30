import {useStore} from "../../index.js";
import {SpaceXStore} from "../stores/SpaceXStore.js";

export const TestStoreComponent = (): JSX.Element => {
    const store = useStore(SpaceXStore);

    return (
        <div>
            <p>
                Company:
                {" "}

                {store.companyInfo.name}
            </p>

            <p>
                Founder:
                {" "}

                {store.companyInfo.founder}
            </p>
        </div>
    );
};
