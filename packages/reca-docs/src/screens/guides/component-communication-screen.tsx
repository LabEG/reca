"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const ComponentCommunicationScreen = (): JSX.Element => (
    <DocContent>
        <h1>Component Communication</h1>
        <p>
            When two components are far apart in the tree — for example a header and
            a settings panel — passing data through props becomes impractical. ReCA
            solves this with a <strong>shared service</strong> that acts as a message bus
            using the EventEmitter pattern.
        </p>

        <h2>The Problem</h2>
        <p>
            Imagine a <code>Toolbar</code> at the top of the page and a <code>Canvas</code>
            deep inside a tab layout. They have no common parent that can hold shared state
            without prop-drilling through dozens of intermediate components:
        </p>
        <pre><code>{`<App>
  <Header>
    <Toolbar />          ← sends "clear canvas" command
  </Header>
  <Main>
    <TabLayout>
      <Tab>
        <Canvas />       ← receives the command
      </Tab>
    </TabLayout>
  </Main>
</App>`}</code></pre>

        <h2>Solution: Shared Service + EventEmitter</h2>
        <p>
            Create a service with a typed <code>EventEmitter</code>. Both stores inject
            the same service (DI resolves it as a singleton) and communicate through events.
        </p>

        <h3>Step 1 — Define Events</h3>
        <pre><code>{`// events/canvas-events.ts
export enum CanvasEvent {
    Clear = "clear",
    Undo = "undo",
    ZoomChanged = "zoom-changed",
    SelectionChanged = "selection-changed",
}

export interface ICanvasEvents {
    [CanvasEvent.Clear]: void;
    [CanvasEvent.Undo]: void;
    [CanvasEvent.ZoomChanged]: number;
    [CanvasEvent.SelectionChanged]: string[];
}`}</code></pre>

        <h3>Step 2 — Create the Event Service</h3>
        <p>
            A lightweight typed EventEmitter. No external libraries required:
        </p>
        <pre><code>{`// services/canvas-event.service.ts
type Listener<T> = (data: T) => void;

export class CanvasEventService {
    private readonly listeners = new Map<string, Set<Listener<any>>>();

    public on<K extends keyof ICanvasEvents>(
        event: K,
        listener: Listener<ICanvasEvents[K]>,
    ): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(listener);
    }

    public off<K extends keyof ICanvasEvents>(
        event: K,
        listener: Listener<ICanvasEvents[K]>,
    ): void {
        this.listeners.get(event)?.delete(listener);
    }

    public emit<K extends keyof ICanvasEvents>(
        event: K,
        ...args: ICanvasEvents[K] extends void ? [] : [ICanvasEvents[K]]
    ): void {
        const set = this.listeners.get(event);
        if (set) {
            for (const fn of set) {
                fn(...(args as [any]));
            }
        }
    }
}`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            The service is a singleton — DI guarantees that <code>ToolbarStore</code>
            and <code>CanvasStore</code> receive the <strong>same instance</strong>.
        </Alert>

        <h3>Step 3 — Sender Store (Toolbar)</h3>
        <pre><code>{`// stores/toolbar.store.ts
import { AutoStore } from "reca";
import { CanvasEventService } from "../services/canvas-event.service";
import { CanvasEvent } from "../events/canvas-events";

export class ToolbarStore extends AutoStore {
    public zoom: number = 100;

    constructor(private readonly canvasEvents: CanvasEventService) {
        super();
    }

    public clear(): void {
        this.canvasEvents.emit(CanvasEvent.Clear);
    }

    public undo(): void {
        this.canvasEvents.emit(CanvasEvent.Undo);
    }

    public setZoom(value: number): void {
        this.zoom = value;
        this.canvasEvents.emit(CanvasEvent.ZoomChanged, value);
    }
}`}</code></pre>

        <h3>Step 4 — Receiver Store (Canvas)</h3>
        <pre><code>{`// stores/canvas.store.ts
import { AutoStore, notAuto } from "reca";
import { CanvasEventService } from "../services/canvas-event.service";
import { CanvasEvent } from "../events/canvas-events";

export class CanvasStore extends AutoStore {
    public items: ICanvasItem[] = [];
    public zoom: number = 100;

    @notAuto()
    private readonly onClear = (): void => {
        this.items = [];
    };

    @notAuto()
    private readonly onUndo = (): void => {
        this.items = this.items.slice(0, -1);
    };

    @notAuto()
    private readonly onZoomChanged = (value: number): void => {
        this.zoom = value;
    };

    constructor(private readonly canvasEvents: CanvasEventService) {
        super();
    }

    public activate(): void {
        this.canvasEvents.on(CanvasEvent.Clear, this.onClear);
        this.canvasEvents.on(CanvasEvent.Undo, this.onUndo);
        this.canvasEvents.on(CanvasEvent.ZoomChanged, this.onZoomChanged);
    }

    public dispose(): void {
        this.canvasEvents.off(CanvasEvent.Clear, this.onClear);
        this.canvasEvents.off(CanvasEvent.Undo, this.onUndo);
        this.canvasEvents.off(CanvasEvent.ZoomChanged, this.onZoomChanged);
    }
}`}</code></pre>

        <Alert severity="warning" sx={{my: 2}}>
            Always unsubscribe in <code>dispose()</code>! Otherwise the listener will
            outlive the component and cause memory leaks or errors.
        </Alert>

        <h3>Step 5 — Components</h3>
        <pre><code>{`// components/Toolbar.tsx
import { useStore } from "reca";
import { ToolbarStore } from "../stores/toolbar.store";

export const Toolbar = () => {
    const store = useStore(ToolbarStore);

    return (
        <div>
            <button onClick={() => store.clear()}>Clear</button>
            <button onClick={() => store.undo()}>Undo</button>
            <input
                type="range"
                min={10}
                max={200}
                value={store.zoom}
                onChange={(e) => store.setZoom(Number(e.target.value))}
            />
        </div>
    );
};

// components/Canvas.tsx
import { useStore } from "reca";
import { CanvasStore } from "../stores/canvas.store";

export const Canvas = () => {
    const store = useStore(CanvasStore);

    return (
        <div style={{ zoom: \`\${store.zoom}%\` }}>
            {store.items.map((item) => (
                <div key={item.id}>{item.content}</div>
            ))}
        </div>
    );
};`}</code></pre>

        <h2>How It Works</h2>
        <pre><code>{`Toolbar                          Canvas
   │                                │
   │  store.clear()                 │
   │      │                         │
   │      ▼                         │
   │  CanvasEventService            │
   │  (DI singleton)                │
   │      │                         │
   │      │  emit("clear")          │
   │      │─────────────────────────▶
   │                           onClear()
   │                           items = []
   │                           redraw ✓`}</code></pre>

        <h2>Two-Way Communication</h2>
        <p>
            Communication can go both ways. The canvas can notify the toolbar
            about selection changes:
        </p>
        <pre><code>{`// In CanvasStore — emit when selection changes
public selectItem(id: string): void {
    this.selectedIds = [...this.selectedIds, id];
    this.canvasEvents.emit(CanvasEvent.SelectionChanged, this.selectedIds);
}

// In ToolbarStore — react to selection
public activate(): void {
    this.canvasEvents.on(
        CanvasEvent.SelectionChanged,
        this.onSelectionChanged,
    );
}

private readonly onSelectionChanged = (ids: string[]): void => {
    this.hasSelection = ids.length > 0;
};

public dispose(): void {
    this.canvasEvents.off(
        CanvasEvent.SelectionChanged,
        this.onSelectionChanged,
    );
}`}</code></pre>

        <h2>Generic EventBus Service</h2>
        <p>
            For apps with many event channels, create a reusable generic
            event bus:
        </p>
        <pre><code>{`// services/event-bus.service.ts
type Listener<T> = (data: T) => void;

export class EventBus<TEvents extends Record<string, any>> {
    private readonly listeners = new Map<string, Set<Listener<any>>>();

    public on<K extends keyof TEvents & string>(
        event: K,
        listener: Listener<TEvents[K]>,
    ): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(listener);
    }

    public off<K extends keyof TEvents & string>(
        event: K,
        listener: Listener<TEvents[K]>,
    ): void {
        this.listeners.get(event)?.delete(listener);
    }

    public emit<K extends keyof TEvents & string>(
        event: K,
        ...args: TEvents[K] extends void ? [] : [TEvents[K]]
    ): void {
        const set = this.listeners.get(event);
        if (set) {
            for (const fn of set) fn(...(args as [any]));
        }
    }
}

// Create typed instances per domain
export class NotificationBus extends EventBus<INotificationEvents> {}
export class CartBus extends EventBus<ICartEvents> {}`}</code></pre>

        <h2>Best Practices</h2>
        <ul>
            <li>Use <strong>arrow function</strong> handlers (<code>private readonly onX = () =&gt;</code>) to avoid <code>this</code> binding issues</li>
            <li>Mark handlers with <code>@notAuto()</code> — they are implementation details, not state</li>
            <li>Subscribe in <code>activate()</code>, unsubscribe in <code>dispose()</code> — always</li>
            <li>Use <strong>enums</strong> for event names to avoid typos and enable auto-complete</li>
            <li>Keep event services <strong>domain-scoped</strong> — one bus per feature, not one global bus</li>
            <li>Prefer <strong>data payloads</strong> over imperative callbacks for testability</li>
        </ul>
    </DocContent>
);
