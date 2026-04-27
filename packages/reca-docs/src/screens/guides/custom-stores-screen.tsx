"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const CustomStoresScreen = (): JSX.Element => (
    <DocContent>
        <h1>Custom Stores</h1>
        <p>
            ReCA&apos;s store system is built on a simple contract: the framework calls
            <code>setRedrawFunction</code> once and your store calls <code>redraw()</code>
            whenever the view needs to update. Everything else is up to you — which means
            you can build stores on top of <strong>any reactive primitive</strong>:{" "}
            observables, signals, streams, or your own custom logic.
        </p>

        <Alert severity="info" sx={{my: 2}}>
            To create a custom store, extend the base <code>Store</code> class and call{" "}
            <code>this.redraw()</code> from whatever mechanism you choose to track changes.
        </Alert>

        <h2>The Contract</h2>
        <pre><code>{`import { Store } from "reca";

export class MyCustomStore extends Store {
    // 1. Hold your state however you like
    // 2. Call this.redraw() when the view should update
    // 3. Subscribe in activate(), clean up in dispose()
}`}</code></pre>

        <h2>Example 1 — Observable Store (MobX-style)</h2>
        <p>
            Wrap each property in a tiny observable box. Any assignment to an observable
            property automatically schedules a re-render:
        </p>
        <pre><code>{`// lib/observable-store.ts
import { Store } from "reca";

type Box<T> = { value: T };

export class ObservableStore extends Store {
    protected observable<T>(initial: T): T {
        const box: Box<T> = { value: initial };
        const key = Symbol();

        Object.defineProperty(this, key, {
            get: () => box.value,
            set: (v: T) => {
                box.value = v;
                this.redraw();
            },
        });

        // Return a proxy descriptor — use via defineObservable() below
        return initial;
    }

    protected defineObservable<T>(
        propertyName: string,
        initial: T,
    ): void {
        let value = initial;
        Object.defineProperty(this, propertyName, {
            get: () => value,
            set: (v: T) => {
                value = v;
                this.redraw();
            },
            enumerable: true,
            configurable: true,
        });
    }
}`}</code></pre>
        <pre><code>{`// stores/settings.store.ts
import { ObservableStore } from "../lib/observable-store";

export class SettingsStore extends ObservableStore {
    theme: "light" | "dark" = "light";
    language: string = "en";

    constructor() {
        super();
        this.defineObservable("theme",    "light");
        this.defineObservable("language", "en");
    }

    toggleTheme() {
        this.theme = this.theme === "light" ? "dark" : "light";
    }
}

// Usage in component — identical to any other store
export const SettingsPanel = () => {
    const store = useStore(SettingsStore);

    return (
        <div>
            <button onClick={() => store.toggleTheme()}>
                Switch to {store.theme === "light" ? "dark" : "light"} mode
            </button>
            <select
                value={store.language}
                onChange={(e) => { store.language = e.target.value; }}
            >
                <option value="en">English</option>
                <option value="ru">Русский</option>
            </select>
        </div>
    );
};`}</code></pre>

        <h2>Example 2 — RxJS Store</h2>
        <p>
            Subscribe to any <code>Observable</code> stream in <code>activate()</code>
            and let incoming values drive re-renders:
        </p>
        <pre><code>{`// lib/rx-store.ts
import { Store } from "reca";
import { Observable, Subscription } from "rxjs";

export class RxStore extends Store {
    private subscriptions: Subscription[] = [];

    protected subscribe<T>(
        stream$: Observable<T>,
        handler: (value: T) => void,
    ): void {
        const sub = stream$.subscribe((value) => {
            handler(value);
            this.redraw();
        });
        this.subscriptions.push(sub);
    }

    dispose() {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
        this.subscriptions = [];
    }
}`}</code></pre>
        <pre><code>{`// stores/stock-ticker.store.ts
import { RxStore } from "../lib/rx-store";
import { interval } from "rxjs";
import { switchMap } from "rxjs/operators";
import { StockService } from "../services/stock.service";

export class StockTickerStore extends RxStore {
    price  = 0;
    symbol = "AAPL";

    constructor(private readonly stockService: StockService) {
        super();
    }

    activate() {
        // Poll the API every 5 seconds
        this.subscribe(
            interval(5000).pipe(
                switchMap(() => this.stockService.getPrice(this.symbol)),
            ),
            (price) => {
                this.price = price;
            },
        );
    }
}

// Component
export const StockWidget = () => {
    const store = useStore(StockTickerStore);

    return <div>{store.symbol}: \${store.price.toFixed(2)}</div>;
};`}</code></pre>

        <h2>Example 3 — Event Source Store (SSE)</h2>
        <p>
            Build a store that consumes a Server-Sent Events stream and appends
            incoming notifications to a list:
        </p>
        <pre><code>{`// stores/notifications.store.ts
import { Store } from "reca";

export class NotificationsStore extends Store {
    items: { id: number; text: string }[] = [];
    isConnected = false;

    private es!: EventSource;

    activate() {
        this.es = new EventSource("/api/notifications");

        this.es.onopen = () => {
            this.isConnected = true;
            this.redraw();
        };

        this.es.onmessage = (event) => {
            const data = JSON.parse(event.data) as { id: number; text: string };
            this.items = [...this.items, data];
            this.redraw();
        };

        this.es.onerror = () => {
            this.isConnected = false;
            this.redraw();
        };
    }

    dispose() {
        this.es.close();
    }
}

// Component
export const NotificationBell = () => {
    const store = useStore(NotificationsStore);

    return (
        <div>
            <span>{store.isConnected ? "🟢" : "🔴"}</span>
            <span>{store.items.length} notifications</span>
        </div>
    );
};`}</code></pre>

        <h2>Example 4 — LocalStorage-Synced Store</h2>
        <p>
            Persist state to <code>localStorage</code> and restore it on mount.
            Any write is automatically saved and reflected in the UI:
        </p>
        <pre><code>{`// lib/persistent-store.ts
import { Store } from "reca";

export class PersistentStore<TState extends object> extends Store {
    private readonly storageKey: string;

    constructor(key: string, initial: TState) {
        super();
        this.storageKey = key;

        const saved = localStorage.getItem(key);
        const state: TState = saved ? (JSON.parse(saved) as TState) : initial;

        for (const [prop, value] of Object.entries(state)) {
            let current = value;
            Object.defineProperty(this, prop, {
                get: () => current,
                set: (v: unknown) => {
                    current = v;
                    this.persist();
                    this.redraw();
                },
                enumerable: true,
                configurable: true,
            });
        }
    }

    private persist() {
        const snapshot = Object.fromEntries(
            Object.entries(this).filter(([k]) => k !== "storageKey"),
        );
        localStorage.setItem(this.storageKey, JSON.stringify(snapshot));
    }
}`}</code></pre>
        <pre><code>{`// stores/user-preferences.store.ts
import { PersistentStore } from "../lib/persistent-store";

interface IPreferences {
    sidebarOpen: boolean;
    pageSize:    number;
    theme:       "light" | "dark";
}

export class UserPreferencesStore extends PersistentStore<IPreferences> {
    sidebarOpen = true;
    pageSize    = 20;
    theme: "light" | "dark" = "light";

    constructor() {
        super("user-preferences", {
            sidebarOpen: true,
            pageSize:    20,
            theme:       "light",
        });
    }
}

// Component — reads and writes survive page reload
export const Sidebar = () => {
    const store = useStore(UserPreferencesStore);

    return (
        <aside style={{ display: store.sidebarOpen ? "block" : "none" }}>
            <button onClick={() => { store.sidebarOpen = false; }}>
                Close
            </button>
        </aside>
    );
};`}</code></pre>

        <h2>Summary</h2>
        <ul>
            <li>Extend <code>Store</code> (not <code>AutoStore</code>) as the base for custom stores</li>
            <li>The only rule: call <code>this.redraw()</code> when state has changed</li>
            <li>Subscribe to any external source in <code>activate()</code>; clean up in <code>dispose()</code></li>
            <li>Wrap the pattern into a reusable base class (<code>RxStore</code>, <code>PersistentStore</code>, etc.) and share it across your project</li>
            <li>The component always uses the same <code>useStore()</code> hook — it never knows what kind of store it is</li>
        </ul>
    </DocContent>
);
