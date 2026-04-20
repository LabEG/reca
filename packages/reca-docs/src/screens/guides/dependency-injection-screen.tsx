"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const DependencyInjectionScreen = (): JSX.Element => (
    <DocContent>
        <h1>Dependency Injection</h1>
        <p>
            ReCA has <strong>built-in Dependency Injection</strong> powered
            by <code>first-di</code> and <code>reflect-metadata</code>. Constructor parameters
            are automatically resolved by their type — no manual wiring, no providers,
            no container configuration.
        </p>

        <h2>How It Works</h2>
        <p>
            When <code>useStore(MyStore)</code> creates a store instance, ReCA reads the
            constructor parameter types via <code>reflect-metadata</code> and resolves each
            one through the DI container:
        </p>

        <pre><code>{`// 1. Repository — data access
export class UserRepository {
    public async getById(id: number): Promise<IUser> {
        const res = await fetch(\`/api/users/\${id}\`);
        return res.json();
    }
}

// 2. Service — depends on Repository
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

    public async getUser(id: number): Promise<IUser> {
        return this.userRepo.getById(id);
    }
}

// 3. Store — depends on Service
export class UserStore extends AutoStore {
    public user: IUser | null = null;

    constructor(private readonly userService: UserService) {
        super();
    }

    public async activate(): Promise<void> {
        this.user = await this.userService.getUser(1);
    }
}

// 4. Component — just uses the store
const UserProfile = () => {
    const store = useStore(UserStore);
    // DI resolves: UserStore → UserService → UserRepository
    return <div>{store.user?.name}</div>;
};`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            The entire dependency graph is resolved automatically. You never need to
            manually instantiate services or repositories.
        </Alert>

        <h2>Resolution Rules</h2>
        <p>ReCA resolves constructor parameters using these rules:</p>
        <ol>
            <li>If the parameter type is a <strong>class</strong> — resolve it from the DI container (singleton)</li>
            <li>If the parameter type is <code>Object</code> (i.e., a TypeScript interface) — inject <strong>props</strong> from the component</li>
            <li>Otherwise — inject <strong>props</strong></li>
        </ol>

        <pre><code>{`interface IProductProps {
    readonly productId: number;
}

export class ProductStore extends AutoStore<IProductProps> {

    constructor(
        private readonly productService: ProductService, // ← resolved by DI
        private readonly props: IProductProps,            // ← injected from component
    ) {
        super();
    }
}`}</code></pre>

        <h2>Singletons by Default</h2>
        <p>
            All services and repositories resolved by the DI container are <strong>singletons</strong>.
            The same instance is shared across all stores that depend on it. This is ideal
            for stateless services and repositories.
        </p>

        <pre><code>{`// Both stores get the SAME AuthService instance
class LoginStore extends AutoStore {
    constructor(private readonly auth: AuthService) { super(); }
}

class ProfileStore extends AutoStore {
    constructor(private readonly auth: AuthService) { super(); }
}`}</code></pre>

        <h2>Deep Dependency Trees</h2>
        <p>
            The DI container resolves the entire dependency tree recursively:
        </p>

        <pre><code>{`class ApiConfig { /* base URL, headers */ }

class HttpClient {
    constructor(private readonly config: ApiConfig) {}
}

class UserRepository {
    constructor(private readonly http: HttpClient) {}
}

class UserService {
    constructor(private readonly userRepo: UserRepository) {}
}

class UserStore extends AutoStore {
    constructor(private readonly userService: UserService) {
        super();
    }
}

// useStore(UserStore) resolves:
// UserStore → UserService → UserRepository → HttpClient → ApiConfig`}</code></pre>

        <h2>Custom Resolver</h2>
        <p>
            You can replace the default DI resolver with your own via <code>config.di.resolver</code>.
            This is useful for integrating with third-party DI containers like InversifyJS or TSyringe:
        </p>

        <pre><code>{`import { config } from "reca";
import { container } from "tsyringe";

// Replace ReCA's resolver with TSyringe
config.di.resolver = (constructor) => container.resolve(constructor);`}</code></pre>

        <h2>Abstract Class Tokens</h2>
        <p>
            TypeScript interfaces are erased at runtime. To program against abstractions,
            use abstract classes as injection tokens:
        </p>

        <pre><code>{`// Define the contract as an abstract class
export abstract class IAuthService {
    abstract login(user: string, pass: string): Promise<boolean>;
    abstract logout(): void;
}

// Implement it
export class AuthService extends IAuthService {
    public async login(user: string, pass: string): Promise<boolean> {
        // real implementation
    }
    public logout(): void { /* ... */ }
}

// Register the mapping (with first-di)
import { reflection } from "reca";

reflection.set(IAuthService, AuthService);

// Now any store depending on IAuthService gets AuthService
class LoginStore extends AutoStore {
    constructor(private readonly auth: IAuthService) {
        super();
    }
}`}</code></pre>

        <h2>TypeScript Requirements</h2>
        <p>DI requires these <code>tsconfig.json</code> settings:</p>
        <pre><code>{`{
    "compilerOptions": {
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}`}</code></pre>
        <p>
            And <code>reflect-metadata</code> must be imported at your application&apos;s entry point.
        </p>
    </DocContent>
);
