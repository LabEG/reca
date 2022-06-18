/* eslint-disable max-classes-per-file */

import {resolve} from "first-di";
import type {ClassConstructor} from "first-di/dist/typings/class-constructor";

export class DiConfig {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public resolver: <T extends object>(constructor: ClassConstructor<T>, options?: any) => T = resolve;

}

export class Config {

    public di: DiConfig = new DiConfig();

    // eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
    public readonly isBrowser = new Function("try {process?.versions?.node ? false : true}catch(e){ return true;}")() as boolean;

}

export const config = new Config();
