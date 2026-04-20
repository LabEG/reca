"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content";

export const RepositoryScreen = (): JSX.Element => (
    <DocContent>
        <h1>Repository Pattern</h1>
        <p>
            The <strong>Repository</strong> layer abstracts data access and external API
            communication. By isolating data fetching behind an interface, you can swap
            implementations (e.g., REST → GraphQL, or real API → mock) without changing
            business logic.
        </p>

        <h2>Creating a Repository</h2>
        <pre><code>{`// repositories/todo.repository.ts
import type { ITodo } from "../models/todo.model";

export class TodoRepository {

    private readonly baseUrl = "/api/todos";

    public async getAll(): Promise<ITodo[]> {
        const response = await fetch(this.baseUrl);
        return response.json();
    }

    public async getById(id: number): Promise<ITodo> {
        const response = await fetch(\`\${this.baseUrl}/\${id}\`);
        return response.json();
    }

    public async create(text: string, category: string): Promise<ITodo> {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, category }),
        });
        return response.json();
    }

    public async update(id: number, changes: Partial<ITodo>): Promise<ITodo> {
        const response = await fetch(\`\${this.baseUrl}/\${id}\`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(changes),
        });
        return response.json();
    }

    public async delete(id: number): Promise<void> {
        await fetch(\`\${this.baseUrl}/\${id}\`, { method: "DELETE" });
    }
}`}</code></pre>

        <h2>Using Repository in a Service</h2>
        <p>
            The service uses the repository for data access and adds business logic on top:
        </p>

        <pre><code>{`// services/todo.service.ts
import type { ITodo, TodoFilter } from "../models/todo.model";
import { TodoRepository } from "../repositories/todo.repository";

export class TodoService {

    constructor(private readonly todoRepo: TodoRepository) {}

    public async loadTodos(): Promise<ITodo[]> {
        return this.todoRepo.getAll();
    }

    public async addTodo(text: string, category: string): Promise<ITodo> {
        if (!text.trim()) {
            throw new Error("Todo text cannot be empty");
        }
        return this.todoRepo.create(text.trim(), category);
    }

    public async toggleTodo(todo: ITodo): Promise<ITodo> {
        return this.todoRepo.update(todo.id, {
            completed: !todo.completed,
        });
    }

    public async removeTodo(id: number): Promise<void> {
        return this.todoRepo.delete(id);
    }

    public filterTodos(todos: ITodo[], filter: TodoFilter): ITodo[] {
        switch (filter) {
            case "active":
                return todos.filter((t) => !t.completed);
            case "completed":
                return todos.filter((t) => t.completed);
            default:
                return todos;
        }
    }
}`}</code></pre>

        <h2>Complete Chain: Store → Service → Repository</h2>
        <pre><code>{`// stores/todo.store.ts
import { AutoStore } from "reca";
import { TodoService } from "../services/todo.service";
import type { ITodo, TodoFilter } from "../models/todo.model";

export class TodoStore extends AutoStore {

    public todos: ITodo[] = [];
    public filter: TodoFilter = "all";
    public isLoading: boolean = false;

    constructor(private readonly todoService: TodoService) {
        super();
    }

    public get filteredTodos(): ITodo[] {
        return this.todoService.filterTodos(this.todos, this.filter);
    }

    public async init(): Promise<void> {
        this.isLoading = true;
        this.todos = await this.todoService.loadTodos();
        this.isLoading = false;
    }

    public async addTodo(text: string, category: string): Promise<void> {
        const todo = await this.todoService.addTodo(text, category);
        this.todos.push(todo);
    }

    public async toggleTodo(todo: ITodo): Promise<void> {
        const updated = await this.todoService.toggleTodo(todo);
        const index = this.todos.findIndex((t) => t.id === updated.id);
        if (index !== -1) this.todos[index] = updated;
    }

    public async removeTodo(id: number): Promise<void> {
        await this.todoService.removeTodo(id);
        this.todos = this.todos.filter((t) => t.id !== id);
    }
}`}</code></pre>

        <h2>Key Benefits</h2>
        <ul>
            <li><strong>Swappable data sources</strong> — replace REST with GraphQL by changing the repository implementation</li>
            <li><strong>Testability</strong> — mock the repository to test services without a real API</li>
            <li><strong>Offline support</strong> — create a local storage repository for offline-first applications</li>
            <li><strong>Caching</strong> — add caching logic in the repository without touching business logic</li>
        </ul>
    </DocContent>
);
