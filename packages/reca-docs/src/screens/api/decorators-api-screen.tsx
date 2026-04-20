"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const DecoratorsApiScreen = (): JSX.Element => (
    <DocContent>
        <h1>Decorators API</h1>
        <p>
            ReCA provides decorators to fine-tune store behavior. Decorators are applied to
            class properties and methods to control reactivity and DI behavior.
        </p>

        <h2>@NotRedraw</h2>
        <p>
            Prevents a property from triggering re-renders when changed. Use this for internal
            bookkeeping state that the UI does not need to observe.
        </p>

        <h3>Import</h3>
        <pre><code>{`import { NotRedraw } from "reca";`}</code></pre>

        <h3>Usage</h3>
        <pre><code>{`import { AutoStore, NotRedraw } from "reca";

export class PollingStore extends AutoStore {
    public data: IData[] = [];
    public isLoading: boolean = false;

    @NotRedraw
    private intervalId: number | null = null;

    @NotRedraw
    private requestCount: number = 0;

    public startPolling(): void {
        this.intervalId = window.setInterval(() => {
            this.requestCount++;  // Does NOT trigger re-render
            this.fetchData();
        }, 5000);
    }

    public stopPolling(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;  // Does NOT trigger re-render
        }
    }

    private async fetchData(): Promise<void> {
        this.isLoading = true;  // Triggers re-render
        const response = await fetch("/api/data");
        this.data = await response.json();  // Triggers re-render
        this.isLoading = false;  // Triggers re-render
    }
}`}</code></pre>

        <h3>When to Use</h3>
        <ul>
            <li>Timer and interval IDs</li>
            <li>Internal counters or flags not displayed in the UI</li>
            <li>Cached references (e.g., AbortController instances)</li>
            <li>WebSocket connections or event listener handles</li>
        </ul>

        <h2>@NotAuto</h2>
        <p>
            Excludes a property from the AutoStore proxy. The property behaves as a regular
            class property — mutations are not intercepted. This is different from
            <code>@NotRedraw</code> in that the property is completely excluded from the
            proxy, not just from triggering renders.
        </p>

        <h3>Import</h3>
        <pre><code>{`import { NotAuto } from "reca";`}</code></pre>

        <h3>Usage</h3>
        <pre><code>{`import { AutoStore, NotAuto } from "reca";

export class StreamStore extends AutoStore {
    public messages: IMessage[] = [];

    @NotAuto
    private socket: WebSocket | null = null;

    public connect(url: string): void {
        this.socket = new WebSocket(url);
        this.socket.onmessage = (event) => {
            this.messages.push(JSON.parse(event.data));
        };
    }

    public disconnect(): void {
        this.socket?.close();
        this.socket = null;
    }

    public send(message: string): void {
        this.socket?.send(message);
    }
}`}</code></pre>

        <h3>When to Use</h3>
        <ul>
            <li>Complex objects that should not be wrapped in a Proxy (e.g., WebSocket, DOM elements)</li>
            <li>Third-party library instances that break when proxied</li>
            <li>Large data structures where proxy overhead would be too high</li>
        </ul>

        <h2>Comparison</h2>
        <table>
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>@NotRedraw</th>
                    <th>@NotAuto</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Property is proxied</td>
                    <td>Yes</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td>Triggers re-render on change</td>
                    <td>No</td>
                    <td>No</td>
                </tr>
                <tr>
                    <td>Use case</td>
                    <td>Internal counters, timer IDs</td>
                    <td>Complex objects, external instances</td>
                </tr>
                <tr>
                    <td>Works with Store</td>
                    <td>N/A (Store is manual)</td>
                    <td>N/A (Store is manual)</td>
                </tr>
            </tbody>
        </table>

        <h2>TypeScript Configuration</h2>
        <p>
            Both decorators require the following <code>tsconfig.json</code> settings:
        </p>

        <pre><code>{`{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}`}</code></pre>
    </DocContent>
);
