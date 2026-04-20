"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content";

export const AutoStoreBasicsScreen = (): JSX.Element => (
    <DocContent>
        <h1>AutoStore Basics</h1>
        <p>
            <code>AutoStore</code> is the primary building block in ReCA. It automatically tracks
            property changes and triggers component re-renders without any manual intervention.
        </p>

        <h2>Creating an AutoStore</h2>
        <p>
            An AutoStore is a plain TypeScript class. Public properties are your state,
            and methods are your actions:
        </p>

        <pre><code>{`import { AutoStore } from "reca";

export class ProfileStore extends AutoStore {

    public name: string = "";
    public email: string = "";
    public isEditing: boolean = false;

    public startEditing(): void {
        this.isEditing = true;
    }

    public save(): void {
        // Perform save logic
        this.isEditing = false;
    }

    public updateName(name: string): void {
        this.name = name;
    }

    public updateEmail(email: string): void {
        this.email = email;
    }
}`}</code></pre>

        <h2>Using with a Component</h2>
        <pre><code>{`import { useStore } from "reca";
import { ProfileStore } from "../stores/profile.store";

export const ProfileCard = () => {
    const store = useStore(ProfileStore);

    if (store.isEditing) {
        return (
            <form>
                <input
                    value={store.name}
                    onChange={(e) => store.updateName(e.target.value)}
                />
                <input
                    value={store.email}
                    onChange={(e) => store.updateEmail(e.target.value)}
                />
                <button onClick={store.save}>Save</button>
            </form>
        );
    }

    return (
        <div>
            <h2>{store.name}</h2>
            <p>{store.email}</p>
            <button onClick={store.startEditing}>Edit</button>
        </div>
    );
};`}</code></pre>

        <h2>Reactive Arrays and Objects</h2>
        <p>
            AutoStore&apos;s proxy tracks mutations on arrays and nested objects. Methods like
            <code>push</code>, <code>splice</code>, and direct property assignments all trigger re-renders:
        </p>

        <pre><code>{`export class ListStore extends AutoStore {

    public items: string[] = [];

    public addItem(item: string): void {
        this.items.push(item);       // Triggers re-render
    }

    public removeItem(index: number): void {
        this.items.splice(index, 1); // Triggers re-render
    }

    public clearAll(): void {
        this.items = [];             // Triggers re-render
    }
}`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            AutoStore uses a <code>Proxy</code> under the hood. Any property mutation — including
            array methods, nested object changes, and direct assignments — will trigger a re-render.
        </Alert>

        <h2>Computed Values</h2>
        <p>
            Use getter methods for derived state. They are recalculated on every render
            when dependent properties change:
        </p>

        <pre><code>{`export class CartStore extends AutoStore {

    public items: { name: string; price: number }[] = [];

    public get totalPrice(): number {
        return this.items.reduce((sum, item) => sum + item.price, 0);
    }

    public get itemCount(): number {
        return this.items.length;
    }
}`}</code></pre>
    </DocContent>
);
