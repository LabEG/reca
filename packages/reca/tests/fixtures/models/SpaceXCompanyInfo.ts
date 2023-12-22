
export class SpaceXCompanyInfo {

    public name: string = "";

    public founder: string = "";

    public employees: number = 0;

    public applyData (json: object): this {
        Object.assign(this, json);
        return this;
    }

}
