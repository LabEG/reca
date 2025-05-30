/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */

import type {ClassConstructor} from "first-di/dist/typings/class-constructor";
import * as React from "react";
import {config} from "../config.js";
import type {Store} from "../stores/Store.js";

/**
 * Todo: add DI here
 *
 * @param store
 * @param props
 * @returns
 */
export const useClientStore = <P extends object, T extends Store<P>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store: new (...params: any[]) => T,
    props?: P
): T => {
    // Render function
    const [, setSeed] = React.useState(0);

    // Constructor
    let isInit = false;
    const [stateStore] = React.useState(() => {
        isInit = true;

        // Resolve dependencies
        const constructorParams: unknown[] = Reflect
            .getMetadata("design:paramtypes", store) as ([] | null) ?? [];

        const resolvedParams = constructorParams.map((param: unknown) => {
            if (typeof param === "function" && "prototype" in param) { // Check is class
                if (param.prototype === Object.prototype) { // Typescript interface in props (props: P)
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
    React.useEffect(() => {
        stateStore.activate(props ?? {} as P);

        return () => stateStore.dispose(props ?? {} as P);
    }, []);

    // Update method
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!isInit) {
        stateStore.update(props ?? {} as P);
    }

    // PropsUpdate method
    React.useMemo(
        () => {
            if (!isInit) {
                stateStore.propsUpdate(props ?? {} as P);
            }
        },
        [props ?? {}]
    );

    // AfterUpdate method
    React.useEffect(() => {
        if (!isInit) {
            stateStore.afterUpdate(props ?? {} as P);
        }
        stateStore.isDrawTime = false;
    });

    return stateStore;
};
