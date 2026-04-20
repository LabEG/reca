"use client";

import {type JSX} from "react";
import {Alert, Chip, Stack} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const IndexPage = (): JSX.Element => (
    <DocContent>
        <h1>Overview</h1>
        <Stack direction="row" spacing={1} sx={{mb: 3}}>
            <Chip label="~1KB" color="primary" size="small" variant="outlined" />
            <Chip label="TypeScript" size="small" variant="outlined" />
            <Chip label="MIT License" size="small" variant="outlined" />
        </Stack>

        <p>
            <strong>ReCA</strong> (React Clean Architecture) is a lightweight state management library
            for React applications. Created at the intersection of functional style and OOP technologies,
            it combines the simplicity of functional-style views with OOP patterns for writing
            business logic.
        </p>

        <Alert severity="info" sx={{mb: 3}}>
            ReCA is only ~1KB minified — one of the smallest state management libraries available,
            yet it provides built-in Dependency Injection, Clean Architecture support, and SSR compatibility.
        </Alert>

        <h2>Features</h2>
        <ul>
            <li><strong>Microstores</strong> — state calculations of components don&apos;t affect other components, resulting in minimal CPU usage for state updates</li>
            <li><strong>Direct Function Calls</strong> — no need for heavy CPU utilization searching functions in reducers</li>
            <li><strong>No Boilerplate</strong> — write only business code without technical debt</li>
            <li><strong>Dependency Injection</strong> — override any part of your application for unit testing or customization</li>
            <li><strong>Microfrontend</strong> — perfect support for microfrontends out of the box</li>
            <li><strong>Simple Data Flow</strong> — no need to search function call chains for debugging</li>
            <li><strong>Code Organization</strong> — easily structure code for large enterprise applications</li>
            <li><strong>Extra Small Size</strong> — only ~1KB of minified code</li>
        </ul>

        <h2>Comparison</h2>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>ReCA</th>
                    <th>Zustand</th>
                    <th>MobX</th>
                    <th>Redux</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Bundle Size</td>
                    <td>~1KB</td>
                    <td>~1KB</td>
                    <td>~16KB</td>
                    <td>~8KB</td>
                </tr>
                <tr>
                    <td>Boilerplate</td>
                    <td>Minimal</td>
                    <td>Minimal</td>
                    <td>Medium</td>
                    <td>Heavy</td>
                </tr>
                <tr>
                    <td>TypeScript</td>
                    <td>Built-in</td>
                    <td>Good</td>
                    <td>Good</td>
                    <td>Good</td>
                </tr>
                <tr>
                    <td>Dependency Injection</td>
                    <td>Built-in</td>
                    <td>Manual</td>
                    <td>Manual</td>
                    <td>Manual</td>
                </tr>
                <tr>
                    <td>Clean Architecture</td>
                    <td>Native</td>
                    <td>Limited</td>
                    <td>Requires setup</td>
                    <td>Requires setup</td>
                </tr>
            </tbody>
        </table>

        <h2>Quick Example</h2>
        <pre><code>{`import { AutoStore, useStore } from "reca";

class CounterStore extends AutoStore {
    public count: number = 0;

    public increment(): void {
        this.count++;
    }

    public decrement(): void {
        this.count--;
    }
}

const Counter = () => {
    const store = useStore(CounterStore);

    return (
        <div>
            <h1>Count: {store.count}</h1>
            <button onClick={store.increment}>+1</button>
            <button onClick={store.decrement}>-1</button>
        </div>
    );
};`}</code></pre>
    </DocContent>
);
