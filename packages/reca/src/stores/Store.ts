/* eslint-disable @typescript-eslint/class-methods-use-this */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {config} from "../config.js";

export class Store<T extends object = object> {

    /**
     * Property for prevent cycle redraw if call method ot set props in AutoStore
     * in view redraw time
     */
    public isDrawTime: boolean = true;

    protected redrawFunction: () => void = () => void 0;

    /**
     * Method for override in nested store.
     * Run after first rendering component in DOM.
     *
     * @description
     * Encapsulate:
     * useEffect(() => {
     *     stateStore.activate(props);
     *
     *     return () => stateStore.dispose(props);
     * }, []);
     */
    public activate (props: T): void {
        // Override
    }

    /**
     * Method for override in nested store.
     * Run before second and others time of rendering component in DOM.
     *
     * @description
     * Encapsulate:
     * if (!isInit) {
     *     stateStore.update(props);
     * }
     */
    public update (props: T): void {
        // Override
    }

    /**
     * Method for override in nested store.
     * Run only if props changed.
     * Run before second and others time of rendering component in DOM.
     *
     * @description
     * Encapsulate:
     * useMemo(
     *     () => {
     *         stateStore.propsUpdate(props);
     *     },
     *     [props]
     * );
     */
    public propsUpdate (props: T): void {
        // Override
    }

    /**
     * Method for override in nested store.
     * Run after second and others time of rendering component in DOM.
     *
     * @description
     * Encapsulate:
     * useEffect(() => {
     *     if (!isInit) {
     *         stateStore.afterUpdate(props);
     *     }
     * });
     */
    public afterUpdate (props: T): void {
        // Override
    }

    /**
     * Method for override in nested store.
     * Run after second and others rendering component in DOM.
     *
     * @description
     * Encapsulate:
     * useEffect(() => {
     *     stateStore.activate(props);
     *
     *     return () => stateStore.dispose(props);
     * }, []);
     */
    public dispose (props: T): void {
        // Override
    }

    public setRedrawFunction (updateFunction: () => void): void {
        this.redrawFunction = updateFunction;
    }

    /**
     * Update view on next requestAnimationFrame
     */
    public redraw (): void {
        if (this.isDrawTime) {
            return;
        }

        if (config.isBrowser) {
            requestAnimationFrame(() => this.redrawFunction());
        } else {
            // SSR don't use redraw, its for unit tests
            this.redrawFunction();
        }
    }

    /**
     * Update view component immediately
     */
    public forceRedraw (): void {
        this.redrawFunction();
    }

}
