"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const FirstComponentScreen = (): JSX.Element => (
    <DocContent>
        <h1>First Component</h1>
        <p>
            Let&apos;s build a complete ToDo application to learn the core concepts of ReCA.
            By the end of this guide, you will understand how to create a store, connect it to
            a component, and handle user interactions.
        </p>

        <h2>Step 1: Create a Store</h2>
        <p>
            A store is a plain TypeScript class that extends <code>AutoStore</code>.
            Public properties become reactive state, and methods become actions:
        </p>

        <pre><code>{`// stores/todo.store.ts
import { AutoStore } from "reca";

export class TodoStore extends AutoStore {
    currentTodo = "";
    todos: string[] = [];

    addTodo() {
        if (this.currentTodo.trim()) {
            this.todos.push(this.currentTodo.trim());
            this.currentTodo = "";
        }
    }

    deleteTodo(index: number) {
        this.todos.splice(index, 1);
    }
}`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            With <code>AutoStore</code>, any mutation to a public property automatically triggers a
            re-render. No actions, reducers, or dispatch calls needed.
        </Alert>

        <h2>Step 2: Create the Component</h2>
        <p>
            Connect the store to a React component using the <code>useStore</code> hook:
        </p>

        <pre><code>{`// components/TodoComponent.tsx
import { useStore } from "reca";
import { TodoStore } from "../stores/todo.store";

export const TodoComponent = () => {
    const store = useStore(TodoStore);

    return (
        <div>
            <h1>My Todos</h1>

            <div>
                {store.todos.map((todo, index) => (
                    <div key={index}>
                        <span>{todo}</span>
                        <button onClick={() => store.deleteTodo(index)}>
                            Delete
                        </button>
                    </div>
                ))}
            </div>

            <div>
                <input
                    value={store.currentTodo}
                    onChange={(e) => { store.currentTodo = e.target.value; }}
                    placeholder="Enter a todo..."
                />
                <button onClick={() => store.addTodo()}>
                    Add
                </button>
            </div>
        </div>
    );
};`}</code></pre>

        <h2>How It Works</h2>
        <ol>
            <li><code>useStore(TodoStore)</code> creates a new instance of <code>TodoStore</code> scoped to this component</li>
            <li>The store instance is wrapped with a <code>Proxy</code> that detects property mutations</li>
            <li>When <code>todos</code> or <code>currentTodo</code> changes, React automatically re-renders the component</li>
            <li>Store properties can be mutated directly (<code>store.currentTodo = ...</code>) or via methods like <code>addTodo()</code></li>
        </ol>

        <blockquote>
            <p>
                Each component gets its own store instance. This &quot;microstore&quot; pattern means
                that state changes in one component never trigger re-renders in unrelated components.
            </p>
        </blockquote>

        <h2>Step 3: Use the Component</h2>
        <pre><code>{`// App.tsx
import { TodoComponent } from "./components/TodoComponent";

export const App = () => (
    <div>
        <TodoComponent />
    </div>
);`}</code></pre>

        <p>
            That&apos;s it! You have a fully functional ToDo application with automatic state management.
            Continue to the <strong>Guides</strong> section to learn about more advanced patterns.
        </p>
    </DocContent>
);
