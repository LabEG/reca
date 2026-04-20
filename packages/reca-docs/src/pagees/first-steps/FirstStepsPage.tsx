"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/DocContent/DocContent.js";

export const FirstStepsPage = (): JSX.Element => (
    <DocContent>
        <h1>First Steps</h1>
        <p>
            In this article you will learn the basics of ReCA. To get familiar with the
            fundamental building blocks, we will build a simple ToDo application that covers
            the core concepts.
        </p>

        <h2>Creating a Store</h2>
        <p>
            A <strong>Store</strong> is a class that holds the state and business logic for a
            component. ReCA provides two types of stores:
        </p>
        <ul>
            <li><strong>AutoStore</strong> — automatically triggers component re-renders when state changes</li>
            <li><strong>Store</strong> — a low-level store where you manually control re-renders via <code>this.redraw()</code></li>
        </ul>

        <p>
            For most use cases, <code>AutoStore</code> is recommended. Let&apos;s create a ToDo store:
        </p>

        <pre><code>{`import { AutoStore } from "reca";
import type { FormEvent } from "react";

export class ToDoStore extends AutoStore {

    public currentTodo: string = "";

    public todos: string[] = [];

    public handleAddTodo(): void {
        this.todos.push(this.currentTodo);
        this.currentTodo = "";
    }

    public handleDeleteTodo(index: number): void {
        this.todos.splice(index, 1);
    }

    public handleCurrentEdit(event: FormEvent<HTMLInputElement>): void {
        this.currentTodo = event.currentTarget.value;
    }
}`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            With <code>AutoStore</code>, any mutation to a public property automatically triggers a
            re-render of the component that uses the store. No actions, reducers, or dispatch calls needed.
        </Alert>

        <h2>Using the Store in a Component</h2>
        <p>
            Connect the store to a React component using the <code>useStore</code> hook:
        </p>

        <pre><code>{`import { useStore } from "reca";
import { ToDoStore } from "../stores/todo.store";

export const ToDoComponent = () => {
    const store = useStore(ToDoStore);

    return (
        <div className="todos">
            <div className="todos-list">
                {store.todos.map((todo, index) => (
                    <div key={index} className="todo">
                        {todo}
                        <button
                            onClick={() => store.handleDeleteTodo(index)}
                            type="button"
                        >
                            X
                        </button>
                    </div>
                ))}
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
                    Add
                </button>
            </div>
        </div>
    );
};`}</code></pre>

        <h2>How It Works</h2>
        <p>
            When you call <code>useStore(ToDoStore)</code>, ReCA:
        </p>
        <ol>
            <li>Creates an instance of <code>ToDoStore</code> scoped to the component</li>
            <li>Wraps the store with a Proxy to detect property changes</li>
            <li>Automatically calls <code>setState</code> when any public property is mutated</li>
            <li>Returns the store instance for direct method calls and property access</li>
        </ol>

        <blockquote>
            <p>
                Because each component gets its own store instance, there is no shared global state
                by default. This &quot;microstore&quot; pattern ensures that state changes in one
                component don&apos;t trigger re-renders in unrelated components.
            </p>
        </blockquote>

        <h2>Next Steps</h2>
        <p>
            Now that you understand the basics, explore the <strong>Fundamentals</strong> section
            to learn about <code>AutoStore</code> vs <code>Store</code>, available hooks, and
            advanced patterns like Dependency Injection.
        </p>
    </DocContent>
);
