"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const ReferencesScreen = (): JSX.Element => (
    <DocContent>
        <h1>References</h1>
        <p>
            The architecture patterns used in ReCA are grounded in well-established software
            engineering literature. Below are key references for further study.
        </p>

        <h2>Books</h2>
        <ul>
            <li>
                Martin, R. C. (2017). <em>Clean Architecture: A Craftsman&apos;s Guide to Software
                Structure and Design</em>. Prentice Hall.
                <br />The foundational text on layered architecture and the Dependency Rule.
            </li>
            <li>
                Martin, R. C. (2008). <em>Clean Code: A Handbook of Agile Software Craftsmanship</em>.
                Prentice Hall.
                <br />Principles for writing maintainable, readable code.
            </li>
            <li>
                Gamma, E., Helm, R., Johnson, R., &amp; Vlissides, J. (1994). <em>Design Patterns:
                Elements of Reusable Object-Oriented Software</em>. Addison-Wesley.
                <br />The classic &quot;Gang of Four&quot; reference on design patterns including
                Repository, Observer, and Strategy.
            </li>
            <li>
                Fowler, M. (2002). <em>Patterns of Enterprise Application Architecture</em>.
                Addison-Wesley.
                <br />Defines the Repository, Service Layer, and Unit of Work patterns.
            </li>
            <li>
                Evans, E. (2003). <em>Domain-Driven Design: Tackling Complexity in the Heart of
                Software</em>. Addison-Wesley.
                <br />Introduces Bounded Contexts, Aggregates, and the layered architecture approach.
            </li>
            <li>
                Newman, S. (2015). <em>Building Microservices: Designing Fine-Grained Systems</em>.
                O&apos;Reilly Media.
                <br />Principles of service isolation and independent deployability — applied
                at the component level by ReCA&apos;s microstore pattern.
            </li>
        </ul>

        <h2>Key Excerpts</h2>

        <blockquote>
            <p>
                &quot;The only way to go fast, is to go well.&quot;
                <br /><em>— Robert C. Martin, Clean Architecture (2017)</em>
            </p>
        </blockquote>

        <blockquote>
            <p>
                &quot;A Service Layer defines an application&apos;s boundary with a layer of
                services that establishes a set of available operations and coordinates
                the application&apos;s response in each operation.&quot;
                <br /><em>— Martin Fowler, Patterns of Enterprise Application Architecture (2002), Chapter 9</em>
            </p>
        </blockquote>

        <blockquote>
            <p>
                &quot;A Repository mediates between the domain and data mapping layers using
                a collection-like interface for accessing domain objects.&quot;
                <br /><em>— Martin Fowler, Patterns of Enterprise Application Architecture (2002), Chapter 10</em>
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

        <blockquote>
            <p>
                &quot;For each type of object that needs global access, create an object that
                can provide the illusion of an in-memory collection of all objects of that
                type.&quot;
                <br /><em>— Eric Evans, Domain-Driven Design (2003), Chapter 6</em>
            </p>
        </blockquote>

        <h2>Store and Controller: An Evolution</h2>
        <p>
            The MVC (Model–View–Controller) pattern, formalized by Trygve Reenskaug in 1979 and
            popularized by the GoF book, defines a Controller as the component that &quot;receives
            input and initiates a response by making calls on model objects.&quot;
        </p>
        <p>
            ReCA&apos;s Store is a direct descendant of this idea. Like a Controller, the Store:
        </p>
        <ul>
            <li>Receives user input from the view (component)</li>
            <li>Decides what to do with it (orchestration)</li>
            <li>Delegates to the model (services &amp; repositories)</li>
            <li>Updates state so the view reflects the change</li>
        </ul>
        <p>
            The difference is in the binding mechanism: MVC Controllers explicitly push updates
            to Views, while ReCA Stores use reactive proxies — the view automatically reflects
            state changes without imperative wiring.
        </p>
        <blockquote>
            <p>
                &quot;The Controller&apos;s job is to take the user&apos;s input and figure out what to
                do with it.&quot;
                <br /><em>— Robert C. Martin, Clean Architecture (2017), Chapter 22</em>
            </p>
        </blockquote>

        <h2>Academic Papers</h2>
        <ul>
            <li>
                Cockburn, A. (2005). &quot;Hexagonal Architecture&quot; (Ports and Adapters).
                <br />An alternative formulation of Clean Architecture focusing on ports (interfaces)
                and adapters (implementations).
            </li>
            <li>
                Palermo, J. (2008). &quot;The Onion Architecture.&quot;
                <br />A precursor to Clean Architecture that emphasizes dependency inversion with
                concentric layers.
            </li>
        </ul>

        <h2>Design Principles</h2>
        <table>
            <thead>
                <tr>
                    <th>Principle</th>
                    <th>Description</th>
                    <th>ReCA Application</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Single Responsibility (SRP)</td>
                    <td>A class should have one reason to change</td>
                    <td>Each layer has a distinct responsibility</td>
                </tr>
                <tr>
                    <td>Open/Closed (OCP)</td>
                    <td>Open for extension, closed for modification</td>
                    <td>New features via new stores/services, not modifying existing ones</td>
                </tr>
                <tr>
                    <td>Dependency Inversion (DIP)</td>
                    <td>Depend on abstractions, not concretions</td>
                    <td>Constructor injection with abstract class tokens</td>
                </tr>
                <tr>
                    <td>Interface Segregation (ISP)</td>
                    <td>No client should be forced to depend on unused methods</td>
                    <td>Small, focused service and repository interfaces</td>
                </tr>
                <tr>
                    <td>Liskov Substitution (LSP)</td>
                    <td>Subtypes must be substitutable for base types</td>
                    <td>Mock implementations in testing follow the same contracts</td>
                </tr>
            </tbody>
        </table>

        <h2>Related Projects</h2>
        <ul>
            <li><strong>InversifyJS</strong> — a standalone DI container for TypeScript</li>
            <li><strong>TSyringe</strong> — a lightweight DI container by Microsoft</li>
            <li><strong>MobX</strong> — reactive state management with observable patterns</li>
            <li><strong>Zustand</strong> — minimal state management for React</li>
        </ul>
    </DocContent>
);
