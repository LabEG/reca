"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const TodoApplicationScreen = (): JSX.Element => (
    <DocContent>
        <h1>Todo Application</h1>
        <p>
            Let&apos;s build a more complete Todo application with categories, filtering,
            and persistence to see AutoStore in a real-world scenario.
        </p>

        <h2>Data Model</h2>
        <pre><code>{`// models/todo.model.ts
export interface ITodo {
    readonly id: number;
    readonly text: string;
    readonly completed: boolean;
    readonly category: string;
}

export type TodoFilter = "all" | "active" | "completed";`}</code></pre>

        <h2>Store Implementation</h2>
        <pre><code>{`// stores/todo.store.ts
import { AutoStore } from "reca";
import type { ITodo, TodoFilter } from "../models/todo.model";
import type { FormEvent } from "react";

export class TodoStore extends AutoStore {

    public todos: ITodo[] = [];
    public currentText: string = "";
    public currentCategory: string = "General";
    public filter: TodoFilter = "all";
    private nextId: number = 1;

    public get filteredTodos(): ITodo[] {
        switch (this.filter) {
            case "active":
                return this.todos.filter((t) => !t.completed);
            case "completed":
                return this.todos.filter((t) => t.completed);
            default:
                return this.todos;
        }
    }

    public get activeCount(): number {
        return this.todos.filter((t) => !t.completed).length;
    }

    public addTodo(): void {
        if (!this.currentText.trim()) return;

        this.todos.push({
            id: this.nextId++,
            text: this.currentText.trim(),
            completed: false,
            category: this.currentCategory
        });
        this.currentText = "";
    }

    public toggleTodo(id: number): void {
        const todo = this.todos.find((t) => t.id === id);
        if (todo) {
            (todo as { completed: boolean }).completed = !todo.completed;
        }
    }

    public deleteTodo(id: number): void {
        const index = this.todos.findIndex((t) => t.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
    }

    public setFilter(filter: TodoFilter): void {
        this.filter = filter;
    }

    public handleTextInput(event: FormEvent<HTMLInputElement>): void {
        this.currentText = event.currentTarget.value;
    }

    public handleCategoryChange(category: string): void {
        this.currentCategory = category;
    }

    public clearCompleted(): void {
        this.todos = this.todos.filter((t) => !t.completed);
    }
}`}</code></pre>

        <h2>Component</h2>
        <pre><code>{`// components/TodoApp.tsx
import { useStore } from "reca";
import { TodoStore } from "../stores/todo.store";

export const TodoApp = () => {
    const store = useStore(TodoStore);

    return (
        <div className="todo-app">
            <h1>Todo App</h1>

            {/* Input Section */}
            <div className="todo-input">
                <input
                    value={store.currentText}
                    onInput={store.handleTextInput}
                    placeholder="What needs to be done?"
                />
                <select
                    value={store.currentCategory}
                    onChange={(e) => store.handleCategoryChange(e.target.value)}
                >
                    <option>General</option>
                    <option>Work</option>
                    <option>Personal</option>
                </select>
                <button onClick={store.addTodo}>Add</button>
            </div>

            {/* Filter Tabs */}
            <div className="todo-filters">
                <button onClick={() => store.setFilter("all")}>
                    All
                </button>
                <button onClick={() => store.setFilter("active")}>
                    Active ({store.activeCount})
                </button>
                <button onClick={() => store.setFilter("completed")}>
                    Completed
                </button>
            </div>

            {/* Todo List */}
            <ul className="todo-list">
                {store.filteredTodos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => store.toggleTodo(todo.id)}
                        />
                        <span className={todo.completed ? "completed" : ""}>
                            [{todo.category}] {todo.text}
                        </span>
                        <button onClick={() => store.deleteTodo(todo.id)}>
                            ×
                        </button>
                    </li>
                ))}
            </ul>

            {/* Footer */}
            <div className="todo-footer">
                <span>{store.activeCount} items left</span>
                <button onClick={store.clearCompleted}>
                    Clear Completed
                </button>
            </div>
        </div>
    );
};`}</code></pre>

        <h2>Key Takeaways</h2>
        <ul>
            <li>Computed getters like <code>filteredTodos</code> and <code>activeCount</code> derive state without extra subscriptions</li>
            <li>Array mutations via <code>push</code>, <code>splice</code>, and reassignment all trigger re-renders</li>
            <li>The store encapsulates all UI logic, keeping the component purely presentational</li>
            <li>No need for <code>useReducer</code>, <code>useCallback</code>, or <code>useMemo</code> — the store handles everything</li>
        </ul>
    </DocContent>
);
