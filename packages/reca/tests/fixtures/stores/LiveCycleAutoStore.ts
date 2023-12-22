import {AutoStore, reflection} from "../../../src/index.js";

export interface ILiveCycleStoreProps {
    onLivecycleChange: (val: string) => void;
}

@reflection
export class LiveCycleAutoStore<P extends ILiveCycleStoreProps> extends AutoStore<P> {

    public state: string = "init";

    public constructor (props: P) {
        super();
        this.state += " constructor";
        props.onLivecycleChange(this.state);
    }

    public activate (props: P): void {
        this.state += " activate";
        props.onLivecycleChange(this.state);
    }

    public update (props: P): void {
        this.state += " update";
        props.onLivecycleChange(this.state);
    }

    public afterUpdate (props: P): void {
        this.state += " afterUpdate";
        props.onLivecycleChange(this.state);
    }

    public dispose (props: P): void {
        this.state += " dispose";
        props.onLivecycleChange(this.state);
    }

}
