"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const PropsScreen = (): JSX.Element => (
    <DocContent>
        <h1>Passing Props to Stores</h1>
        <p>
            ReCA stores can receive props from their host component. Props are typed
            using a generic parameter and automatically passed to all lifecycle methods.
        </p>

        <h2>Defining Props Type</h2>
        <p>
            Pass your props interface as a generic argument to <code>AutoStore</code> or <code>Store</code>:
        </p>

        <pre><code>{`interface IUserPageProps {
    readonly userId: number;
    readonly showAvatar?: boolean;
}

export class UserPageStore extends AutoStore<IUserPageProps> {
    public user: IUser | null = null;

    public activate(props: IUserPageProps): void {
        this.loadUser(props.userId);
    }

    public propsUpdate(props: IUserPageProps): void {
        // Called when userId or showAvatar changes
        this.loadUser(props.userId);
    }

    private async loadUser(id: number): Promise<void> {
        this.user = await this.fetchUser(id);
    }
}`}</code></pre>

        <h2>Passing Props from Component</h2>
        <p>
            Pass props as the second argument to <code>useStore</code>:
        </p>

        <pre><code>{`import { useStore } from "reca";

interface IUserPageProps {
    readonly userId: number;
    readonly showAvatar?: boolean;
}

const UserPage = (props: IUserPageProps) => {
    const store = useStore(UserPageStore, props);

    if (!store.user) return <div>Loading...</div>;

    return (
        <div>
            <h1>{store.user.name}</h1>
            {props.showAvatar && <img src={store.user.avatar} />}
        </div>
    );
};`}</code></pre>

        <h2>Props in Constructor via DI</h2>
        <p>
            When a constructor parameter&apos;s type resolves to <code>Object</code>
            (which happens with interfaces at runtime), ReCA injects the component
            props instead of resolving from the DI container:
        </p>

        <pre><code>{`interface ISearchProps {
    readonly query: string;
}

export class SearchStore extends AutoStore<ISearchProps> {
    public results: IItem[] = [];

    constructor(
        private readonly searchService: SearchService, // ← DI-resolved
        private readonly props: ISearchProps,            // ← component props
    ) {
        super();
    }

    public activate(): void {
        this.search(this.props.query);
    }
}`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            You don&apos;t usually need props in the constructor. Prefer using lifecycle methods
            like <code>activate(props)</code> and <code>propsUpdate(props)</code> to access props.
        </Alert>

        <h2>Reacting to Prop Changes</h2>
        <p>
            The <code>propsUpdate(props)</code> lifecycle method is called whenever the
            parent component passes new props (shallow comparison). Use it to re-fetch data
            or update derived state:
        </p>

        <pre><code>{`export class ProductListStore extends AutoStore<IProductListProps> {
    public products: IProduct[] = [];
    public isLoading: boolean = false;

    constructor(private readonly productService: ProductService) {
        super();
    }

    public activate(props: IProductListProps): void {
        this.loadProducts(props.categoryId);
    }

    public propsUpdate(props: IProductListProps): void {
        // Category changed — reload products
        this.loadProducts(props.categoryId);
    }

    private async loadProducts(categoryId: number): Promise<void> {
        this.isLoading = true;
        this.products = await this.productService.getByCategory(categoryId);
        this.isLoading = false;
    }
}`}</code></pre>

        <h2>Store Without Props</h2>
        <p>
            Stores that don&apos;t need props simply omit the generic parameter:
        </p>

        <pre><code>{`// No generic — no props
export class AppStore extends AutoStore {
    public theme: "light" | "dark" = "light";

    public toggleTheme(): void {
        this.theme = this.theme === "light" ? "dark" : "light";
    }
}

const App = () => {
    const store = useStore(AppStore); // no props argument
    return <button onClick={() => store.toggleTheme()}>{store.theme}</button>;
};`}</code></pre>
    </DocContent>
);
