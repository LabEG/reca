import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";

// eslint-disable-next-line new-cap
const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app"
};

interface IRootLayout {
    readonly children: React.ReactNode;
}

const RootLayout = ({children}: IRootLayout): JSX.Element => (
    <html lang="en">
        <body className={inter.className}>
            {children}
        </body>
    </html>
);

export default RootLayout;
