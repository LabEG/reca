"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content";

export const ServicesScreen = (): JSX.Element => (
    <DocContent>
        <h1>Services</h1>
        <p>
            In Clean Architecture, a <strong>Service</strong> encapsulates business logic that is
            independent of the UI framework. ReCA supports Dependency Injection out of the box,
            allowing you to inject services into your stores.
        </p>

        <h2>Creating a Service</h2>
        <p>
            A service is a plain TypeScript class. It does not extend any ReCA base class —
            it is a POJO (plain old JavaScript object):
        </p>

        <pre><code>{`// services/auth.service.ts
export class AuthService {

    private token: string | null = null;

    public async login(username: string, password: string): Promise<boolean> {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            this.token = data.token;
            return true;
        }

        return false;
    }

    public logout(): void {
        this.token = null;
    }

    public getToken(): string | null {
        return this.token;
    }

    public isAuthenticated(): boolean {
        return this.token !== null;
    }
}`}</code></pre>

        <h2>Injecting a Service into a Store</h2>
        <p>
            Use constructor injection. ReCA&apos;s built-in DI container automatically resolves
            constructor parameters by their type:
        </p>

        <pre><code>{`// stores/login.store.ts
import { AutoStore } from "reca";
import { AuthService } from "../services/auth.service";

export class LoginStore extends AutoStore {

    public username: string = "";
    public password: string = "";
    public error: string | null = null;
    public isLoading: boolean = false;

    constructor(private readonly authService: AuthService) {
        super();
    }

    public async handleLogin(): Promise<void> {
        this.isLoading = true;
        this.error = null;

        const success = await this.authService.login(
            this.username,
            this.password
        );

        if (!success) {
            this.error = "Invalid credentials";
        }

        this.isLoading = false;
    }
}`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            ReCA resolves dependencies using <code>reflect-metadata</code>. Make sure
            <code>emitDecoratorMetadata</code> and <code>experimentalDecorators</code> are
            enabled in your <code>tsconfig.json</code>.
        </Alert>

        <h2>Service Composition</h2>
        <p>
            Services can depend on other services. The DI container resolves the full dependency
            graph automatically:
        </p>

        <pre><code>{`// services/user.service.ts
export class UserService {

    constructor(private readonly authService: AuthService) {}

    public async fetchCurrentUser(): Promise<User | null> {
        const token = this.authService.getToken();
        if (!token) return null;

        const response = await fetch("/api/user/me", {
            headers: { Authorization: \`Bearer \${token}\` }
        });

        return response.json();
    }
}`}</code></pre>

        <h2>Benefits</h2>
        <ul>
            <li><strong>Testability</strong> — services can be mocked independently of stores</li>
            <li><strong>Reusability</strong> — the same service can be injected into multiple stores</li>
            <li><strong>Separation of Concerns</strong> — stores handle UI state, services handle business logic</li>
            <li><strong>Framework Independence</strong> — services contain no React code and can be reused across frameworks</li>
        </ul>
    </DocContent>
);
