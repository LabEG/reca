"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const LifecycleScreen = (): JSX.Element => (
    <DocContent>
        <h1>Lifecycle Methods</h1>
        <p>
            Every ReCA store has a set of lifecycle methods that map to React component
            lifecycle phases. Override them to run code at specific moments — initialization,
            updates, prop changes, and cleanup.
        </p>

        <h2>Lifecycle Diagram</h2>
        <p>The following sequence shows when each method is called:</p>
        <pre><code>{`Component mounts
  └─ activate(props)         ← called once after first render

Component re-renders
  ├─ update(props)           ← every re-render (except first)
  ├─ propsUpdate(props)      ← only when props change
  └─ afterUpdate(props)      ← after DOM update (except first)

Component unmounts
  └─ dispose(props)          ← cleanup`}</code></pre>

        <h2>activate(props)</h2>
        <p>
            Called <strong>once</strong> after the component first renders to the DOM.
            Equivalent to <code>useEffect(() =&gt; &#123;...&#125;, [])</code>.
            Use it for initial data loading, subscriptions, and setup.
        </p>
        <pre><code>{`import { AutoStore } from "reca";

interface IUserPageProps {
    readonly userId: number;
}

export class UserStore extends AutoStore<IUserPageProps> {
    public user: IUser | null = null;
    public isLoading: boolean = true;

    constructor(private readonly userService: UserService) {
        super();
    }

    public activate(props: IUserPageProps): void {
        this.loadUser(props.userId);
    }

    private async loadUser(id: number): Promise<void> {
        this.user = await this.userService.getById(id);
        this.isLoading = false;
    }
}`}</code></pre>

        <h2>update(props)</h2>
        <p>
            Called on <strong>every re-render except the first</strong>.
            Equivalent to running code inside the render body.
            Use it for synchronizing derived state.
        </p>
        <pre><code>{`export class SearchStore extends AutoStore<ISearchProps> {
    public results: IItem[] = [];
    public displayCount: number = 0;

    public update(props: ISearchProps): void {
        this.displayCount = this.results.length;
    }
}`}</code></pre>

        <h2>propsUpdate(props)</h2>
        <p>
            Called <strong>only when props change</strong> (shallow comparison).
            Equivalent to <code>useMemo(() =&gt; &#123;...&#125;, [props])</code>.
            Use it to react to prop changes from the parent component.
        </p>
        <pre><code>{`export class ProductStore extends AutoStore<IProductProps> {
    public product: IProduct | null = null;
    public isLoading: boolean = false;

    constructor(private readonly productService: ProductService) {
        super();
    }

    public propsUpdate(props: IProductProps): void {
        // Re-fetch when productId prop changes
        this.loadProduct(props.productId);
    }

    private async loadProduct(id: number): Promise<void> {
        this.isLoading = true;
        this.product = await this.productService.getById(id);
        this.isLoading = false;
    }
}`}</code></pre>

        <h2>afterUpdate(props)</h2>
        <p>
            Called <strong>after the DOM has updated</strong> on every re-render except
            the first. Equivalent to <code>useEffect(() =&gt; &#123;...&#125;)</code>
            without the initial call. Use it for DOM measurements or imperative DOM manipulation.
        </p>
        <pre><code>{`export class ScrollStore extends AutoStore {
    public items: IItem[] = [];
    public shouldScrollToBottom: boolean = false;

    public afterUpdate(): void {
        if (this.shouldScrollToBottom) {
            const el = document.getElementById("list-container");
            if (el) el.scrollTop = el.scrollHeight;
            this.shouldScrollToBottom = false;
        }
    }
}`}</code></pre>

        <h2>dispose(props)</h2>
        <p>
            Called when the component <strong>unmounts</strong>.
            Equivalent to the cleanup function in <code>useEffect(() =&gt; &#123; return () =&gt; &#123;...&#125; &#125;, [])</code>.
            Use it to clear timers, close connections, and unsubscribe.
        </p>
        <pre><code>{`export class WebSocketStore extends AutoStore {
    public messages: IMessage[] = [];

    @notAuto()
    private socket: WebSocket | null = null;

    public activate(): void {
        this.socket = new WebSocket("wss://api.example.com/ws");
        this.socket.onmessage = (event) => {
            this.messages.push(JSON.parse(event.data));
        };
    }

    public dispose(): void {
        this.socket?.close();
        this.socket = null;
    }
}`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            All lifecycle methods receive the component&apos;s <code>props</code> as an argument.
            Type the props by providing a generic: <code>AutoStore&lt;IMyProps&gt;</code>.
        </Alert>

        <h2>Lifecycle Comparison</h2>
        <table>
            <thead>
                <tr>
                    <th>ReCA Method</th>
                    <th>React Equivalent</th>
                    <th>When Called</th>
                </tr>
            </thead>
            <tbody>
                <tr><td><code>activate(props)</code></td><td><code>useEffect(fn, [])</code></td><td>After first render</td></tr>
                <tr><td><code>update(props)</code></td><td>Render body</td><td>Every re-render (not first)</td></tr>
                <tr><td><code>propsUpdate(props)</code></td><td><code>useMemo(fn, [props])</code></td><td>When props change</td></tr>
                <tr><td><code>afterUpdate(props)</code></td><td><code>useEffect(fn)</code></td><td>After DOM update (not first)</td></tr>
                <tr><td><code>dispose(props)</code></td><td><code>useEffect cleanup</code></td><td>On unmount</td></tr>
            </tbody>
        </table>
    </DocContent>
);
