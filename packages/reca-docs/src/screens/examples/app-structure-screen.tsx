"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const AppStructureScreen = (): JSX.Element => (
    <DocContent>
        <h1>Application Structure</h1>
        <p>
            A well-structured ReCA application follows a <strong>layered architecture</strong>{" "}
            inspired by Clean Architecture and Feature-Sliced Design. The goal is simple:
            business logic lives in <code>src/</code>, completely independent of the framework.
            Next.js (or any other framework) is used only for routing.
        </p>

        <h2>Top-Level Layout</h2>
        <pre><code>{`my-app/
├── app/          ← Next.js routing only (no business logic here)
├── src/          ← all application code (framework-agnostic)
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── hooks/
│   ├── helpers/
│   ├── utils/
│   ├── validations/
│   ├── localization/
│   ├── styles/
│   └── icons/
├── public/
├── tests/
└── package.json`}</code></pre>

        <h2>app/ — Routing Only</h2>
        <p>
            The <code>app/</code> directory belongs entirely to Next.js App Router. Every file
            here is a thin routing shell: it imports a page component from <code>src/pages/</code>
            and renders it inside the layout. <strong>No business logic, no stores, no
            services here.</strong>
        </p>
        <pre><code>{`// app/products/page.tsx  ← just a route entry point
"use client";

import type { JSX } from "react";
import { Shell } from "../../src/components/shell/Shell";
import { Layout } from "../../src/components/layout/Layout";
import { ProductListPage } from "../../src/screens/product/list/ProductListPage";

const ProductsPage = (): JSX.Element => (
    <main>
        <Shell>
            <Layout>
                <ProductListPage />
            </Layout>
        </Shell>
    </main>
);

export default ProductsPage;`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            Because all real code lives in <code>src/</code>, migrating from Next.js to Remix,
            Vite, or any other framework means changing only the <code>app/</code> folder.
            Everything in <code>src/</code> stays untouched.
        </Alert>

        <h2>src/ — All Application Code</h2>
        <p>
            The <code>src/</code> folder is structured by <strong>concern</strong>, not by feature.
            Each sub-folder has a single, well-defined responsibility.
        </p>

        <h3>pages/ (or screens/)</h3>
        <p>
            Full-screen page components. Each page corresponds to a route and composes
            multiple smaller components. Pages own their own store, styles, and tests —
            exactly like regular components (see <strong>components/</strong> below).
        </p>
        <Alert severity="warning" sx={{my: 2}}>
            In Next.js the name <code>pages/</code> is reserved for the Pages Router.
            If you use the App Router, name this folder <code>screens/</code> to avoid
            conflicts — the purpose and structure are identical.
        </Alert>
        <pre><code>{`src/screens/
├── product/
│   ├── list/
│   │   ├── ProductListPage.tsx
│   │   ├── ProductListPage.store.ts
│   │   ├── ProductListPage.styles.ts
│   │   ├── ProductListPage.unit.spec.ts
│   │   └── components/       ← page-local sub-components
│   └── card/
│       └── ...
└── order/
    └── list/
        └── ...`}</code></pre>

        <h3>components/</h3>
        <p>
            Reusable UI components shared across multiple pages. Every component is a
            <strong> self-contained folder</strong> with five files:
        </p>
        <pre><code>{`src/components/header/
├── Header.tsx             ← React component (view only)
├── Header.store.ts        ← ReCA store with all state and logic
├── Header.styles.tsx      ← styled-components / CSS-in-JS styles
├── Header.spec.ts         ← unit tests (Jest / Mocha)
└── Header.md              ← component documentation`}</code></pre>
        <p>
            This co-location rule means you always know exactly where to look. Renaming or
            deleting a component is safe — all its moving parts are in one place.
        </p>
        <pre><code>{`// Header.tsx — thin view, delegates everything to the store
import { useStore } from "reca";
import { HeaderStore } from "./Header.store";
import { HeaderRoot } from "./Header.styles";

export const Header = () => {
    const store = useStore(HeaderStore);

    return (
        <HeaderRoot>
            <span>{store.userName}</span>
            <button onClick={() => store.signOut()}>Sign out</button>
        </HeaderRoot>
    );
};`}</code></pre>

        <h3>services/</h3>
        <p>
            Services contain business logic. They are split into <strong>four sub-folders</strong>
            that mirror the classic Clean Architecture layers:
        </p>
        <pre><code>{`src/services/
├── domain-services/    ← pure business rules, no side-effects
├── app-services/       ← orchestration: coordinate domain services + repositories
├── infr-services/      ← infrastructure: analytics, logging, monitoring
└── view-services/      ← UI-level services: toasts, modals, navigation`}</code></pre>
        <ul>
            <li>
                <strong>domain-services/</strong> — encapsulate core business rules.
                They know nothing about HTTP, the DOM, or React. Example:{" "}
                <code>PricingService</code> calculates discounts based on customer tier.
            </li>
            <li>
                <strong>app-services/</strong> — application use-cases. They orchestrate
                domain services and repositories to fulfil a user action. Example:{" "}
                <code>OrderService</code> fetches orders, applies filters, and formats
                them for display.
            </li>
            <li>
                <strong>infr-services/</strong> — infrastructure concerns: error tracking,
                analytics events, OpenTelemetry spans. They are injected like any other
                service but wrap third-party SDKs.
            </li>
            <li>
                <strong>view-services/</strong> — services that talk to the UI layer:{" "}
                <code>ToastService</code> shows notifications,{" "}
                <code>NotificationService</code> manages the notification centre.
                They are singletons injected into stores that need to trigger UI feedback.
            </li>
        </ul>

        <Alert severity="info" sx={{my: 2}}>
            The dependency rule flows in one direction:{" "}
            <code>view-services</code> → <code>app-services</code> → <code>domain-services</code>.
            Infrastructure services can be injected at any layer. Repositories are only
            called from <code>app-services</code>.
        </Alert>

        <h3>repositories/</h3>
        <p>
            Data-access layer. Each repository is responsible for one API resource and
            wraps all HTTP calls for that resource. Stores and services never call{" "}
            <code>fetch</code> directly — they always go through a repository.
        </p>
        <pre><code>{`src/repositories/
├── ProductRepository.ts     ← GET /products, POST /products, etc.
├── OrderRepository.ts
├── UserRepository.ts
└── base/
    └── BaseRepository.ts    ← shared fetch logic, auth headers, error handling`}</code></pre>

        <h3>models/</h3>
        <p>
            TypeScript interfaces and types that describe the domain data. Models are plain
            data shapes — no logic, no dependencies:
        </p>
        <pre><code>{`src/models/
├── Product.ts        ← interface IProduct { id: string; title: string; ... }
├── Order.ts
└── User.ts`}</code></pre>

        <h3>hooks/</h3>
        <p>
            Custom React hooks that encapsulate UI logic which doesn&apos;t belong to a store.
            Typical examples: <code>useDebounce</code>, <code>useMediaQuery</code>,{" "}
            <code>useOutsideClick</code>.
        </p>

        <h3>helpers/</h3>
        <p>
            Domain-aware pure functions with no side-effects: format a price, build a
            breadcrumb path, map an API response to a view model. Helpers know about your
            domain but have no external dependencies.
        </p>

        <h3>utils/</h3>
        <p>
            Generic utilities with no domain knowledge: deep clone, chunk an array,
            debounce a function. These could be extracted into a separate package without
            any changes.
        </p>

        <h3>validations/</h3>
        <p>
            Form validation schemas (Zod, Yup, or hand-written). Kept here so they can
            be reused across pages and tested in isolation.
        </p>

        <h3>localization/</h3>
        <p>
            Translation files and the i18n configuration. Components import keys, never
            raw strings.
        </p>

        <h3>styles/</h3>
        <p>
            Global CSS variables, theme tokens, and shared styled-components. Import
            from here instead of duplicating values across component files.
        </p>

        <h3>icons/</h3>
        <p>
            SVG icon components. Centralising them here avoids scattered inline SVGs and
            makes it easy to swap the icon set.
        </p>

        <h2>Why Framework Independence Matters</h2>
        <p>
            Because <code>app/</code> is only routing glue, the entire <code>src/</code>{" "}
            folder can be moved to a different framework without touching a single store
            or service. For example, switching from Next.js App Router to Pages Router
            means rewriting only the files in <code>app/</code>:
        </p>
        <pre><code>{`// Before: app/products/page.tsx (App Router)
import { ProductListPage } from "../../src/screens/product/list/ProductListPage";
export default function Page() { return <ProductListPage />; }

// After: pages/products.tsx (Pages Router)
import { ProductListPage } from "../src/screens/product/list/ProductListPage";
export default function Page() { return <ProductListPage />; }

// src/ is completely unchanged`}</code></pre>

        <h2>Summary</h2>
        <ul>
            <li><code>app/</code> — Next.js routing only; thin wrappers that delegate to <code>src/</code></li>
            <li><code>src/screens/</code> — full-screen page components with co-located store, styles, and tests (use <code>screens/</code> instead of <code>pages/</code> to avoid the Next.js naming conflict)</li>
            <li><code>src/components/</code> — reusable components; each is a self-contained folder with view, store, styles, tests, and docs</li>
            <li><code>src/services/</code> — business logic in four layers: domain, app, infrastructure, view</li>
            <li><code>src/repositories/</code> — all HTTP/data-access code; never called directly from components</li>
            <li><code>src/models/</code> — pure TypeScript interfaces; no logic</li>
            <li><code>src/hooks/</code>, <code>helpers/</code>, <code>utils/</code>, <code>validations/</code>, <code>localization/</code> — supporting utilities, each with a clear scope</li>
        </ul>
    </DocContent>
);
