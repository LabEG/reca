"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const JestTestingScreen = (): JSX.Element => (
    <DocContent>
        <h1>Testing with Jest</h1>
        <p>
            ReCA stores and services are plain TypeScript classes, making them straightforward
            to test with Jest. This guide covers unit testing stores, services, and repositories,
            as well as integration testing with React Testing Library.
        </p>

        <h2>Setup</h2>
        <pre><code>{`npm install --save-dev jest ts-jest @types/jest
npm install --save-dev @testing-library/react @testing-library/jest-dom`}</code></pre>

        <p>Configure Jest for TypeScript in <code>jest.config.ts</code>:</p>
        <pre><code>{`export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterSetup: ["reflect-metadata"],
};`}</code></pre>

        <h2>Unit Testing a Store</h2>
        <p>
            Test stores by instantiating them directly and calling methods:
        </p>

        <pre><code>{`import { TodoStore } from "../stores/todo.store";

describe("TodoStore", () => {
    let store: TodoStore;

    beforeEach(() => {
        store = new TodoStore();
    });

    it("should add a todo", () => {
        store.currentText = "Buy milk";
        store.addTodo();

        expect(store.todos).toHaveLength(1);
        expect(store.todos[0].text).toBe("Buy milk");
    });

    it("should not add empty todos", () => {
        store.currentText = "   ";
        store.addTodo();

        expect(store.todos).toHaveLength(0);
    });

    it("should toggle todo completion", () => {
        store.currentText = "Task";
        store.addTodo();
        store.toggleTodo(store.todos[0].id);

        expect(store.todos[0].completed).toBe(true);
    });

    it("should filter active todos", () => {
        store.currentText = "Task 1";
        store.addTodo();
        store.currentText = "Task 2";
        store.addTodo();
        store.toggleTodo(store.todos[0].id);

        store.setFilter("active");
        expect(store.filteredTodos).toHaveLength(1);
        expect(store.filteredTodos[0].text).toBe("Task 2");
    });
});`}</code></pre>

        <h2>Testing with Mocked Dependencies</h2>
        <p>
            When a store depends on services, inject mocks via the constructor:
        </p>

        <pre><code>{`import { LoginStore } from "../stores/login.store";

describe("LoginStore", () => {
    let store: LoginStore;
    let mockAuthService: jest.Mocked<AuthService>;

    beforeEach(() => {
        mockAuthService = {
            login: jest.fn(),
            logout: jest.fn(),
            getToken: jest.fn(),
            isAuthenticated: jest.fn(),
        } as any;

        store = new LoginStore(mockAuthService);
    });

    it("should call auth service on login", async () => {
        mockAuthService.login.mockResolvedValue(true);
        store.username = "admin";
        store.password = "secret";

        await store.handleLogin();

        expect(mockAuthService.login).toHaveBeenCalledWith("admin", "secret");
        expect(store.error).toBeNull();
    });

    it("should set error on failed login", async () => {
        mockAuthService.login.mockResolvedValue(false);
        store.username = "admin";
        store.password = "wrong";

        await store.handleLogin();

        expect(store.error).toBe("Invalid credentials");
    });
});`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            Because ReCA uses constructor injection, you can pass mock objects directly
            without any special DI setup in tests.
        </Alert>

        <h2>Testing Services</h2>
        <pre><code>{`import { OrderService } from "../services/order.service";

describe("OrderService", () => {
    let service: OrderService;
    let mockOrderRepo: jest.Mocked<OrderRepository>;
    let mockInventoryRepo: jest.Mocked<InventoryRepository>;

    beforeEach(() => {
        mockOrderRepo = {
            create: jest.fn(),
            getById: jest.fn(),
            updateStatus: jest.fn(),
        } as any;

        mockInventoryRepo = {
            getStock: jest.fn(),
            decrementStock: jest.fn(),
            incrementStock: jest.fn(),
        } as any;

        service = new OrderService(mockOrderRepo, mockInventoryRepo);
    });

    it("should place order when stock is available", async () => {
        mockInventoryRepo.getStock.mockResolvedValue(10);
        mockOrderRepo.create.mockResolvedValue({
            id: 1, items: [], total: 50, status: "pending"
        });

        const order = await service.placeOrder([
            { productId: 1, quantity: 2, price: 25 }
        ]);

        expect(order.id).toBe(1);
        expect(mockInventoryRepo.decrementStock).toHaveBeenCalledWith(1, 2);
    });

    it("should reject order when stock is insufficient", async () => {
        mockInventoryRepo.getStock.mockResolvedValue(0);

        await expect(
            service.placeOrder([{ productId: 1, quantity: 5, price: 10 }])
        ).rejects.toThrow("Insufficient stock");
    });
});`}</code></pre>

        <h2>Integration Testing with React Testing Library</h2>
        <pre><code>{`import { render, screen, fireEvent } from "@testing-library/react";
import { TodoComponent } from "../components/TodoComponent";

describe("TodoComponent", () => {
    it("should add and display a todo", () => {
        render(<TodoComponent />);

        const input = screen.getByPlaceholderText("What needs to be done?");
        fireEvent.input(input, { target: { value: "Buy milk" } });
        fireEvent.click(screen.getByText("Add"));

        expect(screen.getByText("Buy milk")).toBeInTheDocument();
    });

    it("should delete a todo", () => {
        render(<TodoComponent />);

        const input = screen.getByPlaceholderText("What needs to be done?");
        fireEvent.input(input, { target: { value: "Task" } });
        fireEvent.click(screen.getByText("Add"));
        fireEvent.click(screen.getByText("×"));

        expect(screen.queryByText("Task")).not.toBeInTheDocument();
    });
});`}</code></pre>
    </DocContent>
);
