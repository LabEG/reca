import {Store} from "../stores/Store.js";
import {IDiClassCostructor} from "./IClassCostructor.js";

export interface IWithStore<P extends Record<string, unknown> = {}> {
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
