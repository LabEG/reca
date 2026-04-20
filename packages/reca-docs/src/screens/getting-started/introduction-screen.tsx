"use client";

import {type JSX} from "react";
import {Alert, Chip, Stack} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content";

export const IntroductionScreen = (): JSX.Element => (
    <DocContent>
        <h1>Introduction</h1>
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

        <h2>Key Features</h2>
        <ul>
            <li><strong>Microstores</strong> — each component gets its own store instance, so state changes don&apos;t affect unrelated components</li>
            <li><strong>Direct Function Calls</strong> — call store methods directly instead of dispatching actions</li>
            <li><strong>Zero Boilerplate</strong> — no actions, reducers, or dispatchers needed</li>
            <li><strong>Dependency Injection</strong> — built-in DI for testability and modularity</li>
            <li><strong>Microfrontend Support</strong> — perfect isolation for microfrontend architectures</li>
            <li><strong>Clean Architecture</strong> — encourages separation into Store, Service, and Repository layers</li>
            <li><strong>SSR Compatible</strong> — works with Next.js and other SSR frameworks</li>
            <li><strong>~1KB Bundle</strong> — minimal impact on your application size</li>
        </ul>

        <h2>Comparison with Other Libraries</h2>
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
                <tr><td>Bundle Size</td><td>~1KB</td><td>~1KB</td><td>~16KB</td><td>~8KB</td></tr>
                <tr><td>Boilerplate</td><td>Minimal</td><td>Minimal</td><td>Medium</td><td>Heavy</td></tr>
                <tr><td>TypeScript</td><td>Built-in</td><td>Good</td><td>Good</td><td>Good</td></tr>
                <tr><td>Dependency Injection</td><td>Built-in</td><td>Manual</td><td>Manual</td><td>Manual</td></tr>
                <tr><td>Clean Architecture</td><td>Native</td><td>Limited</td><td>Requires setup</td><td>Requires setup</td></tr>
                <tr><td>Microstores</td><td>Yes</td><td>Yes</td><td>Yes</td><td>No (monostore)</td></tr>
                <tr><td>SSR</td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>Async Actions</td><td>Native</td><td>Native</td><td>Native</td><td>Requires middleware</td></tr>
            </tbody>
        </table>

        <h2>Philosophy</h2>
        <p>
            ReCA is built on the principle that <strong>state management should be simple</strong>. Instead of
            learning a complex framework with its own terminology and patterns, you write plain TypeScript
            classes. Your store is a class with properties (state) and methods (actions). That&apos;s it.
        </p>
        <p>
            For enterprise applications, ReCA encourages the <strong>Clean Architecture</strong> pattern:
            separate your code into Store (UI state), Service (business logic), and Repository (data access)
            layers. Each layer is independently testable via Dependency Injection.
        </p>

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
