import {Store} from "../../stores/Store";

export class LiveCycleStore extends Store {

    public state: string = "init";

    public constructor () {
        super();
        this.state = "constructor";
    }

    public activate(): void {
        this.state = "activate";
    }

    public update(): void {
        this.state = "update";
    }

    public dispose(): void {
        this.state = "dispose";
    }
}