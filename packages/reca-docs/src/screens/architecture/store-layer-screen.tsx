"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content";

export const StoreLayerScreen = (): JSX.Element => (
    <DocContent>
        <h1>Store Layer</h1>
        <p>
            The Store layer sits between the UI and business logic. Its responsibility is to
            manage <strong>presentation state</strong> — the data that the UI needs to render —
            and to translate user interactions into calls to the service layer.
        </p>

        <h2>Responsibilities</h2>
        <ul>
            <li>Hold UI-specific state (loading flags, form inputs, error messages, selected items)</li>
            <li>Expose methods that components call in response to user events</li>
            <li>Delegate business logic to services</li>
            <li>Transform service responses into UI-friendly state</li>
        </ul>

        <h2>AutoStore vs Store</h2>
        <p>
            ReCA provides two base classes for stores:
        </p>

        <h3>AutoStore (Recommended)</h3>
        <p>
            Wraps the store instance in a <code>Proxy</code>. Any mutation to a public property
            automatically triggers a re-render. This is the recommended choice for most
            applications:
        </p>

        <pre><code>{`import { AutoStore } from "reca";

export class CounterStore extends AutoStore {
    public count: number = 0;

    public increment(): void {
        this.count++;  // Automatically triggers re-render
    }
}`}</code></pre>

        <h3>Store (Manual Control)</h3>
        <p>
            Requires explicit calls to <code>emitChange()</code> to trigger re-renders. Use this
            when you need fine-grained control over when the UI updates — for example, batching
            multiple state changes into a single render:
        </p>

        <pre><code>{`import { Store } from "reca";

export class BatchStore extends Store {
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";

    public updateProfile(first: string, last: string, email: string): void {
        this.firstName = first;
        this.lastName = last;
        this.email = email;
        this.emitChange(); // Single re-render for all three changes
    }
}`}</code></pre>

        <h2>When to Use Which</h2>
        <table>
            <thead>
                <tr>
                    <th>Criteria</th>
                    <th>AutoStore</th>
                    <th>Store</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Ease of use</td><td>Higher</td><td>Lower</td></tr>
                <tr><td>Performance control</td><td>Automatic</td><td>Manual</td></tr>
                <tr><td>Batch updates</td><td>N/A</td><td>Yes</td></tr>
                <tr><td>Best for</td><td>Most apps</td><td>High-frequency updates</td></tr>
            </tbody>
        </table>

        <h2>Lifecycle Methods</h2>
        <p>
            Both <code>AutoStore</code> and <code>Store</code> support lifecycle methods that
            correspond to React component lifecycle events:
        </p>

        <pre><code>{`export class DataStore extends AutoStore {
    public data: Item[] = [];
    public isLoading: boolean = false;

    // Called when the component mounts
    public init(): void {
        this.loadData();
    }

    // Called when the component unmounts
    public dispose(): void {
        // Clean up subscriptions, timers, etc.
    }

    private async loadData(): Promise<void> {
        this.isLoading = true;
        const response = await fetch("/api/items");
        this.data = await response.json();
        this.isLoading = false;
    }
}`}</code></pre>

        <h2>The @NotRedraw Decorator</h2>
        <p>
            Use <code>@NotRedraw</code> on properties that should not trigger re-renders when
            changed. This is useful for internal bookkeeping state:
        </p>

        <pre><code>{`import { AutoStore, NotRedraw } from "reca";

export class TimerStore extends AutoStore {
    public elapsed: number = 0;

    @NotRedraw
    private intervalId: number | null = null;

    public start(): void {
        this.intervalId = window.setInterval(() => {
            this.elapsed++;
        }, 1000);
    }

    public stop(): void {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}`}</code></pre>

        <h2>Design Guidelines</h2>
        <ul>
            <li>Keep stores focused — one store per component or feature</li>
            <li>Never import React in a store — stores are framework-independent presentation logic</li>
            <li>Delegate all business rules to services</li>
            <li>Use getters for computed/derived values</li>
            <li>Name methods after user intentions: <code>handleSubmit</code>, <code>toggleFilter</code></li>
        </ul>
    </DocContent>
);
