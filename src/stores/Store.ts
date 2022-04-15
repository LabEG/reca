
export class Store<T extends Record<string, unknown> = {}> {

    private redrawFunction: () => void = () => void 0;

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
    public activate(props: T): void {
        // override
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
    public update(props: T): void {
        // override
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
    public dispose(): void {
        // override
    }

    public setRedrawFunction(updateFunction: () => void): void {
        this.redrawFunction = updateFunction;
    }

    /**
     * Update view on next requestAnimationFrame
     */
    public redraw(): void {
        requestAnimationFrame(() => this.redrawFunction());
    }

    /**
     * Update view component immediately
     */
    public forceRedraw(): void {
        this.redrawFunction();
    }

}
