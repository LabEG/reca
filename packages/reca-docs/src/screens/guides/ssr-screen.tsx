"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const SsrScreen = (): JSX.Element => (
    <DocContent>
        <h1>Server-Side Rendering</h1>
        <p>
            ReCA supports <strong>SSR out of the box</strong>. The <code>useStore</code> hook
            automatically detects the runtime environment and delegates to either
            <code>useClientStore</code> or <code>useServerStore</code>.
        </p>

        <h2>How Environment Detection Works</h2>
        <p>
            ReCA checks <code>typeof window !== "undefined"</code> to determine the environment.
            On the server, stores are created without React hooks (no <code>useState</code>,
            no <code>useEffect</code>). On the client, the full lifecycle is used.
        </p>

        <pre><code>{`import { useStore } from "reca";

// Works on both server and client automatically
const MyComponent = (props: IMyProps) => {
    const store = useStore(MyStore, props);
    return <div>{store.data}</div>;
};`}</code></pre>

        <h2>useClientStore</h2>
        <p>
            The client-side hook provides full React lifecycle integration:
        </p>
        <ul>
            <li><code>useState</code> — creates and persists the store instance</li>
            <li><code>useEffect([], ...)</code> — calls <code>activate()</code> on mount, <code>dispose()</code> on unmount</li>
            <li><code>useMemo</code> — calls <code>propsUpdate()</code> when props change</li>
            <li><code>useEffect</code> — calls <code>update()</code> and <code>afterUpdate()</code> on re-renders</li>
        </ul>

        <pre><code>{`import { useClientStore } from "reca";

// Explicit client-side store creation
const MyClientComponent = (props: IMyProps) => {
    const store = useClientStore(MyStore, props);
    return <div>{store.data}</div>;
};`}</code></pre>

        <h2>useServerStore</h2>
        <p>
            The server-side hook is simpler — no React hooks, no lifecycle.
            It creates a store instance, resolves dependencies via DI, and returns it immediately:
        </p>

        <pre><code>{`import { useServerStore } from "reca";

// Explicit server-side store creation (for Server Components)
const MyServerComponent = (props: IMyProps) => {
    const store = useServerStore(MyStore, props);
    return <div>{store.data}</div>;
};`}</code></pre>

        <Alert severity="warning" sx={{my: 2}}>
            On the server, lifecycle methods (<code>activate</code>, <code>dispose</code>,
            <code>update</code>, etc.) are <strong>not called</strong>. Only the constructor
            runs. Use <code>activate()</code> for data fetching only on the client.
        </Alert>

        <h2>Next.js App Router</h2>
        <p>
            In Next.js with the App Router, Server Components are the default.
            For interactive stores that need lifecycle methods, mark your component
            with <code>&quot;use client&quot;</code>:
        </p>

        <pre><code>{`"use client";

import { useStore } from "reca";

export const InteractiveWidget = () => {
    const store = useStore(WidgetStore);
    // Full lifecycle available — activate, update, dispose...
    return (
        <div onClick={() => store.toggle()}>
            {store.isOpen ? "Open" : "Closed"}
        </div>
    );
};`}</code></pre>

        <h2>useStoreAsync</h2>
        <p>
            For server-side data loading with async initialization,
            use <code>useStoreAsync</code>:
        </p>

        <pre><code>{`import { useStoreAsync } from "reca";

// Awaits store creation — useful in Server Components
const DataPage = async (props: IPageProps) => {
    const store = await useStoreAsync(DataStore, props);
    return <div>{store.data}</div>;
};`}</code></pre>

        <h2>Hook Comparison</h2>
        <table>
            <thead>
                <tr>
                    <th>Hook</th>
                    <th>Environment</th>
                    <th>Lifecycle</th>
                    <th>Use Case</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>useStore</code></td>
                    <td>Auto-detect</td>
                    <td>Full (client) / None (server)</td>
                    <td>Default — works everywhere</td>
                </tr>
                <tr>
                    <td><code>useClientStore</code></td>
                    <td>Client only</td>
                    <td>Full</td>
                    <td>Interactive components</td>
                </tr>
                <tr>
                    <td><code>useServerStore</code></td>
                    <td>Server only</td>
                    <td>None</td>
                    <td>Server Components</td>
                </tr>
                <tr>
                    <td><code>useStoreAsync</code></td>
                    <td>Auto-detect</td>
                    <td>Full (client) / None (server)</td>
                    <td>Async initialization</td>
                </tr>
            </tbody>
        </table>
    </DocContent>
);
