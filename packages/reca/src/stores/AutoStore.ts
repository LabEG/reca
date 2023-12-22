import "reflect-metadata";
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
            const isNotAuto = Reflect.getMetadata("reca:notAuto", this, property) as unknown;
            if (!this.dontObserveProperties.includes(property) && isNotAuto !== true) {
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
            const isNotAuto = Reflect.getMetadata("reca:notAuto", this, method) as unknown;

            if (!this.dontObserveProperties.includes(method) || isNotAuto !== true) {
                const methodFunction = Reflect.get(this, method) as (...params: unknown[]) => unknown;
                const isNotRedraw = Reflect.getMetadata("reca:notRedraw", this, method) as unknown;

                Reflect.set(
                    this,
                    method,
                    (...params: unknown[]) => {
                        if (isNotRedraw !== true) {
                            this.redraw(); // Before method because in method can be error, how stop flow
                        }

                        const maybePromise = methodFunction.apply(this, [...params]);

                        if (maybePromise instanceof Promise) {
                            return maybePromise
                                .then((data: unknown) => {
                                    if (isNotRedraw !== true) {
                                        this.redraw();
                                    }
                                    return data;
                                })
                                .catch((error) => {
                                    if (isNotRedraw !== true) {
                                        this.redraw();
                                    }
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
