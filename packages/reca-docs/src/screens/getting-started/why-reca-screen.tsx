"use client";

import {type JSX} from "react";
import {Alert} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const WhyRecaScreen = (): JSX.Element => (
    <DocContent>
        <h1>Why ReCA?</h1>
        <p>
            Modern frontend applications tend to grow in complexity. As features pile up,
            component files balloon with a mix of markup, styles, state management, API calls,
            validation, and business logic — all interleaved into a single file. The result
            is commonly known as <strong>spaghetti code</strong>.
        </p>

        <img
            src="/images/why-reca.svg"
            alt="Spaghetti code transformed into clean layered architecture by ReCA"
            style={{width: "100%", maxWidth: 800, display: "block", margin: "24px auto"}}
        />

        <p>
            ReCA transforms this tangled mess into a clear, predictable chain where each layer
            has a single responsibility. Your component renders UI. The store manages state.
            The service holds business rules. The repository talks to the server. Nothing is
            mixed — everything has its place.
        </p>

        <h2>When You Don&apos;t Need a State Manager</h2>
        <Alert severity="success" sx={{mb: 3}}>
            Not every application needs a state manager — and that&apos;s perfectly fine.
        </Alert>
        <p>
            If your project is a <strong>static website</strong>, a <strong>landing page</strong>,
            or an application with minimal interactive logic (a few forms, simple navigation),
            React&apos;s built-in tools — <code>useState</code>, <code>useReducer</code>,
            and <code>useContext</code> — are more than enough. Adding a state manager to a
            simple project only introduces unnecessary complexity.
        </p>
        <ul>
            <li>Marketing and landing pages</li>
            <li>Blogs and documentation sites</li>
            <li>Simple forms with 2–3 fields</li>
            <li>Static dashboards with server-rendered data</li>
        </ul>
        <p>
            In these cases, keep it simple. Use React as-is.
        </p>

        <h2>When You Need Structure</h2>
        <p>
            As soon as your application grows beyond simple CRUD, the situation changes:
        </p>
        <ul>
            <li>Components with <strong>hundreds of lines</strong> mixing markup, state, and API calls</li>
            <li><strong>Business logic</strong> duplicated across multiple components</li>
            <li>Deeply nested <strong>prop drilling</strong> or global state that triggers mass re-renders</li>
            <li>Difficulty writing <strong>unit tests</strong> because UI and logic are inseparable</li>
            <li>Onboarding new developers takes longer because <strong>no clear structure</strong> exists</li>
        </ul>
        <p>
            These are symptoms of unstructured code. And they don&apos;t go away by themselves —
            they compound with every new feature.
        </p>

        <Alert severity="warning" sx={{mb: 3}}>
            If a single component file contains <code>useState</code>, <code>useEffect</code>,
            <code>fetch()</code>, validation logic, and event handlers — it&apos;s doing too much.
            This is the point where a structured state manager pays for itself.
        </Alert>

        <h2>What ReCA Gives You</h2>
        <p>
            ReCA doesn&apos;t just manage state — it gives your codebase a <strong>clear
            architecture</strong>:
        </p>

        <table>
            <thead>
                <tr>
                    <th>Without ReCA</th>
                    <th>With ReCA</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Logic, state, and UI in one file</td>
                    <td>Each concern in its own layer</td>
                </tr>
                <tr>
                    <td>API calls inside components</td>
                    <td>Repository layer handles all data access</td>
                </tr>
                <tr>
                    <td>Business rules scattered everywhere</td>
                    <td>Service layer — single source of truth</td>
                </tr>
                <tr>
                    <td>Difficult to test</td>
                    <td>Each layer is independently testable</td>
                </tr>
                <tr>
                    <td>No conventions for new developers</td>
                    <td>Clean Architecture conventions baked in</td>
                </tr>
            </tbody>
        </table>

        <h2>A Practical Example</h2>
        <p>
            Consider a typical React component without any architecture:
        </p>

        <pre><code>{`// ❌ Everything mixed together
const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/user/me")
            .then((r) => r.json())
            .then((data) => {
                if (!data.email.includes("@")) {
                    setError("Invalid email");
                }
                setUser(data);
            })
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Spinner />;
    if (error) return <ErrorBanner message={error} />;

    return (
        <div style={{ padding: 20, maxWidth: 400 }}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
        </div>
    );
};`}</code></pre>

        <p>Now the same feature with ReCA:</p>

        <pre><code>{`// ✅ Clean separation
// repository — data access
class UserRepository {
    public async getCurrent(): Promise<IUser> {
        const response = await fetch("/api/user/me");
        return response.json();
    }
}

// service — business logic
class UserService {
    constructor(private readonly repo: UserRepository) {}

    public async getCurrentUser(): Promise<IUser> {
        const user = await this.repo.getCurrent();
        if (!user.email.includes("@")) {
            throw new ValidationError("Invalid email");
        }
        return user;
    }
}

// store — UI state
class UserProfileStore extends AutoStore {
    public user: IUser | null = null;
    public isLoading: boolean = true;
    public error: string | null = null;

    constructor(private readonly userService: UserService) {
        super();
    }

    public async init(): Promise<void> {
        try {
            this.user = await this.userService.getCurrentUser();
        } catch (e: any) {
            this.error = e.message;
        } finally {
            this.isLoading = false;
        }
    }
}

// component — only rendering
const UserProfile = () => {
    const store = useStore(UserProfileStore);

    if (store.isLoading) return <Spinner />;
    if (store.error) return <ErrorBanner message={store.error} />;

    return (
        <div>
            <h1>{store.user?.name}</h1>
            <p>{store.user?.email}</p>
        </div>
    );
};`}</code></pre>

        <p>
            More files? Yes. But each file is <strong>small, focused, and testable</strong>.
            The repository can be mocked. The service can be tested without React. The store
            can be tested without a DOM. And the component is just markup.
        </p>

        <h2>The Bottom Line</h2>
        <blockquote>
            <p>
                Simple projects don&apos;t need a state manager. Complex projects <em>need structure</em>.
                ReCA gives you that structure — without the boilerplate.
            </p>
        </blockquote>
    </DocContent>
);
