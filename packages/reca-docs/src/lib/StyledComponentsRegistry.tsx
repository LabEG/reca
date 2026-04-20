"use client";

import {type JSX, type ReactNode} from "react";

interface IProps {
    readonly children: ReactNode;
}

export const StyledComponentsRegistry = ({children}: IProps): JSX.Element => (
    <>{children}</>
);
