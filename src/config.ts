import {resolve} from "first-di";
import {ClassConstructor} from "first-di/dist/typings/class-constructor";

export class DiConfig {
    public resolver: <T extends object>(constructor: ClassConstructor<T>, options?: any) => T = resolve;
}

export class Config {
    public di: DiConfig = new DiConfig();
}

export const config = new Config();
