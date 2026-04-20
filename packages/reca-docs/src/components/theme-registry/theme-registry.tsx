"use client";

import {type JSX, type ReactNode} from "react";
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {theme} from "../../theme.js";

interface IProps {
    readonly children: ReactNode;
}

export const ThemeRegistry = ({children}: IProps): JSX.Element => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
);
