"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const FaqScreen = (): JSX.Element => (
    <DocContent>
        <h1>FAQ</h1>

        <h2>General</h2>

        <h3>What does ReCA stand for?</h3>
        <p>
            <strong>Re</strong>act <strong>C</strong>lean <strong>A</strong>rchitecture.
            ReCA applies Clean Architecture principles from Robert C. Martin to React
            state management.
        </p>

        <h3>Is ReCA a state management library?</h3>
        <p>
            Yes, but it&apos;s more than that. ReCA is an <strong>architectural framework</strong> that
            provides state management, dependency injection, lifecycle management, and a
            layered structure (Store → Service → Repository).
        </p>

        <h3>Does ReCA work with Next.js?</h3>
        <p>
            Yes. ReCA supports both client and server components. The <code>useStore</code> hook
            automatically detects the environment and uses the appropriate implementation.
            See the <a href="/guides/ssr">SSR guide</a>.
        </p>

        <h3>Does ReCA work with React Native?</h3>
        <p>
            Yes. ReCA has no DOM dependencies. It works in any React environment that
            supports <code>reflect-metadata</code>.
        </p>

        <h2>Stores</h2>

        <h3>What&apos;s the difference between AutoStore and Store?</h3>
        <p>
            <code>AutoStore</code> automatically triggers a re-render when any public property
            changes (via Proxy). <code>Store</code> only re-renders when you explicitly call
            <code>redraw()</code> or <code>forceRedraw()</code>.
        </p>
        <p>
            Use <code>AutoStore</code> by default. Use <code>Store</code> when you need
            fine-grained control over re-renders.
        </p>

        <h3>Can I share state between components?</h3>
        <p>
            Stores are scoped to individual components by default. To share state,
            extract it into a <strong>service</strong> (which is a DI singleton).
            Multiple stores can inject the same service and share its state.
        </p>

        <pre><code>{`// Shared state lives in a service
export class CartService {
    public items: ICartItem[] = [];

    public addItem(item: ICartItem): void {
        this.items = [...this.items, item];
    }
}

// Multiple stores share the same CartService instance
export class HeaderStore extends AutoStore {
    constructor(public readonly cart: CartService) { super(); }
}

export class CheckoutStore extends AutoStore {
    constructor(public readonly cart: CartService) { super(); }
}`}</code></pre>

        <h3>Why is my component not re-rendering?</h3>
        <p>Common causes:</p>
        <ol>
            <li>You&apos;re using <code>Store</code> instead of <code>AutoStore</code> — call <code>redraw()</code> after state changes</li>
            <li>The field is decorated with <code>@notAuto()</code> — remove the decorator</li>
            <li>The method is decorated with <code>@notRedraw()</code> — remove the decorator</li>
            <li>You&apos;re mutating an object/array in place — create a new reference instead</li>
        </ol>
        <pre><code>{`// ❌ Mutation — won't trigger re-render in AutoStore
this.items.push(newItem);

// ✅ New reference — triggers re-render
this.items = [...this.items, newItem];`}</code></pre>

        <h3>Can I use async methods in stores?</h3>
        <p>
            Yes. <code>AutoStore</code> detects property changes in async methods
            and triggers re-renders automatically:
        </p>
        <pre><code>{`export class DataStore extends AutoStore {
    public data: IData | null = null;
    public isLoading: boolean = false;

    public async loadData(): Promise<void> {
        this.isLoading = true;    // re-render → show spinner
        this.data = await fetchData();
        this.isLoading = false;   // re-render → show data
    }
}`}</code></pre>

        <h2>Dependency Injection</h2>

        <h3>Do I need to register every class?</h3>
        <p>
            No. Concrete classes are resolved automatically by <code>first-di</code>.
            You only need <code>reflection.set()</code> when mapping an abstract class
            to a concrete implementation.
        </p>

        <h3>Why do I get &quot;Cannot read metadata&quot; error?</h3>
        <p>
            Ensure these tsconfig settings are enabled:
        </p>
        <pre><code>{`{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}`}</code></pre>
        <p>
            And import <code>reflect-metadata</code> at your application entry point:
        </p>
        <pre><code>{`import "reflect-metadata";`}</code></pre>

        <h3>Can I use a different DI container?</h3>
        <p>
            Yes. Override <code>config.di.resolver</code> with your container&apos;s
            resolve function. See the <a href="/api/configuration">Configuration API</a>.
        </p>

        <h2>Performance</h2>

        <h3>How does AutoStore detect changes?</h3>
        <p>
            <code>AutoStore</code> wraps the instance in a <code>Proxy</code> that intercepts
            property set operations. When a property value changes, <code>redraw()</code>
            is called automatically.
        </p>

        <h3>Does every property change cause a re-render?</h3>
        <p>
            <code>redraw()</code> is batched via <code>requestAnimationFrame</code>.
            Multiple property changes within the same synchronous execution or microtask
            are coalesced into a single re-render.
        </p>
        <pre><code>{`// Only ONE re-render, not three
public updateAll(): void {
    this.name = "Alice";     // schedules redraw
    this.age = 30;           // already scheduled
    this.email = "a@b.com";  // already scheduled
    // → single redraw on next animation frame
}`}</code></pre>

        <h3>How do I prevent unnecessary re-renders?</h3>
        <ul>
            <li>Use <code>@notAuto()</code> on fields that don&apos;t affect the UI</li>
            <li>Use <code>@notRedraw()</code> on helper methods</li>
            <li>Use <code>Store</code> instead of <code>AutoStore</code> for fine-grained control</li>
            <li>Split large stores into smaller feature stores</li>
        </ul>

        <h2>TypeScript</h2>

        <h3>How do I type store props?</h3>
        <pre><code>{`interface IMyProps {
    readonly id: number;
    readonly name: string;
}

export class MyStore extends AutoStore<IMyProps> {
    public activate(props: IMyProps): void {
        // props are fully typed
    }
}`}</code></pre>

        <h3>Can I use ReCA with JavaScript (no TypeScript)?</h3>
        <p>
            ReCA relies on <code>reflect-metadata</code> for DI, which requires TypeScript
            decorator metadata emission. It is designed for TypeScript projects.
        </p>
    </DocContent>
);
