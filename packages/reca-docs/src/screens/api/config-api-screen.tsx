"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const ConfigApiScreen = (): JSX.Element => (
    <DocContent>
        <h1>Configuration API</h1>
        <p>
            ReCA exposes a <code>config</code> object that controls DI resolution
            and environment detection. Import it from <code>reca</code> and modify
            before your application starts.
        </p>

        <h2>config</h2>
        <pre><code>{`import { config } from "reca";

// Shape:
interface IConfig {
    di: IDiConfig;
    isBrowser: boolean;
}

interface IDiConfig {
    resolver: <T>(constructor: new (...args: any[]) => T) => T;
}`}</code></pre>

        <h2>config.isBrowser</h2>
        <p>
            A boolean flag that determines whether the code runs in a browser.
            ReCA sets this automatically using <code>typeof window !== &quot;undefined&quot;</code>.
        </p>
        <p>
            <code>useStore</code> uses this flag to decide between <code>useClientStore</code>
            and <code>useServerStore</code>.
        </p>

        <pre><code>{`import { config } from "reca";

// Override for testing
config.isBrowser = true;`}</code></pre>

        <h2>config.di.resolver</h2>
        <p>
            The function used to resolve constructor dependencies. By default, ReCA
            uses <code>first-di</code>&apos;s resolver. Override it to integrate with
            other DI containers.
        </p>

        <h3>Default Behavior</h3>
        <pre><code>{`// Default: first-di resolves classes as singletons
import { config } from "reca";

// config.di.resolver is already set to first-di's resolve()`}</code></pre>

        <h3>Custom Resolver: TSyringe</h3>
        <pre><code>{`import { config } from "reca";
import { container } from "tsyringe";

config.di.resolver = (constructor) => container.resolve(constructor);`}</code></pre>

        <h3>Custom Resolver: InversifyJS</h3>
        <pre><code>{`import { config } from "reca";
import { myContainer } from "./inversify.config";

config.di.resolver = (constructor) => myContainer.get(constructor);`}</code></pre>

        <h3>Custom Resolver: Manual Factory</h3>
        <pre><code>{`import { config } from "reca";

const instances = new Map<Function, object>();

config.di.resolver = (constructor) => {
    if (!instances.has(constructor)) {
        instances.set(constructor, new constructor());
    }
    return instances.get(constructor);
};`}</code></pre>

        <h2>reflection</h2>
        <p>
            ReCA re-exports the <code>reflection</code> utility from <code>first-di</code>.
            Use it to register abstract class → concrete class mappings for DI:
        </p>

        <pre><code>{`import { reflection } from "reca";

// When a store depends on IAuthService, resolve AuthService
reflection.set(IAuthService, AuthService);`}</code></pre>

        <h2>Configuration Timing</h2>
        <p>
            Set configuration <strong>before</strong> any component renders — typically
            in your application entry point:
        </p>
        <pre><code>{`// app/providers.tsx or index.tsx
import "reflect-metadata";
import { config, reflection } from "reca";

// Configure DI
reflection.set(IAuthService, AuthService);
reflection.set(IApiService, ApiService);

// Optional: custom resolver
// config.di.resolver = (ctor) => myContainer.resolve(ctor);

export const Providers = ({ children }) => {
    return <>{children}</>;
};`}</code></pre>
    </DocContent>
);
