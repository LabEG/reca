"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const ManualStoreScreen = (): JSX.Element => (
    <DocContent>
        <h1>Manual Store</h1>
        <p>
            <code>AutoStore</code> wraps every public property and every method with a
            reactive proxy: any assignment or method call automatically schedules a
            re-render via <code>requestAnimationFrame</code>. This is great for most
            UI work, but sometimes you need a store that <strong>never re-renders on
            its own</strong> — where you decide the exact moment the component updates.
            That is exactly what the base <code>Store</code> class provides.
        </p>

        <h2>The Key Difference</h2>
        <p>
            With <code>AutoStore</code>, internal state and visible state are the same
            thing — every change is immediately scheduled for rendering. With{" "}
            <code>Store</code>, you can freely update internal properties without
            touching the UI, and call <code>this.redraw()</code> only when the data is
            truly ready to be shown:
        </p>
        <pre><code>{`// AutoStore — every property set schedules a re-render
export class PriceStore extends AutoStore {
    price = 0;

    setPrice(value: number) {
        this.price = value; // → schedules re-render immediately
    }
}

// Store — internal state changes are invisible to React
export class PriceStore extends Store {
    price = 0;
    private rawPrice = 0; // never triggers re-render

    setPrice(value: number) {
        this.rawPrice = value;            // silent update
        if (Math.abs(value - this.price) > 1) {
            this.price = value;           // update visible state
            this.redraw();                // re-render only when the change is significant
        }
    }
}`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            <code>redraw()</code> schedules a re-render via <code>requestAnimationFrame</code>.{" "}
            <code>forceRedraw()</code> is synchronous — use it when you need the DOM updated
            immediately (e.g., in tests or right before measuring layout).
        </Alert>

        <h2>When to Use a Manual Store</h2>

        <h3>1. Threshold-Based Re-renders (Scroll / Sensors)</h3>
        <p>
            Scroll events fire on every pixel — hundreds of times per second. With{" "}
            <code>AutoStore</code>, every <code>setScrollY()</code> call would schedule a
            re-render. With <code>Store</code>, the internal scroll position is updated
            silently and the component only re-renders when the sticky threshold is crossed:
        </p>
        <pre><code>{`// stores/sticky-header.store.ts
import { Store } from "reca";

const STICKY_THRESHOLD = 80;

export class StickyHeaderStore extends Store {
    isSticky = false;          // the only piece of state the component needs
    private scrollY = 0;       // internal — never triggers a re-render

    activate() {
        window.addEventListener("scroll", this.handleScroll);
    }

    private handleScroll = () => {
        this.scrollY = window.scrollY;                          // silent update
        const shouldBeSticky = this.scrollY > STICKY_THRESHOLD;

        // Re-render only when the sticky flag actually flips
        if (shouldBeSticky !== this.isSticky) {
            this.isSticky = shouldBeSticky;
            this.redraw();
        }
    };

    dispose() {
        window.removeEventListener("scroll", this.handleScroll);
    }
}

// Component re-renders only twice per scroll session (down and back up)
export const AppHeader = () => {
    const store = useStore(StickyHeaderStore);

    return (
        <header style={{ position: store.isSticky ? "fixed" : "relative" }}>
            <Logo />
        </header>
    );
};`}</code></pre>

        <h3>2. Debounced Search (Custom Timing)</h3>
        <p>
            Autocomplete results should appear after the user <em>stops</em> typing, not on
            every keystroke. The query string is updated immediately in the store, but the
            re-render (showing a spinner, then results) is deferred with{" "}
            <code>setTimeout</code>:
        </p>
        <pre><code>{`// stores/search.store.ts
import { Store } from "reca";
import { SearchService } from "../services/search.service";

export class SearchStore extends Store {
    results: string[] = [];
    isLoading = false;

    private query = "";          // internal buffer — no re-render on typing
    private debounceId = 0;

    constructor(private readonly searchService: SearchService) {
        super();
    }

    setQuery(value: string) {
        this.query = value;                    // silent update
        clearTimeout(this.debounceId);
        this.debounceId = setTimeout(() => this.search(), 300);
    }

    private async search() {
        this.isLoading = true;
        this.redraw();                         // show spinner

        this.results = await this.searchService.find(this.query);
        this.isLoading = false;
        this.redraw();                         // show results
    }
}

export const SearchBox = () => {
    const store = useStore(SearchStore);

    return (
        <div>
            <input onChange={(e) => store.setQuery(e.target.value)} />
            {store.isLoading && <span>Searching...</span>}
            <ul>
                {store.results.map((r) => <li key={r}>{r}</li>)}
            </ul>
        </div>
    );
};`}</code></pre>

        <h3>3. Real-Time Price Feed (Significant Change Only)</h3>
        <p>
            WebSocket ticks arrive many times per second. Re-rendering on every tick would
            cause visual noise and unnecessary work. The store re-renders only when the
            price moves by more than 0.5 %:
        </p>
        <pre><code>{`// stores/price-feed.store.ts
import { Store } from "reca";

export class PriceFeedStore extends Store {
    displayPrice = 0;          // shown in the component
    direction: "up" | "down" | "flat" = "flat";

    private lastTick = 0;      // internal — never triggers re-render
    private socket!: WebSocket;

    activate() {
        this.socket = new WebSocket("wss://prices.example.com");

        this.socket.onmessage = (event) => {
            const tick = JSON.parse(event.data) as number;
            const change = Math.abs(tick - this.lastTick) / (this.lastTick || 1);

            this.lastTick = tick;    // always track internally

            // Re-render only for meaningful moves
            if (change > 0.005) {
                this.direction    = tick > this.displayPrice ? "up" : "down";
                this.displayPrice = tick;
                this.redraw();
            }
        };
    }

    dispose() {
        this.socket.close();
    }
}`}</code></pre>

        <h3>4. WebSocket Message Buffer</h3>
        <p>
            Messages can arrive faster than the browser can paint. Buffer them silently and
            flush the entire batch to the component in one re-render:
        </p>
        <pre><code>{`// stores/live-feed.store.ts
import { Store } from "reca";

export class LiveFeedStore extends Store {
    messages: string[] = [];   // visible state

    private socket!: WebSocket;
    private buffer: string[] = [];   // internal buffer — never re-renders

    activate() {
        this.socket = new WebSocket("wss://example.com/feed");

        this.socket.onmessage = (event) => {
            this.buffer.push(event.data as string);  // silent accumulation

            // One flush per animation frame regardless of message rate
            cancelAnimationFrame(this.rafId);
            this.rafId = requestAnimationFrame(() => this.flush());
        };
    }

    private rafId = 0;

    private flush() {
        if (this.buffer.length === 0) return;
        this.messages = [...this.messages, ...this.buffer];
        this.buffer = [];
        this.redraw();   // one re-render for all buffered messages
    }

    dispose() {
        cancelAnimationFrame(this.rafId);
        this.socket.close();
    }
}`}</code></pre>

        <h2>redraw vs forceRedraw</h2>
        <pre><code>{`// redraw() — schedules via requestAnimationFrame
// Safe to call many times; only one re-render fires per frame
this.redraw();
this.redraw(); // de-duped automatically

// forceRedraw() — synchronous, skips the animation frame queue
// Use in tests or when you need layout measurements right after the update
this.forceRedraw();`}</code></pre>

        <h2>Summary</h2>
        <ul>
            <li>Use <code>Store</code> when you need state that is <strong>internal</strong> (never shown) alongside state that is visible</li>
            <li>Call <code>this.redraw()</code> only when the visible state is ready — not on every internal change</li>
            <li>Ideal for high-frequency events where re-rendering on every update would be wasteful (scroll, WebSocket, sensors)</li>
            <li>Use custom timers (<code>setTimeout</code>, <code>setInterval</code>) for debounce / throttle logic instead of relying on RAF alone</li>
            <li>All lifecycle methods (<code>activate</code>, <code>update</code>, <code>dispose</code>) work exactly the same as in <code>AutoStore</code></li>
        </ul>
    </DocContent>
);
