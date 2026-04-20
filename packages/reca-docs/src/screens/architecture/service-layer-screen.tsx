"use client";

import {type JSX} from "react";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const ServiceLayerScreen = (): JSX.Element => (
    <DocContent>
        <h1>Service Layer</h1>
        <p>
            The Service layer contains <strong>application-specific business rules</strong>.
            It sits between the Store (presentation) and Repository (data access) layers,
            orchestrating complex operations and enforcing business invariants.
        </p>

        <h2>Responsibilities</h2>
        <ul>
            <li>Implement business rules and validation</li>
            <li>Orchestrate calls to one or more repositories</li>
            <li>Transform data between the repository format and the domain model</li>
            <li>Handle cross-cutting concerns like caching and error normalization</li>
        </ul>

        <h2>Characteristics of a Good Service</h2>
        <p>
            A well-designed service follows these principles:
        </p>
        <ol>
            <li><strong>Framework-independent</strong> — no React imports, no DOM access</li>
            <li><strong>Single Responsibility</strong> — one service per domain concept</li>
            <li><strong>Pure business logic</strong> — no UI state like loading flags or error messages</li>
            <li><strong>Stateless or minimal state</strong> — most services are stateless; only hold state for caching or session-level data</li>
        </ol>

        <h2>Example: Order Service</h2>
        <pre><code>{`// services/order.service.ts
import { OrderRepository } from "../repositories/order.repository";
import { InventoryRepository } from "../repositories/inventory.repository";
import type { IOrder, IOrderItem } from "../models/order.model";

export class OrderService {

    constructor(
        private readonly orderRepo: OrderRepository,
        private readonly inventoryRepo: InventoryRepository,
    ) {}

    public async placeOrder(items: IOrderItem[]): Promise<IOrder> {
        // Business rule: validate stock availability
        for (const item of items) {
            const stock = await this.inventoryRepo.getStock(item.productId);
            if (stock < item.quantity) {
                throw new Error(
                    \`Insufficient stock for product \${item.productId}\`
                );
            }
        }

        // Business rule: calculate totals
        const total = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        // Create order via repository
        const order = await this.orderRepo.create({ items, total });

        // Update inventory
        for (const item of items) {
            await this.inventoryRepo.decrementStock(
                item.productId,
                item.quantity
            );
        }

        return order;
    }

    public async cancelOrder(orderId: number): Promise<void> {
        const order = await this.orderRepo.getById(orderId);

        // Business rule: only pending orders can be cancelled
        if (order.status !== "pending") {
            throw new Error("Only pending orders can be cancelled");
        }

        await this.orderRepo.updateStatus(orderId, "cancelled");

        // Restore inventory
        for (const item of order.items) {
            await this.inventoryRepo.incrementStock(
                item.productId,
                item.quantity
            );
        }
    }
}`}</code></pre>

        <h2>Service Composition</h2>
        <p>
            Services can depend on other services to compose higher-level operations.
            ReCA&apos;s DI container resolves the full dependency tree:
        </p>

        <pre><code>{`// services/checkout.service.ts
import { OrderService } from "./order.service";
import { PaymentService } from "./payment.service";
import { NotificationService } from "./notification.service";

export class CheckoutService {

    constructor(
        private readonly orderService: OrderService,
        private readonly paymentService: PaymentService,
        private readonly notificationService: NotificationService,
    ) {}

    public async checkout(cart: ICart): Promise<IOrder> {
        const order = await this.orderService.placeOrder(cart.items);
        await this.paymentService.charge(order.total, cart.paymentMethod);
        await this.notificationService.sendConfirmation(order);
        return order;
    }
}`}</code></pre>

        <h2>Error Handling</h2>
        <p>
            Services should throw domain-specific errors. The store layer catches these
            and translates them into user-friendly messages:
        </p>

        <pre><code>{`// errors/domain.errors.ts
export class InsufficientStockError extends Error {
    constructor(public readonly productId: number) {
        super(\`Insufficient stock for product \${productId}\`);
        this.name = "InsufficientStockError";
    }
}

// In the store:
public async handlePlaceOrder(): Promise<void> {
    try {
        this.order = await this.orderService.placeOrder(this.items);
    } catch (error) {
        if (error instanceof InsufficientStockError) {
            this.error = \`Product \${error.productId} is out of stock\`;
        } else {
            this.error = "An unexpected error occurred";
        }
    }
}`}</code></pre>

        <h2>Testing Services</h2>
        <p>
            Because services have no framework dependencies, they are straightforward to unit test:
        </p>

        <pre><code>{`describe("OrderService", () => {
    it("should reject order when stock is insufficient", async () => {
        const mockInventoryRepo = {
            getStock: jest.fn().mockResolvedValue(0),
        };
        const mockOrderRepo = { create: jest.fn() };

        const service = new OrderService(
            mockOrderRepo as any,
            mockInventoryRepo as any,
        );

        await expect(
            service.placeOrder([{ productId: 1, quantity: 5, price: 10 }])
        ).rejects.toThrow("Insufficient stock");
    });
});`}</code></pre>

        <h2>From the Literature</h2>
        <blockquote>
            <p>
                &quot;A Service Layer defines an application&apos;s boundary with a layer of
                services that establishes a set of available operations and coordinates
                the application&apos;s response in each operation.&quot;
                <br /><em>— Martin Fowler, Patterns of Enterprise Application Architecture (2002), Chapter 9</em>
            </p>
        </blockquote>

        <blockquote>
            <p>
                &quot;Use cases are the business rules of the application. They are the most
                essential business rules, the ones that make the application what it is.
                The use cases encapsulate and implement all of the use cases of the system.&quot;
                <br /><em>— Robert C. Martin, Clean Architecture (2017), Chapter 20</em>
            </p>
        </blockquote>

        <p>
            In ReCA, services correspond to Martin&apos;s &quot;use cases&quot; — they encode
            the specific business operations of your application. They are independent of
            the UI framework, the database, and any external agency.
        </p>

        <blockquote>
            <p>
                &quot;Application services are the interface used by the outside world, where the
                outside world can&apos;t communicate via our Entity objects directly, but it
                can ask for Action to be executed.&quot;
                <br /><em>— Eric Evans, Domain-Driven Design (2003), Chapter 5</em>
            </p>
        </blockquote>
    </DocContent>
);
