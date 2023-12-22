/* eslint-disable max-classes-per-file */

import {resolve} from "first-di";
import type {ClassConstructor} from "first-di/dist/typings/class-constructor";

export class DiConfig {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public resolver: <T extends object>(constructor: ClassConstructor<T>, options?: any) => T = resolve;

}

export class Config {

    public di: DiConfig = new DiConfig();

    // From https://gist.github.com/rhysburnie/498bfd98f24b7daf5fd5930c7f3c1b7b
    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/prefer-optional-chain
    public readonly isBrowser = !(typeof process !== "undefined" && process.versions && process.versions.node);

}

export const config = new Config();
