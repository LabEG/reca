import type {Metadata, Viewport} from "next";
import "./globals.css";
import {type JSX} from "react";
import {ThemeRegistry} from "../src/components/theme-registry/theme-registry.js";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1
};

export const metadata: Metadata = {
    title: "ReCA Documentation",
    description: "Documentation for ReCA — React Clean Architecture state manager"
};

interface IRootLayout {
    readonly children: React.ReactNode;
}

const RootLayout = ({children}: IRootLayout): JSX.Element => (
    <html lang="en">
        <body>
            <ThemeRegistry>
                {children}
            </ThemeRegistry>
        </body>
    </html>
);

export default RootLayout;
