"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content";

export const AutoStoreApiScreen = (): JSX.Element => (
    <DocContent>
        <h1>AutoStore API</h1>
        <p>
            <code>AutoStore</code> is the primary store base class in ReCA. It uses a
            <code>Proxy</code> to automatically detect property mutations and trigger
            component re-renders.
        </p>

        <h2>Import</h2>
        <pre><code>{`import { AutoStore } from "reca";`}</code></pre>

        <h2>Class Definition</h2>
        <pre><code>{`abstract class AutoStore {
    protected init?(): void | Promise<void>;
    protected dispose?(): void;
}`}</code></pre>

        <h2>Lifecycle Methods</h2>
        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Description</th>
                    <th>React Equivalent</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>init()</code></td>
                    <td>Called once when the component mounts. Can be async.</td>
                    <td><code>useEffect(fn, [])</code></td>
                </tr>
                <tr>
                    <td><code>dispose()</code></td>
                    <td>Called when the component unmounts. Use for cleanup.</td>
                    <td><code>useEffect(() =&gt; fn, [])</code> cleanup</td>
                </tr>
            </tbody>
        </table>

        <h2>Reactivity</h2>
        <p>
            All <strong>public instance properties</strong> are automatically reactive. When you
            assign a new value, push to an array, or mutate an object property, the component
            re-renders.
        </p>

        <h3>Reactive Operations</h3>
        <pre><code>{`class ExampleStore extends AutoStore {
    public count: number = 0;
    public items: string[] = [];
    public user: { name: string } = { name: "" };

    public examples(): void {
        this.count = 5;                // ✅ Triggers re-render
        this.count++;                  // ✅ Triggers re-render
        this.items.push("new");        // ✅ Triggers re-render
        this.items = [...this.items];  // ✅ Triggers re-render
        this.items.splice(0, 1);       // ✅ Triggers re-render
        this.user.name = "Alice";      // ✅ Triggers re-render
    }
}`}</code></pre>

        <h3>Non-Reactive Properties</h3>
        <p>
            Private and protected properties are <strong>not</strong> reactive. Changes to them
            do not trigger re-renders:
        </p>

        <pre><code>{`class ExampleStore extends AutoStore {
    private internalState: number = 0;    // Not reactive
    protected cache: Map<string, any> = new Map(); // Not reactive
}`}</code></pre>

        <h2>Dependency Injection</h2>
        <p>
            Inject services via the constructor. The DI container resolves them automatically:
        </p>

        <pre><code>{`class UserStore extends AutoStore {
    public user: IUser | null = null;

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {
        super();
    }

    public async init(): Promise<void> {
        this.user = await this.userService.getCurrent();
    }
}`}</code></pre>

        <h2>Usage with useStore</h2>
        <pre><code>{`import { useStore } from "reca";
import { UserStore } from "../stores/user.store";

const UserProfile = () => {
    const store = useStore(UserStore);
    // store is fully typed as UserStore
    return <div>{store.user?.name}</div>;
};`}</code></pre>

        <h2>Passing Props to Store</h2>
        <p>
            You can pass component props to a store using the second argument of <code>useStore</code>:
        </p>

        <pre><code>{`class ItemStore extends AutoStore {
    public item: IItem | null = null;

    constructor() {
        super();
    }

    public async init(props: { itemId: number }): Promise<void> {
        this.item = await fetch(\`/api/items/\${props.itemId}\`).then(r => r.json());
    }
}

const ItemCard = ({ itemId }: { itemId: number }) => {
    const store = useStore(ItemStore, { itemId });
    return <div>{store.item?.name}</div>;
};`}</code></pre>
    </DocContent>
);
