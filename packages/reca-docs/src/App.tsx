"use client";

import {type JSX, useCallback, useEffect, useState} from "react";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Typography} from "@mui/material";
import {Shell} from "./components/shell/shell.js";
import {DocContent} from "./components/doc-content/doc-content.js";
import {theme} from "./theme.js";
import {IndexPage} from "./views/index/index-page.js";
import {InstallationPage} from "./views/installation/installation-page.js";
import {FirstStepsPage} from "./views/first-steps/first-steps-page.js";

const routes: Record<string, () => JSX.Element> = {
    "overview": IndexPage,
    "installation": InstallationPage,
    "first-steps": FirstStepsPage
};

const PlaceholderPage = ({path}: {readonly path: string}): JSX.Element => (
    <DocContent>
        <h1>{path.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}</h1>
        <Typography color="text.secondary" sx={{mt: 2}}>
            This page is under construction.
        </Typography>
    </DocContent>
);

export const App = (): JSX.Element => {
    const [currentPath, setCurrentPath] = useState("overview");

    useEffect(() => {
        const hash = window.location.hash.slice(1) || "overview";
        setCurrentPath(hash);

        const handleHashChange = (): void => {
            setCurrentPath(window.location.hash.slice(1) || "overview");
        };

        window.addEventListener("hashchange", handleHashChange);

        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    const navigate = useCallback((path: string): void => {
        window.location.hash = path;
    }, []);

    const PageComponent = routes[currentPath];

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Shell currentPath={currentPath} onNavigate={navigate}>
                {PageComponent
                    ? <PageComponent />
                    : <PlaceholderPage path={currentPath} />}
            </Shell>
        </ThemeProvider>
    );
};
