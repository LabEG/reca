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
        </ul>

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
