"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const EnterpriseExampleScreen = (): JSX.Element => (
    <DocContent>
        <h1>Enterprise Application Example</h1>
        <p>
            This guide walks through a real-world enterprise-grade application built with
            ReCA and Next.js. The project is an <strong>Online Store Admin Panel</strong> —
            a back-office system for managing products, orders, customers, and warehouses.
        </p>
        <p>
            The architecture follows a strict layered approach: Next.js handles only routing,
            while the entire application code lives in <code>src/</code> and can be migrated
            to any other framework.
        </p>

        <h2>Tech Stack</h2>
        <ul>
            <li><strong>ReCA</strong> — state management and dependency injection</li>
            <li><strong>Next.js App Router</strong> — React framework; the <code>app/</code> folder is used only for routing</li>
            <li><strong>ts-serializable</strong> — type-safe JSON serialization and deserialization</li>
            <li><strong>class-validator</strong> — declarative validation for forms and DTOs</li>
            <li><strong>@labeg/tfetch</strong> — typed HTTP client with CRUD helpers</li>
            <li><strong>styled-components</strong> — component-scoped styles</li>
        </ul>

        <h2>Full Project Structure</h2>
        <pre><code>{`store-admin/
├── app/                         ← Next.js routing (nothing else)
│   ├── layout.tsx
│   ├── page.tsx
│   ├── products/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── orders/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── customers/
│   │   └── page.tsx
│   └── warehouses/
│       └── page.tsx
├── src/
│   ├── Config.ts
│   ├── components/
│   ├── screens/
│   ├── models/
│   ├── repositories/
│   ├── services/
│   ├── validations/
│   ├── helpers/
│   ├── utils/
│   ├── hooks/
│   ├── localization/
│   ├── styles/
│   └── icons/
├── tests/
├── public/
└── package.json`}</code></pre>

        <h2>app/ — Routing Layer</h2>
        <p>
            Each route file is a thin shell that imports a screen from <code>src/screens/</code>
            and wraps it in a layout. Zero business logic:
        </p>
        <pre><code>{`// app/products/page.tsx
"use client";

import type { JSX } from "react";
import { Shell } from "../../src/components/shell/Shell";
import { Layout } from "../../src/components/layout/Layout";
import { ProductListScreen } from "../../src/screens/product/list/ProductListScreen";

const ProductsPage = (): JSX.Element => (
    <main>
        <Shell>
            <Layout>
                <ProductListScreen />
            </Layout>
        </Shell>
    </main>
);

export default ProductsPage;`}</code></pre>

        <pre><code>{`// app/products/[id]/page.tsx
"use client";

import type { JSX } from "react";
import { Shell } from "../../../src/components/shell/Shell";
import { Layout } from "../../../src/components/layout/Layout";
import { ProductCardScreen } from "../../../src/screens/product/card/ProductCardScreen";

const ProductCardPage = (): JSX.Element => (
    <main>
        <Shell>
            <Layout>
                <ProductCardScreen />
            </Layout>
        </Shell>
    </main>
);

export default ProductCardPage;`}</code></pre>

        <h2>Config</h2>
        <p>
            A centralized configuration class that is injected everywhere via DI.
            Keeps all environment-dependent values in one place:
        </p>
        <pre><code>{`// src/Config.ts
export class Config {
    basePath = \`\${process.env.NEXT_BASEPATH ?? ""}/\`;
    serverUrl = typeof window === "undefined"
        ? "https://api.store-admin.example.com"
        : location.origin;
    lang: "en" | "ru" = "en";

    readonly pagesLinks = Object.freeze({
        products:      "products",
        productCard:   "products/card",
        productNew:    "products/new",
        orders:        "orders",
        orderCard:     "orders/card",
        customers:     "customers",
        customerCard:  "customers/card",
        warehouses:    "warehouses",
    });

    readonly uploadLimits = Object.freeze({
        imageSizeMax: 5 * 1024 * 1024,
        csvSizeMax:   10 * 1024 * 1024,
    });
}`}</code></pre>

        <h2>Models — ts-serializable</h2>
        <p>
            Models are not plain data bags — they are <strong>rich domain classes</strong>
            that encapsulate business logic right next to the data. Every model extends{" "}
            <code>Serializable</code> from <strong>ts-serializable</strong>, which gives
            you type-safe <code>fromJSON()</code> and <code>toJSON()</code>. When the
            backend returns JSON, the HTTP layer deserializes it into a real class instance
            with methods — not a plain object.
        </p>
        <pre><code>{`// models/BaseModel.ts
import { Serializable } from "ts-serializable";

export class BaseModel extends Serializable {
    override onWrongType(prop: string, message: string, value: unknown) {
        throw new Error(
            \`\${this.constructor.name}.fromJSON: json.\${prop} \${message}: \${JSON.stringify(value)}\`,
        );
    }
}`}</code></pre>

        <h3>Domain Classes with Business Logic</h3>
        <p>
            Following Clean Architecture, business rules live <strong>inside the model
            class</strong>, not in services. The class knows how to validate itself,
            compute derived values, and enforce invariants:
        </p>
        <pre><code>{`// models/Product.ts
import { jsonProperty } from "ts-serializable";
import { BaseModel } from "./BaseModel";

export class Product extends BaseModel {
    @jsonProperty(Number)
    id: number = 0;

    @jsonProperty(String)
    name: string = "";

    @jsonProperty(String, null)
    description: string | null = null;

    @jsonProperty(Number)
    price: number = 0;

    @jsonProperty(Number)
    stock: number = 0;

    @jsonProperty(String)
    category: string = "";

    @jsonProperty(String, null)
    imageUrl: string | null = null;

    @jsonProperty(Boolean)
    isActive: boolean = true;

    // --- Business logic ---

    get isInStock(): boolean {
        return this.stock > 0;
    }

    get isLowStock(): boolean {
        return this.stock > 0 && this.stock < 10;
    }

    get displayPrice(): string {
        return \`\$\${this.price.toFixed(2)}\`;
    }

    applyDiscount(percent: number): number {
        if (percent < 0 || percent > 100) {
            throw new Error("Discount must be between 0 and 100");
        }
        return this.price * (1 - percent / 100);
    }

    canBeOrdered(quantity: number): boolean {
        return this.isActive && this.stock >= quantity;
    }
}`}</code></pre>

        <pre><code>{`// models/Order.ts
import { jsonProperty } from "ts-serializable";
import { BaseModel } from "./BaseModel";

export class OrderItem extends BaseModel {
    @jsonProperty(Number)
    productId: number = 0;

    @jsonProperty(String)
    productName: string = "";

    @jsonProperty(Number)
    quantity: number = 0;

    @jsonProperty(Number)
    unitPrice: number = 0;

    get subtotal(): number {
        return this.quantity * this.unitPrice;
    }
}

export class Order extends BaseModel {
    @jsonProperty(Number)
    id: number = 0;

    @jsonProperty(String)
    customerName: string = "";

    @jsonProperty(String)
    status: string = "pending";

    @jsonProperty(String)
    createdAt: string = "";

    @jsonProperty([OrderItem])
    items: OrderItem[] = [];

    // --- Business logic ---

    get total(): number {
        return this.items.reduce((sum, item) => sum + item.subtotal, 0);
    }

    get itemCount(): number {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get canBeCancelled(): boolean {
        return this.status === "pending" || this.status === "processing";
    }

    get isCompleted(): boolean {
        return this.status === "delivered" || this.status === "cancelled";
    }

    applyCustomerDiscount(tierPercent: number): number {
        return this.total * (1 - tierPercent / 100);
    }
}`}</code></pre>

        <pre><code>{`// models/ProductListPage.ts
import { jsonProperty } from "ts-serializable";
import { BaseModel } from "./BaseModel";
import { Product } from "./Product";

export class ProductListPage extends BaseModel {
    @jsonProperty([Product])
    items: Product[] = [];

    @jsonProperty(Number)
    totalCount: number = 0;

    @jsonProperty(Number)
    pageNumber: number = 1;

    @jsonProperty(Number)
    pageSize: number = 20;

    get totalPages(): number {
        return Math.ceil(this.totalCount / this.pageSize);
    }

    get hasNextPage(): boolean {
        return this.pageNumber < this.totalPages;
    }
}`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            Business logic lives in the model: <code>product.canBeOrdered(5)</code>,{" "}
            <code>order.total</code>, <code>order.canBeCancelled</code>. Services only
            orchestrate I/O — they never compute business rules.
        </Alert>

        <h3>Models Folder Structure</h3>
        <pre><code>{`src/models/
├── BaseModel.ts
├── Product.ts              ← domain class with business logic
├── Order.ts
├── OrderItem.ts
├── Customer.ts
├── Warehouse.ts
├── ProductListPage.ts
├── OrderListPage.ts
├── CreateProductForm.ts    ← form model with class-validator rules
├── UpdateProductForm.ts
├── FilterModel.ts
├── enums/
│   ├── OrderStatus.ts
│   └── ProductCategory.ts
└── view-models/
    └── OrderSummaryVM.ts`}</code></pre>

        <h2>Validations — class-validator</h2>
        <p>
            Form validation is declarative with <strong>class-validator</strong>. Validation
            rules are defined once and reused across forms and API-boundary checks:
        </p>
        <pre><code>{`// validations/ProductPrice.ts
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import type { ValidationArguments } from "class-validator";

@ValidatorConstraint({ name: "productPrice", async: false })
export class ProductPrice implements ValidatorConstraintInterface {
    private errorMsg = "";

    validate(value: number, _args: ValidationArguments): boolean {
        if (value === undefined || value === null) {
            this.errorMsg = "Price is required";
            return false;
        }
        if (value <= 0) {
            this.errorMsg = "Price must be greater than zero";
            return false;
        }
        if (value > 1_000_000) {
            this.errorMsg = "Price exceeds maximum allowed value";
            return false;
        }
        return true;
    }

    defaultMessage(): string {
        return this.errorMsg;
    }
}`}</code></pre>
        <pre><code>{`// validations/RequiredString.ts
@ValidatorConstraint({ name: "requiredString", async: false })
export class RequiredString implements ValidatorConstraintInterface {
    validate(text: string): boolean {
        return typeof text === "string" && text.trim().length > 0;
    }

    defaultMessage(): string {
        return "This field is required";
    }
}

// Usage in a form model
import { Validate } from "class-validator";

export class CreateProductForm {
    @Validate(RequiredString)
    name: string = "";

    @Validate(ProductPrice)
    price: number = 0;

    @Validate(RequiredString)
    category: string = "";

    description: string = "";
}`}</code></pre>

        <h3>Validations Folder Structure</h3>
        <pre><code>{`src/validations/
├── Email.ts
├── Phone.ts
├── RequiredString.ts
├── ProductPrice.ts
├── PositiveNumber.ts
└── MaxLength.ts`}</code></pre>

        <h2>Repositories — @labeg/tfetch</h2>
        <p>
            Every repository extends <code>CrudHttpRepository</code> from{" "}
            <strong>@labeg/tfetch</strong>. The base class provides typed HTTP methods
            that automatically serialize requests and deserialize responses through{" "}
            <code>ts-serializable</code>:
        </p>
        <pre><code>{`// repositories/base/BaseRepository.ts
import { CrudHttpRepository } from "@labeg/tfetch";
import type { Serializable } from "ts-serializable";
import { reflection } from "reca";
import { Config } from "../../Config";

@reflection
export abstract class BaseHttpRepository<T extends Serializable>
    extends CrudHttpRepository<T> {

    protected apiRoot: string;

    constructor(protected readonly config: Config) {
        super();
        this.apiRoot = config.serverUrl + config.basePath;
    }

    // Default cookies for every request
    protected override getDefaultHeaders(): Record<string, string> {
        return {
            "X-Lang": this.config.lang,
            "X-Request-Id": crypto.randomUUID(),
        };
    }

    // Centralized error handling for all repositories
    protected override async onResponseError(response: Response): Promise<never> {
        if (response.status === 401) {
            window.location.href = "/auth/login";
        }

        const body = await response.text();
        throw new Error(
            \`HTTP \${response.status}: \${response.statusText} — \${body}\`,
        );
    }
}`}</code></pre>
        <pre><code>{`// repositories/ProductRepository.ts
import { reflection } from "reca";
import { BaseHttpRepository } from "./base/BaseRepository";
import { Config } from "../Config";
import { BaseModel } from "../models/BaseModel";
import { Product } from "../models/Product";
import { ProductListPage } from "../models/ProductListPage";
import type { CreateProductForm } from "../models/CreateProductForm";
import type { UpdateProductForm } from "../models/UpdateProductForm";
import type { FilterModel } from "../models/FilterModel";

@reflection
export class ProductRepository extends BaseHttpRepository<BaseModel> {
    protected modelConstructor = BaseModel;

    constructor(config: Config) {
        super(config);
        this.apiRoot += "api/products";
    }

    async getProducts(filter: FilterModel): Promise<ProductListPage> {
        return this.send("POST", \`\${this.apiRoot}/list\`, filter, ProductListPage);
    }

    async getProduct(id: number): Promise<Product> {
        return this.send("GET", \`\${this.apiRoot}/\${id}\`, undefined, Product);
    }

    async createProduct(form: CreateProductForm): Promise<number> {
        return this.send("POST", this.apiRoot, form, 0 as any);
    }

    async updateProduct(id: number, form: UpdateProductForm): Promise<void> {
        return this.send("PUT", \`\${this.apiRoot}/\${id}\`, form, undefined);
    }

    async deleteProduct(id: number): Promise<void> {
        return this.send("DELETE", \`\${this.apiRoot}/\${id}\`, undefined, undefined);
    }
}`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            <code>@labeg/tfetch</code> + <code>ts-serializable</code> work together:
            the <code>send</code> method uses the model constructor to call{" "}
            <code>fromJSON()</code> on the API response, returning a real{" "}
            <code>ProductDto</code> instance — not a plain JavaScript object.
        </Alert>

        <h3>Repositories Folder</h3>
        <pre><code>{`src/repositories/
├── base/
│   └── BaseRepository.ts
├── ProductRepository.ts
├── OrderRepository.ts
├── CustomerRepository.ts
└── WarehouseRepository.ts`}</code></pre>

        <h2>Services — Four Layers</h2>
        <p>
            Business logic is organized into four service sub-folders, each with
            a clear responsibility boundary:
        </p>
        <pre><code>{`src/services/
├── domain-services/      ← cross-entity business rules that don't belong to one model
│   └── InventoryService.ts
├── app-services/         ← orchestration: wire repositories + models
│   ├── ProductService.ts
│   ├── OrderService.ts
│   └── CustomerService.ts
├── infr-services/        ← infrastructure: analytics, logging
│   ├── AnalyticsService.ts
│   └── LoggerService.ts
└── view-services/        ← UI services: toasts, modals
    ├── ToastService.ts
    └── ConfirmationService.ts`}</code></pre>

        <Alert severity="warning" sx={{my: 2}}>
            Business logic lives in <strong>model classes</strong>, not in services.
            Services only orchestrate I/O: call repositories, pass data to models,
            return the result. If you need logic that spans multiple entities, put it
            in a domain service.
        </Alert>

        <h3>Domain Service (cross-entity logic)</h3>
        <p>
            Domain services handle rules that span multiple models and don&apos;t
            naturally belong to one class:
        </p>
        <pre><code>{`// services/domain-services/InventoryService.ts
import { reflection } from "reca";
import type { Product } from "../../models/Product";
import type { Warehouse } from "../../models/Warehouse";

@reflection
export class InventoryService {
    /**
     * Can we fulfill this order across all warehouses?
     * This logic spans Product + Warehouse — it doesn't belong to either model.
     */
    canFulfill(product: Product, quantity: number, warehouses: Warehouse[]): boolean {
        const totalStock = warehouses.reduce(
            (sum, wh) => sum + wh.getStockFor(product.id),
            0,
        );
        return product.isActive && totalStock >= quantity;
    }
}`}</code></pre>

        <h3>App Service (I/O orchestration, no business logic)</h3>
        <pre><code>{`// services/app-services/ProductService.ts
import { reflection } from "reca";
import { ProductRepository } from "../../repositories/ProductRepository";
import type { Product } from "../../models/Product";
import type { ProductListPage } from "../../models/ProductListPage";
import type { CreateProductForm } from "../../models/CreateProductForm";
import type { UpdateProductForm } from "../../models/UpdateProductForm";
import type { FilterModel } from "../../models/FilterModel";

@reflection
export class ProductService {
    constructor(private readonly productRepo: ProductRepository) {}

    async getProducts(filter: FilterModel): Promise<ProductListPage> {
        return this.productRepo.getProducts(filter);
    }

    async getProduct(id: number): Promise<Product> {
        return this.productRepo.getProduct(id);
    }

    async createProduct(form: CreateProductForm): Promise<number> {
        return this.productRepo.createProduct(form);
    }

    async updateProduct(id: number, form: UpdateProductForm): Promise<void> {
        return this.productRepo.updateProduct(id, form);
    }

    async deleteProduct(id: number): Promise<void> {
        return this.productRepo.deleteProduct(id);
    }
}`}</code></pre>

        <h3>View Service (UI feedback)</h3>
        <pre><code>{`// services/view-services/ToastService.ts
import { reflection } from "reca";

@reflection
export class ToastService {
    private showFn: (message: string, severity: string) => void = () => {};

    setShowFunction(fn: (message: string, severity: string) => void) {
        this.showFn = fn;
    }

    success(message: string) { this.showFn(message, "success"); }
    error(message: string)   { this.showFn(message, "error"); }
    info(message: string)    { this.showFn(message, "info"); }
}`}</code></pre>

        <h2>Screens — Putting It All Together</h2>
        <p>
            Each screen is a co-located folder with its view, store, styles, and tests.
            The store receives services and repositories via DI:
        </p>
        <pre><code>{`src/screens/product/list/
├── ProductListScreen.tsx
├── ProductListScreen.store.ts
├── ProductListScreen.styles.ts
├── ProductListScreen.unit.spec.ts
└── components/
    ├── ProductTable.tsx
    └── ProductFilters.tsx`}</code></pre>

        <h3>Store</h3>
        <pre><code>{`// screens/product/list/ProductListScreen.store.ts
import { AutoStore, reflection } from "reca";
import { ProductService } from "../../../services/app-services/ProductService";
import { ToastService } from "../../../services/view-services/ToastService";
import { ProductListPage } from "../../../models/ProductListPage";
import { FilterModel } from "../../../models/FilterModel";

@reflection
export class ProductListScreenStore extends AutoStore {
    data = new ProductListPage();
    isLoading = true;
    filter = new FilterModel();

    constructor(
        private readonly productService: ProductService,
        private readonly toastService: ToastService,
    ) {
        super();
    }

    async activate() {
        await this.fetchProducts();
    }

    async fetchProducts() {
        try {
            this.isLoading = true;
            this.data = await this.productService.getProducts(this.filter);
            this.isLoading = false;
        } catch {
            this.isLoading = false;
            this.toastService.error("Failed to load products");
        }
    }

    async deleteProduct(id: number) {
        try {
            await this.productService.deleteProduct(id);
            this.toastService.success("Product deleted");
            await this.fetchProducts();
        } catch {
            this.toastService.error("Failed to delete product");
        }
    }

    setPage(page: number) {
        this.filter.pageNumber = page;
        this.fetchProducts();
    }
}`}</code></pre>

        <h3>View</h3>
        <pre><code>{`// screens/product/list/ProductListScreen.tsx
import { useStore } from "reca";
import { ProductListScreenStore } from "./ProductListScreen.store";
import { PageRoot } from "./ProductListScreen.styles";

export const ProductListScreen = () => {
    const store = useStore(ProductListScreenStore);

    if (store.isLoading) return <div>Loading...</div>;

    return (
        <PageRoot>
            <h1>Products ({store.data.totalCount})</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {store.data.items.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>\${product.price.toFixed(2)}</td>
                            <td>{product.stock}</td>
                            <td>
                                <button onClick={() => store.deleteProduct(product.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </PageRoot>
    );
};`}</code></pre>

        <h2>Data Flow Diagram</h2>
        <pre><code>{`┌──────────────────────────────────────────────────────────┐
│                     app/ (Next.js)                       │
│  page.tsx → imports Screen from src/                     │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│              src/screens/                                 │
│  ProductListScreen.tsx  ←→  ProductListScreen.store.ts   │
│          (view)                    (AutoStore)            │
└──────────────────────┬───────────────────────────────────┘
                       │ DI injects
┌──────────────────────▼───────────────────────────────────┐
│          src/services/app-services/                      │
│              ProductService                               │
│  (I/O orchestration — no business logic)                 │
└────────────┬─────────────────────┬───────────────────────┘
             │                     │
┌────────────▼──────────┐  ┌──────▼────────────────────────┐
│ src/services/          │  │ src/repositories/             │
│ domain-services/       │  │   ProductRepository           │
│   InventoryService     │  │   (CrudHttpRepository)        │
│ (cross-entity rules)   │  │   ↓                           │
└────────────────────────┘  │   @labeg/tfetch → HTTP        │
                            │   ↓                           │
                            │   ts-serializable → fromJSON  │
                            │   → Product instance (with methods) │
                            └───────────────────────────────┘`}</code></pre>

        <h2>How the Libraries Work Together</h2>
        <ol>
            <li>
                <strong>@labeg/tfetch</strong> sends an HTTP request and receives raw JSON
            </li>
            <li>
                <strong>ts-serializable</strong> deserializes the JSON into a typed class
                instance using <code>@jsonProperty</code> decorators — no manual mapping
            </li>
            <li>
                The store receives a real <code>Product</code> instance with business
                methods (<code>canBeOrdered()</code>, <code>applyDiscount()</code>, etc.)
            </li>
            <li>
                When creating or editing, the form model is validated
                with <strong>class-validator</strong> before being sent to the API
            </li>
            <li>
                <strong>ReCA</strong> DI wires all layers together — the store only declares
                constructor parameters, the framework resolves them automatically
            </li>
        </ol>

        <h2>Summary</h2>
        <ul>
            <li><code>app/</code> — Next.js routing only; each page is a thin shell</li>
            <li><code>src/screens/</code> — page components with co-located store, styles, and tests</li>
            <li><code>src/models/</code> — rich domain classes with <code>ts-serializable</code>; business logic lives here, not in services</li>
            <li><code>src/validations/</code> — <code>class-validator</code> rules; declarative, reusable, testable</li>
            <li><code>src/repositories/</code> — <code>@labeg/tfetch</code> repositories; typed CRUD with automatic serialization</li>
            <li><code>src/services/</code> — four layers: domain (cross-entity rules) → app (I/O orchestration) → infr / view</li>
            <li><code>src/components/</code> — reusable components, each a self-contained folder</li>
            <li><code>Config.ts</code> — centralized configuration injected via DI</li>
        </ul>
    </DocContent>
);
