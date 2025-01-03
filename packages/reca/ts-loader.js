import {register} from "node:module";
import {pathToFileURL} from "node:url";
import "reflect-metadata";
import "global-jsdom/register";

register("@swc-node/register/esm", pathToFileURL("./"));
