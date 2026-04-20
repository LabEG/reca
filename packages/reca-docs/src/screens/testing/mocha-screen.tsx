"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content";

export const MochaTestingScreen = (): JSX.Element => (
    <DocContent>
        <h1>Testing with Mocha</h1>
        <p>
            If your project uses Mocha instead of Jest, ReCA stores and services are equally
            easy to test. This guide shows how to configure Mocha with TypeScript and write
            tests for ReCA components.
        </p>

        <h2>Setup</h2>
        <pre><code>{`npm install --save-dev mocha @types/mocha ts-node
npm install --save-dev chai @types/chai
npm install --save-dev sinon @types/sinon`}</code></pre>

        <p>Create <code>.mocharc.yml</code>:</p>
        <pre><code>{`require:
  - reflect-metadata
  - ts-node/register
spec: "tests/**/*.spec.ts"
timeout: 5000`}</code></pre>

        <h2>Unit Testing a Store</h2>
        <pre><code>{`import { expect } from "chai";
import { TodoStore } from "../stores/todo.store";

describe("TodoStore", () => {
    let store: TodoStore;

    beforeEach(() => {
        store = new TodoStore();
    });

    it("should start with empty todos", () => {
        expect(store.todos).to.have.lengthOf(0);
    });

    it("should add a todo", () => {
        store.currentText = "Buy milk";
        store.addTodo();

        expect(store.todos).to.have.lengthOf(1);
        expect(store.todos[0].text).to.equal("Buy milk");
    });

    it("should not add empty todos", () => {
        store.currentText = "";
        store.addTodo();

        expect(store.todos).to.have.lengthOf(0);
    });

    it("should toggle todo completion", () => {
        store.currentText = "Task";
        store.addTodo();

        store.toggleTodo(store.todos[0].id);
        expect(store.todos[0].completed).to.be.true;

        store.toggleTodo(store.todos[0].id);
        expect(store.todos[0].completed).to.be.false;
    });

    it("should delete a todo", () => {
        store.currentText = "Task";
        store.addTodo();
        const id = store.todos[0].id;

        store.deleteTodo(id);
        expect(store.todos).to.have.lengthOf(0);
    });
});`}</code></pre>

        <h2>Mocking with Sinon</h2>
        <p>
            Use Sinon stubs and spies to mock service dependencies:
        </p>

        <pre><code>{`import { expect } from "chai";
import sinon from "sinon";
import { LoginStore } from "../stores/login.store";

describe("LoginStore", () => {
    let store: LoginStore;
    let mockAuthService: {
        login: sinon.SinonStub;
        logout: sinon.SinonStub;
        getToken: sinon.SinonStub;
        isAuthenticated: sinon.SinonStub;
    };

    beforeEach(() => {
        mockAuthService = {
            login: sinon.stub(),
            logout: sinon.stub(),
            getToken: sinon.stub(),
            isAuthenticated: sinon.stub(),
        };

        store = new LoginStore(mockAuthService as any);
    });

    afterEach(() => {
        sinon.restore();
    });

    it("should call auth service on login", async () => {
        mockAuthService.login.resolves(true);
        store.username = "admin";
        store.password = "secret";

        await store.handleLogin();

        expect(mockAuthService.login.calledWith("admin", "secret")).to.be.true;
        expect(store.error).to.be.null;
    });

    it("should set error on failed login", async () => {
        mockAuthService.login.resolves(false);
        store.username = "user";
        store.password = "wrong";

        await store.handleLogin();

        expect(store.error).to.equal("Invalid credentials");
    });

    it("should track loading state", async () => {
        mockAuthService.login.resolves(true);
        store.username = "admin";
        store.password = "pass";

        const promise = store.handleLogin();
        // isLoading should be true during the call
        // After resolution:
        await promise;
        expect(store.isLoading).to.be.false;
    });
});`}</code></pre>

        <h2>Testing Services</h2>
        <pre><code>{`import { expect } from "chai";
import sinon from "sinon";
import { OrderService } from "../services/order.service";

describe("OrderService", () => {
    let service: OrderService;
    let mockOrderRepo: any;
    let mockInventoryRepo: any;

    beforeEach(() => {
        mockOrderRepo = {
            create: sinon.stub(),
            getById: sinon.stub(),
            updateStatus: sinon.stub(),
        };
        mockInventoryRepo = {
            getStock: sinon.stub(),
            decrementStock: sinon.stub(),
        };
        service = new OrderService(mockOrderRepo, mockInventoryRepo);
    });

    it("should place order when stock is available", async () => {
        mockInventoryRepo.getStock.resolves(10);
        mockOrderRepo.create.resolves({
            id: 1, items: [], total: 50, status: "pending"
        });

        const order = await service.placeOrder([
            { productId: 1, quantity: 2, price: 25 }
        ]);

        expect(order.id).to.equal(1);
        expect(mockInventoryRepo.decrementStock.calledWith(1, 2)).to.be.true;
    });

    it("should reject order when stock is insufficient", async () => {
        mockInventoryRepo.getStock.resolves(0);

        try {
            await service.placeOrder([
                { productId: 1, quantity: 5, price: 10 }
            ]);
            expect.fail("Should have thrown");
        } catch (error: any) {
            expect(error.message).to.include("Insufficient stock");
        }
    });
});`}</code></pre>

        <h2>Running Tests</h2>
        <pre><code>{`# Run all tests
npx mocha

# Run specific test file
npx mocha tests/stores/todo.spec.ts

# Watch mode
npx mocha --watch`}</code></pre>
    </DocContent>
);
