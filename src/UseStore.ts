import {Store} from "./stores/Store.js";

export const useStore = <T extends Store<Record<string, unknown>>>(
    store: new (...params: unknown[]) => T,
    props?: Record<string, unknown>
): T => {

    // todo: add DI here
    const str = new store();

    str.activate(props ?? {});

    // str.update(props ?? {});

    return str;
}
