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
        label: "Getting Started",
        items: [
            {label: "Introduction", path: "/getting-started/introduction"},
            {label: "Installation", path: "/getting-started/installation"},
            {label: "First Component", path: "/getting-started/first-component"}
        ]
    },
    {
        label: "Guides",
        items: [
            {label: "AutoStore Basics", path: "/guides/auto-store-basics"},
            {label: "Todo Application", path: "/guides/todo-application"},
            {label: "Services", path: "/guides/services"},
            {label: "Repository Pattern", path: "/guides/repository"},
            {label: "Using Interfaces", path: "/guides/interfaces"}
        ]
    },
    {
        label: "Architecture",
        items: [
            {label: "Overview", path: "/architecture/overview"},
            {label: "Store Layer", path: "/architecture/store-layer"},
            {label: "Service Layer", path: "/architecture/service-layer"},
            {label: "Repository Layer", path: "/architecture/repository-layer"},
            {label: "References", path: "/architecture/references"}
        ]
    },
    {
        label: "Testing",
        items: [
            {label: "Testing with Jest", path: "/testing/jest"},
            {label: "Testing with Mocha", path: "/testing/mocha"}
        ]
    },
    {
        label: "API",
        items: [
            {label: "AutoStore", path: "/api/auto-store"},
            {label: "Store", path: "/api/store"},
            {label: "Decorators", path: "/api/decorators"}
        ]
    }
];
