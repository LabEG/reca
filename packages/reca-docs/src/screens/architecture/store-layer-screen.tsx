"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content.js";

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

        <h2>Store = Modern Controller</h2>
        <p>
            The Store concept is a direct evolution of the <strong>Controller</strong> from the
            MVC pattern. In Martin Fowler&apos;s words:
        </p>

        <blockquote>
            <p>
                &quot;The controller&apos;s job is to take the user&apos;s input and figure out
                what to do with it... The input controller then picks the appropriate model
                to deal with and the appropriate view to display the result.&quot;
                <br /><em>— Martin Fowler, Patterns of Enterprise Application Architecture (2002), Chapter 14</em>
            </p>
        </blockquote>

        <p>
            ReCA&apos;s Store does exactly this: it receives user interactions from the component,
            orchestrates calls to services, and mutates state so the view re-renders. The key
            difference is that in MVC the controller imperatively tells the view to update,
            while in ReCA the store simply changes its properties and the reactive proxy handles
            the rest.
        </p>

        <blockquote>
            <p>
                &quot;A Presentation Model pulls the state and behavior of the view out into a
                model class that is part of the presentation.&quot;
                <br /><em>— Martin Fowler, &quot;Presentation Model&quot; (2004)</em>
            </p>
        </blockquote>

        <p>
            This is precisely what an AutoStore is — a Presentation Model that holds the
            view&apos;s state and behavior in a standalone, testable class.
        </p>

        <h2>From the Literature</h2>
        <blockquote>
            <p>
                &quot;Separate the user interface code into a view, which handles display and
                user events, and a Presentation Model, which gathers state for the view
                and manages the interaction.&quot;
                <br /><em>— Martin Fowler, Patterns of Enterprise Application Architecture (2002)</em>
            </p>
        </blockquote>

        <blockquote>
            <p>
                &quot;The essence of a Microservice Architecture is to have each component
                own its own data, its own logic, and be independently deployable.&quot;
                <br /><em>— Sam Newman, Building Microservices (2015), Chapter 1</em>
            </p>
        </blockquote>
        <p>
            ReCA applies this microservice philosophy at the component level: each component
            gets its own store instance (a &quot;microstore&quot;), owning its own state and
            logic independently.
        </p>
    </DocContent>
);
