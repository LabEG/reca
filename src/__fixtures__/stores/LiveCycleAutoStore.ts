import {AutoStore} from "./../../stores/AutoStore";

interface ILiveCycleStoreProps {
    val?: string;
}

export class LiveCycleAutoStore extends AutoStore<ILiveCycleStoreProps> {

    public state: string = "init";

    public stat2: string = "init";

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

    public onClick (): void {
        this.state = "onclick";
    }

}
