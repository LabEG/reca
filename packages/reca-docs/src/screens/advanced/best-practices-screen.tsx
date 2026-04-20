"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const BestPracticesScreen = (): JSX.Element => (
    <DocContent>
        <h1>Best Practices</h1>
        <p>
            Follow these patterns to get the most out of ReCA and maintain
            a clean, testable codebase.
        </p>

        <h2>Store Design</h2>

        <h3>One Store per Feature / Screen</h3>
        <p>
            Each page or major UI section should have its own store.
            Avoid creating a single &ldquo;god store&rdquo; for the entire application.
        </p>
        <pre><code>{`// ✅ Good — one store per feature
export class LoginStore extends AutoStore { /* ... */ }
export class DashboardStore extends AutoStore { /* ... */ }
export class SettingsStore extends AutoStore { /* ... */ }

// ❌ Bad — everything in one store
export class AppStore extends AutoStore {
    public loginData = {};
    public dashboardData = {};
    public settingsData = {};
}`}</code></pre>

        <h3>Keep Stores Thin</h3>
        <p>
            Stores should orchestrate — not contain business logic.
            Move domain logic into services and data access into repositories.
        </p>
        <pre><code>{`// ✅ Good — store delegates to service
export class OrderStore extends AutoStore {
    public orders: IOrder[] = [];

    constructor(private readonly orderService: OrderService) {
        super();
    }

    public async activate(): Promise<void> {
        this.orders = await this.orderService.getAll();
    }
}

// ❌ Bad — store contains data access logic
export class OrderStore extends AutoStore {
    public orders: IOrder[] = [];

    public async activate(): Promise<void> {
        const res = await fetch("/api/orders");
        this.orders = await res.json();
    }
}`}</code></pre>

        <h2>Layered Architecture</h2>

        <h3>Follow the Layer Rule</h3>
        <p>
            Dependencies flow in one direction: <strong>Store → Service → Repository</strong>.
            Never import a store from a service, or a service from a repository.
        </p>

        <pre><code>{`// ✅ Correct dependency direction
Store → Service → Repository → External API

// ❌ Wrong — repository depends on store
class UserRepository {
    constructor(private readonly store: UserStore) {} // circular!
}`}</code></pre>

        <h3>Separate Read and Write Operations</h3>
        <pre><code>{`export class ProductService {
    constructor(private readonly repo: ProductRepository) {}

    // Queries (read)
    public async getAll(): Promise<IProduct[]> {
        return this.repo.findAll();
    }

    // Commands (write)
    public async create(data: ICreateProduct): Promise<IProduct> {
        return this.repo.save(data);
    }
}`}</code></pre>

        <h2>AutoStore vs Store</h2>

        <Alert severity="info" sx={{my: 2}}>
            Use <code>AutoStore</code> by default. Switch to <code>Store</code> only when
            you need fine-grained control over re-renders.
        </Alert>

        <table>
            <thead>
                <tr><th>Use AutoStore When</th><th>Use Store When</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td>You want automatic re-renders on any state change</td>
                    <td>You need to batch multiple state changes before re-rendering</td>
                </tr>
                <tr>
                    <td>Simple to medium complexity UI</td>
                    <td>High-frequency updates (animations, real-time data)</td>
                </tr>
                <tr>
                    <td>Most features</td>
                    <td>Performance-critical sections</td>
                </tr>
            </tbody>
        </table>

        <h2>Decorators</h2>

        <h3>Use @notAuto() for Non-Reactive Fields</h3>
        <p>
            Mark fields that shouldn&apos;t trigger re-renders with <code>@notAuto()</code>.
            This avoids unnecessary renders for internal state like WebSocket connections,
            timers, or cached computations.
        </p>
        <pre><code>{`export class ChatStore extends AutoStore {
    public messages: IMessage[] = [];

    @notAuto()
    private socket: WebSocket | null = null;

    @notAuto()
    private reconnectTimer: number | null = null;
}`}</code></pre>

        <h3>Use @notRedraw() for Non-Triggering Methods</h3>
        <p>
            Methods decorated with <code>@notRedraw()</code> won&apos;t trigger a re-render
            when they modify state. Use this for internal helpers.
        </p>
        <pre><code>{`export class FormStore extends AutoStore {
    public formData: IFormData = {};

    @notRedraw()
    private validateField(name: string): boolean {
        // Validation logic that shouldn't trigger re-render
        return this.formData[name] !== undefined;
    }
}`}</code></pre>

        <h2>Lifecycle Methods</h2>

        <h3>Use activate() for Data Fetching</h3>
        <pre><code>{`// ✅ Good — fetch in activate()
public activate(): void {
    this.loadData();
}

// ❌ Bad — fetch in constructor
constructor(private readonly service: DataService) {
    super();
    this.loadData(); // constructor should not have side effects
}`}</code></pre>

        <h3>Always Clean Up in dispose()</h3>
        <pre><code>{`public activate(): void {
    this.interval = window.setInterval(() => this.poll(), 5000);
    document.addEventListener("visibilitychange", this.onVisibilityChange);
}

public dispose(): void {
    window.clearInterval(this.interval);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
}`}</code></pre>

        <h2>Testing</h2>

        <h3>Test Stores in Isolation</h3>
        <p>
            Stores are plain classes. Inject mock services in tests:
        </p>
        <pre><code>{`const mockService = {
    getAll: jest.fn().mockResolvedValue([{ id: 1, name: "Test" }]),
};

const store = new TodoStore(mockService as any);
await store.activate();

expect(store.todos).toHaveLength(1);`}</code></pre>

        <h3>Test Services Without Stores</h3>
        <pre><code>{`const mockRepo = {
    findAll: jest.fn().mockResolvedValue([]),
};

const service = new TodoService(mockRepo as any);
const result = await service.getAll();

expect(result).toEqual([]);`}</code></pre>
    </DocContent>
);
