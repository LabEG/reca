/* eslint-disable max-classes-per-file */

import {resolve} from "first-di";
import type {ClassConstructor} from "first-di/dist/typings/class-constructor";

export class DiConfig {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public resolver: <T extends object>(constructor: ClassConstructor<T>, options?: any) => T = resolve;

}

export class Config {

    public di: DiConfig = new DiConfig();

}

export const config = new Config();
