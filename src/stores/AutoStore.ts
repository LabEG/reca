import {Store} from "./Store.js";

export class AutoStore<T extends object = object> extends Store<T> {

    protected dontObserveProperties: (string | symbol) [] = [
        // Methods
        "constructor",
        "activate",
        "update",
        "propsUpdate",
        "afterUpdate",
        "dispose",
        "setRedrawFunction",
        "redraw",
        "forceRedraw",

        // Properties
        "isDrawTime",
        "dontOverrideMethods",
        "redrawFunction"

    ];

    public constructor () {
        super();
        this.injectProperties();
        this.injectMethods();
    }

    /**
     * Replace properties by getters and setters, inject redraw
     */
    protected injectProperties (): void {
        const properties: (string | symbol)[] = Reflect.ownKeys(this);

        for (const property of properties) {
            if (!this.dontObserveProperties.includes(property)) {
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
            if (!this.dontObserveProperties.includes(method)) {
                const methodFunction = Reflect.get(this, method) as (...params: unknown[]) => unknown;
                Reflect.set(
                    this,
                    method,
                    (...params: unknown[]) => {
                        this.redraw(); // Before method because in method can be error, how stop flow

                        const maybePromise = methodFunction.apply(this, [...params]);

                        if (maybePromise instanceof Promise) {
                            return maybePromise
                                .then((data: unknown) => {
                                    this.redraw();
                                    return data;
                                })
                                .catch((error) => {
                                    this.redraw();
                                    throw error;
                                });
                        }

                        return maybePromise;
                    }
                );
            }
        }
    }

}
