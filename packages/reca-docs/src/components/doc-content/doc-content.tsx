"use client";

import {type JSX, useEffect, useRef} from "react";
import Prism from "prismjs";

import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";
import {DocArticle} from "./doc-content.styles";

const detectLanguage = (code: string): string => {
    const trimmed = code.trim();
    if (/^\s*\{[\s\S]*"compilerOptions"/.test(trimmed)) return "json";
    if (/^\s*\{[\s\S]*"[^"]+"\s*:/.test(trimmed) && !trimmed.includes("import") && !trimmed.includes("export")) return "json";
    if (/^(npm |yarn |pnpm |npx |#|require:)/.test(trimmed)) return "bash";
    if (/^require:/.test(trimmed) || /^spec:/.test(trimmed)) return "yaml";
    return "tsx";
};

interface IDocContent {
    readonly children: React.ReactNode;
}

export const DocContent = ({children}: IDocContent): JSX.Element => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const codeBlocks = ref.current.querySelectorAll("pre > code");
        codeBlocks.forEach((block) => {
            if (!/language-/.test(block.className)) {
                const lang = detectLanguage(block.textContent ?? "");
                block.classList.add(`language-${lang}`);
            }
        });

        Prism.highlightAllUnder(ref.current);
    }, [children]);

    return <DocArticle ref={ref}>{children}</DocArticle>;
};
