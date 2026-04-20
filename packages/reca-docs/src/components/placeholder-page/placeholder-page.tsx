"use client";

import {type JSX} from "react";
import {Typography} from "@mui/material";
import {DocContent} from "../../components/doc-content/doc-content.js";

export const PlaceholderPage = ({title}: {readonly title: string}): JSX.Element => (
    <DocContent>
        <h1>{title}</h1>
        <Typography color="text.secondary" sx={{mt: 2}}>
            This page is under construction.
        </Typography>
    </DocContent>
);
