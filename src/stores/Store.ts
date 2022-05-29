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
     *  useEffect(() => {
     *      if (isInit) {
     *          store.activate(props);
     *      }
     *  });
     */
    public activate (props: T): void {
        // Override
    }

    /**
     * Method for override in nested store.
     * Run after second and others rendering component in DOM.
     *
     * @description
     * Encapsulate:
     * useEffect(() => {
     *     if (!isInit) {
     *         store.activate(props);
     *     }
     * });
     */
    public update (props: T): void {
        // Override
    }

    /**
     * Method for override in nested store.
     * Run after second and others rendering component in DOM.
     *
     * @description
     * Encapsulate:
     * useEffect(() => {
     *     return () => store.dispose();
     * }, []);
     */
    public dispose (): void {
        // Override
    }

    public setRedrawFunction (updateFunction: () => void): void {
        this.redrawFunction = updateFunction;
    }

    /**
     * Update view on next requestAnimationFrame
     */
    public redraw (): void {
        if (config.isBrowser && !this.isDrawTime) {
            requestAnimationFrame(() => this.redrawFunction());
        }
    }

    /**
     * Update view component immediately
     */
    public forceRedraw (): void {
        this.redrawFunction();
    }

}
