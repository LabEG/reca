/* eslint-disable react/hook-use-state */
import {useEffect, useState} from "react";
import {config} from "../config.js";
import type {IDiClassCostructor} from "../interfaces/IDiClassCostructor.js";
import type {Store} from "../stores/Store.js";

/**
 * Todo: add DI here
 *
 * @param store
 * @param props
 * @returns
 */
export const useStore = <P extends object, T extends Store<P>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store: new (...params: any[]) => T,
    props?: P
): T => {
    // Render function
    const [, setSeed] = useState(0);

    // Constructor
    let isInit = false;
    const [stateStore] = useState(() => {
        isInit = true;

        const constructorParams: IDiClassCostructor[] = Reflect
            .getMetadata("design:paramtypes", store) as ([] | null) ?? [];

        const resolvedParams = constructorParams.map((param: IDiClassCostructor) => {
            if ("prototype" in param) {
                return config.di.resolver(param);
            }

            return props;
        });

        // eslint-disable-next-line new-cap
        const resolvedStore = new store(...resolvedParams);

        resolvedStore.setRedrawFunction(() => {
            setSeed(Math.random());
        });

        return resolvedStore;
    });

    // Activate and Dispose(Destructor) methods
    useEffect(() => {
        stateStore.activate(props ?? {} as P);

        return () => stateStore.dispose();
    }, []);

    // Update method
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!isInit) {
        stateStore.update(props ?? {} as P);
    }

    return stateStore;
};
