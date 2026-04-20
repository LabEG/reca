import type {Metadata} from "next";
import "./globals.css";
import {type JSX} from "react";
import {StyledComponentsRegistry} from "../src/lib/styled-components-registry.js";

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
            <StyledComponentsRegistry>
                {children}
            </StyledComponentsRegistry>
        </body>
    </html>
);

export default RootLayout;
