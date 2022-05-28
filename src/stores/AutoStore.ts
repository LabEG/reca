import {Store} from "./Store.js";

export class AutoStore<T extends object = object> extends Store<T> {

    protected dontOverrideMethods: (string | symbol) [] = [
        // Methods
        "constructor",
        "activate",
        "update",
        "dispose",
        "setRedrawFunction",
        "redraw",
        "forceRedraw",
        "injectCustomSetters",

        // Properties
        "dontOverrideMethods",
        "redrawFunction"

    ];

    public constructor () {
        super();
        Promise.resolve().then(() => this.injectCustomSetters());
    }

    protected injectCustomSetters (): void {
        this.injectProperties();
        this.injectMethods();
    }

    /**
     * Replace properties by getters and setters, inject redraw
     */
    protected injectProperties (): void {
        const properties: (string | symbol)[] = Reflect.ownKeys(this);

        for (const property of properties) {
            if (!this.dontOverrideMethods.includes(property)) {
                let propValue = Reflect.get(this, property) as unknown;

                Object.defineProperty(
                    this,
                    property,
                    {
                        get: () => propValue,
                        set: (value: unknown) => {
                            propValue = value;
                            this.redraw();
                        }
                    }
                );
            }
        }
    }

    /**
     * Wrap methods, inject redraw
     */
    protected injectMethods (): void {
        const methods: (string | symbol)[] = Reflect.ownKeys(Object.getPrototypeOf(this) as object);

        for (const method of methods) {
            if (!this.dontOverrideMethods.includes(method)) {
                const methodFunction = Reflect.get(this, method) as (...params: unknown[]) => unknown;
                Reflect.set(
                    this,
                    method,
                    (...params: unknown[]) => {
                        this.redraw(); // Before method because in method can be error, how stop flow
                        const maybePromise = methodFunction(...params);

                        if (maybePromise instanceof Promise) {
                            maybePromise
                                .then(() => this.redraw())
                                .catch(() => this.redraw());
                        }
                    }
                );
            }
        }
    }

}
