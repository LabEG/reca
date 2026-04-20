"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const MigrationScreen = (): JSX.Element => (
    <DocContent>
        <h1>Migration Guide</h1>
        <p>
            This guide helps you migrate from popular state management libraries to ReCA.
            Each section shows the before/after pattern so you can convert incrementally.
        </p>

        <h2>From Redux</h2>

        <h3>Redux: Actions + Reducers + Selectors</h3>
        <pre><code>{`// Redux — actions
const ADD_TODO = "ADD_TODO";
const addTodo = (text: string) => ({ type: ADD_TODO, payload: text });

// Redux — reducer
const todoReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, { id: Date.now(), text: action.payload }];
        default:
            return state;
    }
};

// Redux — component
const TodoList = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    return (
        <>
            <button onClick={() => dispatch(addTodo("New"))}>Add</button>
            {todos.map(t => <li key={t.id}>{t.text}</li>)}
        </>
    );
};`}</code></pre>

        <h3>ReCA Equivalent</h3>
        <pre><code>{`// ReCA — store contains state + logic
export class TodoStore extends AutoStore {
    public todos: ITodo[] = [];

    public addTodo(text: string): void {
        this.todos = [...this.todos, { id: Date.now(), text }];
    }
}

// ReCA — component
const TodoList = () => {
    const store = useStore(TodoStore);

    return (
        <>
            <button onClick={() => store.addTodo("New")}>Add</button>
            {store.todos.map(t => <li key={t.id}>{t.text}</li>)}
        </>
    );
};`}</code></pre>

        <Alert severity="info" sx={{my: 2}}>
            ReCA eliminates actions, reducers, action creators, and selectors.
            State and logic live together in the store — one class per feature.
        </Alert>

        <h2>From MobX</h2>

        <h3>MobX: makeAutoObservable + observer</h3>
        <pre><code>{`// MobX — store
class TodoStore {
    todos: ITodo[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTodo(text: string) {
        this.todos.push({ id: Date.now(), text });
    }
}

const todoStore = new TodoStore(); // global singleton

// MobX — component
const TodoList = observer(() => (
    <>
        <button onClick={() => todoStore.addTodo("New")}>Add</button>
        {todoStore.todos.map(t => <li key={t.id}>{t.text}</li>)}
    </>
));`}</code></pre>

        <h3>ReCA Equivalent</h3>
        <pre><code>{`// ReCA — AutoStore IS auto-observable
export class TodoStore extends AutoStore {
    public todos: ITodo[] = [];

    public addTodo(text: string): void {
        this.todos = [...this.todos, { id: Date.now(), text }];
    }
}

// ReCA — no observer() wrapper, no global singletons
const TodoList = () => {
    const store = useStore(TodoStore);

    return (
        <>
            <button onClick={() => store.addTodo("New")}>Add</button>
            {store.todos.map(t => <li key={t.id}>{t.text}</li>)}
        </>
    );
};`}</code></pre>

        <p>
            Key differences from MobX:
        </p>
        <ul>
            <li>No <code>makeAutoObservable()</code> — <code>AutoStore</code> handles reactivity automatically</li>
            <li>No <code>observer()</code> HOC — components work without wrappers</li>
            <li>No global singletons — stores are scoped to components</li>
            <li>Built-in DI — services are injected via constructor</li>
        </ul>

        <h2>From Zustand</h2>

        <h3>Zustand: create + hooks</h3>
        <pre><code>{`// Zustand — store
const useTodoStore = create((set) => ({
    todos: [],
    addTodo: (text: string) =>
        set((state) => ({
            todos: [...state.todos, { id: Date.now(), text }]
        })),
}));

// Zustand — component
const TodoList = () => {
    const todos = useTodoStore(state => state.todos);
    const addTodo = useTodoStore(state => state.addTodo);

    return (
        <>
            <button onClick={() => addTodo("New")}>Add</button>
            {todos.map(t => <li key={t.id}>{t.text}</li>)}
        </>
    );
};`}</code></pre>

        <h3>ReCA Equivalent</h3>
        <pre><code>{`// ReCA — class-based, type-safe, with DI
export class TodoStore extends AutoStore {
    public todos: ITodo[] = [];

    public addTodo(text: string): void {
        this.todos = [...this.todos, { id: Date.now(), text }];
    }
}

// ReCA — same clean component pattern
const TodoList = () => {
    const store = useStore(TodoStore);

    return (
        <>
            <button onClick={() => store.addTodo("New")}>Add</button>
            {store.todos.map(t => <li key={t.id}>{t.text}</li>)}
        </>
    );
};`}</code></pre>

        <p>Key differences from Zustand:</p>
        <ul>
            <li>Class-based stores with full TypeScript IntelliSense</li>
            <li>Lifecycle methods (<code>activate</code>, <code>dispose</code>, etc.)</li>
            <li>Built-in DI — no need to pass services manually</li>
            <li>Clean Architecture structure — stores, services, repositories</li>
        </ul>

        <h2>Migration Checklist</h2>
        <table>
            <thead>
                <tr><th>Step</th><th>Action</th></tr>
            </thead>
            <tbody>
                <tr><td>1</td><td>Install ReCA: <code>npm install reca reflect-metadata first-di</code></td></tr>
                <tr><td>2</td><td>Enable <code>experimentalDecorators</code> and <code>emitDecoratorMetadata</code> in tsconfig</td></tr>
                <tr><td>3</td><td>Import <code>reflect-metadata</code> at entry point</td></tr>
                <tr><td>4</td><td>Convert one feature at a time — start with a leaf component</td></tr>
                <tr><td>5</td><td>Move state into a store class extending <code>AutoStore</code></td></tr>
                <tr><td>6</td><td>Move side effects into lifecycle methods</td></tr>
                <tr><td>7</td><td>Extract services / repositories for API calls</td></tr>
                <tr><td>8</td><td>Remove old state management boilerplate</td></tr>
            </tbody>
        </table>
    </DocContent>
);
