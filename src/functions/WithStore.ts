import { IWithStore } from "./../interfaces/IWithStore.js";
import {useStore} from "../hooks/UseStore.js";
import { IDiClassCostructor } from "../interfaces/IClassCostructor.js";
import {Store} from "../stores/Store.js";

interface IStoreConstructor<P extends Record<string, unknown>> {
    new (...params: IDiClassCostructor[]): Store<P>;
}

export const withStore: IWithStore = <P extends Record<string, unknown>>(
    ...storeOrView: unknown[]
) => (props?: P) => {

    const stores = storeOrView
        .slice(0, -1)
        .map((storeConstructor) => useStore(storeConstructor as IStoreConstructor<P>, props));

    const view = storeOrView[storeOrView.length -1 ] as ((...params: unknown[]) => JSX.Element | null);
    return view(...stores, props);
}
