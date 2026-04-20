"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const ArchitectureOverviewScreen = (): JSX.Element => (
    <DocContent>
        <h1>Architecture Overview</h1>
        <p>
            ReCA is designed around the principles of <strong>Clean Architecture</strong> as
            described by Robert C. Martin. The core idea is <em>separation of concerns</em> —
            each layer of your application has a single responsibility and communicates with
            adjacent layers through well-defined boundaries.
        </p>

        <h2>Layer Diagram</h2>
        <p>
            The following diagram shows how the four layers relate to each other. Dependencies
            flow downward: components depend on stores, stores depend on services, and services
            depend on repositories.
        </p>

        <img
            src="/images/architecture-layers.svg"
            alt="ReCA Architecture Layers: Component → Store → Service → Repository"
            style={{width: "100%", maxWidth: 600, display: "block", margin: "24px auto"}}
        />

        <h2>The Four Layers</h2>

        <h3>1. Component Layer (View)</h3>
        <p>
            React components are purely presentational. They consume state from the store via
            the <code>useStore</code> hook and render UI. Components should contain no business
            logic — only layout, styling, and event binding.
        </p>

        <h3>2. Store Layer (Presentation Logic)</h3>
        <p>
            Stores manage UI state and orchestrate user interactions. Each component has its own
            store instance (the &quot;microstore&quot; pattern). Stores delegate business logic to
            services and translate the results into UI state updates.
        </p>

        <h3>3. Service Layer (Business Logic)</h3>
        <p>
            Services contain application-specific business rules. They are framework-independent
            and can be reused across different UI frameworks. Services coordinate between multiple
            repositories and apply business validation.
        </p>

        <h3>4. Repository Layer (Data Access)</h3>
        <p>
            Repositories encapsulate all communication with external data sources — REST APIs,
            GraphQL endpoints, local storage, databases. By abstracting data access, you can
            swap implementations without affecting upper layers.
        </p>

        <h2>Request Lifecycle</h2>
        <p>
            When a user interacts with the UI, the request flows through all layers and back:
        </p>

        <img
            src="/images/request-lifecycle.svg"
            alt="Request lifecycle flowing from User through Component, Store, Service, Repository to Server and back"
            style={{width: "100%", maxWidth: 700, display: "block", margin: "24px auto"}}
        />

        <ol>
            <li>User triggers an event (click, input, form submit)</li>
            <li>Component calls a store method directly</li>
            <li>Store delegates to a service for business logic</li>
            <li>Service calls a repository for data access</li>
            <li>Repository communicates with the external data source</li>
            <li>Response propagates back: Repository → Service → Store</li>
            <li>Store updates its state, triggering a component re-render</li>
        </ol>

        <h2>Dependency Rule</h2>
        <blockquote>
            <p>
                &quot;Source code dependencies must point only inward.&quot; — Robert C. Martin
            </p>
        </blockquote>
        <p>
            Inner layers (Repository, Service) must not depend on outer layers (Store, Component).
            This is achieved through Dependency Injection: stores declare service dependencies in
            their constructor, and ReCA&apos;s DI container resolves them automatically.
        </p>

        <h2>Store Flow Comparison</h2>
        <p>
            ReCA provides two store types — <code>AutoStore</code> and <code>Store</code>. The
            diagram below shows the difference in how they trigger re-renders:
        </p>

        <img
            src="/images/store-flow.svg"
            alt="AutoStore (automatic proxy-based) vs Store (manual emitChange) flow comparison"
            style={{width: "100%", maxWidth: 700, display: "block", margin: "24px auto"}}
        />

        <h2>Store as a Modern Controller</h2>
        <p>
            If you have a background in MVC (Model–View–Controller), the Store concept will
            feel familiar. In classic MVC, the <strong>Controller</strong> receives user input,
            coordinates with the Model, and updates the View. ReCA&apos;s Store plays exactly
            the same role:
        </p>
        <table>
            <thead>
                <tr>
                    <th>MVC</th>
                    <th>ReCA</th>
                    <th>Responsibility</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>View</td><td>Component</td><td>Renders UI, captures events</td></tr>
                <tr><td>Controller</td><td>Store</td><td>Handles input, orchestrates logic, updates state</td></tr>
                <tr><td>Model</td><td>Service + Repository</td><td>Business rules and data access</td></tr>
            </tbody>
        </table>
        <p>
            The Store inherits the Controller ideology but adapts it for the reactive
            world: instead of imperatively updating the view, the store mutates state and the
            view automatically re-renders.
        </p>

        <blockquote>
            <p>
                &quot;The Controller&apos;s job is to take the user&apos;s input and figure out what to
                do with it.&quot;
                <br /><em>— Robert C. Martin, Clean Architecture (2017), Chapter 22</em>
            </p>
        </blockquote>

        <h2>From the Literature</h2>
        <blockquote>
            <p>
                &quot;Good architecture makes the system easy to understand, easy to develop,
                easy to maintain, and easy to deploy. The ultimate goal is to minimize the
                lifetime cost of the system and to maximize programmer productivity.&quot;
                <br /><em>— Robert C. Martin, Clean Architecture (2017), Chapter 15</em>
            </p>
        </blockquote>

        <blockquote>
            <p>
                &quot;The center of your application is not the database. It is not one or more
                of the frameworks you may be using. The center of your application is the
                use cases of your application.&quot;
                <br /><em>— Robert C. Martin, Clean Architecture (2017), Chapter 20</em>
            </p>
        </blockquote>
    </DocContent>
);
