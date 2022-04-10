import {useEffect, useState} from "react";

export class Store<T extends Record<string, unknown>> {

    private setSeed: (seed: number) => void;

    public constructor () {

        const [, setSeed] = useState(0);
        this.setSeed = setSeed;

        useEffect(() => {
            return () => this.dispose?.();
        }, []);
    }

    /**
     * Method of livecycles for overrides
     */
    public activate(props: T): void {
        // override
    }

    /**
     * Method of livecycles for overrides
     */
    public update(props: T): void {
        // override
    }

    /**
     * Method of livecycles for overrides
     */
    public dispose(): void {
        // override
    }

    /**
     * Update view on next requestAnimationFrame
     */
    public redraw(): void {
        requestAnimationFrame(() => this.forceUpdate());
    }

    /**
     * Update view component immediately
     */
    public forceUpdate(): void {
        this.setSeed(Math.random());
    }

}
