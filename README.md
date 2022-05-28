# ReCA - React Clean Architecture state manager
Created at the intersection of Functional style and OOP technologies. It is based on the simplicity of the functional style of the view, enriched with OOP technologies for writing business logic. Perfect for beginner developers and complex enterprise applications

## Features
 - **Microstores** - calculations state of components don't affect to other components, small CPU usage for update states,
 - **Direct Functions Call** - don't need heavy CPU utilization for search function in reducer, just call the function directly,
 - **No Boilerplate** - write only business code without those debt,
 - **Dependency Injection** - override any part of your application for unit test or other customer,
 - **Microfrontend** - perfect support microfrontends out the box without any boilerplates,
 - **Simple Data Flow** - don't need search functions call chain for debug your reducers,
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
Create your Store by inheriting from AutoStore, and use it in a component via useStore hook.

``` typescript
// todo.store.ts
import {AutoStore} from "reca";

export class ToDoStore extends AutoStore {

    public todos: string[] = [];

    public addTodo (todo: string): void {
        this.todos.push(todo);
    }

}

// todo.component.ts
import {useStore} from "reca";
import {ToDoStore} from "./todo.store.ts";

export const ToDoComponent = (): JSX.Element => {
    const store = useStore(ToDoStore);

    return (
        <div>
            {store.diService.seed}
        </div>
    );
};
```
...todo: withstore...

...todo: autostore...

## Support and Documentation
Discord server: [click here](https://discordapp.com/channels/974049080454045796/974049142022209566)

...todo

## License
...todo