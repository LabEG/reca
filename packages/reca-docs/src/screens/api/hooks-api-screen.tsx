"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const HooksApiScreen = (): JSX.Element => (
    <DocContent>
        <h1>Hooks API</h1>
        <p>
            ReCA provides four hooks for connecting stores to React components.
            Each hook creates a store instance, resolves its dependencies, and manages
            the React lifecycle integration.
        </p>

        <h2>useStore</h2>

        <pre><code>{`function useStore<T extends object>(
    StoreClass: new (...args: any[]) => Store<T>,
    props?: T
): Store<T>;`}</code></pre>

        <p>
            The primary hook. Automatically detects whether code runs on the client or server
            and delegates to <code>useClientStore</code> or <code>useServerStore</code> accordingly.
        </p>

        <h3>Parameters</h3>
        <table>
            <thead>
                <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>StoreClass</code></td>
                    <td><code>Constructor</code></td>
                    <td>The store class to instantiate</td>
                </tr>
                <tr>
                    <td><code>props</code></td>
                    <td><code>T | undefined</code></td>
                    <td>Optional component props to pass to the store</td>
                </tr>
            </tbody>
        </table>

        <h3>Example</h3>
        <pre><code>{`import { useStore } from "reca";

const TodoList = () => {
    const store = useStore(TodoStore);

    return (
        <ul>
            {store.todos.map(todo => (
                <li key={todo.id}>{todo.text}</li>
            ))}
        </ul>
    );
};`}</code></pre>

        <hr />

        <h2>useStoreAsync</h2>

        <pre><code>{`function useStoreAsync<T extends object>(
    StoreClass: new (...args: any[]) => Store<T>,
    props?: T
): Promise<Store<T>>;`}</code></pre>

        <p>
            Async version of <code>useStore</code>. Returns a Promise that resolves
            to the store instance. Useful in async Server Components.
        </p>

        <h3>Example</h3>
        <pre><code>{`import { useStoreAsync } from "reca";

const DataPage = async () => {
    const store = await useStoreAsync(DataStore);
    return <div>{store.data}</div>;
};`}</code></pre>

        <hr />

        <h2>useClientStore</h2>

        <pre><code>{`function useClientStore<T extends object>(
    StoreClass: new (...args: any[]) => Store<T>,
    props?: T
): Store<T>;`}</code></pre>

        <p>
            Client-only hook with full React lifecycle integration.
            Internally uses:
        </p>
        <ul>
            <li><code>useState</code> — creates the store instance once and persists it across renders</li>
            <li><code>useEffect(fn, [])</code> — calls <code>activate()</code> on mount, <code>dispose()</code> on unmount</li>
            <li><code>useMemo(fn, [props])</code> — calls <code>propsUpdate()</code> when props change</li>
            <li><code>useEffect(fn)</code> — calls <code>update()</code> and <code>afterUpdate()</code> on subsequent renders</li>
        </ul>

        <Alert severity="info" sx={{my: 2}}>
            The store&apos;s <code>setRedrawFunction()</code> is called with a React state setter,
            so calling <code>redraw()</code> from the store triggers a React re-render.
        </Alert>

        <h3>Example</h3>
        <pre><code>{`import { useClientStore } from "reca";

const InteractiveWidget = () => {
    const store = useClientStore(WidgetStore);
    return <button onClick={() => store.toggle()}>{store.label}</button>;
};`}</code></pre>

        <hr />

        <h2>useServerStore</h2>

        <pre><code>{`function useServerStore<T extends object>(
    StoreClass: new (...args: any[]) => Store<T>,
    props?: T
): Store<T>;`}</code></pre>

        <p>
            Server-only hook. Creates a store instance, resolves its dependencies
            via DI, and returns it. <strong>No lifecycle methods are called</strong> —
            no <code>activate</code>, no <code>dispose</code>, no <code>update</code>.
        </p>

        <h3>Example</h3>
        <pre><code>{`import { useServerStore } from "reca";

const ServerPage = (props: IPageProps) => {
    const store = useServerStore(PageStore, props);
    return <div>{store.title}</div>;
};`}</code></pre>

        <hr />

        <h2>DI Resolution</h2>
        <p>
            All hooks resolve store constructor dependencies using <code>reflect-metadata</code>.
            Constructor parameters whose type is a class are resolved from the DI container.
            Parameters whose type is <code>Object</code> (TypeScript interfaces at runtime) receive
            the component <code>props</code>.
        </p>

        <pre><code>{`export class MyStore extends AutoStore<IMyProps> {
    constructor(
        private readonly serviceA: ServiceA, // ← DI-resolved
        private readonly serviceB: ServiceB, // ← DI-resolved
    ) {
        super();
    }
}

// All dependencies are resolved automatically
const MyComponent = (props: IMyProps) => {
    const store = useStore(MyStore, props);
    return <div>{store.data}</div>;
};`}</code></pre>

        <h2>Redraw Mechanism</h2>
        <p>
            <code>useClientStore</code> wires the store&apos;s <code>redraw()</code> method to
            a React state update. When a store property changes (in <code>AutoStore</code>) or
            you call <code>redraw()</code> manually (in <code>Store</code>), React re-renders
            the component.
        </p>
        <table>
            <thead>
                <tr><th>Method</th><th>Behavior</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>redraw()</code></td>
                    <td>Batched via <code>requestAnimationFrame</code> — coalesces multiple calls per frame</td>
                </tr>
                <tr>
                    <td><code>forceRedraw()</code></td>
                    <td>Triggers re-render immediately without batching</td>
                </tr>
            </tbody>
        </table>
    </DocContent>
);
