import type {ClassConstructor} from "first-di/dist/typings/class-constructor";
import {config} from "../config.js";
import type {Store} from "../stores/Store.js";

/**
 * Todo: add DI here
 *
 * @param store
 * @param props
 * @returns
 */
export const useServerStore = <P extends object, T extends Store<P>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store: new (...params: any[]) => T,
    props?: P
): T => {
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

    return resolvedStore;
};
