"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content";

export const RepositoryLayerScreen = (): JSX.Element => (
    <DocContent>
        <h1>Repository Layer</h1>
        <p>
            The Repository layer is the outermost layer in Clean Architecture. It abstracts
            all communication with <strong>external data sources</strong> — REST APIs, GraphQL
            endpoints, databases, local storage, or third-party SDKs.
        </p>

        <h2>Responsibilities</h2>
        <ul>
            <li>Encapsulate HTTP requests, WebSocket connections, and other I/O</li>
            <li>Serialize and deserialize data between the transport format and domain models</li>
            <li>Handle authentication headers, retries, and timeouts</li>
            <li>Provide a clean interface that the service layer consumes</li>
        </ul>

        <h2>Base Repository Pattern</h2>
        <p>
            Create a base repository with shared configuration (headers, base URL, error handling):
        </p>

        <pre><code>{`// repositories/base.repository.ts
export abstract class BaseRepository {

    protected abstract readonly basePath: string;

    private get baseUrl(): string {
        return \`\${process.env.API_URL}\${this.basePath}\`;
    }

    protected async get<T>(path: string = ""): Promise<T> {
        const response = await fetch(\`\${this.baseUrl}\${path}\`, {
            headers: this.getHeaders(),
        });
        this.assertOk(response);
        return response.json();
    }

    protected async post<T>(path: string, body: unknown): Promise<T> {
        const response = await fetch(\`\${this.baseUrl}\${path}\`, {
            method: "POST",
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });
        this.assertOk(response);
        return response.json();
    }

    protected async put<T>(path: string, body: unknown): Promise<T> {
        const response = await fetch(\`\${this.baseUrl}\${path}\`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: JSON.stringify(body),
        });
        this.assertOk(response);
        return response.json();
    }

    protected async delete(path: string): Promise<void> {
        const response = await fetch(\`\${this.baseUrl}\${path}\`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        this.assertOk(response);
    }

    private getHeaders(): Record<string, string> {
        return { "Content-Type": "application/json" };
    }

    private assertOk(response: Response): void {
        if (!response.ok) {
            throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        }
    }
}`}</code></pre>

        <h2>Concrete Repository</h2>
        <pre><code>{`// repositories/user.repository.ts
import { BaseRepository } from "./base.repository";
import type { IUser } from "../models/user.model";

export class UserRepository extends BaseRepository {

    protected readonly basePath = "/users";

    public getAll(): Promise<IUser[]> {
        return this.get<IUser[]>();
    }

    public getById(id: number): Promise<IUser> {
        return this.get<IUser>(\`/\${id}\`);
    }

    public create(user: Omit<IUser, "id">): Promise<IUser> {
        return this.post<IUser>("", user);
    }

    public update(id: number, changes: Partial<IUser>): Promise<IUser> {
        return this.put<IUser>(\`/\${id}\`, changes);
    }

    public remove(id: number): Promise<void> {
        return this.delete(\`/\${id}\`);
    }
}`}</code></pre>

        <h2>Swappable Implementations</h2>
        <p>
            By coding to an abstract base, you can create alternative implementations.
            For example, a local storage repository for offline support:
        </p>

        <pre><code>{`// repositories/user-local.repository.ts
import type { IUser } from "../models/user.model";

export class UserLocalRepository {

    private readonly storageKey = "users";

    public async getAll(): Promise<IUser[]> {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    public async getById(id: number): Promise<IUser> {
        const users = await this.getAll();
        const user = users.find((u) => u.id === id);
        if (!user) throw new Error(\`User \${id} not found\`);
        return user;
    }

    public async create(user: Omit<IUser, "id">): Promise<IUser> {
        const users = await this.getAll();
        const newUser: IUser = { ...user, id: Date.now() };
        users.push(newUser);
        localStorage.setItem(this.storageKey, JSON.stringify(users));
        return newUser;
    }

    // ... update and delete similarly
}`}</code></pre>

        <h2>Design Principles</h2>
        <ul>
            <li><strong>Single data source per repository</strong> — don&apos;t mix REST and WebSocket in one repository</li>
            <li><strong>Return domain models</strong> — transform API DTOs into domain objects inside the repository</li>
            <li><strong>No business logic</strong> — repositories only fetch and persist data</li>
            <li><strong>Stateless</strong> — repositories should not hold state; use services for caching</li>
        </ul>
    </DocContent>
);
