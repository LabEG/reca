# ReCA - React Clean Architecture state manager

[![npm version](https://img.shields.io/npm/v/reca.svg?style=flat)](https://www.npmjs.com/package/reca)
[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/LabEG/reca/blob/main/LICENSE)
![npm downloads](https://img.shields.io/npm/dm/reca.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/e9e573d8408945168d14d83c81a103e6)](https://www.codacy.com/gh/LabEG/reca/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=LabEG/reca&amp;utm_campaign=Badge_Grade)
![build status](https://github.com/LabEG/reca/workflows/Test%20Pull%20Request/badge.svg)
[![CodeQL](https://github.com/LabEG/reca/workflows/CodeQL%20Advanced/badge.svg)](https://github.com/LabEG/reca/security/code-scanning)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

Created at the intersection of Functional style and OOP technologies. It is based on the simplicity of the functional style of the view, enriched with OOP technologies for writing business logic. Perfect for beginner developers and complex enterprise applications

## Table of Contents

- [ReCA - React Clean Architecture state manager](#reca---react-clean-architecture-state-manager)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Why not Redux or Flux?](#why-not-redux-or-flux)
  - [Comparison with Other Libraries](#comparison-with-other-libraries)
    - [Why Choose ReCA?](#why-choose-reca)
  - [Installation](#installation)
    - [Using npm](#using-npm)
    - [Using yarn](#using-yarn)
    - [Using pnpm](#using-pnpm)
    - [Setup](#setup)
  - [Examples](#examples)
    - [Quick Start - Counter Example](#quick-start---counter-example)
    - [ToDo Example](#todo-example)
    - [Example low-level Store](#example-low-level-store)
    - [Advanced Example - Dependency Injection for Enterprise Applications](#advanced-example---dependency-injection-for-enterprise-applications)
  - [Documentation and Resources](#documentation-and-resources)
    - [📚 Documentation](#-documentation)
    - [💬 Community and Support](#-community-and-support)
    - [🤝 Contributing](#-contributing)
  - [License](#license)

## Features

- **Microstores** - calculations state of components don't affect to other components, small CPU usage for update states,
- **Direct Functions Call** - don't need heavy CPU utilization for search function in reducer, just call the function directly,
- **No Boilerplate** - write only business code without those debt,
- **Dependency Injection** - override any part of your application for unit test or other customer,
- **Microfrontend** - perfect support microfrontends out the box without any boilerplates,
- **Simple Data Flow** - don't need search functions call chain for debug your reducers,
- **Code Organization** - structures the code easily even for large enterprise applications,
- **Extra Small Size** - only 1kb of minified code.

## Why not Redux or Flux?

- **Monostore** - as the application grows, the cost of maintaining a monostore greatly exceeds the useful work.
- **Reducers** - a large number of reducers makes you spend a lot of time searching for the necessary function.
- **Architecture problem** - forces you to use tons of additional packages to solve problems, such as saga, thunk, toolkit and many others.

## Comparison with Other Libraries

| Feature | ReCA | Redux | MobX | Zustand |
|---------|------|-------|------|----------|
| **Bundle Size** | ~1KB | ~8KB | ~16KB | ~1KB |
| **Boilerplate** | Minimal | Heavy | Medium | Minimal |
| **Learning Curve** | Easy | Steep | Medium | Easy |
| **TypeScript** | Built-in | Good | Good | Good |
| **Performance** | Excellent | Good | Excellent | Excellent |
| **Dependency Injection** | ✅ Built-in | ❌ Manual | ❌ Manual | ❌ Manual |
| **Clean Architecture** | ✅ Native | ⚠️ Requires setup | ⚠️ Requires setup | ❌ Limited |
| **Microstores** | ✅ Yes | ❌ Monostore | ✅ Yes | ✅ Yes |
| **SSR Support** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Middleware** | Via DI | ✅ Yes | ❌ Limited | ✅ Yes |
| **Async Actions** | ✅ Native | ⚠️ Requires thunk/saga | ✅ Native | ✅ Native |

### Why Choose ReCA?

- **Smallest footprint** - Only 1KB minified, same as Zustand but with more features
- **Zero boilerplate** - No actions, reducers, or dispatchers needed
- **Enterprise-ready** - Built-in DI and Clean Architecture support
- **Developer-friendly** - Simple API, easy to learn and use
- **Flexible** - Choose between AutoStore (automatic) or Store (manual control)
- **Type-safe** - Full TypeScript support out of the box

## Installation

### Using npm

```bash
npm install reca reflect-metadata
```

### Using yarn

```bash
yarn add reca reflect-metadata
```

### Using pnpm

```bash
pnpm add reca reflect-metadata
```

### Setup

After installation, import `reflect-metadata` at the entry point of your application (e.g., `index.tsx` or `main.tsx`):

```typescript
import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
```

> **Note:** The `reflect-metadata` package is required for dependency injection functionality. Make sure to import it before any other imports in your application entry point.

## Examples

### Quick Start - Counter Example

A simple example to get you started with ReCA:

```typescript
// counter.store.ts
import { AutoStore } from "reca";

export class CounterStore extends AutoStore {
    public count: number = 0;

    public increment(): void {
        this.count++;
    }

    public decrement(): void {
        this.count--;
    }
}

// Counter.tsx
import { useStore } from "reca";
import { CounterStore } from "./stores/counter.store";

export const Counter = () => {
    const store = useStore(CounterStore);

    return (
        <div>
            <h1>Count: {store.count}</h1>
            <button onClick={store.increment}>+1</button>
            <button onClick={store.decrement}>-1</button>
        </div>
    );
};
```

### ToDo Example

Create your Store by inheriting from AutoStore, and use it in a component via useStore hook.

``` typescript
// todo.store.ts
import {AutoStore} from "reca";
import type {FormEvent} from "react";

export class ToDoStore extends AutoStore {

    public currentTodo: string = "";

    public todos: string[] = [];

    public handleAddTodo (): void {
        this.todos.push(this.currentTodo);
    }

    public handleDeleteTodo (index: number): void {
        this.todos.splice(index, 1);
    }

    public handleCurrentEdit (event: FormEvent<HTMLInputElement>): void {
        this.currentTodo = event.currentTarget.value;
    }

}


// todo.component.ts
import {useStore} from "reca";
import {ToDoStore} from "../stores/todo.store";

export const ToDoComponent = (): JSX.Element => {
    const store = useStore(ToDoStore);

    return (
        <div className="todos">
            <div className="todos-list">
                {
                    store.todos.map((todo, index) => (
                        <div className="todo">
                            {todo}

                            <button
                                className="todo-delete"
                                onClick={() => store.handleDeleteTodo(index)}
                                type="button"
                            >
                                X
                            </button>
                        </div>
                    ))
                }
            </div>

            <div className="todos-input">
                <input
                    onInput={store.handleCurrentEdit}
                    value={store.currentTodo}
                />

                <button
                    onClick={store.handleAddTodo}
                    type="button"
                >
                    add
                </button>
            </div>
        </div>
    );
};
```

### Example low-level Store

Also, if you need uncompromising performance, you can use the low-level Store. But you will need to start redrawing manually using the `this.redraw()` method. Also you must pass arrow function to all used HTMLElement events, such as onClick.

``` typescript
// todo.store.ts
import {Store} from "reca";
import type {FormEvent} from "react";

export class ToDoStore extends Store {

    public currentTodo: string = "";

    public todos: string[] = [];

    public handleAddTodo (): void {
        this.todos.push(this.currentTodo);
        this.redraw();
    }

    public handleDeleteTodo (index: number): void {
        this.todos.splice(index, 1);
        this.redraw();
    }

    public handleCurrentEdit (event: FormEvent<HTMLInputElement>): void {
        this.currentTodo = event.currentTarget.value;
        this.redraw();
    }
}


// todo.component.ts
import {useStore} from "reca";
import {ToDoStore} from "../stores/todo.store";

export const ToDoComponent = (): JSX.Element => {
    const store = useStore(ToDoStore);

    return (
        <div className="todos">
            ...

            <div className="todos-input">
                <input
                    onInput={() => store.handleCurrentEdit()}
                    value={store.currentTodo}
                />

                <button
                    onClick={() => store.handleAddTodo()}
                    type="button"
                >
                    add
                </button>
            </div>
        </div>
    );
};
```

### Advanced Example - Dependency Injection for Enterprise Applications

This example demonstrates how to build scalable enterprise applications using ReCA with Dependency Injection. It shows the simplicity of business logic organization following Clean Architecture principles.

The example includes:

- **Service Layer** - encapsulates business logic and external API calls
- **Model Layer** - defines data structures
- **Store Layer** - manages state and coordinates services
- **Component Layer** - pure view logic

This architecture makes your code:

- **Testable** - easily mock services for unit tests
- **Maintainable** - clear separation of concerns
- **Scalable** - add new features without modifying existing code
- **Flexible** - swap implementations through DI (e.g., Repository, Provider, Logger)

```typescript
// SpaceXCompanyInfo.ts
export class SpaceXCompanyInfo {

    public name: string = "";

    public founder: string = "";

    public employees: number = 0;

    public applyData (json: object): this {
        Object.assign(this, json);
        return this;
    }

}


// SpaceXService.ts
import {reflection} from "first-di";
import {SpaceXCompanyInfo} from "../models/SpaceXCompanyInfo";

@reflection
export class SpaceXService {

    public async getCompanyInfo (): Promise<SpaceXCompanyInfo> {
        const response = await fetch("https://api.spacexdata.com/v3/info");
        const json: unknown = await response.json();

        // ... and manies manies lines of logics

        if (typeof json === "object" && json !== null) {
            return new SpaceXCompanyInfo().applyData(json);
        }
        throw new Error("SpaceXService.getCompanyInfo: response object is not json");
    }

}


// SpaceXStore.ts
import {reflection} from "first-di";
import {AutoStore} from "reca";
import {SpaceXCompanyInfo} from "../models/SpaceXCompanyInfo.js";
import {SpaceXService} from "../services/SpaceXService.js";

@reflection
export class SpaceXStore extends AutoStore {

    public companyInfo: SpaceXCompanyInfo = new SpaceXCompanyInfo();

    public constructor (
        private readonly spaceXService: SpaceXService,
        // private readonly logger: Logger
    ) {
        super();
    }

    public activate (): void {
        this.fetchCompanyInfo();
    }

    private async fetchCompanyInfo (): Promise<void> {
        try {
            this.companyInfo = await this.spaceXService.getCompanyInfo();
        } catch (error) {
            // Process exceptions, ex: this.logger.error(error.message);
        }
    }

}


// SpaceXComponent.tsx
import {useStore} from "reca";
import {SpaceXStore} from "../stores/SpaceXStore.js";

export const TestStoreComponent = (): JSX.Element => {
    const store = useStore(SpaceXStore);

    return (
        <div>
            <p>
                Company:
                {" "}

                {store.companyInfo.name}
            </p>

            <p>
                Founder:
                {" "}

                {store.companyInfo.founder}
            </p>
        </div>
    );
};

```

## Documentation and Resources

### 📚 Documentation

- **[Wiki](https://github.com/LabEG/reca/wiki)** - Comprehensive guides, tutorials, and API reference
- **[API Documentation](https://github.com/LabEG/reca/wiki)** - Detailed API documentation for all features

### 💬 Community and Support

- **[Discord Server](https://discordapp.com/channels/974049080454045796/974049142022209566)** - Join our community for real-time help and discussions
- **[GitHub Discussions](https://github.com/LabEG/reca/discussions)** - Ask questions and share ideas
- **[GitHub Issues](https://github.com/LabEG/reca/issues)** - Report bugs or request features

### 🤝 Contributing

We welcome contributions! See our:

- **[Contributing Guide](CONTRIBUTING.md)** - Learn how to contribute to the project
- **[Code of Conduct](CODE_OF_CONDUCT.md)** - Our community guidelines
- **[Security Policy](SECURITY.md)** - How to report security vulnerabilities

## License

ReCA is [MIT licensed](https://github.com/LabEG/reca/blob/main/LICENSE).
