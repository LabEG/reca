import {register} from "node:module";
import {pathToFileURL} from "node:url";
import "reflect-metadata";
import "global-jsdom/register";

register("ts-node/esm", pathToFileURL("./"));
