import {Store} from "../../stores/Store";

interface ILiveCycleStoreProps {
    val?: string;
}

export class LiveCycleStore extends Store<ILiveCycleStoreProps> {

    public state: string = "init";

    public constructor () {
        super();
        this.state = "constructor";
        console.log("111111111111111", "constructor");
    }

    public activate(): void {
        this.state = "activate";
        console.log("111111111111111", "activate");
    }

    public update(): void {
        this.state = "update";
        console.log("111111111111111", "update");
    }

    public dispose(): void {
        this.state = "dispose";
        console.log("111111111111111", "dispose");
    }
}