"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const ComponentCommunicationScreen = (): JSX.Element => (
    <DocContent>
        <h1>Component Communication</h1>
        <p>
            When two components are far apart in the tree — for example a form deep in the
            page and a header at the top — passing data through props becomes impractical. ReCA
            solves this with a <strong>shared service</strong> that acts as a message bus
            using the EventEmitter pattern.
        </p>

        <h2>The Problem</h2>
        <p>
            Imagine an <code>AppHeader</code> at the top of the page and a <code>ProfileForm</code>
            deep in the content area. They have no common parent that can hold shared state
            without prop-drilling through dozens of intermediate components:
        </p>
        <pre><code>{`<App>
  <AppHeader />          ← shows user's name
  <Main>
    <ProfilePage>
      <ProfileForm />    ← user types their name
    </ProfilePage>
  </Main>
</App>`}</code></pre>

        <h2>Solution: Shared Service + EventEmitter</h2>
        <p>
            Create a service with a typed <code>EventEmitter</code>. Both stores inject
            the same service (DI resolves it as a singleton) and communicate through events.
        </p>

        <h3>Step 1 — Define Events</h3>
        <pre><code>{`// events/user-events.ts
export enum UserEvent {
    NameChanged = "name-changed",
}

export interface IUserEvents {
    [UserEvent.NameChanged]: string;
}`}</code></pre>

        <h3>Step 2 — Create the Event Service</h3>
        <p>
            A lightweight typed EventEmitter. No external libraries required:
        </p>
        <pre><code>{`// services/user-event.service.ts
type Listener<T> = (data: T) => void;

export class UserEventService {
    private readonly listeners = new Map<string, Set<Listener<any>>>();

    public on<K extends keyof IUserEvents>(
        event: K,
        listener: Listener<IUserEvents[K]>,
    ): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(listener);
    }

    public off<K extends keyof IUserEvents>(
        event: K,
        listener: Listener<IUserEvents[K]>,
    ): void {
        this.listeners.get(event)?.delete(listener);
    }

    public emit<K extends keyof IUserEvents>(
        event: K,
        ...args: IUserEvents[K] extends void ? [] : [IUserEvents[K]]
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
            The service is a singleton — DI guarantees that <code>ProfileStore</code>
            and <code>HeaderStore</code> receive the <strong>same instance</strong>.
        </Alert>

        <h3>Step 3 — Sender Store (Profile)</h3>
        <pre><code>{`// stores/profile.store.ts
import { AutoStore } from "reca";
import { UserEventService } from "../services/user-event.service";
import { UserEvent } from "../events/user-events";

export class ProfileStore extends AutoStore {
    public name: string = "";

    constructor(private readonly userEvents: UserEventService) {
        super();
    }

    public setName(value: string): void {
        this.name = value;
        this.userEvents.emit(UserEvent.NameChanged, value);
    }
}`}</code></pre>

        <h3>Step 4 — Receiver Store (Header)</h3>
        <pre><code>{`// stores/header.store.ts
import { AutoStore, notAuto } from "reca";
import { UserEventService } from "../services/user-event.service";
import { UserEvent } from "../events/user-events";

export class HeaderStore extends AutoStore {
    public userName: string = "Guest";

    // Stable reference used only for subscribe / unsubscribe
    private readonly onNameChanged = (name: string) => this.handleNameChanged(name);

    constructor(private readonly userEvents: UserEventService) {
        super();
    }

    private handleNameChanged(name: string): void {
        this.userName = name || "Guest";
    }

    public activate(): void {
        this.userEvents.on(UserEvent.NameChanged, this.onNameChanged);
    }

    public dispose(): void {
        this.userEvents.off(UserEvent.NameChanged, this.onNameChanged);
    }
}`}</code></pre>

        <Alert severity="warning" sx={{my: 2}}>
            Always unsubscribe in <code>dispose()</code>! Otherwise the listener will
            outlive the component and cause memory leaks or errors.
        </Alert>

        <h3>Step 5 — Components</h3>
        <pre><code>{`// components/ProfileForm.tsx
import { useStore } from "reca";
import { ProfileStore } from "../stores/profile.store";

export const ProfileForm = () => {
    const store = useStore(ProfileStore);

    return (
        <div>
            <label>Full Name</label>
            <input
                value={store.name}
                onChange={(e) => store.setName(e.target.value)}
                placeholder="Enter your name..."
            />
        </div>
    );
};

// components/AppHeader.tsx
import { useStore } from "reca";
import { HeaderStore } from "../stores/header.store";

export const AppHeader = () => {
    const store = useStore(HeaderStore);

    return (
        <header>
            <span>Welcome, {store.userName}!</span>
        </header>
    );
};`}</code></pre>

        <h2>How It Works</h2>
        <pre><code>{`ProfileForm                      AppHeader
   │                                │
   │  store.setName("Alice")        │
   │      │                         │
   │      ▼                         │
   │  UserEventService              │
   │  (DI singleton)                │
   │      │                         │
   │      │  emit("name-changed")   │
   │      │─────────────────────────▶
   │                           onNameChanged("Alice")
   │                           userName = "Alice"
   │                           redraw ✓`}</code></pre>

        <h2>Two-Way Communication</h2>
        <p>
            Communication can go both ways. The header can have a &quot;Sign out&quot; button
            that resets the name everywhere:
        </p>
        <pre><code>{`// Add a new event
export enum UserEvent {
    NameChanged = "name-changed",
    SignedOut   = "signed-out",      // ← new
}

export interface IUserEvents {
    [UserEvent.NameChanged]: string;
    [UserEvent.SignedOut]: void;      // ← new
}

// In HeaderStore — emit on sign out
public signOut(): void {
    this.userName = "Guest";
    this.userEvents.emit(UserEvent.SignedOut);
}

// In ProfileStore — react to sign out
private handleSignedOut(): void {
    this.name = "";
}

private readonly onSignedOut = () => this.handleSignedOut();

public activate(): void {
    this.userEvents.on(UserEvent.SignedOut, this.onSignedOut);
}

public dispose(): void {
    this.userEvents.off(UserEvent.SignedOut, this.onSignedOut);
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
            <li>Put logic in a regular <strong>method</strong> (<code>private handleX()</code>) and keep a thin arrow property as a stable reference: <code>private readonly onX = () =&gt; this.handleX()</code></li>
            <li>Mark handlers with <code>@notAuto()</code> — they are implementation details, not state</li>
            <li>Subscribe in <code>activate()</code>, unsubscribe in <code>dispose()</code> — always</li>
            <li>Use <strong>enums</strong> for event names to avoid typos and enable auto-complete</li>
            <li>Keep event services <strong>domain-scoped</strong> — one bus per feature, not one global bus</li>
            <li>Prefer <strong>data payloads</strong> over imperative callbacks for testability</li>
        </ul>
    </DocContent>
);
