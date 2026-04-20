export interface INavItem {
    readonly label: string;
    readonly path: string;
}

export interface INavGroup {
    readonly label: string;
    readonly items: INavItem[];
}

export const navigation: INavGroup[] = [
    {
        label: "Introduction",
        items: [
            {label: "Overview", path: "overview"},
            {label: "Installation", path: "installation"},
            {label: "First Steps", path: "first-steps"}
        ]
    },
    {
        label: "Fundamentals",
        items: [
            {label: "AutoStore", path: "auto-store"},
            {label: "Store", path: "store"},
            {label: "Hooks", path: "hooks"}
        ]
    },
    {
        label: "Techniques",
        items: [
            {label: "Dependency Injection", path: "dependency-injection"},
            {label: "Decorators", path: "decorators"},
            {label: "SSR Support", path: "ssr"}
        ]
    }
];
