"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content";

export const InterfacesScreen = (): JSX.Element => (
    <DocContent>
        <h1>Programming to Interfaces</h1>
        <p>
            For maximum testability and flexibility, define interfaces for your services and
            repositories. This allows you to swap implementations at the DI container level
            without modifying consuming code.
        </p>

        <h2>Defining Interfaces</h2>
        <pre><code>{`// interfaces/auth.service.interface.ts
export interface IAuthService {
    login(username: string, password: string): Promise<boolean>;
    logout(): void;
    getToken(): string | null;
    isAuthenticated(): boolean;
}

// interfaces/user.repository.interface.ts
export interface IUserRepository {
    getById(id: number): Promise<User>;
    getAll(): Promise<User[]>;
    create(user: Omit<User, "id">): Promise<User>;
    update(id: number, changes: Partial<User>): Promise<User>;
    delete(id: number): Promise<void>;
}`}</code></pre>

        <h2>Implementing Interfaces</h2>
        <pre><code>{`// services/auth.service.ts
import type { IAuthService } from "../interfaces/auth.service.interface";

export class AuthService implements IAuthService {

    private token: string | null = null;

    public async login(username: string, password: string): Promise<boolean> {
        const response = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            this.token = (await response.json()).token;
            return true;
        }
        return false;
    }

    public logout(): void { this.token = null; }
    public getToken(): string | null { return this.token; }
    public isAuthenticated(): boolean { return this.token !== null; }
}`}</code></pre>

        <Alert severity="warning" sx={{my: 2}}>
            TypeScript interfaces are erased at runtime. To use interface-based DI, you need
            to use abstract classes or injection tokens that persist at runtime.
        </Alert>

        <h2>Abstract Class Pattern</h2>
        <p>
            Since TypeScript interfaces don&apos;t exist at runtime, use abstract classes as
            injection tokens:
        </p>

        <pre><code>{`// interfaces/auth.service.ts
export abstract class IAuthService {
    abstract login(username: string, password: string): Promise<boolean>;
    abstract logout(): void;
    abstract getToken(): string | null;
    abstract isAuthenticated(): boolean;
}

// services/auth.service.ts
export class AuthService extends IAuthService {
    // ... implementation
}

// stores/login.store.ts
import { AutoStore } from "reca";
import { IAuthService } from "../interfaces/auth.service";

export class LoginStore extends AutoStore {
    constructor(private readonly authService: IAuthService) {
        super();
    }
    // Now you can inject any class that extends IAuthService
}`}</code></pre>

        <h2>Testing with Mock Implementations</h2>
        <pre><code>{`// tests/mocks/mock-auth.service.ts
import { IAuthService } from "../../interfaces/auth.service";

export class MockAuthService extends IAuthService {
    public loginCalled = false;
    public logoutCalled = false;

    public async login(): Promise<boolean> {
        this.loginCalled = true;
        return true;
    }

    public logout(): void {
        this.logoutCalled = true;
    }

    public getToken(): string | null {
        return "mock-token";
    }

    public isAuthenticated(): boolean {
        return true;
    }
}`}</code></pre>

        <h2>When to Use Interfaces</h2>
        <ul>
            <li><strong>API boundaries</strong> — when the data source might change (REST ↔ GraphQL ↔ local storage)</li>
            <li><strong>Third-party wrappers</strong> — wrap external SDKs behind an interface so you can swap or mock them</li>
            <li><strong>Testing</strong> — when you need to inject mock implementations for unit testing</li>
            <li><strong>Multi-environment</strong> — different implementations for browser, server, and mobile</li>
        </ul>
    </DocContent>
);
