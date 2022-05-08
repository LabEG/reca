import {Store} from "../../stores/Store.js";

interface ILiveCycleStoreProps {
    val?: string;
}

export class LiveCycleStore extends Store<ILiveCycleStoreProps> {

    public state: string = "init";

    public constructor () {
        super();
        this.state = "constructor";
    }

    public activate (): void {
        this.state = "activate";
    }

    public update (): void {
        this.state = "update";
    }

    public dispose (): void {
        this.state = "dispose";
    }

}
