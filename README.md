[![Codacy Badge](https://app.codacy.com/project/badge/Grade/e9e573d8408945168d14d83c81a103e6)](https://www.codacy.com/gh/LabEG/reca/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=LabEG/reca&amp;utm_campaign=Badge_Grade)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)
![GitHub](https://img.shields.io/github/license/LabEG/reca.svg)

# ReCA - React Clean Architecture state manager
Created at the intersection of Functional style and OOP technologies. It is based on the simplicity of the functional style of the view, enriched with OOP technologies for writing business logic. Perfect for beginner developers and complex enterprise applications

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

## Instalation
npm:
```
npm install reca
```

yarn
```
yarn add reca
```

## Examples
### Example AutoStore
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

### Example using DI
This example demonstrates the simplicity of the business logic and the simplified principles of code organization according to the Clean Architecture methodology. The example is simplified for readme, but following the same principles you can organize a full-fledged Clean Architecture. Through the service constructor, you can pass other DI dependencies, such as Repository, Provider, and others.

``` typescript
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

## Support and Documentation
Discord server: [click here](https://discordapp.com/channels/974049080454045796/974049142022209566)

Wiki: [click here](https://github.com/LabEG/reca/wiki)

## License
ReCA is [MIT licensed](https://github.com/LabEG/reca/blob/main/LICENSE).
