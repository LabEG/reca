import {Store} from "./stores/Store.js";

export const useStore = <T extends Store>(store: new (...params: unknown[]) => T): T => {
    return new store();
}
