/* eslint-disable max-lines-per-function */
/* eslint-disable react/hook-use-state */
import type {ClassConstructor} from "first-di/dist/typings/class-constructor";
import {useEffect, useMemo, useState} from "react";
import {config} from "../config.js";
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

        // Resolve dependencies
        const constructorParams: unknown[] = Reflect
            .getMetadata("design:paramtypes", store) as ([] | null) ?? [];

        const resolvedParams = constructorParams.map((param: unknown) => {
            if (typeof param === "function" && "prototype" in param) { // Check is class
                if (param.length === 1) { // Typescript interface in props
                    return props;
                }

                // True class
                return config.di.resolver(param as ClassConstructor<object>);
            }

            // Else props object
            return props;
        });

        // eslint-disable-next-line new-cap
        const resolvedStore = new store(...resolvedParams);

        resolvedStore.setRedrawFunction(() => {
            setSeed(Math.random());
        });

        return resolvedStore;
    });

    stateStore.isDrawTime = true;

    // Activate and Dispose(Destructor) methods
    useEffect(() => {
        stateStore.activate(props ?? {} as P);

        return () => stateStore.dispose(props ?? {} as P);
    }, []);

    // Update method
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!isInit) {
        stateStore.update(props ?? {} as P);
    }

    // PropsUpdate method
    useMemo(
        () => {
            if (!isInit) {
                stateStore.propsUpdate(props ?? {} as P);
            }
        },
        [props ?? {}]
    );

    // AfterUpdate method
    useEffect(() => {
        if (!isInit) {
            stateStore.afterUpdate(props ?? {} as P);
        }
        stateStore.isDrawTime = false;
    });

    return stateStore;
};
