"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const InstallationPage = (): JSX.Element => (
    <DocContent>
        <h1>Installation</h1>
        <p>
            ReCA requires <code>reflect-metadata</code> as a peer dependency for its Dependency
            Injection functionality. Install both packages using your preferred package manager.
        </p>

        <h2>Package Managers</h2>

        <h3>npm</h3>
        <pre><code>{"npm install reca reflect-metadata"}</code></pre>

        <h3>yarn</h3>
        <pre><code>{"yarn add reca reflect-metadata"}</code></pre>

        <h3>pnpm</h3>
        <pre><code>{"pnpm add reca reflect-metadata"}</code></pre>

        <h2>Setup</h2>
        <p>
            After installation, import <code>reflect-metadata</code> at the entry point of your
            application (e.g., <code>index.tsx</code> or <code>main.tsx</code>):
        </p>

        <pre><code>{`import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

ReactDOM.createRoot(
    document.getElementById("root")!
).render(<App />);`}</code></pre>

        <Alert severity="warning" sx={{mb: 3}}>
            The <code>reflect-metadata</code> import must come before any other imports in your
            application entry point. This is required for Dependency Injection to function correctly.
        </Alert>

        <h2>TypeScript Configuration</h2>
        <p>
            To use decorators and reflection metadata, ensure your <code>tsconfig.json</code> includes
            the following compiler options:
        </p>

        <pre><code>{`{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}`}</code></pre>

        <h2>Requirements</h2>
        <ul>
            <li><strong>React</strong> — version 18 or higher</li>
            <li><strong>TypeScript</strong> — version 5 or higher (recommended)</li>
            <li><strong>reflect-metadata</strong> — required for Dependency Injection</li>
        </ul>
    </DocContent>
);
