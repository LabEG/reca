import {Store} from "./Store";

export class AutoStore<T extends object = object> extends Store<T> {

    protected dontOverrideMethods: string [] = [
        "activate",
        "update",
        "dispose",
        "redrawFunction",
        "setRedrawFunction",
        "redraw",
        "forceRedraw",
        "injectCustomSetters"
    ];

    public constructor () {
        super();
        Promise.resolve(() => this.injectCustomSetters());
    }

    protected injectCustomSetters (): void {
        // Write code
    }

}
