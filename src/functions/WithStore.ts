import {useStore} from "../hooks/UseStore";
import { IDiClassCostructor } from "../interfaces/IClassCostructor";
import {Store} from "../stores/Store";

interface IStoreConstructor<P extends Record<string, unknown>> {
    new (...params: IDiClassCostructor[]): Store<P>;
}


interface IWithStore<P extends Record<string, unknown> = {}> {
    // 0 stores
    (
        view: (props?: P) => JSX.Element | null
    ): (props?: P) => JSX.Element | null;

    // 1 store
    <
        T1 extends Store<P>
    >(
        store1: new (...params: IDiClassCostructor[]) => T1,
        view: (store1: T1, props?: P) => JSX.Element | null
    ): (props?: P) => JSX.Element | null;

    // 2 store
    <
        T1 extends Store<P>,
        T2 extends Store<P>
    >(
        store1: new (...params: IDiClassCostructor[]) => T1,
        store2: new (...params: IDiClassCostructor[]) => T2,
        view: (store1: T1, store2: T2, props?: P) => JSX.Element | null
    ): (props?: P) => JSX.Element | null;
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
