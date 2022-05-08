
export interface IDiClassCostructor {
    new (...params: (new (...params: IDiClassCostructor[]) => this)[]): this;
}
