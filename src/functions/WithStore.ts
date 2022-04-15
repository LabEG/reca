import { IDiClassCostructor } from "../interfaces/IClassCostructor";
import {Store} from "../stores/Store";

interface IWithStore<P extends Record<string, unknown> = {}> {
    (view: (props?: P) => JSX.Element | null): (props?: P) => JSX.Element | null;

    <T1 extends Store<P>>(
        store1: new (...params: IDiClassCostructor[]) => T1,
        view: (store1: T1, props?: P) => JSX.Element | null
    ): (props?: P) => JSX.Element | null;
}

export const withStore: IWithStore = <P extends Record<string, unknown>>(
    ...storeOrView: ((new (...params: IDiClassCostructor[]) => Store<P>) | ((props?: P) => JSX.Element | null))[]
) => (props?: P) => {

    // const stores: Store<P>[] = [];

    const view = storeOrView[storeOrView.length -1 ] as ((props?: P) => JSX.Element | null);
    return view(props);
}
