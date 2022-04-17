import { useEffect, useState } from "react";
import {IDiClassCostructor} from "../interfaces/IClassCostructor.js";
import {Store} from "../stores/Store.js";

/**
 * todo: add DI here
 *
 * @param store
 * @param props
 * @returns
 */
export const useStore = <P extends Record<string, unknown>, T extends Store<P>>(
    store: new (...params: IDiClassCostructor[]) => T,
    props?: P
): T => {

    // Render function
    const [, setSeed] = useState(0);

    // Constructor
    let isInit = false;
    const [stateStore] = useState(() => {
        isInit = true;

        const stateStore = new store();

        stateStore.setRedrawFunction(() => {
            setSeed(Math.random());
        });

        return stateStore;
    });

    // Activate and Update methods
    useEffect(() => {
        if (isInit) {
            stateStore.activate(props ?? {} as P);
        } else {
            stateStore.update(props ?? {} as P);
        }
    });

    // Destructor
    useEffect(() => {
        return () => stateStore.dispose();
    }, []);

    return stateStore;
}
