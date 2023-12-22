/* eslint-disable react-hooks/rules-of-hooks */
import type {Store} from "../stores/Store.js";
import {useClientStore} from "./UseClientStore.js";
import {useServerStore} from "./UseServerStore.js";

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
    if (typeof window !== "undefined") {
        return useClientStore<P, T>(store, props);
    }
    return useServerStore<P, T>(store, props);
};

/**
 * Todo: add DI here
 *
 * @param store
 * @param props
 * @returns
 */
export const useStoreAsync = async <P extends object, T extends Store<P>>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    store: new (...params: any[]) => T,
    props?: P
): Promise<T> => {
    await Promise.resolve();

    if (typeof window !== "undefined") {
        return useClientStore<P, T>(store, props);
    }
    return useServerStore<P, T>(store, props);
};
