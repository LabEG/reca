"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const StoreApiScreen = (): JSX.Element => (
    <DocContent>
        <h1>Store API</h1>
        <p>
            <code>Store</code> is the manual-control store base class. Unlike <code>AutoStore</code>,
            it requires explicit calls to <code>emitChange()</code> to trigger re-renders.
            Use it when you need fine-grained control over rendering performance.
        </p>

        <h2>Import</h2>
        <pre><code>{`import { Store } from "reca";`}</code></pre>

        <h2>Class Definition</h2>
        <pre><code>{`abstract class Store {
    protected emitChange(): void;
    protected init?(): void | Promise<void>;
    protected dispose?(): void;
}`}</code></pre>

        <h2>Methods</h2>
        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>emitChange()</code></td>
                    <td>Manually triggers a component re-render. Must be called after state changes.</td>
                </tr>
                <tr>
                    <td><code>init()</code></td>
                    <td>Called when the component mounts. Can be async.</td>
                </tr>
                <tr>
                    <td><code>dispose()</code></td>
                    <td>Called when the component unmounts.</td>
                </tr>
            </tbody>
        </table>

        <h2>Basic Usage</h2>
        <pre><code>{`import { Store } from "reca";

export class CounterStore extends Store {
    public count: number = 0;

    public increment(): void {
        this.count++;
        this.emitChange(); // Required!
    }

    public decrement(): void {
        this.count--;
        this.emitChange(); // Required!
    }
}`}</code></pre>

        <h2>Batch Updates</h2>
        <p>
            The primary advantage of <code>Store</code> is the ability to batch multiple state
            changes into a single re-render:
        </p>

        <pre><code>{`export class FormStore extends Store {
    public firstName: string = "";
    public lastName: string = "";
    public email: string = "";
    public phone: string = "";

    public resetForm(): void {
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.phone = "";
        this.emitChange(); // One re-render for four changes
    }

    public populateFromProfile(profile: IProfile): void {
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.email = profile.email;
        this.phone = profile.phone;
        this.emitChange(); // One re-render
    }
}`}</code></pre>

        <h2>Async Operations</h2>
        <pre><code>{`export class DataStore extends Store {
    public items: IItem[] = [];
    public isLoading: boolean = false;
    public error: string | null = null;

    public async loadItems(): Promise<void> {
        this.isLoading = true;
        this.error = null;
        this.emitChange();

        try {
            const response = await fetch("/api/items");
            this.items = await response.json();
        } catch (e: any) {
            this.error = e.message;
        } finally {
            this.isLoading = false;
            this.emitChange();
        }
    }
}`}</code></pre>

        <h2>When to Choose Store over AutoStore</h2>
        <ul>
            <li><strong>High-frequency updates</strong> — e.g., real-time data, animations, or frequent polling</li>
            <li><strong>Batch mutations</strong> — when you update many properties at once and want a single render</li>
            <li><strong>Explicit control</strong> — when you want to control exactly when the UI updates</li>
            <li><strong>Performance-critical paths</strong> — when you need to avoid proxy overhead</li>
        </ul>

        <h2>Usage with useStore</h2>
        <p>
            <code>Store</code> is used with <code>useStore</code> the same way as <code>AutoStore</code>:
        </p>

        <pre><code>{`import { useStore } from "reca";
import { CounterStore } from "../stores/counter.store";

const Counter = () => {
    const store = useStore(CounterStore);
    return (
        <div>
            <span>{store.count}</span>
            <button onClick={store.increment}>+</button>
        </div>
    );
};`}</code></pre>
    </DocContent>
);
