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
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/images/why-reca.svg`}
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
            Imagine a user profile page: load data, display it, allow inline editing,
            validate input, save changes, show a success message. A typical React component
            handling all of that ends up like this:
        </p>

        <pre><code>{`// ❌ A single component doing everything
const UserProfile = () => {
    const [user, setUser]               = useState(null);
    const [draft, setDraft]             = useState(null);
    const [isEditing, setIsEditing]     = useState(false);
    const [isSaving, setIsSaving]       = useState(false);
    const [errors, setErrors]           = useState({});
    const [successMsg, setSuccessMsg]   = useState("");

    useEffect(() => {
        fetch("/api/user/me")
            .then((r) => r.json())
            .then((data) => setUser(data));
    }, []);

    const validate = (data) => {
        const errs = {};
        if (!data.name.trim())          errs.name  = "Name is required";
        if (!data.email.includes("@"))  errs.email = "Invalid email";
        if (data.phone && !/^\+[\d\s]+$/.test(data.phone)) errs.phone = "Invalid phone";
        return errs;
    };

    const handleSave = async () => {
        const errs = validate(draft);
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setIsSaving(true);
        try {
            const res = await fetch("/api/user/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(draft),
            });
            if (!res.ok) throw new Error("Server error");
            setUser(await res.json());
            setIsEditing(false);
            setErrors({});
            setSuccessMsg("Saved!");
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (e) {
            setErrors({ general: e.message });
        } finally {
            setIsSaving(false);
        }
    };

    if (!user) return <div>Loading...</div>;
    return (
        <div style={{ padding: 20, maxWidth: 600 }}>
            {successMsg && (
                <div style={{ background: "#d4edda", padding: 10, marginBottom: 16 }}>
                    {successMsg}
                </div>
            )}
            {errors.general && (
                <div style={{ background: "#f8d7da", padding: 10, marginBottom: 16 }}>
                    {errors.general}
                </div>
            )}
            {isEditing ? (
                <div>
                    <div>
                        <label>Name</label>
                        <input
                            value={draft.name}
                            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                        />
                        {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            value={draft.email}
                            onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                        />
                        {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            value={draft.phone}
                            onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                        />
                        {errors.phone && <span style={{ color: "red" }}>{errors.phone}</span>}
                    </div>
                    <button onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => { setIsEditing(false); setErrors({}); }}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                    <p>{user.phone}</p>
                    <button onClick={() => { setDraft({ ...user }); setIsEditing(true); }}>
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};`}</code></pre>

        <p>
            Six <code>useState</code> calls, business logic, validation, HTTP requests, and
            rendering all woven together. You cannot test validation without rendering the
            component. You cannot swap the HTTP client without touching the component.
            Every new requirement adds another hook and more interleaving.
        </p>

        <p>Now the same feature with ReCA — each layer does exactly one thing:</p>

        <pre><code>{`// ✅ repository — data access only
class UserRepository {
    async getCurrent() {
        return fetch("/api/user/me").then((r) => r.json());
    }
    async update(user) {
        const res = await fetch("/api/user/me", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!res.ok) throw new Error("Server error");
        return res.json();
    }
}

// ✅ service — validation and business rules only (no React)
class UserService {
    constructor(repo) { this.repo = repo; }

    async getUser()  { return this.repo.getCurrent(); }
    async save(data) {
        const errors = this.validate(data);
        if (Object.keys(errors).length) throw { fields: errors };
        return this.repo.update(data);
    }

    validate(data) {
        const errors = {};
        if (!data.name.trim())          errors.name  = "Name is required";
        if (!data.email.includes("@"))  errors.email = "Invalid email";
        if (data.phone && !/^\+[\d\s]+$/.test(data.phone)) errors.phone = "Invalid phone";
        return errors;
    }
}

// ✅ store — UI state only (no HTTP, no validation rules)
class UserProfileStore extends AutoStore {
    user       = null;
    draft      = null;
    isEditing  = false;
    isSaving   = false;
    errors     = {};
    successMsg = "";

    constructor(userService) { super(); this.userService = userService; }

    async activate() {
        this.user = await this.userService.getUser();
    }

    startEditing()  { this.draft = { ...this.user }; this.isEditing = true; }
    cancelEditing() { this.draft = null; this.isEditing = false; this.errors = {}; }

    async save() {
        this.isSaving = true;
        try {
            this.user       = await this.userService.save(this.draft);
            this.isEditing  = false;
            this.successMsg = "Saved!";
            setTimeout(() => { this.successMsg = ""; }, 3000);
        } catch (e) {
            this.errors = e.fields ?? { general: e.message };
        } finally {
            this.isSaving = false;
        }
    }
}

// ✅ component — markup only (no logic at all)
const UserProfile = () => {
    const store = useStore(UserProfileStore);

    if (!store.user) return <div>Loading...</div>;
    return (
        <div style={{ padding: 20, maxWidth: 600 }}>
            {store.successMsg && (
                <div style={{ background: "#d4edda", padding: 10, marginBottom: 16 }}>
                    {store.successMsg}
                </div>
            )}
            {store.errors.general && (
                <div style={{ background: "#f8d7da", padding: 10, marginBottom: 16 }}>
                    {store.errors.general}
                </div>
            )}
            {store.isEditing ? (
                <div>
                    <div>
                        <label>Name</label>
                        <input
                            value={store.draft.name}
                            onChange={(e) => { store.draft = { ...store.draft, name: e.target.value }; }}
                        />
                        {store.errors.name && <span style={{ color: "red" }}>{store.errors.name}</span>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            value={store.draft.email}
                            onChange={(e) => { store.draft = { ...store.draft, email: e.target.value }; }}
                        />
                        {store.errors.email && <span style={{ color: "red" }}>{store.errors.email}</span>}
                    </div>
                    <div>
                        <label>Phone</label>
                        <input
                            value={store.draft.phone}
                            onChange={(e) => { store.draft = { ...store.draft, phone: e.target.value }; }}
                        />
                        {store.errors.phone && <span style={{ color: "red" }}>{store.errors.phone}</span>}
                    </div>
                    <button onClick={() => store.save()} disabled={store.isSaving}>
                        {store.isSaving ? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => store.cancelEditing()}>
                        Cancel
                    </button>
                </div>
            ) : (
                <div>
                    <h1>{store.user.name}</h1>
                    <p>{store.user.email}</p>
                    <p>{store.user.phone}</p>
                    <button onClick={() => store.startEditing()}>
                        Edit
                    </button>
                </div>
            )}
        </div>
    );
};`}</code></pre>

        <p>
            Identical features, identical JSX — but now each file has a single job.
            The component knows nothing about HTTP or validation. The service knows nothing
            about React. The repository knows nothing about business rules.
            Every layer can be tested in complete isolation.
        </p>
        <ul>
            <li><strong>Validation rules</strong> — test <code>userService.validate()</code> with plain objects, no React needed</li>
            <li><strong>Business logic</strong> — mock <code>UserRepository</code>, test <code>UserService</code> without a server</li>
            <li><strong>UI state transitions</strong> — test the store by calling methods and asserting properties</li>
            <li><strong>Component</strong> — only needs a fake store; never touches HTTP or timers</li>
        </ul>

        <h2>The Bottom Line</h2>
        <blockquote>
            <p>
                Simple projects don&apos;t need a state manager. Complex projects <em>need structure</em>.
                ReCA gives you that structure — without the boilerplate.
            </p>
        </blockquote>
    </DocContent>
);
